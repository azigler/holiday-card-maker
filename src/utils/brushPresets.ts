import * as fabric from 'fabric'
import { BrushType, BrushConfig } from '../types/tools'

/**
 * Create brush configuration based on type
 */
export function createBrushConfig(
  type: BrushType,
  color: string,
  size: number,
  opacity: number
): BrushConfig {
  const alpha = opacity / 100

  // Convert hex to rgba
  let rgbaColor = color
  if (color.startsWith('#')) {
    const r = parseInt(color.slice(1, 3), 16)
    const g = parseInt(color.slice(3, 5), 16)
    const b = parseInt(color.slice(5, 7), 16)
    rgbaColor = `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  switch (type) {
    case BrushType.ROUND:
      return {
        width: size,
        color: rgbaColor,
        opacity: alpha,
        strokeLineCap: 'round',
        strokeLineJoin: 'round',
      }

    case BrushType.CALLIGRAPHY:
      return {
        width: size,
        color: rgbaColor,
        opacity: alpha,
        strokeLineCap: 'square',
        strokeLineJoin: 'miter',
      }

    case BrushType.SPARKLE:
      return {
        width: size,
        color: rgbaColor,
        opacity: alpha * 0.7, // Slightly more transparent for sparkle effect
        strokeLineCap: 'round',
        strokeLineJoin: 'round',
      }

    default:
      return {
        width: size,
        color: rgbaColor,
        opacity: alpha,
        strokeLineCap: 'round',
        strokeLineJoin: 'round',
      }
  }
}

/**
 * Apply brush configuration to Fabric.js brush
 */
export function applyBrushConfig(
  brush: fabric.BaseBrush,
  config: BrushConfig
): void {
  brush.color = config.color
  brush.width = config.width
  
  if ('strokeLineCap' in brush && config.strokeLineCap) {
    (brush as any).strokeLineCap = config.strokeLineCap
  }
  
  if ('strokeLineJoin' in brush && config.strokeLineJoin) {
    (brush as any).strokeLineJoin = config.strokeLineJoin
  }
}

/**
 * Create a custom sparkle brush effect
 */
export function createSparkleBrush(
  canvas: fabric.Canvas,
  color: string,
  size: number,
  opacity: number
): fabric.SprayBrush {
  const brush = new fabric.SprayBrush(canvas)
  
  const alpha = opacity / 100
  let rgbaColor = color
  if (color.startsWith('#')) {
    const r = parseInt(color.slice(1, 3), 16)
    const g = parseInt(color.slice(3, 5), 16)
    const b = parseInt(color.slice(5, 7), 16)
    rgbaColor = `rgba(${r}, ${g}, ${b}, ${alpha})`
  }
  
  brush.color = rgbaColor
  brush.width = size
  brush.density = 30 // Higher density for sparkle effect
  
  return brush
}

