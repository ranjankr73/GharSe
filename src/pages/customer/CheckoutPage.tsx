import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { createOrder } from '../../redux/slices/orderSlice';
import { clearCart, selectCartItems, selectCartTotal } from '../../redux/slices/cartSlice';
import { CustomerNav } from '../../components/layout';
import InputField from '../../components/ui/InputField';
import TextareaField from '../../components/ui/TextareaField';
import Button from '../../components/ui/Button';
import { formatCurrency, validateName, validatePhone, validateAddress } from '../../utils';
import type { CheckoutForm } from '../../types';
import toast from 'react-hot-toast';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectCartTotal);
  const shop = useAppSelector((s) => s.shop.shop);
  const { loading } = useAppSelector((s) => s.orders);
  const deliveryFee = shop?.deliveryFee ?? 20;

  const [form, setForm] = useState<CheckoutForm>({
    customerName: '',
    phone: '',
    address: '',
    note: '',
  });
  const [errors, setErrors] = useState<Partial<CheckoutForm>>({});

  const validate = (): boolean => {
    const errs: Partial<CheckoutForm> = {};
    if (!validateName(form.customerName)) errs.customerName = 'Please enter your full name (min 2 chars)';
    if (!validatePhone(form.phone)) errs.phone = 'Enter a valid 10-digit Indian mobile number';
    if (!validateAddress(form.address)) errs.address = 'Address must be at least 10 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (field: keyof CheckoutForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    if (cartItems.length === 0) {
      toast.error('Your cart is empty!');
      navigate('/shop/shop-001');
      return;
    }

    const orderItems = cartItems.map((i) => ({
      productId: i.product.id,
      productName: i.product.name,
      price: i.product.price,
      quantity: i.quantity,
    }));

    try {
      const result = await dispatch(createOrder({
        shopId: shop?.id ?? 'shop-001',
        customerName: form.customerName,
        phone: form.phone,
        address: form.address,
        note: form.note,
        items: orderItems,
        totalAmount: cartTotal,
        deliveryFee,
        status: 'pending',
        estimatedDelivery: shop?.deliveryTime ?? '30–45 min',
      })).unwrap();

      dispatch(clearCart());
      toast.success('Order placed successfully! 🎉');
      navigate('/success', { state: { order: result } });
    } catch (err) {
      toast.error('Failed to place order. Please try again.');
    }
  };

  if (cartItems.length === 0) {
    navigate('/shop/shop-001');
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      {/* Header */}
      <header className="bg-white px-4 py-4 border-b border-slate-100 flex items-center gap-3 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-slate-100">←</button>
        <h1 className="font-display font-bold text-slate-900 text-lg">Checkout</h1>
      </header>

      <div className="max-w-lg mx-auto px-4 mt-5 space-y-4">
        {/* Delivery Details */}
        <div className="bg-white rounded-2xl shadow-card p-5">
          <h2 className="font-display font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-brand-100 rounded-lg flex items-center justify-center text-sm">📍</span>
            Delivery Details
          </h2>
          <div className="space-y-4">
            <InputField
              label="Full Name"
              placeholder="e.g. Priya Sharma"
              value={form.customerName}
              onChange={handleChange('customerName')}
              error={errors.customerName}
              icon={<span>👤</span>}
            />
            <InputField
              label="Phone Number"
              placeholder="10-digit mobile number"
              value={form.phone}
              onChange={handleChange('phone')}
              error={errors.phone}
              type="tel"
              maxLength={10}
              icon={<span>📱</span>}
            />
            <TextareaField
              label="Delivery Address"
              placeholder="House no., Street, Area, City..."
              value={form.address}
              onChange={handleChange('address')}
              error={errors.address}
              rows={3}
            />
            <TextareaField
              label="Order Note (optional)"
              placeholder="Any special instructions for the shop..."
              value={form.note}
              onChange={handleChange('note')}
              rows={2}
            />
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl shadow-card p-5">
          <h2 className="font-display font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-brand-100 rounded-lg flex items-center justify-center text-sm">🛒</span>
            Order Summary
          </h2>
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div key={item.product.id} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                  <img src={item.product.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">{item.product.name}</p>
                  <p className="text-xs text-slate-400">{formatCurrency(item.product.price)} × {item.quantity}</p>
                </div>
                <span className="font-bold text-slate-900 text-sm shrink-0">{formatCurrency(item.product.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-dashed border-slate-200 mt-4 pt-3 space-y-2">
            <div className="flex justify-between text-sm text-slate-500">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-800">{formatCurrency(cartTotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-slate-500">
              <span>Delivery fee</span>
              <span className="font-semibold text-slate-800">{formatCurrency(deliveryFee)}</span>
            </div>
            <div className="flex justify-between border-t border-slate-100 pt-2">
              <span className="font-bold text-slate-900">Total</span>
              <span className="font-display font-bold text-brand-600 text-lg">{formatCurrency(cartTotal + deliveryFee)}</span>
            </div>
          </div>
        </div>

        {/* Payment Info */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-3">
          <span className="text-2xl">💵</span>
          <div>
            <p className="font-semibold text-amber-800 text-sm">Cash on Delivery</p>
            <p className="text-xs text-amber-600 mt-0.5">Payment will be collected at the time of delivery.</p>
          </div>
        </div>
      </div>

      {/* Place Order Button */}
      <div className="fixed bottom-16 left-0 right-0 px-4 pb-4 bg-linear-to-t from-slate-50 via-slate-50/95 to-transparent pt-6 z-20">
        <div className="max-w-lg mx-auto">
          <Button
            onClick={handleSubmit}
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
          >
            {loading ? 'Placing Order...' : `Place Order · ${formatCurrency(cartTotal + deliveryFee)}`}
          </Button>
        </div>
      </div>

      <CustomerNav />
    </div>
  );
};

export default CheckoutPage;