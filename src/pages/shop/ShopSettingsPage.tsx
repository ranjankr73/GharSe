import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchShop, updateShop } from "../../redux/slices/shopSlice";

import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";
import Toggle from "../../components/ui/Toggle";
import Skeleton from "../../components/ui/Skeleton";

import toast from "react-hot-toast";

const ShopSettingsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { shop, loading } = useAppSelector((s) => s.shop);

  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    tagline: "",
    phone: "",
    address: "",
    deliveryTime: "",
    minOrder: "",
    deliveryFee: "",
    isOpen: true,
  });

  useEffect(() => {
    dispatch(fetchShop("shop-001"));
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
      await dispatch(
        updateShop({
          name: form.name,
          tagline: form.tagline,
          phone: form.phone,
          address: form.address,
          deliveryTime: form.deliveryTime,
          minOrder: parseFloat(form.minOrder) || 0,
          deliveryFee: parseFloat(form.deliveryFee) || 0,
          isOpen: form.isOpen,
        })
      ).unwrap();

      toast.success("Settings saved!");
    } catch {
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const f =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  if (loading && !shop) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-0 space-y-6">

      {/* 🏪 SHOP STATUS */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
        
        <h2 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="w-8 h-8 bg-red-50 rounded-xl flex items-center justify-center">
            🏪
          </span>
          Shop Status
        </h2>

        <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
          
          <div>
            <p className="text-sm font-medium text-gray-800">
              Shop is {form.isOpen ? "Open" : "Closed"}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              {form.isOpen
                ? "Customers can place orders"
                : "Customers cannot place orders"}
            </p>
          </div>

          <Toggle
            checked={form.isOpen}
            onChange={(v) =>
              setForm((f) => ({ ...f, isOpen: v }))
            }
          />
        </div>
      </div>

      {/* 📝 BASIC INFO */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
        
        <h2 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="w-8 h-8 bg-red-50 rounded-xl flex items-center justify-center">
            📝
          </span>
          Basic Information
        </h2>

        <div className="space-y-4">
          <InputField label="Shop Name" value={form.name} onChange={f("name")} required />
          <InputField label="Tagline" value={form.tagline} onChange={f("tagline")} />
          <InputField label="Phone Number" value={form.phone} onChange={f("phone")} type="tel" />
          <InputField label="Address" value={form.address} onChange={f("address")} />
        </div>
      </div>

      {/* 🛵 DELIVERY SETTINGS */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
        
        <h2 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="w-8 h-8 bg-red-50 rounded-xl flex items-center justify-center">
            🛵
          </span>
          Delivery Settings
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputField
            label="Delivery Time"
            value={form.deliveryTime}
            onChange={f("deliveryTime")}
            placeholder="25–40 min"
          />

          <InputField
            label="Minimum Order (₹)"
            type="number"
            value={form.minOrder}
            onChange={f("minOrder")}
          />

          <InputField
            label="Delivery Fee (₹)"
            type="number"
            value={form.deliveryFee}
            onChange={f("deliveryFee")}
          />
        </div>
      </div>

      {/* 💾 SAVE */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          size="lg"
          loading={saving}
        >
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default ShopSettingsPage;