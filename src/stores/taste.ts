import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { TasteProfile, TasteKey } from '../types'
export const tasteDimensions: { key: TasteKey; label: string; low: string; high: string }[] = [
  { key: 'spicy', label: '辣度', low: '不太吃辣', high: '无辣不欢' },
  { key: 'salty', label: '咸度', low: '偏清淡', high: '偏浓郁' },
  { key: 'sweet', label: '甜度', low: '少一点甜', high: '喜欢甜味' },
  { key: 'sour', label: '酸度', low: '少一点酸', high: '喜欢酸味' },
  { key: 'oily', label: '油润感', low: '偏清爽', high: '偏油润' },
]
const storageKey = 'hfut-food-review:taste:v1'
export function defaultProfile(): TasteProfile {
  return { version: 1, preferences: { spicy: 2, salty: 3, sweet: 3, sour: 2, oily: 2 } }
}
export function isTasteProfile(value: unknown): value is TasteProfile {
  if (!value || typeof value !== 'object') return false
  const p = value as Partial<TasteProfile>
  return (
    p.version === 1 &&
    (p.region === undefined || (typeof p.region === 'string' && p.region.length <= 30)) &&
    !!p.preferences &&
    tasteDimensions.every(
      ({ key }) =>
        Number.isInteger(p.preferences?.[key]) &&
        Number(p.preferences?.[key]) >= 1 &&
        Number(p.preferences?.[key]) <= 5,
    )
  )
}
export const useTasteStore = defineStore('taste', () => {
  const profile = ref<TasteProfile>(defaultProfile())
  const saved = ref(false)
  const error = ref('')
  try {
    const raw = localStorage.getItem(storageKey)
    if (raw) {
      const parsed: unknown = JSON.parse(raw)
      if (isTasteProfile(parsed)) {
        profile.value = parsed
        saved.value = true
      }
    }
  } catch {
    error.value = '无法读取浏览器存储，你仍可调整口味。'
  }
  function save(value: TasteProfile) {
    if (!isTasteProfile(value)) {
      error.value = '口味数值必须为 1–5 的整数'
      return false
    }
    try {
      localStorage.setItem(storageKey, JSON.stringify(value))
      profile.value = structuredClone(value)
      saved.value = true
      error.value = ''
      return true
    } catch {
      error.value = '浏览器禁止保存，请检查存储权限'
      return false
    }
  }
  function remove() {
    try {
      localStorage.removeItem(storageKey)
      profile.value = defaultProfile()
      saved.value = false
      error.value = ''
      return true
    } catch {
      error.value = '删除失败，请检查浏览器存储权限'
      return false
    }
  }
  return { profile, saved, error, save, remove }
})
