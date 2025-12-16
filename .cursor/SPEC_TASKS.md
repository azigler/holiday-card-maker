# Holiday Card Maker - Implementation Tasks

## Phase 1: Foundation Setup

### 1.1 Project Initialization

- [ ] Create Vite + React + TypeScript project

  ```bash
  npm create vite@latest holiday-card-maker -- --template react-ts
  ```

- [ ] Navigate to project directory and install dependencies
- [ ] Test dev server runs successfully

### 1.2 Install Core Dependencies

- [ ] Install Fabric.js: `npm install fabric`
- [ ] Install Fabric.js types: `npm install --save-dev @types/fabric`
- [ ] Install Zustand: `npm install zustand`
- [ ] Install Tailwind CSS: `npm install -D tailwindcss postcss autoprefixer`
- [ ] Install Lucide React: `npm install lucide-react`
- [ ] Initialize Tailwind: `npx tailwindcss init -p`

### 1.3 Configure Tailwind CSS

- [ ] Update `tailwind.config.js` with content paths
- [ ] Add Tailwind directives to `src/index.css`
- [ ] Add custom colors to Tailwind config (festive palette)
- [ ] Test Tailwind classes work

### 1.4 Project Structure Setup

- [ ] Create `src/components/` directory
- [ ] Create `src/hooks/` directory
- [ ] Create `src/store/` directory
- [ ] Create `src/utils/` directory
- [ ] Create `src/types/` directory
- [ ] Create `public/assets/` directory structure:
  - `public/assets/stickers/snowflakes/`
  - `public/assets/stickers/winter/`
  - `public/assets/stickers/decorations/`
  - `public/assets/stickers/branding/`

### 1.5 TypeScript Configuration

- [ ] Update `tsconfig.json` for strict mode
- [ ] Add path aliases if needed
- [ ] Verify TypeScript compilation works

### 1.6 Create Basic Layout

- [ ] Create `src/App.tsx` with basic structure
- [ ] Create `src/components/Header.tsx` (placeholder)
- [ ] Create `src/components/Studio.tsx` (placeholder)
- [ ] Test basic layout renders

---

## Phase 2: Canvas & Core Drawing

### 2.1 Create Type Definitions

- [ ] Create `src/types/canvas.ts` with interfaces:
  - `CanvasFormat`
  - `CanvasConfig`
  - `FabricCanvas`
- [ ] Create `src/types/tools.ts` with interfaces:
  - `Tool` enum
  - `ToolProperties`
  - `BrushConfig`

### 2.2 Create Constants File

- [ ] Create `src/utils/constants.ts`
- [ ] Define canvas formats (landscape, portrait, square)
- [ ] Define festive color palette
- [ ] Define tool configurations
- [ ] Define default canvas settings

### 2.3 Create Zustand Store

- [ ] Create `src/store/canvasStore.ts`
- [ ] Implement tool state (activeTool, toolProps)
- [ ] Implement canvas state (format, background)
- [ ] Implement history state (canUndo, canRedo)
- [ ] Implement UI state (modals)
- [ ] Add action methods

### 2.4 Create Canvas Component

- [ ] Create `src/components/Canvas.tsx`
- [ ] Initialize Fabric.js canvas in useEffect
- [ ] Set up canvas dimensions based on format
- [ ] Configure canvas background
- [ ] Handle canvas cleanup on unmount
- [ ] Export canvas ref for parent access

### 2.5 Create useCanvas Hook

- [ ] Create `src/hooks/useCanvas.ts`
- [ ] Manage Fabric.js canvas lifecycle
- [ ] Handle canvas initialization
- [ ] Provide canvas instance to components
- [ ] Handle canvas disposal

### 2.6 Implement Basic Drawing Tools

- [ ] Create `src/hooks/useDrawingTool.ts`
- [ ] Implement pen tool (PencilBrush)
- [ ] Implement basic brush
- [ ] Implement eraser
- [ ] Connect tools to canvas
- [ ] Handle tool switching

### 2.7 Create Toolbar Component

- [ ] Create `src/components/Toolbar.tsx`
- [ ] Add tool buttons (pen, brush, eraser)
- [ ] Add active tool highlighting
- [ ] Connect to Zustand store
- [ ] Style with Tailwind (vertical sidebar)

### 2.8 Create Color Picker Component

- [ ] Create `src/components/ColorPicker.tsx`
- [ ] Implement color display (current color)
- [ ] Add festive color presets
- [ ] Add custom color input (HTML color picker)
- [ ] Connect to tool properties in store
- [ ] Style with Tailwind

### 2.9 Add Tool Property Controls

- [ ] Add size slider to Toolbar
- [ ] Add opacity slider to Toolbar
- [ ] Connect sliders to store
- [ ] Display current values
- [ ] Update tool properties on change

### 2.10 Implement Undo/Redo

- [ ] Create `src/hooks/useHistory.ts`
- [ ] Capture canvas state after each action
- [ ] Implement undo functionality
- [ ] Implement redo functionality
- [ ] Add keyboard shortcuts (Ctrl+Z, Ctrl+Y)
- [ ] Update store with canUndo/canRedo flags
- [ ] Add undo/redo buttons to Header

---

## Phase 3: Intermediate Tools

### 3.1 Create Brush Presets

- [ ] Create `src/utils/brushPresets.ts`
- [ ] Define round soft brush configuration
- [ ] Define texture brush configuration
- [ ] Define calligraphy brush configuration
- [ ] Export preset factory functions

### 3.2 Implement Multiple Brush Types

- [ ] Add brush type selector to Toolbar
- [ ] Implement round soft brush
- [ ] Implement texture/sparkle brush
- [ ] Implement calligraphy brush
- [ ] Handle brush switching

### 3.3 Implement Highlighter Tool

- [ ] Add highlighter to tool enum
- [ ] Configure highlighter brush (30-60% opacity)
- [ ] Add highlighter color presets (bright colors)
- [ ] Add highlighter to Toolbar
- [ ] Test blending with underlying content

### 3.4 Implement Spray Paint Tool

- [ ] Add spray paint to tool enum
- [ ] Configure Fabric.js SprayBrush
- [ ] Add density control
- [ ] Add spray paint to Toolbar
- [ ] Test particle effect

### 3.5 Implement Shape Tools

- [ ] Add shape tools to tool enum (rectangle, circle, star)
- [ ] Create shape drawing mode
- [ ] Add fill/stroke options
- [ ] Add shape tools to Toolbar
- [ ] Handle shape creation on canvas

### 3.6 Implement Text Tool

- [ ] Add text tool to tool enum
- [ ] Create text input modal/dialog
- [ ] Add font selection (3-5 festive fonts)
- [ ] Add text styling options (size, color, bold, italic)
- [ ] Add text tool to Toolbar
- [ ] Handle text creation on canvas
- [ ] Enable text editing after placement

### 3.7 Load Festive Fonts

- [ ] Select 3-5 Google Fonts (festive, varied)
- [ ] Add font links to `index.html` or CSS
- [ ] Test font rendering in text tool

---

## Phase 4: Asset System

### 4.1 Create Asset Types

- [ ] Add asset interfaces to `src/types/assets.ts`:
  - `AssetCategory`
  - `Asset`
  - `AssetManifest`

### 4.2 Create Asset Manifest

- [ ] Create `public/assets/manifest.json`
- [ ] Define asset categories
- [ ] List all assets with metadata (id, name, category, path, tags)

### 4.3 Create Asset Loader Utility

- [ ] Create `src/utils/assetLoader.ts`
- [ ] Implement function to load manifest
- [ ] Implement function to load asset images
- [ ] Add error handling for missing assets
- [ ] Implement lazy loading for assets

### 4.4 Create Asset Panel Component

- [ ] Create `src/components/AssetPanel.tsx`
- [ ] Load assets from manifest
- [ ] Display category tabs/sections
- [ ] Render asset thumbnails in grid
- [ ] Add search/filter functionality
- [ ] Style with Tailwind (right sidebar)

### 4.5 Implement Asset Click Handler

- [ ] Handle asset thumbnail click
- [ ] Add asset to canvas center
- [ ] Create Fabric.js Image object
- [ ] Scale asset appropriately
- [ ] Make asset selectable/transformable

### 4.6 Implement Asset Drag & Drop (Advanced)

- [ ] Make asset thumbnails draggable
- [ ] Create drop zone on canvas
- [ ] Calculate drop position
- [ ] Add asset at cursor position
- [ ] Provide visual feedback during drag

### 4.7 Implement Asset Transformation

- [ ] Enable Fabric.js object controls
- [ ] Add resize handles (maintain aspect ratio)
- [ ] Add rotation handle
- [ ] Add delete on Delete/Backspace key
- [ ] Test multi-select (Shift+click)

### 4.8 Implement Layer Management

- [ ] Add right-click context menu on objects
- [ ] Implement "Bring to Front"
- [ ] Implement "Bring Forward"
- [ ] Implement "Send Backward"
- [ ] Implement "Send to Back"
- [ ] Implement "Duplicate"
- [ ] Implement "Delete"

---

## Phase 5: Asset Creation

### 5.1 Design Snowflake Assets (6-8 items)

- [ ] Create/source snowflake_delicate_01.png
- [ ] Create/source snowflake_geometric_01.png
- [ ] Create/source snowflake_sparkly_01.svg (with animation)
- [ ] Create/source snowflake_chunky_01.png
- [ ] Create/source snowflake_crystalline_01.png
- [ ] Create/source snowflake_cluster_01.png
- [ ] Create/source snowflake_modern_01.png
- [ ] Create/source snowflake_swirl_01.png
- [ ] Optimize all (< 50KB each)
- [ ] Save to `public/assets/stickers/snowflakes/`

### 5.2 Design Winter Element Assets (6-8 items)

- [ ] Create/source snow_drift_01.png
- [ ] Create/source icicles_01.png
- [ ] Create/source mittens_01.png
- [ ] Create/source scarf_01.png
- [ ] Create/source hot_cocoa_01.png
- [ ] Create/source snowman_head_01.png
- [ ] Create/source snowboarder_01.png
- [ ] Create/source cabin_01.png
- [ ] Optimize all (< 50KB each)
- [ ] Save to `public/assets/stickers/winter/`

### 5.3 Design Festive Decoration Assets (6-8 items)

- [ ] Create/source star_gold_large.png
- [ ] Create/source star_silver_medium.png
- [ ] Create/source bells_cluster.png
- [ ] Create/source bow_ribbon.png
- [ ] Create/source holly_sprig.png
- [ ] Create/source candle_flame.png
- [ ] Create/source gift_box.png
- [ ] Create/source string_lights.png
- [ ] Optimize all (< 50KB each)
- [ ] Save to `public/assets/stickers/decorations/`

### 5.4 Create Dev Interrupted Branding Assets (4-6 items)

- [ ] Obtain Dev Interrupted logo (official)
- [ ] Create logo_full.png or .svg
- [ ] Create logo_badge.png
- [ ] Create microphone_branded.png
- [ ] Create banner_greetings.png ("Season's Greetings from Dev Interrupted")
- [ ] Create social_handle.png (@DevInterrupted)
- [ ] Optional: Create QR code sticker
- [ ] Optimize all (< 50KB each)
- [ ] Save to `public/assets/stickers/branding/`

### 5.5 Update Asset Manifest

- [ ] Add all snowflake assets to manifest
- [ ] Add all winter element assets to manifest
- [ ] Add all decoration assets to manifest
- [ ] Add all branding assets to manifest
- [ ] Verify all paths are correct
- [ ] Add descriptive tags for search

### 5.6 Test Asset Loading

- [ ] Verify all assets load in Asset Panel
- [ ] Test each asset adds to canvas correctly
- [ ] Check asset quality and transparency
- [ ] Verify asset file sizes
- [ ] Test asset search/filter

---

## Phase 6: Format & Export

### 6.1 Create Format Selector Component

- [ ] Create `src/components/FormatSelector.tsx`
- [ ] Add dropdown with 3 format options
- [ ] Display current format
- [ ] Connect to store
- [ ] Style with Tailwind

### 6.2 Implement Canvas Resizing

- [ ] Handle format change in Canvas component
- [ ] Update canvas dimensions
- [ ] Preserve content during resize (scale or crop?)
- [ ] Re-center canvas in viewport
- [ ] Update export dimensions

### 6.3 Create Export Utilities

- [ ] Create `src/utils/canvasExport.ts`
- [ ] Implement PNG export function (standard resolution)
- [ ] Implement PNG export with transparency
- [ ] Implement JPG export function (with background)
- [ ] Implement high-resolution export (2x scaling)
- [ ] Add download trigger function
- [ ] Add filename generation

### 6.4 Create Export Dialog Component

- [ ] Create `src/components/ExportDialog.tsx`
- [ ] Add format selection (PNG/JPG)
- [ ] Add resolution selection (standard/high-res)
- [ ] Add background color picker (for JPG)
- [ ] Add preview thumbnail
- [ ] Add filename input
- [ ] Add download button
- [ ] Add copy to clipboard button
- [ ] Style with Tailwind (modal)

### 6.5 Implement Export Functionality

- [ ] Connect Export Dialog to store
- [ ] Handle PNG export
- [ ] Handle JPG export
- [ ] Handle high-res export
- [ ] Implement file download
- [ ] Implement clipboard copy
- [ ] Add success notification

### 6.6 Add Export Button to Header

- [ ] Add "Export" button to Header
- [ ] Connect to store to open dialog
- [ ] Add keyboard shortcut (Ctrl+E)

---

## Phase 7: Polish & UX

### 7.1 Create Header Component (Final)

- [ ] Add Dev Interrupted logo
- [ ] Add app title
- [ ] Add "New" button (clear canvas + confirm dialog)
- [ ] Add "Undo" button (with disabled state)
- [ ] Add "Redo" button (with disabled state)
- [ ] Add "Export" button
- [ ] Add Format Selector
- [ ] Style with Tailwind (branded colors)

### 7.2 Implement New Canvas Functionality

- [ ] Add "New" button click handler
- [ ] Show confirmation dialog if canvas has content
- [ ] Clear canvas on confirm
- [ ] Reset to default format and settings
- [ ] Optional: Show template gallery

### 7.3 Create Snowfall Background Animation

- [ ] Create `src/components/SnowfallBackground.tsx`
- [ ] Implement CSS or canvas-based snowfall
- [ ] Add falling snowflakes (subtle, not distracting)
- [ ] Make it optional/toggleable
- [ ] Add to Studio background

### 7.4 Apply Festive Visual Theme

- [ ] Update Tailwind config with festive colors
- [ ] Style all components with theme colors
- [ ] Add rounded corners to UI elements
- [ ] Add subtle shadows and depth
- [ ] Ensure color contrast for accessibility

### 7.5 Add Smooth Animations

- [ ] Add hover animations to buttons
- [ ] Add transition to tool selection
- [ ] Add fade-in for asset addition
- [ ] Add smooth modal open/close
- [ ] Optimize animation performance

### 7.6 Implement Keyboard Shortcuts

- [ ] Add keyboard event listener to App
- [ ] Implement Ctrl+Z (undo)
- [ ] Implement Ctrl+Y / Ctrl+Shift+Z (redo)
- [ ] Implement Delete/Backspace (delete selected)
- [ ] Implement Ctrl+D (duplicate)
- [ ] Implement Ctrl+A (select all)
- [ ] Implement Ctrl+S (manual save)
- [ ] Implement Ctrl+E (export dialog)
- [ ] Implement Escape (deselect)
- [ ] Implement 1-7 (quick tool selection)
- [ ] Prevent default browser behavior for shortcuts

### 7.7 Implement Auto-save

- [ ] Create `src/hooks/useAutoSave.ts`
- [ ] Serialize canvas to JSON
- [ ] Save to localStorage every 30 seconds
- [ ] Save on visibility change
- [ ] Load from localStorage on mount
- [ ] Add "Restore last session?" prompt
- [ ] Handle localStorage errors gracefully

### 7.8 Implement Mobile Responsiveness

- [ ] Test layout on mobile breakpoint (< 768px)
- [ ] Create mobile-friendly toolbar (bottom bar)
- [ ] Make asset panel collapsible/drawer
- [ ] Ensure touch drawing works
- [ ] Add pinch-to-zoom support
- [ ] Add two-finger pan support
- [ ] Adjust button sizes for touch (44px minimum)
- [ ] Test on real mobile devices

### 7.9 Add Loading States

- [ ] Show loading spinner while assets load
- [ ] Show loading during export
- [ ] Add skeleton loaders for asset thumbnails
- [ ] Add progress indicator if needed

### 7.10 Add Error Handling

- [ ] Handle asset loading errors
- [ ] Handle localStorage quota exceeded
- [ ] Handle export errors
- [ ] Show user-friendly error messages
- [ ] Add error boundary component

### 7.11 Accessibility Improvements

- [ ] Add ARIA labels to all buttons
- [ ] Ensure keyboard navigation works
- [ ] Add focus indicators
- [ ] Test with screen reader
- [ ] Verify color contrast ratios
- [ ] Add alt text to assets
- [ ] Make modals keyboard-accessible

---

## Phase 8: v0 Deployment Prep

### 8.1 Create Comprehensive README

- [ ] Write project overview
- [ ] List features with descriptions
- [ ] Add screenshots/GIFs of app in use
- [ ] Write Quick Start guide
- [ ] Document keyboard shortcuts
- [ ] Write Customization guide
- [ ] Write "How to Add Assets" section
- [ ] Write "How to Change Colors" section
- [ ] List tech stack and dependencies
- [ ] Add license information (MIT recommended)
- [ ] Add credits and acknowledgments

### 8.2 Add Code Documentation

- [ ] Add JSDoc comments to all components
- [ ] Add JSDoc comments to all hooks
- [ ] Add JSDoc comments to utility functions
- [ ] Add inline comments for complex logic
- [ ] Document store structure
- [ ] Document asset manifest format

### 8.3 Create Demo Cards

- [ ] Create 3-4 sample cards showcasing features
- [ ] Export as high-quality PNGs
- [ ] Save to `docs/` or `examples/` directory
- [ ] Reference in README

### 8.4 Optimize Bundle Size

- [ ] Run `npm run build`
- [ ] Check bundle size (aim for < 1MB total)
- [ ] Analyze bundle with Vite build analyzer
- [ ] Optimize heavy dependencies if needed
- [ ] Lazy load heavy features
- [ ] Tree-shake unused code
- [ ] Compress assets further if needed

### 8.5 Cross-browser Testing

- [ ] Test in Chrome (latest)
- [ ] Test in Firefox (latest)
- [ ] Test in Safari (latest)
- [ ] Test in Edge (latest)
- [ ] Test on Chrome Android
- [ ] Test on Mobile Safari (iOS)
- [ ] Document any browser-specific issues

### 8.6 Performance Testing

- [ ] Test with large canvases
- [ ] Test with many objects (50+)
- [ ] Test drawing performance
- [ ] Test export speed
- [ ] Check memory usage
- [ ] Profile with browser dev tools
- [ ] Optimize bottlenecks

### 8.7 Final Bug Fixes

- [ ] Fix all console errors
- [ ] Fix all console warnings
- [ ] Test all features end-to-end
- [ ] Verify all assets load correctly
- [ ] Test undo/redo thoroughly
- [ ] Test export quality
- [ ] Verify mobile responsiveness

### 8.8 Clean Up Code

- [ ] Remove debug console.logs
- [ ] Remove commented-out code
- [ ] Remove unused imports
- [ ] Remove unused files
- [ ] Format code consistently
- [ ] Run linter and fix issues

### 8.9 Prepare for v0 Upload

- [ ] Verify `npm run build` produces clean build
- [ ] Test production build locally
- [ ] Ensure all assets are in `public/` directory
- [ ] Verify no hard-coded absolute paths
- [ ] Check that app works without backend
- [ ] Prepare deployment instructions

### 8.10 Final Checklist

- [ ] README complete and accurate
- [ ] All features working
- [ ] No critical bugs
- [ ] Mobile responsive
- [ ] Assets optimized
- [ ] Code documented
- [ ] Build optimized
- [ ] Demo cards created
- [ ] Screenshots/GIFs added
- [ ] Ready for v0 upload

---

## Post-Launch (Optional Enhancements)

### Future Features (Not in Initial Scope)

- [ ] Preset templates gallery
- [ ] More advanced brush effects
- [ ] Gradient color picker
- [ ] Asset rotation with snap angles
- [ ] Grid and ruler guides
- [ ] Zoom controls
- [ ] Layer panel (visual)
- [ ] More export formats (SVG, PDF)
- [ ] Social media share integration
- [ ] Cloud save (requires backend)
- [ ] Collaborative editing (requires WebSocket)

---

## Notes

- Mark each task as completed by changing `[ ]` to `[x]`
- Commit code regularly as tasks are completed
- Test each feature before marking task complete
- Update README as features are added
- Keep bundle size in mind throughout development
- Prioritize performance for smooth user experience
- Focus on v0 remixability - clear, modular code
