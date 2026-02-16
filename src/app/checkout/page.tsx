"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useShop } from "@/context/shop-context";
import Image from "next/image";
import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
    const { cart, cartTotal, updateQuantity, removeFromCart } = useShop();
    const router = useRouter();

    const [isGuest, setIsGuest] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        pincode: "",
        notes: ""
    });

    // Load saved data if available (simple "Remember Me" simulation)
    useEffect(() => {
        const savedData = localStorage.getItem("checkoutData");
        if (savedData) {
            setFormData(JSON.parse(savedData));
            setIsGuest(false);
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const toggleGuest = (value: boolean) => {
        setIsGuest(value);
        if (!value) {
            // Saving data "Registers" them
            localStorage.setItem("checkoutData", JSON.stringify(formData));
        } else {
            // Guest mode doesn't clear data immediately but "disconnects"
            localStorage.removeItem("checkoutData");
        }
    };

    // Calculate Shipping
    const calculateShipping = () => {
        if (cartTotal >= 1500) return 0;

        return cart.reduce((total, item) => {
            const itemRate = item.shippingTier === 'large' ? 150 : 50;
            return total + (itemRate * item.quantity);
        }, 0);
    };

    const shippingCharge = calculateShipping();
    const finalTotal = cartTotal + shippingCharge;

    const handlePlaceOrder = () => {
        if (!formData.name || !formData.phone || !formData.address) {
            alert("Please fill in the required fields (Name, Phone, Address).");
            return;
        }

        // Save data if "Registered"
        if (!isGuest) {
            localStorage.setItem("checkoutData", JSON.stringify(formData));
        }

        // Construct WhatsApp Message
        let message = `*New Order Request*\n\n`;
        message += `*Customer Details:*\n`;
        message += `Name: ${formData.name}\n`;
        message += `Phone: ${formData.phone}\n`;
        message += `Email: ${formData.email}\n`;
        message += `Address: ${formData.address}, ${formData.city} - ${formData.pincode}\n\n`;

        if (formData.notes) {
            message += `*Customization Notes:*\n${formData.notes}\n\n`;
        }

        message += `*Order Summary:*\n`;
        cart.forEach(item => {
            message += `- ${item.name} (x${item.quantity}): ₹${(item.price * item.quantity).toFixed(2)}\n`;
        });

        message += `\nSubtotal: ₹${cartTotal.toFixed(2)}`;
        message += `\nDelivery: ${shippingCharge === 0 ? "FREE" : "₹" + shippingCharge}`;
        message += `\n*TOTAL: ₹${finalTotal.toFixed(2)}*`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/91XXXXXXXXXX?text=${encodedMessage}`;

        window.open(whatsappUrl, "_blank");
    };

    if (cart.length === 0) {
        return (
            <div className="flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1 flex flex-col items-center justify-center p-4">
                    <h1 className="text-2xl font-serif font-bold mb-4">Your cart is empty</h1>
                    <Link href="/shop">
                        <Button>Continue Shopping</Button>
                    </Link>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 py-8 md:py-12 bg-muted/10">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="mb-6">
                        <Link href="/shop" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Shop
                        </Link>
                    </div>

                    <h1 className="text-3xl font-serif font-bold mb-8">Checkout</h1>

                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Left Column: Form */}
                        <div className="space-y-8">
                            {/* Guest/Register Toggle */}
                            <div className="bg-card p-6 rounded-xl border shadow-sm">
                                <div className="flex items-center gap-4 mb-4">
                                    <button
                                        onClick={() => toggleGuest(true)}
                                        className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${isGuest ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
                                    >
                                        Guest Checkout
                                    </button>
                                    <button
                                        onClick={() => toggleGuest(false)}
                                        className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${!isGuest ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
                                    >
                                        Register / Save Info
                                    </button>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {isGuest
                                        ? "Proceed without saving your details for next time."
                                        : "Your details will be saved on this device for faster checkout next time."}
                                </p>
                            </div>

                            {/* Shipping Details */}
                            <div className="bg-card p-6 rounded-xl border shadow-sm space-y-4">
                                <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium">Full Name *</label>
                                        <input id="name" name="name" value={formData.name} onChange={handleInputChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none" placeholder="Hasnat Khan" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="phone" className="text-sm font-medium">Phone Number *</label>
                                        <input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none" placeholder="+91 98765 43210" required />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                                    <input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none" placeholder="you@example.com" />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="address" className="text-sm font-medium">Address *</label>
                                    <input id="address" name="address" value={formData.address} onChange={handleInputChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none" placeholder="Street, Sector, House No." required />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="city" className="text-sm font-medium">City</label>
                                        <input id="city" name="city" value={formData.city} onChange={handleInputChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none" placeholder="City Name" />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="pincode" className="text-sm font-medium">Pincode</label>
                                        <input id="pincode" name="pincode" value={formData.pincode} onChange={handleInputChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none" placeholder="335001" />
                                    </div>
                                </div>
                            </div>

                            {/* Customization Notes */}
                            <div className="bg-card p-6 rounded-xl border shadow-sm space-y-4">
                                <h2 className="text-xl font-semibold mb-2">Customization Requests</h2>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Want to add a name, change colors, or have a specific design request? Let us know here!
                                </p>
                                <textarea
                                    id="notes"
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleInputChange}
                                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                                    placeholder="Example: Please stitch the name 'Aditi' on the tote bag..."
                                />
                            </div>
                        </div>

                        {/* Right Column: Order Summary */}
                        <div className="lg:sticky lg:top-24 space-y-6">
                            <div className="bg-card p-6 rounded-xl border shadow-sm">
                                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                                <div className="space-y-6 mb-6 max-h-[400px] overflow-y-auto pr-2">
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex gap-4">
                                            <div className="relative h-20 w-20 overflow-hidden rounded-md border bg-muted flex-shrink-0">
                                                {item.image ? (
                                                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                                                ) : (
                                                    <div className="w-full h-full bg-muted flex items-center justify-center text-xs text-muted-foreground">No Img</div>
                                                )}
                                            </div>
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div>
                                                    <h3 className="font-medium text-sm line-clamp-2">{item.name}</h3>
                                                    <p className="text-sm font-medium mt-1">₹{item.price.toFixed(2)}</p>
                                                </div>

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
                                    ))}
                                </div>

                                <div className="space-y-3 border-t pt-4">
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Subtotal</span>
                                        <span>₹{cartTotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Delivery Charges</span>
                                        <span>{shippingCharge === 0 ? <span className="text-green-600 font-medium">FREE</span> : `₹${shippingCharge.toFixed(2)}`}</span>
                                    </div>
                                    {shippingCharge > 0 && (
                                        <p className="text-xs text-muted-foreground italic">
                                            Shop for ₹{(1500 - cartTotal).toFixed(2)} more for free delivery!
                                        </p>
                                    )}
                                    <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2">
                                        <span>Total</span>
                                        <span>₹{finalTotal.toFixed(2)}</span>
                                    </div>
                                </div>

                                <Button onClick={handlePlaceOrder} className="w-full text-base py-6 mt-8 shadow-md">
                                    Place Order on WhatsApp
                                </Button>
                                <p className="text-xs text-center text-muted-foreground mt-4">
                                    Clicking matches you with our business WhatsApp account to confirm your order details.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
