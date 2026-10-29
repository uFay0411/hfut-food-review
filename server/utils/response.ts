export function json<T>(data: T, status = 200): Response {
  return Response.json({ success: true, data }, { status, headers: headers() })
}
export function failure(code: string, message: string, status: number): Response {
  return Response.json({ success: false, error: { code, message } }, { status, headers: headers() })
}
function headers() {
  return {
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  }
}
