import { useEffect } from "react";
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

export default function ShopPage() {
    
    useEffect(() => {
        // Fetch shop data from an API
    }, []);

    return (
        <>
            <h1>Shop Name</h1>
            <span>Open/Close Status</span>
            <div>
                <h2>Product Catalog</h2>
                <ul>
                    {
                        products.map(product => <ProductCard key={product.name} name={product.name} price={product.price} />)
                    }
                </ul>
            </div>
        </>
    )
}