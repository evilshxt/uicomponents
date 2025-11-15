# UI Components Library

An open-source collection of reusable UI components built with React, TypeScript, Tailwind CSS, and pure CSS. Perfect for developers looking to quickly integrate beautiful, responsive components into their projects.

## Features

- **Free and Open-Source**: Licensed under MIT. Use commercially or personally without restrictions.
- **Diverse Components**: Cards, modals, animations, and more.
- **Multiple Styling Options**: Components styled with Tailwind CSS and pure CSS.
- **Easy Integration**: Copy-paste ready components.
- **Responsive Design**: Mobile-first approach.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/evilshxt/uicomponents.git
   cd uicomponents
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

Browse the components in the gallery, view the code, and copy the component you need. Each component includes:

- Live preview
- Code snippet
- Usage instructions

## Adding New Components

To contribute a new component to the library:

### 1. Create Component Structure
Create a new folder in `public/library/` with your component name (use lowercase, hyphens for spaces):
```
public/library/your-component-name/
```

### 2. Add Required Files
Inside your component folder, create these files:

#### `manifest.json` (Required)
```json
{
  "name": "your-component-name",
  "category": "Category Name",
  "description": "Brief description of your component",
  "tags": ["tag1", "tag2", "tag3"],
  "author": "Your Name",
  "languages": ["html", "css", "js"],
  "dependencies": ["library1", "library2"]
}
```

#### `index.html` (Required)
The main demo file. Include all necessary scripts and styles:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Component Demo</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Add your component's dependencies here -->
</head>
<body>
    <!-- Your component demo HTML -->
    <div id="demo">
        <!-- Component goes here -->
    </div>

    <script>
        // Your component JavaScript
    </script>
</body>
</html>
```

#### `thumbnail.jpg` or `thumbnail.png` (Optional but Recommended)
A preview image of your component (recommended size: 400x300px).

### 3. Generate Component List
Run the generation script to update the component registry:
```bash
npm run generate-components
```

### 4. Test Your Component
Start the development server:
```bash
npm run dev
```
Navigate to your component in the gallery and test the demo.

### 5. Submit a Pull Request
- Ensure all files are properly formatted
- Test that the component loads correctly
- Update any relevant documentation

### Component Guidelines
- Use semantic HTML
- Ensure responsive design
- Include proper accessibility attributes
- Keep bundle size small
- Test in multiple browsers
- Follow the existing code style

### Supported Languages & Libraries
Components can use any web technologies:
- HTML, CSS, JavaScript
- React (with CDN)
- Libraries: Three.js, GSAP, Framer Motion, Anime.js, etc.
- Any framework via CDN or bundled scripts

The demo runs in an isolated iframe, so libraries won't conflict with the main app.

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Built With

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Anime.js](https://animejs.com/)
- [AOS](https://michalsnik.github.io/aos/)
- [GSAP](https://greensock.com/gsap/)
- [Three.js](https://threejs.org/)
- And more...
