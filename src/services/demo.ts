import type { Dish } from '../types'

export const campuses = [
  { id: 'feicuihu', name: '翡翠湖校区' },
  { id: 'tunxilu', name: '屯溪路校区' },
  { id: 'luanlu', name: '六安路校区' },
  { id: 'xuancheng', name: '宣城校区' },
]
// 全部为测试数据；未核实的真实食堂与窗口不得录入此处。
export const dishes: Dish[] = [
  {
    id: 'demo-1',
    name: '番茄滑蛋饭',
    campusId: 'feicuihu',
    canteen: '示例食堂 A',
    floor: '一层',
    stall: '示例窗口 01',
    price: 12,
    priceUpdatedAt: '2026-10-29',
    status: 'available',
    image: '/images/tomato.svg',
    tags: ['酸甜', '米饭'],
    description: '番茄与滑蛋的家常组合。图片为示意插画，价格和口味标签均用于界面测试。',
  },
  {
    id: 'demo-2',
    name: '香菇鸡肉面',
    campusId: 'feicuihu',
    canteen: '示例食堂 A',
    floor: '一层',
    stall: '示例窗口 02',
    price: 14,
    priceUpdatedAt: '2026-10-29',
    status: 'available',
    image: '/images/noodles.svg',
    tags: ['面食', '热汤'],
    description: '一碗热汤面的界面示例，暂未采集真实菜品口味数据。',
  },
  {
    id: 'demo-3',
    name: '青椒小炒肉',
    campusId: 'feicuihu',
    canteen: '示例食堂 A',
    floor: '二层',
    stall: '示例窗口 03',
    price: 15,
    priceUpdatedAt: '2026-10-29',
    status: 'paused',
    image: '/images/pepper.svg',
    tags: ['微辣', '小炒'],
    description: '用于展示暂停供应状态的测试菜品，不代表真实供应情况。',
  },
]
export function searchDemo(campusId: string, query = ''): Dish[] {
  const q = query.trim().toLocaleLowerCase()
  return dishes.filter(
    (d) =>
      d.campusId === campusId &&
      `${d.name} ${d.canteen} ${d.stall} ${d.tags.join(' ')}`.toLocaleLowerCase().includes(q),
  )
}
