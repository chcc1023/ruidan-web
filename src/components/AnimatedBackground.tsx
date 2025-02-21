import { useEffect, useState } from 'react';

export default function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // 动态添加样式
    const style = document.createElement('style');
    style.textContent = `
      .bg-pattern {
        background-image: radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.15) 1px, transparent 0);
        background-size: 40px 40px;
      }
      
      .animated-line {
        animation: slide var(--duration) linear infinite;
      }
      
      .animated-dot {
        animation: pulse var(--duration) ease-in-out infinite;
      }
      
      @keyframes slide {
        from { transform: translateX(-100%) rotate(var(--rotate)); }
        to { transform: translateX(100%) rotate(var(--rotate)); }
      }
      
      @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 0.2; }
        50% { transform: scale(1.5); opacity: 0.4; }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  if (!mounted) {
    return <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-indigo-50" />;
  }

  // 使用固定数组
  const lines = Array.from({ length: 5 }, (_, i) => ({
    top: 20 + i * 15,
    rotate: -5 + i * 2,
    duration: 3 + i
  }));

  const dots = Array.from({ length: 6 }, (_, i) => ({
    top: 15 + i * 12,
    left: 10 + i * 15,
    duration: 2 + i * 0.5
  }));

  return (
    <div className="absolute inset-0">
      {/* 基础背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-indigo-50" />
      
      {/* 点阵背景 */}
      <div className="absolute inset-0 bg-pattern opacity-15" />
      
      {/* 动画线条 */}
      {lines.map((line, i) => (
        <div
          key={i}
          className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-blue-400/30 to-transparent animated-line"
          style={{
            top: `${line.top}%`,
            '--rotate': `${line.rotate}deg`,
            '--duration': `${line.duration}s`
          } as React.CSSProperties}
        />
      ))}
      
      {/* 动画点 */}
      {dots.map((dot, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-blue-400/20 animated-dot"
          style={{
            top: `${dot.top}%`,
            left: `${dot.left}%`,
            '--duration': `${dot.duration}s`
          } as React.CSSProperties}
        >
          <div className="absolute inset-0 rounded-full bg-blue-400/40 animate-ping" />
        </div>
      ))}
    </div>
  );
} 