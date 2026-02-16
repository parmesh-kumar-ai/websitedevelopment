import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/features/ProductCard";
import { products } from "@/data/products";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import galleryManifest from "@/data/gallery-manifest.json";
import { GalleryNode } from "@/lib/gallery-types";

export default function ShopPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 py-12 md:py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col items-center text-center mb-12 space-y-4">
                        <h1 className="text-4xl font-serif font-bold tracking-tight text-foreground">Shop All Collections</h1>
                        <p className="text-muted-foreground max-w-2xl text-lg">
                            Hello world!
                        </p>
                    </div>

                    {/* Standard Products */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {/* Dynamic Gallery */}

                </div>
            </main>
            <Footer />
        </div>
    );
}
