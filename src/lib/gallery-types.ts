export interface GalleryImage {
    name: string;
    src: string;
    width: number;
    height: number;
}

export interface GalleryNode {
    name: string;
    path: string;
    type: 'folder';
    children: GalleryNode[];
    images: GalleryImage[];
}
