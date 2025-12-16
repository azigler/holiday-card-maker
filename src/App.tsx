import { useEffect } from 'react'
import Header from './components/Header'
import Studio from './components/Studio'
import { useAutoSave } from './hooks/useAutoSave'
import { useHistory } from './hooks/useHistory'
import { useCanvasStore } from './store/canvasStore'

/**
 * Holiday Card Maker - Main Application Component
 * 
 * A festive winter holiday card maker built for Dev Interrupted's 2025 holiday episode.
 * Allows users to create custom greeting cards with drawing tools, stickers, and decorations.
 */
function App() {
  const { toggleExportDialog } = useCanvasStore()
  const { undo, redo } = useHistory()
  
  // Enable auto-save
  useAutoSave()

  useEffect(() => {
    // Keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent Ctrl+S (save page)
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
      }

      // Undo: Ctrl+Z
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        undo()
      }

      // Redo: Ctrl+Y or Ctrl+Shift+Z
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault()
        redo()
      }

      // Export: Ctrl+E
      if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault()
        toggleExportDialog()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [undo, redo, toggleExportDialog])

  return (
    <div className="flex flex-col h-screen bg-snow-100">
      <Header />
      <Studio />
    </div>
  )
}

export default App

