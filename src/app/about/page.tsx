import Link from "next/link";
import NextImage from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 py-12 md:py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="flex-1 space-y-6 w-full">
                            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-foreground text-center">Our Story</h1>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Hello world!
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                               Hello world!
                            </p>
                            <div className="pt-4 flex justify-center">
                                <Link href="/shop">
                                    <Button size="lg">View My Work</Button>
                                </Link>
                            </div>
                            <div className="pt-8 flex flex-col items-center gap-6 w-full">
                                <p className="text-xl text-foreground font-serif font-medium text-center">
                                    Connect with us on Instagram
                                </p>

                                <a
                                    href="https://www.instagram.com/XXXXXXXXXX"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative w-48 h-48 rounded-lg overflow-hidden shadow-md border-2 border-white flex-shrink-0 hover:opacity-90 transition-opacity cursor-pointer block"
                                >
                                    <Image
                                        src="/images/gallery/instagram.jpeg"
                                        alt="Instagram QR Code"
                                        fill
                                        className="object-cover"
                                    />
                                </a>

                                <div className="flex flex-col items-center gap-2 text-center">
                                    <a
                                        href="https://www.instagram.com/XXXXXXXXXX"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6"
                                    >
                                        Follow @XXXXXXXXXXX
                                    </a>
                                    <p className="text-muted-foreground text-sm max-w-xs">
                                        Scan the code or click above to follow our journey.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:flex-1">
                            <div className="w-full md:aspect-[3/4] bg-muted rounded-lg relative overflow-hidden flex items-center justify-center text-muted-foreground shadow-sm">
                                {/* Mobile Image - Standard IMG tag for max reliability */}
                                <img
                                    src="/images/artist.png"
                                    alt="XXXXXXXXX"
                                    className="w-full h-auto object-cover md:hidden block"
                                />
                                {/* Desktop Image - Next Image for optimization */}
                                <div className="hidden md:block w-full h-full relative">
                                    <NextImage
                                        src="/images/artist.png"
                                        alt="XXXXXXXXXXXX"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
