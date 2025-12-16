import { create } from 'zustand'
import { Tool, ToolProperties, BrushType } from '../types/tools'
import { CanvasFormat, FabricCanvas } from '../types/canvas'
import { AssetCategory } from '../types/assets'
import { DEFAULT_CANVAS_FORMAT, DEFAULT_CANVAS_BACKGROUND, DEFAULT_TOOL_PROPS } from '../utils/constants'

/**
 * Canvas Store State Interface
 */
interface CanvasStoreState {
  // Canvas reference
  canvas: FabricCanvas | null
  setCanvas: (canvas: FabricCanvas | null) => void
  
  // Tool state
  activeTool: Tool
  toolProps: ToolProperties
  setActiveTool: (tool: Tool) => void
  setToolProps: (props: Partial<ToolProperties>) => void
  setColor: (color: string) => void
  setSize: (size: number) => void
  setOpacity: (opacity: number) => void
  setBrushType: (brushType: BrushType) => void
  
  // Canvas state
  canvasFormat: CanvasFormat
  canvasBackground: string
  setCanvasFormat: (format: CanvasFormat) => void
  setCanvasBackground: (color: string) => void
  
  // History state
  canUndo: boolean
  canRedo: boolean
  setCanUndo: (can: boolean) => void
  setCanRedo: (can: boolean) => void
  
  // Asset state
  selectedAssetCategory: AssetCategory
  setSelectedAssetCategory: (category: AssetCategory) => void
  
  // UI state
  showExportDialog: boolean
  showHelpDialog: boolean
  toggleExportDialog: () => void
  toggleHelpDialog: () => void
  setShowExportDialog: (show: boolean) => void
  
  // Actions
  resetCanvas: () => void
}

/**
 * Canvas store using Zustand
 */
export const useCanvasStore = create<CanvasStoreState>((set) => ({
  // Canvas reference
  canvas: null,
  setCanvas: (canvas) => set({ canvas }),
  
  // Tool state
  activeTool: Tool.PEN,
  toolProps: { ...DEFAULT_TOOL_PROPS, brushType: BrushType.ROUND },
  
  setActiveTool: (activeTool) => set({ activeTool }),
  
  setToolProps: (props) =>
    set((state) => ({
      toolProps: { ...state.toolProps, ...props },
    })),
  
  setColor: (color) =>
    set((state) => ({
      toolProps: { ...state.toolProps, color },
    })),
  
  setSize: (size) =>
    set((state) => ({
      toolProps: { ...state.toolProps, size },
    })),
  
  setOpacity: (opacity) =>
    set((state) => ({
      toolProps: { ...state.toolProps, opacity },
    })),
  
  setBrushType: (brushType) =>
    set((state) => ({
      toolProps: { ...state.toolProps, brushType },
    })),
  
  // Canvas state
  canvasFormat: DEFAULT_CANVAS_FORMAT,
  canvasBackground: DEFAULT_CANVAS_BACKGROUND,
  
  setCanvasFormat: (canvasFormat) => set({ canvasFormat }),
  setCanvasBackground: (canvasBackground) => set({ canvasBackground }),
  
  // History state
  canUndo: false,
  canRedo: false,
  setCanUndo: (canUndo) => set({ canUndo }),
  setCanRedo: (canRedo) => set({ canRedo }),
  
  // Asset state
  selectedAssetCategory: 'snowflakes',
  setSelectedAssetCategory: (selectedAssetCategory) => set({ selectedAssetCategory }),
  
  // UI state
  showExportDialog: false,
  showHelpDialog: false,
  
  toggleExportDialog: () =>
    set((state) => ({ showExportDialog: !state.showExportDialog })),
  
  toggleHelpDialog: () =>
    set((state) => ({ showHelpDialog: !state.showHelpDialog })),
  
  setShowExportDialog: (showExportDialog) => set({ showExportDialog }),
  
  // Actions
  resetCanvas: () =>
    set({
      canvasFormat: DEFAULT_CANVAS_FORMAT,
      canvasBackground: DEFAULT_CANVAS_BACKGROUND,
      activeTool: Tool.PEN,
      toolProps: { ...DEFAULT_TOOL_PROPS, brushType: BrushType.ROUND },
      canUndo: false,
      canRedo: false,
    }),
}))

