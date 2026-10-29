export type TasteKey = 'spicy' | 'salty' | 'sweet' | 'sour' | 'oily'
export interface TasteProfile {
  version: 1
  region?: string
  preferences: Record<TasteKey, number>
}
export interface Dish {
  id: string
  name: string
  campusId: string
  canteen: string
  stall: string
  floor: string
  price: number
  priceUpdatedAt: string
  status: 'available' | 'paused' | 'removed'
  image: string
  tags: string[]
  description: string
}
export type ApiResult<T> =
  { success: true; data: T } | { success: false; error: { code: string; message: string } }
