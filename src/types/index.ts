export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    featured?: boolean;
    images?: string[];
    shippingTier?: 'small' | 'large';
}

export interface CartItem extends Product {
    quantity: number;
}
