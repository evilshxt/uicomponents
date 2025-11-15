import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const libraryDir = path.join(__dirname, '..', 'public', 'library');
const outputFile = path.join(__dirname, '..', 'public', 'components-list.json');

function generateComponentsList() {
  try {
    // Check if library directory exists
    if (!fs.existsSync(libraryDir)) {
      console.log('Library directory does not exist, creating empty list');
      fs.writeFileSync(outputFile, JSON.stringify([], null, 2));
      return;
    }

    // Read all items in library directory
    const items = fs.readdirSync(libraryDir, { withFileTypes: true });

    // Filter for directories that contain manifest.json
    const componentNames = [];
    for (const item of items) {
      if (item.isDirectory()) {
        const manifestPath = path.join(libraryDir, item.name, 'manifest.json');
        if (fs.existsSync(manifestPath)) {
          // Validate manifest.json is valid JSON
          try {
            const manifestContent = fs.readFileSync(manifestPath, 'utf8');
            JSON.parse(manifestContent);
            componentNames.push(item.name);
          } catch (error) {
            console.warn(`Invalid manifest.json in ${item.name}: ${error.message}`);
          }
        }
      }
    }

    // Sort alphabetically
    componentNames.sort();

    // Write to components-list.json
    fs.writeFileSync(outputFile, JSON.stringify(componentNames, null, 2));
    console.log(`Generated components list with ${componentNames.length} components: ${componentNames.join(', ')}`);
  } catch (error) {
    console.error('Error generating components list:', error);
    process.exit(1);
  }
}

generateComponentsList();