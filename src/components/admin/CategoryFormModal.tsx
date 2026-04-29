import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
    adminCreateCategory,
    adminUpdateCategory,
    adminGetAllCategories,
} from "../../features/admin/adminThunks";
import type { Category } from "../../features/category/categoryTypes";
import Modal from "../ui/Modal";
import InputField from "../ui/InputField";
import TextareaField from "../ui/TextareaField";
import Button from "../ui/Button";
import toast from "react-hot-toast";

interface FormData {
    name: string;
    description: string;
    image: string;
    displayOrder: string;
    isActive: boolean;
}

interface Props {
    category: Category | null;
    onClose: () => void;
}

const CategoryFormModal = ({ category, onClose }: Props) => {
    const dispatch = useAppDispatch();
    const { status } = useAppSelector((s) => s.admin);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            name: "",
            description: "",
            image: "",
            displayOrder: "0",
            isActive: true,
        },
    });

    useEffect(() => {
        if (category) {
            reset({
                name: category.name,
                description: category.description ?? "",
                image: category.image ?? "",
                displayOrder: category.displayOrder.toString(),
                isActive: category.isActive,
            });
        }
    }, [category, reset]);

    const onSubmit = async (data: FormData) => {
        const payload = {
            name: data.name,
            description: data.description || undefined,
            image: data.image || undefined,
            displayOrder: Number(data.displayOrder),
            ...(category && { isActive: data.isActive }),
        };

        let result;
        if (category) {
            result = await dispatch(
                adminUpdateCategory({ categoryId: category._id, data: payload })
            );
        } else {
            result = await dispatch(adminCreateCategory(payload));
        }

        const isSuccess = category
            ? adminUpdateCategory.fulfilled.match(result)
            : adminCreateCategory.fulfilled.match(result);

        if (isSuccess) {
            toast.success(category ? "Category updated" : "Category created");
            dispatch(adminGetAllCategories());
            onClose();
        } else {
            toast.error("Something went wrong");
        }
    };

    return (
        <Modal
            isOpen
            onClose={onClose}
            title={category ? "Edit Category" : "New Category"}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <InputField
                    label="Category Name *"
                    placeholder="e.g. Groceries"
                    error={errors.name?.message}
                    {...register("name", { required: "Name is required" })}
                />

                <TextareaField
                    label="Description"
                    placeholder="Brief description..."
                    {...register("description")}
                />

                <InputField
                    label="Image URL"
                    placeholder="https://..."
                    {...register("image")}
                />

                <InputField
                    label="Display Order"
                    type="number"
                    placeholder="0"
                    {...register("displayOrder")}
                />

                {/* Only show isActive when editing */}
                {category && (
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                        <input
                            type="checkbox"
                            id="isActive"
                            {...register("isActive")}
                            className="w-4 h-4 accent-red-500 cursor-pointer"
                        />
                        <label
                            htmlFor="isActive"
                            className="text-sm text-slate-700 cursor-pointer"
                        >
                            Active (visible to shop owners and customers)
                        </label>
                    </div>
                )}

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
                        {category ? "Save Changes" : "Create Category"}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default CategoryFormModal;