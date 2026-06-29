# Muhammad Ardiansyah — Portfolio

A modern, high-performance portfolio built with **React + Vite**.

## ✨ Features

- **React 18** with functional components and hooks
- **Vite** for lightning-fast dev & optimized builds
- **Framer Motion** (ready to use) for animations
- **CSS Modules** for scoped, maintainable styles
- **lucide-react** for consistent, accessible icons
- **react-intersection-observer** for scroll-reveal animations
- Custom `useTypewriter` and `useScrollspy` hooks
- Mobile-first responsive design
- Semantic HTML + ARIA attributes for accessibility
- Smooth scroll, hover micro-interactions
- Keyboard navigation support
- Active nav link highlighting via scrollspy

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx / .module.css
│   │   └── Footer.jsx / .module.css
│   └── sections/
│       ├── Hero.jsx    / .module.css
│       ├── About.jsx   / .module.css
│       ├── Skills.jsx  / .module.css
│       ├── Projects.jsx / .module.css
│       └── Contact.jsx / .module.css
├── constants/
│   └── data.js          ← All portfolio data here
├── hooks/
│   ├── useTypewriter.js
│   └── useScrollspy.js
├── styles/
│   └── index.css        ← Design tokens & global styles
├── App.jsx
└── main.jsx
```

## 🎨 Customization

All portfolio content lives in **`src/constants/data.js`** — edit that file to update:
- Personal info (name, email, socials)
- Skills list
- Projects

Design tokens (colors, spacing, typography) are in **`src/styles/index.css`** under `:root`.

## 🛠️ Tech Stack

| Layer     | Tech |
|-----------|------|
| Framework | React 18 + Vite 5 |
| Styling   | CSS Modules + Custom Properties |
| Icons     | lucide-react |
| Animation | CSS keyframes + react-intersection-observer |
| Fonts     | Space Grotesk, Inter, JetBrains Mono |

## 📦 Adding Framer Motion Animations

The project includes `framer-motion` as a dependency. To enable richer animations:

```jsx
import { motion } from 'framer-motion'

// Replace a div with motion.div
<motion.div
  initial={{ opacity: 0, y: 24 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  ...
</motion.div>
```

## 📄 License

Built by Muhammad Ardiansyah · 2025
