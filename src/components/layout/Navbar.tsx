"use client";

import Link from 'next/link';
import * as React from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useShop } from '@/context/shop-context';
import { cn } from '@/lib/utils';

export function Navbar() {
    const { openCart, cartCount } = useShop();

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 md:px-6 flex h-16 items-center justify-between">
                <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-primary hover:text-primary/90 transition-colors">
                    The Moody Picasso
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex gap-8 items-center">
                    <Link href="/" className="text-sm font-medium hover:text-primary transition-colors text-foreground/80">Home</Link>
                    <Link href="/shop" className="text-sm font-medium hover:text-primary transition-colors text-foreground/80">Shop</Link>
                    <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors text-foreground/80">About</Link>
                    <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors text-foreground/80">Contact</Link>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" aria-label="Shopping Cart" className="text-foreground/80 hover:text-primary relative" onClick={openCart}>
                        <ShoppingBag className="h-5 w-5" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-white">
                                {cartCount}
                            </span>
                        )}
                        <span className="sr-only">Cart</span>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden text-foreground bg-background/50 backdrop-blur-sm z-50"
                        aria-label="Menu"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        <span className="sr-only">Menu</span>
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-40 bg-background/50 backdrop-blur-md md:hidden flex items-start justify-center pt-24 px-6 animate-in slide-in-from-top-5">
                    <div className="flex flex-col gap-6 text-center w-full max-w-sm bg-background/95 p-6 rounded-xl shadow-2xl border border-muted/20">
                        <Link
                            href="/"
                            className="text-xl font-medium hover:text-primary transition-colors py-3 border-b border-muted/20"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/shop"
                            className="text-xl font-medium hover:text-primary transition-colors py-3 border-b border-muted/20"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Shop
                        </Link>
                        <Link
                            href="/about"
                            className="text-xl font-medium hover:text-primary transition-colors py-3 border-b border-muted/20"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            About
                        </Link>
                        <Link
                            href="/contact"
                            className="text-xl font-medium hover:text-primary transition-colors py-3 border-b border-muted/20"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Contact
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    )
}
