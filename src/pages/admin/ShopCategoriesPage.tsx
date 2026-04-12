import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  fetchProducts,
  createCategory,
  deleteCategory,
} from "../../redux/slices/productSlice";

import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/InputField";
import EmptyState from "../../components/ui/EmptyState";

import toast from "react-hot-toast";

const EMOJI_OPTIONS = ["🥦","🥛","🍞","🍿","☕","🫙","🍎","🥩","🐟","🍜","🧴","🧹","💊","🌿","🥚"];

const ShopCategoriesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { categories, products } = useAppSelector((s) => s.products);

  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("🥦");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts("shop-001"));
  }, [dispatch]);

  const handleAdd = async () => {
    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    setSubmitting(true);
    try {
      await dispatch(
        createCategory({
          name: name.trim(),
          icon,
          shopId: "shop-001",
        })
      ).unwrap();

      toast.success("Category added!");
      setModalOpen(false);
      setName("");
      setIcon("🥦");
    } catch {
      toast.error("Failed to add category");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, catName: string) => {
    const hasProducts = products.some((p) => p.categoryId === id);

    if (hasProducts) {
      toast.error(`"${catName}" has products`);
      return;
    }

    if (!confirm(`Delete "${catName}"?`)) return;

    try {
      await dispatch(deleteCategory(id)).unwrap();
      toast.success("Category deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <>
      {/* 🔥 HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Total Categories
          </h2>
          <p className="text-sm text-gray-400">
            {categories.length} total
          </p>
        </div>

        <Button onClick={() => setModalOpen(true)}>
          + Add Category
        </Button>
      </div>

      {/* 📂 CONTENT */}
      {categories.length === 0 ? (
        <EmptyState
          icon="📂"
          title="No categories yet"
          description="Create categories to organize your products."
          action={
            <Button onClick={() => setModalOpen(true)}>
              Add Category
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => {
            const productCount = products.filter(
              (p) => p.categoryId === cat.id
            ).length;

            return (
              <div
                key={cat.id}
                className="
                  bg-white rounded-2xl border border-gray-100
                  shadow-sm p-4 flex items-center gap-4
                  hover:shadow-md transition
                "
              >
                {/* ICON */}
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-2xl">
                  {cat.icon}
                </div>

                {/* INFO */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 text-sm">
                    {cat.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {productCount} product
                    {productCount !== 1 ? "s" : ""}
                  </p>
                </div>

                {/* ACTION */}
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(cat.id, cat.name)}
                >
                  Delete
                </Button>
              </div>
            );
          })}
        </div>
      )}

      {/* 🧾 MODAL */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add Category"
      >
        <div className="space-y-4">

          <InputField
            label="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Beverages"
            required
          />

          {/* ICON PICKER */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              Pick an icon
            </p>

            <div className="flex flex-wrap gap-2">
              {EMOJI_OPTIONS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => setIcon(emoji)}
                  className={`
                    w-10 h-10 rounded-xl text-lg flex items-center justify-center
                    transition-all cursor-pointer
                    ${
                      icon === emoji
                        ? "bg-red-500 text-white scale-110 shadow-sm"
                        : "bg-gray-100 hover:bg-gray-200"
                    }
                  `}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              fullWidth
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>

            <Button
              fullWidth
              loading={submitting}
              onClick={handleAdd}
            >
              Add Category
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ShopCategoriesPage;