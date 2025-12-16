# 🤖 Extension Challenge: AI Sticker Generation with Nanobanana

## Overview
Integrate AI-powered sticker generation using the Nanobanana API! Let users type a prompt like "cute penguin with santa hat" and generate custom holiday stickers on the fly.

## Why This Is Cool
- AI-generated content is HOT right now
- Unlimited creative possibilities
- Great viral moment for livestream
- Shows off cutting-edge tech integration
- Nanobanana is fast and fun!

## Difficulty: ⭐⭐⭐ (Medium-Hard)
**Estimated Time:** 45-75 minutes

---

## What You'll Build

An AI sticker generator that:
1. Accepts text prompts from users
2. Calls Nanobanana API to generate images
3. Adds generated images to canvas as stickers
4. Includes loading state and error handling

---

## What is Nanobanana?

Nanobanana is a fast AI image generation API optimized for small, quick generations - perfect for stickers!

- **Speed:** ~2-5 seconds per image
- **Size:** Optimized for small images (sticker-sized)
- **Style:** Fun, cartoonish, perfect for holiday cards

---

## Where to Add Code

### 1. Add AI Generate Button to Asset Panel
**File:** `src/components/AssetPanel.tsx`

Add a prominent "Generate with AI" section at the top of the panel:

```typescript
import { Sparkles } from 'lucide-react'

// Add above the category tabs:
<div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-b border-purple-200">
  <h3 className="text-sm font-bold text-purple-900 mb-2 flex items-center gap-2">
    <Sparkles size={16} />
    AI Sticker Generator
  </h3>
  <div className="flex gap-2">
    <input
      type="text"
      placeholder="e.g., cute penguin with santa hat"
      className="flex-1 px-3 py-2 rounded-lg border-2 border-purple-300 focus:border-purple-500 focus:outline-none"
      value={aiPrompt}
      onChange={(e) => setAiPrompt(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && handleGenerateAI()}
    />
    <button
      onClick={handleGenerateAI}
      disabled={isGenerating}
      className="px-4 py-2 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:scale-105 transition-all disabled:opacity-50"
    >
      {isGenerating ? '...' : 'Generate'}
    </button>
  </div>
  {aiError && (
    <p className="text-xs text-red-600 mt-2">{aiError}</p>
  )}
</div>
```

### 2. Add State for AI Generation
**File:** `src/components/AssetPanel.tsx`

```typescript
const [aiPrompt, setAiPrompt] = useState('')
const [isGenerating, setIsGenerating] = useState(false)
const [aiError, setAiError] = useState<string | null>(null)
```

### 3. Create AI Generation Function
**File:** `src/components/AssetPanel.tsx`

```typescript
const handleGenerateAI = async () => {
  if (!aiPrompt.trim()) return
  
  setIsGenerating(true)
  setAiError(null)

  try {
    // TODO: Call Nanobanana API
    // TODO: Get image URL from response
    // TODO: Add image to canvas
    // TODO: Clear prompt
  } catch (error) {
    setAiError('Failed to generate sticker. Try again!')
    console.error('AI generation error:', error)
  } finally {
    setIsGenerating(false)
  }
}
```

---

## Nanobanana API Integration

### API Endpoint
```
POST https://api.nanobanana.com/generate
```

### Request Format
```typescript
const response = await fetch('https://api.nanobanana.com/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${NANOBANANA_API_KEY}`, // Get from env
  },
  body: JSON.stringify({
    prompt: aiPrompt,
    width: 512,
    height: 512,
    style: 'sticker', // or 'cartoon', 'cute'
    seed: Math.floor(Math.random() * 1000000),
  })
})

const data = await response.json()
const imageUrl = data.image_url
```

### Response Format
```typescript
{
  "image_url": "https://cdn.nanobanana.com/images/abc123.png",
  "seed": 42,
  "prompt": "cute penguin with santa hat",
  "generation_time": 2.3
}
```

---

## Implementation Guide

### Step 1: Set Up API Key

**File:** Create `.env.local` (add to .gitignore!)

```bash
VITE_NANOBANANA_API_KEY=your_api_key_here
```

**File:** `src/utils/constants.ts`

```typescript
export const NANOBANANA_API_KEY = import.meta.env.VITE_NANOBANANA_API_KEY
```

### Step 2: Create API Client

**File:** Create `src/utils/nanobanana.ts`

```typescript
import { NANOBANANA_API_KEY } from './constants'

export interface GenerateOptions {
  prompt: string
  width?: number
  height?: number
  style?: 'sticker' | 'cartoon' | 'realistic'
}

export interface GenerateResponse {
  image_url: string
  seed: number
  prompt: string
  generation_time: number
}

export async function generateSticker(options: GenerateOptions): Promise<GenerateResponse> {
  const response = await fetch('https://api.nanobanana.com/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${NANOBANANA_API_KEY}`,
    },
    body: JSON.stringify({
      prompt: options.prompt,
      width: options.width || 512,
      height: options.height || 512,
      style: options.style || 'sticker',
      seed: Math.floor(Math.random() * 1000000),
    }),
  })

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }

  return response.json()
}
```

### Step 3: Add Generated Image to Canvas

```typescript
const handleGenerateAI = async () => {
  if (!aiPrompt.trim()) return
  
  setIsGenerating(true)
  setAiError(null)

  try {
    // Generate image
    const result = await generateSticker({ 
      prompt: aiPrompt,
      style: 'sticker'
    })

    // Add to canvas (reuse existing addAssetToCanvas logic)
    const canvas = useCanvasStore.getState().fabricCanvas
    if (!canvas) return

    const img = await fabric.FabricImage.fromURL(result.image_url)
    
    // Scale to sticker size
    const scale = 150 / Math.max(img.width!, img.height!)
    img.scale(scale)

    // Center on canvas
    img.set({
      left: canvas.width! / 2 - (img.width! * scale) / 2,
      top: canvas.height! / 2 - (img.height! * scale) / 2,
      shadow: new fabric.Shadow({
        color: 'rgba(0,0,0,0.3)',
        blur: 10,
        offsetX: 2,
        offsetY: 2,
      }),
    })

    canvas.add(img)
    canvas.setActiveObject(img)
    canvas.renderAll()

    // Switch to select tool
    useCanvasStore.getState().setActiveTool(Tool.SELECT)

    // Clear prompt
    setAiPrompt('')

  } catch (error) {
    setAiError('Failed to generate sticker. Try again!')
    console.error('AI generation error:', error)
  } finally {
    setIsGenerating(false)
  }
}
```

---

## Enhancement Ideas

### Basic Implementation
- Text input + generate button
- Loading state while generating
- Add generated image to canvas

### Advanced Features
- Multiple style options (cartoon, realistic, pixel art)
- Negative prompts (what to avoid)
- Multiple variations (generate 4 at once)
- Save favorite prompts
- Share generated stickers
- Background removal (transparent stickers)

---

## UI/UX Improvements

### Loading Animation
```typescript
{isGenerating && (
  <div className="flex items-center gap-2 mt-2 text-purple-600">
    <Sparkles className="animate-spin" size={16} />
    <span className="text-xs">Generating magic...</span>
  </div>
)}
```

### Prompt Suggestions
```typescript
const PROMPT_EXAMPLES = [
  'cute penguin with santa hat',
  'snowman wearing sunglasses',
  'reindeer doing yoga',
  'gingerbread house on fire',
]

// Show as quick-select buttons
```

### Generation History
Keep track of recently generated stickers in localStorage

---

## Alternative: Use DALL-E or Stable Diffusion

If Nanobanana isn't available, you can use:

### OpenAI DALL-E
```typescript
const response = await fetch('https://api.openai.com/v1/images/generations', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${OPENAI_API_KEY}`,
  },
  body: JSON.stringify({
    prompt: aiPrompt,
    n: 1,
    size: '512x512',
  }),
})
```

### Stability AI
```typescript
const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${STABILITY_API_KEY}`,
  },
  body: JSON.stringify({
    text_prompts: [{ text: aiPrompt }],
    cfg_scale: 7,
    height: 512,
    width: 512,
    steps: 30,
  }),
})
```

---

## Resources

- [Nanobanana API Docs](https://nanobanana.com/docs) *(check for latest endpoint)*
- [OpenAI DALL-E API](https://platform.openai.com/docs/guides/images)
- [Stability AI API](https://platform.stability.ai/docs)
- [Fabric.js Image Loading](http://fabricjs.com/docs/fabric.Image.html)

---

## Testing Your Implementation

1. Enter a fun prompt (e.g., "cute snowman with sunglasses")
2. Click generate
3. Should see loading state
4. After ~3-5 seconds, image appears on canvas
5. Image should be selectable and moveable
6. Try different prompts
7. Test error handling (disconnect network)

---

## Success Criteria

✅ AI input field appears in UI  
✅ Generate button triggers API call  
✅ Loading state shows while generating  
✅ Generated image appears on canvas  
✅ Image is properly sized and positioned  
✅ Error handling works correctly  
✅ Can generate multiple stickers  

---

## Bonus Points

🌟 Generate 4 variations, let user pick one  
🌟 Style selector (cartoon, realistic, pixel art)  
🌟 Save/favorite generated stickers  
🌟 Background removal for transparent stickers  
🌟 Prompt history and suggestions  
🌟 Share generated sticker separately  

---

**Happy Coding!** 🤖 Share your AI-generated cards on social media with #HolidayCardMaker #AIArt

