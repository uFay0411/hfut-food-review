# GitHub 与 Cloudflare 测试预览接入

本项目使用公开 GitHub 源码仓库和 Cloudflare Workers Static Assets。公开测试站只展示标注过的模拟数据；不开放评价、认证、管理或上传写入。数据库和 R2 留待下一阶段单独配置。

## 当前接入结果（2026-10-29）

- 公开仓库：https://github.com/uFay0411/hfut-food-review
- 测试预览：https://hfut-food-review.ufay0411.workers.dev
- Worker：`hfut-food-review`
- 首次部署版本：`5d267160-5f8e-45c8-b76a-e6cc688a84e2`
- 部署方式：本机 Wrangler OAuth 手动发布；未创建 D1/R2、未更改套餐。
- 自动化：GitHub Actions 仅检查与构建；未开启 Cloudflare Workers Builds 自动发布。

## 认证与代码发布

GitHub 使用官方 CLI 设备登录，Cloudflare 使用本机 Wrangler OAuth。凭据由相应工具保存在本机，不进入 Git，不要求在聊天中提供 Token。`.tools` 是开发环境临时工具目录，不提交。

发布前检查 `git status` 和暂存文件，排除 `.dev.vars`、`.env*`、密钥文件、node_modules、dist 与本地 Wrangler 状态。仓库名称为 `hfut-food-review`。

## 本地检查与手动部署

```sh
npm ci
npm run cf-typegen
npm test
npm run build
npm run deploy
```

`npm run deploy` 将本次构建发布到 Wrangler 中指定的 Worker；只有在用户授权发布后执行。GitHub Actions 目前只检查与构建，不自动推送上线，不持有 Cloudflare Token。

如果以后需要 Cloudflare Workers Builds 自动连接 GitHub，须单独确认自动发布范围，在 Cloudflare 控制台授权指定仓库并设置构建和部署命令。不要同时开启两条自动部署链路。可参考 [Cloudflare GitHub integration](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/github-integration/)。

## 部署后验证

以 Wrangler 实际返回的 URL 为准，不能根据账户或项目名称臆造地址。检查首页、详情深链刷新、图片、手机布局、健康接口、未知 API 的 JSON 404，以及写入接口的 JSON 403。核对 GitHub 远程文件和首个 CI 运行结果。

测试站可公开访问不代表具备真实运营条件。邮箱服务、隐私流程、审核、数据库、备份恢复和校园网实测仍须按 `PLAN.md` 完成。

## 本机网络排障

本次环境浏览器使用现有本机代理。CLI 不一定自动继承 Windows 系统代理；遇到连接失败时，可仅给当前进程设置 `HTTPS_PROXY`/`HTTP_PROXY`，不要将本机代理地址写进项目部署配置。

代理存在 TLS 兼容问题时，可尝试在当前 Node 进程中设置 `NODE_OPTIONS=--tls-max-v1.2`，证书校验仍须开启。若请求持续被重置，应先恢复代理连通性，不能将“已登录”或“构建成功”当成部署成功。
