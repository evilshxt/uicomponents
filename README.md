# 🎨 Velvron - Premium UI Components Library

> **Production-ready, beautifully crafted React components with dark theme aesthetics and cutting-edge web technologies.**

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19.1-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-r128-000000?logo=three.js)](https://threejs.org/)

---

## ✨ Why Velvron?

```mermaid
graph LR
    A["🎯 Premium Design"] --> D["⚡ Production Ready"]
    B["🔧 Easy Integration"] --> D
    C["🎨 Dark Theme"] --> D
    D --> E["🚀 Ship Faster"]
    
    style A fill:#06b6d4,stroke:#0ea5e9,color:#fff
    style B fill:#0284c7,stroke:#0ea5e9,color:#fff
    style C fill:#0369a1,stroke:#0ea5e9,color:#fff
    style D fill:#0f172a,stroke:#06b6d4,color:#06b6d4
    style E fill:#06b6d4,stroke:#0ea5e9,color:#fff
```

### 🎯 Key Features

| Feature | Description |
|---------|-------------|
| 🎨 **Premium Design** | Carefully crafted components with modern aesthetics |
| 📱 **Fully Responsive** | Mobile-first approach, works on all devices |
| 🔧 **Easy Integration** | Copy-paste ready, no build step required |
| 🌙 **Dark Theme** | Beautiful dark blue/navy gradient theme |
| ⚡ **Performance** | Optimized with GPU acceleration |
| 🎬 **Animations** | Smooth transitions and interactive effects |
| 📦 **Multiple Libraries** | React, Three.js, GSAP, Framer Motion, and more |
| 🔓 **Open Source** | MIT Licensed, free for commercial use |

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** v16+ 
- **npm** or **yarn**

### Installation & Setup

```bash
# Clone the repository
git clone https://github.com/evilshxt/uicomponents.git
cd uicomponents

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
# → http://localhost:5173
```

### Build for Production

```bash
npm run build
```

---

## 📚 How to Use Components

```mermaid
sequenceDiagram
    participant User
    participant Gallery
    participant DetailPage
    participant CodeViewer
    participant Clipboard

    User->>Gallery: Browse Components
    User->>Gallery: Click Component
    Gallery->>DetailPage: Load Component Details
    DetailPage->>DetailPage: Show Live Preview
    DetailPage->>CodeViewer: Display Component Code
    User->>CodeViewer: Click Copy Button
    CodeViewer->>Clipboard: Copy to Clipboard
    Clipboard->>User: ✅ Code Ready to Use
```

### 3 Simple Steps

1. **Browse** the component gallery
2. **Preview** the live demo
3. **Copy** the code and integrate into your project

Each component includes:
- ✅ Live interactive preview
- ✅ Full source code with syntax highlighting
- ✅ Copy-to-clipboard functionality
- ✅ Component metadata (dependencies, tags, author)
- ✅ Responsive design showcase

---

## 🎁 Available Components

```mermaid
graph TB
    subgraph Components["📦 Component Library"]
        A["🎴 Card Component"]
        B["📱 Navbar Component"]
        C["🌀 3D SVG Scene"]
        D["⚛️ React 3D Torus"]
    end
    
    subgraph Features["✨ Features"]
        E["Dark Theme"]
        F["Responsive"]
        G["Interactive"]
        H["Copy Code"]
    end
    
    A --> E
    B --> E
    C --> G
    D --> G
    A --> F
    B --> F
    A --> H
    B --> H
    C --> H
    D --> H
    
    style A fill:#06b6d4,stroke:#0ea5e9,color:#fff
    style B fill:#0284c7,stroke:#0ea5e9,color:#fff
    style C fill:#0369a1,stroke:#0ea5e9,color:#fff
    style D fill:#7c3aed,stroke:#0ea5e9,color:#fff
    style E fill:#0f172a,stroke:#06b6d4,color:#06b6d4
    style F fill:#0f172a,stroke:#06b6d4,color:#06b6d4
    style G fill:#0f172a,stroke:#06b6d4,color:#06b6d4
    style H fill:#0f172a,stroke:#06b6d4,color:#06b6d4
```

| Component | Category | Tech Stack | Status |
|-----------|----------|-----------|--------|
| **Card** | Layout | HTML/CSS/Tailwind | ✅ Production |
| **Navbar** | Navigation | HTML/CSS/Tailwind | ✅ Production |
| **3D SVG Scene** | 3D Graphics | Three.js/Vanilla JS | ✅ Production |
| **React 3D Torus** | 3D Graphics | React/Three.js | ✅ Production |

---

## 🤝 Contributing Components

### Step-by-Step Guide

```mermaid
flowchart LR
    A["📁 Create Folder"] --> B["📝 Add manifest.json"]
    B --> C["🎨 Create index.html"]
    C --> D["🖼️ Add thumbnail"]
    D --> E["🔄 Run generate-components"]
    E --> F["✅ Test in dev server"]
    F --> G["🚀 Submit PR"]
    
    style A fill:#06b6d4,color:#fff
    style B fill:#0284c7,color:#fff
    style C fill:#0369a1,color:#fff
    style D fill:#0f172a,stroke:#06b6d4,color:#06b6d4
    style E fill:#0369a1,color:#fff
    style F fill:#0284c7,color:#fff
    style G fill:#06b6d4,color:#fff
```

### 1️⃣ Create Component Folder

```bash
mkdir -p public/library/your-component-name
cd public/library/your-component-name
```

### 2️⃣ Add `manifest.json`

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

### 3️⃣ Create `index.html` Demo

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Component</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
    <div id="demo">
        <!-- Your component here -->
    </div>
    <script>
        // Your component code
    </script>
</body>
</html>
```

### 4️⃣ Add Thumbnail (Optional)

- Size: **400x300px**
- Format: **JPG or PNG**
- File: `thumbnail.jpg` or `thumbnail.png`

### 5️⃣ Generate & Test

```bash
# Update component registry
npm run generate-components

# Start dev server
npm run dev

# Navigate to http://localhost:5173/components/your-component-name
```

### 6️⃣ Submit Pull Request

- ✅ All files properly formatted
- ✅ Component tested and working
- ✅ Documentation updated
- ✅ Follows component guidelines

---

## 📋 Component Guidelines

| Guideline | Details |
|-----------|---------|
| 🏗️ **HTML** | Use semantic HTML5 elements |
| 📱 **Responsive** | Mobile-first design approach |
| ♿ **Accessibility** | ARIA labels, keyboard navigation |
| ⚡ **Performance** | Optimize bundle size, lazy load images |
| 🎨 **Styling** | Match dark theme, use Tailwind CSS |
| 🧪 **Testing** | Test on Chrome, Firefox, Safari, Edge |
| 📚 **Code Style** | Follow existing patterns and conventions |

---

## 🛠️ Supported Technologies

```mermaid
graph TB
    subgraph Frontend["Frontend"]
        A["HTML5"]
        B["CSS3"]
        C["JavaScript"]
    end
    
    subgraph Frameworks["Frameworks"]
        D["React"]
        E["Vue"]
        F["Svelte"]
    end
    
    subgraph Libraries["Libraries"]
        G["Three.js"]
        H["GSAP"]
        I["Framer Motion"]
        J["Anime.js"]
    end
    
    subgraph Styling["Styling"]
        K["Tailwind CSS"]
        L["Pure CSS"]
    end
    
    style A fill:#06b6d4,color:#fff
    style B fill:#06b6d4,color:#fff
    style C fill:#06b6d4,color:#fff
    style D fill:#61dafb,color:#000
    style E fill:#4fc08d,color:#fff
    style F fill:#ff3e00,color:#fff
    style G fill:#000,color:#fff
    style H fill:#88ce02,color:#000
    style I fill:#0099ff,color:#fff
    style J fill:#ff1654,color:#fff
    style K fill:#06b6d4,color:#fff
    style L fill:#06b6d4,color:#fff
```

**All components run in isolated iframes** - no library conflicts! 🎉

---

## 🤖 Tech Stack

```mermaid
graph TB
    subgraph Core["⚙️ Core"]
        A["React 19.1"]
        B["TypeScript 5.9"]
        C["Vite 7.2"]
    end
    
    subgraph Styling["🎨 Styling"]
        D["Tailwind CSS 4.1"]
        E["CSS3"]
    end
    
    subgraph Animation["🎬 Animation"]
        F["Framer Motion"]
        G["Anime.js"]
        H["GSAP"]
    end
    
    subgraph 3D["🌐 3D Graphics"]
        I["Three.js r128"]
    end
    
    style A fill:#61dafb,color:#000
    style B fill:#3178c6,color:#fff
    style C fill:#ffc400,color:#000
    style D fill:#06b6d4,color:#fff
    style E fill:#06b6d4,color:#fff
    style F fill:#0099ff,color:#fff
    style G fill:#ff1654,color:#fff
    style H fill:#88ce02,color:#000
    style I fill:#000,color:#fff
```

---

## 📊 Project Stats

| Metric | Value |
|--------|-------|
| 📦 Components | 4 Production-Ready |
| 🎨 Themes | Dark Blue/Navy |
| 📱 Responsive | Mobile-First |
| ⚡ Performance | GPU Accelerated |
| 🔓 License | MIT (Free) |
| 🌍 Browser Support | All Modern Browsers |

---

## 🚀 Getting Help

- 📖 **Documentation**: Check the README and component guides
- 🐛 **Issues**: Report bugs on GitHub
- 💬 **Discussions**: Join our community discussions
- 🎯 **Contributing**: See [Contributing Guide](CONTRIBUTING.md)

---

## 📝 License

This project is licensed under the **MIT License** - free for commercial and personal use.

See the [LICENSE](LICENSE) file for full details.

---

## 🙌 Built With Love By

**Velvron Team** - Creating beautiful, production-ready UI components.

```
Made with ❤️ by Velvron Labs for developers who care about design
```

---

## ⭐ Show Your Support

If you find Velvron useful, please consider:
- ⭐ Starring the repository
- 🔗 Sharing with your network
- 🤝 Contributing components
- 💬 Providing feedback

---

**Happy Building! 🚀**
