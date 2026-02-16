"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Format message for WhatsApp
        const text = `*New Inquiry from Website*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Message:* ${formData.message}`;

        // Open WhatsApp
        // Using the business phone number: 91XXXXXXXXXX
        window.open(`https://wa.me/91XXXXXXXXXX?text=${text}`, '_blank');
    };

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 py-12 md:py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col items-center text-center mb-16 space-y-4">
                        <h1 className="text-4xl font-serif font-bold tracking-tight text-foreground">Get in Touch</h1>
                        <p className="text-muted-foreground max-w-2xl text-lg">
                            Have a question about a custom order or just want to say hello? I'd love to hear from you.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
                        {/* Contact Info */}
                        <div className="space-y-8">
                            <div className="bg-muted/20 p-8 rounded-xl border border-muted/50 space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-primary/10 rounded-full text-primary">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1">Contact</h3>
                                        <p className="text-muted-foreground">+91 XXXXXXXXXX</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-primary/10 rounded-full text-primary">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1">Email</h3>
                                        <a href="mailto:xxxxxxxxxx@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                                            xxxxxxxxxxx@gmail.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-primary/10 rounded-full text-primary">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1">Visit Us</h3>
                                        <p className="text-muted-foreground">
                                            XXXXXXXX<br />
                                            XXXXXXXXX<br />
                                            XXXXXX
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Google Map */}
                            <div className="h-[300px] w-full rounded-xl overflow-hidden border border-gray-200">
                                <iframe
                                    src="https://www.google.com/maps"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Location Map"
                                ></iframe>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="space-y-6 bg-card p-8 rounded-xl border shadow-sm">
                            <h2 className="text-2xl font-serif font-semibold">Send a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid gap-2">
                                    <label htmlFor="name" className="text-sm font-medium leading-none">Name</label>
                                    <input
                                        id="name"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="Your name"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <label htmlFor="email" className="text-sm font-medium leading-none">Email</label>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="your@email.com"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <label htmlFor="message" className="text-sm font-medium leading-none">Message</label>
                                    <textarea
                                        id="message"
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="How can I help you?"
                                    />
                                </div>

                                <Button type="submit" className="w-full h-12 text-base bg-[#25D366] hover:bg-[#128C7E] text-white">
                                    Send via WhatsApp
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
