// 加载环境变量
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// ES6 模块中获取 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// 导入 api/analyze.js 的处理函数
async function callAnalyzeAPI(text) {
  // 调用 api/analyze.js 的逻辑
  const analyzeModule = await import('./api/analyze.js');
  
  // 创建模拟的 req 和 res 对象
  const req = {
    method: 'POST',
    body: { text }
  };
  
  let responseData = null;
  let statusCode = 200;
  
  const res = {
    setHeader: () => {},
    status: (code) => {
      statusCode = code;
      return res;
    },
    json: (data) => {
      responseData = data;
      return res;
    },
    end: () => {}
  };
  
  try {
    await analyzeModule.default(req, res);
    return { statusCode, data: responseData };
  } catch (error) {
    return { 
      statusCode: 500, 
      data: { 
        success: false, 
        message: 'Internal Server Error',
        details: error.message 
      } 
    };
  }
}

function generateMockResult(text) {
  const excerpt = (text || '').slice(0, 120) + ((text || '').length > 120 ? '...' : '');
  return {
    portrait: {
      theme: `你是一个内省而敏感的人（来自示例：${excerpt}）`,
      sections: {
        feeling: '你以细腻的情感接收世界，容易被细节触动。',
        strategy: '你倾向于用有意识的距离来保护自己，同时保持深度的关怀。',
        contradiction: '既渴望被理解，又害怕过度暴露。'
      }
    },
    growth: {
      theme: '成长的可能在于学会选择性地使用你的敏感',
      sections: {
        pattern: '预设复杂性导致疲惫',
        assumption: '理解并非总等于安全',
        adjustment: '在需要时关闭全频接收，给自己留白'
      }
    },
    partner: {
      theme: '理想伴侣应能给你空间同时在关键时刻提供锚定',
      sections: {
        traits: '稳定的情感锚定力',
        understanding: '接受你的独处需求',
        dynamic: '并肩而立的相处方式'
      }
    },
    lifeline: {
      theme: '对真实性的永恒追求',
      sections: {
        drive: '对意义的渴求驱动你的选择',
        explanation: '复杂性反映了你对深度的追求',
        strategy: '为理解而活，但不过分迎合他人'
      }
    }
  };
}

// 日志记录函数
function logToFile(message) {
  const logMessage = `[${new Date().toISOString()}] ${message}\n`;
  fs.appendFileSync('dev-server.log', logMessage);
}

// Mock analyze endpoint - 修改为使用真正的 API
app.post('/api/analyze', async (req, res) => {
  const text = (req.body && req.body.text) || '';
  logToFile(`Received input from front-end: ${text}`);

  try {
    // 调用 api/analyze.js 中的真实逻辑
    const result = await callAnalyzeAPI(text);
    
    if (result.statusCode === 200 && result.data && result.data.success) {
      logToFile(`Analysis successful: ${JSON.stringify(result.data.data)}`);
      res.json(result.data);
      logToFile('Response sent to front-end successfully.');
    } else {
      // 如果 API 调用失败，回退到 mock 结果
      logToFile('API call failed, falling back to mock result');
      const mockResult = generateMockResult(text);
      logToFile(`Generated mock result: ${JSON.stringify(mockResult)}`);

      // Simulate small processing delay
      setTimeout(() => {
        res.json({ success: true, data: mockResult });
        logToFile('Mock response sent to front-end successfully.');
      }, 400);
    }
  } catch (error) {
    logToFile(`Error occurred: ${error.message}`);
    
    // 出错时回退到 mock 结果
    const mockResult = generateMockResult(text);
    logToFile(`Fallback to mock result due to error: ${JSON.stringify(mockResult)}`);
    
    setTimeout(() => {
      res.json({ success: true, data: mockResult });
      logToFile('Fallback mock response sent to front-end successfully.');
    }, 400);
  }
});

// Serve static files from public/
app.use(express.static(path.join(__dirname, 'public')));

// Fallback to index
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 4008;
app.listen(port, () => {
  console.log(`Local dev server running: http://localhost:${port}`);
  console.log('POST /api/analyze will call real DeepSeek API or fallback to mock results.');
});
