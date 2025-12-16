# 🌈 Extension Challenge: Gradient Tool

## Overview

Add a gradient fill tool that lets users create beautiful gradient effects on their holiday cards. Users should be able to select gradient colors, direction, and apply it as either a drawing tool or shape fill.

## Why This Is Cool

- Gradients add professional polish to cards
- Creates vibrant, eye-catching backgrounds
- Popular in modern design aesthetics
- Easy to implement with Fabric.js built-in support

## Difficulty: ⭐⭐ (Medium)

**Estimated Time:** 30-45 minutes

---

## What You'll Build

A gradient tool that allows:

1. Linear or radial gradient selection
2. Multiple color stops (start color, end color, optionally middle colors)
3. Gradient angle/direction control
4. Apply as a drawable brush or shape fill

---

## Where to Add Code

### 1. Add Gradient Tool Type

**File:** `src/types/tools.ts`

```typescript
export enum Tool {
  // ... existing tools
  GRADIENT = 'gradient',  // Add this
}
```

### 2. Add Gradient Tool Button

**File:** `src/components/Toolbar.tsx`

Add to the tools array around line 30:

```typescript
{
  tool: Tool.GRADIENT,
  icon: Droplet,  // or import a better gradient icon
  label: 'Gradient',
}
```

### 3. Implement Gradient Drawing Logic

**File:** `src/components/Canvas.tsx`

In the `useEffect` for `activeTool`, add a case for `Tool.GRADIENT`:

```typescript
case Tool.GRADIENT:
  fabricCanvas.isDrawingMode = false
  setupGradientTool(fabricCanvas, toolProps)
  break
```

### 4. Create Gradient Setup Function

**File:** `src/components/Canvas.tsx`

Add this function at the bottom with the other tool setup functions:

```typescript
/**
 * Setup gradient tool
 */
function setupGradientTool(
  canvas: fabric.Canvas,
  props: { color: string; size: number; opacity: number }
) {
  let isDrawing = false
  let gradient: fabric.Rect | null = null
  let startX = 0
  let startY = 0

  canvas.on('mouse:down', (o) => {
    isDrawing = true
    const pointer = canvas.getPointer(o.e)
    startX = pointer.x
    startY = pointer.y

    // TODO: Create gradient rectangle
    // HINT: Use new fabric.Gradient() with colorStops
    // HINT: Apply gradient to rect.fill property
  })

  canvas.on('mouse:move', (o) => {
    if (!isDrawing || !gradient) return
    // TODO: Update gradient size and recalculate gradient coords
  })

  canvas.on('mouse:up', () => {
    isDrawing = false
    gradient = null
  })
}
```

---

## Fabric.js Gradient API

### Creating a Linear Gradient

```typescript
const gradient = new fabric.Gradient({
  type: 'linear',
  coords: {
    x1: 0,
    y1: 0,
    x2: width,
    y2: height,
  },
  colorStops: [
    { offset: 0, color: '#ff0000' },
    { offset: 1, color: '#0000ff' },
  ]
})

const rect = new fabric.Rect({
  left: x,
  top: y,
  width: width,
  height: height,
  fill: gradient,
})
```

### Creating a Radial Gradient

```typescript
const gradient = new fabric.Gradient({
  type: 'radial',
  coords: {
    x1: centerX,
    y1: centerY,
    r1: 0,
    x2: centerX,
    y2: centerY,
    r2: radius,
  },
  colorStops: [
    { offset: 0, color: props.color },
    { offset: 1, color: '#ffffff' },
  ]
})
```

---

## Enhancement Ideas

### Basic Implementation

- Two-color linear gradient
- Horizontal direction
- Rectangle shape only

### Advanced Features

- Gradient direction picker (horizontal, vertical, diagonal, radial)
- Multi-color gradient (3+ color stops)
- Apply gradient to existing shapes
- Gradient preview in UI
- Save gradient presets

---

## UI Considerations

You might want to add a gradient color picker. Consider:

- Adding a secondary color picker for the end color
- A gradient type toggle (linear/radial)
- An angle/direction slider

**Where to add UI:**

- `src/components/ColorPicker.tsx` - extend to support gradient colors
- OR create `src/components/GradientPicker.tsx` - dedicated gradient UI

---

## Resources

- [Fabric.js Gradient Docs](http://fabricjs.com/fabric-intro-part-2#gradients)
- [MDN: CSS Gradients](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient) - for inspiration
- [Fabric.js Gradient Tutorial](http://fabricjs.com/gradients)

---

## Testing Your Implementation

1. Select the gradient tool
2. Click and drag on canvas
3. Should create a shape with gradient fill
4. Try different start/end positions
5. Verify gradient direction matches drag direction

---

## Success Criteria

✅ Gradient tool appears in toolbar  
✅ Can draw gradient rectangles by clicking and dragging  
✅ Gradient uses current color as start color  
✅ Gradient direction responds to drag direction  
✅ Created gradients can be selected and moved  

---

## Bonus Points

🌟 Add a radial gradient option  
🌟 Support 3+ color stops  
🌟 Add gradient angle control to UI  
🌟 Apply gradients to existing shapes  
🌟 Animated gradient effect  

---

**Happy Coding!** 🎨 Share your creation on social media with #HolidayCardMaker
