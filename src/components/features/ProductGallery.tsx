"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
    images: string[];
    name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(images[0] || "/placeholder.svg");

    if (!images || images.length === 0) {
        return (
            <div className="aspect-square relative overflow-hidden rounded-lg border border-gray-100 bg-muted/30 shadow-sm flex items-center justify-center text-muted-foreground">
                <span className="text-lg">No Image Available</span>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square relative overflow-hidden rounded-lg border border-gray-100 bg-muted/30 shadow-sm">
                <Image
                    src={selectedImage}
                    alt={name}
                    fill
                    className="object-cover transition-all duration-300"
                    priority
                />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImage(image)}
                            className={cn(
                                "relative aspect-square overflow-hidden rounded-md border bg-muted/30 cursor-pointer transition-all hover:opacity-100",
                                selectedImage === image
                                    ? "ring-2 ring-primary border-primary opacity-100"
                                    : "border-transparent opacity-70 hover:border-gray-300"
                            )}
                            aria-label={`View image ${index + 1}`}
                        >
                            <Image
                                src={image}
                                alt={`${name} thumbnail ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
