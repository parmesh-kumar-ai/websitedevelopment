import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
    return (
        <section className="w-full py-24 md:py-32 lg:py-48 relative border-b border-gray-100 flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0 opacity-20 bg-cover bg-center"
                style={{ backgroundImage: 'url("/images/hero.jpg")' }}
            />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="flex flex-col items-center space-y-6 text-center">
                    <div className="space-y-4 max-w-3xl">
                        <span className="text-4xl font-serif font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-primary mb-4 block">The Moody Picasso</span>
                        <h1 className="text-3xl font-serif font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl text-foreground">
                            Hello world!
                        </h1>
                        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-xl/relaxed">
                            Hello world!
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Link href="/shop">
                            <Button size="lg" className="h-12 px-8 text-base shadow-md">Shop Collection</Button>
                        </Link>
                        <Link href="/about">
                            <Button variant="outline" size="lg" className="h-12 px-8 text-base">Our Story</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
