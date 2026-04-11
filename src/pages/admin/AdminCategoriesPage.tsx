import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchProducts, createCategory, deleteCategory } from '../../redux/slices/productSlice';
import { AdminLayout } from '../../components/layout';
import { Modal, Button, InputField, EmptyState } from '../../components/ui';
import toast from 'react-hot-toast';

const EMOJI_OPTIONS = ['🥦', '🥛', '🍞', '🍿', '☕', '🫙', '🍎', '🥩', '🐟', '🍜', '🧴', '🧹', '💊', '🌿', '🥚'];

const AdminCategoriesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { categories, products } = useAppSelector((s) => s.products);
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('🥦');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts('shop-001'));
  }, [dispatch]);

  const handleAdd = async () => {
    if (!name.trim()) { toast.error('Category name is required'); return; }
    setSubmitting(true);
    try {
      await dispatch(createCategory({ name: name.trim(), icon, shopId: 'shop-001' })).unwrap();
      toast.success('Category added!');
      setModalOpen(false);
      setName('');
      setIcon('🥦');
    } catch {
      toast.error('Failed to add category');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, catName: string) => {
    const hasProducts = products.some((p) => p.categoryId === id);
    if (hasProducts) {
      toast.error(`Cannot delete "${catName}" — it has products`);
      return;
    }
    if (!confirm(`Delete category "${catName}"?`)) return;
    try {
      await dispatch(deleteCategory(id)).unwrap();
      toast.success('Category deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  return (
    <AdminLayout title="Categories">
      <div className="flex justify-between items-center mb-5">
        <p className="text-slate-500 text-sm">{categories.length} categories</p>
        <Button onClick={() => setModalOpen(true)} variant="primary" icon={<span>+</span>}>
          Add Category
        </Button>
      </div>

      {categories.length === 0 ? (
        <EmptyState icon="📂" title="No categories" description="Add your first category to organise products." action={<Button onClick={() => setModalOpen(true)} variant="primary">Add Category</Button>} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => {
            const productCount = products.filter((p) => p.categoryId === cat.id).length;
            return (
              <div key={cat.id} className="bg-white rounded-2xl shadow-card p-5 flex items-center gap-4 group hover:shadow-card-hover transition-all animate-fade-up">
                <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center text-3xl shrink-0">
                  {cat.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-bold text-slate-900">{cat.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{productCount} product{productCount !== 1 ? 's' : ''}</p>
                </div>
                <button
                  onClick={() => handleDelete(cat.id, cat.name)}
                  className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 text-xs font-semibold hover:bg-red-50 px-2 py-1 rounded-lg transition-all"
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Category">
        <div className="space-y-4">
          <InputField label="Category Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Beverages" />
          <div>
            <label className="text-sm font-semibold text-slate-700 block mb-2">Pick an Icon</label>
            <div className="flex flex-wrap gap-2">
              {EMOJI_OPTIONS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => setIcon(emoji)}
                  className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all
                    ${icon === emoji ? 'bg-brand-500 shadow-brand scale-110' : 'bg-slate-100 hover:bg-slate-200'}`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <Button onClick={() => setModalOpen(false)} variant="ghost" fullWidth>Cancel</Button>
            <Button onClick={handleAdd} variant="primary" fullWidth loading={submitting}>Add Category</Button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
};

export default AdminCategoriesPage;