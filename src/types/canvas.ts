import * as fabric from 'fabric'

/**
 * Canvas format types
 */
export type CanvasFormat = 'landscape' | 'portrait' | 'square'

/**
 * Canvas configuration based on format
 */
export interface CanvasConfig {
  width: number
  height: number
  ratio: string
}

/**
 * Canvas format configurations
 */
export const CANVAS_FORMATS: Record<CanvasFormat, CanvasConfig> = {
  landscape: { width: 1400, height: 1000, ratio: '7:5' },
  portrait: { width: 1000, height: 1400, ratio: '5:7' },
  square: { width: 1200, height: 1200, ratio: '1:1' },
}

/**
 * Export format options
 */
export type ExportFormat = 'png' | 'jpg'

/**
 * Export resolution options
 */
export type ExportResolution = 'standard' | 'high'

/**
 * Export configuration
 */
export interface ExportConfig {
  format: ExportFormat
  resolution: ExportResolution
  backgroundColor?: string
  filename?: string
}

/**
 * Canvas history state
 */
export interface CanvasHistoryState {
  json: string
  timestamp: number
}

/**
 * Extended Fabric Canvas type
 */
export type FabricCanvas = fabric.Canvas

