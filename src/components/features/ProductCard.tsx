import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AddToCartButton } from "@/components/features/AddToCartButton";
import { Product } from "@/types"

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="group relative flex flex-col overflow-hidden rounded-lg border bg-background transition-all hover:shadow-md">
            <div className="aspect-square relative overflow-hidden bg-muted/50">
                {product.image ? (
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground bg-muted">
                        <span className="text-xs">No Image</span>
                    </div>
                )}
            </div>
            <div className="flex flex-col flex-1 p-4 space-y-3">
                <div className="flex-1 space-y-1">
                    <h3 className="font-serif text-lg font-medium group-hover:text-primary transition-colors line-clamp-1">
                        <Link href={`/shop/${product.id}`} className="focus:outline-none">
                            <span className="absolute inset-0 z-10" aria-hidden="true" />
                            {product.name}
                        </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                </div>
                <div className="flex items-center justify-between pt-2">
                    <p className="font-medium font-serif text-lg">₹{product.price.toFixed(2)}</p>
                    <AddToCartButton product={product} className="relative z-20 h-8 px-4" size="sm">Add</AddToCartButton>
                </div>
            </div>
        </div>
    )
}
