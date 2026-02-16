import { Product } from "@/types";

export const products: Product[] = [
    {
        id: "keychain-maa",
        name: "Keychains for Maa",
        description: "Each keychain is carefully hand embroidered, keeping in mind the love and care we have for our mothers. Size - Medium (1.5 inches in diameter).",
        price: 170.00,
        image: "/images/gallery/Keychains for Maa/01.png",
        category: "Keychains",
        featured: true,
        images: [
            "/images/gallery/Keychains for Maa/01.png",
            "/images/gallery/Keychains for Maa/02.png",
            "/images/gallery/Keychains for Maa/03.png",
            "/images/gallery/Keychains for Maa/04.png"
        ],
        shippingTier: 'small'
    },
    {
        id: "keychain-papa-big",
        name: "Keychains for Papa (Big)",
        description: "Each keychain is specially hand embroidered, keeping the honour and pride we have for our forever superheroes. Size - Big (2.2 inches in diameter).",
        price: 210.00,
        image: "/images/gallery/Keychains for Papa/05.png",
        category: "Keychains",
        featured: false,
        images: [
            "/images/gallery/Keychains for Papa/05.png",
            "/images/gallery/Keychains for Papa/06.png",
            "/images/gallery/Keychains for Papa/07.png"
        ],
        shippingTier: 'small'
    },
    {
        id: "keychain-papa-medium",
        name: "Keychain for Papa (Medium)",
        description: "Each keychain is specially hand embroidered, keeping the honour and pride we have for our forever superheroes. Size - Medium (1.5 inches in diameter).",
        price: 170.00,
        image: "/images/gallery/Keychains for Papa/06.png",
        category: "Keychains",
        featured: false,
        images: [
            "/images/gallery/Keychains for Papa/05.png",
            "/images/gallery/Keychains for Papa/06.png",
            "/images/gallery/Keychains for Papa/07.png"
        ],
        shippingTier: 'small'
    },
    {
        id: "tote-bag-hand",
        name: "Hand Embroidered Tote Bag",
        description: "Minimal hand-embroidered tote bags for the quirky in you with a capacity of 4 to 5 kgs weight. Colour options available. Size - 15x15 inches.",
        price: 300.00,
        image: "/images/gallery/Hand Embroided Tote Bag/08.png",
        category: "Tote Bags",
        featured: false,
        images: [
            "/images/gallery/Hand Embroided Tote Bag/08.png",
            "/images/gallery/Hand Embroided Tote Bag/09.png",
            "/images/gallery/Hand Embroided Tote Bag/10.png",
            "/images/gallery/Hand Embroided Tote Bag/11.png",
            "/images/gallery/Hand Embroided Tote Bag/12.png",
            "/images/gallery/Hand Embroided Tote Bag/13.png"
        ],
        shippingTier: 'small'
    },
    {
        id: "tote-bag-custom",
        name: "Embroidered Tote Bag - Custom Made",
        description: "Get custom hand-embroidered tote bags for the quirky in you with a capacity of 4 to 5 kgs weight. Colour options available. Size - 15x15 inches.",
        price: 850.00,
        image: "/images/gallery/Embroidered Tote Bag - Custom Made/14.png",
        category: "Tote Bags",
        featured: false,
        images: [
            "/images/gallery/Embroidered Tote Bag - Custom Made/14.png"
        ],
        shippingTier: 'small'
    },
    {
        id: "birthday-hoop",
        name: "Birthday Hoop (Women)",
        description: "A carefully handcrafted embroidered hoop for your special women. Customization on demand. Hoop Size - 7 inches diameter.",
        price: 650.00,
        image: "/images/gallery/Birthday Hoop/15.png",
        category: "Hoops",
        featured: true,
        images: [
            "/images/gallery/Birthday Hoop/15.png",
            "/images/gallery/Birthday Hoop/16.png"
        ],
        shippingTier: 'large'
    },
    {
        id: "anniversary-hoop",
        name: "Anniversary Hoop",
        description: "Hoop Size - 8 inches diameter. Includes an Easel Stand for the hoop.",
        price: 900.00,
        image: "/images/gallery/Anniversary Hoop/17.png",
        category: "Hoops",
        featured: true,
        images: [
            "/images/gallery/Anniversary Hoop/17.png",
            "/images/gallery/Anniversary Hoop/18.png"
        ],
        shippingTier: 'large'
    }
];
