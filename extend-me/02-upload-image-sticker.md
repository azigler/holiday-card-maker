# 📸 Extension Challenge: Upload Your Own Image as Sticker

## Overview
Let users upload their own photos or images and add them to the card as custom stickers. Perfect for adding personal photos, logos, or custom artwork!

## Why This Is Cool
- Personalization = engagement
- Users can add pet photos, family pics, company logos
- Makes cards truly unique
- Great for branded holiday cards

## Difficulty: ⭐ (Easy)
**Estimated Time:** 20-30 minutes

---

## What You'll Build

An image upload feature that:
1. Opens a file picker for image selection
2. Loads the image onto the canvas
3. Automatically sizes and positions the image
4. Treats uploaded images like stickers (moveable, resizable)

---

## Where to Add Code

### 1. Add Upload Button to Header
**File:** `src/components/Header.tsx`

Add an upload button next to the "New Card" button:

```typescript
import { Upload } from 'lucide-react'

// Inside the Header component, add this button:
<button
  onClick={handleImageUpload}
  className="relative px-4 py-2 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-semibold flex items-center gap-2 transition-all duration-200 overflow-hidden hover:scale-105 active:scale-95"
  style={{
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255,255,255,0.3)',
  }}
  title="Upload Image"
>
  <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent opacity-20 pointer-events-none" />
  <Upload size={18} className="relative z-10" />
  <span className="relative z-10 hidden md:inline">Upload</span>
</button>
```

### 2. Create File Input Handler
**File:** `src/components/Header.tsx`

Add this function inside the `Header` component:

```typescript
const handleImageUpload = () => {
  // Create hidden file input
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  
  input.onchange = async (e) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (!file) return

    // TODO: Read file as data URL
    // TODO: Create Fabric.js image from data URL
    // TODO: Add to canvas with proper positioning
  }

  input.click()
}
```

### 3. Add Image to Canvas
**File:** `src/components/Header.tsx` (or extract to a util)

Complete the TODO items:

```typescript
const reader = new FileReader()
reader.onload = async (event) => {
  const dataUrl = event.target?.result as string
  if (!dataUrl) return

  const canvas = useCanvasStore.getState().fabricCanvas
  if (!canvas) return

  // Load image
  const img = await fabric.FabricImage.fromURL(dataUrl)
  
  // TODO: Scale image to reasonable size
  // TODO: Center on canvas
  // TODO: Add glossy sticker effect
  // TODO: Add to canvas
}
reader.readAsDataURL(file)
```

---

## Implementation Guide

### Step 1: File Selection
Use the native file input API:
```typescript
const input = document.createElement('input')
input.type = 'file'
input.accept = 'image/*'  // Only allow images
input.click()
```

### Step 2: Read File as Data URL
```typescript
const reader = new FileReader()
reader.onload = (e) => {
  const dataUrl = e.target?.result as string
  // Use this to create Fabric image
}
reader.readAsDataURL(file)
```

### Step 3: Add to Canvas with Fabric.js
```typescript
const img = await fabric.FabricImage.fromURL(dataUrl)

// Scale to reasonable size (max 300px)
const maxSize = 300
const scale = Math.min(maxSize / img.width!, maxSize / img.height!)
img.scale(scale)

// Center on canvas
const canvas = useCanvasStore.getState().fabricCanvas!
img.set({
  left: canvas.width! / 2 - (img.width! * scale) / 2,
  top: canvas.height! / 2 - (img.height! * scale) / 2,
})

canvas.add(img)
canvas.setActiveObject(img)
canvas.renderAll()
```

---

## Enhancement Ideas

### Basic Implementation
- File picker opens
- Image loads onto canvas
- Image is selectable and moveable

### Advanced Features
- Image compression/optimization
- Crop tool before adding to canvas
- Filters (sepia, grayscale, blur)
- Border/frame presets for photos
- Multiple image upload
- Drag and drop from desktop

---

## Adding Sticker Effects

To make uploaded images look like stickers (same as the built-in ones):

```typescript
// Add shadow
img.set({
  shadow: new fabric.Shadow({
    color: 'rgba(0,0,0,0.3)',
    blur: 10,
    offsetX: 2,
    offsetY: 2,
  })
})

// Add glossy overlay (more complex, requires a second shape)
const overlay = new fabric.Rect({
  left: img.left,
  top: img.top,
  width: img.width! * scale,
  height: img.height! * scale,
  fill: new fabric.Gradient({
    type: 'linear',
    coords: { x1: 0, y1: 0, x2: 0, y2: img.height! * scale },
    colorStops: [
      { offset: 0, color: 'rgba(255,255,255,0.4)' },
      { offset: 0.5, color: 'rgba(255,255,255,0)' },
    ]
  }),
  selectable: false,
})
```

---

## UI/UX Considerations

### Placement Options
- **Header button** (recommended) - always visible
- **Asset panel** - in a new "Custom" category
- **Context menu** - right-click on canvas

### Loading States
Consider showing a loading spinner while the image uploads:
```typescript
const [isUploading, setIsUploading] = useState(false)
```

### Error Handling
Handle these cases:
- File too large (> 5MB)
- Invalid file type
- Image load failure
- Canvas not initialized

---

## Resources

- [FileReader API](https://developer.mozilla.org/en-US/docs/Web/API/FileReader)
- [Fabric.js Image from URL](http://fabricjs.com/docs/fabric.Image.html)
- [HTML File Input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file)

---

## Testing Your Implementation

1. Click upload button
2. Select an image file (jpg, png, gif)
3. Image should appear on canvas
4. Image should be selectable with Select tool
5. Try uploading multiple images
6. Test with very large images (should be scaled down)

---

## Success Criteria

✅ Upload button appears in UI  
✅ File picker opens when clicked  
✅ Selected image appears on canvas  
✅ Image is properly sized (not too large)  
✅ Image can be moved and resized  
✅ Multiple uploads work correctly  

---

## Bonus Points

🌟 Drag and drop images from desktop  
🌟 Image compression to reduce file size  
🌟 Paste from clipboard (Ctrl+V)  
🌟 Photo filters (Instagram-style)  
🌟 Crop tool before adding to canvas  
🌟 Remember uploaded images in localStorage  

---

**Happy Coding!** 📸 Share your creation on social media with #HolidayCardMaker

