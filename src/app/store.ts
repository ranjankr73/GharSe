import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import shopReducer from "../features/shop/shopSlice";
import orderReducer from "../features/order/orderSlice";
import productReducer from "../features/product/productSlice";
import categoryReducer from "../features/category/categorySlice";
import adminReducer from "../features/admin/adminSlice";
import cartReducer from "../features/cart/cartSlice";
import customerOrderReducer from "../features/customerOrder/customerOrderSlice";
import publicShopReducer from "../features/publicShop/publicShopSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        shop: shopReducer,
        order: orderReducer,
        product: productReducer,
        category: categoryReducer,
        admin: adminReducer,
        cart: cartReducer,
        customerOrder: customerOrderReducer,
        publicShop: publicShopReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;