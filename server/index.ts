import { health } from './routes/health'
import { failure } from './utils/response'
import { writeGuard } from './middleware/write-guard'
export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url)
    if (url.pathname === '/api' || url.pathname.startsWith('/api/')) {
      const blocked = writeGuard(request)
      if (blocked) return blocked
      const response =
        url.pathname === '/api/health' ? health() : failure('NOT_FOUND', '接口不存在', 404)
      return request.method === 'HEAD'
        ? new Response(null, { status: response.status, headers: response.headers })
        : response
    }
    return failure('NOT_FOUND', '资源不存在', 404)
  },
} satisfies ExportedHandler
