import { X, Download } from 'lucide-react'
import { useState } from 'react'
import { useCanvasStore } from '../store/canvasStore'
import { ExportFormat, ExportResolution } from '../types/canvas'

/**
 * ExportDialog Component
 * Modal for exporting card as PNG/JPG
 */
const ExportDialog = () => {
  const { showExportDialog, setShowExportDialog, canvas } = useCanvasStore()
  const [format, setFormat] = useState<ExportFormat>('png')
  const [resolution, setResolution] = useState<ExportResolution>('standard')
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF')
  const [filename, setFilename] = useState('holiday-card')

  if (!showExportDialog) return null

  const handleExport = () => {
    if (!canvas) return

    try {
      const multiplier = resolution === 'high' ? 2 : 1
      const exportFormat = format === 'png' ? 'png' : 'jpeg'
      
      // If JPG, temporarily set background
      const originalBg = canvas.backgroundColor
      if (format === 'jpg') {
        canvas.backgroundColor = backgroundColor
        canvas.renderAll()
      }

      // Export canvas with error handling for Unicode/special characters
      const dataURL = canvas.toDataURL({
        format: exportFormat,
        quality: 1,
        multiplier: multiplier,
      })

      // Restore original background
      if (format === 'jpg') {
        canvas.backgroundColor = originalBg
        canvas.renderAll()
      }

      // Download
      const link = document.createElement('a')
      link.download = `${filename}.${format}`
      link.href = dataURL
      link.click()

      setShowExportDialog(false)
    } catch (error) {
      console.error('Export failed:', error)
      alert('Failed to export card. This may happen if the card contains special characters or is too large. Try simplifying your design or using a different format.')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Export Card</h2>
          <button
            onClick={() => setShowExportDialog(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-smooth"
          >
            <X size={20} />
          </button>
        </div>

        {/* Format Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Format
          </label>
          <div className="flex gap-3">
            <button
              onClick={() => setFormat('png')}
              className={`relative flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 overflow-hidden ${
                format === 'png'
                  ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg scale-105'
                  : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800 hover:text-gray-900 hover:scale-105 shadow-md hover:shadow-lg'
              }`}
              style={{
                boxShadow: format === 'png'
                  ? '0 4px 12px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255,255,255,0.3)'
                  : '0 2px 4px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent opacity-20 pointer-events-none" />
              <span className="relative z-10">PNG</span>
            </button>
            <button
              onClick={() => setFormat('jpg')}
              className={`relative flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 overflow-hidden ${
                format === 'jpg'
                  ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg scale-105'
                  : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800 hover:text-gray-900 hover:scale-105 shadow-md hover:shadow-lg'
              }`}
              style={{
                boxShadow: format === 'jpg'
                  ? '0 4px 12px rgba(249, 115, 22, 0.3), inset 0 1px 0 rgba(255,255,255,0.3)'
                  : '0 2px 4px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent opacity-20 pointer-events-none" />
              <span className="relative z-10">JPG</span>
            </button>
          </div>
        </div>

        {/* Resolution Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Resolution
          </label>
          <div className="flex gap-3">
            <button
              onClick={() => setResolution('standard')}
              className={`relative flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 overflow-hidden ${
                resolution === 'standard'
                  ? 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg scale-105'
                  : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800 hover:text-gray-900 hover:scale-105 shadow-md hover:shadow-lg'
              }`}
              style={{
                boxShadow: resolution === 'standard'
                  ? '0 4px 12px rgba(34, 197, 94, 0.3), inset 0 1px 0 rgba(255,255,255,0.3)'
                  : '0 2px 4px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent opacity-20 pointer-events-none" />
              <span className="relative z-10">Standard</span>
            </button>
            <button
              onClick={() => setResolution('high')}
              className={`relative flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 overflow-hidden ${
                resolution === 'high'
                  ? 'bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800 hover:text-gray-900 hover:scale-105 shadow-md hover:shadow-lg'
              }`}
              style={{
                boxShadow: resolution === 'high'
                  ? '0 4px 12px rgba(168, 85, 247, 0.3), inset 0 1px 0 rgba(255,255,255,0.3)'
                  : '0 2px 4px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent opacity-20 pointer-events-none" />
              <span className="relative z-10">High Res (2x)</span>
            </button>
          </div>
        </div>

        {/* Background Color (JPG only) */}
        {format === 'jpg' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Background Color
            </label>
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="w-full h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
            />
          </div>
        )}

        {/* Filename */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filename
          </label>
          <input
            type="text"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-purple-500 focus:border-transparent"
          />
        </div>

        {/* Export Button */}
        <button
          onClick={handleExport}
          className="relative w-full py-4 bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-200 overflow-hidden hover:scale-105 active:scale-95"
          style={{
            boxShadow: '0 6px 16px rgba(124, 58, 237, 0.4), inset 0 2px 0 rgba(255,255,255,0.3)',
          }}
        >
          {/* Glossy overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent opacity-20 pointer-events-none" />
          
          <Download size={22} className="relative z-10" />
          <span className="relative z-10">Export Card</span>
        </button>
      </div>
    </div>
  )
}

export default ExportDialog

