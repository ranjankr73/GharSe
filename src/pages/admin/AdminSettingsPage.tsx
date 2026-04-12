import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchShop, updateShop } from '../../redux/slices/shopSlice';
import ShopDashboardLayout from '../../components/layout/ShopDashboardLayout';
import { InputField, Button, Toggle } from '../../components/ui';
import toast from 'react-hot-toast';

const AdminSettingsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { shop, loading } = useAppSelector((s) => s.shop);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: '',
    tagline: '',
    phone: '',
    address: '',
    deliveryTime: '',
    minOrder: '',
    deliveryFee: '',
    isOpen: true,
  });

  useEffect(() => {
    dispatch(fetchShop('shop-001'));
  }, [dispatch]);

  useEffect(() => {
    if (shop) {
      setForm({
        name: shop.name,
        tagline: shop.tagline,
        phone: shop.phone,
        address: shop.address,
        deliveryTime: shop.deliveryTime,
        minOrder: String(shop.minOrder),
        deliveryFee: String(shop.deliveryFee),
        isOpen: shop.isOpen,
      });
    }
  }, [shop]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await dispatch(updateShop({
        name: form.name,
        tagline: form.tagline,
        phone: form.phone,
        address: form.address,
        deliveryTime: form.deliveryTime,
        minOrder: parseFloat(form.minOrder) || 0,
        deliveryFee: parseFloat(form.deliveryFee) || 0,
        isOpen: form.isOpen,
      })).unwrap();
      toast.success('Settings saved!');
    } catch {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const f = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  if (loading && !shop) {
    return (
      <ShopDashboardLayout title="Settings">
        <div className="space-y-4 animate-pulse">
          {Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-16 bg-white rounded-2xl" />)}
        </div>
      </ShopDashboardLayout>
    );
  }

  return (
    <ShopDashboardLayout title="Settings">
      <div className="max-w-2xl space-y-6">
        {/* Shop Status */}
        <div className="bg-white rounded-2xl shadow-card p-6">
          <h2 className="font-display font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center text-base">🏪</span>
            Shop Status
          </h2>
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
            <div>
              <p className="font-semibold text-slate-800">Shop is {form.isOpen ? 'Open' : 'Closed'}</p>
              <p className="text-sm text-slate-500 mt-0.5">
                {form.isOpen ? 'Customers can place orders right now.' : 'Customers will see your shop as closed.'}
              </p>
            </div>
            <Toggle
              checked={form.isOpen}
              onChange={(v) => setForm((f) => ({ ...f, isOpen: v }))}
            />
          </div>
        </div>

        {/* Basic Info */}
        <div className="bg-white rounded-2xl shadow-card p-6">
          <h2 className="font-display font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-brand-100 rounded-xl flex items-center justify-center text-base">📝</span>
            Basic Information
          </h2>
          <div className="space-y-4">
            <InputField label="Shop Name" value={form.name} onChange={f('name')} placeholder="Your shop name" />
            <InputField label="Tagline" value={form.tagline} onChange={f('tagline')} placeholder="Short description..." />
            <InputField label="Phone Number" value={form.phone} onChange={f('phone')} placeholder="+91 ..." type="tel" />
            <InputField label="Address" value={form.address} onChange={f('address')} placeholder="Full shop address" />
          </div>
        </div>

        {/* Delivery Settings */}
        <div className="bg-white rounded-2xl shadow-card p-6">
          <h2 className="font-display font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-orange-100 rounded-xl flex items-center justify-center text-base">🛵</span>
            Delivery Settings
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <InputField
              label="Delivery Time"
              value={form.deliveryTime}
              onChange={f('deliveryTime')}
              placeholder="e.g. 25–40 min"
            />
            <InputField
              label="Minimum Order (₹)"
              type="number"
              value={form.minOrder}
              onChange={f('minOrder')}
              placeholder="100"
            />
            <InputField
              label="Delivery Fee (₹)"
              type="number"
              value={form.deliveryFee}
              onChange={f('deliveryFee')}
              placeholder="20"
            />
          </div>
        </div>

        {/* Save */}
        <div className="flex justify-end">
          <Button onClick={handleSave} variant="primary" size="lg" loading={saving}>
            Save Settings
          </Button>
        </div>
      </div>
    </ShopDashboardLayout>
  );
};

export default AdminSettingsPage;