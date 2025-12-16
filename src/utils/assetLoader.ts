import { AssetManifest, Asset, AssetCategory } from '../types/assets'

let cachedManifest: AssetManifest | null = null

/**
 * Load asset manifest from public directory
 */
export async function loadAssetManifest(): Promise<AssetManifest> {
  if (cachedManifest) {
    return cachedManifest
  }

  try {
    const response = await fetch('/assets/manifest.json')
    if (!response.ok) {
      throw new Error('Failed to load asset manifest')
    }
    const data: AssetManifest = await response.json()
    cachedManifest = data
    return data
  } catch (error) {
    console.error('Error loading asset manifest:', error)
    // Return empty manifest as fallback
    return {
      version: '1.0.0',
      categories: [],
      assets: [],
    }
  }
}

/**
 * Get assets by category
 */
export function getAssetsByCategory(
  manifest: AssetManifest,
  category: AssetCategory
): Asset[] {
  return manifest.assets.filter((asset) => asset.category === category)
}

/**
 * Search assets by query
 */
export function searchAssets(manifest: AssetManifest, query: string): Asset[] {
  const lowerQuery = query.toLowerCase()
  return manifest.assets.filter(
    (asset) =>
      asset.name.toLowerCase().includes(lowerQuery) ||
      asset.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  )
}

/**
 * Get asset by ID
 */
export function getAssetById(manifest: AssetManifest, id: string): Asset | undefined {
  return manifest.assets.find((asset) => asset.id === id)
}

/**
 * Preload asset image
 */
export function preloadAssetImage(path: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = path
  })
}

