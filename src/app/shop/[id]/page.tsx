import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { AddToCartButton } from "@/components/features/AddToCartButton";
import { ProductGallery } from "@/components/features/ProductGallery";
import { products } from "@/data/products";
import { ArrowLeft } from "lucide-react";

interface ProductPageProps {
    params: Promise<{
        id: string;
    }>;
}

export async function generateStaticParams() {
    return products.map((product) => ({
        id: product.id,
    }));
}

export default async function ProductPage({ XXXXXX }: ProductPageProps) {
    const { id } = await XXXXXX;
    const product = products.find((p) => p.id === id);

    if (!product) {
        notFound();
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 py-12 md:py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="mb-8">
                        <Link href="/shop" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Shop
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
                        {/* Product Gallery */}
                        <div className="w-full">
                            <ProductGallery images={product.images || [product.image]} name={product.name} />
                        </div>

                        {/* Product Details */}
                        <div className="space-y-8">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-foreground">{product.name}</h1>
                                <p className="text-lg text-primary/80 mt-2 font-medium">{product.category}</p>
                                <p className="text-3xl font-medium font-serif mt-6">₹{product.price.toFixed(2)}</p>
                            </div>

                            <div className="prose prose-stone text-muted-foreground">
                                <p>{product.description}</p>
                                <p className="mt-4">
                                   Hello world!
                                </p>
                            </div>

                            <div className="flex gap-4 pt-6 border-t border-gray-100">
                                <AddToCartButton product={product} size="lg" className="w-full md:w-auto px-12 text-base h-12">Add to Cart</AddToCartButton>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
