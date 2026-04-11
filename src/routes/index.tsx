import { createBrowserRouter } from "react-router";
import ShopPage from "../pages/ShopPage";
import CartPage from "../pages/CartPage";
import LoginPage from "../pages/LoginPage";

export const router = createBrowserRouter([
    {
        path: "/login",
        Component: LoginPage
    },
    {
        path: "/shop/:shopId",
        Component: ShopPage
    },
    {
        path: "/cart",
        Component: CartPage
    }
]);