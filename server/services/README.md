# 服务层预留

后续业务规则放在此处；D1 数据访问封装在 repositories 子目录。路由只做输入解析、调用服务与响应转换。认证与权限在 middleware 中统一校验，前端组件通过 src/services 调用 API。
