import { describe, expect, it } from 'vitest'
import worker from '../server'
import { searchDemo } from '../src/services/demo'
import { defaultProfile, isTasteProfile } from '../src/stores/taste'
describe('API boundaries', () => {
  it('returns a minimal health envelope without secrets', async () => {
    const res = await worker.fetch(new Request('https://example.test/api/health'))
    expect(res.status).toBe(200)
    expect(res.headers.get('cache-control')).toBe('no-store')
    expect(await res.json()).toMatchObject({
      success: true,
      data: { status: 'ok', stage: 'foundation' },
    })
  })
  it('does not fall back to HTML for unknown APIs', async () => {
    const res = await worker.fetch(new Request('https://example.test/api/missing'))
    expect(res.status).toBe(404)
    expect(await res.json()).toMatchObject({ success: false, error: { code: 'NOT_FOUND' } })
  })
  it.each(['POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'])(
    'blocks %s without authentication infrastructure',
    async (method) => {
      expect(
        (await worker.fetch(new Request('https://example.test/api/reviews', { method }))).status,
      ).toBe(403)
    },
  )
  it('supports HEAD without a body', async () => {
    const res = await worker.fetch(
      new Request('https://example.test/api/health', { method: 'HEAD' }),
    )
    expect(res.status).toBe(200)
    expect(await res.text()).toBe('')
  })
})
describe('demo boundaries and profile validation', () => {
  it('isolates campuses and searches stalls', () => {
    expect(searchDemo('xuancheng')).toHaveLength(0)
    expect(searchDemo('feicuihu', '  窗口 02  ')[0]?.id).toBe('demo-2')
    expect(searchDemo('feicuihu', '不存在')).toHaveLength(0)
  })
  it('rejects corrupt or out of range stored profiles', () => {
    expect(isTasteProfile(defaultProfile())).toBe(true)
    expect(isTasteProfile({ version: 1, preferences: { spicy: 10 } })).toBe(false)
    expect(isTasteProfile(null)).toBe(false)
    expect(isTasteProfile({ ...defaultProfile(), version: 2 })).toBe(false)
  })
})
