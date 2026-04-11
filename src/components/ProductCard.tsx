import { useState } from "react";
import { useLocation } from "react-router";

export interface ProductType {
    name: string;
    price: number;
    image?: string;
}

export default function ProductCard({ name, price, image }: ProductType) {
    const [quantity, setQuantity] = useState<number>(0);
    const path = useLocation();

    const keywords = path.pathname.split("/");

    return (
        <div>
            <img src={image} />

            <div>
                <h2>{name}</h2>
                <span>{price}</span>

                {keywords[1] === "cart" ? (
                    <div>
                        <button
                            onClick={() =>
                                setQuantity((q) => {
                                    if (q - 1 < 0) return 0;
                                    return q - 1;
                                })
                            }
                        >
                            -
                        </button>
                        <span>{quantity}</span>
                        <button onClick={() => setQuantity((q) => q + 1)}>
                            +
                        </button>
                    </div>
                ) : (
                    <button>Add to Cart</button>
                )}
            </div>
        </div>
    );
}
