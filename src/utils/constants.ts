import { CanvasFormat, CanvasConfig } from '../types/canvas'
import { AssetCategoryInfo, AssetCategory } from '../types/assets'

/**
 * Canvas format configurations
 */
export const CANVAS_FORMATS: Record<CanvasFormat, CanvasConfig> = {
  landscape: { width: 1400, height: 1000, ratio: '7:5' },
  portrait: { width: 1000, height: 1400, ratio: '5:7' },
  square: { width: 1200, height: 1200, ratio: '1:1' },
}

/**
 * Default canvas format
 */
export const DEFAULT_CANVAS_FORMAT: CanvasFormat = 'landscape'

/**
 * Default canvas background color
 */
export const DEFAULT_CANVAS_BACKGROUND = '#FFFFFF'

/**
 * Festive color palette presets
 */
export const FESTIVE_COLORS = {
  winterBlues: ['#E3F2FD', '#90CAF9', '#42A5F5', '#1E88E5', '#1565C0'],
  snowWhites: ['#FFFFFF', '#FAFAFA', '#F5F5F5', '#ECEFF1'],
  iceSilvers: ['#CFD8DC', '#B0BEC5', '#90A4AE', '#78909C'],
  festiveGolds: ['#FFF9C4', '#FFF176', '#FFD54F', '#FFC107', '#FF8F00'],
  festiveReds: ['#FFCDD2', '#EF5350', '#E53935', '#C62828'],
  festiveGreens: ['#C8E6C9', '#66BB6A', '#43A047', '#2E7D32'],
}

/**
 * All festive colors flattened for color picker
 */
export const ALL_FESTIVE_COLORS = [
  ...FESTIVE_COLORS.winterBlues,
  ...FESTIVE_COLORS.festiveReds,
  ...FESTIVE_COLORS.festiveGreens,
  ...FESTIVE_COLORS.festiveGolds,
  ...FESTIVE_COLORS.iceSilvers,
  '#000000', // Black
  '#FFFFFF', // White
]

/**
 * Default tool properties
 */
export const DEFAULT_TOOL_PROPS = {
  color: '#1E88E5',
  size: 5,
  opacity: 100,
}

/**
 * Tool size constraints
 */
export const TOOL_SIZE_MIN = 1
export const TOOL_SIZE_MAX = 100

/**
 * Opacity constraints
 */
export const OPACITY_MIN = 0
export const OPACITY_MAX = 100

/**
 * Undo/Redo history limit
 */
export const HISTORY_LIMIT = 20

/**
 * Auto-save interval in milliseconds
 */
export const AUTOSAVE_INTERVAL = 30000 // 30 seconds

/**
 * LocalStorage keys
 */
export const STORAGE_KEYS = {
  CANVAS_STATE: 'holiday-card-maker-canvas',
  CANVAS_FORMAT: 'holiday-card-maker-format',
  CANVAS_BACKGROUND: 'holiday-card-maker-background',
  LAST_SAVED: 'holiday-card-maker-last-saved',
}

/**
 * Asset categories information
 */
export const ASSET_CATEGORIES: AssetCategoryInfo[] = [
  {
    id: 'snowflakes' as AssetCategory,
    label: 'Snowflakes',
    icon: '❄️',
    description: 'Delicate winter snowflakes',
  },
  {
    id: 'winter' as AssetCategory,
    label: 'Winter',
    icon: '⛷️',
    description: 'Winter elements and activities',
  },
  {
    id: 'decorations' as AssetCategory,
    label: 'Festive',
    icon: '🎁',
    description: 'Holiday decorations',
  },
  {
    id: 'branding' as AssetCategory,
    label: 'Dev Interrupted',
    icon: '🎙️',
    description: 'Dev Interrupted branding',
  },
]

/**
 * Festive fonts available for text tool
 */
export const FESTIVE_FONTS = [
  { name: 'Inter', label: 'Modern', className: 'font-sans' },
  { name: 'Pacifico', label: 'Fun', className: 'festive-font-display' },
  { name: 'Raleway', label: 'Elegant', className: 'festive-font-elegant' },
  { name: 'Dancing Script', label: 'Handwriting', className: 'festive-font-handwriting' },
]

/**
 * Keyboard shortcuts
 */
export const KEYBOARD_SHORTCUTS = {
  UNDO: 'Ctrl+Z',
  REDO: 'Ctrl+Y',
  DELETE: 'Delete',
  DUPLICATE: 'Ctrl+D',
  SELECT_ALL: 'Ctrl+A',
  SAVE: 'Ctrl+S',
  EXPORT: 'Ctrl+E',
  DESELECT: 'Escape',
}

