# InnerView - AI-Powered Self-Insight Platform

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://innerview-app.zeabur.app/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![DeepSeek](https://img.shields.io/badge/LLM-DeepSeek-blue)](https://www.deepseek.com/)

> An LLM-based psychological text analysis platform that reveals cognitive patterns, growth potential, and life themes through advanced prompt engineering.

## 🎯 Overview

InnerView is a full-stack AI application that analyzes user-provided text to generate deep psychological insights across four dimensions:
- **Portrait of the Soul**: Core personality traits and behavioral patterns
- **Growth Potential**: Mental frameworks and cognitive blind spots
- **Ideal Partner**: Relationship compatibility analysis
- **Life Thread**: Fundamental drives and existential themes

Unlike generic personality tests, InnerView uses a sophisticated prompt architecture to provide nuanced, individualized insights that resonate with users' authentic experiences.

## ✨ Key Features

### Advanced Prompt Engineering
- **200+ line system prompt** implementing a three-stage analysis framework
- Multi-dimensional psychological profiling methodology
- Structured JSON output with semantic consistency validation
- Temperature and token optimization for balanced creativity and reliability

### Production-Ready Architecture
- Exponential backoff retry mechanism for API resilience
- Input validation (50-5000 characters)
- CORS-enabled REST API
- Mock mode for development and testing
- Graceful error handling with detailed logging

### User Experience
- Clean, gradient-based UI design
- Responsive layout for mobile and desktop
- Real-time analysis feedback
- Structured insight presentation

## 🏗️ Architecture

```
┌─────────────┐
│   Frontend  │  Vanilla HTML/CSS/JS
│  (Public)   │  - Input collection
└──────┬──────┘  - Results display
       │
       │ HTTP POST /api/analyze
       │
┌──────▼──────┐
│   Express   │  Node.js Server
│   Server    │  - Request validation
└──────┬──────┘  - CORS handling
       │
       │ JSON payload
       │
┌──────▼──────┐
│   Analyze   │  Core Logic
│   Handler   │  - Prompt construction
└──────┬──────┘  - Response parsing
       │
       │ Chat completion
       │
┌──────▼──────┐
│  DeepSeek   │  LLM API
│     API     │  - deepseek-chat model
└─────────────┘  - Structured JSON output
```

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Backend** | Node.js + Express | REST API server |
| **Frontend** | HTML/CSS/JavaScript | User interface |
| **LLM** | DeepSeek API | Text analysis engine |
| **AI Framework** | OpenAI SDK | API client (DeepSeek-compatible) |
| **Deployment** | Zeabur | Cloud hosting |

## 📦 Installation

### Prerequisites
- Node.js 18+
- DeepSeek API key (or OpenAI-compatible API)

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/Minerva67/Innerview.git
cd Innerview/InnerView
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
# Create .env file
echo "DEEPSEEK_API_KEY=your_api_key_here" > .env
```

4. **Run development server**
```bash
# With real API
npm run dev:local

# With mock data (no API key needed)
npm run dev:mock
```

5. **Access the application**
```
http://localhost:3000
```

## 🚀 Deployment

The application is deployed on Zeabur with automatic HTTPS and continuous deployment:

```bash
# Production build
npm start
```

Environment variables required:
- `DEEPSEEK_API_KEY`: Your DeepSeek API key
- `PORT`: Server port (default: 3000)

## 🧠 Prompt Engineering Methodology

The core innovation of InnerView lies in its prompt design:

### Three-Stage Analysis Framework

1. **Immersion Stage**
   - Emotional resonance without premature analysis
   - Full-spectrum sentiment absorption

2. **Conceptualization Stage**
   - Extraction of governing concepts
   - Root cause identification for contradictory patterns

3. **Structural Construction Stage**
   - Evidence-based argumentation
   - Reframing complexity as uniqueness

### Output Structure
Each analysis dimension follows a consistent pattern:
```json
{
  "theme": "One-sentence core insight with emotional impact",
  "sections": {
    "aspect1": "Detailed exploration of dimension 1",
    "aspect2": "Detailed exploration of dimension 2",
    "aspect3": "Detailed exploration of dimension 3"
  }
}
```

### Quality Assurance
- Minimum 2500 words per analysis
- Avoidance of clinical terminology
- Emphasis on authentic voice over analytical distance
- Reframing deficits as distinctive traits

## 📊 API Reference

### POST `/api/analyze`

Analyzes user-provided text and returns structured insights.

**Request Body:**
```json
{
  "text": "User's text content (50-5000 characters)"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "portrait": { "theme": "...", "sections": {...} },
    "growth": { "theme": "...", "sections": {...} },
    "partner": { "theme": "...", "sections": {...} },
    "lifeline": { "theme": "...", "sections": {...} }
  },
  "rawResponse": "Original LLM output",
  "timestamp": "2025-01-15T10:30:00.000Z",
  "model": "deepseek-chat"
}
```

**Error Handling:**
- `400`: Invalid input (length requirements)
- `500`: API failure or configuration error
- Automatic retry with exponential backoff (3 attempts)

## 🔧 Development

### Project Structure
```
InnerView/
├── api/
│   └── analyze.js       # Core analysis logic + prompt
├── public/
│   ├── index.html       # Landing page
│   ├── input.html       # Text input interface
│   ├── results.html     # Results display
│   └── style.css        # Styling
├── server.js            # Express server
├── package.json         # Dependencies
└── README.md
```

### Mock Mode
For rapid development without API costs:
```bash
MOCK_ANALYZE=true npm run dev:mock
```

### Adding New Analysis Dimensions
1. Update `SYSTEM_PROMPT` in `api/analyze.js`
2. Modify JSON schema in prompt
3. Update `parseAnalysisResponse()` function
4. Add frontend display in `results.html`

## 🎓 Learning Outcomes

This project demonstrates:
- **Product thinking**: Translating psychological insights into user value
- **Prompt engineering**: Crafting complex, multi-stage LLM instructions
- **Full-stack development**: End-to-end implementation from API to UI
- **Production considerations**: Error handling, retries, validation
- **LLM application design**: Structured output, quality control, cost optimization

## 🔮 Future Enhancements

- [ ] Multi-language support
- [ ] User authentication and history
- [ ] Export to PDF functionality
- [ ] A/B testing of prompt variations
- [ ] Fine-tuned model for domain-specific insights
- [ ] Real-time streaming responses
- [ ] Comparative analysis across multiple texts

## 📝 License

MIT License - Feel free to use this project for learning and development.

## 👤 Author

Built with AI-assisted development (Cursor/Claude) while focusing on product design, prompt architecture, and system integration.

**Connect with me:**
- GitHub: [@Minerva67](https://github.com/Minerva67)
- Live Demo: [innerview-app.zeabur.app](https://innerview-app.zeabur.app/)

---

⭐ If you find this project interesting, please consider starring it!
