import { Inter } from 'next/font/google';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import ContactFormModal from '../components/ContactFormModal';
import { partnersData } from '../data/partners';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// 动态导入并禁用 SSR
const AnimatedBackground = dynamic(
  () => import('../components/AnimatedBackground'),
  { 
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900" />
    )
  }
);

// 定义合作优势数据，避免在JSX中直接定义大型数组
const partnerAdvantages = [
  {
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    title: "技术赋能",
    desc: "共享前沿AI技术与解决方案，提升合作伙伴的技术能力与竞争优势",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
    title: "市场拓展",
    desc: "联合市场营销与品牌推广，开拓更广阔的市场，获取更多潜在客户",
    color: "from-cyan-500 to-green-500"
  },
  {
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    title: "生态共建",
    desc: "参与构建数字化物业管理生态圈，共享行业资源，实现互利共赢",
    color: "from-blue-600 to-indigo-600"
  },
  {
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    title: "业务增长",
    desc: "借助我们的AI技术与平台优势，帮助合作伙伴实现业务快速增长",
    color: "from-purple-500 to-indigo-500"
  },
  {
    icon: "M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z",
    title: "创新协作",
    desc: "共同参与产品研发与创新，引领行业发展趋势，把握先机",
    color: "from-red-500 to-orange-500"
  },
  {
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    title: "品牌背书",
    desc: "成为我们的官方合作伙伴，获得品牌认证与行业影响力提升",
    color: "from-amber-500 to-yellow-500"
  }
];

// 可重用的装饰元素组件
interface DecorativeSvgProps {
  width: string;
  height: string;
  children: React.ReactNode;
  className?: string;
}

const DecorativeSvg: React.FC<DecorativeSvgProps> = ({ width, height, children, className }) => (
  <svg width={width} height={height} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {children}
  </svg>
);

export default function Partners() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 监听滚动事件，控制返回顶部按钮的显示和隐藏
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 返回顶部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // 打开模态框的函数
  const openModal = (title: string) => {
    setModalTitle(title);
    setIsModalOpen(true);
  };

  // 可重用的背景点阵样式
  const dotPattern = {
    backgroundImage: 'radial-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px)',
    backgroundSize: '40px 40px'
  };

  return (
    <div className={`${inter.variable} min-h-screen w-full max-w-[100vw] overflow-x-hidden`}>
      <div className="w-full overflow-x-hidden">
        {/* 导航栏 */}
        <nav className="flex justify-between items-center px-4 py-3 md:py-0 md:h-16 border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 w-full">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/virgin.png"
              alt="VIRGIN DIGITAL LEADER"
              width={160}
              height={28}
              priority
              className="h-6 md:h-7 w-auto"
            />
          </div>

          {/* 移动端菜单 - 显示主要菜单项和更多按钮 */}
          <div className="md:hidden flex items-center">
            <a href="/" className="text-gray-600 text-sm px-3 py-1 hover:text-blue-600 transition-colors">首页</a>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="flex items-center text-sm px-3 py-1 text-gray-600 hover:text-blue-600 transition-colors ml-1"
            >
              <span className="mr-1">更多</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M19 9l-7 7-7-7" : "M9 5l7 7-7 7"} />
              </svg>
            </button>
          </div>

          {/* 桌面端菜单 */}
          <div className="hidden md:flex items-center gap-2 md:gap-6">
            <div className="flex items-center gap-6">
              <a href="/" className="text-gray-600 text-sm hover:text-blue-600 transition-colors">首页</a>
              <a href="/research" className="text-gray-600 text-sm hover:text-blue-600 transition-colors">智研空间</a>
              <a href="/about" className="text-gray-600 text-sm hover:text-blue-600 transition-colors">关于我们</a>
              <a href="/partners" className="text-gray-900 text-sm hover:text-blue-600 transition-colors">官方合作伙伴</a>
            </div>
            <div className="flex items-center gap-3">
              <a 
                href="https://www.ai2049.com/#/login"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-1.5 text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                登录
              </a>
              <button 
                onClick={() => openModal('立即咨询')}
                className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              >
                立即咨询
              </button>
            </div>
          </div>
        </nav>

        {/* 移动端展开菜单 */}
        <div className={`md:hidden absolute z-40 left-0 right-0 overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-gradient-to-b from-white to-gray-50 shadow-lg border-t border-gray-100 rounded-b-xl mx-2">
            <div className="py-3 px-5">
              {/* 菜单项容器 */}
              <div className="grid grid-cols-2 gap-3">
                <a href="/research" className="flex items-center gap-2 p-3 rounded-lg hover:bg-blue-50 transition-colors group">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  <span className="text-gray-700 text-sm font-medium group-hover:text-blue-600 transition-colors">智研空间</span>
                </a>
                
                <a href="/about" className="flex items-center gap-2 p-3 rounded-lg hover:bg-blue-50 transition-colors group">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-gray-700 text-sm font-medium group-hover:text-blue-600 transition-colors">关于我们</span>
                </a>
                
                <a href="/partners" className="flex items-center gap-2 p-3 rounded-lg hover:bg-blue-50 transition-colors group">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <span className="text-gray-700 text-sm font-medium group-hover:text-blue-600 transition-colors">合作伙伴</span>
                </a>
                
                <a href="https://www.ai2049.com/#/login" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 rounded-lg hover:bg-blue-50 transition-colors group">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                  </div>
                  <span className="text-gray-700 text-sm font-medium group-hover:text-blue-600 transition-colors">登录</span>
                </a>
                
                <button onClick={() => {
                  setMobileMenuOpen(false);
                  openModal('立即咨询');
                }} className="flex items-center gap-2 p-3 rounded-lg hover:bg-blue-50 transition-colors group">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <span className="text-gray-700 text-sm font-medium group-hover:text-blue-600 transition-colors">立即咨询</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 合作伙伴标题和展示部分 */}
        <section className="relative w-full py-24 bg-gray-50 overflow-hidden">
          {/* 背景装饰元素 */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={dotPattern}></div>
          </div>
          
          <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-cyan-100/30 rounded-full blur-[80px] animate-pulse" />
          
          {/* 装饰图形 */}
          <div className="absolute top-20 right-40 opacity-20">
            <DecorativeSvg width="80" height="80">
              <circle cx="50" cy="50" r="40" stroke="#3B82F6" strokeWidth="1" />
              <circle cx="50" cy="50" r="30" stroke="#3B82F6" strokeWidth="1" />
              <circle cx="50" cy="50" r="20" stroke="#3B82F6" strokeWidth="1" />
              <line x1="10" y1="50" x2="90" y2="50" stroke="#3B82F6" strokeWidth="1" />
              <line x1="50" y1="10" x2="50" y2="90" stroke="#3B82F6" strokeWidth="1" />
            </DecorativeSvg>
          </div>
          
          <div className="absolute bottom-20 left-40 opacity-20">
            <DecorativeSvg width="60" height="60">
              <rect x="20" y="20" width="60" height="60" stroke="#3B82F6" strokeWidth="1" />
              <rect x="30" y="30" width="40" height="40" stroke="#3B82F6" strokeWidth="1" />
              <rect x="40" y="40" width="20" height="20" stroke="#3B82F6" strokeWidth="1" />
            </DecorativeSvg>
          </div>
          
          {/* 内容 */}
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            {/* 标题内容 */}
            <div className="text-center mb-16">
              <div className="inline-block bg-gradient-to-r from-blue-500/10 to-blue-600/10 backdrop-blur-sm px-6 py-2 rounded-full mb-6 border border-blue-200/20">
                <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent font-semibold">携手共创 · 智启未来</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                官方合作伙伴
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 mx-auto" />
              <p className="mt-8 text-gray-600 max-w-2xl mx-auto text-lg">
                携手行业领先企业，共同推动技术创新与商业变革，为客户创造更大价值
              </p>
            </div>
                      
            {/* 合作伙伴展示区域 - 卡片样式 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {partnersData.map((partner, index) => (
                <div 
                  key={index} 
                  className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
                >
                  {/* 顶部装饰条 */}
                  <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                  
                  <div className="p-8 flex flex-col items-center text-center">
                    {/* Logo部分 */}
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 mb-6 flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-cyan-100 opacity-50 rounded-xl"></div>
                      {partner.logo ? (
                        <img src={partner.logo} alt={partner.name} className="w-16 h-16 object-contain relative z-10" />
                      ) : (
                        <span className="text-4xl font-bold bg-gradient-to-br from-blue-600 to-cyan-600 bg-clip-text text-transparent relative z-10">
                          {partner.logoLetter || partner.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    
                    {/* 合作伙伴名称 */}
                    <div className="mb-2">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {partner.name}
                      </h3>
                    </div>
                    
                    {/* 官方合作标识 */}
                    {partner.isOfficial && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        官方合作伙伴
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 合作伙伴价值部分与寻求合作合并区域 */}
        <section className="py-24 bg-white relative overflow-hidden">
          {/* 背景装饰 */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute right-0 top-40 w-1/2 h-[600px]" style={{ 
              backgroundImage: 'radial-gradient(circle, rgba(56, 189, 248, 0.15) 1px, transparent 1px)',
              backgroundSize: '30px 30px'
            }}></div>
            <div className="absolute left-0 bottom-40 w-1/2 h-[600px]" style={{ 
              backgroundImage: 'radial-gradient(circle, rgba(37, 99, 235, 0.1) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block px-6 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-full mb-4 border border-blue-100">
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent font-semibold">互利共赢</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">合作伙伴计划优势</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto" />
              <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
                与维珍数据建立合作伙伴关系，获取我们提供的全方位支持与共同发展机会
              </p>
            </div>

            {/* 合作价值点 - 使用提取出的数据数组 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {partnerAdvantages.map((item, index) => (
                <div key={index} className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                  {/* 顶部装饰条 */}
                  <div className={`h-1.5 w-full bg-gradient-to-r ${item.color}`}></div>
                  
                  <div className="p-8">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-6 group-hover:shadow-lg group-hover:scale-110 transition-all duration-300`}>
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:translate-x-1 transition-transform duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">
                      {item.desc}
                    </p>
                  </div>
                  
                  {/* 底部装饰 */}
                  <div className="absolute right-4 bottom-4 opacity-10">
                    <svg className="w-20 h-20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d={item.icon} stroke="currentColor" strokeWidth={1} className="text-gray-900" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
            
            {/* 寻求合作区域 */}
            <div className="mt-20 text-center">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 md:p-12 rounded-2xl border border-blue-100 max-w-4xl mx-auto">
                <div className="mb-8">
                  <div className="inline-block p-4 rounded-full bg-white mb-6 shadow-sm">
                    <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">寻求合作</h2>
                  <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                    我们期待与更多优秀企业建立长期合作关系，共同探索技术创新与业务增长的新可能
                  </p>
                </div>
                <button 
                  onClick={() => openModal('加入合作伙伴计划')}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all flex items-center gap-2 mx-auto"
                >
                  <span>立即联系我们</span>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 添加联系表单模态框 */}
        <ContactFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={modalTitle}
        />
      </div>

      {/* 页脚 */}
      <footer className="bg-gradient-to-b from-indigo-900 to-blue-900 text-white/80 py-20">
        <div className="max-w-6xl mx-auto px-4">
          {/* 联系我们 */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">联系我们</h2>
            <h3 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              让我们一起探讨合作
            </h3>
            <div className="space-y-4 text-white/60">
              <p>周一至周五，上午9:00至下午6:00</p>
              <p>我们的团队随时准备为您解答问题。</p>
            </div>
            <div className="mt-8 space-y-3">
              <p>发送消息给我们</p>
              <p className="text-xl font-medium text-blue-400">support@virgindatax.com</p>
              <p className="text-xl font-medium text-blue-400">联系电话：13510230560</p>
              <p>微信搜索【睿单】公众号</p>
            </div>
          </div>
        </div>
      </footer>

      {/* 返回顶部按钮 */}
      <button
        onClick={scrollToTop}
        className={`fixed right-8 bottom-8 z-50 p-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg 
          transform transition-all duration-300 hover:shadow-blue-500/25 hover:scale-110 group
          ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'}`}
      >
        <svg 
          className="w-6 h-6 transform transition-transform duration-300 group-hover:translate-y-[-2px]" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 10l7-7m0 0l7 7m-7-7v18" 
          />
        </svg>
        <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
      </button>
    </div>
  );
} 