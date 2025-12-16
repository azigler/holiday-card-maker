# 🎭 Extension Challenge: Emoji Picker Integration

## Overview
Add a native emoji picker that lets users add emojis as stickers! Perfect for quick, expressive decorations without needing image files.

## Why This Is Cool
- Emojis are universal and instantly recognizable
- No image files needed
- Works offline
- Huge variety of options (3,600+ emojis)
- Great for quick, playful customization

## Difficulty: ⭐ (Easy)
**Estimated Time:** 20-30 minutes

---

## What You'll Build

An emoji picker that:
1. Opens a native emoji picker or custom emoji grid
2. Lets users select an emoji
3. Adds emoji as a text object to canvas
4. Treats emoji like stickers (selectable, moveable, resizable)

---

## Where to Add Code

### 1. Add Emoji Tool Button to Toolbar
**File:** `src/components/Toolbar.tsx`

Add to the tools array:

```typescript
import { Smile } from 'lucide-react'

{
  tool: Tool.EMOJI,
  icon: Smile,
  label: 'Emoji',
}
```

### 2. Add Emoji Tool Type
**File:** `src/types/tools.ts`

```typescript
export enum Tool {
  // ... existing tools
  EMOJI = 'emoji',
}
```

### 3. Setup Emoji Tool Handler
**File:** `src/components/Canvas.tsx`

Add case in the `activeTool` useEffect:

```typescript
case Tool.EMOJI:
  fabricCanvas.isDrawingMode = false
  setupEmojiTool(fabricCanvas)
  break
```

### 4. Create Emoji Tool Function
**File:** `src/components/Canvas.tsx`

Add at the bottom with other tool functions:

```typescript
/**
 * Setup emoji tool - click to add emoji
 */
function setupEmojiTool(canvas: fabric.Canvas) {
  canvas.on('mouse:down', (o) => {
    const pointer = canvas.getPointer(o.e)
    
    // TODO: Open emoji picker
    // TODO: Get selected emoji
    // TODO: Add emoji text to canvas
  })
}
```

---

## Implementation Options

### Option A: Native Emoji Picker (Easiest) ✅

Use the browser's built-in emoji picker with a simple input trick:

```typescript
function setupEmojiTool(canvas: fabric.Canvas) {
  canvas.on('mouse:down', (o) => {
    const pointer = canvas.getPointer(o.e)
    
    // Create invisible input with emoji picker
    const input = document.createElement('input')
    input.type = 'text'
    input.style.position = 'fixed'
    input.style.top = `${o.e.clientY}px`
    input.style.left = `${o.e.clientX}px`
    input.style.opacity = '0'
    input.style.width = '1px'
    input.style.height = '1px'
    
    document.body.appendChild(input)
    input.focus()
    
    // Trigger emoji keyboard
    input.addEventListener('input', (e) => {
      const emoji = (e.target as HTMLInputElement).value
      if (emoji) {
        addEmojiToCanvas(canvas, emoji, pointer.x, pointer.y)
      }
      document.body.removeChild(input)
    })
    
    input.addEventListener('blur', () => {
      setTimeout(() => {
        if (document.body.contains(input)) {
          document.body.removeChild(input)
        }
      }, 100)
    })
  })
}
```

### Option B: Custom Emoji Grid (More Control)

Create a popup with emoji categories:

**File:** Create `src/components/EmojiPicker.tsx`

```typescript
import { useState } from 'react'

const EMOJI_CATEGORIES = {
  smileys: ['😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇'],
  animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨'],
  food: ['🍎', '🍌', '🍉', '🍇', '🍓', '🍒', '🍑', '🥑', '🍕'],
  activities: ['⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏉', '🎱', '🎮'],
  objects: ['🎁', '🎈', '🎉', '🎊', '🎋', '🎍', '🎏', '🎐', '🎀'],
  symbols: ['❤️', '💕', '💖', '💗', '💓', '💞', '💝', '⭐', '✨'],
  flags: ['🏴', '🏳️', '🏁', '🚩', '🏴‍☠️', '🇺🇸', '🇬🇧', '🇨🇦', '🇫🇷'],
}

interface EmojiPickerProps {
  onSelect: (emoji: string) => void
  onClose: () => void
}

export default function EmojiPicker({ onSelect, onClose }: EmojiPickerProps) {
  const [category, setCategory] = useState<keyof typeof EMOJI_CATEGORIES>('smileys')

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl p-4 max-w-md" onClick={(e) => e.stopPropagation()}>
        <h3 className="font-bold mb-3">Pick an Emoji</h3>
        
        {/* Category tabs */}
        <div className="flex gap-2 mb-3 overflow-x-auto">
          {Object.keys(EMOJI_CATEGORIES).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat as keyof typeof EMOJI_CATEGORIES)}
              className={`px-3 py-1 rounded-lg text-sm ${
                category === cat ? 'bg-purple-500 text-white' : 'bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Emoji grid */}
        <div className="grid grid-cols-8 gap-2 max-h-64 overflow-y-auto">
          {EMOJI_CATEGORIES[category].map((emoji, idx) => (
            <button
              key={idx}
              onClick={() => onSelect(emoji)}
              className="text-3xl hover:bg-gray-100 rounded-lg p-2 transition-all hover:scale-110"
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
```

---

## Adding Emoji to Canvas

Once you have the emoji, add it as a Fabric.js text object:

```typescript
function addEmojiToCanvas(
  canvas: fabric.Canvas, 
  emoji: string, 
  x: number, 
  y: number
) {
  const emojiText = new fabric.Text(emoji, {
    left: x,
    top: y,
    fontSize: 80,  // Nice and big
    fontFamily: 'Arial, sans-serif',
    selectable: true,
    hasControls: true,
    // Add sticker-like effects
    shadow: new fabric.Shadow({
      color: 'rgba(0,0,0,0.2)',
      blur: 8,
      offsetX: 2,
      offsetY: 2,
    }),
  })

  canvas.add(emojiText)
  canvas.setActiveObject(emojiText)
  canvas.renderAll()

  // Switch to select tool so user can move it
  useCanvasStore.getState().setActiveTool(Tool.SELECT)
}
```

---

## Enhancement Ideas

### Basic Implementation
- Click to open emoji picker
- Select emoji
- Emoji appears on canvas

### Advanced Features
- Search emojis by keyword
- Recently used emojis
- Skin tone picker for applicable emojis
- Emoji size selector
- Emoji with outline/glow effects
- Multiple emoji at once
- Animated emoji (using canvas animations)

---

## Popular Emoji Libraries

If you want more features, use a pre-built library:

### emoji-picker-element (Recommended)
```bash
npm install emoji-picker-element
```

```typescript
import 'emoji-picker-element'

// In your component:
<emoji-picker 
  class="light"
  onEmoji={(e) => addEmojiToCanvas(canvas, e.detail.unicode, x, y)}
/>
```

### emoji-mart
```bash
npm install emoji-mart @emoji-mart/data @emoji-mart/react
```

```typescript
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'

<Picker 
  data={data} 
  onEmojiSelect={(emoji) => addEmojiToCanvas(canvas, emoji.native, x, y)}
/>
```

---

## Holiday-Themed Emoji Shortcuts

Add quick-access buttons for holiday emojis:

```typescript
const HOLIDAY_EMOJIS = [
  '🎄', '🎅', '🤶', '🎁', '⛄', '☃️', 
  '❄️', '⭐', '✨', '🔔', '🕯️', '🦌',
  '🎊', '🎉', '🎈', '🎀', '🧦', '🍪',
]

// Show as a quick bar above the main picker
```

---

## Emoji Data Format

Modern emojis use Unicode sequences:
- Simple: `😀` = U+1F600
- Compound: `👨‍👩‍👧‍👦` = U+1F468 U+200D U+1F469 U+200D U+1F467 U+200D U+1F466

Fabric.js handles these automatically with Text objects!

---

## Resources

- [Emoji Picker Element](https://github.com/nolanlawson/emoji-picker-element)
- [Emoji Mart](https://github.com/missive/emoji-mart)
- [Unicode Emoji List](https://unicode.org/emoji/charts/full-emoji-list.html)
- [Emojipedia](https://emojipedia.org/) - Browse all emojis
- [Fabric.js Text API](http://fabricjs.com/docs/fabric.Text.html)

---

## Testing Your Implementation

1. Select emoji tool from toolbar
2. Click on canvas
3. Emoji picker should open
4. Select an emoji
5. Emoji appears at click position
6. Emoji should be selectable and resizable
7. Try adding multiple emojis
8. Test with different emoji types (simple, compound)

---

## Success Criteria

✅ Emoji tool appears in toolbar  
✅ Clicking canvas opens emoji picker  
✅ Selected emoji appears on canvas  
✅ Emoji is large and visible (80px+)  
✅ Emoji can be moved and resized  
✅ Multiple emojis can be added  

---

## Bonus Points

🌟 Holiday emoji quick-access bar  
🌟 Search emojis by keyword  
🌟 Recently used emoji history  
🌟 Emoji with custom colors/effects  
🌟 Skin tone selector  
🌟 Emoji reactions (animated entrance)  
🌟 Emoji combos (suggest combinations)  

---

**Happy Coding!** 🎭 Share your emoji-filled cards on social media with #HolidayCardMaker

