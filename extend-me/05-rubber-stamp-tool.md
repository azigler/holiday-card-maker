# 🎨 Extension Challenge: Rubber Stamp Tool with Presets

## Overview
Add a classic rubber stamp tool that lets users "stamp" repeating patterns, shapes, or designs onto their card. Think traditional stamping but digital - click to place, consistent size and style.

## Why This Is Cool
- Nostalgic crafting vibe (matches the tactile theme!)
- Quick way to add repeating decorations
- Different from brushes - discrete, consistent marks
- Perfect for borders, patterns, and accents

## Difficulty: ⭐⭐ (Medium)
**Estimated Time:** 30-45 minutes

---

## What You'll Build

A rubber stamp tool that:
1. Has preset stamp designs (shapes, patterns, icons)
2. Stamps by clicking (not dragging)
3. Consistent size and rotation
4. Multiple stamp designs to choose from
5. Optional: Ink color and size control

---

## Where to Add Code

### 1. Add Stamp Tool Type
**File:** `src/types/tools.ts`

```typescript
export enum Tool {
  // ... existing tools
  STAMP = 'stamp',
}
```

### 2. Define Stamp Presets
**File:** Create `src/utils/stampPresets.ts`

```typescript
import * as fabric from 'fabric'

export interface StampPreset {
  id: string
  name: string
  icon: string
  createShape: (x: number, y: number, color: string, size: number) => fabric.Object
}

export const STAMP_PRESETS: StampPreset[] = [
  {
    id: 'heart',
    name: 'Heart',
    icon: '❤️',
    createShape: (x, y, color, size) => {
      // Heart shape using path
      const heartPath = 'M140,20C73,20,20,74,20,140c0,135,136,170,228,303c88-132,229-173,229-303c0-66-54-120-120-120C311,20,255,74,228,140C201,74,145,20,140,20z'
      return new fabric.Path(heartPath, {
        left: x,
        top: y,
        fill: color,
        scaleX: size / 300,
        scaleY: size / 300,
        originX: 'center',
        originY: 'center',
      })
    }
  },
  {
    id: 'star',
    name: 'Star',
    icon: '⭐',
    createShape: (x, y, color, size) => {
      const points = createStarPoints(5, size/2, size/4)
      return new fabric.Polygon(points, {
        left: x,
        top: y,
        fill: color,
        originX: 'center',
        originY: 'center',
      })
    }
  },
  {
    id: 'snowflake',
    name: 'Snowflake',
    icon: '❄️',
    createShape: (x, y, color, size) => {
      // Simple snowflake using lines
      const group = new fabric.Group([], {
        left: x,
        top: y,
        originX: 'center',
        originY: 'center',
      })
      
      // Create 6 lines radiating from center
      for (let i = 0; i < 6; i++) {
        const angle = (i * 60) * Math.PI / 180
        const line = new fabric.Line(
          [0, 0, Math.cos(angle) * size/2, Math.sin(angle) * size/2],
          { stroke: color, strokeWidth: size / 20 }
        )
        group.addWithUpdate(line)
      }
      
      return group
    }
  },
  {
    id: 'circle',
    name: 'Circle',
    icon: '⭕',
    createShape: (x, y, color, size) => {
      return new fabric.Circle({
        left: x,
        top: y,
        radius: size / 2,
        fill: color,
        originX: 'center',
        originY: 'center',
      })
    }
  },
  {
    id: 'flower',
    name: 'Flower',
    icon: '🌸',
    createShape: (x, y, color, size) => {
      // Flower using overlapping circles
      const group = new fabric.Group([], {
        left: x,
        top: y,
        originX: 'center',
        originY: 'center',
      })
      
      // 6 petals
      for (let i = 0; i < 6; i++) {
        const angle = (i * 60) * Math.PI / 180
        const petal = new fabric.Circle({
          left: Math.cos(angle) * size/4,
          top: Math.sin(angle) * size/4,
          radius: size / 6,
          fill: color,
          originX: 'center',
          originY: 'center',
        })
        group.addWithUpdate(petal)
      }
      
      // Center
      const center = new fabric.Circle({
        left: 0,
        top: 0,
        radius: size / 8,
        fill: '#FFD700', // Gold center
        originX: 'center',
        originY: 'center',
      })
      group.addWithUpdate(center)
      
      return group
    }
  },
]

// Helper function
function createStarPoints(numPoints: number, outerRadius: number, innerRadius: number): fabric.Point[] {
  const points: fabric.Point[] = []
  const step = (Math.PI * 2) / (numPoints * 2)

  for (let i = 0; i < numPoints * 2; i++) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius
    const angle = i * step - Math.PI / 2
    points.push(new fabric.Point(
      radius * Math.cos(angle),
      radius * Math.sin(angle)
    ))
  }

  return points
}
```

### 3. Add Stamp Tool Button to Toolbar
**File:** `src/components/Toolbar.tsx`

```typescript
import { Stamp } from 'lucide-react'

{
  tool: Tool.STAMP,
  icon: Stamp,
  label: 'Stamp',
}
```

### 4. Create Stamp Selector UI
**File:** Create `src/components/StampSelector.tsx`

```typescript
import { STAMP_PRESETS } from '../utils/stampPresets'
import { useCanvasStore } from '../store/canvasStore'

export default function StampSelector() {
  const { activeTool, stampPreset, setStampPreset } = useCanvasStore()
  
  if (activeTool !== Tool.STAMP) return null

  return (
    <div className="absolute left-20 top-0 bg-white rounded-xl shadow-lg p-3 border-2 border-gray-200 z-10">
      <h4 className="text-xs font-bold text-gray-700 mb-2">Choose Stamp</h4>
      <div className="grid grid-cols-3 gap-2">
        {STAMP_PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => setStampPreset(preset.id)}
            className={`p-3 rounded-lg text-2xl transition-all ${
              stampPreset === preset.id
                ? 'bg-purple-500 scale-110'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            title={preset.name}
          >
            {preset.icon}
          </button>
        ))}
      </div>
    </div>
  )
}
```

### 5. Add Stamp State to Store
**File:** `src/store/canvasStore.ts`

```typescript
interface CanvasStore {
  // ... existing state
  stampPreset: string
  setStampPreset: (preset: string) => void
}

// In create():
stampPreset: 'heart',
setStampPreset: (preset) => set({ stampPreset: preset }),
```

### 6. Setup Stamp Tool Handler
**File:** `src/components/Canvas.tsx`

Add to the `activeTool` useEffect:

```typescript
case Tool.STAMP:
  fabricCanvas.isDrawingMode = false
  setupStampTool(fabricCanvas, toolProps)
  break
```

### 7. Create Stamp Tool Function
**File:** `src/components/Canvas.tsx`

```typescript
import { STAMP_PRESETS } from '../utils/stampPresets'

/**
 * Setup stamp tool - click to stamp
 */
function setupStampTool(
  canvas: fabric.Canvas,
  props: { color: string; size: number; opacity: number }
) {
  const { stampPreset } = useCanvasStore.getState()
  
  canvas.on('mouse:down', (o) => {
    const pointer = canvas.getPointer(o.e)
    
    // Find selected preset
    const preset = STAMP_PRESETS.find(p => p.id === stampPreset)
    if (!preset) return

    // Create stamp shape
    const stamp = preset.createShape(
      pointer.x,
      pointer.y,
      props.color,
      props.size * 2  // Size multiplier for stamps
    )

    // Apply opacity
    stamp.set({ opacity: props.opacity / 100 })

    // Add shadow for depth
    stamp.set({
      shadow: new fabric.Shadow({
        color: 'rgba(0,0,0,0.2)',
        blur: 5,
        offsetX: 1,
        offsetY: 1,
      })
    })

    canvas.add(stamp)
    canvas.renderAll()
  })
}
```

---

## Enhancement Ideas

### Basic Implementation
- 5 stamp presets (heart, star, circle, snowflake, flower)
- Click to place stamp
- Uses current color and size

### Advanced Features
- **Rotation:** Random rotation on each stamp
- **Spacing Mode:** Evenly space stamps along a path
- **Stamp Trail:** Hold and drag to stamp repeatedly
- **Custom Stamps:** Upload image as stamp
- **Stamp Patterns:** Create borders/patterns automatically
- **Ink Effects:** Fade, splatter, worn look
- **Multi-stamp:** Place multiple stamps at once in a pattern

---

## Adding Stamp Effects

### Random Rotation
```typescript
const randomRotation = (Math.random() - 0.5) * 30  // ±15 degrees
stamp.set({ angle: randomRotation })
```

### Vintage Ink Effect
```typescript
stamp.set({
  opacity: 0.7 + Math.random() * 0.2,  // Slight variation
  shadow: new fabric.Shadow({
    color: props.color,
    blur: 3,
    offsetX: 0,
    offsetY: 0,
  })
})
```

### Stamp Trail (Drag to Stamp)
```typescript
let lastStampTime = 0
const stampInterval = 100  // ms between stamps

canvas.on('mouse:move', (o) => {
  if (!isMouseDown) return
  
  const now = Date.now()
  if (now - lastStampTime < stampInterval) return
  
  const pointer = canvas.getPointer(o.e)
  placeStamp(pointer.x, pointer.y)
  lastStampTime = now
})
```

---

## Creating Custom Stamp Designs

### From SVG Path
```typescript
{
  id: 'tree',
  name: 'Christmas Tree',
  icon: '🎄',
  createShape: (x, y, color, size) => {
    const path = 'M50,10 L70,40 L65,40 L85,70 L80,70 L100,100 L0,100 L20,70 L15,70 L35,40 L30,40 Z'
    return new fabric.Path(path, {
      left: x,
      top: y,
      fill: color,
      scaleX: size / 100,
      scaleY: size / 100,
      originX: 'center',
      originY: 'center',
    })
  }
}
```

### From Image URL
```typescript
{
  id: 'candy-cane',
  name: 'Candy Cane',
  icon: '🍭',
  createShape: async (x, y, color, size) => {
    const img = await fabric.FabricImage.fromURL('/assets/stamps/candy-cane.svg')
    img.set({
      left: x,
      top: y,
      scaleX: size / 100,
      scaleY: size / 100,
      originX: 'center',
      originY: 'center',
    })
    return img
  }
}
```

---

## UI Layout Suggestions

### Option 1: Toolbar Popup (Recommended)
Show stamp selector when stamp tool is active (see StampSelector component above)

### Option 2: Side Panel
Add stamps to the asset panel in a new category

### Option 3: Context Menu
Right-click to choose stamp while tool is active

---

## Resources

- [Fabric.js Path](http://fabricjs.com/docs/fabric.Path.html)
- [Fabric.js Group](http://fabricjs.com/docs/fabric.Group.html)
- [SVG Path Commands](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths)
- [SVG to Fabric Path Converter](https://fabricjs.com/fabric-intro-part-1)

---

## Testing Your Implementation

1. Select stamp tool from toolbar
2. Stamp selector should appear
3. Choose a stamp design
4. Click on canvas
5. Stamp should appear at click position
6. Try different colors
7. Try different sizes
8. Click multiple times to create pattern
9. Stamps should be selectable with select tool

---

## Success Criteria

✅ Stamp tool appears in toolbar  
✅ Stamp selector UI shows when tool active  
✅ At least 3 different stamp designs  
✅ Clicking places stamp on canvas  
✅ Stamps use current color  
✅ Stamps use current size  
✅ Multiple stamps can be placed  
✅ Stamps can be selected/moved later  

---

## Bonus Points

🌟 10+ stamp designs  
🌟 Random rotation on each stamp  
🌟 Stamp trail (drag to stamp repeatedly)  
🌟 Upload custom stamp image  
🌟 Pattern mode (auto-create borders)  
🌟 Vintage ink effects  
🌟 Stamp categories (holiday, nature, geometric)  
🌟 Stamp size randomization (slight variation)  

---

**Happy Coding!** 🎨 Share your stamped cards on social media with #HolidayCardMaker

