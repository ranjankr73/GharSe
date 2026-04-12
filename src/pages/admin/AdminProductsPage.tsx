import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../../redux/slices/productSlice';
import ShopDashboardLayout from '../../components/layout/ShopDashboardLayout';
import { Modal, Button, InputField, TextareaField, Toggle, EmptyState } from '../../components/ui';
import { formatCurrency } from '../../utils';
import type { Product, ProductForm } from '../../types';
import toast from 'react-hot-toast';

const EMPTY_FORM: ProductForm = {
  name: '', description: '', price: '', categoryId: '',
  image: '', inStock: true, isVeg: true,
};

const AdminProductsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, categories, loading } = useAppSelector((s) => s.products);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<ProductForm>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('all');

  useEffect(() => {
    dispatch(fetchProducts('shop-001'));
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
      toast.error('Please fill in all required fields');
      return;
    }
    setSubmitting(true);
    try {
      if (editingProduct) {
        await dispatch(updateProduct({
          id: editingProduct.id,
          updates: {
            name: form.name,
            description: form.description,
            price: parseFloat(form.price),
            categoryId: form.categoryId,
            image: form.image || editingProduct.image,
            inStock: form.inStock,
            isVeg: form.isVeg,
          },
        })).unwrap();
        toast.success('Product updated!');
      } else {
        await dispatch(createProduct({
          name: form.name,
          description: form.description,
          price: parseFloat(form.price),
          categoryId: form.categoryId,
          shopId: 'shop-001',
          image: form.image || `https://api.dicebear.com/8.x/shapes/svg?seed=${form.name}`,
          inStock: form.inStock,
          isVeg: form.isVeg,
        })).unwrap();
        toast.success('Product added!');
      }
      setModalOpen(false);
    } catch {
      toast.error('Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (product: Product) => {
    if (!confirm(`Delete "${product.name}"?`)) return;
    try {
      await dispatch(deleteProduct(product.id)).unwrap();
      toast.success('Product deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  const filtered = products
    .filter((p) => filterCat === 'all' || p.categoryId === filterCat)
    .filter((p) => !search || p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <ShopDashboardLayout title="Products">
      {/* Top bar */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-48">
          <input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-brand-400"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
        </div>
        <select
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
          className="px-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-brand-400"
        >
          <option value="all">All Categories</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
        </select>
        <Button onClick={openAdd} variant="primary" icon={<span>+</span>}>Add Product</Button>
      </div>

      {/* Products table */}
      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-16 bg-white rounded-xl animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon="🛍️"
          title="No products found"
          description="Add your first product or try a different filter."
          action={<Button onClick={openAdd} variant="primary">Add Product</Button>}
        />
      ) : (
        <div className="bg-white rounded-2xl shadow-card overflow-hidden">
          <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
            <div className="col-span-5">Product</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2">Price</div>
            <div className="col-span-1">Stock</div>
            <div className="col-span-2">Actions</div>
          </div>
          <div className="divide-y divide-slate-50">
            {filtered.map((product) => {
              const cat = categories.find((c) => c.id === product.categoryId);
              return (
                <div key={product.id} className="grid md:grid-cols-12 gap-3 md:gap-4 px-5 py-4 items-center hover:bg-slate-50 transition-colors">
                  <div className="md:col-span-5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900 text-sm truncate">{product.name}</p>
                      <p className="text-xs text-slate-400 truncate">{product.description}</p>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full font-semibold">
                      {cat?.icon} {cat?.name}
                    </span>
                  </div>
                  <div className="md:col-span-2">
                    <span className="font-bold text-slate-900">{formatCurrency(product.price)}</span>
                  </div>
                  <div className="md:col-span-1">
                    <span className={`text-xs font-bold ${product.inStock ? 'text-green-600' : 'text-red-500'}`}>
                      {product.inStock ? '● In' : '○ Out'}
                    </span>
                  </div>
                  <div className="md:col-span-2 flex gap-2">
                    <button onClick={() => openEdit(product)} className="text-xs font-semibold text-blue-500 hover:text-blue-700 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">Edit</button>
                    <button onClick={() => handleDelete(product)} className="text-xs font-semibold text-red-400 hover:text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors">Delete</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editingProduct ? 'Edit Product' : 'Add New Product'}>
        <div className="space-y-4">
          <InputField label="Product Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Fresh Tomatoes" />
          <TextareaField label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Short description..." />
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Price (₹) *" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="0" />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700">Category *</label>
              <select
                value={form.categoryId}
                onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                className="border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-400 bg-white"
              >
                <option value="">Select...</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
              </select>
            </div>
          </div>
          <InputField label="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
          <div className="flex gap-6">
            <Toggle checked={form.inStock} onChange={(v) => setForm({ ...form, inStock: v })} label="In Stock" />
            <Toggle checked={form.isVeg} onChange={(v) => setForm({ ...form, isVeg: v })} label="Veg" />
          </div>
          <div className="flex gap-3 pt-2">
            <Button onClick={() => setModalOpen(false)} variant="ghost" fullWidth>Cancel</Button>
            <Button onClick={handleSubmit} variant="primary" fullWidth loading={submitting}>
              {editingProduct ? 'Update Product' : 'Add Product'}
            </Button>
          </div>
        </div>
      </Modal>
    </ShopDashboardLayout>
  );
};

export default AdminProductsPage;