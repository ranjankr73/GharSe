import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
    getCategories,
    getShopSubCategories,
    createSubCategory,
    updateSubCategory,
    deleteSubCategory,
} from "../../features/category/categoryThunks";
import type { SubCategory } from "../../features/category/categoryTypes";
import Modal from "../../components/ui/Modal";
import InputField from "../../components/ui/InputField";
import TextareaField from "../../components/ui/TextareaField";
import Button from "../../components/ui/Button";
import EmptyState from "../../components/ui/EmptyState";
import Spinner from "../../components/ui/Spinner";
import Badge from "../../components/ui/Badge";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, Tag, ChevronDown, ChevronUp } from "lucide-react";

interface SubCategoryFormData {
    name: string;
    description: string;
    categoryId: string;
}

const ShopCategoriesPage = () => {
    const dispatch = useAppDispatch();
    const { activeShop } = useAppSelector((s) => s.shop);
    const { categories, subCategories, status } = useAppSelector((s) => s.category);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSubCat, setEditingSubCat] = useState<SubCategory | null>(null);
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<SubCategoryFormData>();

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    useEffect(() => {
        if (!activeShop) return;
        dispatch(getShopSubCategories(activeShop._id));
    }, [activeShop, dispatch]);

    const toggleCategory = (categoryId: string) => {
        setExpandedCategories((prev) => {
            const next = new Set(prev);
            if (next.has(categoryId)) {
                next.delete(categoryId);
            } else {
                next.add(categoryId);
            }
            return next;
        });
    };

    const handleOpenModal = (subCat?: SubCategory, categoryId?: string) => {
        if (subCat) {
            setEditingSubCat(subCat);
            reset({
                name: subCat.name,
                description: subCat.description ?? "",
                categoryId:
                    typeof subCat.category === "object"
                        ? subCat.category._id
                        : subCat.category,
            });
        } else {
            setEditingSubCat(null);
            reset({
                name: "",
                description: "",
                categoryId: categoryId ?? "",
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingSubCat(null);
        reset();
    };

    const onSubmit = async (data: SubCategoryFormData) => {
        if (!activeShop) return;

        let result;
        if (editingSubCat) {
            result = await dispatch(
                updateSubCategory({
                    shopId: activeShop._id,
                    subCategoryId: editingSubCat._id,
                    data: { name: data.name, description: data.description },
                })
            );
        } else {
            result = await dispatch(
                createSubCategory({
                    shopId: activeShop._id,
                    data: {
                        name: data.name,
                        description: data.description || undefined,
                        categoryId: data.categoryId,
                    },
                })
            );
        }

        const isSuccess = editingSubCat
            ? updateSubCategory.fulfilled.match(result)
            : createSubCategory.fulfilled.match(result);

        if (isSuccess) {
            toast.success(editingSubCat ? "Subcategory updated" : "Subcategory created");
            dispatch(getShopSubCategories(activeShop._id));
            handleCloseModal();
        } else {
            toast.error("Something went wrong");
        }
    };

    const handleDelete = async (subCategoryId: string) => {
        if (!activeShop) return;
        if (!confirm("Delete this subcategory?")) return;
        const result = await dispatch(
            deleteSubCategory({ shopId: activeShop._id, subCategoryId })
        );
        if (deleteSubCategory.fulfilled.match(result)) {
            toast.success("Subcategory deleted");
            dispatch(getShopSubCategories(activeShop._id));
        } else {
            toast.error("Failed to delete");
        }
    };

    if (!activeShop) {
        return <EmptyState icon="🏪" title="No shop selected" />;
    }

    // Group subcategories by global category
    const groupedSubCategories = categories.reduce(
        (acc, category) => {
            acc[category._id] = subCategories.filter((sc) =>
                typeof sc.category === "object"
                    ? sc.category._id === category._id
                    : sc.category === category._id
            );
            return acc;
        },
        {} as Record<string, SubCategory[]>
    );

    return (
        <div className="space-y-5 max-w-3xl">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-xs text-slate-400 mt-0.5">
                        {subCategories.length} subcategories across {categories.length} global categories
                    </p>
                </div>
                <Button onClick={() => handleOpenModal()} size="md">
                    <Plus size={14} className="mr-1.5" />
                    Add Subcategory
                </Button>
            </div>

            {/* Info banner */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-xs text-blue-700">
                <strong className="font-semibold">How categories work:</strong> Global categories are
                created by admin (e.g. Groceries, Fast Food). You can create subcategories under
                them specific to your shop (e.g. Dairy, Snacks under Groceries).
            </div>

            {status === "loading" ? (
                <div className="flex justify-center py-16">
                    <Spinner />
                </div>
            ) : categories.length === 0 ? (
                <EmptyState
                    icon="🏷️"
                    title="No global categories yet"
                    description="Admin hasn't created any categories. Check back later."
                />
            ) : (
                <div className="space-y-3">
                    {categories.map((category) => {
                        const catSubCategories = groupedSubCategories[category._id] ?? [];
                        const isExpanded = expandedCategories.has(category._id);

                        return (
                            <div
                                key={category._id}
                                className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
                            >
                                {/* Category header */}
                                <div
                                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 transition"
                                    onClick={() => toggleCategory(category._id)}
                                >
                                    <div className="flex items-center gap-3">
                                        {category.image ? (
                                            <img
                                                src={category.image}
                                                alt={category.name}
                                                className="w-8 h-8 rounded-lg object-cover"
                                            />
                                        ) : (
                                            <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
                                                <Tag size={14} className="text-red-500" />
                                            </div>
                                        )}
                                        <div>
                                            <p className="text-sm font-semibold text-slate-800">
                                                {category.name}
                                            </p>
                                            <p className="text-xs text-slate-400">
                                                {catSubCategories.length} subcategories
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleOpenModal(undefined, category._id);
                                            }}
                                            className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 px-2.5 py-1.5 rounded-lg hover:bg-red-50 transition cursor-pointer"
                                        >
                                            <Plus size={12} />
                                            Add
                                        </button>
                                        {isExpanded ? (
                                            <ChevronUp size={15} className="text-slate-400" />
                                        ) : (
                                            <ChevronDown size={15} className="text-slate-400" />
                                        )}
                                    </div>
                                </div>

                                {/* Subcategories list */}
                                {isExpanded && (
                                    <div className="border-t border-slate-100">
                                        {catSubCategories.length === 0 ? (
                                            <div className="px-4 py-6 text-center">
                                                <p className="text-xs text-slate-400">
                                                    No subcategories yet.
                                                </p>
                                                <button
                                                    onClick={() =>
                                                        handleOpenModal(undefined, category._id)
                                                    }
                                                    className="mt-2 text-xs text-red-500 hover:text-red-600 cursor-pointer"
                                                >
                                                    + Add one
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="divide-y divide-slate-50">
                                                {catSubCategories.map((sc) => (
                                                    <div
                                                        key={sc._id}
                                                        className="flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            {sc.image ? (
                                                                <img
                                                                    src={sc.image}
                                                                    alt={sc.name}
                                                                    className="w-7 h-7 rounded-lg object-cover"
                                                                />
                                                            ) : (
                                                                <div className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center text-xs">
                                                                    🏷️
                                                                </div>
                                                            )}
                                                            <div>
                                                                <p className="text-sm font-medium text-slate-700">
                                                                    {sc.name}
                                                                </p>
                                                                {sc.description && (
                                                                    <p className="text-xs text-slate-400 line-clamp-1">
                                                                        {sc.description}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-2">
                                                            <Badge
                                                                label={sc.isActive ? "Active" : "Inactive"}
                                                                variant={sc.isActive ? "green" : "gray"}
                                                            />
                                                            <button
                                                                onClick={() => handleOpenModal(sc)}
                                                                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                                                            >
                                                                <Pencil size={13} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(sc._id)}
                                                                className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                                                            >
                                                                <Trash2 size={13} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingSubCat ? "Edit Subcategory" : "Add Subcategory"}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {!editingSubCat && (
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-slate-600">
                                Global Category *
                            </label>
                            <select
                                {...register("categoryId", {
                                    required: "Select a global category",
                                })}
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
                    )}

                    <InputField
                        label="Subcategory Name *"
                        placeholder="e.g. Dairy, Beverages, Snacks"
                        error={errors.name?.message}
                        {...register("name", { required: "Name is required" })}
                    />

                    <TextareaField
                        label="Description"
                        placeholder="Optional description..."
                        {...register("description")}
                    />

                    <div className="flex gap-3 pt-2 border-t border-slate-100">
                        <Button
                            type="button"
                            variant="outline"
                            fullWidth
                            onClick={handleCloseModal}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            fullWidth
                            isLoading={status === "loading"}
                        >
                            {editingSubCat ? "Save Changes" : "Create"}
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default ShopCategoriesPage;