import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks";

import {
  createOrder,
} from "../../redux/slices/orderSlice";
import {
  clearCart,
  selectCartItems,
  selectCartTotal,
} from "../../redux/slices/cartSlice";

import CustomerNavbar from "../../components/layout/CustomerNavbar";
import InputField from "../../components/ui/InputField";
import TextareaField from "../../components/ui/TextareaField";
import Button from "../../components/ui/Button";

import {
  formatCurrency,
  validateName,
  validatePhone,
  validateAddress,
} from "../../utils";

import toast from "react-hot-toast";

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectCartTotal);
  const shop = useAppSelector((s) => s.shop.shop);
  const { loading } = useAppSelector((s) => s.orders);

  const deliveryFee = shop?.deliveryFee ?? 20;

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    address: "",
    note: "",
  });

  const [errors, setErrors] = useState<any>({});

  const validate = () => {
    const errs: any = {};

    if (!validateName(form.customerName))
      errs.customerName = "Enter valid name";

    if (!validatePhone(form.phone))
      errs.phone = "Enter valid phone";

    if (!validateAddress(form.address))
      errs.address = "Enter full address";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      if (errors[field]) setErrors((e: any) => ({ ...e, [field]: undefined }));
    };

  const handleSubmit = async () => {
    if (!validate()) return;

    if (cartItems.length === 0) {
      navigate("/browse-shops");
      return;
    }

    try {
      const result = await dispatch(
        createOrder({
          shopId: shop?.id ?? "shop-001",
          ...form,
          items: cartItems.map((i) => ({
            productId: i.product.id,
            productName: i.product.name,
            price: i.product.price,
            quantity: i.quantity,
          })),
          totalAmount: cartTotal,
          deliveryFee,
          status: "pending",
          estimatedDelivery: shop?.deliveryTime ?? "30–45 min",
        })
      ).unwrap();

      dispatch(clearCart());
      toast.success("Order placed 🎉");
      navigate("/success", { state: { order: result } });
    } catch {
      toast.error("Failed to place order");
    }
  };

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/browse-shops");
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50 pb-40 md:pt-14">

      {/* 🔥 HEADER */}
      <header className="sticky top-0 md:top-14 z-20 bg-white border-b border-gray-100 px-4 py-4 flex items-center gap-3">
        
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center"
        >
          ←
        </button>

        <h1 className="text-lg font-semibold text-gray-800">
          Checkout
        </h1>
      </header>

      <div className="max-w-2xl mx-auto px-4 mt-5 space-y-4">

        {/* 📍 DELIVERY DETAILS */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          
          <h2 className="text-sm font-medium text-gray-800 mb-4">
            Delivery Details
          </h2>

          <div className="space-y-4">
            <InputField
              label="Full Name"
              value={form.customerName}
              onChange={handleChange("customerName")}
              error={errors.customerName}
              required
            />

            <InputField
              label="Phone Number"
              value={form.phone}
              onChange={handleChange("phone")}
              error={errors.phone}
              type="tel"
              maxLength={10}
              required
            />

            <TextareaField
              label="Delivery Address"
              value={form.address}
              onChange={handleChange("address")}
              error={errors.address}
              required
            />

            <TextareaField
              label="Order Note"
              value={form.note}
              onChange={handleChange("note")}
            />
          </div>
        </div>

        {/* 🛒 ORDER SUMMARY */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          
          <h2 className="text-sm font-medium text-gray-800 mb-4">
            Order Summary
          </h2>

          <div className="space-y-3">
            {cartItems.map((item) => (
              <div key={item.product.id} className="flex items-center gap-3">
                
                <div className="w-10 h-10 rounded-xl bg-gray-100 overflow-hidden">
                  <img src={item.product.image} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {item.product.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {formatCurrency(item.product.price)} × {item.quantity}
                  </p>
                </div>

                <span className="text-sm font-semibold text-gray-900">
                  {formatCurrency(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-dashed border-gray-200 mt-4 pt-3 space-y-2 text-sm">
            
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{formatCurrency(cartTotal)}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Delivery fee</span>
              <span>{formatCurrency(deliveryFee)}</span>
            </div>

            <div className="flex justify-between pt-2 border-t border-gray-100">
              <span className="font-semibold text-gray-900">
                Total
              </span>
              <span className="text-lg font-bold text-gray-900">
                {formatCurrency(cartTotal + deliveryFee)}
              </span>
            </div>
          </div>
        </div>

        {/* 💵 PAYMENT */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex gap-3">
          <span className="text-xl">💵</span>
          <div>
            <p className="text-sm font-medium text-red-700">
              Cash on Delivery
            </p>
            <p className="text-xs text-red-500">
              Pay when your order arrives
            </p>
          </div>
        </div>
      </div>

      {/* 🚀 CTA */}
      <div className="fixed bottom-16 md:bottom-4 left-0 right-0 z-30 px-4 pb-3">
        <div className="max-w-2xl mx-auto">
          
          <Button
            onClick={handleSubmit}
            size="lg"
            fullWidth
            loading={loading}
          >
            Place Order • {formatCurrency(cartTotal + deliveryFee)}
          </Button>
        </div>
      </div>

      <CustomerNavbar />
    </div>
  );
};

export default CheckoutPage;