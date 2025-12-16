import { Search } from 'lucide-react'
import { useState, useEffect } from 'react'
import * as fabric from 'fabric'
import { useCanvasStore } from '../store/canvasStore'
import { ASSET_CATEGORIES } from '../utils/constants'
import { Asset, AssetManifest } from '../types/assets'
import { loadAssetManifest, getAssetsByCategory, searchAssets } from '../utils/assetLoader'
import { Tool } from '../types/tools'

/**
 * AssetPanel Component
 * Right sidebar for browsing and adding stickers
 */
const AssetPanel = () => {
  const { canvas, selectedAssetCategory, setSelectedAssetCategory, setActiveTool } = useCanvasStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [manifest, setManifest] = useState<AssetManifest | null>(null)
  const [loading, setLoading] = useState(true)

  // Load asset manifest on mount
  useEffect(() => {
    loadAssetManifest()
      .then((data) => {
        setManifest(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Failed to load assets:', error)
        setLoading(false)
      })
  }, [])

  // Get filtered assets
  const getFilteredAssets = (): Asset[] => {
    if (!manifest) return []
    
    if (searchQuery.trim()) {
      return searchAssets(manifest, searchQuery)
    }
    
    return getAssetsByCategory(manifest, selectedAssetCategory)
  }

  const filteredAssets = getFilteredAssets()

  // Handle drag start
  const handleDragStart = (e: React.DragEvent, asset: Asset) => {
    e.dataTransfer.setData('asset', JSON.stringify(asset))
    e.dataTransfer.effectAllowed = 'copy'
  }

  // Add asset to canvas at specific position
  const addAssetToCanvas = async (asset: Asset, x?: number, y?: number) => {
    if (!canvas) return

    try {
      const img = await fabric.FabricImage.fromURL(asset.path, {
        crossOrigin: 'anonymous',
      })
      
      // Scale image to reasonable size
      const maxSize = 150
      const scale = Math.min(maxSize / (img.width || 1), maxSize / (img.height || 1))
      
      img.scale(scale)
      
      // Add sticker effects
      img.set({
        left: x !== undefined ? x - ((img.width || 0) * scale) / 2 : (canvas.width || 0) / 2 - ((img.width || 0) * scale) / 2,
        top: y !== undefined ? y - ((img.height || 0) * scale) / 2 : (canvas.height || 0) / 2 - ((img.height || 0) * scale) / 2,
        shadow: new fabric.Shadow({
          color: 'rgba(0,0,0,0.3)',
          blur: 10,
          offsetX: 3,
          offsetY: 3,
        }),
      })
      
      // Add glossy effect with a filter
      img.filters = []
      
      // Temporarily make selectable for initial positioning
      img.selectable = true
      img.evented = true
      
      canvas.add(img)
      canvas.setActiveObject(img)
      canvas.renderAll()
      
      // Play a subtle "placement" animation
      const originalScale = img.scaleX || 1
      img.scale(0.5)
      canvas.renderAll()
      
      const animate = () => {
        const currentScale = img.scaleX || 0.5
        const newScale = currentScale + (originalScale - currentScale) * 0.3
        img.scale(newScale)
        canvas.renderAll()
        
        if (Math.abs(newScale - originalScale) > 0.01) {
          requestAnimationFrame(animate)
        } else {
          // Animation complete - switch to SELECT tool
          setActiveTool(Tool.SELECT)
        }
      }
      requestAnimationFrame(animate)
      
    } catch (error) {
      console.error('Failed to load asset:', error)
    }
  }
  
  // Handle asset click (for mobile/simple add)
  const handleAssetClick = (asset: Asset) => {
    addAssetToCanvas(asset)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-900 mb-3">Stickers</h2>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search stickers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 p-3 border-b border-gray-200 bg-white">
        {ASSET_CATEGORIES.map((category) => {
          const isActive = selectedAssetCategory === category.id
          
          // Assign unique colors to each category
          const colorMap: Record<string, string> = {
            'snowflakes': 'bg-gradient-to-br from-blue-400 to-blue-500',
            'winter': 'bg-gradient-to-br from-cyan-400 to-cyan-500',
            'decorations': 'bg-gradient-to-br from-red-400 to-red-500',
            'branding': 'bg-gradient-to-br from-purple-500 to-purple-600',
          }
          
          const activeColor = colorMap[category.id] || 'bg-gradient-to-br from-gray-500 to-gray-600'
          
          return (
            <button
              key={category.id}
              onClick={() => setSelectedAssetCategory(category.id)}
              className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 overflow-hidden ${
                isActive
                  ? `${activeColor} text-white shadow-lg scale-105`
                  : 'bg-gradient-to-br from-white to-gray-50 text-gray-800 hover:text-gray-900 hover:scale-105 shadow-md hover:shadow-lg border border-gray-200'
              }`}
              style={{
                boxShadow: isActive
                  ? '0 4px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)'
                  : '0 2px 4px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8)',
              }}
              title={category.description}
            >
              {/* Glossy overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent opacity-20 pointer-events-none" />
              
              <span className="relative z-10 text-lg">{category.icon}</span>
              <span className="relative z-10 hidden lg:inline">{category.label}</span>
            </button>
          )
        })}
      </div>

      {/* Asset Grid */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
        {loading ? (
          <div className="text-center py-8 text-gray-400 text-sm">
            Loading stickers...
          </div>
        ) : filteredAssets.length === 0 ? (
          <div className="text-center py-8 text-gray-400 text-sm">
            {searchQuery ? 'No stickers found' : 'No stickers in this category yet'}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {filteredAssets.map((asset) => (
              <button
                key={asset.id}
                onClick={() => handleAssetClick(asset)}
                draggable
                onDragStart={(e) => handleDragStart(e, asset)}
                className="aspect-square bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-brand-purple-400 rounded-lg p-2 transition-smooth flex items-center justify-center group relative cursor-grab active:cursor-grabbing hover:scale-105 hover:shadow-lg"
                title={`${asset.name} - Click or drag to add`}
                style={{
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8)',
                }}
              >
                <img
                  src={asset.path}
                  alt={asset.name}
                  className="max-w-full max-h-full object-contain pointer-events-none"
                  onError={(e) => {
                    // Fallback for missing images
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect width="100" height="100" fill="%23ddd"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999"%3E?%3C/text%3E%3C/svg%3E'
                  }}
                  style={{
                    filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-0 group-hover:opacity-40 rounded-lg transition-smooth pointer-events-none" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AssetPanel

