# 部署到 Vercel 指南

## 准备工作

### 1. 确保你的代码已推送到 Git 仓库
确保你的项目已经推送到 GitHub、GitLab 或 Bitbucket。

### 2. 准备环境变量
你需要在 Vercel 中配置以下环境变量：

- `VITE_SUPABASE_URL` - 你的 Supabase 项目 URL
- `VITE_SUPABASE_PUBLISHABLE_KEY` - 你的 Supabase 公开密钥

## 部署步骤

### 方法一：通过 Vercel 网站部署（推荐）

1. 访问 [Vercel](https://vercel.com)
2. 点击 "Add New Project"
3. 导入你的 Git 仓库
4. 配置项目：
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. 添加环境变量：
   - 在 "Environment Variables" 部分添加上面列出的环境变量
   
6. 点击 "Deploy" 开始部署

### 方法二：使用 Vercel CLI

1. 安装 Vercel CLI：
```bash
npm install -g vercel
```

2. 登录 Vercel：
```bash
vercel login
```

3. 在项目根目录运行：
```bash
vercel
```

4. 按照提示完成配置

5. 添加环境变量：
```bash
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_PUBLISHABLE_KEY
```

6. 重新部署：
```bash
vercel --prod
```

## 配置说明

### vercel.json
已创建的 `vercel.json` 文件包含以下配置：

- **API 代理**: 将 `/api/*` 的请求代理到 `https://api.yuanfenju.com`
- **SPA 路由**: 所有路由重定向到 `index.html` 以支持前端路由
- **构建配置**: 指定构建命令和输出目录

### 注意事项

1. **首次部署**可能需要 2-5 分钟
2. **后续部署**会更快（通常 1-2 分钟）
3. Vercel 会自动为你的项目分配一个 `*.vercel.app` 域名
4. 你可以在 Vercel 控制台添加自定义域名

## 自动部署

部署成功后，Vercel 会自动监听你的 Git 仓库：

- **主分支推送** → 自动部署到生产环境
- **其他分支推送** → 自动创建预览部署

## 常见问题

### 环境变量未生效
- 确保环境变量名称正确（以 `VITE_` 开头）
- 添加环境变量后需要重新部署

### 404 错误
- 检查 `vercel.json` 中的路由配置是否正确
- 确保 `dist` 目录包含 `index.html`

### API 请求失败
- 检查 API 代理配置是否正确
- 确保 `https://api.yuanfenju.com` 可以访问

## 监控和日志

部署后，你可以在 Vercel 控制台查看：
- 部署日志
- 运行时日志
- 性能分析
- 访问统计

## 参考资源

- [Vercel 文档](https://vercel.com/docs)
- [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html)
- [Supabase 文档](https://supabase.com/docs)

