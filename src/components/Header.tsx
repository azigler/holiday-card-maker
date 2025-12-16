import { Undo2, Redo2, Download, FileText, CheckCircle2 } from "lucide-react"
import { useCanvasStore } from "../store/canvasStore"
import { useHistory } from "../hooks/useHistory"
import FormatSelector from "./FormatSelector"

/**
 * Header Component
 * Top navigation bar with logo, actions, and format selector
 */
const Header = () => {
  const { canUndo, canRedo, toggleExportDialog, resetCanvas, canvas } =
    useCanvasStore()

  const { undo, redo } = useHistory()

  const handleUndo = () => {
    if (canvas && canUndo) {
      undo()
    }
  }

  const handleRedo = () => {
    if (canvas && canRedo) {
      redo()
    }
  }

  const handleNew = () => {
    if (canvas) {
      const confirmed = window.confirm(
        "Are you sure you want to create a new card? Any unsaved changes will be lost."
      )
      if (confirmed) {
        canvas.clear()
        canvas.backgroundColor = "#FFFFFF"
        canvas.renderAll()
        resetCanvas()
      }
    }
  }

  return (
    <header className="bg-white border-b-2 border-gray-200 shadow-sm h-16 flex items-center px-6 z-10 no-select">
      <div className="flex items-center gap-4 flex-1">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <div className="text-2xl">🎄</div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Holiday Card Maker
            </h1>
            <p className="text-xs text-brand-purple-600 font-semibold">
              Dev Interrupted
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleNew}
          className="px-3 py-2 bg-gradient-to-br from-white to-gray-100 hover:from-gray-50 hover:to-gray-200 rounded-lg font-medium text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2 text-gray-700"
          style={{
            boxShadow:
              "0 4px 8px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(0,0,0,0.1)",
          }}
          title="New Card (Ctrl+N)"
        >
          <FileText size={18} />
          <span className="hidden md:inline">New</span>
        </button>

        <button
          onClick={handleUndo}
          disabled={!canUndo}
          className="p-2 bg-gradient-to-br from-white to-gray-100 hover:from-gray-50 hover:to-gray-200 disabled:from-gray-50 disabled:to-gray-100 disabled:text-gray-300 rounded-lg transition-all shadow-md hover:shadow-lg text-gray-700"
          style={{
            boxShadow:
              "0 4px 8px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(0,0,0,0.1)",
          }}
          title="Undo (Ctrl+Z)"
        >
          <Undo2 size={20} />
        </button>

        <button
          onClick={handleRedo}
          disabled={!canRedo}
          className="p-2 bg-gradient-to-br from-white to-gray-100 hover:from-gray-50 hover:to-gray-200 disabled:from-gray-50 disabled:to-gray-100 disabled:text-gray-300 rounded-lg transition-all shadow-md hover:shadow-lg text-gray-700"
          style={{
            boxShadow:
              "0 4px 8px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(0,0,0,0.1)",
          }}
          title="Redo (Ctrl+Y)"
        >
          <Redo2 size={20} />
        </button>

        <div className="hidden md:block ml-2">
          <FormatSelector />
        </div>

        <div className="h-8 w-px bg-gray-300 mx-1" />

        {/* Big prominent DONE button */}
        <button
          onClick={toggleExportDialog}
          className="relative px-6 py-3 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-bold text-lg transition-all shadow-2xl hover:shadow-3xl hover:scale-105 flex items-center gap-3 overflow-hidden"
          style={{
            boxShadow:
              "0 8px 20px rgba(34, 197, 94, 0.4), inset 0 2px 0 rgba(255,255,255,0.3), inset 0 -2px 0 rgba(0,0,0,0.2)",
          }}
          title="Finish and Save Your Card!"
        >
          {/* Glossy overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent opacity-20 pointer-events-none" />

          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse pointer-events-none" />

          <CheckCircle2 size={24} strokeWidth={2.5} className="relative z-10" />
          <span className="relative z-10">DONE!</span>
          <Download size={20} strokeWidth={2.5} className="relative z-10" />
        </button>
      </div>
    </header>
  )
}

export default Header
