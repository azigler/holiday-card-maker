import { useState } from 'react'
import { useCanvasStore } from '../store/canvasStore'
import { ALL_FESTIVE_COLORS } from '../utils/constants'

/**
 * ColorPicker Component
 * Color selection with presets and custom color picker
 */
const ColorPicker = () => {
  const { toolProps, setColor } = useCanvasStore()
  const [showCustom, setShowCustom] = useState(false)

  return (
    <div className="flex flex-col gap-2">
      {/* Current Color Display */}
      <div className="flex items-center gap-2">
        <div
          className="w-12 h-12 rounded-lg border-2 border-gray-300 shadow-sm cursor-pointer"
          style={{ backgroundColor: toolProps.color }}
          onClick={() => setShowCustom(!showCustom)}
          title="Current color"
        />
      </div>

      {/* Color Presets Grid */}
      <div className="grid grid-cols-3 gap-1">
        {ALL_FESTIVE_COLORS.map((color) => (
          <button
            key={color}
            className={`w-full aspect-square rounded border-2 transition-smooth ${
              toolProps.color === color
                ? 'border-brand-purple-500 scale-110'
                : 'border-gray-200 hover:border-gray-400'
            }`}
            style={{ backgroundColor: color }}
            onClick={() => setColor(color)}
            title={color}
          />
        ))}
      </div>

      {/* Custom Color Picker */}
      {showCustom && (
        <input
          type="color"
          value={toolProps.color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full h-10 rounded border-2 border-gray-300 cursor-pointer"
        />
      )}
    </div>
  )
}

export default ColorPicker

