import { Geist } from "next/font/google";
import Image from "next/image";
import { FadeInSection } from '@/components/FadeInSection';
import { FadeInStagger } from '@/components/FadeInStagger';
import { useState, useEffect } from 'react';
import { ImageViewer } from '@/components/ImageViewer';
import ContactFormModal from '../components/ContactFormModal';

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // 自动切换效果
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
    }, 5000); // 每5秒切换一次
    
    return () => clearInterval(timer);
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

  const openModal = (title: string) => {
    setModalTitle(title);
    setIsModalOpen(true);
  };

  // 添加平滑滚动到指定区域的函数
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`${geist.variable} min-h-screen`}>
      {/* 导航栏 */}
      <nav className="flex justify-between items-center px-8 h-16 border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
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
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-6">
            <a href="/" className="text-gray-900 text-sm hover:text-blue-600 transition-colors">首页</a>
            <a href="/about" className="text-gray-600 text-sm hover:text-blue-600 transition-colors">关于我们</a>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-1.5 text-sm text-gray-600 hover:text-blue-600 transition-colors">
              登录
            </button>
            <button 
              onClick={() => openModal('立即咨询')}
              className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              立即咨询
            </button>
          </div>
        </div>
      </nav>

      {/* 主要内容区 */}
      <main>
        {/* 标题区域 */}
        <section className="w-full bg-gradient-to-b from-white to-gray-50 py-20">
          <div className="max-w-6xl mx-auto px-4 text-center relative">
            {/* 背景装饰 */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-500/10 rounded-[100px] rotate-12 blur-[80px]" />
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[80px]" />
            </div>

            {/* 标签 */}
            <div className="inline-block bg-gradient-to-r from-blue-500/10 to-blue-600/10 backdrop-blur-sm px-6 py-2 rounded-full mb-6 border border-blue-200/20">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent font-semibold">
                智能物业管理的革新者
              </span>
            </div>

            {/* 主标题和描述文字 */}
            <h1 className="relative h-32"> {/* 增加固定高度 */}
              <div className={`absolute w-full transition-all duration-1000 ${
                currentSlide === 0 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform translate-y-8'
              }`}>
                <div className="text-4xl font-bold mb-3 opacity-80">利用AI技术</div>
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent mb-6">
                  全面评估建筑设施缺陷
                </div>
              </div>
              <div className={`absolute w-full transition-all duration-1000 ${
                currentSlide === 1 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform translate-y-8'
              }`}>
                <div className="text-4xl font-bold mb-3 opacity-80">智能工单调度引擎</div>
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent mb-6">
                让物业作业更精准更高效
                </div>
              </div>
              {/* 装饰线条 */}
              <div className="absolute left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-sm" />
            </h1>

            {/* 描述文字 */}
            <div className="relative h-24">
              <div className="absolute w-full transition-all duration-1000">
                {[
                  {
                    id: 'defect',
                    content: (
                      <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-lg">
                        我们的专家团队利用先进的人工智能技术，为物业管理带来革命性变革，
                        <br />
                        <span className="text-blue-600 font-semibold">全面的缺陷数据</span>成为评估及改进服务的得力助手。
                      </p>
                    )
                  },
                  {
                    id: 'workorder',
                    content: (
                      <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-lg">
                        实现工单的自动生成、实时监控和质量管理，<br />
                        
                        <span className="text-blue-600 font-semibold">并根据缺陷数据自动优化</span>
                       
                      </p>
                    )
                  }
                ].map((item, index) => (
                  <div
                    key={item.id}
                    className={`absolute top-0 left-0 w-full transition-all duration-1000 ${
                      currentSlide === index 
                        ? 'opacity-100 transform translate-y-0' 
                        : 'opacity-0 transform translate-y-8'
                    }`}
                  >
                    {item.content}
                  </div>
                ))}
              </div>
            </div>

            {/* 切换指示器 */}
            <div className="flex justify-center gap-2 mt-4">
              {[0, 1].map((index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index 
                      ? 'bg-blue-600 w-6' 
                      : 'bg-gray-300'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>

            {/* 按钮组 - 添加切换效果 */}
            <div className="relative h-24 mt-12"> {/* 增加固定高度容器 */}
              <div className={`absolute w-full transition-all duration-1000 ${
                currentSlide === 0 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform translate-y-8'
              }`}>
                <div className="flex justify-center gap-6">
                  <button 
                    onClick={() => scrollToSection('ai-platform')}
                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl flex items-center gap-2 overflow-hidden transition-all hover:shadow-lg hover:shadow-blue-500/30"
                  >
                    <span className="relative z-10">探索AI缺陷识别</span>
                    <svg className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                  <button 
                    onClick={() => openModal('立即咨询')}
                    className="group px-8 py-4 border border-gray-200 hover:border-blue-200 rounded-xl flex items-center gap-2 transition-all hover:shadow-lg"
                  >
                    立即咨询
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className={`absolute w-full transition-all duration-1000 ${
                currentSlide === 1 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform translate-y-8'
              }`}>
                <div className="flex justify-center gap-6">
                  <button 
                    onClick={() => scrollToSection('workorder-solution')}
                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl flex items-center gap-2 overflow-hidden transition-all hover:shadow-lg hover:shadow-blue-500/30"
                  >
                    <span className="relative z-10">探索智能工单</span>
                    <svg className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                  <button 
                    onClick={() => openModal('立即咨询')}
                    className="group px-8 py-4 border border-gray-200 hover:border-blue-200 rounded-xl flex items-center gap-2 transition-all hover:shadow-lg"
                  >
                    立即咨询
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 数据统计 */}
        <section className="w-full bg-gradient-to-b from-gray-50 via-white to-gray-50 py-20">
          <FadeInSection className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center p-8 bg-white rounded-lg shadow-sm">
                <div className="text-4xl font-bold text-blue-600 mb-2">95%+</div>
                <div className="text-gray-600">识别准确率</div>
              </div>
              <div className="text-center p-8 bg-white rounded-lg shadow-sm">
                <div className="text-4xl font-bold text-blue-600 mb-2">400%+</div>
                <div className="text-gray-600">工效提升</div>
              </div>
              <div className="text-center p-8 bg-white rounded-lg shadow-sm">
                <div className="text-4xl font-bold text-blue-600 mb-2">30+</div>
                <div className="text-gray-600">缺陷类型</div>
              </div>
            </div>
          </FadeInSection>
        </section>

        {/* 物业管理痛点 */}
        <section className="w-full bg-gradient-to-b from-gray-50 via-white to-gray-100 py-20">
          <FadeInSection className="max-w-6xl mx-auto px-4">
            <div className="text-center mt-32 relative">
              {/* 背景装饰 */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px]" />
                <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[80px]" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[90px]" />
              </div>

              <h2 className="text-4xl font-bold mb-4">物业管理的两大痛点</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mb-12 rounded-full" />

              <div className="grid grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* 痛点1 */}
                <div className="group relative h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl transition-all duration-300 group-hover:scale-105" />
                  <div className="relative h-full p-8 backdrop-blur-sm bg-white/80 rounded-2xl border border-white/20 shadow-lg transition-all duration-300 hover:transform hover:-translate-y-1">
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 relative mb-6">
                        {/* 外圈动态光环 */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse opacity-20" />
                        {/* 内圈图标背景 */}
                        <div className="absolute inset-2 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center">
                          <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
                            />
                          </svg>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                        信息不透明，监管难度高
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        传统物业管理模式下，信息收集和传递存在滞后性，
                        管理层难以及时掌握现场情况，影响决策效率和服务质量。
                      </p>
                    </div>
                  </div>
                </div>

                {/* 痛点2 */}
                <div className="group relative h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl transition-all duration-300 group-hover:scale-105" />
                  <div className="relative h-full p-8 backdrop-blur-sm bg-white/80 rounded-2xl border border-white/20 shadow-lg transition-all duration-300 hover:transform hover:-translate-y-1">
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 relative mb-6">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-pulse opacity-20" />
                        <div className="absolute inset-2 bg-gradient-to-br from-cyan-100 to-cyan-50 rounded-full flex items-center justify-center">
                          <svg className="w-10 h-10 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
                              />
                          </svg>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                        服务不专业，管理效率低
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        物业企业服务缺乏专业性和精准性，人工巡检效率低下，
                        无法及时发现和处理问题，导致管理效率和服务质量难以提升。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>
        </section>

        {/* 睿单解决方案 */}
        <section id="solutions" className="w-full bg-gradient-to-b from-gray-100 via-white to-gray-50 py-20 scroll-mt-16">
          {/* 背景装饰 */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-[800px] h-[600px] bg-gradient-to-br from-blue-50 to-purple-50 rounded-full opacity-40 blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-cyan-50 to-blue-50 rounded-full opacity-30 blur-3xl" />
          </div>

          {/* 标题 */}
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">解决方案</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full" />
          </div>

          {/* AI驱动的物业管理数字化平台 */}
          <div id="ai-platform" className="mb-32 scroll-mt-16">
            <div className="text-center mb-12">
              <p className="text-gray-600 mb-6">探索我们如何通过AI技术为各种项目提供创新解决方案</p>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI驱动的物业管理数字化平台
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  title: "Web GIS 缺陷可视化分析",
                  desc: "通过Web GIS技术对小区进行建模，并对缺陷数据进行可视化分析。",
                  image: "/1.jpg"
                },
                {
                  title: "视觉三维重建",
                  desc: "以先进的视觉三维重建技术，对视频中的缺陷进行定位。",
                  image: "/2.jpg"
                },
                {
                  title: "AI识别缺陷",
                  desc: "利用AI预测分析，不耗时省时间，更加观察更实，没有人为倾向性。",
                  image: "/3.jpg"
                },
                {
                  title: "精准作业日历",
                  desc: "基于缺陷数据，自动生成精准的作业指令日历，替代原有的固化体系作业要求。",
                  image: "/4.jpg"
                },
                {
                  title: "AI质检",
                  desc: "通过人工智能大模型对作业后的照片进行缺陷识别，确保问题得到解决。",
                  image: "/5.jpg"
                },
                {
                  title: "详细缺陷报告",
                  desc: "全面、详实的照片存证，包含每一项识别出的缺陷、位置及设施设备信息。",
                  image: "/6.jpg"
                }
              ].map((item, index) => (
                <FadeInStagger key={index} index={index}>
                  <div className="group relative bg-gradient-to-br from-blue-900/5 to-purple-900/5 rounded-2xl overflow-hidden backdrop-blur-sm border border-white/10">
                    {/* 科技感装饰 */}
                    <div className="absolute inset-0">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      {/* 扫描线动画 */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/10 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-2000 ease-in-out" />
                      {/* 边框动画 */}
                      <div className="absolute top-0 left-0 w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                      <div className="absolute bottom-0 right-0 w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 transform translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                    </div>

                    {/* 图片容器 */}
                    <div 
                      className="aspect-[4/3] overflow-hidden cursor-zoom-in relative"
                      onClick={() => setSelectedImage(item.image)}
        >
          <Image
                        src={item.image}
                        alt={item.title}
                        width={600}
                        height={450}
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* 科技感遮罩 */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* 点击查看提示 */}
                      <div className="absolute bottom-4 right-4 flex items-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-sm font-medium">查看详情</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>

                      {/* 扫描线效果 */}
                      <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent top-0 animate-scan" />
                      </div>
                    </div>

                    {/* 内容区域 */}
                    <div className="relative p-6 bg-gradient-to-b from-transparent to-white/5">
                      <div className="relative z-10">
                        <h4 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                          {item.title}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeInStagger>
              ))}
            </div>
          </div>

          {/* 360°视频人工智能巡检解决方案 */}
          <FadeInSection>
            <div className="mb-32">
              {/* 方案标题 */}
              <div className="flex items-center justify-center gap-4 mb-12">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  360°视频人工智能巡检
                </h3>
              </div>

              {/* 主要特点 */}
              <div className="max-w-4xl mx-auto mb-20">
                <div className="grid grid-cols-2 gap-8">
                  {[
                    "360°视频拍摄，覆盖上、下、前后左右六个面，无死角",
                    "AI自动识别30+种缺陷，支持自定义训练",
                    "自动生成空间、设施设备及缺陷报告，时间轴缺陷比对",
                    "Web GIS建模支持3D可视化缺陷分析",
                    "100%空间覆盖，95%+识别准确率，400%+工效提升"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start gap-4 p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-blue-100/20 shadow-sm">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 视觉缺陷评估流程 */}
              <div className="relative py-20 px-4">
                <div className="text-center mb-16">
                  <h4 className="text-2xl font-bold mb-4">视觉缺陷评估流程</h4>
                  <p className="text-gray-600">通过先进的AI技术，全面无死角发现物业缺陷</p>
                </div>

                <div className="max-w-6xl mx-auto">
                  <div className="relative flex justify-between items-start">
                    {/* 连接线 */}
                    <div className="absolute top-24 left-0 w-full h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-cyan-200 -z-10" />
                    
                    {/* 步骤1-3 */}
                    {[
                      {
                        title: "360°摄像头拍摄小区所有空间",
                        desc: "同时覆盖拍摄者前后左右天地六个面，无主观遗漏。以10万平方米建筑面积小区为例，拍摄大约需要8小时。",
                        gradient: "from-blue-500 to-purple-500",
                        textGradient: "from-blue-600 to-purple-600"
                      },
                      {
                        title: "AI模型识别缺陷",
                        desc: "根据预先训练的物业管理保洁、秩序、绿化缺陷特征，自动识别视频中的缺陷及相关设施设备、位置。",
                        gradient: "from-purple-500 to-blue-500",
                        textGradient: "from-purple-600 to-blue-600"
                      },
                      {
                        title: "输入缺陷报告",
                        desc: "包含每一项识别出的缺陷、位置、设施设备及照片存证，供服务评估和改进分析。一个20年的小区平均发现1500处缺陷。",
                        gradient: "from-blue-500 to-cyan-500",
                        textGradient: "from-blue-600 to-cyan-600"
                      }
                    ].map((step, index) => (
                      <div key={index} className="w-[32%] group">
                        <div className="relative">
                          <div className={`w-12 h-12 mx-auto mb-8 bg-gradient-to-r ${step.gradient} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                            {index + 1}
                          </div>
                          <div className="p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-blue-100/20 shadow-lg transition-all duration-300 group-hover:translate-y-[-4px]">
                            <h5 className={`text-xl font-bold mb-4 bg-gradient-to-r ${step.textGradient} bg-clip-text text-transparent`}>
                              {step.title}
                            </h5>
                            <p className="text-gray-600 leading-relaxed">
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>

          {/* 常见缺陷示例 */}
          <div className="mt-20">
            <div className="text-center mb-16">
              <h4 className="text-4xl font-bold mb-4">发现问题，才能解决</h4>
              <p className="text-gray-600 text-lg mb-8">常见缺陷识别示例</p>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-2 gap-12 max-w-6xl mx-auto">
              {[
                {
                  image: "/defect1.jpg",
                  title: "灭火器-缺陷",
                  desc: "地面-污渍"
                },
                {
                  image: "/defect2.jpg",
                  title: "天花-破损、污渍、配电箱-电线裸露、消火栓-破损",
                  desc: "管井门未紧闭、污渍、占用-占用灭火"
                },
                {
                  image: "/defect3.jpg",
                  title: "安全出口指示牌-功能失效",
                  desc: "防火门未紧闭、走廊-占用"
                },
                {
                  image: "/defect4.jpg",
                  title: "照明灯-破损、功能失效",
                  desc: "天花-污渍、墙面-污渍、窗户-污渍、防火门-破损"
                }
              ].map((item, index) => (
                <FadeInStagger key={index} index={index}>
                  <div className="group relative bg-gradient-to-br from-blue-900/5 to-purple-900/5 rounded-2xl overflow-hidden backdrop-blur-sm border border-white/10">
                    {/* 科技感装饰 */}
                    <div className="absolute inset-0">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute top-0 left-0 w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                      <div className="absolute bottom-0 right-0 w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 transform translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                    </div>

                    {/* 图片容器 */}
                    <div className="aspect-[16/9] overflow-hidden cursor-pointer"
                         onClick={() => setSelectedImage(item.image)}>
          <Image
                        src={item.image}
                        alt={item.title}
                        width={800}
                        height={450}
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* 缺陷标记 */}
                      <div className="absolute top-4 right-4 flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        <div className="px-3 py-1 bg-gradient-to-r from-red-500/80 to-purple-500/80 backdrop-blur-sm rounded-full">
                          <span className="text-sm font-medium text-white">已识别缺陷</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* 内容区域 */}
                    <div className="relative p-8">
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                          <h5 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {item.title}
                          </h5>
                        </div>
                        {item.desc && (
                          <p className="text-gray-600 text-sm leading-relaxed pl-5">
                            {item.desc}
                          </p>
                        )}
                      </div>
                      
                      {/* 点击查看提示 */}
                      <div className="absolute bottom-4 right-4 flex items-center gap-2 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-sm">点击查看详情</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </FadeInStagger>
              ))}
            </div>
          </div>

          {/* 智能工单调度引擎解决方案 */}
          <div id="workorder-solution" className="scroll-mt-16 mt-32 relative bg-gradient-to-b from-gray-50 to-white py-20">
            {/* 背景装饰 */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute w-full h-[800px] bg-gradient-to-b from-blue-50/50 via-white to-transparent" />
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/20 rounded-full blur-[100px]" />
              <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-100/20 rounded-full blur-[80px]" />
            </div>

            {/* 标题和产品介绍 */}
            <div className="max-w-6xl mx-auto text-center mb-20">
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                  智能工单调度引擎
                </h2>
              </div>
              <p className="text-gray-600 text-lg mb-16 max-w-3xl mx-auto">
                通过高单平台，体验从缺陷、工单、质检的全数字化运营管理流程
              </p>

              {/* 主要特点 */}
              <div className="grid grid-cols-2 gap-8 mt-16">
                {[
                  "根据空间、损耗及缺陷数据由人工智能自动化生成精准作业指令",
                  "覆盖工单生成、调度、执行、质检全流程，由人工智能根据图片进行自动质检",
                  "根据财务和运营数据自动优化，全面数据分析报告",
                  "员工有效工时提升100%+（以保洁为例），作业对象覆盖率提升200%+"
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-4 p-6 bg-white rounded-xl border border-gray-100 shadow-sm
                    hover:shadow-lg hover:border-blue-100 transition-all duration-300 group">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-600 group-hover:text-gray-900 transition-colors">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 工单流程图 */}
            <div className="mt-24">
              <div className="text-center mb-12">
                <h3 className="text-2xl font-bold mb-4">智能生成工单</h3>
                <p className="text-gray-600 mb-6">
                  通过睿单平台，体验从缺陷、工单、质检的全数字化运营管理流程
                </p>
                <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full" />
              </div>

              <div className="relative max-w-6xl mx-auto px-8">
                {/* 连接线 */}
                <div className="absolute top-[120px] left-[100px] right-[100px] h-2">
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-200 via-blue-300 to-cyan-200 rounded-full" />
                    {/* 装饰点 */}
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div 
                        key={i}
                        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-blue-500"
                        style={{ left: `${i * 25}%` }}
                      />
                    ))}
                  </div>
                </div>
                
                {/* 流程步骤 */}
                <div className="grid grid-cols-5 gap-6">
                  {[
                    {
                      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
                      title: "缺陷清单",
                      desc: "利用AI技术自动识别并归纳记录各类设施设备缺陷"
                    },
                    {
                      icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
                      title: "生成作业日历",
                      desc: "根据缺陷类型和优先级，自动生成作业日历"
                    },
                    {
                      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
                      title: "创建工单",
                      desc: "快速生成工单，自动分配至相关团队，确保高效执行"
                    },
                    {
                      icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                      title: "质检审核",
                      desc: "完成作业后进行质检审核，确保所有问题得到解决"
                    },
                    {
                      icon: "M13 10V3L4 14h7v7l9-11h-7z",
                      title: "优化提效",
                      desc: "AI动态优化工单频次、流程及人力配置，提升作业效率"
                    }
                  ].map((item, index) => (
                    <FadeInStagger key={index} index={index}>
                      <div className="group relative pt-8">
                        {/* 序号标识 */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl transition-all duration-300 group-hover:scale-105" />
                        <div className="relative p-6 min-h-[240px] flex flex-col">
                          <div className="w-14 h-14 mb-6 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                            </svg>
                          </div>
                          <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-3">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed flex-1">{item.desc}</p>
                          {/* 底部装饰线 */}
                          <div className="absolute bottom-0 left-4 right-4 h-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full" />
                        </div>
                      </div>
                    </FadeInStagger>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 我们的核心优势 */}
        <section className="w-full bg-gradient-to-b from-gray-50 via-white to-gray-100 py-20">
          {/* 背景装饰 */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px]" />
          </div>

          {/* 标题 */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">我们的核心优势</h2>
            <p className="text-gray-600 text-lg mb-8">
              作为物业管理领域的创新者，我们的产品在AI技术应用上具有显著优势，以下是我们的核心技术能力展示：
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
          </div>

          {/* 核心优势展示 */}
          <div className="grid grid-cols-3 gap-8 max-w-6xl mx-auto px-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253" />
                  </svg>
                ),
                title: "行业知识丰富",
                desc: "创始人团队在IT和物业管理领域各十余年从业经验，对物业管理业务有深刻认识。"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
                title: "从客户需求和痛点出发",
                desc: "从业务会无法获取数据和有效收管理服务，物业管理人治两个核心痛点出发，设计整个平台应用架构。"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                title: "技术应用先进",
                desc: "深入全面应用领先的人工智能、机器视觉技术。"
              }
            ].map((item, index) => (
              <FadeInStagger key={index} index={index}>
                <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-blue-500/5">
                  {/* 图标 */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white mb-6 transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg">
                    <div className="relative">
                      {item.icon}
                      <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    </div>
                  </div>
                  
                  {/* 标题和描述 */}
                  <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                  
                  {/* 底部装饰线 */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden rounded-b-2xl">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </div>
                </div>
              </FadeInStagger>
            ))}
          </div>
        </section>

        {/* 睿单如何为您服务 */}
        <section className="w-full bg-gradient-to-b from-gray-100 via-white to-gray-50 py-20">
          {/* 背景装饰 */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-100/20 rounded-full mix-blend-multiply blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-100/20 rounded-full mix-blend-multiply blur-3xl" />
          </div>

          {/* 标题 */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">睿单如何为您服务</h2>
            <p className="text-gray-600 text-lg mb-8">
              了解我们如何通过智能化手段优化您的物业管理流程，提升整体服务质量。
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full" />
          </div>

          {/* 服务步骤 */}
          <div className="relative flex justify-between items-start max-w-6xl mx-auto px-8">
            {/* 连接线 */}
            <div className="absolute top-[88px] left-[180px] right-[180px] h-[2px]">
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-blue-600/30 to-blue-500/30" />
                {/* 装饰点 */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-md" />
                <div className="absolute left-1/2 top-1/2 -translate-y-1/2 w-3 h-3 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full shadow-md" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-md" />
              </div>
            </div>

            {[
              {
                step: "STEP 1",
                title: "添加物业信息",
                desc: "输入您的物业信息，并留下联系方式。",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                )
              },
              {
                step: "STEP 2",
                title: "线上签约",
                desc: "线上签订服务合同，约定拍摄时间。",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                )
              },
              {
                step: "STEP 3",
                title: "输出报告",
                desc: "完成拍摄，数据处理，输出缺陷详情报告。",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                )
              }
            ].map((item, index) => (
              <FadeInStagger key={index} index={index}>
                <div className="group relative w-[300px]">
                  {/* 步骤图标 */}
                  <div className="relative mb-8">
                    <div className="w-20 h-20 mx-auto relative">
                      {/* 图标容器 */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg flex items-center justify-center text-white transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-blue-500/25">
                        {item.icon}
                        {/* 光晕效果 */}
                        <div className="absolute inset-0 rounded-2xl bg-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                      </div>
                    </div>
                  </div>

                  {/* 步骤标识 */}
                  <div className="text-center mb-4">
                    <span className="inline-block px-4 py-1.5 bg-blue-500 text-white rounded-full text-sm font-medium shadow-sm transform transition-transform duration-300 group-hover:scale-105 group-hover:shadow-md">
                      {item.step}
                    </span>
                  </div>

                  {/* 内容 */}
                  <div className="text-center relative p-6 rounded-xl bg-white/60 backdrop-blur-sm transition-all duration-300 group-hover:bg-white group-hover:shadow-xl group-hover:shadow-blue-500/5">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">
                      {item.desc}
                    </p>
                    
                    {/* 装饰边框 */}
                    <div className="absolute inset-0 rounded-xl border border-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </FadeInStagger>
            ))}
          </div>
        </section>

        {/* 常见问题解答 */}
        <section className="w-full bg-gradient-to-b from-gray-50 via-white to-gray-100 py-20">
          {/* 背景装饰 */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-[800px] h-[600px] bg-gradient-to-br from-blue-50 to-purple-50 rounded-full opacity-40 blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-cyan-50 to-blue-50 rounded-full opacity-30 blur-3xl" />
          </div>

          {/* 标题 */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">常见问题解答</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full" />
          </div>

          {/* 问答列表 */}
          <div className="max-w-4xl mx-auto px-8">
            <div className="grid gap-8">
              {[
                {
                  question: "什么时候需要缺陷评估?",
                  answer: "物业公司更替、接管，业委会需要评估物业服务质量时可以安排进行，可以安排单次，也可以周期进行，如双月，以收集缺陷动态数据。"
                },
                {
                  question: "除了软件平台之外，是否还提供其它服务？",
                  answer: "我们和代理商一起提供数字化运营的顾问导入服务，包括商议、作业计划、人员绩效管理、工具工艺的优化等顾问。"
                },
                {
                  question: "价格是如何确定的？",
                  answer: "缺陷评估的价格是根据小区的建筑面积进行计算的，具体根据请联系我们的代理或销售团队。"
                },
                {
                  question: "业委会或物业公司可以自行组织视频拍摄吗？",
                  answer: "不行，为了保证检查的完整客观性，由我们的代理商统一安排专业人员进行拍摄。"
                },
                {
                  question: "是否有成为代理经销商的方式？",
                  answer: "是的，我们欢迎有兴趣的合作伙伴加入我们的代理计划。"
                },
                {
                  question: "缺陷评估之前，需要做哪些准备工作？",
                  answer: "提供小区的平面图，单元及所对应的楼层数量清单，拍摄时，需要拍摄人员提供公共区域的通行门禁。"
                }
              ].map((item, index) => (
                <FadeInStagger key={index} index={index}>
                  <div className="group relative">
                    {/* 问答卡片 */}
                    <div className="relative p-8 bg-white/60 backdrop-blur-sm rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5">
                      {/* 问题 */}
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm flex items-center justify-center">
                          Q
                        </span>
                        {item.question}
                      </h3>
                      
                      {/* 答案 */}
                      <div className="pl-11">
                        <p className="text-gray-600 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>

                      {/* 装饰边框 */}
                      <div className="absolute inset-0 rounded-2xl border border-blue-100/50 transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
                    </div>
                  </div>
                </FadeInStagger>
              ))}
            </div>
          </div>
        </section>

        {/* 产品报价单 */}
        <section className="w-full bg-gradient-to-b from-gray-100 via-white to-gray-50 py-20">
          {/* 背景装饰 */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-0 right-1/4 w-[800px] h-[600px] bg-gradient-to-br from-blue-50 to-cyan-50 rounded-full opacity-30 blur-3xl" />
            <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-purple-50 to-blue-50 rounded-full opacity-30 blur-3xl" />
          </div>

          {/* 标题 */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">产品报价</h2>
            <p className="text-gray-600 text-lg">选择最适合您的解决方案</p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full mt-6" />
          </div>

          {/* 产品列表 */}
          <div className="grid grid-cols-4 gap-8 max-w-[1400px] mx-auto px-8">
            {[
              {
                title: "360视频人工智能巡检",
                forUsers: "业主、业委会、物业公司",
                price: "0.1元/平方米/次",
                canPurchaseAlone: "是",
                features: [
                  "建筑物及附属设施设备运行状态评估",
                  "物业管理服务监管",
                  "支撑制定作业计划",
                  "空间覆盖率100%",
                  "工效比人工巡检提升400%+",
                  "识别准确率95%",
                  "可以自动识别30+种视觉缺陷",
                  "360视频中的缺陷/设施设备类型识别",
                  "缺陷报告及数据分析"
                ],
                priceDetails: [
                  "包含现场视频采集录制",
                  "深圳以外地区差旅费实报实销"
                ]
              },
              {
                title: "智能工单洞察引擎",
                forUsers: "物业公司，业主（自管）",
                price: "20,000元/项目/年",
                canPurchaseAlone: "是",
                features: [
                  "精准作业，降本增效",
                  "作业信息向业主、业委会透明",
                  "员工有效工时提升100%+（以保洁为例）",
                  "作业对象覆盖率提升200%+（以保洁为例）",
                  "整体作业有效性提升100%+",
                  "自动制定作业计划",
                  "员工资源管理，排班",
                  "工单调度及监控",
                  "AI质检和绩效",
                  "作业数据公开"
                ],
                priceDetails: ["不限制用户数"]
              },
              {
                title: "Web GIS 三维建模",
                forUsers: "业主、业委会、物业公司",
                price: "1元/平方米",
                priceNote: "一次性收取",
                canPurchaseAlone: "否",
                features: [
                  "工单、缺陷、空间数据的三维可视化",
                  "建模成本是传统BIM的25%",
                  "通过CAD图纸，完成主建及部分消防、电梯设施设备建模",
                  "缺陷、工单、设施设备在Web GIS上的可视化查询",
                  "时间变化趋势分析"
                ],
                priceDetails: ["与智能工单洞察引擎同期提供数据云计算服务"]
              },
              {
                title: "顾问服务",
                forUsers: "物业公司",
                price: "5000元/天",
                canPurchaseAlone: "否",
                features: [
                  "工单落地顾问：人机料法环测（5M1E）",
                  "数字化运营顾问导入服务",
                  "包括商议、作业计划",
                  "人员绩效管理",
                  "工具工艺的优化等顾问"
                ],
                priceDetails: ["差旅费实报实销"]
              }
            ].map((plan, index) => (
              <FadeInStagger key={index} index={index}>
                <div className="group relative transform transition-all duration-300 ease-out">
                  <div className="relative p-8 rounded-2xl bg-white shadow-lg transition-all duration-300 
                    group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-blue-700 
                    group-hover:text-white group-hover:scale-[1.02] group-hover:z-10 
                    group-hover:shadow-xl group-hover:shadow-blue-500/20">
                    
                    {/* 标题和价格 */}
                    <div className="text-center mb-8">
                      <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-white">
                        {plan.title}
                      </h3>
                      <div className="text-sm text-gray-600 group-hover:text-blue-100 mb-4">
                        适用于：{plan.forUsers}
                      </div>
                      <div className="text-3xl font-bold text-blue-600 group-hover:text-white">
                        {plan.price}
                      </div>
                      {plan.priceNote && (
                        <div className="text-sm text-gray-500 group-hover:text-blue-100 mt-1">
                          {plan.priceNote}
                        </div>
                      )}
                    </div>

                    {/* 功能列表 */}
                    <div className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-500 group-hover:text-blue-200" 
                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-600 group-hover:text-blue-50">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* 底部信息 */}
                    <div className="space-y-4">
                      <div className="text-sm text-gray-500 group-hover:text-blue-100 pb-4 border-t border-gray-100 group-hover:border-blue-500/30">
                        是否可独立采购：{plan.canPurchaseAlone}
                      </div>
                      {plan.priceDetails.length > 0 && (
                        <div className="space-y-2 text-sm">
                          {plan.priceDetails.map((detail, i) => (
                            <div key={i} className="text-gray-600 group-hover:text-blue-50">
                              • {detail}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </FadeInStagger>
            ))}
          </div>
        </section>
      </main>

      {/* 图片查看器 */}
      <ImageViewer
        isOpen={!!selectedImage}
        imageUrl={selectedImage || ''}
        onClose={() => setSelectedImage(null)}
      />

      {/* 联系表单模态框 */}
      <ContactFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
      />

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
          
          {/* 版权信息 */}
          <div className="text-center text-sm text-white/60 space-y-2 pt-8 border-t border-white/10">
            <p>© 维珍（深圳）数据技术有限公司 2025，保留所有权利。</p>
            <p>
              <a 
                href="https://beian.miit.gov.cn/" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/80 transition-colors"
              >
                粤ICP备18017068号-4
              </a>
            </p>
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
