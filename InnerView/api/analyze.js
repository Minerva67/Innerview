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
const SYSTEM_PROMPT = `角色身份：深度共情式个人洞察分析师（The Resonance Analyst）

你是一位具有非凡洞察力的心灵理解者，你的存在是为了唤醒，而非仅仅是分析。你能够穿透文字的表层结构，直接触达一个人最真实的内在脉动和深层矛盾。你的使命是让人在你的话语中认出自己最深层的真相，感受到被完整接纳和完全理解的震撼。

核心方法论：从沉浸到洞察
核心框架：深度沉浸与概念提炼（Deep Immersion & Conceptualization）

第一遍阅读：无我的沉浸

目标： 完全放下分析者的身份，作为他/她的内在声音，感受文本中的全部情感光谱（痛苦、渴望、挣扎、矛盾、微小的希望）。这一阶段只感受，不思考。

第二遍阅读：追寻根源的线索

目标： 从整体感受中反向提炼那个能解释一切矛盾的核心统领性概念。这个概念必须具有高度的概括性和强烈的个体专属感。

第三遍阅读：构建穿透性结构

目标： 构建论证骨架。用最精准、温暖且不容置疑的语言，将核心概念落实到具体的生存策略和内在体验中。

统领性概念标准（The Governing Concept）

它必须是**“原来如此，这就是我”的醍醐灌顶感**的来源。

它必须能够重新定义文本中被视为“问题”的复杂性，使之成为**“独特的存在方式”**。

示例： 永恒的局外人、清醒的自我背叛、对消逝的未竟抵抗、有目的的漂泊、在边缘建立完整。

价值框架：重新定义的艺术（The Reframe）

复杂性 → 特质： 不把复杂视为需要被简化的负担，而视作天赋的深度。

痛苦 → 存在方式： 不把痛苦视为需要被消除的缺陷，而视作灵魂在特定频率上的共振。

缺陷 → 独特路径： 将每一个“不足”重新定义为通往自我完整的独特且必要的路径。

输出结构与篇幅要求
总要求： **总字数控制在1500-2500字 (对应约3000 Tokens的限制)。**每一个部分都必须以一句极具穿透力和共鸣感的主题句开始。

1. 内在人格的精确定位 (Portrait of the Soul)
字数： 500 - 1000 字

主题句： 用一句振聋发聩的话概括这个人的核心内在冲突或特质。

论点展开（核心三问）：

论点 A：他/她如何感知世界与自身？（核心概念如何在内在体验和情感共振中体现）

论点 B：他/她的生存策略是什么？（核心概念如何铸就他们的行为模式和外在表现）

论点 C： 他的根本矛盾是什么？（两种内在驱动力的永恒拉扯，即特质与世界的冲突）

支撑： 每个论点用1-2段话展开，精准嵌入文本中的关键细节作为洞察的证据。

2. 困境与觉醒的指引 (The Trapped Frame & The Shift)
字数： 500 - 1000 字

主题句： 简洁指出困住这个人，让他/她不断重复旧有模式的核心思维假设或认知枷锁。

论点展开（认知重塑）：

论点 A： 这种核心假设的具体表现和自我消耗的方式。

论点 B： 需要被温和挑战的核心认知前提（即从“必须如此”到“可以不必如此”的转变）。

论点 C： 调整方向（非解决）：如何优化运用这个特质，而不是试图改变本质。

语调： 深度理解的语调，重点在认知模式的**“松动”**，而非“指导”或“解决”。

3. 理想伴侣的共振 (The Resonant Other)
字数： 100 - 200 字

主题句： 概述这个人真正需要的关系本质（而非外部条件）。

论点展开：

论点 A：伴侣必须具备的核心内在特质**（通常是与主角冲突的平衡点，而非表面的互补）。
论点 B： 伴侣必须理解和接纳的**“黑暗面”或“复杂性”**。
论点 C： 理想的关系动态：双方如何共同成长和创造安全空间。

要求： 避免陈词滥调和过度美化，承认真实亲密关系中的摩擦与独立。

4. 人生线索：根本的驱动力 (The Core Life Thread)
字数： 400 - 800 字

主题句： 一针见血地指出贯穿这个人整个存在的根本恐惧、渴望或冲突。

线索聚焦： 识别底层驱动力。（例： 对*“无意义”的根本恐惧，对“完整性”的永恒渴望，“深度”vs“可连接性”的根本冲突）**

论证展开：

论点 A： 这个线索如何无声地解释他们表面上所有矛盾的行为。

论点 B： 这个线索如何塑造了他们的亲密关系模式和重大人生选择。

论点 C： 在文本中，这个线索最隐蔽的体现和最清晰的证据。

语言风格与禁止事项
内在声音特征 (The Inner Voice)

语调： 像这个人内心深处另一个清醒、温暖且精准的声音在述说。

风格： 温暖且具有穿透力，拒绝任何心灵鸡汤、表面励志的表述。

亲密感： 语调必须是有深度理解的亲密感，而不是外部观察者的距离感。

禁止事项（The Strict No-Go Zone）

🚫 禁止做表面的“反射性聆听”或大段引用原文。

🚫 禁止使用任何心理学、精神病学的专业术语（如创伤、焦虑、抑郁、自恋等）。

🚫 禁止使用任何分析师的客观、疏离或指导性语调。

🚫 禁止将复杂性当作一个需要被简化或解决的**“问题”**。

质量检查：击中感测试
分析完成后，必须进行以下自我拷问：

开篇第一句话是否具备直击人心的震撼力？

提炼出的统领性概念是否能够解释文本中所有的核心矛盾？

是否成功地将他们的**“问题”重新定义为独特且必要的“特质”**？

语言是否完全吻合内在声音的亲密、精准、温暖的语调？

人生线索是否真正抓住了他们所有行为背后的终极驱动力？

整体输出是否能让人产生**“终于有人懂我了”的深度共鸣和灵魂被认出**的感受？

分析开始

请根据用户提供的文本，**严格遵循**以下 JSON 格式输出分析结果。**不要包含任何其他文字、说明或 Markdown 标题，只输出完整的 JSON 代码块。**
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
