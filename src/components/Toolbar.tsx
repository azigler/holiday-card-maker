import { Pen, Brush, Highlighter, Eraser, Square, Circle, Star, Type, Sparkles, MousePointer2 } from 'lucide-react'
import { useCanvasStore } from '../store/canvasStore'
import { Tool, BrushType } from '../types/tools'
import ColorPicker from './ColorPicker'

/**
 * Toolbar Component
 * Left sidebar with drawing tools and properties
 */
const Toolbar = () => {
  const { activeTool, setActiveTool, toolProps, setSize, setOpacity, setBrushType } = useCanvasStore()

  const tools = [
    { id: Tool.SELECT, icon: MousePointer2, label: 'Select & Move', color: 'bg-gradient-to-br from-gray-500 to-gray-600' },
    { id: Tool.PEN, icon: Pen, label: 'Pen', color: 'bg-gradient-to-br from-blue-500 to-blue-600' },
    { id: Tool.BRUSH, icon: Brush, label: 'Brush', color: 'bg-gradient-to-br from-purple-500 to-purple-600' },
    { id: Tool.HIGHLIGHTER, icon: Highlighter, label: 'Highlighter', color: 'bg-gradient-to-br from-yellow-400 to-yellow-500' },
    { id: Tool.SPRAY, icon: Sparkles, label: 'Spray', color: 'bg-gradient-to-br from-pink-500 to-pink-600' },
    { id: Tool.ERASER, icon: Eraser, label: 'Eraser', color: 'bg-gradient-to-br from-red-500 to-red-600' },
    { id: Tool.RECTANGLE, icon: Square, label: 'Rectangle', color: 'bg-gradient-to-br from-green-500 to-green-600' },
    { id: Tool.CIRCLE, icon: Circle, label: 'Circle', color: 'bg-gradient-to-br from-teal-500 to-teal-600' },
    { id: Tool.STAR, icon: Star, label: 'Star', color: 'bg-gradient-to-br from-orange-500 to-orange-600' },
    { id: Tool.TEXT, icon: Type, label: 'Text', color: 'bg-gradient-to-br from-indigo-500 to-indigo-600' },
  ]

  return (
    <div className="flex md:flex-col h-full p-2 gap-2 overflow-x-auto md:overflow-x-visible">
      {/* Tools */}
      <div className="flex md:flex-col gap-1 flex-nowrap md:flex-wrap">
        {tools.map((tool) => {
          const Icon = tool.icon
          const isActive = activeTool === tool.id
          return (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={`relative p-4 rounded-xl transition-all duration-200 flex items-center justify-center overflow-hidden ${
                isActive
                  ? `${tool.color} text-white shadow-2xl scale-105 translate-y-[-2px]`
                  : 'bg-gradient-to-br from-white to-gray-100 text-gray-600 hover:text-gray-800 hover:scale-105 hover:shadow-xl shadow-md'
              }`}
              style={{
                boxShadow: isActive 
                  ? '0 8px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -2px 0 rgba(0,0,0,0.2)'
                  : '0 4px 8px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(0,0,0,0.1)',
              }}
              title={tool.label}
            >
              {/* Glossy overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent opacity-20 pointer-events-none" />
              
              {/* Active glow */}
              {isActive && (
                <div className="absolute inset-0 bg-white opacity-10 animate-pulse pointer-events-none" />
              )}
              
              <Icon size={22} strokeWidth={2.5} className="relative z-10" />
            </button>
          )
        })}
      </div>

      {/* Desktop controls - hidden on mobile */}
      <div className="hidden md:block border-t border-gray-200 my-2" />

      {/* Brush Type Selector (only for brush tool) - Desktop only */}
      {activeTool === Tool.BRUSH && (
        <>
          <div className="hidden md:block px-1">
            <label className="text-xs font-medium text-gray-600 block mb-1">
              Brush Type
            </label>
            <select
              value={toolProps.brushType || BrushType.ROUND}
              onChange={(e) => setBrushType(e.target.value as BrushType)}
              className="w-full px-2 py-1 text-xs border border-gray-300 rounded bg-white focus:ring-2 focus:ring-brand-purple-500 focus:border-transparent"
            >
              <option value={BrushType.ROUND}>Round</option>
              <option value={BrushType.SPARKLE}>Sparkle</option>
              <option value={BrushType.CALLIGRAPHY}>Calligraphy</option>
            </select>
          </div>
          <div className="hidden md:block border-t border-gray-200 my-2" />
        </>
      )}

      {/* Color Picker - Desktop only */}
      <div className="hidden md:block px-1">
        <ColorPicker />
      </div>

      <div className="hidden md:block border-t border-gray-200 my-2" />

      {/* Size Control - Desktop only */}
      <div className="hidden md:block px-1">
        <label className="text-xs font-medium text-gray-600 block mb-1">
          Size
        </label>
        <input
          type="range"
          min="1"
          max="100"
          value={toolProps.size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-purple-500"
        />
        <div className="text-center text-xs text-gray-500 mt-1">
          {toolProps.size}px
        </div>
      </div>

      {/* Opacity Control - Desktop only */}
      <div className="hidden md:block px-1">
        <label className="text-xs font-medium text-gray-600 block mb-1">
          Opacity
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={toolProps.opacity}
          onChange={(e) => setOpacity(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-purple-500"
        />
        <div className="text-center text-xs text-gray-500 mt-1">
          {toolProps.opacity}%
        </div>
      </div>
    </div>
  )
}

export default Toolbar

