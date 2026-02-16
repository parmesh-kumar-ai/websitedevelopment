import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ShopProvider } from "@/context/shop-context";
import { CartSidebar } from "@/components/features/CartSidebar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Hello world!",
  description: "Hello world!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased font-sans bg-background text-foreground`}
      >
        <ShopProvider>
          {children}
          <CartSidebar />
        </ShopProvider>
      </body>
    </html>
  );
}
