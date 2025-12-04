import React, { forwardRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, ghcolors } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ThemeConfig, ThemeType, AIBrand } from '../types';

interface MarkdownPreviewProps {
  content: string;
  theme: ThemeConfig;
  title?: string;
  author?: string;
  brand?: AIBrand;
}

// forwardRef is needed to capture the DOM element
const MarkdownPreview = forwardRef<HTMLDivElement, MarkdownPreviewProps>(({ content, theme, title, author, brand }, ref) => {
  
  const codeStyle = theme.id === ThemeType.DARK || theme.id === ThemeType.MIDNIGHT ? vscDarkPlus : ghcolors;

  return (
    <div 
      ref={ref}
      className={`w-full min-h-[600px] p-8 flex flex-col items-center justify-center transition-colors duration-300 ${theme.backgroundClass}`}
    >
      {/* The "Paper" - max-w-5xl with smaller fonts allows high density */}
      <div className={`w-full max-w-5xl rounded-lg ${theme.paperClass} transition-colors duration-300 flex flex-col`}>
        
        {/* Optional Header inside the image */}
        {(title || author) && (
          <div className={`px-8 py-6 border-b ${theme.accentClass} flex justify-between items-center`}>
            {title && <h1 className={`text-lg font-bold tracking-tight ${theme.textClass}`}>{title}</h1>}
            {author && <span className={`text-sm opacity-60 font-medium ${theme.textClass}`}>@{author}</span>}
          </div>
        )}

        {/* Markdown Content - Switched from prose-lg to standard size, reduced margins */}
        <div className={`flex-1 p-8 md:p-10 prose max-w-none ${theme.id === ThemeType.DARK || theme.id === ThemeType.MIDNIGHT ? 'prose-invert' : ''}`}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              // Reduced font sizes and margins for a compact, information-dense layout
              h1: ({node, ...props}) => <h1 className={`text-2xl font-extrabold mb-4 mt-2 tracking-tight ${theme.textClass}`} {...props} />,
              h2: ({node, ...props}) => <h2 className={`text-xl font-bold mb-3 mt-6 tracking-tight ${theme.textClass}`} {...props} />,
              h3: ({node, ...props}) => <h3 className={`text-lg font-semibold mb-2 mt-4 ${theme.textClass}`} {...props} />,
              p: ({node, ...props}) => <p className={`mb-3 leading-7 text-base ${theme.textClass} opacity-90`} {...props} />,
              ul: ({node, ...props}) => <ul className={`list-disc pl-5 mb-3 space-y-1 ${theme.textClass} opacity-90`} {...props} />,
              ol: ({node, ...props}) => <ol className={`list-decimal pl-5 mb-3 space-y-1 ${theme.textClass} opacity-90`} {...props} />,
              li: ({node, ...props}) => <li className="pl-1 leading-normal text-base" {...props} />,
              
              code({node, inline, className, children, ...props}: any) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <div className="my-4 rounded-md overflow-hidden shadow-sm ring-1 ring-black/5">
                    <SyntaxHighlighter
                      style={codeStyle}
                      language={match[1]}
                      PreTag="div"
                      customStyle={{
                        margin: 0,
                        padding: '1rem',
                        fontSize: '0.85em', // Smaller code font
                        lineHeight: '1.5',
                      }}
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <code className={`${inline ? 'bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded text-[0.85em] font-mono font-medium' : ''} ${className}`} {...props}>
                    {children}
                  </code>
                );
              },
              table({children}: any) {
                return (
                  <div className="my-4 w-full border rounded border-opacity-50 theme-border overflow-hidden">
                    <table className="w-full divide-y divide-gray-300 dark:divide-gray-700 table-auto text-sm">
                      {children}
                    </table>
                  </div>
                )
              },
              th({children}: any) {
                return <th className={`px-3 py-2 bg-black/5 dark:bg-white/5 font-semibold text-left text-xs uppercase tracking-wider ${theme.textClass} break-words whitespace-normal`}>{children}</th>
              },
              td({children}: any) {
                return <td className={`px-3 py-2 border-t text-sm leading-snug ${theme.accentClass} break-all whitespace-normal`}>{children}</td>
              },
              blockquote({children}: any) {
                return <blockquote className={`border-l-4 pl-4 py-1 italic my-4 text-base ${theme.accentClass} opacity-80 bg-black/5 dark:bg-white/5 rounded-r`}>{children}</blockquote>
              },
              a: ({node, ...props}) => <span className="underline decoration-1 underline-offset-2 opacity-80" {...props} />,
              hr: ({node, ...props}) => <hr className={`my-6 border-t ${theme.accentClass} opacity-30`} {...props} />,
            }}
          >
            {content}
          </ReactMarkdown>
        </div>

        {/* Footer watermark & Brand */}
        <div className={`px-8 py-4 border-t ${theme.accentClass} flex justify-between items-center`}>
           {/* Brand Logo Section */}
           <div className="flex items-center gap-3">
              {brand && brand.id !== 'none' && (
                 <div className={`flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/10 ${theme.textClass}`}>
                    {brand.icon}
                    <span className="text-[10px] font-bold tracking-wide uppercase">{brand.name}</span>
                 </div>
              )}
           </div>

           {/* App Watermark */}
           <div className="flex items-center gap-2 opacity-40">
              <span className={`text-[10px] font-mono font-medium uppercase tracking-widest ${theme.textClass}`}>由 AI分享助手 生成</span>
           </div>
        </div>
      </div>
    </div>
  );
});

export default MarkdownPreview;