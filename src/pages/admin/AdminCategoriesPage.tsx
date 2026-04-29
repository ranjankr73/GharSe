// pages/admin/AdminCategoriesPage.tsx
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
    adminGetAllCategories,
    adminDeleteCategory,
} from "../../features/admin/adminThunks";
import type { Category } from "../../features/category/categoryTypes";
import CategoryFormModal from "../../components/admin/CategoryFormModal";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Spinner from "../../components/ui/Spinner";
import EmptyState from "../../components/ui/EmptyState";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, GripVertical, Tag } from "lucide-react";

const AdminCategoriesPage = () => {
    const dispatch = useAppDispatch();
    const { categories, status } = useAppSelector((s) => s.admin);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    useEffect(() => {
        dispatch(adminGetAllCategories());
    }, [dispatch]);

    const handleEdit = (category: Category) => {
        setEditingCategory(category);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingCategory(null);
    };

    const handleDelete = async (categoryId: string, name: string) => {
        if (!confirm(`Delete "${name}"? This will also affect subcategories mapped to it.`))
            return;
        const result = await dispatch(adminDeleteCategory(categoryId));
        if (adminDeleteCategory.fulfilled.match(result)) {
            toast.success("Category deleted");
            dispatch(adminGetAllCategories());
        } else {
            toast.error("Failed to delete category");
        }
    };

    const sorted = [...categories].sort(
        (a, b) => a.displayOrder - b.displayOrder
    );

    return (
        <div className="space-y-5 max-w-3xl">
            {/* Header */}
            <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400">
                    {categories.length} global categories ·{" "}
                    {categories.filter((c) => c.isActive).length} active
                </p>
                <Button onClick={() => setIsModalOpen(true)} size="md">
                    <Plus size={14} className="mr-1.5" />
                    New Category
                </Button>
            </div>

            {/* Info banner */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-xs text-blue-700">
                Global categories are visible to all shop owners when creating
                subcategories. Deactivating a category hides it from shop owners
                but does not delete existing subcategories.
            </div>

            {status === "loading" ? (
                <div className="flex justify-center py-16">
                    <Spinner />
                </div>
            ) : categories.length === 0 ? (
                <EmptyState
                    icon="🏷️"
                    title="No categories yet"
                    description="Create your first global category"
                    action={
                        <Button onClick={() => setIsModalOpen(true)} size="md">
                            <Plus size={14} className="mr-1.5" />
                            New Category
                        </Button>
                    }
                />
            ) : (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    {/* Header row */}
                    <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-slate-100 bg-slate-50">
                        <div className="col-span-1" />
                        <p className="col-span-4 text-xs font-semibold text-slate-500">
                            Category
                        </p>
                        <p className="col-span-3 text-xs font-semibold text-slate-500">
                            Description
                        </p>
                        <p className="col-span-2 text-xs font-semibold text-slate-500">
                            Status
                        </p>
                        <p className="col-span-2 text-xs font-semibold text-slate-500 text-right">
                            Actions
                        </p>
                    </div>

                    <div className="divide-y divide-slate-50">
                        {sorted.map((category) => (
                            <div
                                key={category._id}
                                className="grid grid-cols-12 gap-4 px-4 py-4 items-center hover:bg-slate-50 transition"
                            >
                                {/* Drag handle (visual only) */}
                                <div className="col-span-1 flex justify-center">
                                    <GripVertical
                                        size={14}
                                        className="text-slate-300"
                                    />
                                </div>

                                {/* Name + image */}
                                <div className="col-span-4 flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 overflow-hidden">
                                        {category.image ? (
                                            <img
                                                src={category.image}
                                                alt={category.name}
                                                className="w-9 h-9 object-cover"
                                            />
                                        ) : (
                                            <Tag
                                                size={14}
                                                className="text-slate-400"
                                            />
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-slate-800">
                                            {category.name}
                                        </p>
                                        <p className="text-xs text-slate-400">
                                            /{category.slug}
                                        </p>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="col-span-3">
                                    <p className="text-xs text-slate-500 line-clamp-2">
                                        {category.description ?? "—"}
                                    </p>
                                </div>

                                {/* Status */}
                                <div className="col-span-2">
                                    <Badge
                                        label={category.isActive ? "Active" : "Inactive"}
                                        variant={category.isActive ? "green" : "gray"}
                                    />
                                </div>

                                {/* Actions */}
                                <div className="col-span-2 flex items-center justify-end gap-1">
                                    <button
                                        onClick={() => handleEdit(category)}
                                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                                    >
                                        <Pencil size={13} />
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDelete(category._id, category.name)
                                        }
                                        className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 transition cursor-pointer"
                                    >
                                        <Trash2 size={13} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Category form modal */}
            {isModalOpen && (
                <CategoryFormModal
                    category={editingCategory}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default AdminCategoriesPage;