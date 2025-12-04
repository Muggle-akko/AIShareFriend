import React, { useState, useRef, useCallback } from 'react';
import { toPng } from 'html-to-image';
import { 
  LayoutTemplate, 
  Github, 
  Image as ImageIcon,
  Loader2,
  Edit3,
  Eye,
  Bot
} from 'lucide-react';
import MarkdownPreview from './components/MarkdownPreview';
import { THEMES, DEFAULT_MARKDOWN, AI_BRANDS } from './constants';
import { ThemeType } from './types';

const App: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>(DEFAULT_MARKDOWN);
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(ThemeType.LIGHT);
  const [currentBrandId, setCurrentBrandId] = useState<string>('none');
  const [title, setTitle] = useState<string>('代码片段');
  const [author, setAuthor] = useState<string>('');
  
  // Mobile Tab State
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor');
  
  // States for async actions
  const [isExporting, setIsExporting] = useState(false);

  const previewRef = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(async () => {
    if (previewRef.current === null) return;
    setIsExporting(true);

    try {
      // Small delay to ensure rendering is complete
      await new Promise(resolve => setTimeout(resolve, 200));

      const dataUrl = await toPng(previewRef.current, {
        cacheBust: true,
        pixelRatio: 3, // High resolution
        quality: 1.0
      });

      const link = document.createElement('a');
      link.download = `ai-share-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to generate image', err);
      alert('生成图片失败，请重试。');
    } finally {
      setIsExporting(false);
    }
  }, []);

  const handlePasteReplace = async () => {
    try {
      // Ensure window is focused for clipboard access
      window.focus();
      const text = await navigator.clipboard.readText();
      if (text) {
        setMarkdown(text);
      } else {
        alert('剪贴板为空，请先复制内容。');
      }
    } catch (err) {
      console.error('Failed to read clipboard', err);
      alert('无法访问剪贴板。请允许浏览器访问剪贴板，或使用快捷键 Ctrl+V 手动粘贴。');
    }
  };

  const currentBrand = AI_BRANDS.find(b => b.id === currentBrandId);

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">
      {/* Header / Navbar */}
      <header className="h-14 md:h-16 border-b border-gray-200 flex items-center justify-between px-4 md:px-6 bg-white z-20 shrink-0 shadow-sm relative">
        <div className="flex items-center gap-2.5">
          <div className="bg-gradient-to-br from-brand-500 to-brand-600 text-white p-1.5 md:p-2 rounded-lg shadow-sm">
            <ImageIcon size={20} className="md:w-5 md:h-5 w-4 h-4" />
          </div>
          <h1 className="font-bold text-lg md:text-xl text-gray-800 tracking-tight">AI分享助手</h1>
        </div>
        
        <div className="flex items-center gap-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer"
              className="hidden md:flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Github size={18} />
              <span>GitHub</span>
            </a>
            <div className="h-5 w-px bg-gray-200 hidden md:block"></div>
            
            {/* Desktop Export Button (Text Only) */}
            <button 
              onClick={handleDownload}
              disabled={isExporting}
              className="hidden md:flex items-center justify-center min-w-[80px] px-5 py-2 bg-brand-600 text-white text-sm font-medium rounded-lg hover:bg-brand-700 active:scale-95 transition-all shadow-sm disabled:opacity-70 disabled:scale-100"
            >
              {isExporting ? <Loader2 size={16} className="animate-spin"/> : <span>导出图片</span>}
            </button>

             {/* Mobile Export Button (Text Only) */}
             <button 
              onClick={handleDownload}
              disabled={isExporting}
              className="md:hidden text-sm font-medium text-brand-600"
            >
              {isExporting ? '生成中...' : '导出'}
            </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        
        {/* Left: Editor Panel */}
        <div className={`w-full md:w-1/2 flex flex-col border-r border-gray-200 bg-gray-50/50 h-full absolute md:relative z-10 transition-transform duration-300 ease-in-out ${mobileTab === 'editor' ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
          {/* Editor Toolbar */}
          <div className="p-3 border-b border-gray-200 bg-white/80 backdrop-blur-sm flex justify-between items-center shrink-0 sticky top-0 z-10">
             <span className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">Markdown 输入</span>
             <div className="flex gap-2">
                <button 
                  onClick={() => setMarkdown('')}
                  className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all"
                  title="清空内容"
                >
                  清空
                </button>
                <button 
                  onClick={handlePasteReplace}
                  className="px-3 py-1.5 text-xs font-medium text-white bg-gray-800 border border-gray-800 rounded hover:bg-gray-700 transition-all shadow-sm"
                  title="清空现有内容并粘贴剪贴板文本"
                >
                  清空并粘贴
                </button>
             </div>
          </div>
          
          {/* Text Area */}
          <textarea
            className="flex-1 w-full p-6 bg-transparent resize-none outline-none font-mono text-base leading-relaxed text-gray-800 selection:bg-brand-100 placeholder-gray-400"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="在此输入或粘贴 Markdown 内容..."
            spellCheck={false}
          />
        </div>

        {/* Right: Preview & Settings Panel */}
        <div className={`w-full md:w-1/2 flex flex-col bg-gray-100 h-full absolute md:relative z-10 transition-transform duration-300 ease-in-out ${mobileTab === 'preview' ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}`}>
          
          {/* Preview Toolbar */}
          <div className="p-3 border-b border-gray-200 bg-white/80 backdrop-blur-sm flex flex-wrap gap-4 justify-between items-center z-10 shadow-sm shrink-0 sticky top-0">
            <div className="flex items-center gap-4 overflow-x-auto no-scrollbar w-full md:w-auto">
              
              {/* Theme Selector */}
              <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg shrink-0">
                <LayoutTemplate size={16} className="text-gray-500" />
                <select 
                  value={currentTheme}
                  onChange={(e) => setCurrentTheme(e.target.value as ThemeType)}
                  className="text-sm border-none bg-transparent focus:ring-0 cursor-pointer font-medium text-gray-700 pr-8"
                >
                  {Object.values(THEMES).map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>

               {/* AI Brand Selector */}
               <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg shrink-0">
                <Bot size={16} className="text-gray-500" />
                <select 
                  value={currentBrandId}
                  onChange={(e) => setCurrentBrandId(e.target.value)}
                  className="text-sm border-none bg-transparent focus:ring-0 cursor-pointer font-medium text-gray-700 pr-8"
                >
                  {AI_BRANDS.map(b => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>

              <div className="w-px h-5 bg-gray-200 hidden md:block"></div>

              {/* Title & Author Inputs */}
              <div className="flex gap-4 flex-1 md:flex-none">
                <input 
                  type="text" 
                  placeholder="标题" 
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="text-sm bg-transparent border-b border-transparent hover:border-gray-300 focus:border-brand-500 outline-none w-24 md:w-32 px-1 py-1 transition-colors" 
                />
                 <input 
                  type="text" 
                  placeholder="@作者" 
                  value={author}
                  onChange={e => setAuthor(e.target.value)}
                  className="text-sm bg-transparent border-b border-transparent hover:border-gray-300 focus:border-brand-500 outline-none w-20 md:w-28 px-1 py-1 transition-colors" 
                />
              </div>
            </div>
          </div>

          {/* Preview Canvas Area */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden relative bg-checkerboard flex flex-col items-center p-4 md:p-12 pb-20 md:pb-12">
            <div className="w-full max-w-full flex justify-center">
               <div className="shadow-2xl rounded-sm overflow-hidden transform transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] w-full max-w-[1000px]">
                <MarkdownPreview 
                  ref={previewRef}
                  content={markdown}
                  theme={THEMES[currentTheme]}
                  title={title}
                  author={author}
                  brand={currentBrand}
                />
              </div>
            </div>
            <p className="mt-8 text-gray-400 text-sm md:hidden">滑动查看完整预览</p>
          </div>
        </div>
      </div>
      
      {/* Mobile Bottom Navigation */}
      <div className="md:hidden shrink-0 h-16 bg-white border-t border-gray-200 flex justify-around items-center px-4 z-30 pb-safe">
        <button 
          onClick={() => setMobileTab('editor')}
          className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors w-20 ${mobileTab === 'editor' ? 'text-brand-600 bg-brand-50' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <Edit3 size={20} />
          <span className="text-[10px] font-medium uppercase tracking-wide">编辑</span>
        </button>
        <button 
          onClick={() => setMobileTab('preview')}
          className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors w-20 ${mobileTab === 'preview' ? 'text-brand-600 bg-brand-50' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <Eye size={20} />
          <span className="text-[10px] font-medium uppercase tracking-wide">预览</span>
        </button>
      </div>

      {/* Background checkerboard pattern for preview area */}
      <style>{`
        .bg-checkerboard {
          background-color: #f3f4f6;
          background-image:
            linear-gradient(45deg, #e5e7eb 25%, transparent 25%),
            linear-gradient(-45deg, #e5e7eb 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #e5e7eb 75%),
            linear-gradient(-45deg, transparent 75%, #e5e7eb 75%);
          background-size: 20px 20px;
          background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
        }
        /* Safe area padding for newer iPhones */
        .pb-safe {
          padding-bottom: env(safe-area-inset-bottom);
        }
        /* Hide scrollbars in toolbars but keep functionality */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default App;