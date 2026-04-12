import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../../redux/slices/productSlice";

import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/InputField";
import TextareaField from "../../components/ui/TextareaField";
import Toggle from "../../components/ui/Toggle";
import EmptyState from "../../components/ui/EmptyState";
import Skeleton from "../../components/ui/Skeleton";

import { formatCurrency } from "../../utils";
import type { Product, ProductForm } from "../../types";

import toast from "react-hot-toast";
import SelectField from "../../components/ui/SelectField";

const EMPTY_FORM: ProductForm = {
    name: "",
    description: "",
    price: "",
    categoryId: "",
    image: "",
    inStock: true,
    isVeg: true,
};

const AdminProductsPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { products, categories, loading } = useAppSelector((s) => s.products);

    const [modalOpen, setModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [form, setForm] = useState<ProductForm>(EMPTY_FORM);
    const [submitting, setSubmitting] = useState(false);

    const [search, setSearch] = useState("");
    const [filterCat, setFilterCat] = useState("all");

    useEffect(() => {
        dispatch(fetchProducts("shop-001"));
    }, [dispatch]);

    const openAdd = () => {
        setEditingProduct(null);
        setForm(EMPTY_FORM);
        setModalOpen(true);
    };

    const openEdit = (product: Product) => {
        setEditingProduct(product);
        setForm({
            name: product.name,
            description: product.description,
            price: String(product.price),
            categoryId: product.categoryId,
            image: product.image,
            inStock: product.inStock,
            isVeg: product.isVeg ?? true,
        });
        setModalOpen(true);
    };

    const handleSubmit = async () => {
        if (!form.name || !form.price || !form.categoryId) {
            toast.error("Please fill all required fields");
            return;
        }

        setSubmitting(true);

        try {
            if (editingProduct) {
                await dispatch(
                    updateProduct({
                        id: editingProduct.id,
                        updates: {
                            ...form,
                            price: parseFloat(form.price),
                        },
                    }),
                ).unwrap();

                toast.success("Product updated!");
            } else {
                await dispatch(
                    createProduct({
                        ...form,
                        price: parseFloat(form.price),
                        shopId: "shop-001",
                        image:
                            form.image ||
                            `https://api.dicebear.com/8.x/shapes/svg?seed=${form.name}`,
                    }),
                ).unwrap();

                toast.success("Product added!");
            }

            setModalOpen(false);
        } catch {
            toast.error("Something went wrong");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (product: Product) => {
        if (!confirm(`Delete "${product.name}"?`)) return;

        try {
            await dispatch(deleteProduct(product.id)).unwrap();
            toast.success("Product deleted");
        } catch {
            toast.error("Failed to delete");
        }
    };

    const filtered = products
        .filter((p) => filterCat === "all" || p.categoryId === filterCat)
        .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <>
            {/* 🔥 TOP BAR */}
            <div className="flex flex-wrap gap-3 mb-5 items-end">
              <div className="flex-1 min-w-48">
                <InputField
                    label=""
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
              </div>
                
                <div className="w-48">
                    <SelectField
                        label=""
                        value={filterCat}
                        onChange={(e) => setFilterCat(e.target.value)}
                        options={[
                            { label: "All Categories", value: "all" },
                            ...categories.map((c) => ({
                                label: `${c.icon} ${c.name}`,
                                value: c.id,
                            })),
                        ]}
                    />
                </div>

                <Button onClick={openAdd}>
                    + Add Product
                </Button>
            </div>

            {/* 📦 PRODUCTS */}
            {loading ? (
                <div className="space-y-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-16 w-full" />
                    ))}
                </div>
            ) : filtered.length === 0 ? (
                <EmptyState
                    icon="🛍️"
                    title="No products found"
                    description="Add your first product or try a different filter."
                    action={<Button onClick={openAdd}>Add Product</Button>}
                />
            ) : (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="divide-y">
                        {filtered.map((product) => {
                            const cat = categories.find(
                                (c) => c.id === product.categoryId,
                            );

                            return (
                                <div
                                    key={product.id}
                                    className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition"
                                >
                                    {/* LEFT */}
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <div>
                                            <p className="font-medium text-gray-800 text-sm">
                                                {product.name}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                {cat?.icon} {cat?.name}
                                            </p>
                                        </div>
                                    </div>

                                    {/* RIGHT */}
                                    <div className="flex items-center gap-4">
                                        <span className="font-semibold text-gray-900 text-sm">
                                            {formatCurrency(product.price)}
                                        </span>

                                        <span
                                            className={`text-xs font-medium ${
                                                product.inStock
                                                    ? "text-green-600"
                                                    : "text-red-500"
                                            }`}
                                        >
                                            {product.inStock
                                                ? "In stock"
                                                : "Out of stock"}
                                        </span>

                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => openEdit(product)}
                                        >
                                            Edit
                                        </Button>

                                        <Button
                                            size="sm"
                                            variant="danger"
                                            onClick={() =>
                                                handleDelete(product)
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* MODAL */}
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title={editingProduct ? "Edit Product" : "Add Product"}
            >
                <div className="space-y-4">
                    <InputField
                        label="Product Name"
                        required
                        value={form.name}
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                    />

                    <TextareaField
                        label="Description"
                        value={form.description}
                        onChange={(e) =>
                            setForm({ ...form, description: e.target.value })
                        }
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <InputField
                            label="Price (₹)"
                            required
                            type="number"
                            value={form.price}
                            onChange={(e) =>
                                setForm({ ...form, price: e.target.value })
                            }
                        />

                        <SelectField
                            label="Category"
                            required
                            value={form.categoryId}
                            onChange={(e) =>
                                setForm({ ...form, categoryId: e.target.value })
                            }
                            options={categories.map((c) => ({
                                label: `${c.icon} ${c.name}`,
                                value: c.id,
                            }))}
                        />
                    </div>

                    <InputField
                        label="Image URL"
                        value={form.image}
                        onChange={(e) =>
                            setForm({ ...form, image: e.target.value })
                        }
                    />

                    <div className="flex gap-6">
                        <Toggle
                            checked={form.inStock}
                            onChange={(v) => setForm({ ...form, inStock: v })}
                            label="In Stock"
                        />

                        <Toggle
                            checked={form.isVeg}
                            onChange={(v) => setForm({ ...form, isVeg: v })}
                            label="Veg"
                        />
                    </div>

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
                            onClick={handleSubmit}
                        >
                            {editingProduct ? "Update Product" : "Add Product"}
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default AdminProductsPage;
