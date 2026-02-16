'use client';

import { useState } from 'react';
import Image from 'next/image';
import { GalleryNode, GalleryImage } from '@/lib/gallery-types';
import { motion } from 'framer-motion';

interface GalleryGridProps {
    manifest: GalleryNode;
}

export default function GalleryGrid({ manifest }: GalleryGridProps) {
    // Flatten the tree or just show the root?
    // Let's create a view that allows navigation or just listing everything.
    // For now, let's list everything in a flat-ish structure with headers for folders.

    // Recursively collect all folders that have images
    const collectFolders = (node: GalleryNode): GalleryNode[] => {
        let folders: GalleryNode[] = [];
        if (node.images.length > 0) {
            folders.push(node);
        }
        node.children.forEach(child => {
            folders = [...folders, ...collectFolders(child)];
        });
        return folders;
    };

    const folders = collectFolders(manifest);

    if (folders.length === 0) {
        return (
            <div className="text-center py-20 text-gray-500">
                <p>No images found in the gallery.</p>
                <p className="text-sm mt-2">Run <code>npm run sync-images</code> to update.</p>
            </div>
        );
    }

    return (
        <div className="space-y-12">
            {folders.map((folder) => (
                <section key={folder.path} className="space-y-6">
                    <div className="border-b border-gray-100 pb-4">
                        <h2 className="text-2xl font-light text-gray-900 capitalize">
                            {folder.name === 'root' ? 'All Artworks' : folder.name}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {folder.images.map((image) => (
                            <GalleryItem key={image.src} image={image} />
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}

function GalleryItem({ image }: { image: GalleryImage }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative aspect-square bg-gray-50 overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
        >
            <Image
                src={image.src}
                alt={image.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-sm font-medium truncate">{image.name}</p>
            </div>
        </motion.div>
    );
}
