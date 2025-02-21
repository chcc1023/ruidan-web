import "@/styles/globals.css";
import type { AppProps } from "next/app";

// 添加全局样式
const globalStyles = `
  /* 防止页面横向滚动 */
  html, body {
    max-width: 100vw;
    overflow-x: hidden;
  }

  .hide-scrollbar {
    scrollbar-width: none;  /* Firefox */
    -ms-overflow-style: none;  /* IE and Edge */
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;  /* Chrome, Safari and Opera */
    width: 0;
    height: 0;
  }

  @keyframes timeline-flow {
    0% {
      transform: translateX(-100%);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: translateX(100%);
      opacity: 0;
    }
  }

  .animate-timeline-flow {
    animation: timeline-flow 3s ease-in-out infinite;
  }

  @keyframes float-slow {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(10px, -10px); }
  }

  @keyframes float-medium {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(-15px, 15px); }
  }

  @keyframes float-fast {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(20px, -20px); }
  }

  .animate-float-slow {
    animation: float-slow 8s ease-in-out infinite;
  }

  .animate-float-medium {
    animation: float-medium 6s ease-in-out infinite;
  }

  .animate-float-fast {
    animation: float-fast 4s ease-in-out infinite;
  }

  @keyframes ai-pulse {
    0% {
      transform: scale(1);
      opacity: 0.8;
    }
    100% {
      transform: scale(1.5);
      opacity: 0;
    }
  }

  .animate-ai-pulse {
    animation: ai-pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  // 数字雨效果
  .matrix-rain {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(59, 130, 246, 0.2) 75%,
      rgba(59, 130, 246, 0) 100%
    );
    animation: matrix-rain 20s linear infinite;
    background-size: 100% 200%;
  }

  @keyframes matrix-rain {
    0% {
      background-position: 50% -100%;
    }
    100% {
      background-position: 50% 100%;
    }
  }

  @keyframes data-flow {
    0% {
      transform: translateX(-100%) scaleX(0.5);
      opacity: 0;
    }
    50% {
      opacity: 1;
      transform: translateX(0%) scaleX(1);
    }
    100% {
      transform: translateX(100%) scaleX(0.5);
      opacity: 0;
    }
  }

  .animate-data-flow {
    animation: data-flow 8s ease-in-out infinite;
  }

  @keyframes scan-line {
    0% {
      transform: translateX(-100%) rotate(var(--rotate, 0deg));
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: translateX(200%) rotate(var(--rotate, 0deg));
      opacity: 0;
    }
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 0.2;
    }
    50% {
      transform: scale(1.5);
      opacity: 0.4;
    }
  }

  @keyframes spin-slow {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes spin-reverse-slow {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }

  .animate-spin-slow {
    animation: spin-slow 20s linear infinite;
  }

  .animate-spin-reverse-slow {
    animation: spin-reverse-slow 15s linear infinite;
  }

  .perspective-[1000px] {
    perspective: 1000px;
  }

  .transform-style-3d {
    transform-style: preserve-3d;
  }

  .translate-z-12 {
    transform: translateZ(12px);
  }

  .-translate-z-12 {
    transform: translateZ(-12px);
  }

  .rotate-y-90 {
    transform: rotateY(90deg);
  }

  .-rotate-y-90 {
    transform: rotateY(-90deg);
  }

  .rotate-y-180 {
    transform: rotateY(180deg);
  }

  .rotate-x-90 {
    transform: rotateX(90deg);
  }

  .-rotate-x-90 {
    transform: rotateX(-90deg);
  }

  @keyframes spin-cube {
    from {
      transform: rotateX(0) rotateY(0) rotateZ(0);
    }
    to {
      transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg);
    }
  }

  .animate-spin-slow {
    animation: spin-cube 20s linear infinite;
  }

  .animate-ping {
    animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
  }

  @keyframes ping {
    75%, 100% {
      transform: scale(2);
      opacity: 0;
    }
  }
`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{globalStyles}</style>
      <Component {...pageProps} />
    </>
  );
}
