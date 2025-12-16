/**
 * Available drawing tools
 */
export enum Tool {
  PEN = 'pen',
  BRUSH = 'brush',
  HIGHLIGHTER = 'highlighter',
  SPRAY = 'spray',
  ERASER = 'eraser',
  RECTANGLE = 'rectangle',
  CIRCLE = 'circle',
  STAR = 'star',
  TEXT = 'text',
  SELECT = 'select',
}

/**
 * Brush type variants
 */
export enum BrushType {
  ROUND = 'round',
  SPARKLE = 'sparkle',
  CALLIGRAPHY = 'calligraphy',
}

/**
 * Tool properties configuration
 */
export interface ToolProperties {
  color: string
  size: number
  opacity: number
  brushType?: BrushType
}

/**
 * Brush configuration preset
 */
export interface BrushConfig {
  width: number
  color: string
  opacity: number
  strokeLineCap?: 'round' | 'square' | 'butt'
  strokeLineJoin?: 'round' | 'bevel' | 'miter'
}

