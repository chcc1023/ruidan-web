import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import ContactFormModal from '@/components/ContactFormModal';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export default function Research() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('立即咨询');

  const openModal = (title: string) => {
    setModalTitle(title);
    setIsModalOpen(true);
  };

  return (
    <div className={`${inter.variable} min-h-screen w-full max-w-[100vw] overflow-x-hidden`}>
      <Head>
        <title>智研空间 - 智能研究成果展示平台</title>
        <meta name="description" content="展示基于研究报告分析出的解决方案" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* 导航栏 */}
      <nav className="flex justify-between items-center px-4 py-3 md:py-0 md:h-16 border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
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
            <a href="/research" className="text-gray-900 text-sm hover:text-blue-600 transition-colors">智研空间</a>
            <a href="/about" className="text-gray-600 text-sm hover:text-blue-600 transition-colors">关于我们</a>
            <a href="/partners" className="text-gray-600 text-sm hover:text-blue-600 transition-colors">官方合作伙伴</a>
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

      {/* 主要内容区 */}
      <main>
        {/* 标题区域 */}
        <section className="w-full relative py-16 md:py-20 overflow-hidden">
          {/* 科技感背景装饰 */}
          <div className="absolute inset-0 -z-10">
            {/* 主要背景渐变 */}
            <div className="absolute inset-0 bg-gradient-to-b from-white to-blue-50/30" />
            
            {/* 3D装饰元素 */}
            <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-cyan-100/30 rounded-full blur-[80px] animate-pulse" />
            <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-purple-100/20 rounded-full blur-[60px]" />
            
            {/* 网格效果 */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />
            
            {/* 科幻AI感元素 - 粒子效果 */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="stars-container w-full h-full">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div 
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-blue-300"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      opacity: Math.random() * 0.5 + 0.2,
                      animation: `twinkle ${Math.random() * 5 + 3}s infinite`
                    }}
                  />
                ))}
              </div>
            </div>
            
            {/* 科幻线条 */}
            <div className="absolute -bottom-5 left-0 w-full h-32 overflow-hidden">
              <svg className="w-full h-full opacity-30" viewBox="0 0 1000 120" preserveAspectRatio="none">
                <path 
                  d="M0,50 C200,20 400,80 600,30 C800,80 1000,10 1000,50 V120 H0 Z" 
                  fill="none" 
                  stroke="url(#gradient)" 
                  strokeWidth="1.5"
                />
                <path 
                  d="M0,70 C150,30 350,90 500,50 C650,10 850,50 1000,40 V120 H0 Z" 
                  fill="none" 
                  stroke="url(#gradient)" 
                  strokeWidth="1"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            
            {/* 浮动几何形状 */}
            <div className="absolute top-1/4 right-1/5 w-16 h-16 border border-blue-200/50 rotate-45 animate-pulse" style={{ animationDuration: '6s' }}></div>
            <div className="absolute bottom-1/4 left-1/5 w-12 h-12 border-2 border-cyan-200/50 rounded-full animate-pulse" style={{ animationDuration: '8s' }}></div>
            <div className="absolute top-1/3 left-1/4 w-8 h-8 border border-dashed border-blue-200/40 rounded-full animate-spin" style={{ animationDuration: '15s' }}></div>
          </div>

          <div className="max-w-6xl mx-auto px-4 text-center relative">
            {/* 玻璃态效果卡片 */}
            <div className="absolute inset-0 -z-10 bg-white/50 backdrop-blur-sm rounded-3xl" />

            {/* 标签 */}
            <div className="inline-block bg-gradient-to-r from-blue-500/10 to-blue-600/10 backdrop-blur-sm px-6 py-2 rounded-full mb-6 border border-blue-200/20">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent font-semibold">
                研究成果展示
              </span>
            </div>

            {/* 主标题和描述文字 */}
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent mb-4 md:mb-6">
              智研空间
            </h1>
            
            <p className="text-gray-600 mx-auto leading-relaxed text-base md:text-lg px-4 mb-6 whitespace-nowrap overflow-visible">
              AI技术驱动研究报告智能解析，打造创新实效解决方案，连接前沿科技与行业应用
            </p>
          </div>
        </section>

        {/* 研究项目列表 */}
        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* AI物业解决方案卡片 - 重新设计 */}
              <Link href="/ai-property-solution" className="block group">
                <div className="h-full relative rounded-2xl overflow-hidden transition-all duration-500 group-hover:shadow-[0_0_25px_5px_rgba(59,130,246,0.2)] border border-blue-100/50 bg-gradient-to-br from-gray-50 via-white to-blue-50">
                  {/* 背景装饰 */}
                  <div className="absolute w-full h-full inset-0 bg-white opacity-80">
                    <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_70%_30%,#3b82f6,transparent)]"></div>
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 rounded-full"></div>
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-500/5 rounded-full"></div>
                    <div className="absolute inset-0 bg-[url('/circuit-pattern.svg')] opacity-[0.03]"></div>
                  </div>

                  {/* 上部装饰 */}
                  <div className="relative h-2 bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400"></div>

                  {/* 卡片内容 */}
                  <div className="relative p-8 z-10">
                    {/* 科技感图标容器 - 替换箭头为抽象网络图 */}
                    <div className="absolute -right-12 -top-12 opacity-10 group-hover:opacity-20 transition-opacity">
                      <svg className="w-64 h-64 text-blue-600" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* 网络节点 */}
                        <circle cx="30" cy="20" r="3" fill="currentColor" />
                        <circle cx="60" cy="15" r="2" fill="currentColor" />
                        <circle cx="75" cy="30" r="3" fill="currentColor" />
                        <circle cx="65" cy="60" r="2.5" fill="currentColor" />
                        <circle cx="35" cy="70" r="3" fill="currentColor" />
                        <circle cx="15" cy="45" r="2" fill="currentColor" />
                        <circle cx="45" cy="40" r="4" fill="currentColor" />
                        <circle cx="80" cy="75" r="2" fill="currentColor" />
                        <circle cx="25" cy="85" r="2.5" fill="currentColor" />
                        <circle cx="50" cy="90" r="2" fill="currentColor" />
                        <circle cx="90" cy="40" r="2.5" fill="currentColor" />
                        
                        {/* 连接线 */}
                        <line x1="30" y1="20" x2="60" y2="15" stroke="currentColor" strokeWidth="0.5" />
                        <line x1="60" y1="15" x2="75" y2="30" stroke="currentColor" strokeWidth="0.5" />
                        <line x1="75" y1="30" x2="90" y2="40" stroke="currentColor" strokeWidth="0.5" />
                        <line x1="75" y1="30" x2="65" y2="60" stroke="currentColor" strokeWidth="0.5" />
                        <line x1="90" y1="40" x2="80" y2="75" stroke="currentColor" strokeWidth="0.5" />
                        <line x1="65" y1="60" x2="80" y2="75" stroke="currentColor" strokeWidth="0.5" />
                        <line x1="65" y1="60" x2="35" y2="70" stroke="currentColor" strokeWidth="0.5" />
                        <line x1="35" y1="70" x2="25" y2="85" stroke="currentColor" strokeWidth="0.5" />
                        <line x1="25" y1="85" x2="50" y2="90" stroke="currentColor" strokeWidth="0.5" />
                        <line x1="35" y1="70" x2="50" y2="90" stroke="currentColor" strokeWidth="0.5" />
                        <line x1="15" y1="45" x2="35" y2="70" stroke="currentColor" strokeWidth="0.5" />
                        <line x1="15" y1="45" x2="30" y2="20" stroke="currentColor" strokeWidth="0.5" />
                        <line x1="30" y1="20" x2="45" y2="40" stroke="currentColor" strokeWidth="0.5" />
                        <line x1="45" y1="40" x2="15" y2="45" stroke="currentColor" strokeWidth="0.5" />
                        <line x1="45" y1="40" x2="65" y2="60" stroke="currentColor" strokeWidth="0.5" />
                        <line x1="45" y1="40" x2="75" y2="30" stroke="currentColor" strokeWidth="0.5" />
                        <line x1="60" y1="15" x2="45" y2="40" stroke="currentColor" strokeWidth="0.5" />
                        
                        {/* 数据流动画效果 */}
                        <circle className="animate-pulse" cx="45" cy="40" r="1.5" fill="currentColor" style={{animationDuration: '3s'}} />
                        <circle className="animate-pulse" cx="65" cy="60" r="1" fill="currentColor" style={{animationDuration: '2.5s', animationDelay: '0.3s'}} />
                        <circle className="animate-pulse" cx="30" cy="20" r="1" fill="currentColor" style={{animationDuration: '4s', animationDelay: '0.7s'}} />
                      </svg>
                    </div>

                    {/* 左边悬浮装饰元素 */}
                    <div className="absolute w-12 h-12 -left-6 top-1/3 rounded-full bg-gradient-to-r from-blue-600/10 to-cyan-600/10 backdrop-blur-md border border-blue-200/20 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-blue-500/30 animate-pulse"></div>
                    </div>

                    {/* AI图标 */}
                    <div className="flex items-center mb-5">
                      <div className="mr-4 relative w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 p-0.5">
                        <div className="absolute inset-0 rounded-full overflow-hidden">
                          <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_340deg,white_340deg_360deg)] animate-spin" style={{animationDuration: '3s'}}></div>
                        </div>
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <span className="text-xs font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent uppercase tracking-wider">AI驱动解决方案</span>
                        <div className="h-0.5 w-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                      </div>
                    </div>

                    {/* 标题和描述 */}
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                      AI驱动的建筑物缺陷管理与<br className="hidden md:block" />物业作业优化系统
                    </h3>
                    <p className="text-gray-600 mb-5 line-clamp-3">基于人工智能的建筑物缺陷报告分析与物业管理作业计划优化解决方案，实现工单的自动生成、实时监控和质量管理。</p>
                    
                    {/* 标签 */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      <span className="text-xs font-medium bg-blue-50 text-blue-600 rounded-full px-3 py-1 border border-blue-100 flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5"></span>
                        人工智能
                      </span>
                      <span className="text-xs font-medium bg-green-50 text-green-600 rounded-full px-3 py-1 border border-green-100 flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>
                        物业管理
                      </span>
                      <span className="text-xs font-medium bg-purple-50 text-purple-600 rounded-full px-3 py-1 border border-purple-100 flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-1.5"></span>
                        智能优化
                      </span>
                    </div>
                    
                    {/* 查看详情按钮 */}
                    <div className="relative overflow-hidden">
                      <div className="block w-full text-center py-2.5 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl transition-transform group-hover:translate-y-[-2px] shadow-lg shadow-blue-600/20 group-hover:shadow-blue-600/30">
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          查看详情
                          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </span>
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-700 to-blue-800 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                    </div>
                    
                    {/* 装饰元素 - 右下浮动点 */}
                    <div className="absolute bottom-8 right-8 flex space-x-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse delay-100"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse delay-200"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse delay-300"></div>
                    </div>
                  </div>
                </div>
              </Link>

              {/* 预留卡片位置 - 重新设计 */}
              <div className="h-full relative rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-md border border-blue-100/30 bg-gradient-to-br from-gray-50 to-gray-100">
                {/* 背景装饰 */}
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]"></div>
                  <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_30%_20%,#6b7280,transparent)]"></div>
                </div>

                {/* 上部装饰 */}
                <div className="relative h-2 bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 opacity-30"></div>

                {/* 卡片内容 */}
                <div className="relative p-8 z-10 flex flex-col items-center justify-center h-[calc(100%-8px)] text-center">
                  {/* 动态圆环 */}
                  <div className="relative w-24 h-24 mb-6">
                    <div className="absolute inset-0 rounded-full border-2 border-gray-200 opacity-20"></div>
                    <div className="absolute inset-0 rounded-full border-2 border-t-blue-300 border-r-transparent border-b-transparent border-l-transparent animate-spin" style={{animationDuration: '3s'}}></div>
                    <div className="absolute inset-4 rounded-full border-2 border-dashed border-gray-300 opacity-20"></div>
                    <div className="absolute inset-8 rounded-full bg-white flex items-center justify-center shadow-inner">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-500 mb-3">更多研究项目</h3>
                  <p className="text-gray-400 mb-8">我们的AI研究团队正在探索更多前沿应用<br />敬请期待...</p>
                  
                  {/* 点状装饰 */}
                  <div className="flex items-center space-x-2 mt-4">
                    <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse" style={{animationDelay: '300ms'}}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse" style={{animationDelay: '600ms'}}></div>
                  </div>
                  
                  {/* 装饰元素 - 右下扫描线 */}
                  <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none overflow-hidden">
                    <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-blue-300/30 to-transparent top-0 animate-scanline"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

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

      {/* 联系表单模态框 */}
      <ContactFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={modalTitle}
      />

      {/* 自定义动画 */}
      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes scanline {
          0% { top: 0%; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
} 