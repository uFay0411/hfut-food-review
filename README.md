# 工大食鉴 · HFUT Food Review

面向合肥工业大学学生的食堂评价与口味发现网站。**当前完成第一阶段基础工程，并非可公开运营的评价平台。所有菜品、价格、插画、口味标签和示例评价均为测试数据。没有真实用户评分，不提供 AI 预测分。**

- 测试预览：https://hfut-food-review.ufay0411.workers.dev
- 公开源码：https://github.com/uFay0411/hfut-food-review
- 手动部署与接入记录：[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

## 技术与来源

通过 Cloudflare 官方 `create-cloudflare` Vue Workers 模板生成基础工程：

```sh
npm create cloudflare@latest -- hfut-food-review --framework=vue --platform=workers --no-deploy --no-git --no-agents
```

在模板基础上配置 Vue 3、TypeScript、Vue Router、Pinia、Tailwind CSS 4、Vite 和 Cloudflare Vite 插件。前端由 Workers Static Assets 托管，`/api/*` 先进入 Worker，未知 API 不会返回 SPA HTML。没有另建 Node 常驻后端。

官方资料：[Vue Workers](https://developers.cloudflare.com/workers/framework-guides/web-apps/vue/)、[Cloudflare Vite 插件](https://developers.cloudflare.com/workers/vite-plugin/)、[Tailwind Vite](https://tailwindcss.com/docs/installation/using-vite)。

## 本地运行

推荐 Node.js 24 LTS（本次验证为 24.22.1，最低要求见 package.json），npm 11+。完整依赖版本锁定在 package-lock.json。

```sh
npm ci
npm run cf-typegen
npm run dev
```

打开命令输出的本地地址（默认 `http://127.0.0.1:5173`），在官方 Workers 运行时中开发，不需要 Cloudflare 登录或配置生产资源。

```sh
npm run type-check
npm test
npm run build
npm run preview
```

代码格式检查：`npm run format:check`；自动整理：`npm run format`。

类型检查覆盖 Vue、Worker、配置与测试。单元测试覆盖接口边界、关闭写入、搜索校区隔离和画像校验；不能代替真实浏览器与校园网验证。

直接使用 Wrangler 运行**构建后的完整应用**：

```sh
npm run build
npm run dev:worker
```

默认端口 8787。`GET /api/health` 返回：

```json
{
  "success": true,
  "data": {
    "status": "ok",
    "service": "hfut-food-review",
    "stage": "foundation",
    "timestamp": "UTC ISO 8601"
  }
}
```

未知 API 为 404 / `NOT_FOUND`；当前所有非 GET/HEAD API 请求为 403 / `WRITES_DISABLED`。第一阶段不提供测试登录、评价写入或上传端点。健康检查不声称数据库/认证已就绪。

## 已实现与目录

- 首页、校区切换、示例食堂入口、菜品搜索与类型筛选、详情与暂停供应状态。
- 其他校区与无结果空状态、404 页面、Worker 状态加载/失败/重试。
- 临时口味画像的校验、本地保存与删除；不上传、不存认证令牌。
- 移动端底部导航、桌面导航、键盘焦点、跳转链接、懒加载本地 SVG 插画。
- API 统一 JSON 结构、写入关闭策略、基础静态安全响应头。

```text
src/
  components/DishCard.vue
  views/                 首页、食堂、详情、画像、我的、404
  router/index.ts
  stores/                校区搜索状态、临时画像
  services/              明确标注的模拟数据、API 客户端
  types/                 共享前端类型
  styles/main.css
  App.vue / main.ts
server/
  index.ts
  routes/health.ts
  middleware/write-guard.ts
  services/README.md      业务层与数据库访问层预留
  utils/response.ts
migrations/              下一阶段 Migration 约定
seeds/                   本地测试 Seed 约定
tests/api.test.ts
public/                  本地示意插画、图标与响应头
docs/PLAN.md
.github/workflows/ci.yml
wrangler.jsonc / vite.config.ts / vitest.config.ts
tsconfig*.json / worker-configuration.d.ts
```

## 环境与密钥

第一阶段没有 D1/R2 绑定和 Secret，**不要填写虚假的资源 ID**。`.dev.vars.example` 说明本地密钥位置；`.dev.vars`、`.env*`、构建输出与临时工具均已忽略。浏览器 `VITE_` 变量公开可见，严禁存放服务端密钥。

开发运行本地 Workers；生产需另行授权部署。下一阶段分别创建开发/生产绑定与环境配置，不能复用生产数据做本地测试。当前健康检查和只读预览不依赖任何云端资源。

以下命令是**后续配置参考，本阶段不执行**。实际账号资源创建、生产 Migration 与部署必须另行授权。没有 SQL Migration 时不要运行迁移命令。

```sh
# 后续经授权创建资源，使用返回的真实 ID 配置 wrangler.jsonc 的 DB / IMAGES 绑定
npx wrangler d1 create hfut-food-review-dev
npx wrangler r2 bucket create hfut-food-review-images-dev
# DB: { binding: "DB", database_name: "...", database_id: "真实 ID", migrations_dir: "migrations" }
# R2: { binding: "IMAGES", bucket_name: "实际 bucket 名" }
npx wrangler d1 migrations apply DB --local
# 有真实的本地测试 Seed 文件后才执行：
npx wrangler d1 execute DB --local --file=seeds/development.sql
```

生产环境使用独立数据库和桶，显式指定 `--env production`（配置完成后），远程迁移额外使用 `--remote`。禁止在 CI 导入 Seed 或用开发数据覆盖线上。未来邮件服务密钥通过 `wrangler secret put` 注入；不应写进配置或 Git。

## 构建、CI 与部署

GitHub Actions 仅执行 npm ci、类型检查、测试和构建，无 Cloudflare 令牌，无自动部署。公开 GitHub 仓库与 Cloudflare 只读测试预览站已创建；后续推送代码不会自动部署。

`npm run deploy` 会先构建，再部署 Cloudflare 插件生成的配置；这是**手动、需明确授权的生产操作**，本阶段不执行。正式上线前应先完成 [开发计划](docs/PLAN.md) 的认证、数据库、审核、备份、隐私与运营门槛。生成输出目录为 `dist/client` 与 `dist/hfut_food_review`，以实际构建输出为准。

## 排障与限制

- Node 版本过旧：按 `.node-version` 安装 Node 24，重跑 npm ci。
- 找不到 npm：安装正常 Node.js 发行版；本次环境用 `.tools` 内临时 npm 完成开发，该目录不提交，常规开发无需它。
- 依赖下载失败：检查代理与 npm registry 网络，不通过修改源代码规避网络问题。
- 端口被占用：`npm run dev -- --port 5174`；Wrangler 可追加 `--port 8788`。
- Windows 重新构建提示 dist 权限不足：先停止正在运行的 Wrangler 预览，再执行构建；预览可能锁住输出目录中的本地状态文件。
- API 返回 HTML：确认启动的是本项目 Cloudflare Vite 插件或构建后 Wrangler，而不是纯静态服务器；检查 `run_worker_first`。
- Wrangler types 产生配置类型后应提交；修改绑定后重新生成。
- 画像无法保存：浏览器隐私策略可能限制 localStorage；页面会提示失败。只对当前浏览器有效，没有跨设备同步。
- CSP 响应头由静态资源 `_headers` 提供；开发服务器的响应头可能不同，以构建后 Wrangler 验证为准。
- 尚未验证微信内置浏览器、校园网或移动网络实际可达性，正式推广前必须实测；业务/API/数据层解耦便于未来迁移。

完整后续安排见 [docs/PLAN.md](docs/PLAN.md)。
