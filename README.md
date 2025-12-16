# 🎄 Holiday Card Maker

A festive winter holiday card maker built for **Dev Interrupted's 2025 holiday episode**. Create custom greeting cards with drawing tools, stickers, and decorations, then export and share your creations!

![Holiday Card Maker](https://img.shields.io/badge/Made%20with-React%20%2B%20Vite-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

### 🎨 Drawing Tools
- **Pen Tool** - Smooth, precise drawing
- **Brush Tool** - Multiple brush types (Round, Sparkle, Calligraphy)
- **Highlighter** - Semi-transparent marker effect
- **Spray Paint** - Particle-based spray effect
- **Eraser** - Variable size eraser
- **Shape Tools** - Rectangles, circles, and stars
- **Text Tool** - Add custom text with festive fonts

### 🎁 Sticker Library
- **27 Curated Stickers** organized in 4 categories:
  - ❄️ **Snowflakes** (6 variations)
  - ⛷️ **Winter Elements** (8 items)
  - 🎁 **Festive Decorations** (8 items)
  - 🎙️ **Dev Interrupted Branding** (5 items)

### 🖼️ Card Formats
- **Landscape** (1400x1000px) - Traditional greeting card
- **Portrait** (1000x1400px) - Vertical card format
- **Square** (1200x1200px) - Social media optimized

### 💾 Smart Features
- **Undo/Redo** - 20-step history (Ctrl+Z / Ctrl+Y)
- **Auto-save** - Saves to localStorage every 30 seconds
- **Export** - PNG or JPG with standard/high-res options
- **Keyboard Shortcuts** - Fast workflow
- **Mobile Responsive** - Works on phones and tablets

---

## 🎁 Extension Challenges

**Ready to make this project your own?** We've prepared 5 fun extension challenges perfect for live coding, learning, or v0 remixing!

### Available Extensions

| Challenge | Difficulty | Time | What You'll Build |
|-----------|-----------|------|-------------------|
| [📸 Upload Image Sticker](./extend-me/02-upload-image-sticker.md) | ⭐ Easy | 20-30 min | Let users upload photos as stickers |
| [🎭 Emoji Picker](./extend-me/04-emoji-picker.md) | ⭐ Easy | 20-30 min | Add emojis as decorative elements |
| [🌈 Gradient Tool](./extend-me/01-gradient-tool.md) | ⭐⭐ Medium | 30-45 min | Create beautiful gradient effects |
| [🎨 Rubber Stamp Tool](./extend-me/05-rubber-stamp-tool.md) | ⭐⭐ Medium | 30-45 min | Stamp repeating patterns and shapes |
| [🤖 AI Sticker Generator](./extend-me/03-ai-sticker-generation.md) | ⭐⭐⭐ Advanced | 45-75 min | Generate custom stickers with AI |

### Why Try These?

Each challenge includes:
- ✅ **Complete implementation guide** - Step-by-step instructions
- 📁 **Exact file locations** - Know where to add code
- 💡 **Code examples** - Copy-paste to get started
- 🎨 **Enhancement ideas** - Basic → Advanced features
- 🔗 **Resources** - APIs, docs, and tutorials
- ✅ **Success criteria** - Know when you're done

Perfect for:
- 🎥 **Live coding streams** (like Dev Interrupted!)
- 🏫 **Learning React + Fabric.js**
- 💻 **v0 remixing competitions**
- 🎮 **Hackathon challenges**

**[📚 View All Extension Challenges →](./extend-me/README.md)**

---

## 🚀 Quick Start

### Installation

```bash
# Clone or download this project
cd holiday-card-maker

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
npm run build
npm run preview
```

### Deploy to v0

```bash
# Build the project
npm run build

# Upload the 'dist' folder to v0
# Or zip and upload the entire project
```

**🔧 v0 Compatibility:** This project is optimized for v0 deployment with:
- Unicode/emoji support (no `btoa` errors)
- Relative asset paths
- Proper code splitting
- See [V0-DEPLOYMENT.md](./V0-DEPLOYMENT.md) for detailed guide

## 🎯 How to Use

1. **Select a Tool** - Click a tool icon in the left toolbar
2. **Customize** - Adjust color, size, and opacity
3. **Draw** - Click and drag on the canvas
4. **Add Stickers** - Browse stickers in the right panel and click to add
5. **Transform** - Select objects to resize, rotate, or delete
6. **Export** - Click "Export" to download your card

### Keyboard Shortcuts

- `Ctrl+Z` - Undo
- `Ctrl+Y` - Redo
- `Ctrl+E` - Export dialog
- `Delete` - Delete selected object
- `Ctrl+D` - Duplicate selected object
- `Ctrl+A` - Select all objects
- `Escape` - Deselect all

## 🎨 Customization Guide

### Adding New Stickers

1. **Create your sticker** as an SVG or PNG (transparent background)
2. **Save it** to `public/assets/stickers/[category]/`
3. **Update manifest** at `public/assets/manifest.json`:

```json
{
  "id": "my-sticker",
  "name": "My Sticker",
  "category": "decorations",
  "path": "/assets/stickers/decorations/my-sticker.svg",
  "tags": ["custom", "festive"]
}
```

### Changing Colors

Edit `tailwind.config.js` to customize the festive color palette:

```javascript
colors: {
  'brand-purple': {
    500: '#7C3AED',  // Change to your brand color
  },
  // Add more custom colors
}
```

### Modifying Canvas Sizes

Edit `src/utils/constants.ts`:

```typescript
export const CANVAS_FORMATS: Record<CanvasFormat, CanvasConfig> = {
  landscape: { width: 1400, height: 1000, ratio: '7:5' },
  // Add or modify formats
}
```

### Adding New Brush Types

1. **Define brush type** in `src/types/tools.ts`
2. **Create brush preset** in `src/utils/brushPresets.ts`
3. **Add to selector** in `src/components/Toolbar.tsx`

## 🛠️ Tech Stack

- **[Vite](https://vitejs.dev/)** - Fast build tool and dev server
- **[React 18](https://react.dev/)** - UI framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Fabric.js](http://fabricjs.com/)** - Canvas manipulation library
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Lightweight state management
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS
- **[Lucide React](https://lucide.dev/)** - Icon library

## 📁 Project Structure

```
holiday-card-maker/
├── public/
│   └── assets/
│       ├── stickers/          # All sticker assets
│       └── manifest.json      # Asset metadata
├── src/
│   ├── components/            # React components
│   ├── hooks/                 # Custom React hooks
│   ├── store/                 # Zustand state management
│   ├── types/                 # TypeScript definitions
│   ├── utils/                 # Utility functions
│   └── App.tsx                # Main app component
├── .cursor/
│   ├── SPEC.md               # Detailed specification
│   └── SPEC_TASKS.md         # Implementation checklist
└── package.json
```

## 🎁 For Dev Interrupted

This card maker is designed specifically for Dev Interrupted's 2025 holiday episode! It features:

- **Prominent Dev Interrupted branding** in the header and sticker library
- **Podcast-themed stickers** (microphone, logo, badges)
- **Season's Greetings banner** with Dev Interrupted branding
- **Social media handle sticker** for easy sharing

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Type-check with TypeScript

### Code Style

- **TypeScript** strict mode enabled
- **Functional components** with hooks
- **Tailwind CSS** for styling
- **Comments** on all major functions

## 🌟 Remix This Project on v0

This project is **designed for v0 remixing**! We've made it easy to extend and customize.

### 🎯 Start with Extension Challenges

Try our [5 ready-to-code extension challenges](./extend-me/README.md):
- 📸 Upload custom images
- 🎭 Add emoji picker
- 🌈 Gradient tool
- 🎨 Rubber stamp tool
- 🤖 AI sticker generation

Each challenge includes complete instructions, code examples, and success criteria!

### 💡 More Remix Ideas

**Theming:**
- Birthday cards, thank you cards, wedding invitations
- Seasonal themes (Halloween, Valentine's, etc.)
- Corporate/branded card maker
- Meme maker with text overlays

**New Features:**
- Templates library with pre-designed layouts
- Layer panel with visual preview
- Advanced text formatting (curves, gradients, outlines)
- Photo filters and effects
- Animation/GIF export

**Integrations:**
- Cloud save (Firebase, Supabase)
- Social media direct sharing
- Print-on-demand service (Printful, Printify)
- Real-time collaboration (PartyKit, Yjs)
- Payment for premium features (Stripe)

### 📤 Share Your Remix

Made something cool? 
1. Upload to v0
2. Post on social with **#HolidayCardMaker**
3. Share the link with the community!

**[📚 View Extension Challenges →](./extend-me/README.md)**

## 📝 License

MIT License - Feel free to use, modify, and distribute!

## 🙏 Credits

Built with ❤️ for **Dev Interrupted**

Special thanks to:
- The React team for an amazing framework
- Fabric.js for powerful canvas manipulation
- The open-source community

## 🐛 Known Issues

- Eraser tool uses white color (proper eraser implementation coming soon)
- Mobile toolbar simplified (full controls on desktop only)
- Text tool basic implementation (more formatting options coming)

## 🚀 What's Next?

Want to contribute? Check out our [extension challenges](./extend-me/README.md) or suggest your own ideas!

**Community Requested Features:**
- [ ] Preset templates gallery
- [ ] More advanced text formatting
- [ ] Layer panel with visual preview
- [ ] Zoom and pan controls
- [ ] SVG export option
- [ ] Cloud save functionality
- [ ] Collaborative editing with PartyKit

**✅ Completed Features:**
- [x] All core drawing tools
- [x] 27 curated stickers
- [x] Undo/redo with history
- [x] Auto-save to localStorage
- [x] Export PNG/JPG
- [x] Mobile responsive UI
- [x] Extension challenge docs

---

**Made for Dev Interrupted's 2025 Holiday Episode** 🎄🎙️

For questions or contributions, visit the [Dev Interrupted community](https://devinterrupted.com)!

