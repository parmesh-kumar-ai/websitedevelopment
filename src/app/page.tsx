import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/layout/Hero";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/features/ProductCard";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";

export default function Home() {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />

        {/* Featured Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row mb-12">
              <div className="space-y-1">
                <h2 className="text-3xl font-serif font-bold tracking-tight">Featured Collections</h2>
                <p className="text-muted-foreground">Hello world!</p>
              </div>
              <Link href="/shop">
                <Button variant="ghost" className="gap-1">
                  View all products <span aria-hidden="true">&rarr;</span>
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* About Teaser */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-serif font-bold tracking-tight">The Artwork with Traditional Hand Embroidery</h2>
                <p className="text-muted-foreground text-lg">
                  Hello world!
                </p>
                <div className="pt-4">
                  <Link href="/about">
                    <Button>Read More About Us</Button>
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 h-full min-h-[400px]">
                <div className="relative h-full rounded-lg overflow-hidden">
                  <Image
                    src="/images/gallery/p1.jpg"
                    alt="Slow Stitching Art 1"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="grid grid-rows-2 gap-4 h-full">
                  <div className="relative h-full rounded-lg overflow-hidden">
                    <Image
                      src="/images/gallery/p2.jpg"
                      alt="Slow Stitching Art 2"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-full rounded-lg overflow-hidden">
                    <Image
                      src="/images/gallery/p3.jpg"
                      alt="Slow Stitching Art 3"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
