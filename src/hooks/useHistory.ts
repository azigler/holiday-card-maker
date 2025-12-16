import { useEffect, useRef } from 'react'
import { useCanvasStore } from '../store/canvasStore'
import { HISTORY_LIMIT } from '../utils/constants'
import { CanvasHistoryState } from '../types/canvas'

/**
 * useHistory Hook
 * Manages undo/redo functionality for canvas
 */
export function useHistory() {
  const { canvas, setCanUndo, setCanRedo } = useCanvasStore()
  
  const historyRef = useRef<CanvasHistoryState[]>([])
  const currentIndexRef = useRef(-1)
  const isUndoRedoRef = useRef(false)

  useEffect(() => {
    if (!canvas) return

    // Save initial state
    saveState()

    // Listen for object modifications
    const handleModified = () => {
      if (!isUndoRedoRef.current) {
        saveState()
      }
    }

    canvas.on('object:added', handleModified)
    canvas.on('object:modified', handleModified)
    canvas.on('object:removed', handleModified)
    canvas.on('path:created', handleModified)

    return () => {
      canvas.off('object:added', handleModified)
      canvas.off('object:modified', handleModified)
      canvas.off('object:removed', handleModified)
      canvas.off('path:created', handleModified)
    }
  }, [canvas])

  const saveState = () => {
    if (!canvas) return

    try {
      const json = JSON.stringify(canvas.toJSON())
      const state: CanvasHistoryState = {
        json,
        timestamp: Date.now(),
      }

      // Remove any states after current index
      historyRef.current = historyRef.current.slice(0, currentIndexRef.current + 1)

      // Add new state
      historyRef.current.push(state)

      // Limit history size
      if (historyRef.current.length > HISTORY_LIMIT) {
        historyRef.current.shift()
      } else {
        currentIndexRef.current++
      }

      updateUndoRedoState()
    } catch (error) {
      console.error('Failed to save history state:', error)
      // Continue without saving this state
    }
  }

  const undo = () => {
    if (!canvas || currentIndexRef.current <= 0) return

    isUndoRedoRef.current = true
    setCanUndo(false) // Temporarily disable during load
    setCanRedo(false)
    
    currentIndexRef.current--

    const state = historyRef.current[currentIndexRef.current]
    
    // Use requestAnimationFrame to prevent UI blocking
    requestAnimationFrame(() => {
      canvas.loadFromJSON(state.json, () => {
        canvas.renderAll()
        isUndoRedoRef.current = false
        updateUndoRedoState()
      })
    })
  }

  const redo = () => {
    if (!canvas || currentIndexRef.current >= historyRef.current.length - 1) return

    isUndoRedoRef.current = true
    setCanUndo(false) // Temporarily disable during load
    setCanRedo(false)
    
    currentIndexRef.current++

    const state = historyRef.current[currentIndexRef.current]
    
    // Use requestAnimationFrame to prevent UI blocking
    requestAnimationFrame(() => {
      canvas.loadFromJSON(state.json, () => {
        canvas.renderAll()
        isUndoRedoRef.current = false
        updateUndoRedoState()
      })
    })
  }

  const updateUndoRedoState = () => {
    setCanUndo(currentIndexRef.current > 0)
    setCanRedo(currentIndexRef.current < historyRef.current.length - 1)
  }

  return { undo, redo }
}

