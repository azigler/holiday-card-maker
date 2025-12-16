import { useEffect } from 'react'
import { useCanvasStore } from '../store/canvasStore'
import { AUTOSAVE_INTERVAL, STORAGE_KEYS } from '../utils/constants'

/**
 * useAutoSave Hook
 * Automatically saves canvas state to localStorage
 */
export function useAutoSave() {
  const { canvas, canvasFormat, canvasBackground } = useCanvasStore()

  // Auto-save on interval
  useEffect(() => {
    if (!canvas) return

    const saveToLocalStorage = () => {
      try {
        const json = JSON.stringify(canvas.toJSON())
        
        // Use Unicode-safe storage method
        // Encode to handle emoji and special characters
        const encodedJson = encodeURIComponent(json)
        
        localStorage.setItem(STORAGE_KEYS.CANVAS_STATE, encodedJson)
        localStorage.setItem(STORAGE_KEYS.CANVAS_FORMAT, canvasFormat)
        localStorage.setItem(STORAGE_KEYS.CANVAS_BACKGROUND, canvasBackground)
        localStorage.setItem(STORAGE_KEYS.LAST_SAVED, Date.now().toString())
      } catch (error) {
        console.error('Failed to save to localStorage:', error)
        // Gracefully handle storage errors (quota exceeded, etc.)
      }
    }

    const intervalId = setInterval(saveToLocalStorage, AUTOSAVE_INTERVAL)

    return () => clearInterval(intervalId)
  }, [canvas, canvasFormat, canvasBackground])

  // Save on visibility change (tab switch, window close)
  useEffect(() => {
    if (!canvas) return

    const handleVisibilityChange = () => {
      if (document.hidden) {
        try {
          const json = JSON.stringify(canvas.toJSON())
          
          // Use Unicode-safe storage method
          const encodedJson = encodeURIComponent(json)
          
          localStorage.setItem(STORAGE_KEYS.CANVAS_STATE, encodedJson)
          localStorage.setItem(STORAGE_KEYS.CANVAS_FORMAT, canvasFormat)
          localStorage.setItem(STORAGE_KEYS.CANVAS_BACKGROUND, canvasBackground)
          localStorage.setItem(STORAGE_KEYS.LAST_SAVED, Date.now().toString())
        } catch (error) {
          console.error('Failed to save to localStorage:', error)
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [canvas, canvasFormat, canvasBackground])

  // Restore from localStorage on mount
  useEffect(() => {
    if (!canvas) return

    try {
      const encodedState = localStorage.getItem(STORAGE_KEYS.CANVAS_STATE)
      const lastSaved = localStorage.getItem(STORAGE_KEYS.LAST_SAVED)

      if (encodedState && lastSaved) {
        // Decode the Unicode-safe encoded state
        const savedState = decodeURIComponent(encodedState)
        
        const timeSinceLastSave = Date.now() - parseInt(lastSaved)
        const hoursSinceLastSave = timeSinceLastSave / (1000 * 60 * 60)

        // Only restore if saved within last 24 hours
        if (hoursSinceLastSave < 24) {
          const shouldRestore = window.confirm(
            'Would you like to restore your last session?'
          )

          if (shouldRestore) {
            canvas.loadFromJSON(savedState, () => {
              canvas.renderAll()
            })
          }
        }
      }
    } catch (error) {
      console.error('Failed to restore from localStorage:', error)
      // Clear corrupted data
      try {
        localStorage.removeItem(STORAGE_KEYS.CANVAS_STATE)
      } catch (e) {
        // Ignore
      }
    }
  }, [canvas])
}

