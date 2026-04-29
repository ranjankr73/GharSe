import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
    createProduct,
    updateProduct,
    getMyProducts,
} from "../../features/product/productThunks";
import type { Product } from "../../features/product/productTypes";
import type { Category, SubCategory } from "../../features/category/categoryTypes";
import Modal from "../ui/Modal";
import InputField from "../ui/InputField";
import TextareaField from "../ui/TextareaField";
import Button from "../ui/Button";
import toast from "react-hot-toast";
import { Plus, Trash2 } from "lucide-react";

interface FormData {
    name: string;
    description: string;
    categoryId: string;
    subCategoryId: string;
    price: string;
    discountPrice: string;
    unit: string;
    stock: string;
    lowStockThreshold: string;
    isFeatured: boolean;
    hasVariants: boolean;
    variants: { name: string; price: string; discountPrice: string; stock: string }[];
}

interface Props {
    shopId: string;
    product: Product | null;
    categories: Category[];
    subCategories: SubCategory[];
    onClose: () => void;
}

const ProductFormModal = ({
    shopId,
    product,
    categories,
    subCategories,
    onClose,
}: Props) => {
    const dispatch = useAppDispatch();
    const { status } = useAppSelector((s) => s.product);

    const {
        register,
        handleSubmit,
        watch,
        control,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            name: "",
            description: "",
            categoryId: "",
            subCategoryId: "",
            price: "",
            discountPrice: "",
            unit: "",
            stock: "0",
            lowStockThreshold: "5",
            isFeatured: false,
            hasVariants: false,
            variants: [],
        },
    });

    const { fields, append, remove } = useFieldArray({ control, name: "variants" });
    const hasVariants = watch("hasVariants");
    const selectedCategoryId = watch("categoryId");

    const filteredSubCategories = subCategories.filter(
        (sc) =>
            typeof sc.category === "object"
                ? sc.category._id === selectedCategoryId
                : sc.category === selectedCategoryId
    );

    // Populate form when editing
    useEffect(() => {
        if (product) {
            reset({
                name: product.name,
                description: product.description ?? "",
                categoryId:
                    typeof product.category === "object"
                        ? product.category._id
                        : product.category,
                subCategoryId:
                    product.subCategory &&
                    typeof product.subCategory === "object"
                        ? product.subCategory._id
                        : "",
                price: product.price?.toString() ?? "",
                discountPrice: product.discountPrice?.toString() ?? "",
                unit: product.unit ?? "",
                stock: product.stock.toString(),
                lowStockThreshold: product.lowStockThreshold.toString(),
                isFeatured: product.isFeatured,
                hasVariants: product.variants.length > 0,
                variants: product.variants.map((v) => ({
                    name: v.name,
                    price: v.price.toString(),
                    discountPrice: v.discountPrice?.toString() ?? "",
                    stock: v.stock.toString(),
                })),
            });
        }
    }, [product, reset]);

    const onSubmit = async (data: FormData) => {
        const payload: Record<string, unknown> = {
            name: data.name,
            description: data.description || undefined,
            categoryId: data.categoryId,
            subCategoryId: data.subCategoryId || undefined,
            unit: data.unit || undefined,
            isFeatured: data.isFeatured,
            lowStockThreshold: Number(data.lowStockThreshold),
        };

        if (data.hasVariants && data.variants.length > 0) {
            payload.variants = data.variants.map((v) => ({
                name: v.name,
                price: Number(v.price),
                discountPrice: v.discountPrice ? Number(v.discountPrice) : null,
                stock: Number(v.stock),
            }));
        } else {
            payload.price = Number(data.price);
            payload.discountPrice = data.discountPrice
                ? Number(data.discountPrice)
                : null;
            payload.stock = Number(data.stock);
        }

        let result;
        if (product) {
            result = await dispatch(
                updateProduct({ shopId, productId: product._id, data: payload })
            );
        } else {
            result = await dispatch(createProduct({ shopId, data: payload }));
        }

        const isSuccess = product
            ? updateProduct.fulfilled.match(result)
            : createProduct.fulfilled.match(result);

        if (isSuccess) {
            toast.success(product ? "Product updated" : "Product created");
            dispatch(getMyProducts({ shopId, params: { page: 1, limit: 12 } }));
            onClose();
        } else {
            toast.error("Something went wrong");
        }
    };

    return (
        <Modal
            isOpen
            onClose={onClose}
            title={product ? "Edit Product" : "Add Product"}
            maxWidth="max-w-2xl"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-h-[70vh] overflow-y-auto pr-1">
                {/* Basic info */}
                <div className="grid sm:grid-cols-2 gap-4">
                    <InputField
                        label="Product Name *"
                        placeholder="e.g. Amul Milk"
                        error={errors.name?.message}
                        {...register("name", { required: "Name is required" })}
                    />
                    <InputField
                        label="Unit"
                        placeholder="e.g. 500g, 1L, piece"
                        {...register("unit")}
                    />
                </div>

                <TextareaField
                    label="Description"
                    placeholder="Brief description of the product..."
                    {...register("description")}
                />

                {/* Category */}
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-600">
                            Category *
                        </label>
                        <select
                            {...register("categoryId", { required: "Category is required" })}
                            className="w-full text-sm bg-white border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500/20 cursor-pointer"
                        >
                            <option value="">Select category</option>
                            {categories.map((c) => (
                                <option key={c._id} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                        {errors.categoryId && (
                            <p className="text-xs text-red-500">
                                {errors.categoryId.message}
                            </p>
                        )}
                    </div>

                    {filteredSubCategories.length > 0 && (
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-slate-600">
                                Subcategory
                            </label>
                            <select
                                {...register("subCategoryId")}
                                className="w-full text-sm bg-white border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500/20 cursor-pointer"
                            >
                                <option value="">None</option>
                                {filteredSubCategories.map((sc) => (
                                    <option key={sc._id} value={sc._id}>
                                        {sc.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

                {/* Variants toggle */}
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                    <input
                        type="checkbox"
                        id="hasVariants"
                        {...register("hasVariants")}
                        className="w-4 h-4 accent-red-500 cursor-pointer"
                    />
                    <label
                        htmlFor="hasVariants"
                        className="text-sm text-slate-700 cursor-pointer"
                    >
                        This product has multiple variants (sizes, weights, etc.)
                    </label>
                </div>

                {/* Simple pricing + stock */}
                {!hasVariants && (
                    <div className="grid sm:grid-cols-3 gap-4">
                        <InputField
                            label="Price (₹) *"
                            type="number"
                            placeholder="0"
                            error={errors.price?.message}
                            {...register("price", {
                                required: !hasVariants ? "Price is required" : false,
                            })}
                        />
                        <InputField
                            label="Discount Price (₹)"
                            type="number"
                            placeholder="0"
                            {...register("discountPrice")}
                        />
                        <InputField
                            label="Stock"
                            type="number"
                            placeholder="0"
                            {...register("stock")}
                        />
                    </div>
                )}

                {/* Variants */}
                {hasVariants && (
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <p className="text-xs font-medium text-slate-700">
                                Variants
                            </p>
                            <button
                                type="button"
                                onClick={() =>
                                    append({
                                        name: "",
                                        price: "",
                                        discountPrice: "",
                                        stock: "0",
                                    })
                                }
                                className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 cursor-pointer"
                            >
                                <Plus size={12} />
                                Add Variant
                            </button>
                        </div>

                        {fields.length === 0 && (
                            <p className="text-xs text-slate-400 text-center py-4 border border-dashed border-slate-200 rounded-xl">
                                No variants added yet. Click "Add Variant" to start.
                            </p>
                        )}

                        {fields.map((field, index) => (
                            <div
                                key={field.id}
                                className="grid grid-cols-4 gap-3 items-end bg-slate-50 rounded-xl p-3"
                            >
                                <InputField
                                    label="Name"
                                    placeholder="e.g. 500g"
                                    {...register(`variants.${index}.name`, {
                                        required: "Required",
                                    })}
                                />
                                <InputField
                                    label="Price (₹)"
                                    type="number"
                                    placeholder="0"
                                    {...register(`variants.${index}.price`, {
                                        required: "Required",
                                    })}
                                />
                                <InputField
                                    label="Disc. Price"
                                    type="number"
                                    placeholder="0"
                                    {...register(`variants.${index}.discountPrice`)}
                                />
                                <div className="flex items-end gap-2">
                                    <InputField
                                        label="Stock"
                                        type="number"
                                        placeholder="0"
                                        {...register(`variants.${index}.stock`)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="mb-0.5 p-2 text-red-400 hover:text-red-600 cursor-pointer"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Extra settings */}
                <div className="grid sm:grid-cols-2 gap-4">
                    <InputField
                        label="Low Stock Alert (units)"
                        type="number"
                        placeholder="5"
                        {...register("lowStockThreshold")}
                    />
                    <div className="flex items-center gap-3 pt-6">
                        <input
                            type="checkbox"
                            id="isFeatured"
                            {...register("isFeatured")}
                            className="w-4 h-4 accent-red-500 cursor-pointer"
                        />
                        <label
                            htmlFor="isFeatured"
                            className="text-sm text-slate-700 cursor-pointer"
                        >
                            Featured product
                        </label>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex gap-3 pt-2 border-t border-slate-100">
                    <Button
                        type="button"
                        variant="outline"
                        fullWidth
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        fullWidth
                        isLoading={status === "loading"}
                    >
                        {product ? "Save Changes" : "Create Product"}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default ProductFormModal;