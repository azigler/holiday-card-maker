# 🚀 Extension Quick Reference

One-page cheat sheet for all 5 extension challenges.

---

## 📸 Upload Image Sticker (⭐ 20-30min)

**What:** Let users upload photos as custom stickers

**Key Files:**
- `src/components/Header.tsx` - Add upload button
- Use `FileReader` API + `fabric.FabricImage.fromURL()`

**Quick Start:**
```typescript
const input = document.createElement('input')
input.type = 'file'
input.accept = 'image/*'
input.onchange = async (e) => {
  const file = e.target.files[0]
  const reader = new FileReader()
  reader.onload = async (event) => {
    const img = await fabric.FabricImage.fromURL(event.target.result)
    canvas.add(img)
  }
  reader.readAsDataURL(file)
}
input.click()
```

---

## 🎭 Emoji Picker (⭐ 20-30min)

**What:** Add emojis as text objects to canvas

**Key Files:**
- `src/types/tools.ts` - Add `Tool.EMOJI`
- `src/components/Toolbar.tsx` - Add emoji button
- `src/components/Canvas.tsx` - Add click handler

**Quick Start:**
```typescript
const emojiText = new fabric.Text('🎄', {
  left: x,
  top: y,
  fontSize: 80,
  selectable: true,
})
canvas.add(emojiText)
```

**Bonus:** Use `emoji-picker-element` npm package for full picker

---

## 🌈 Gradient Tool (⭐⭐ 30-45min)

**What:** Draw shapes with gradient fills

**Key Files:**
- `src/types/tools.ts` - Add `Tool.GRADIENT`
- `src/components/Canvas.tsx` - Add gradient setup function

**Quick Start:**
```typescript
const gradient = new fabric.Gradient({
  type: 'linear',
  coords: { x1: 0, y1: 0, x2: width, y2: height },
  colorStops: [
    { offset: 0, color: '#ff0000' },
    { offset: 1, color: '#0000ff' },
  ]
})

const rect = new fabric.Rect({
  fill: gradient,
  width: width,
  height: height,
})
canvas.add(rect)
```

---

## 🎨 Rubber Stamp Tool (⭐⭐ 30-45min)

**What:** Click to place repeating stamp patterns

**Key Files:**
- `src/utils/stampPresets.ts` - Create stamp definitions
- `src/components/Canvas.tsx` - Add stamp handler
- `src/components/StampSelector.tsx` - UI for choosing stamps

**Quick Start:**
```typescript
// Define stamps
const STAMP_PRESETS = [
  {
    id: 'heart',
    createShape: (x, y, color, size) => {
      return new fabric.Circle({
        left: x, top: y,
        radius: size/2,
        fill: color,
      })
    }
  }
]

// On click, place stamp
canvas.on('mouse:down', (o) => {
  const stamp = selectedPreset.createShape(x, y, color, size)
  canvas.add(stamp)
})
```

---

## 🤖 AI Sticker Generation (⭐⭐⭐ 45-75min)

**What:** Generate custom stickers from text prompts using AI

**Key Files:**
- `src/utils/nanobanana.ts` - API client
- `src/components/AssetPanel.tsx` - Add AI input UI
- `.env.local` - Store API key

**Quick Start:**
```typescript
// API call
const response = await fetch('https://api.nanobanana.com/generate', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
  },
  body: JSON.stringify({
    prompt: 'cute penguin with santa hat',
    width: 512,
    height: 512,
  })
})

const { image_url } = await response.json()

// Add to canvas
const img = await fabric.FabricImage.fromURL(image_url)
canvas.add(img)
```

**Alternatives:** OpenAI DALL-E, Stability AI

---

## 🛠️ Common Patterns

### Adding a New Tool

1. **Add tool type** (`src/types/tools.ts`):
```typescript
export enum Tool {
  MY_TOOL = 'my-tool',
}
```

2. **Add toolbar button** (`src/components/Toolbar.tsx`):
```typescript
{ tool: Tool.MY_TOOL, icon: MyIcon, label: 'My Tool' }
```

3. **Add handler** (`src/components/Canvas.tsx`):
```typescript
case Tool.MY_TOOL:
  setupMyTool(fabricCanvas, toolProps)
  break
```

### Adding Fabric.js Objects

```typescript
// Basic shape
const shape = new fabric.Circle({
  left: x,
  top: y,
  radius: 50,
  fill: color,
})

// Image from URL
const img = await fabric.FabricImage.fromURL(url)

// Text
const text = new fabric.Text('Hello', {
  fontSize: 30,
})

// Add to canvas
canvas.add(shape)
canvas.renderAll()
```

### Adding UI Components

```typescript
// Button in header
<button onClick={handleAction}>
  <Icon size={18} />
  <span>Label</span>
</button>

// Panel
<div className="p-4 bg-white rounded-xl shadow-lg">
  <h3 className="font-bold mb-2">Title</h3>
  {/* content */}
</div>
```

---

## 📚 Useful Resources

### APIs
- **Fabric.js Docs:** http://fabricjs.com/docs/
- **React Hooks:** https://react.dev/reference/react
- **Tailwind CSS:** https://tailwindcss.com/docs

### Code Examples
- All examples in `/extend-me/*.md`
- Main app in `/src`
- Asset loading in `/src/utils/assetLoader.ts`

### Getting Help
- Read the full challenge docs
- Check existing code for patterns
- Test in browser dev tools
- Ask the community!

---

## ✅ Testing Checklist

For any extension:
- [ ] Tool/feature appears in UI
- [ ] Clicking/activating works
- [ ] Created objects appear on canvas
- [ ] Objects can be selected with Select tool
- [ ] Undo/redo works correctly
- [ ] Export includes new objects
- [ ] No console errors
- [ ] Mobile responsive (if applicable)

---

## 🎯 Pro Tips

1. **Start Simple** - Get basic version working first
2. **Test Often** - Check browser after each change
3. **Copy Existing Code** - Look at similar tools in codebase
4. **Use DevTools** - Console.log everything!
5. **Read Docs** - Fabric.js docs are your friend
6. **Have Fun** - Break things, learn, iterate!

---

**Happy Coding!** 🎨

Return to: [📚 Full Challenge Docs](./README.md) | [🏠 Main README](../README.md)

