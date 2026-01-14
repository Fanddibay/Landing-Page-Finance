# Fanplanner Landing Page

A modern, clean, and professional landing page for Fanplanner - a personal finance web app.

## Features

- ✨ Modern Vue 3 with Composition API
- 🎨 TailwindCSS v3 for styling
- 🌐 Bilingual support (English / Indonesian)
- 📱 Mobile-first responsive design
- 🎯 Smooth animations and transitions
- ♿ Accessible and semantic HTML

## Tech Stack

- Vue 3 (Composition API)
- TailwindCSS v3
- Vite (build tool)

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Project Structure

```
src/
  ├── components/        # Vue components
  │   ├── Header.vue
  │   ├── HeroSection.vue
  │   ├── AboutSection.vue
  │   ├── FeaturesSection.vue
  │   ├── PricingSection.vue
  │   ├── CTASection.vue
  │   ├── ContactSection.vue
  │   └── Footer.vue
  ├── composables/       # Vue composables
  │   └── useI18n.js    # Language switching logic
  ├── App.vue           # Main app component
  ├── main.js           # App entry point
  └── style.css         # Global styles
```

## Language Support

The landing page supports two languages:
- English (EN)
- Indonesian (ID)

Language preference is saved in localStorage and persists across sessions.

