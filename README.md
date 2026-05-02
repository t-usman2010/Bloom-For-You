<h1 align="center">🌸 Bloom for You 🌸</h1>

<p align="center">
	<em>𝓐 dreamy bouquet builder made with React, Vite, motion, and a little romantic magic.</em>
</p>

<p align="center">
	Answer playful prompts, watch the bouquet bloom, and reveal a personalized floral message.
</p>

<p align="center">
	<strong>roses</strong> · <strong>blush</strong> · <strong>glass</strong> · <strong>confetti</strong> · <strong>love</strong>
</p>

## ✨ What It Does

- 🌷 Guides the user through a floral quiz with animated transitions.
- 💐 Turns the selected answers into a custom bouquet composition.
- 🎀 Reveals the final bouquet with a downloadable SVG version.
- 🌙 Wraps everything in a warm rose, blush, and cream visual theme.

## 🌼 Features

- 🎬 Animated intro, quiz, loading, and reveal screens.
- ✨ Glass-style cards and layered atmospheric backgrounds.
- 🪄 Custom cursor petals and floating particle effects.
- 🎉 Confetti celebration when the bouquet is revealed.
- 📥 Downloadable bouquet artwork for sharing or saving.
- 📱 Mobile-friendly layout that keeps the experience centered and immersive.

## 🛠️ Tech Stack

- React 19
- Vite
- Framer Motion
- Canvas Confetti
- GSAP
- Tailwind CSS
- @fontsource Playfair Display and Lato

## 🚀 Getting Started

### 📦 Prerequisites

- Node.js 18 or newer
- npm

### 🧩 Install

```bash
npm install
```

### ▶️ Run Locally

```bash
npm run dev
```

Open the local Vite URL shown in the terminal.

### 🏗️ Build For Production

```bash
npm run build
```

### 👀 Preview The Build

```bash
npm run preview
```

### 🧹 Lint

```bash
npm run lint
```

## 🗂️ Project Structure

```text
src/
	components/    # Intro, quiz, loading, reveal, bouquet, and footer UI
	data/          # Quiz questions and answer options
	utils/         # Bouquet drawing helpers
	App.jsx        # App state and screen flow
	App.css        # App-specific theme and layout styles
	index.css      # Global styles and design tokens
```

## 🎨 Theme Notes

This app leans into a soft floral mood:

- 🌌 Deep plum and midnight background gradients
- 💗 Blush and rose-gold highlights
- 🫧 Glass panels with blur and translucent borders
- 🖋️ Elegant serif headings paired with clean sans-serif body text

## 💡 Customization Ideas

- Update the questions in [src/data/questions.js](src/data/questions.js) to change the bouquet personality.
- Tweak the visual system in [src/index.css](src/index.css) and [src/App.css](src/App.css) to shift the mood.
- Adjust the bouquet rendering logic in [src/utils/drawBouquet.js](src/utils/drawBouquet.js) for new shapes or decorations.

## 🌹 License

No license has been added yet. Add one if you want to publish or share the project publicly.
