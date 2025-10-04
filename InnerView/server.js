import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import analyzeHandler from './api/analyze.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// 添加静态文件服务（原来没有）
app.use(express.static(path.join(__dirname, 'public')));

// 保持原有的 API 路由
app.post('/api/analyze', analyzeHandler);

// 添加根路径处理（原来没有）
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 添加 SPA 路由支持（原来没有）
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('语言即世界 server running on port', port);
});
