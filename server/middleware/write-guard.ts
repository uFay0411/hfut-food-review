import { failure } from '../utils/response'
// 第一阶段没有认证模块：所有 API 写操作默认关闭，含生产与开发。
export function writeGuard(request: Request): Response | null {
  return ['GET', 'HEAD'].includes(request.method)
    ? null
    : failure('WRITES_DISABLED', '当前阶段尚未开放写入接口', 403)
}
