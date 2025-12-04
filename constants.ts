import React from 'react';
import { ThemeType, ThemeConfig, AIBrand } from './types';
import { Bot, Cpu, Sparkles, BrainCircuit, Infinity } from 'lucide-react';

export const THEMES: Record<ThemeType, ThemeConfig> = {
  [ThemeType.LIGHT]: {
    id: ThemeType.LIGHT,
    name: 'Minimal Light',
    backgroundClass: 'bg-slate-100',
    paperClass: 'bg-white shadow-sm border border-slate-200',
    textClass: 'text-slate-800',
    accentClass: 'border-slate-200'
  },
  [ThemeType.DARK]: {
    id: ThemeType.DARK,
    name: 'Developer Dark',
    backgroundClass: 'bg-slate-900',
    paperClass: 'bg-slate-800 shadow-xl border border-slate-700',
    textClass: 'text-slate-100',
    accentClass: 'border-slate-600'
  },
  [ThemeType.MIDNIGHT]: {
    id: ThemeType.MIDNIGHT,
    name: 'Midnight Blue',
    backgroundClass: 'bg-gradient-to-br from-indigo-900 to-slate-900',
    paperClass: 'bg-indigo-950/80 backdrop-blur-md shadow-2xl border border-indigo-500/30',
    textClass: 'text-indigo-50',
    accentClass: 'border-indigo-500/50'
  },
  [ThemeType.NATURE]: {
    id: ThemeType.NATURE,
    name: 'Sage Garden',
    backgroundClass: 'bg-stone-200',
    paperClass: 'bg-[#fdfbf7] shadow-lg border border-stone-200',
    textClass: 'text-stone-800',
    accentClass: 'border-stone-300'
  },
  [ThemeType.SUNSET]: {
    id: ThemeType.SUNSET,
    name: 'Sunset Gradient',
    backgroundClass: 'bg-gradient-to-r from-orange-100 to-rose-100',
    paperClass: 'bg-white/90 backdrop-blur shadow-xl border border-rose-100',
    textClass: 'text-slate-800',
    accentClass: 'border-rose-200'
  }
};

export const AI_BRANDS: AIBrand[] = [
  {
    id: 'none',
    name: '无水印',
    icon: null
  },
  {
    id: 'gemini',
    name: 'Gemini',
    icon: React.createElement(Sparkles, { size: 18 })
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    icon: React.createElement(Bot, { size: 18 })
  },
  {
    id: 'claude',
    name: 'Claude',
    icon: React.createElement(Cpu, { size: 18 })
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    icon: React.createElement(BrainCircuit, { size: 18 })
  },
  {
    id: 'llama',
    name: 'Llama',
    icon: React.createElement(Infinity, { size: 18 })
  }
];

export const DEFAULT_MARKDOWN = `# 欢迎使用 AI分享助手 📸

在此粘贴您的 **Markdown** 内容，将其转换为精美的图片以便分享。

## 为什么使用它？
1. **保留格式**：分享时不再出现表格或代码块错乱的问题。
2. **美观主题**：选择适合您心情的样式。
3. **AI 品牌**：支持添加常见 AI 模型的水印。

### 代码示例
\`\`\`javascript
const sayHello = (name) => {
  console.log(\`你好, \${name}!\`);
};
\`\`\`

### 比较表

| 功能 | 纯文本 | AI分享助手 |
| :--- | :---: | :---: |
| 粗体/斜体 | ❌ | ✅ |
| 表格 | ❌ | ✅ |
| 语法高亮 | ❌ | ✅ |

> “设计不仅仅是外观和感觉，设计是它的运作方式。”
`;