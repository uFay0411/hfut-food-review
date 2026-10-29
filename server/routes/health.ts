import { json } from '../utils/response'
export function health(): Response {
  return json({
    status: 'ok',
    service: 'hfut-food-review',
    stage: 'foundation',
    timestamp: new Date().toISOString(),
  })
}
