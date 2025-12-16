import Canvas from './Canvas'
import Toolbar from './Toolbar'
import AssetPanel from './AssetPanel'
import ExportDialog from './ExportDialog'
import SnowfallBackground from './SnowfallBackground'

/**
 * Studio Component
 * Main workspace containing canvas, toolbar, and asset panel
 */
const Studio = () => {
  return (
    <div 
      className="flex-1 flex overflow-hidden relative"
      style={{
        backgroundImage: 'url(/wood-texture.svg)',
        backgroundSize: '400px 400px',
        backgroundRepeat: 'repeat',
      }}
    >
      {/* Snowfall background effect */}
      <SnowfallBackground />

      {/* Left Toolbar - Hidden on mobile, shown on desktop */}
      <div className="hidden md:block w-20 lg:w-24 bg-white border-r border-gray-200 shadow-lg z-10">
        <Toolbar />
      </div>

      {/* Canvas Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-2 md:p-4 lg:p-8 overflow-auto">
        {/* Mobile Toolbar - Shown only on mobile */}
        <div className="md:hidden w-full mb-2 bg-white rounded-lg shadow-lg p-2">
          <Toolbar />
        </div>
        
        <Canvas />
      </div>

      {/* Right Asset Panel - Hidden on mobile by default, shown on desktop */}
      <div className="hidden md:block w-64 lg:w-80 bg-white border-l border-gray-200 shadow-lg z-10 overflow-hidden">
        <AssetPanel />
      </div>

      {/* Mobile Asset Panel - Floating button */}
      <div className="md:hidden fixed bottom-4 right-4 z-20">
        <button
          className="bg-brand-purple-500 text-white p-4 rounded-full shadow-lg hover:bg-brand-purple-600 transition-smooth"
          onClick={() => {
            const panel = document.getElementById('mobile-asset-panel')
            if (panel) {
              panel.classList.toggle('hidden')
            }
          }}
        >
          <span className="text-2xl">🎨</span>
        </button>
      </div>

      {/* Mobile Asset Panel - Drawer */}
      <div
        id="mobile-asset-panel"
        className="md:hidden fixed inset-x-0 bottom-0 h-2/3 bg-white rounded-t-2xl shadow-2xl z-30 transform transition-transform hidden"
      >
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-300 rounded-full" />
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={() => {
            const panel = document.getElementById('mobile-asset-panel')
            if (panel) {
              panel.classList.add('hidden')
            }
          }}
        >
          ✕
        </button>
        <div className="h-full pt-8">
          <AssetPanel />
        </div>
      </div>

      {/* Export Dialog */}
      <ExportDialog />
    </div>
  )
}

export default Studio

