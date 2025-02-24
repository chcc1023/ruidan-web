import { Geist } from "next/font/google";
import Image from "next/image";
import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import ContactFormModal from '../components/ContactFormModal';

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

// 在文件顶部添加类型定义
type NewsItem = {
  id: string;
  title: string;
  date: string;
  category: string;
  image: string;
  content: string;
  summary?: string;
};

// 在组件外部创建一个函数来生成固定的随机位置
const generateFixedPositions = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    top: `${15 + (index * 10)}%`,
    left: `${10 + (index * 15)}%`,
    delay: 2 + (index * 0.5)
  }));
};

// 在组件外部创建一个函数来生成固定的连接线
const generateFixedLines = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    width: 150 + (index * 10),
    top: `${10 + (index * 10)}%`,
    left: `${5 + (index * 10)}%`,
    rotate: index * 45,
    duration: 4 + (index * 0.5)
  }));
};

// 动态导入并完全禁用 SSR
const AnimatedBackground = dynamic(
  () => import('../components/AnimatedBackground'),
  { 
    ssr: false,
    loading: () => (
      // 加载时显示静态背景
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-indigo-50" />
    )
  }
);

export default function About() {
  const [activeYear, setActiveYear] = useState('2024');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
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

  // 滚动到指定年份的内容
  const scrollToYear = (year: string) => {
    setActiveYear(year);
    const element = document.getElementById(`year-content-${year}`);
    if (element && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: element.offsetLeft,
        behavior: 'smooth'
      });
    }
  };

  const timelineData = [
    {
      year: "2024",
      events: [
        { 
          month: "12", 
          content: [
            "全新一代数字化运营SaaS启动内测",
            "通过国家高新技术企业认定复审"
          ],
          isHighlight: true 
        },
        { month: "11", content: "基于人工智能的缺陷（视觉）识别系统上线", isHighlight: true },
        { month: "05", content: "WebGIS建模及缺陷3D可视化功能上线", isHighlight: true }
      ]
    },
    {
      year: "2023",
      events: [
        { month: "12", content: "完成竖笈项目的技术概念验证和原型研发" },
        { month: "06", content: "完成基于机器学习的缺陷时序预测产品研发" }
      ]
    },
    {
      year: "2022",
      events: [
        { month: "06", content: "获得国家科技型中小企业认定" },
        { month: "03", content: "启动数字化运营基础框架及技术预研", isHighlight: true }
      ]
    },
    {
      year: "2021",
      events: [
        { month: "12", content: "21年营收同行前10%" },
        { month: "10", content: "获得国家高新技术企业认定", isHighlight: true },
        { month: "06", content: "公司业务落地全国城市达57个" }
      ]
    },
    {
      year: "2020",
      events: [
        { month: "08", content: "获取ISO27001信息安全管理体系认证证书认定", isHighlight: true },
        { month: "04", content: "物联网业务中台-智能工单调度引擎产品获得深圳市软件产品认定" },
        { month: "01", content: "物联网业务中台-智能工单调度引擎工单数据上链" }
      ]
    },
    {
      year: "2019",
      events: [
        { month: "11", content: "公司业务落地全国城市达36个，海外2个国家" },
        { month: "08", content: "获得深圳市软件企业认定" },
        { month: "07", content: "ai2049.com域名启用", isHighlight: true },
        { month: "06", content: "物联网业务中台-智能工单调度引擎产品上线" },
        { month: "04", content: "第一个合作渠道签约" }
      ]
    },
    {
      year: "2018",
      events: [
        { month: "11", content: "公司业务落地全国城市达16个" },
        { month: "04", content: "第一次实现海外SaaS服务" },
        { month: "03", content: "第一次实现软件出口" }
      ]
    }
  ].sort((a, b) => parseInt(b.year) - parseInt(a.year));

  // 添加新闻数据
  const newsData: NewsItem[] = [
    {
      id: '1',
      title: '2023年物业管理新趋势',
      date: '2023年3月15日',
      category: '管理趋势',
      image: '/news/news-1.jpg',
      summary: '随着科技的发展，物业管理行业正在经历数字化转型...',
      content: `
        <h2>物业管理行业的数字化转型</h2>
        <div>在2023年，物业管理行业正在经历前所未有的变革。随着人工智能、物联网等技术的快速发展，传统的物业管理模式正在向智能化、数字化方向转变。</div>
        
        <h3>主要趋势包括：</h3>
        <ul>
          <li>智能化管理系统的广泛应用</li>
          <li>数据驱动的决策模式</li>
          <li>物联网设备的深度整合</li>
          <li>移动应用程序的普及</li>
        </ul>

        <div>通过这些新技术的应用，物业管理效率得到显著提升，服务质量也有了质的飞跃。</div>
      `
    },
    {
      id: '2',
      title: '协办深圳物博会《跨越鸿沟的数字化转行平行论坛》',
      date: '2023年10月11日',
      category: '行业论坛',
      image: '/news/news-2.jpg',
      summary: '深圳物博会上，我们探讨了物业行业数字化转型面临的挑战和机遇...',
      content: `
        <h2>数字化转型论坛成功举办</h2>
        <div>在深圳物博会上，我们联合行业专家共同探讨了物业管理行业数字化转型过程中的关键问题。</div>
        
        <h3>论坛重点议题：</h3>
        <ul>
          <li>数字化转型中的技术选型</li>
          <li>传统企业转型痛点分析</li>
          <li>数据驱动决策的实践经验</li>
          <li>人才培养与组织变革</li>
        </ul>
      `
    },
    {
      id: '3',
      title: '受邀参加深圳国际清洁博览会并发表演讲',
      date: '2023年12月13日',
      category: '行业会议',
      image: '/news/news-3.jpg',
      summary: '在深圳国际清洁博览会上，我们分享了智能清洁解决方案的最新进展...',
      content: `
        <h2>智能清洁解决方案分享</h2>
        <div>作为行业领先的解决方案提供商，我们在博览会上展示了最新的智能清洁管理系统。</div>
        
        <h3>主要创新点：</h3>
        <ul>
          <li>AI清洁路线优化</li>
          <li>智能设备管理平台</li>
          <li>清洁质量智能评估</li>
          <li>数据分析与决策支持</li>
        </ul>
      `
    },
    {
      id: '4',
      title: '与德胜服务签署战略合作协议',
      date: '2023年12月31日',
      category: '战略合作',
      image: '/news/news-4.jpg',
      summary: '我们与德胜服务达成战略合作，共同推进物业服务数字化升级...',
      content: `
        <h2>战略合作开启新篇章</h2>
        <div>通过此次合作，双方将在物业服务数字化领域展开深度合作。</div>
        
        <h3>合作重点：</h3>
        <ul>
          <li>智能物业管理平台共建</li>
          <li>数据资源共享机制</li>
          <li>技术创新实验室建立</li>
          <li>人才培养计划制定</li>
        </ul>
      `
    },
    {
      id: '5',
      title: '2024年物业科技发展白皮书发布',
      date: '2024年1月15日',
      category: '行业研究',
      image: '/news/news-5.jpg',
      summary: '发布最新研究报告，深入分析物业科技发展趋势...',
      content: `
        <h2>物业科技发展趋势分析</h2>
        <div>白皮书深入分析了物业科技领域的最新发展趋势和未来展望。</div>
        
        <h3>核心观点：</h3>
        <ul>
          <li>AI技术深度应用</li>
          <li>物联网全面覆盖</li>
          <li>数字孪生技术应用</li>
          <li>智慧社区建设加速</li>
        </ul>
      `
    }
  ];

  // 添加打开新闻详情的处理函数
  const openNewsDetail = (newsId: string) => {
    const news = newsData.find(item => item.id === newsId);
    if (news) {
      setSelectedNews(news);
      setIsModalOpen(true);
    }
  };

  // 使用固定的位置数据
  const particlePositions = generateFixedPositions(6);
  const linePositions = generateFixedLines(8);

  // 添加打开模态框的函数
  const openModal = (title: string) => {
    setModalTitle(title);
    setIsModalOpen(true);
  };

  return (
    <div className={`${geist.variable} min-h-screen`}>
      <div className="w-full overflow-x-hidden">
        {/* 导航栏 */}
        <nav className="flex justify-between items-center px-4 h-16 border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 w-full">
          {/* 左侧 Logo */}
          <div className="flex items-center">
            <Image
              src="/virgin.png"
              alt="VIRGIN DIGITAL LEADER"
              width={200}
              height={28}
              priority
              className="h-7 w-auto"
            />
          </div>
          
          {/* 右侧菜单和按钮 */}
          <div className="flex items-center gap-4 md:gap-6">
            <div className="flex items-center gap-6">
              <a href="/" className="text-gray-600 text-sm hover:text-blue-600 transition-colors">首页</a>
              <a href="/about" className="text-gray-900 text-sm hover:text-blue-600 transition-colors">关于我们</a>
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

        {/* 发展历程部分 */}
        <section className="relative w-full">
          <div className="h-[240px] relative overflow-hidden">
            {/* 渐变背景 */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-indigo-50" />
            
            {/* 动画背景 */}
            <AnimatedBackground />

            {/* 标题内容 */}
            <div className="relative h-full flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">发展历程</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto" />
              </div>
            </div>
          </div>

          {/* 年份导航 */}
          <div className="relative bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4">
              {/* 时间轴 */}
              <div className="relative py-12">
                {/* 科技感连接线 */}
                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0">
                  {/* 基础线条 - 虚线效果 */}
                  <div className="absolute inset-0 h-[1px]" 
                    style={{
                      background: `repeating-linear-gradient(
                        90deg,
                        transparent,
                        transparent 4px,
                        #93c5fd 4px,
                        #93c5fd 8px
                      )`
                    }} 
                  />

                  {/* 动态光效 */}
                  <div className="absolute inset-0 h-[2px]">
                    <div className="absolute inset-0 animate-timeline-flow"
                      style={{
                        background: `linear-gradient(90deg, 
                          transparent 0%,
                          #3b82f6 20%,
                          #60a5fa 50%,
                          #3b82f6 80%,
                          transparent 100%
                        )`
                      }}
                    />
                  </div>

                  {/* 装饰点 */}
                  <div className="absolute inset-0 h-[4px]"
                    style={{
                      background: `repeating-linear-gradient(
                        90deg,
                        transparent,
                        transparent 100px,
                        #dbeafe 100px,
                        #dbeafe 102px
                      )`
                    }}
                  />
                </div>
                
                {/* 年份点和文字部分保持不变 */}
                <div className="relative flex justify-between">
                  {["2024", "2023", "2022", "2021", "2020", "2019", "2018"].map((year) => (
                    <button
                      key={year}
                      onClick={() => scrollToYear(year)}
                      className="relative flex flex-col items-center group"
                    >
                      {/* 年份点和连接线 */}
                      <div className="relative">
                        {/* 发光效果 */}
                        {activeYear === year && (
                          <div className="absolute -inset-3 bg-blue-500/20 rounded-full blur-md" />
                        )}
                        
                        {/* 外圈 */}
                        <div className={`relative w-5 h-5 rounded-full border-2 transition-all duration-300
                          ${activeYear === year 
                            ? 'bg-blue-600 border-blue-600 scale-125 shadow-[0_0_12px_rgba(37,99,235,0.5)]' 
                            : 'bg-white border-blue-400 group-hover:border-blue-500'}`} 
                        />
                        
                        {/* 内圈 */}
                        <div className={`absolute inset-1.5 rounded-full transition-all duration-300
                          ${activeYear === year 
                            ? 'bg-white opacity-90 scale-75' 
                            : 'bg-blue-400 opacity-0 group-hover:opacity-25'}`} 
                        />
                      </div>

                      {/* 年份文字 */}
                      <div className={`mt-4 flex flex-col items-center transition-all duration-300
                        ${activeYear === year 
                          ? 'text-blue-600 transform -translate-y-1' 
                          : 'text-gray-500 group-hover:text-blue-500'}`}
                      >
                        <span className="text-base font-medium">{year}</span>
                        {/* 选中指示器 */}
                        {activeYear === year && (
                          <div className="h-1 w-1 rounded-full bg-blue-600 mt-1 
                            shadow-[0_0_8px_rgba(37,99,235,0.5)]" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 内容区域 - 横向滚动 */}
          <div className="bg-gray-50">
            <div className="px-4 md:px-6 lg:px-8 py-12 max-w-[2000px] mx-auto">
              {/* 滚动区域包装器 - 用于定位箭头 */}
              <div className="relative group">
                {/* 左箭头 */}
                <button 
                  onClick={() => {
                    if (scrollContainerRef.current) {
                      scrollContainerRef.current.scrollLeft -= 800;
                    }
                  }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10
                    w-12 h-12 rounded-full bg-white shadow-lg border border-gray-100
                    flex items-center justify-center
                    text-gray-400 hover:text-blue-600
                    transition-all duration-300
                    opacity-0 group-hover:opacity-100 group-hover:translate-x-6"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* 右箭头 */}
                <button 
                  onClick={() => {
                    if (scrollContainerRef.current) {
                      scrollContainerRef.current.scrollLeft += 800;
                    }
                  }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10
                    w-12 h-12 rounded-full bg-white shadow-lg border border-gray-100
                    flex items-center justify-center
                    text-gray-400 hover:text-blue-600
                    transition-all duration-300
                    opacity-0 group-hover:opacity-100 group-hover:-translate-x-4"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* 横向滚动容器 */}
                <div 
                  ref={scrollContainerRef}
                  className="overflow-x-auto hide-scrollbar scroll-smooth max-w-full"
                  style={{ 
                    WebkitOverflowScrolling: 'touch',
                    touchAction: 'pan-x'
                  }}
                >
                  {/* 横向布局容器 */}
                  <div className="flex gap-4 md:gap-6 lg:gap-8 w-max">
                    {/* 年份列 */}
                    {timelineData.map((yearData) => (
                      <div
                        id={`year-content-${yearData.year}`}
                        key={yearData.year}
                        className="w-[400px] md:w-[480px] lg:w-[580px] flex-shrink-0"
                      >
                        {/* 年份标题 */}
                        <div className="mb-4 pb-2 border-b border-gray-100">
                          <h3 className="text-xl font-bold text-gray-900">{yearData.year}</h3>
                        </div>

                        {/* 年份事件列表 */}
                        <div className="space-y-8">
                          {yearData.events.map((event, eventIndex) => (
                            <div key={eventIndex} className="relative">
                              {/* 时间线 */}
                              <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200">
                                <div 
                                  className={`absolute top-[22px] left-1/2 w-2 h-2 -translate-x-1/2 rounded-full
                                    ${event.isHighlight ? 'bg-blue-400/70' : 'bg-gray-400'}`}
                                />
                              </div>
                              
                              {/* 内容区域 */}
                              <div 
                                className={`relative ml-8 p-4 rounded-lg transition-all duration-300
                                  ${event.isHighlight 
                                    ? 'bg-white shadow-lg border-l-4 border-blue-500 pl-5' 
                                    : 'bg-white hover:shadow-md'}`}
                              >
                                {/* 月份 */}
                                <div className={`text-sm font-medium mb-2
                                  ${event.isHighlight ? 'text-blue-600' : 'text-gray-500'}`}
                                >
                                  {event.month}月
                                </div>
                                
                                {/* 内容 */}
                                <div className={`text-sm leading-relaxed
                                  ${event.isHighlight ? 'text-gray-900' : 'text-gray-600'}`}
                                >
                                  {Array.isArray(event.content) ? (
                                    <div className="space-y-2">
                                      {event.content.map((item, index) => (
                                        <div key={index} className={event.isHighlight ? 'font-semibold' : ''}>{item}</div>
                                      ))}
                                    </div>
                                  ) : (
                                    <div className={event.isHighlight ? 'font-semibold' : ''}>{event.content}</div>
                                  )}
                                </div>
                                
                                {/* 重要事件标记 */}
                                {event.isHighlight && (
                                  <div className="absolute -left-[25px] top-1/2 -translate-y-1/2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 公司动态部分 - 新设计 */}
        <section className="hidden py-16 px-4 bg-gradient-to-br from-gray-50 to-white w-full">
          <div className="max-w-7xl mx-auto">
            {/* 标题区域 */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">公司动态</h2>
              <div className="w-20 h-1 bg-blue-600 rounded-full mx-auto" />
            </div>

            {/* 动态网格 - 自适应布局 */}
            <div className="relative group">
              {/* 左箭头 */}
              <button 
                onClick={() => {
                  const container = document.getElementById('news-container');
                  if (container) {
                    container.scrollLeft -= container.clientWidth;
                  }
                }}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10
                  w-12 h-12 rounded-full bg-white shadow-lg border border-gray-100
                  flex items-center justify-center
                  text-gray-400 hover:text-blue-600
                  transition-all duration-300
                  opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* 右箭头 */}
              <button 
                onClick={() => {
                  const container = document.getElementById('news-container');
                  if (container) {
                    container.scrollLeft += container.clientWidth;
                  }
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10
                  w-12 h-12 rounded-full bg-white shadow-lg border border-gray-100
                  flex items-center justify-center
                  text-gray-400 hover:text-blue-600
                  transition-all duration-300
                  opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* 滚动容器 */}
              <div 
                id="news-container"
                className="overflow-x-auto hide-scrollbar scroll-smooth"
              >
                <div className="flex gap-4 pb-4">
                  {newsData.map((news) => (
                    <div 
                      key={news.id}
                      className="cursor-pointer flex-none w-full md:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] group/card"
                      onClick={() => openNewsDetail(news.id)}
                    >
                      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden transition-all duration-500 group-hover/card:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                        <Image
                          src={news.image}
                          alt={news.title}
                          fill
                          className="object-cover transition-all duration-500 scale-100 group-hover/card:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-100 transition-opacity duration-500 group-hover/card:opacity-60" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <div className="px-3 py-1 rounded-full bg-blue-500/20 backdrop-blur-sm transition-all duration-500 group-hover/card:bg-blue-500/30">
                                <span className="text-xs text-blue-200">{news.category}</span>
                              </div>
                              <span className="text-sm text-gray-300 transition-all duration-500 group-hover/card:text-gray-100">{news.date}</span>
                            </div>
                            <h3 className="text-lg font-bold text-white transition-all duration-500 group-hover/card:text-blue-200 line-clamp-2 transform group-hover/card:translate-y-[-2px]">
                              {news.title}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 新闻详情模态框 */}
        {isModalOpen && selectedNews && (
          <div className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden">
            {/* 背景遮罩 */}
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
              onClick={() => setIsModalOpen(false)}
            />
            
            {/* 模态框内容 */}
            <div className="relative min-h-screen flex items-center justify-center p-4">
              <div className="relative bg-white rounded-2xl w-full max-w-4xl mx-auto overflow-hidden shadow-2xl">
                {/* 关闭按钮 */}
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* 头部图片 */}
                <div className="relative h-[300px]">
                  <Image
                    src={selectedNews.image}
                    alt={selectedNews.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="px-3 py-1 rounded-full bg-blue-600/20 backdrop-blur-sm">
                          <span className="text-xs text-blue-200">{selectedNews.category}</span>
                        </div>
                        <span className="text-sm text-gray-300">{selectedNews.date}</span>
                      </div>
                      <h2 className="text-3xl font-bold text-white">{selectedNews.title}</h2>
                    </div>
                  </div>
                </div>

                {/* 内容区域 */}
                <div className="p-8">
                  <div 
                    className="prose prose-lg max-w-none [&>p]:!my-4 [&>div]:my-4"
                    dangerouslySetInnerHTML={{ __html: selectedNews.content }}
                  />
                </div>

                {/* 底部操作区 */}
                <div className="p-6 border-t bg-gray-50">
                  <div className="flex justify-between items-center">
                    <button 
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors ml-auto"
                    >
                      关闭
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

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