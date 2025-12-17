import { useEffect, useRef, useState } from 'react'
import * as fabric from 'fabric'
import { useCanvasStore } from '../store/canvasStore'
import { CANVAS_FORMATS } from '../utils/constants'
import { Tool, BrushType } from '../types/tools'
import { createBrushConfig, applyBrushConfig, createSparkleBrush } from '../utils/brushPresets'
import LoadingSpinner from './LoadingSpinner'
import EmojiPicker from './EmojiPicker'

/**
 * Canvas Component
 * Main drawing canvas using Fabric.js
 */
const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [emojiPosition, setEmojiPosition] = useState({ x: 0, y: 0 })
  
  const {
    setCanvas,
    canvasFormat,
    canvasBackground,
    activeTool,
    toolProps,
    setActiveTool,
  } = useCanvasStore()

  // Initialize Fabric.js canvas
  useEffect(() => {
    if (!canvasRef.current) return

    setIsLoading(true)
    const config = CANVAS_FORMATS[canvasFormat]
    
    // Create Fabric canvas
    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: config.width,
      height: config.height,
      backgroundColor: canvasBackground,
      selection: true,
      preserveObjectStacking: true,
    })

    fabricCanvasRef.current = fabricCanvas
    setCanvas(fabricCanvas)
    
    // Small delay to ensure canvas is ready
    setTimeout(() => setIsLoading(false), 300)

    // Cleanup
    return () => {
      fabricCanvas.dispose()
      setCanvas(null)
    }
  }, []) // Only run once on mount

  // Update canvas dimensions when format changes
  useEffect(() => {
    if (!fabricCanvasRef.current) return

    const config = CANVAS_FORMATS[canvasFormat]
    fabricCanvasRef.current.setDimensions({
      width: config.width,
      height: config.height,
    })
    fabricCanvasRef.current.renderAll()
  }, [canvasFormat])

  // Update canvas background when it changes
  useEffect(() => {
    if (!fabricCanvasRef.current) return

    fabricCanvasRef.current.backgroundColor = canvasBackground
    fabricCanvasRef.current.renderAll()
  }, [canvasBackground])

  // Update drawing mode and brush based on active tool
  useEffect(() => {
    if (!fabricCanvasRef.current) return

    const fabricCanvas = fabricCanvasRef.current

    // Disable drawing mode first
    fabricCanvas.isDrawingMode = false
    fabricCanvas.selection = false

    // Remove any existing mouse handlers for shapes
    fabricCanvas.off('mouse:down')
    fabricCanvas.off('mouse:move')
    fabricCanvas.off('mouse:up')

    // Make all objects non-selectable by default
    fabricCanvas.forEachObject((obj) => {
      obj.selectable = false
      obj.evented = false
    })

    // Configure based on active tool
    switch (activeTool) {
      case Tool.SELECT:
        // Only in SELECT mode can objects be selected and moved
        fabricCanvas.selection = true
        fabricCanvas.forEachObject((obj) => {
          obj.selectable = true
          obj.evented = true
        })
        break

      case Tool.PEN:
      case Tool.BRUSH:
      case Tool.HIGHLIGHTER:
        fabricCanvas.isDrawingMode = true
        configureBrush(fabricCanvas, activeTool, toolProps)
        break
      
      case Tool.SPRAY:
        setupSprayTool(fabricCanvas, toolProps)
        break
      
      case Tool.ERASER:
        fabricCanvas.isDrawingMode = true
        configureEraser(fabricCanvas, toolProps)
        break
      
      case Tool.RECTANGLE:
      case Tool.CIRCLE:
      case Tool.STAR:
        setupShapeTool(fabricCanvas, activeTool, toolProps)
        break
      
      case Tool.TEXT:
        setupTextTool(fabricCanvas, toolProps)
        break
      
      case Tool.EMOJI:
        setupEmojiTool(fabricCanvas, setShowEmojiPicker, setEmojiPosition)
        break
      
      default:
        fabricCanvas.isDrawingMode = false
        fabricCanvas.selection = false
        break
    }

    fabricCanvas.renderAll()
  }, [activeTool, toolProps])

  // Handle drag and drop
  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    if (!fabricCanvasRef.current) return

    try {
      const assetData = e.dataTransfer.getData('asset')
      if (!assetData) return

      const asset = JSON.parse(assetData)
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Load and add the image
      const img = await fabric.FabricImage.fromURL(asset.path, {
        crossOrigin: 'anonymous',
      })
      
      const maxSize = 150
      const scale = Math.min(maxSize / (img.width || 1), maxSize / (img.height || 1))
      
      img.scale(scale)
      img.set({
        left: x - ((img.width || 0) * scale) / 2,
        top: y - ((img.height || 0) * scale) / 2,
        shadow: new fabric.Shadow({
          color: 'rgba(0,0,0,0.3)',
          blur: 10,
          offsetX: 3,
          offsetY: 3,
        }),
      })
      
      // Temporarily make selectable for animation
      img.selectable = true
      img.evented = true
      
      fabricCanvasRef.current.add(img)
      fabricCanvasRef.current.setActiveObject(img)
      fabricCanvasRef.current.renderAll()
      
      // Animate placement
      const originalScaleX = img.scaleX || 1
      img.scale(0.5)
      fabricCanvasRef.current.renderAll()
      
      const animate = () => {
        const currentScale = img.scaleX || 0.5
        const newScale = currentScale + (originalScaleX - currentScale) * 0.3
        img.scale(newScale)
        fabricCanvasRef.current?.renderAll()
        
        if (Math.abs(newScale - originalScaleX) > 0.01) {
          requestAnimationFrame(animate)
        } else {
          // Animation complete - switch to SELECT tool
          setActiveTool(Tool.SELECT)
        }
      }
      requestAnimationFrame(animate)
    } catch (error) {
      console.error('Failed to drop asset:', error)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  }

  return (
    <div className="relative">
      {isLoading && <LoadingSpinner />}
      
      {showEmojiPicker && (
        <EmojiPicker
          onSelect={(emoji) => {
            addEmojiToCanvas(emoji, emojiPosition.x, emojiPosition.y, setActiveTool, fabricCanvasRef)
            setShowEmojiPicker(false)
          }}
          onClose={() => setShowEmojiPicker(false)}
        />
      )}
      
      <div 
        className="canvas-container bg-white shadow-2xl" 
        style={{
          boxShadow: '0 20px 60px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(0,0,0,0.1)',
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3Cpattern id=\'paper\' x=\'0\' y=\'0\' width=\'100\' height=\'100\' patternUnits=\'userSpaceOnUse\'%3E%3Crect fill=\'%23ffffff\' width=\'100\' height=\'100\'/%3E%3Cpath d=\'M0 0h100v100H0z\' fill=\'url(%23noise)\'/%3E%3C/pattern%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3CfeColorMatrix type=\'saturate\' values=\'0\'/%3E%3C/filter%3E%3C/defs%3E%3Crect fill=\'url(%23paper)\' width=\'100\' height=\'100\'/%3E%3C/svg%3E")',
          backgroundSize: '100px 100px',
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <canvas ref={canvasRef} />
      </div>
    </div>
  )
}

/**
 * Configure brush based on tool and properties
 */
function configureBrush(
  canvas: fabric.Canvas,
  tool: Tool,
  props: { color: string; size: number; opacity: number; brushType?: BrushType }
) {
  // Tool-specific configurations
  switch (tool) {
    case Tool.HIGHLIGHTER: {
      const brush = new fabric.PencilBrush(canvas)
      const config = createBrushConfig(
        BrushType.ROUND,
        props.color,
        Math.max(props.size, 20), // Highlighters are wider
        Math.min(props.opacity, 60) // Highlighters are semi-transparent
      )
      applyBrushConfig(brush, config)
      canvas.freeDrawingBrush = brush
      break
    }
    
    case Tool.SPRAY: {
      // Use SprayBrush for spray effect
      const sprayBrush = new fabric.SprayBrush(canvas)
      const opacity = props.opacity / 100
      let rgbaColor = props.color
      if (props.color.startsWith('#')) {
        const r = parseInt(props.color.slice(1, 3), 16)
        const g = parseInt(props.color.slice(3, 5), 16)
        const b = parseInt(props.color.slice(5, 7), 16)
        rgbaColor = `rgba(${r}, ${g}, ${b}, ${opacity})`
      }
      sprayBrush.color = rgbaColor
      sprayBrush.width = props.size
      sprayBrush.density = 20
      canvas.freeDrawingBrush = sprayBrush
      break
    }

    case Tool.BRUSH: {
      const brushType = props.brushType || BrushType.ROUND
      
      if (brushType === BrushType.SPARKLE) {
        const sparkleBrush = createSparkleBrush(canvas, props.color, props.size, props.opacity)
        canvas.freeDrawingBrush = sparkleBrush
      } else {
        const brush = new fabric.PencilBrush(canvas)
        const config = createBrushConfig(brushType, props.color, props.size, props.opacity)
        applyBrushConfig(brush, config)
        canvas.freeDrawingBrush = brush
      }
      break
    }
    
    default: {
      // Default pen tool
      const brush = new fabric.PencilBrush(canvas)
      const config = createBrushConfig(BrushType.ROUND, props.color, props.size, props.opacity)
      applyBrushConfig(brush, config)
      canvas.freeDrawingBrush = brush
      break
    }
  }
}

/**
 * Configure eraser
 */
function configureEraser(
  canvas: fabric.Canvas,
  props: { size: number }
) {
  const brush = new fabric.PencilBrush(canvas)
  brush.width = props.size
  
  // Eraser uses destination-out blend mode
  // This is a workaround - Fabric.js doesn't have built-in eraser
  // We'll use white color for now and implement proper eraser later
  brush.color = '#FFFFFF'
  
  canvas.freeDrawingBrush = brush
}

/**
 * Setup spray paint tool with continuous spraying
 */
function setupSprayTool(
  canvas: fabric.Canvas,
  props: { color: string; size: number; opacity: number }
) {
  let isSprayingActive = false
  let sprayInterval: number | null = null
  let lastX = 0
  let lastY = 0

  const opacity = props.opacity / 100
  let rgbaColor = props.color
  if (props.color.startsWith('#')) {
    const r = parseInt(props.color.slice(1, 3), 16)
    const g = parseInt(props.color.slice(3, 5), 16)
    const b = parseInt(props.color.slice(5, 7), 16)
    rgbaColor = `rgba(${r}, ${g}, ${b}, ${opacity})`
  }

  const sprayParticles = () => {
    if (!isSprayingActive) return

    const numParticles = 10
    const radius = props.size / 2

    for (let i = 0; i < numParticles; i++) {
      const angle = Math.random() * Math.PI * 2
      const distance = Math.random() * radius
      const x = lastX + Math.cos(angle) * distance
      const y = lastY + Math.sin(angle) * distance
      const particleSize = Math.random() * 2 + 1

      const circle = new fabric.Circle({
        left: x,
        top: y,
        radius: particleSize,
        fill: rgbaColor,
        selectable: false,
        evented: false,
      })

      canvas.add(circle)
    }
    canvas.renderAll()
  }

  canvas.on('mouse:down', (o) => {
    isSprayingActive = true
    const pointer = canvas.getPointer(o.e)
    lastX = pointer.x
    lastY = pointer.y
    
    sprayParticles()
    sprayInterval = window.setInterval(sprayParticles, 50)
  })

  canvas.on('mouse:move', (o) => {
    if (!isSprayingActive) return
    const pointer = canvas.getPointer(o.e)
    lastX = pointer.x
    lastY = pointer.y
  })

  canvas.on('mouse:up', () => {
    isSprayingActive = false
    if (sprayInterval) {
      clearInterval(sprayInterval)
      sprayInterval = null
    }
  })
}

/**
 * Setup shape drawing tool
 */
function setupShapeTool(
  canvas: fabric.Canvas,
  tool: Tool,
  props: { color: string; size: number; opacity: number }
) {
  let isDrawing = false
  let shape: fabric.Rect | fabric.Circle | fabric.Polygon | null = null
  let startX = 0
  let startY = 0

  const opacity = props.opacity / 100

  canvas.on('mouse:down', (o) => {
    isDrawing = true
    const pointer = canvas.getPointer(o.e)
    startX = pointer.x
    startY = pointer.y

    const commonProps = {
      left: startX,
      top: startY,
      fill: props.color,
      opacity: opacity,
      stroke: props.color,
      strokeWidth: 2,
      objectCaching: false, // Disable caching to prevent clipping issues
    }

    switch (tool) {
      case Tool.RECTANGLE:
        shape = new fabric.Rect({
          ...commonProps,
          width: 0,
          height: 0,
        })
        break
      
      case Tool.CIRCLE:
        shape = new fabric.Circle({
          ...commonProps,
          radius: 0,
        })
        break
      
      case Tool.STAR:
        shape = new fabric.Polygon(createStarPoints(5, 0, 0), {
          ...commonProps,
        })
        break
    }

    if (shape) {
      canvas.add(shape)
    }
  })

  canvas.on('mouse:move', (o) => {
    if (!isDrawing || !shape) return

    const pointer = canvas.getPointer(o.e)
    const width = Math.abs(pointer.x - startX)
    const height = Math.abs(pointer.y - startY)

    if (shape instanceof fabric.Rect) {
      shape.set({
        width: width,
        height: height,
        left: Math.min(startX, pointer.x),
        top: Math.min(startY, pointer.y),
      })
    } else if (shape instanceof fabric.Circle) {
      const radius = Math.sqrt(Math.pow(pointer.x - startX, 2) + Math.pow(pointer.y - startY, 2)) / 2
      shape.set({ 
        radius: radius,
        left: startX - radius,
        top: startY - radius,
      })
    } else if (shape instanceof fabric.Polygon) {
      const radius = Math.sqrt(Math.pow(pointer.x - startX, 2) + Math.pow(pointer.y - startY, 2))
      const points = createStarPoints(5, radius, radius * 0.4)
      
      shape.set({
        points: points,
        left: startX,
        top: startY,
      })
      
      // Force recalculation of dimensions and coordinates
      shape.setCoords()
    }

    canvas.renderAll()
  })

  canvas.on('mouse:up', () => {
    isDrawing = false
    if (shape) {
      // Final update to ensure proper bounds
      shape.setCoords()
    }
    shape = null
  })
}

/**
 * Create star shape points centered at origin
 */
function createStarPoints(numPoints: number, outerRadius: number, innerRadius: number): fabric.Point[] {
  const points: fabric.Point[] = []
  const step = (Math.PI * 2) / (numPoints * 2)

  for (let i = 0; i < numPoints * 2; i++) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius
    const angle = i * step - Math.PI / 2 // Start from top
    points.push(new fabric.Point(
      radius * Math.cos(angle),
      radius * Math.sin(angle)
    ))
  }

  return points
}

/**
 * Setup text tool
 */
function setupTextTool(
  canvas: fabric.Canvas,
  props: { color: string; size: number; opacity: number }
) {
  canvas.on('mouse:down', (o) => {
    const pointer = canvas.getPointer(o.e)
    
    const text = new fabric.IText('Click to edit', {
      left: pointer.x,
      top: pointer.y,
      fill: props.color,
      fontSize: Math.max(props.size, 20),
      fontFamily: 'Inter, sans-serif',
      opacity: props.opacity / 100,
    })

    canvas.add(text)
    canvas.setActiveObject(text)
    text.enterEditing()
    canvas.renderAll()
  })
}

/**
 * Setup emoji tool
 */
function setupEmojiTool(
  canvas: fabric.Canvas, 
  setShowEmojiPicker: React.Dispatch<React.SetStateAction<boolean>>, 
  setEmojiPosition: React.Dispatch<React.SetStateAction<{ x: number, y: number }>>
) {
  canvas.on('mouse:down', (o) => {
    const pointer = canvas.getPointer(o.e)
    setEmojiPosition({ x: pointer.x, y: pointer.y })
    setShowEmojiPicker(true)
  })
}

/**
 * Add emoji to canvas as text object
 */
function addEmojiToCanvas(
  emoji: string, 
  x: number, 
  y: number, 
  setActiveTool: (tool: Tool) => void,
  fabricCanvasRef: React.RefObject<fabric.Canvas>
) {
  if (!fabricCanvasRef.current) return

  const emojiText = new fabric.IText(emoji, {
    left: x,
    top: y,
    fontSize: 80,
    fontFamily: 'Arial, sans-serif',
    selectable: true,
    hasControls: true,
    originX: 'center',
    originY: 'center',
    shadow: new fabric.Shadow({
      color: 'rgba(0,0,0,0.2)',
      blur: 8,
      offsetX: 2,
      offsetY: 2,
    }),
  })

  fabricCanvasRef.current.add(emojiText)
  fabricCanvasRef.current.setActiveObject(emojiText)
  fabricCanvasRef.current.renderAll()

  // Switch to select tool so user can move it
  setActiveTool(Tool.SELECT)
}

export default Canvas

