/**
 * LoadingSpinner Component
 * Shows a festive loading animation
 */
const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="text-6xl animate-spin mb-4">❄️</div>
        <p className="text-lg font-semibold text-gray-700">Loading your canvas...</p>
      </div>
    </div>
  )
}

export default LoadingSpinner

