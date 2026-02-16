"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useShop } from "@/context/shop-context";
import Image from "next/image";

export function CartSidebar() {
    const { isCartOpen, closeCart, cart, removeFromCart, updateQuantity, cartTotal } = useShop();

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-black z-40" // z-40 to sit below sidebar z-50
                    />
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-background shadow-xl border-l flex flex-col"
                    >
                        <div className="flex items-center justify-between p-4 border-b">
                            <h2 className="text-lg font-serif font-bold">Shopping Cart</h2>
                            <Button variant="ghost" size="icon" onClick={closeCart}>
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {cart.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-2">
                                    <p>Your cart is empty.</p>
                                    <Button variant="link" onClick={closeCart}>Continue Shopping</Button>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="relative h-20 w-20 overflow-hidden rounded-md border bg-muted flex-shrink-0">
                                            {item.image ? (
                                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                                            ) : (
                                                <div className="w-full h-full bg-muted flex items-center justify-center text-xs text-muted-foreground">No Img</div>
                                            )}
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <h3 className="font-medium line-clamp-1">{item.name}</h3>
                                            <p className="text-sm text-muted-foreground">₹{item.price.toFixed(2)}</p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                                                    <Minus className="h-3 w-3" />
                                                </Button>
                                                <span className="text-sm w-4 text-center">{item.quantity}</span>
                                                <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                                    <Plus className="h-3 w-3" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-7 w-7 ml-auto text-destructive hover:text-destructive/90 hover:bg-destructive/10" onClick={() => removeFromCart(item.id)}>
                                                    <Trash2 className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className="border-t p-4 space-y-4 bg-muted/10">
                                <div className="flex justify-between font-medium text-lg">
                                    <span>Total</span>
                                    <span>₹{cartTotal.toFixed(2)}</span>
                                </div>
                                <Button className="w-full text-base py-6 shadow-md" onClick={() => { closeCart(); window.location.href = '/checkout'; }}>Checkout</Button>
                                <p className="text-xs text-center text-muted-foreground">Shipping and taxes calculated at checkout.</p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
