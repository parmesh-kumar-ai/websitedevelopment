
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// --- Configuration ---
// Adjust these paths as needed.
// Note: In a real scenario, you might want to move the source path to an environment variable or config file.
const SOURCE_DIR = 'C:\\Users\\Hello World!';
const PUBLIC_DIR_NAME = 'files'; // Subdirectory in public/images
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Project root is one level up from "scripts"
const PROJECT_ROOT = path.resolve(__dirname, '..');
const DEST_DIR = path.join(PROJECT_ROOT, 'public', 'images', 'gallery');
const MANIFEST_FILE = path.join(PROJECT_ROOT, 'src', 'data', 'gallery-manifest.json');

// Allowed image extensions
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];

// --- Helpers ---

function clearDirectory(dir) {
    if (fs.existsSync(dir)) {
        fs.rmSync(dir, { recursive: true, force: true });
    }
}

function ensureDirectoryExists(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function isImage(filename) {
    const ext = path.extname(filename).toLowerCase();
    return IMAGE_EXTENSIONS.includes(ext);
}

// Function to recursively crawl and copy
function crawlAndCopy(source, destSubPath, hierarchy = []) {
    const currentSourcePath = path.join(source, ...hierarchy);
    const currentDestPath = path.join(DEST_DIR, ...hierarchy);

    ensureDirectoryExists(currentDestPath);

    const items = fs.readdirSync(currentSourcePath, { withFileTypes: true });
    const manifestNode = {
        name: hierarchy.length > 0 ? hierarchy[hierarchy.length - 1] : 'root',
        path: hierarchy.join('/'),
        type: 'folder',
        children: [],
        images: [] // To store image files directly in this folder
    };

    for (const item of items) {
        if (item.isDirectory()) {
            const childNode = crawlAndCopy(source, destSubPath, [...hierarchy, item.name]);
            // Only add folder if it has content (optional, but keeps things clean)
            if (childNode.children.length > 0 || childNode.images.length > 0) {
                manifestNode.children.push(childNode);
            }
        } else if (item.isFile() && isImage(item.name)) {
            // Copy file
            const srcFile = path.join(currentSourcePath, item.name);
            const destFile = path.join(currentDestPath, item.name);
            fs.copyFileSync(srcFile, destFile);

            // Add to manifest
            // URI needed for the frontend
            const publicPath = `/images/gallery/${hierarchy.join('/')}${hierarchy.length ? '/' : ''}${item.name}`;

            manifestNode.images.push({
                name: item.name,
                src: publicPath,
                width: 0, // In a more advanced script, we could read dimensions using 'sharp' or 'image-size'
                height: 0
            });
        }
    }

    return manifestNode;
}

// --- Main Execution ---

console.log('🖼️  Starting Image Sync...');
console.log(`   Source: ${SOURCE_DIR}`);
console.log(`   Dest:   ${DEST_DIR}`);

try {
    // 1. Clear destination to remove deleted files
    console.log('🧹 Clearing destination directory...');
    clearDirectory(DEST_DIR);
    ensureDirectoryExists(DEST_DIR);
    // Ensure the data directory for manifest exists
    ensureDirectoryExists(path.dirname(MANIFEST_FILE));

    // 2. Check source exists
    if (!fs.existsSync(SOURCE_DIR)) {
        console.error(`❌ Source directory not found: ${SOURCE_DIR}`);
        console.log('   Please create it or update the SOURCE_DIR in scripts/sync-images.mjs');
        // Create it just to be helpful? No, might overwrite if path is wrong.
        process.exit(1);
    }

    // 3. Copy and Generate Manifest
    console.log('📂 Copying files and generating manifest...');
    const manifest = crawlAndCopy(SOURCE_DIR, DEST_DIR);

    // 4. Write Manifest
    console.log('📝 Writing manifest file...');
    fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2));

    console.log('✅ Sync complete!');
    console.log(`   Manifest saved to: ${MANIFEST_FILE}`);

} catch (err) {
    console.error('❌ Error during sync:', err);
    process.exit(1);
}
