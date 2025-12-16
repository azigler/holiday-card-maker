import { useCanvasStore } from '../store/canvasStore'
import { CanvasFormat } from '../types/canvas'
import { CANVAS_FORMATS } from '../utils/constants'

/**
 * FormatSelector Component
 * Dropdown to select card format (landscape, portrait, square)
 */
const FormatSelector = () => {
  const { canvasFormat, setCanvasFormat } = useCanvasStore()

  const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCanvasFormat(e.target.value as CanvasFormat)
  }

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="format" className="text-sm font-medium text-gray-700">
        Format:
      </label>
      <select
        id="format"
        value={canvasFormat}
        onChange={handleFormatChange}
        className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-brand-purple-500 focus:border-transparent transition-smooth cursor-pointer"
      >
        <option value="landscape">
          Landscape ({CANVAS_FORMATS.landscape.ratio})
        </option>
        <option value="portrait">
          Portrait ({CANVAS_FORMATS.portrait.ratio})
        </option>
        <option value="square">
          Square ({CANVAS_FORMATS.square.ratio})
        </option>
      </select>
    </div>
  )
}

export default FormatSelector

