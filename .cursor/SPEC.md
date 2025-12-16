# Holiday Card Maker - Technical Specification

## Overview

An interactive winter holiday card maker web application that allows users to design custom greeting cards using drawing tools, stickers, stamps, and decorations. Built for Dev Interrupted's 2025 holiday episode, designed for easy deployment and remixing on v0.

## Design Philosophy

- **Inclusive & Festive**: Non-denominational winter/holiday theme welcoming to all
- **Nostalgic Fun**: Inspired by classic creative software like Rugrats Print Shop
- **Social First**: Built for sharing and remixing on v0
- **Professional Quality**: Export high-resolution cards suitable for digital sharing

## Technical Architecture

### Tech Stack

- **Vite 5.x** - Fast build tool and development server
- **React 18.x** - Component-based UI framework
- **TypeScript** - Type safety and better developer experience
- **Fabric.js 5.x** - Powerful canvas manipulation library for drawing, objects, and export
- **Zustand** - Lightweight state management (avoiding Redux complexity)
- **Tailwind CSS 3.x** - Utility-first styling framework
- **Lucide React** - Modern icon library for UI controls
- **vite-plugin-pwa** (optional) - Progressive Web App support

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         App Root                            │
│  - Global state (Zustand)                                   │
│  - Route management                                         │
│  - Theme provider                                           │
└─────────────────┬───────────────────────────────────────────┘
                  │
        ┌─────────┴──────────┬────────────────┐
        │                    │                 │
   ┌────▼─────┐     ┌───────▼────────┐  ┌────▼──────┐
   │  Header  │     │  Studio View   │  │  Modals   │
   │          │     │                │  │           │
   │ - Logo   │     │  ┌──────────┐  │  │ - Export  │
   │ - Title  │     │  │ Toolbar  │  │  │ - Help    │
   │ - Actions│     │  └──────────┘  │  └───────────┘
   └──────────┘     │                │
                    │  ┌──────────┐  │
                    │  │  Canvas  │  │
                    │  │          │  │
                    │  │ Fabric.js│  │
                    │  └──────────┘  │
                    │                │
                    │  ┌──────────┐  │
                    │  │  Assets  │  │
                    │  │  Panel   │  │
                    │  └──────────┘  │
                    └────────────────┘
```

### Project Structure

```
holiday-card-maker/
├── public/
│   ├── assets/
│   │   ├── stickers/
│   │   │   ├── snowflakes/        # 6-8 snowflake variations
│   │   │   ├── winter/            # 6-8 winter elements
│   │   │   ├── decorations/       # 6-8 festive decorations
│   │   │   └── branding/          # 4-6 Dev Interrupted items
│   │   ├── fonts/                 # Festive web fonts
│   │   └── templates/             # Optional starter templates
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Studio.tsx             # Main studio container/layout
│   │   ├── Canvas.tsx             # Fabric.js canvas wrapper component
│   │   ├── Toolbar.tsx            # Left sidebar with drawing tools
│   │   ├── AssetPanel.tsx         # Right sidebar with stickers
│   │   ├── ColorPicker.tsx        # Color selection with presets
│   │   ├── FormatSelector.tsx     # Card format dropdown
│   │   ├── ExportDialog.tsx       # Export modal with options
│   │   ├── Header.tsx             # Top bar with branding
│   │   └── SnowfallBackground.tsx # Decorative animated background
│   ├── hooks/
│   │   ├── useCanvas.ts           # Fabric.js canvas lifecycle
│   │   ├── useDrawingTool.ts      # Tool state and event handlers
│   │   ├── useHistory.ts          # Undo/redo functionality
│   │   └── useAutoSave.ts         # localStorage persistence
│   ├── store/
│   │   └── canvasStore.ts         # Zustand global state
│   ├── utils/
│   │   ├── canvasExport.ts        # PNG/JPG export utilities
│   │   ├── brushPresets.ts        # Brush configurations
│   │   ├── constants.ts           # Card formats, colors, etc.
│   │   └── assetLoader.ts         # Asset management utilities
│   ├── types/
│   │   ├── canvas.ts              # Canvas-related types
│   │   ├── tools.ts               # Tool-related types
│   │   └── assets.ts              # Asset-related types
│   ├── App.tsx                    # Root component
│   ├── main.tsx                   # Entry point
│   └── index.css                  # Global styles + Tailwind
├── .cursor/
│   ├── SPEC.md                    # This file
│   └── SPEC_TASKS.md              # Implementation checklist
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Canvas & Card Formats

### Supported Formats

1. **Landscape** - 1400x1000px (7:5 ratio)
   - Traditional greeting card orientation
   - Best for: Landscape scenes, wide compositions

2. **Portrait** - 1000x1400px (5:7 ratio)
   - Vertical card orientation
   - Best for: Tall designs, traditional card format

3. **Square** - 1200x1200px (1:1 ratio)
   - Social media optimized
   - Best for: Instagram, profile pictures, balanced compositions

### Canvas Implementation Details

- **Canvas Element**: HTML5 canvas wrapped by Fabric.js
- **Background**: Configurable (white, transparent, or custom color)
- **Grid**: Optional snap-to-grid for precise placement
- **Zoom**: Optional zoom controls for detail work
- **Pan**: Middle-mouse or two-finger drag to pan canvas

### Export Options

1. **PNG Export**
   - Standard resolution (canvas size)
   - High resolution (2x for print - 2800x2000px landscape)
   - Transparent background option
   - Default format for sharing

2. **JPG Export**
   - Standard resolution
   - High resolution (2x)
   - Configurable background color
   - Smaller file size for email

3. **Additional Features**
   - Copy to clipboard
   - Download with custom filename
   - Preview before export

## Drawing Tools

### Tool Categories

#### 1. Pen Tool

- **Type**: Fabric.PencilBrush
- **Properties**:
  - Color: Full spectrum + festive presets
  - Size: 1-100px
  - Opacity: 100% (solid)
- **Behavior**: Smooth vector-like lines, anti-aliased

#### 2. Brush Tool (Multiple Types)

**2a. Round Soft Brush**

- Smooth, anti-aliased circular brush
- Pressure sensitivity (if available)
- Opacity: 10-100%

**2b. Texture Brush (Sparkle)**

- Scattered particle effect
- Festive shimmer appearance
- Variable density

**2c. Calligraphy Brush**

- Angled brush tip
- Variable width based on direction
- Elegant stroke style

#### 3. Highlighter Tool

- **Type**: Modified PencilBrush
- **Properties**:
  - Semi-transparent (30-60% opacity)
  - Bright colors (yellow, pink, green, blue)
  - Wide tip (20-60px)
- **Behavior**: Marker-like effect, blends with underlying content

#### 4. Spray Paint Tool

- **Type**: Fabric.SprayBrush
- **Properties**:
  - Particle-based rendering
  - Density control
  - Width: 20-100px
- **Behavior**: Airbrush/spray can effect

#### 5. Eraser Tool

- **Type**: Special brush with destination-out blend mode
- **Properties**:
  - Size: 5-100px
  - Hard or soft edge option
- **Behavior**: Removes drawn content

#### 6. Shape Tools

- **Rectangle**: Filled or outlined
- **Circle/Ellipse**: Filled or outlined
- **Star**: 5-point star shape
- **Properties**: Color, size, stroke width, fill opacity

#### 7. Text Tool

- **Fonts**: 3-5 festive web fonts
  - Serif (elegant)
  - Sans-serif (modern)
  - Handwriting (personal)
  - Display (festive/fun)
- **Properties**:
  - Color, size, alignment
  - Bold, italic options
  - Stroke/outline option

### Tool Properties Panel

Located in left sidebar below tool buttons:

```
┌─────────────┐
│   Color     │
│   ██████    │  ← Current color
│   Presets   │
│   ●●●●●●    │  ← Festive palette
│             │
│   Size      │
│   ━━●━━━━   │  ← Slider (1-100)
│   [  42  ]  │  ← Numeric value
│             │
│   Opacity   │
│   ━━━━━●━   │  ← Slider (0-100%)
│   [ 85% ]   │  ← Percentage
│             │
└─────────────┘
```

### Festive Color Palette

**Winter Blues**: #E3F2FD, #90CAF9, #42A5F5, #1E88E5, #1565C0
**Snow Whites**: #FFFFFF, #FAFAFA, #F5F5F5, #ECEFF1
**Ice Silvers**: #CFD8DC, #B0BEC5, #90A4AE, #78909C
**Golden Accents**: #FFF9C4, #FFF176, #FFD54F, #FFC107, #FF8F00
**Winter Reds**: #FFCDD2, #EF5350, #E53935, #C62828
**Forest Greens**: #C8E6C9, #66BB6A, #43A047, #2E7D32

## Asset System

### Asset Library Structure

Total: 20-30 curated items across 4 categories

#### Category 1: Snowflakes (6-8 items)

1. Delicate 6-point snowflake (detailed)
2. Simple geometric snowflake
3. Sparkly animated snowflake (SVG with subtle animation)
4. Chunky cartoon snowflake
5. Crystalline snowflake (realistic)
6. Small snowflake cluster
7. Stylized modern snowflake
8. Swirling snowflake

**Format**: SVG (scalable) or PNG (transparent, 512x512px base)
**Style**: Mix of realistic and stylized

#### Category 2: Winter Elements (6-8 items)

1. Snow drift / pile
2. Icicles hanging
3. Mittens (pair)
4. Cozy scarf
5. Hot cocoa mug with marshmallows
6. Snowman face elements (separate: head, carrot nose, hat)
7. Snowboarder silhouette
8. Winter cabin/house

**Format**: PNG with transparency
**Style**: Friendly, approachable illustrations

#### Category 3: Festive Decorations (6-8 items)

1. Gold star (large)
2. Silver star (medium)
3. Jingle bells (cluster)
4. Ribbon bow (red/gold)
5. Holly sprig with berries
6. Candle with flame
7. Wrapped gift box
8. String lights / fairy lights

**Format**: PNG with transparency
**Style**: Festive but non-denominational

#### Category 4: Dev Interrupted Branding (4-6 items)

1. Dev Interrupted logo (full)
2. Dev Interrupted badge/icon
3. Podcast microphone icon (branded)
4. "Season's Greetings from Dev Interrupted" text banner
5. Social media handle sticker (@DevInterrupted)
6. QR code sticker (linking to podcast - optional)

**Format**: PNG with transparency, SVG for logos
**Style**: Professional, matches Dev Interrupted brand guidelines

### Asset Panel UI

Located in right sidebar:

```
┌─────────────────┐
│    STICKERS     │
│  ┌───────────┐  │
│  │  Search   │  │
│  └───────────┘  │
│                 │
│  ❄️ Snowflakes  │
│  ┌───┬───┬───┐  │
│  │ ❄ │ ❄ │ ❄ │  │
│  ├───┼───┼───┤  │
│  │ ❄ │ ❄ │ ❄ │  │
│  └───┴───┴───┘  │
│                 │
│  ⛷️ Winter      │
│  ┌───┬───┬───┐  │
│  │ ☕ │ 🧤 │ 🏂 │  │
│  └───┴───┴───┘  │
│                 │
│  🎁 Festive     │
│  ┌───┬───┬───┐  │
│  │ ⭐ │ 🔔 │ 🎀 │  │
│  └───┴───┴───┘  │
│                 │
│  🎙️ Dev Int     │
│  ┌───┬───┬───┐  │
│  │ 🎙 │ 📻 │ ⭐ │  │
│  └───┴───┴───┘  │
│                 │
└─────────────────┘
```

### Asset Interaction

1. **Add to Canvas**: Click asset thumbnail
2. **Position**: Drag asset to desired location
3. **Transform**:
   - Resize: Drag corner handles (maintain aspect ratio)
   - Rotate: Drag rotation handle
   - Delete: Select and press Delete key
4. **Layer Order**: Right-click menu for "Bring Forward" / "Send Backward"
5. **Multiple Assets**: Shift+click to select multiple, group/ungroup

### Asset Technical Specs

- **File Format**: PNG with alpha channel or SVG
- **Size**: 512x512px base (PNG), scalable (SVG)
- **File Size**: < 50KB per asset
- **Naming**: snake_case, descriptive (e.g., `snowflake_detailed_01.png`)
- **Organization**: Categorized in subdirectories
- **Metadata**: JSON manifest with categories, tags, descriptions

## State Management

### Zustand Store Structure

```typescript
interface CanvasStore {
  // Tool State
  activeTool: Tool;
  toolProps: ToolProperties;
  setActiveTool: (tool: Tool) => void;
  setToolProps: (props: Partial<ToolProperties>) => void;
  
  // Canvas State
  canvasFormat: 'landscape' | 'portrait' | 'square';
  canvasBackground: string;
  setCanvasFormat: (format: string) => void;
  setCanvasBackground: (color: string) => void;
  
  // History
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
  
  // Assets
  selectedAssetCategory: string;
  setSelectedAssetCategory: (category: string) => void;
  
  // UI State
  showExportDialog: boolean;
  showHelpDialog: boolean;
  toggleExportDialog: () => void;
  toggleHelpDialog: () => void;
}
```

### Local Storage Persistence

Auto-save to localStorage every 30 seconds:

```typescript
interface SavedState {
  canvasJSON: string;        // Fabric.js canvas JSON
  format: string;            // Canvas format
  background: string;        // Background color
  timestamp: number;         // Last saved time
}
```

## UI/UX Design

### Layout Specifications

**Responsive Breakpoints:**

- Desktop: > 1024px (full 3-column layout)
- Tablet: 768px - 1024px (collapsed panels)
- Mobile: < 768px (stacked layout, floating tools)

**Header (60px height):**

- Left: Dev Interrupted logo + app title
- Center: Quick actions (New, Undo, Redo, Export)
- Right: Format selector

**Studio Layout (calc(100vh - 60px)):**

- Left Toolbar: 80px width (desktop)
- Canvas Area: Flexible, centered
- Right Asset Panel: 280px width (desktop)

### Visual Theme

**Color Scheme:**

- Primary Background: #FAFAFA (soft white)
- Secondary Background: #FFFFFF (pure white)
- Canvas Background: #F5F5F5 (light gray)
- Accent Primary: Dev Interrupted purple (#7C3AED or brand color)
- Accent Secondary: Ice blue (#42A5F5)
- Text Primary: #212121 (dark gray)
- Text Secondary: #757575 (medium gray)

**Typography:**

- Headings: Inter or System UI, 600 weight
- Body: Inter or System UI, 400 weight
- Festive Text: Provide 2-3 Google Fonts options

**Animations:**

- Background: Gentle falling snowflakes (CSS/Canvas)
- Button Hover: Smooth scale + color transition
- Tool Selection: Highlight + scale feedback
- Asset Add: Fade-in + slight bounce

### Accessibility

- Keyboard navigation support
- Focus indicators on all interactive elements
- ARIA labels for screen readers
- Color contrast ratio > 4.5:1 for text
- Touch targets > 44x44px for mobile

## Key Features Implementation

### 1. Real-time Drawing

- Fabric.js free drawing mode
- Smooth brush rendering (60fps target)
- Immediate visual feedback
- No lag on slower devices

### 2. Drag & Drop Assets

- Click to add to canvas center
- Drag thumbnail to specific location (advanced)
- Transform controls appear on selection
- Snap to grid (optional, Shift key)

### 3. Layer Management

- Z-index ordering
- Right-click context menu:
  - Bring to Front
  - Bring Forward
  - Send Backward
  - Send to Back
  - Duplicate
  - Delete

### 4. Keyboard Shortcuts

- `Ctrl/Cmd + Z`: Undo
- `Ctrl/Cmd + Y` or `Ctrl/Cmd + Shift + Z`: Redo
- `Delete` or `Backspace`: Delete selected object
- `Ctrl/Cmd + D`: Duplicate selected object
- `Ctrl/Cmd + A`: Select all objects
- `Ctrl/Cmd + S`: Save (auto-save trigger)
- `Ctrl/Cmd + E`: Export dialog
- `Escape`: Deselect all
- `1-7`: Quick tool selection (1=Pen, 2=Brush, etc.)

### 5. Mobile Responsive

- Touch drawing support
- Pinch to zoom
- Two-finger pan
- Bottom toolbar for mobile
- Collapsible asset drawer
- Simplified UI for small screens

### 6. Preset Templates (Optional)

- 3-4 starter templates:
  1. "Winter Wonderland" - Snowy landscape pre-decorated
  2. "Dev Interrupted Special" - Branded template with logo
  3. "Minimalist Snowflake" - Clean, simple design
  4. "Festive Celebration" - Fully decorated, customizable
- Template gallery in "New" menu
- One-click load template

### 7. Auto-save

- Save to localStorage every 30 seconds
- Save on visibility change (tab switch)
- Restore on page load
- "Unsaved changes" warning on page exit
- Manual save option

### 8. Share & Export

- Download PNG (standard & high-res)
- Download JPG (with background)
- Copy image to clipboard
- Share dialog with export preview
- Custom filename input
- Success notification

## Development Guidelines

### Code Style

- **TypeScript**: Strict mode enabled
- **Components**: Functional components with hooks
- **Naming**:
  - PascalCase for components
  - camelCase for functions/variables
  - UPPER_SNAKE_CASE for constants
- **File Organization**: One component per file
- **Comments**: JSDoc for public functions/components

### Performance Considerations

- Lazy load assets
- Debounce auto-save
- Throttle canvas events (drawing, panning)
- Memoize expensive computations (React.memo, useMemo)
- Code splitting for heavy features
- Optimize asset file sizes

### Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile Safari: iOS 14+
- Chrome Android: Latest version

### Testing Strategy

- Manual testing of all tools and features
- Cross-browser testing
- Mobile device testing (touch interactions)
- Export testing (PNG/JPG quality)
- Performance testing (large canvases, many objects)
- Accessibility testing (keyboard navigation, screen readers)

## v0 Deployment

### Preparation Checklist

- [ ] All features complete and tested
- [ ] Assets optimized and organized
- [ ] README with clear instructions
- [ ] Code comments for key functions
- [ ] No console errors or warnings
- [ ] Bundle size optimized (< 1MB total)
- [ ] Demo cards created
- [ ] Screenshots/GIFs for README

### README Sections

1. **Overview**: What the app does
2. **Features**: Key capabilities
3. **Quick Start**: How to use
4. **Customization**: How to remix
5. **Adding Assets**: Guide for adding stickers
6. **Changing Colors**: How to modify theme
7. **Tech Stack**: Dependencies explanation
8. **License**: MIT or appropriate license

### Customization Points

Document these for easy remixing:

- `src/utils/constants.ts`: Colors, formats, tool configs
- `public/assets/`: Add new stickers here
- `src/components/`: Modify UI layout
- `src/utils/brushPresets.ts`: Add new brush types
- Color scheme in Tailwind config

## Success Metrics

- ✅ All drawing tools functional and smooth
- ✅ 20-30 curated assets available
- ✅ Export produces high-quality images
- ✅ Mobile-friendly and responsive
- ✅ Dev Interrupted branding prominent
- ✅ No critical bugs or console errors
- ✅ Bundle loads in < 3 seconds on 3G
- ✅ Easy to understand and remix
- ✅ Comprehensive documentation

## Future Enhancements (Out of Scope)

- Cloud save/sharing (backend required)
- Collaborative editing (WebSocket)
- Animation/GIF export
- Custom font upload
- Advanced layer effects (blur, shadow)
- Vector export (SVG)
- Print ordering integration
- Social media direct sharing
- User asset uploads (image hosting required)
