/**
 * Asset category types
 */
export type AssetCategory = 'snowflakes' | 'winter' | 'decorations' | 'branding'

/**
 * Individual asset definition
 */
export interface Asset {
  id: string
  name: string
  category: AssetCategory
  path: string
  tags: string[]
  thumbnail?: string
}

/**
 * Asset manifest structure
 */
export interface AssetManifest {
  version: string
  categories: AssetCategory[]
  assets: Asset[]
}

/**
 * Asset category metadata
 */
export interface AssetCategoryInfo {
  id: AssetCategory
  label: string
  icon: string
  description: string
}

