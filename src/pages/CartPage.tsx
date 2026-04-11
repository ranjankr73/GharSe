import { useState } from "react";
import type { ProductType } from "../components/ProductCard";
import ProductCard from "../components/ProductCard";

const products: ProductType[] = [
    {
        name: "Manchurian",
        price: 5,
    },
    {
        name: "Chicken Boneless Chilli",
        price: 10
    }
]

export default function CartPage(){
    const [totalPrice, setTotalPrice] = useState<number>(products.reduce((acc, curr) => acc + curr.price, 0));

    return (
        <div>
            { products.map(product => <ProductCard key={product.name} name={product.name} price={product.price} />)}

            <span>Total Price: {totalPrice}</span>
            <button>Place Order</button>
            <button>Order on WhatsApp</button>
        </div>
    );
}