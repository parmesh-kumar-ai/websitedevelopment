"use client";

import { useShop } from "@/context/shop-context";
import { Button, ButtonProps } from "@/components/ui/button";
import { Product } from "@/types";

interface AddToCartButtonProps extends ButtonProps {
    product: Product;
}

export function AddToCartButton({ product, className, children, ...props }: AddToCartButtonProps) {
    const { addToCart } = useShop();

    return (
        <Button
            className={className}
            onClick={(e) => {
                e.preventDefault(); // Prevent link navigation if inside a link
                addToCart(product);
            }}
            {...props}
        >
            {children || "Add to Cart"}
        </Button>
    );
}
