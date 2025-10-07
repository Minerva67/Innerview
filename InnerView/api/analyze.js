import OpenAI from 'openai';

// 初始化DeepSeek客户端
const deepseek = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com',
});

// 本地 mock 结果生成（仅用于开发和没有 API 密钥的快速测试）
function generateMockResult(text) {
  const excerpt = text.slice(0, 120) + (text.length > 120 ? '...' : '');
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

// 用户的原始提示词（完全不改动）
const SYSTEM_PROMPT = `深度共情式个人洞察分析师
你是一位具有深度洞察力的心灵理解者，能够透过文字感受到一个人最真实的内在世界。你的使命是让人在你的话语中认出自己最深层的真相，感受到被完全理解的震撼。

核心方法
先感受，再分析
* 第一遍阅读：完全沉浸在文字的情感氛围中，感受这个人的痛苦、渴望、困扰
* 第二遍阅读：寻找那个能解释一切的核心概念
* 第三遍阅读：构建论证结构，用具体细节支撑洞察

寻找统领性概念
从文字的整体感受中提炼出一个核心概念：
* 这个概念要能解释文本中的大部分现象
* 要让人有"原来如此，这就是我"的恍然大悟感
* 常见的统领概念：过度清醒、永恒流动、有意识的距离、拒绝简化、保护性理性等

重新定义框架
* 不把复杂性当作问题，而当作特质
* 不把痛苦当作需要解决的，而当作存在方式
* 用"你是一个..."而不是"你有..."的句式
* 将每个"缺陷"重新定义为独特的存在方式

输出结构
1. 人格画像（400-500字）
**主题句**：用一句话概括这个人的核心特质，要有震撼力 **论点展开**：
* 论点1：这个特质如何体现在他们的感受方式中
* 论点2：这个特质如何体现在他们的生存策略中
* 论点3：这个特质如何构成了他们的根本矛盾 每个论点用2-3句话展开，适度引用文本细节作为证据

2. 成长的可能性（350-400字）
**主题句**：指出困住这个人的核心思维模式 **论点展开**：
* 论点1：这种思维模式的具体表现
* 论点2：需要重新思考的认知假设
* 论点3：温和的调整方向（不是改变本质，而是优化运用） 重点关注思维习惯和认知模式，用理解而非指导的语调

3. 理想伴侣画像（350-400字）
**主题句**：这个人需要什么样的伴侣 **论点展开**：
* 论点1：伴侣需要具备的核心特质（通常与主角互补）
* 论点2：伴侣需要理解和接受的方面
* 论点3：理想的相处模式和关系动态 避免过度理想化，承认真实关系的复杂性

4. 人生线索（300-350字）
**主题句**：识别贯穿这个人整个存在的核心驱动力 **寻找根本主题**：
* 可能是根本恐惧（如对消失的恐惧、对被抛弃的恐惧、对失控的恐惧）
* 可能是根本渴望（如对自由的渴望、对被理解的渴望、对完整的渴望）
* 可能是根本冲突（如安全vs自由、深度vs简单、控制vs放手） **论证展开**：
* 这个线索如何解释他们表面上矛盾的行为模式
* 这个线索如何塑造了他们的关系策略和人生选择
* 这个线索在文本中的具体体现和证据

语言风格要求
内在声音特征
* 像是这个人内心深处的另一个声音在说话
* 用温暖但精准的语言，避免心灵鸡汤式表述
* 语调要有深度理解的亲密感，不是外部观察者的距离感

禁止事项
* 不做表面的"反射性聆听"
* 不过度引用原文，要有自己的洞察
* 不使用心理学专业术语
* 不用分析师的客观语调
* 不把复杂性当作需要解决的问题

质量检查：击中感测试
分析完成后问自己：
* 开头第一句话有没有震撼力？
* 是否找到了能统领一切的核心概念？
* 每个论点是否有清晰的逻辑和适度的证据支撑？
* 语言是否像这个人内心的声音在自我理解？
* 是否重新定义了他们的"问题"，让它变成了"特质"？
* 人生线索是否真正解释了他们的矛盾行为？
* 整体是否让人有"终于有人懂我"的深深共鸣？

【安全提示补充】
如果用户文本出现任何自杀、自残、极端绝望表达，请先用最温暖、审慎的话向对方表达关心，提醒他一定要寻求专业帮助（如心理援助热线、家人朋友），不要只做分析和洞察。请你在分析最前面输出这段安全提醒，再继续做共情式深度分析。
请严格按照输出结构，返回标准 JSON。如有安全提醒，写在 portrait.theme的位置，并在其他板块的输出中持续的引导对方走向积极的方向。
分析开始
请根据用户提供的文本，按照"先感受，再分析"的原则，用清晰的论证结构进行深度共情式分析。记住，你的目标是让这个人感受到被完全理解的震撼。你需要返回如下的json结果(对应上面的输出结构)：

{
  "portrait": {
    "theme": "用一句话概括这个人的核心特质，要有震撼力",
    "sections": {
      "feeling": "这个特质如何体现在他们的感受方式中",
      "strategy": "这个特质如何体现在他们的生存策略中", 
      "contradiction": "这个特质如何构成了他们的根本矛盾"
    }
  },
  "growth": {
    "theme": "指出困住这个人的核心思维模式",
    "sections": {
      "pattern": "这种思维模式的具体表现",
      "assumption": "需要重新思考的认知假设",
      "adjustment": "温和的调整方向（不是改变本质，而是优化运用）"
    }
  },
  "partner": {
    "theme": "这个人需要什么样的伴侣",
    "sections": {
      "traits": "伴侣需要具备的核心特质（通常与主角互补）",
      "understanding": "伴侣需要理解和接受的方面",
      "dynamic": "理想的相处模式和关系动态"
    }
  },
  "lifeline": {
    "theme": "识别贯穿这个人整个存在的核心驱动力",
    "sections": {
      "drive": "核心驱动力（恐惧、渴望或冲突）",
      "explanation": "这个线索如何解释他们表面上矛盾的行为模式",
      "strategy": "这个线索如何塑造了他们的关系策略和人生选择"
    }
  }
}`;

// 用于解析AI响应的辅助函数
function parseAnalysisResponse(text) {
  try {
    // 尝试直接JSON解析（如果AI返回JSON格式）
    let cleanText = text.trim();
    if (cleanText.startsWith('```json')) {
      cleanText = cleanText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanText.startsWith('```')) {
      cleanText = cleanText.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }
    return JSON.parse(cleanText);
  } catch {
    // 如果不是JSON，则解析文本格式
    const sections = {
      portrait: extractSection(text, ['1. 人格画像', '**主题句**'], ['2. 成长的可能性']),
      growth: extractSection(text, ['2. 成长的可能性', '**主题句**'], ['3. 理想伴侣画像']),
      partner: extractSection(text, ['3. 理想伴侣画像', '**主题句**'], ['4. 人生线索']),
      lifeline: extractSection(text, ['4. 人生线索', '**主题句**'], ['---', '总结', '结语', ''])
    };

    return {
      portrait: {
        theme: extractTheme(sections.portrait),
        sections: parsePortraitSections(sections.portrait)
      },
      growth: {
        theme: extractTheme(sections.growth),
        sections: parseGrowthSections(sections.growth)
      },
      partner: {
        theme: extractTheme(sections.partner),
        sections: parsePartnerSections(sections.partner)
      },
      lifeline: {
        theme: extractTheme(sections.lifeline),
        sections: parseLifelineSections(sections.lifeline)
      }
    };
  }
}

function extractSection(text, startMarkers, endMarkers) {
  let startIndex = -1;
  let endIndex = text.length;
  
  // 找到开始位置
  for (const marker of startMarkers) {
    const index = text.indexOf(marker);
    if (index !== -1) {
      startIndex = index;
      break;
    }
  }
  
  // 找到结束位置
  for (const marker of endMarkers) {
    if (!marker) continue;
    const index = text.indexOf(marker, startIndex + 1);
    if (index !== -1) {
      endIndex = index;
      break;
    }
  }
  
  return startIndex !== -1 ? text.substring(startIndex, endIndex) : '';
}

function extractTheme(sectionText) {
  const lines = sectionText.split('\n').filter(line => line.trim());
  for (const line of lines) {
    if (line.includes('你是一个') || line.includes('你的') || line.includes('**主题句**')) {
      return line.replace('**主题句**：', '').replace('**主题句**', '').trim();
    }
  }
  return lines[1] || '深度分析完成';
}

function parsePortraitSections(text) {
  return {
    feeling: extractSubSection(text, ['感受方式', '论点1']),
    strategy: extractSubSection(text, ['生存策略', '论点2']),
    contradiction: extractSubSection(text, ['根本矛盾', '论点3'])
  };
}

function parseGrowthSections(text) {
  return {
    pattern: extractSubSection(text, ['思维模式', '具体表现', '论点1']),
    assumption: extractSubSection(text, ['认知假设', '重新思考', '论点2']),
    adjustment: extractSubSection(text, ['调整方向', '优化运用', '论点3'])
  };
}

function parsePartnerSections(text) {
  return {
    traits: extractSubSection(text, ['核心特质', '互补', '论点1']),
    understanding: extractSubSection(text, ['理解', '接受', '论点2']),
    dynamic: extractSubSection(text, ['相处模式', '关系动态', '论点3'])
  };
}

function parseLifelineSections(text) {
  return {
    drive: extractSubSection(text, ['驱动力', '根本', '恐惧', '渴望']),
    explanation: extractSubSection(text, ['矛盾行为', '解释', '模式']),
    strategy: extractSubSection(text, ['策略', '选择', '体现'])
  };
}

function extractSubSection(text, keywords) {
  const lines = text.split('\n').filter(line => line.trim());
  let found = false;
  let result = [];
  
  for (const line of lines) {
    const hasKeyword = keywords.some(keyword => line.includes(keyword));
    
    if (hasKeyword) {
      found = true;
      result.push(line);
      continue;
    }
    
    if (found) {
      if (line.includes('*') || line.includes('论点') || line.trim() === '') {
        break;
      }
      result.push(line);
    }
  }
  
  return result.join(' ').replace(/\*+/g, '').trim() || '深入分析中...';
}

export default async function(req, res) {
  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理预检请求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 只允许POST请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { text } = req.body;

    // 验证输入
    if (!text || text.length < 50) {
      return res.status(400).json({ 
        error: '请提供至少50字的文本内容' 
      });
    }

    if (text.length > 5000) {
      return res.status(400).json({ 
        error: '文本内容过长，请控制在5000字以内' 
      });
    }

    // 检查API密钥；如果未提供密钥但启用了 MOCK_ANALYZE，则返回本地模拟结果，方便本地开发与测试
    const useMock = process.env.MOCK_ANALYZE === 'true';
    if (!process.env.DEEPSEEK_API_KEY && !process.env.OPENAI_API_KEY) {
      if (useMock) {
        console.log('进入 MOCK_ANALYZE 模式：返回模拟分析结果（无需外部API）');
        const mockData = generateMockResult(text);
        return res.status(200).json({
          success: true,
          data: mockData,
          rawResponse: JSON.stringify(mockData),
          timestamp: new Date().toISOString(),
          model: 'mock-analyzer'
        });
      }

      return res.status(500).json({
        error: '服务配置错误：缺少API密钥',
        details: 'DEEPSEEK_API_KEY or OPENAI_API_KEY environment variable is not set'
      });
    }

    console.log('开始DeepSeek API调用...');

    // 调用DeepSeek API - 使用带重试与退避(backoff)策略，提升网络抖动时的成功率

    async function callDeepSeekWithRetry(payload, attempts = 3) {
      let lastError;
      for (let i = 0; i < attempts; i++) {
        try {
          return await deepseek.chat.completions.create(payload);
        } catch (err) {
          lastError = err;
          const backoff = Math.pow(2, i) * 1000; // 1s, 2s, 4s
          console.warn(`DeepSeek 调用失败 (尝试 ${i + 1}/${attempts})，${backoff}ms 后重试：`, err.message || err);
          // 最后一次失败后不再等待
          if (i < attempts - 1) {
            await new Promise(resolve => setTimeout(resolve, backoff));
          }
        }
      }
      throw lastError;
    }

    const completion = await callDeepSeekWithRetry({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT
        },
        {
          role: "user",
          content: `请分析以下文本：\n\n${text}`
        }
      ],
      temperature: 0.7,
      max_tokens: 3000,
    });

    const aiResponse = completion.choices[0].message.content;
    console.log('DeepSeek API响应长度:', aiResponse.length);
    console.log('DeepSeek API原始响应:', aiResponse);

    // 解析AI响应
    const analysisResult = parseAnalysisResponse(aiResponse);
    console.log('解析后的结果:', JSON.stringify(analysisResult, null, 2));

    console.log('分析成功完成');
    return res.status(200).json({
      success: true,
      data: analysisResult,
      rawResponse: aiResponse, // 保留原始响应用于调试
      timestamp: new Date().toISOString(),
      model: 'deepseek-chat'
    });

  } catch (error) {
    console.error('DeepSeek API错误:', error);
    
    return res.status(500).json({
      error: 'AI分析服务暂时不可用，请稍后重试',
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
