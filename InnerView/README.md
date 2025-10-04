# InnerView

“InnerVIew”是一个基于 AI 的深度心理洞察分析平台。用户只需输入自己的真实表达，平台即可通过先进的 AI 模型，生成四大维度的个性化洞察报告，帮助你更好地理解自我。

## 产品特色

- **极简体验**：无需注册，直接输入文字即可获得分析。
- **深度共情**：AI 以“你内心的另一个声音”视角，输出有温度的洞察。
- **多维度报告**：涵盖人格画像、成长可能、理想伴侣、人生线索四大板块。
- **隐私安全**：所有分析均为即时生成，不做数据存储。

## 快速开始

### 本地运行

1. 克隆本仓库：
   ```bash
   git clone <your-repo-url>
   cd InnerView-2
   ```
2. 安装依赖：
   ```bash
   npm install
   ```
3. 配置环境变量：
   在根目录新建 `.env` 文件，内容如下：
   ```env
   DEEPSEEK_API_KEY=你的DeepSeek密钥
   OPENAI_API_KEY=你的OpenAI密钥（可选）
   ```
4. 启动服务：
   ```bash
   npm start
   ```
5. 打开浏览器访问 `http://localhost:3000`

### 云端部署（如 Zeabur/Vercel）

1. 上传代码到你的云平台。
2. 在平台环境变量设置中添加 `DEEPSEEK_API_KEY` 和（可选）`OPENAI_API_KEY`。
3. 启动命令填写 `npm start`。
4. 访问分配的域名即可。

## 目录结构

```
├── api/                # API 路由（Express handler）
│   └── analyze.js      # 主要分析逻辑
├── public/             # 前端静态页面
│   ├── index.html
│   ├── input.html
│   ├── results.html
│   └── style.css
├── server.js           # Express 启动入口
├── package.json
└── README.md
```

## 主要技术栈
- Node.js + Express
- 原生 HTML/CSS/JS
- DeepSeek API / OpenAI API

## 贡献与反馈

欢迎提出 issue 或 PR，或通过 [Zeabur](https://zeabur.com/) 部署体验。

---
“语言即世界”——用你的表达，照见你的内心。
# 语言即世界 - AI驱动的心理洞察分析平台

## 🌟 项目简介

语言即世界是一个基于AI的深度心理洞察分析平台，通过用户输入的个人文字，利用先进的AI模型进行心理分析，提供四个维度的个性化洞察报告：

- **真实的你** - 深度人格画像解析
- **成长的可能** - 思维模式优化指南  
- **理想的另一半** - 与你互补的灵魂画像
- **人生线索** - 贯穿你存在的核心驱动力

## 🏗️ 技术架构

- **前端**: 纯HTML/CSS/JavaScript，响应式设计
- **后端**: Vercel Serverless Functions (Node.js)
- **AI服务**: OpenAI GPT-4 API
- **部署**: Vercel云平台

## 📁 项目结构

```
heart-mirror/
├── public/
│   ├── index.html          # 首页
│   ├── input.html          # 输入页面
│   ├── results.html        # 结果展示页面
│   └── style.css           # 共用样式
├── api/
│   └── analyze.js          # AI分析API
├── package.json            # 项目配置
├── vercel.json            # 部署配置
└── README.md              # 项目说明
```

## 🚀 本地开发

### 1. 克隆项目

```bash
# 创建项目目录
mkdir heart-mirror
cd heart-mirror

# 初始化项目
npm init -y
```

### 2. 安装依赖

```bash
npm install openai@^4.20.0
npm install -D vercel@^48.0.0
```

### 3. 配置环境变量

创建 `.env.local` 文件：

```env
OPENAI_API_KEY=your_openai_api_key_here
```

如果你使用的是 DeepSeek（替代 OpenAI），可以把 `DEEPSEEK_API_KEY` 写入 `.env.local`：

```env
DEEPSEEK_API_KEY=your_deepseek_api_key_here
```

安全地在本地写入 `.env.local`（在你的机器上运行，不会把密钥提交到仓库）：

```bash
# 把 <your_key> 换成你的 DeepSeek 密钥并在终端执行（macOS / Linux）
printf 'DEEPSEEK_API_KEY="%s"\n' "<your_key>" > .env.local && echo 'created .env.local (ensure it is in .gitignore)'
```

### 4. 本地运行

```bash
# 启动开发服务器
npx vercel dev
```

打开浏览器访问 `http://localhost:3000`

## 🌐 部署到Vercel

### 方式一：命令行部署

1. **安装Vercel CLI**
```bash
npm i -g vercel
```

2. **登录Vercel**
```bash
vercel login
```

3. **部署项目**
```bash
vercel
```

4. **配置环境变量**
```bash
vercel env add OPENAI_API_KEY
```

### 方式二：网页界面部署

1. **注册Vercel账号**
   - 访问 [vercel.com](https://vercel.com)
   - 使用GitHub、Google或邮箱注册

2. **上传项目**
   - 点击 "New Project"
   - 选择 "Import" 方式
   - 上传项目文件

3. **配置环境变量**
   - 在项目设置中添加环境变量
   - 变量名：`OPENAI_API_KEY`
   - 变量值：你的OpenAI API密钥

4. **部署完成**
   - 几分钟后获得访问链接
   - 格式：`https://your-project-name.vercel.app`

## 🔑 获取OpenAI API密钥

1. **注册OpenAI账号**
   - 访问 [platform.openai.com](https://platform.openai.com)
   - 创建账号并验证

2. **创建API密钥**
   - 进入API Keys页面
   - 点击"Create new secret key"
   - 复制并保存密钥（只显示一次）

3. **充值账户**
   - 至少充值$5用于API调用
   - GPT-4调用成本约为$0.03/1K tokens

## 🛠️ VSCode本地开发设置

### 1. 安装必要插件

- **Live Server** - 本地预览HTML文件
- **Prettier** - 代码格式化
- **Thunder Client** - API测试

### 2. 项目配置

在VSCode中打开项目文件夹后：

1. 按 `Ctrl+Shift+P` 打开命令面板
2. 输入 "Tasks: Configure Task"
3. 选择 "Create tasks.json from template"
4. 添加开发服务器任务

### 3. 调试设置

创建 `.vscode/launch.json`：

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Launch Chrome",
            "request": "launch",
            "type": "chrome",
            "url": "http://localhost:3000",
            "webRoot": "${workspaceFolder}/public"
        }
    ]
}
```

## 🔧 常见问题

### Q: API调用失败怎么办？

**A:** 检查以下几点：
- OpenAI API密钥是否正确设置
- 账户余额是否充足
- 网络连接是否正常
- 查看浏览器控制台的错误信息

### Q: 本地开发时无法访问API？

**A:** 确保：
- 使用 `npx vercel dev` 而不是Live Server
- 环境变量正确配置在 `.env.local` 文件中
- API路径正确（`/api/analyze`）

### Q: 部署后页面显示404？

**A:** 检查：
- `vercel.json` 配置是否正确
- 文件是否在 `public` 目录下
- 路由配置是否匹配文件结构

### Q: AI分析结果格式异常？

**A:** 可能原因：
- 输入文本过短或质量低
- AI服务暂时不稳定
- 提示词需要优化

## 🎨 自定义配置

### 修改分析提示词

编辑 `api/analyze.js` 中的 `SYSTEM_PROMPT` 变量：

```javascript
const SYSTEM_PROMPT = `你的自定义提示词...`;
```

## 🔐 使用 `.env.local.example` 管理本地密钥（推荐）

项目根目录已添加一个 `.env.local.example` 文件，包含了常用环境变量的占位符（例如 `DEEPSEEK_API_KEY` / `OPENAI_API_KEY`）。推荐的做法：

1. 复制示例为本地文件：

```bash
cp .env.local.example .env.local
```

2. 编辑 `.env.local`，在等号后粘贴你的真实密钥（仅在本机保存）：

```env
DEEPSEEK_API_KEY=你的真实_key_放这里
# 或者
OPENAI_API_KEY=你的_openai_key_放这里
```

3. 确保 `.env.local` 被忽略（不要提交到 Git 仓库）。通常仓库会把 `.env*` 添加到 `.gitignore`。

4. 启动本地开发：

```bash
npm run dev
```

这样你就可以在本地测试真实的 AI 调用而不把密钥暴露到仓库中。


### 修改页面样式

编辑 `public/style.css` 文件，主要变量：

```css
:root {
  --primary-color: #FF8C42;
  --secondary-color: #9BADBA;
  --text-color: #1A1F36;
  --background-color: #FAFBFC;
}
```

### 添加新功能

1. **前端**: 修改HTML和JavaScript
2. **后端**: 在 `api/` 目录添加新的函数
3. **样式**: 更新CSS文件

## 📊 性能优化

### 前端优化

- 使用CSS动画而非JavaScript动画
- 图片懒加载和压缩
- 代码分割和按需加载

### 后端优化

- API响应缓存
- 错误重试机制
- 请求限流保护

### 部署优化

- 启用Gzip压缩
- CDN加速
- 监控和日志记录

## 🔒 安全考虑

- API密钥安全存储
- 输入内容验证和过滤
- 用户隐私保护
- HTTPS强制使用

## 📈 扩展建议

### 功能扩展

- 用户账户系统
- 历史分析记录
- PDF报告生成
- 社交分享功能

### 技术升级

- React/Vue框架重构
- 数据库集成
- 实时分析功能
- 多语言支持

## 📄 许可证

MIT License - 详见 LICENSE 文件

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进项目！

---

**需要帮助？** 请创建Issue或联系项目维护者。

## 本地调试：快速排错（含 MOCK 模式）

当你在本地运行时看到“分析服务暂时不可用，请检查网络连接后重试”这类错误，常见原因是后端无法调用外部AI服务（缺少API Key或网络问题）。以下步骤可以帮助快速定位并解决问题：

1. 启用 MOCK 模式（本地模拟分析结果，适用于开发与界面调试）：

```bash
# 使用 npm script 启动 mock 模式
npm run dev:mock
```

启动后访问 http://localhost:3000，提交文本应返回模拟的分析结果并跳转到结果页。如果 MOCK 模式工作，则说明前端与 serverless 函数通信正常，问题在于真实的AI服务调用（API Key / 网络）。

2. 如果你希望使用真实AI服务，请确认环境变量已正确设置：

- 在项目根创建 `.env.local`，并写入密钥：

```env
DEEPSEEK_API_KEY=your_deepseek_key_here
# 或者
OPENAI_API_KEY=your_openai_key_here
```

- 然后用 `npx vercel dev` 启动本地开发服务器（或使用 `npm run dev`）：

```bash
npx vercel dev
```

3. 查看浏览器控制台与终端日志：

- 前端会在捕获错误时显示后端返回的详细错误信息（如果后端返回了 JSON 错误体）。这会帮助你看到是 500（服务内部错误）还是 400（请求无效）等。
- 后端日志（终端）会打印调用 DeepSeek/OpenAI 的错误堆栈，检查 `DEEPSEEK_API_KEY` 或 `OPENAI_API_KEY` 是否为空，以及网络请求是否超时。

4. 常见修复
- 若是缺少 API Key：在 Vercel 仪表盘或 `.env.local` 中设置对应变量。
- 若是配额或余额问题：登录 OpenAI/DeepSeek 控制台检查配额与计费。
- 若是网络问题：确认能从本机向外网发起 HTTPS 请求，或暂时使用 MOCK 模式继续前端开发。

如果需要，我可以帮你：检查日志、改进错误提示，或把 mock 模式改为在前端可切换的模式（按钮切换）。