
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// --- Configuration ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Project root is one level up from "scripts"
const PROJECT_ROOT = path.resolve(__dirname, '..');
const GALLERY_DIR = path.join(PROJECT_ROOT, 'public', 'images', 'gallery');
const MANIFEST_FILE = path.join(PROJECT_ROOT, 'src', 'data', 'gallery-manifest.json');

// Allowed image extensions
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];

// --- Helpers ---

function isImage(filename) {
    const ext = path.extname(filename).toLowerCase();
    return IMAGE_EXTENSIONS.includes(ext);
}

// Function to recursively crawl
function crawl(dir, hierarchy = []) {
    const items = fs.readdirSync(dir, { withFileTypes: true });

    // Determine the relative path for this node from fragments
    // On Windows path.join uses backslashes, but URLs need forward slashes.
    // We'll use the hierarchy array to build the URL path.
    const relativePath = hierarchy.join('/');

    const manifestNode = {
        name: hierarchy.length > 0 ? hierarchy[hierarchy.length - 1] : 'gallery',
        path: relativePath,
        type: 'folder',
        children: [],
        images: []
    };

    for (const item of items) {
        if (item.isDirectory()) {
            const childNode = crawl(path.join(dir, item.name), [...hierarchy, item.name]);
            if (childNode.children.length > 0 || childNode.images.length > 0) {
                manifestNode.children.push(childNode);
            }
        } else if (item.isFile() && isImage(item.name)) {
            // Add to manifest
            // URI needed for the frontend
            const publicPath = `/images/gallery/${relativePath ? relativePath + '/' : ''}${item.name}`;

            manifestNode.images.push({
                name: item.name,
                src: publicPath,
                width: 0, // Placeholder
                height: 0
            });
        }
    }

    return manifestNode;
}

// --- Main Execution ---

console.log('🖼️  Generating Gallery Manifest...');
console.log(`   Scanning: ${GALLERY_DIR}`);

try {
    if (!fs.existsSync(GALLERY_DIR)) {
        console.error(`❌ Gallery directory not found: ${GALLERY_DIR}`);
        process.exit(1);
    }

    const manifest = crawl(GALLERY_DIR);

    console.log('📝 Writing manifest file...');
    fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2));

    console.log('✅ Manifest generated!');
    console.log(`   Saved to: ${MANIFEST_FILE}`);

} catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
}
