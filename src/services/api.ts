import type { ApiResult } from '../types'
export async function getHealth() {
  const response = await fetch('/api/health', { signal: AbortSignal.timeout(8000) })
  const result: ApiResult<{ status: string; service: string; stage: string }> =
    await response.json()
  if (!response.ok || !result.success) throw new Error('服务暂时不可用，请稍后重试')
  return result.data
}
