import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import ContactFormModal from '@/components/ContactFormModal';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export default function AIPropertySolution() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('立即咨询');
  const [activeTab, setActiveTab] = useState('introduction');
  const [activeFlowchartStep, setActiveFlowchartStep] = useState(0);
  const [activeAlgorithmStep, setActiveAlgorithmStep] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // 处理流程图步骤点击
  const showFlowchartDetail = (index: number) => {
    setActiveFlowchartStep(index);
  };

  // 处理 AI 算法步骤点击
  const showAlgorithmDetail = (index: number) => {
    setActiveAlgorithmStep(index);
  };

  // 处理 tab 切换
  const showTab = (tab: string) => {
    setActiveTab(tab);
  };

  // 处理模块点击
  const toggleModule = (moduleId: string) => {
    const element = document.getElementById(moduleId);
    if (element) {
      element.classList.toggle('active');
    }
  };

  // 处理折叠面板点击
  const toggleAccordion = (accordionId: string) => {
    const element = document.getElementById(accordionId);
    if (element) {
      // 找到父元素并切换active类
      const parentElement = element.closest('.accordion-item');
      if (parentElement) {
        parentElement.classList.toggle('active');
      }
    }
  };

  // 打开标签页
  const openTab = (tabId: string) => {
    setActiveTab(tabId);
  };

  const openModal = (title: string) => {
    setModalTitle(title);
    setIsModalOpen(true);
  };

  // 导航滚动效果
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY - 100;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          const id = section.getAttribute('id');
          if (id) {
            setActiveTab(id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 平滑滚动到指定区域
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80; // 导航栏高度
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // 监听滚动事件，控制返回顶部按钮的显示和隐藏
  useEffect(() => {
    const handleScrollForTopButton = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScrollForTopButton);
    return () => window.removeEventListener('scroll', handleScrollForTopButton);
  }, []);

  // 返回顶部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={`${inter.variable} min-h-screen w-full max-w-[100vw] overflow-x-hidden`}>
      <Head>
        <title>AI驱动的建筑物缺陷管理与物业作业优化系统</title>
        <meta name="description" content="基于人工智能的建筑物缺陷报告分析与物业管理作业计划优化" />
        <link rel="icon" href="/favicon.ico" />
        <style>
          {`
            :root {
              --primary: #3498db;
              --secondary: #2ecc71;
              --tertiary: #e74c3c;
              --accent: #f39c12;
              --dark: #2c3e50;
              --light: #ecf0f1;
              --mid: #95a5a6;
              --shadow: 0 4px 8px rgba(0,0,0,0.1);
              --shadow-hover: 0 8px 16px rgba(0,0,0,0.2);
              --gradient: linear-gradient(135deg, var(--primary), #9b59b6);
            }
            
            .card {
              background-color: white;
              border-radius: 8px;
              box-shadow: var(--shadow);
              padding: 1.5rem;
              margin-bottom: 2rem;
              transition: all 0.3s ease;
            }
            
            .card:hover {
              box-shadow: var(--shadow-hover);
              transform: translateY(-5px);
            }
            
            .card-icon {
              font-size: 2.5rem;
              margin-bottom: 1rem;
              color: var(--primary);
            }
            
            .grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
              gap: 2rem;
              margin: 2rem 0;
            }
            
            .tab-container {
              margin: 2rem 0;
            }
            
            .tabs {
              display: flex;
              flex-wrap: wrap;
              gap: 0.5rem;
              margin-bottom: 1rem;
            }
            
            .tab-btn {
              padding: 0.75rem 1.5rem;
              background-color: var(--light);
              border: none;
              border-radius: 4px;
              cursor: pointer;
              font-weight: 500;
              transition: all 0.3s ease;
            }
            
            .tab-btn:hover {
              background-color: #dfe6e9;
            }
            
            .tab-btn.active {
              background-color: var(--primary);
              color: white;
            }
            
            .tab-content {
              background-color: white;
              padding: 2rem;
              border-radius: 8px;
              box-shadow: var(--shadow);
            }
            
            .tab-content.active {
              display: block;
            }
            
            /* Flowchart styles */
            .flowchart {
              position: relative;
              margin: 3rem 0;
            }
            
            .flowchart-steps {
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              gap: 1rem;
            }
            
            .flowchart-step {
              flex: 1;
              min-width: 150px;
              max-width: 200px;
              background-color: white;
              padding: 1rem;
              text-align: center;
              border-radius: 8px;
              box-shadow: var(--shadow);
              position: relative;
              z-index: 1;
              cursor: pointer;
              transition: all 0.3s ease;
            }
            
            .flowchart-step:hover {
              box-shadow: var(--shadow-hover);
              transform: translateY(-5px);
            }
            
            .flowchart-step.active {
              background-color: var(--primary);
              color: white;
            }
            
            .flowchart-step-number {
              display: inline-block;
              width: 30px;
              height: 30px;
              background-color: var(--primary);
              color: white;
              border-radius: 50%;
              line-height: 30px;
              text-align: center;
              margin-bottom: 0.5rem;
            }
            
            .flowchart-step.active .flowchart-step-number {
              background-color: white;
              color: var(--primary);
            }
            
            .flowchart-details {
              background-color: white;
              padding: 2rem;
              border-radius: 8px;
              box-shadow: var(--shadow);
              margin-top: 2rem;
            }
            
            .flowchart-detail {
              display: none;
            }
            
            .flowchart-detail.active {
              display: block;
            }
            
            /* Module diagram styles */
            .module-diagram {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 2rem;
              margin: 3rem 0;
            }
            
            .module-item {
              background-color: white;
              padding: 1.5rem;
              border-radius: 8px;
              box-shadow: var(--shadow);
              position: relative;
              transition: all 0.3s ease;
              cursor: pointer;
            }
            
            .module-item:hover {
              box-shadow: var(--shadow-hover);
              transform: translateY(-5px);
            }
            
            .module-item h3 {
              color: var(--primary);
              margin-bottom: 1rem;
            }
            
            .module-icon {
              position: absolute;
              top: 1rem;
              right: 1rem;
              font-size: 2rem;
              color: var(--primary);
              opacity: 0.5;
            }
            
            .module-content {
              display: none;
              margin-top: 1rem;
              padding-top: 1rem;
              border-top: 1px solid var(--light);
            }
            
            .module-item.active .module-content {
              display: block;
            }
            
            /* Comparison chart styles */
            .comparison-chart {
              display: flex;
              flex-wrap: wrap;
              gap: 2rem;
              margin: 3rem 0;
            }
            
            .comparison-column {
              flex: 1;
              min-width: 300px;
              background-color: white;
              border-radius: 8px;
              box-shadow: var(--shadow);
              overflow: hidden;
            }
            
            .comparison-header {
              background-color: var(--primary);
              color: white;
              padding: 1rem;
              text-align: center;
              font-weight: 700;
            }
            
            .comparison-column:nth-child(2) .comparison-header {
              background-color: var(--tertiary);
            }
            
            .comparison-item {
              padding: 1rem;
              border-bottom: 1px solid var(--light);
              display: flex;
              align-items: center;
            }
            
            .comparison-icon {
              margin-right: 1rem;
              color: var(--primary);
              font-size: 1.2rem;
            }
            
            .comparison-column:nth-child(2) .comparison-icon {
              color: var(--tertiary);
            }
            
            /* Accordion styles */
            .accordion {
              margin: 2rem 0;
            }
            
            .accordion-item {
              margin-bottom: 1rem;
              background-color: white;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: var(--shadow);
            }
            
            .accordion-header {
              padding: 1rem;
              background-color: var(--light);
              cursor: pointer;
              font-weight: 500;
              display: flex;
              justify-content: space-between;
              align-items: center;
              transition: all 0.3s ease;
            }
            
            .accordion-header:hover {
              background-color: #dfe6e9;
            }
            
            .accordion-icon {
              font-size: 1.2rem;
              transition: transform 0.3s ease;
            }
            
            .accordion-item.active .accordion-icon {
              transform: rotate(180deg);
            }
            
            .accordion-content {
              padding: 0 1rem;
              max-height: 0;
              overflow: hidden;
              transition: max-height 0.3s ease, padding 0.3s ease;
            }
            
            .accordion-item.active .accordion-content {
              padding: 1rem;
              max-height: 1000px;
            }
            
            /* Benefit-challenge chart */
            .bc-container {
              display: flex;
              flex-wrap: wrap;
              gap: 2rem;
              margin: 2rem 0;
            }
            
            .bc-column {
              flex: 1;
              min-width: 300px;
            }
            
            .bc-item {
              display: flex;
              align-items: flex-start;
              gap: 1rem;
              margin-bottom: 1.5rem;
              padding: 1rem;
              border-radius: 8px;
              background-color: white;
              box-shadow: var(--shadow);
            }
            
            .bc-icon {
              font-size: 1.5rem;
            }
            
            .bc-content h4 {
              font-weight: 600;
              margin-bottom: 0.5rem;
            }
            
            .bc-item.benefit {
              border-left: 4px solid var(--secondary);
            }
            
            .bc-item.challenge {
              border-left: 4px solid var(--tertiary);
            }
          `}
        </style>
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
            <a href="/research" className="text-gray-600 text-sm hover:text-blue-600 transition-colors">智研空间</a>
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
      <div className={`md:hidden fixed z-[9999] left-0 right-0 top-16 overflow-hidden transition-all duration-300 ease-in-out ${
        mobileMenuOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
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

      {/* 标签导航 */}
      <div className="bg-white border-b sticky top-16 z-30">
        <div className="max-w-6xl mx-auto px-4">
          {/* 移动端网格布局导航 */}
          <div className="md:hidden grid grid-cols-3 gap-2 py-2">
            <button 
              onClick={() => scrollToSection('introduction')} 
              className={`tab-btn text-sm px-1 py-2 flex items-center justify-center h-12 ${activeTab === 'introduction' ? 'active' : ''}`}
            >
              引言
            </button>
            <button 
              onClick={() => scrollToSection('core-modules')} 
              className={`tab-btn text-sm px-1 py-2 flex items-center justify-center h-12 ${activeTab === 'core-modules' ? 'active' : ''}`}
            >
              核心模块
            </button>
            <button 
              onClick={() => scrollToSection('workflow')} 
              className={`tab-btn text-sm px-1 py-2 flex items-center justify-center h-12 ${activeTab === 'workflow' ? 'active' : ''}`}
            >
              工作流程
            </button>
            <button 
              onClick={() => scrollToSection('ai-algorithms')} 
              className={`tab-btn text-sm px-1 py-2 flex items-center justify-center h-12 ${activeTab === 'ai-algorithms' ? 'active' : ''}`}
            >
              AI算法
            </button>
            <button 
              onClick={() => scrollToSection('integration')} 
              className={`tab-btn text-sm px-1 py-2 flex items-center justify-center h-12 ${activeTab === 'integration' ? 'active' : ''}`}
            >
              系统集成
            </button>
            <button 
              onClick={() => scrollToSection('implementation')} 
              className={`tab-btn text-sm px-1 py-2 flex items-center justify-center h-12 ${activeTab === 'implementation' ? 'active' : ''}`}
            >
              实施评估
            </button>
            <button 
              onClick={() => scrollToSection('conclusion')} 
              className={`tab-btn text-sm px-1 py-2 flex items-center justify-center h-12 ${activeTab === 'conclusion' ? 'active' : ''}`}
            >
              未来展望
            </button>
          </div>
          
          {/* 桌面端水平导航 */}
          <div className="hidden md:flex md:space-x-4 py-2 overflow-x-auto">
            <button 
              onClick={() => scrollToSection('introduction')} 
              className={`tab-btn whitespace-nowrap ${activeTab === 'introduction' ? 'active' : ''}`}
            >
              引言
            </button>
            <button 
              onClick={() => scrollToSection('core-modules')} 
              className={`tab-btn whitespace-nowrap ${activeTab === 'core-modules' ? 'active' : ''}`}
            >
              核心模块
            </button>
            <button 
              onClick={() => scrollToSection('workflow')} 
              className={`tab-btn whitespace-nowrap ${activeTab === 'workflow' ? 'active' : ''}`}
            >
              工作流程
            </button>
            <button 
              onClick={() => scrollToSection('ai-algorithms')} 
              className={`tab-btn whitespace-nowrap ${activeTab === 'ai-algorithms' ? 'active' : ''}`}
            >
              AI算法
            </button>
            <button 
              onClick={() => scrollToSection('integration')} 
              className={`tab-btn whitespace-nowrap ${activeTab === 'integration' ? 'active' : ''}`}
            >
              系统集成
            </button>
            <button 
              onClick={() => scrollToSection('implementation')} 
              className={`tab-btn whitespace-nowrap ${activeTab === 'implementation' ? 'active' : ''}`}
            >
              实施评估
            </button>
            <button 
              onClick={() => scrollToSection('conclusion')} 
              className={`tab-btn whitespace-nowrap ${activeTab === 'conclusion' ? 'active' : ''}`}
            >
              未来展望
            </button>
          </div>
        </div>
      </div>

      {/* 主要内容区 */}
      <main>
        {/* 英雄区 */}
        <section className="py-16 bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-6">AI驱动的建筑物缺陷管理与物业作业优化系统</h1>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-10">
              从被动响应到主动预测：利用人工智能分析建筑物缺陷报告，优化物业管理作业计划，提高效率并降低成本
            </p>
            <div className="flex justify-center gap-6">
              <a 
                href="#core-modules" 
                className="px-8 py-3 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-colors"
              >
                了解系统模块
              </a>
              <a 
                href="#workflow"
                className="px-8 py-3 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 transition-colors"
              >
                查看实施流程
              </a>
            </div>
          </div>
        </section>

        {/* 引言部分 */}
        <section id="introduction" className="py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl text-blue-500 font-bold mb-6">物业管理的演变与人工智能的作用</h2>
            
            <div className="border-b-4 border-blue-300 mb-10"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-center text-5xl mb-4 text-blue-500">📊</div>
                <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">传统物业管理的挑战</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-gray-600 mr-2">•</span>
                    <span>响应式维护导致延迟</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-600 mr-2">•</span>
                    <span>维修成本增加</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-600 mr-2">•</span>
                    <span>对建筑运营产生负面影响</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-600 mr-2">•</span>
                    <span>传统管理方法应对复杂建筑力不从心</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-center text-5xl mb-4 text-blue-500">🤖</div>
                <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">AI的变革性作用</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-gray-600 mr-2">•</span>
                    <span>重点从被动响应转变为主动预测</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-600 mr-2">•</span>
                    <span>分析缺陷报告、设备参数和环境因素</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-600 mr-2">•</span>
                    <span>预测未来可能出现的问题</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-600 mr-2">•</span>
                    <span>实现更及时、更高效的维护干预</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-center text-5xl mb-4 text-blue-500">💹</div>
                <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">AI应用的主要优势</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-gray-600 mr-2">•</span>
                    <span>显著降低维护成本</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-600 mr-2">•</span>
                    <span>减少设备故障或缺陷导致的运营中断</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-600 mr-2">•</span>
                    <span>提升建筑物的整体性能</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-600 mr-2">•</span>
                    <span>提高居住者的满意度</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 核心模块 */}
        <section id="core-modules" className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl text-blue-500 font-bold mb-6">AI物业管理作业计划生成系统的核心模块</h2>
            
            <div className="border-b-4 border-blue-300 mb-10"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6 relative">
                <div className="text-right mb-4">
                  <span className="text-4xl text-blue-500 float-right">📷</span>
                </div>
                <h3 className="text-2xl text-blue-500 font-bold mb-4">模块1: 智能缺陷数据采集与分析</h3>
                <p className="text-gray-700 mb-4">采集和处理各种来源的建筑物缺陷数据，利用AI技术进行识别和分类</p>
                
                <div className="border-t border-gray-200 my-4"></div>
                
                <h4 className="font-bold mt-6 mb-3">主要功能</h4>
                <ul className="list-disc pl-6 mb-4">
                  <li>采集多源数据（扫描报告、人工检查记录、IoT传感器）</li>
                  <li>数据标准化和预处理</li>
                  <li>利用计算机视觉自动识别图像中的缺陷</li>
                  <li>应用NLP技术提取文本描述中的关键信息</li>
                  <li>区分关键缺陷和非关键缺陷</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 relative">
                <div className="text-right mb-4">
                  <span className="text-4xl text-blue-500 float-right">⚖️</span>
                </div>
                <h3 className="text-2xl text-blue-500 font-bold mb-4">模块2: 基于缺陷属性的动态优先级排序引擎</h3>
                <p className="text-gray-700 mb-4">利用AI算法综合多因素对维护任务进行动态优先级排序</p>
                
                <div className="border-t border-gray-200 my-4"></div>
                
                <h4 className="font-bold mt-6 mb-3">评估因素</h4>
                <ul className="list-disc pl-6 mb-4">
                  <li>缺陷发生的规模和频次</li>
                  <li>缺陷对建筑运营和安全的影响</li>
                  <li>维修成本估算</li>
                  <li>结构完整性和功能影响</li>
                  <li>根据实时数据动态调整优先级</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 relative">
                <div className="text-right mb-4">
                  <span className="text-4xl text-blue-500 float-right">🔄</span>
                </div>
                <h3 className="text-2xl text-blue-500 font-bold mb-4">模块3: AI驱动的作业计划优化与任务分组</h3>
                <p className="text-gray-700 mb-4">优化物业管理作业的分组和安排，提高维护效率</p>
                
                <div className="border-t border-gray-200 my-4"></div>
                
                <h4 className="font-bold mt-6 mb-3">优化策略</h4>
                <ul className="list-disc pl-6 mb-4">
                  <li>将同类型或同空间内的任务集中处理</li>
                  <li>基于设备数据确定最佳维护计划</li>
                  <li>在生产中断最少的时间安排维护任务</li>
                  <li>减少维护人员的差旅时间</li>
                  <li>智能调度资源和部件采购</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 relative">
                <div className="text-right mb-4">
                  <span className="text-4xl text-blue-500 float-right">🗺️</span>
                </div>
                <h3 className="text-2xl text-blue-500 font-bold mb-4">模块4: 利用空间智能实现高效作业调度</h3>
                <p className="text-gray-700 mb-4">将缺陷的空间位置信息融入物业管理作业计划，优化维护路线</p>
                
                <div className="border-t border-gray-200 my-4"></div>
                
                <h4 className="font-bold mt-6 mb-3">空间优化方法</h4>
                <ul className="list-disc pl-6 mb-4">
                  <li>集成地理信息系统(GIS)数据</li>
                  <li>优化维护人员的行动路线</li>
                  <li>最大限度减少出行时间</li>
                  <li>合并地理位置相近的维修任务</li>
                  <li>规划最优维修顺序</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 工作流程 */}
        <section id="workflow" className="py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl text-blue-500 font-bold mb-6">实施AI作业计划生成系统的工作流程</h2>
            
            <div className="border-b-4 border-blue-300 mb-10"></div>
            
            <div className="flowchart">
              <div className="flowchart-steps">
                <div 
                  className={`flowchart-step ${activeFlowchartStep === 0 ? 'active' : ''}`} 
                  onClick={() => showFlowchartDetail(0)}
                >
                  <div className="flowchart-step-number">1</div>
                  <p>数据收集与预处理</p>
                </div>
                
                <div 
                  className={`flowchart-step ${activeFlowchartStep === 1 ? 'active' : ''}`} 
                  onClick={() => showFlowchartDetail(1)}
                >
                  <div className="flowchart-step-number">2</div>
                  <p>AI模型开发与训练</p>
                </div>
                
                <div 
                  className={`flowchart-step ${activeFlowchartStep === 2 ? 'active' : ''}`} 
                  onClick={() => showFlowchartDetail(2)}
                >
                  <div className="flowchart-step-number">3</div>
                  <p>优先级排序算法实施</p>
                </div>
                
                <div 
                  className={`flowchart-step ${activeFlowchartStep === 3 ? 'active' : ''}`} 
                  onClick={() => showFlowchartDetail(3)}
                >
                  <div className="flowchart-step-number">4</div>
                  <p>任务分组与路线优化</p>
                </div>
                
                <div 
                  className={`flowchart-step ${activeFlowchartStep === 4 ? 'active' : ''}`} 
                  onClick={() => showFlowchartDetail(4)}
                >
                  <div className="flowchart-step-number">5</div>
                  <p>系统集成</p>
                </div>
                
                <div 
                  className={`flowchart-step ${activeFlowchartStep === 5 ? 'active' : ''}`} 
                  onClick={() => showFlowchartDetail(5)}
                >
                  <div className="flowchart-step-number">6</div>
                  <p>持续监控与完善</p>
                </div>
              </div>
              
              <div className="flowchart-details">
                <div className={`flowchart-detail ${activeFlowchartStep === 0 ? 'active' : ''}`}>
                  <h3 className="text-xl font-bold text-gray-700 mb-4">步骤1: 缺陷报告的数据收集、集成与预处理</h3>
                  <ul className="list-disc pl-6 mb-4">
                    <li>收集历史和正在生成的缺陷报告</li>
                    <li>整合来自不同渠道的数据（建筑扫描、人工巡检、住户报修、传感器）</li>
                    <li>数据清洗、标准化和格式化</li>
                    <li>确保数据质量，为AI模型提供可靠基础</li>
                  </ul>
                  <div className="mt-4">
                    <svg viewBox="0 0 600 200" className="w-full">
                      <rect x="50" y="50" width="100" height="80" rx="10" fill="#3498db" opacity="0.8"/>
                      <text x="100" y="90" textAnchor="middle" fill="white">建筑扫描</text>
                      
                      <rect x="170" y="50" width="100" height="80" rx="10" fill="#3498db" opacity="0.8"/>
                      <text x="220" y="90" textAnchor="middle" fill="white">人工巡检</text>
                      
                      <rect x="290" y="50" width="100" height="80" rx="10" fill="#3498db" opacity="0.8"/>
                      <text x="340" y="90" textAnchor="middle" fill="white">住户报修</text>
                      
                      <rect x="410" y="50" width="100" height="80" rx="10" fill="#3498db" opacity="0.8"/>
                      <text x="460" y="90" textAnchor="middle" fill="white">IoT传感器</text>
                      
                      <path d="M100,130 L100,165 L300,165 L300,185" fill="none" stroke="#95a5a6" strokeWidth="2"/>
                      <path d="M220,130 L220,150 L300,150 L300,185" fill="none" stroke="#95a5a6" strokeWidth="2"/>
                      <path d="M340,130 L340,150 L300,150 L300,185" fill="none" stroke="#95a5a6" strokeWidth="2"/>
                      <path d="M460,130 L460,165 L300,165 L300,185" fill="none" stroke="#95a5a6" strokeWidth="2"/>
                      
                      <rect x="200" y="185" width="200" height="80" rx="10" fill="#2ecc71" opacity="0.8"/>
                      <text x="300" y="220" textAnchor="middle" fill="white">数据预处理与标准化</text>
                      <text x="300" y="240" textAnchor="middle" fill="white">清洗 → 标准化 → 格式化</text>
                    </svg>
                  </div>
                </div>
                
                <div className={`flowchart-detail ${activeFlowchartStep === 1 ? 'active' : ''}`}>
                  <h3 className="text-xl font-bold text-gray-700 mb-4">步骤2: 开发和训练用于缺陷模式识别与预测的AI模型</h3>
                  <ul className="list-disc pl-6 mb-4">
                    <li>选择合适的AI/ML算法（分类、回归、时间序列分析）</li>
                    <li>使用历史缺陷数据训练模型</li>
                    <li>模型调优，识别缺陷模式并预测未来可能发生的缺陷</li>
                    <li>可使用预训练模型和迁移学习技术加快开发</li>
                    <li>应用深度学习、K-均值聚类、快速傅里叶变换等技术</li>
                  </ul>
                  <div className="mt-4">
                    <svg viewBox="0 0 600 200" className="w-full">
                      <rect x="50" y="60" width="150" height="80" rx="10" fill="#3498db" opacity="0.8"/>
                      <text x="125" y="95" textAnchor="middle" fill="white">历史缺陷数据</text>
                      <text x="125" y="115" textAnchor="middle" fill="white">(训练集)</text>
                      
                      <path d="M200,100 L250,100" fill="none" stroke="#95a5a6" strokeWidth="2" strokeDasharray="5,5"/>
                      <polygon points="250,95 260,100 250,105" fill="#95a5a6"/>
                      
                      <rect x="260" y="60" width="150" height="80" rx="10" fill="#9b59b6" opacity="0.8"/>
                      <text x="335" y="95" textAnchor="middle" fill="white">AI/ML算法训练</text>
                      <text x="335" y="115" textAnchor="middle" fill="white">模型调优</text>
                      
                      <path d="M410,100 L460,100" fill="none" stroke="#95a5a6" strokeWidth="2" strokeDasharray="5,5"/>
                      <polygon points="460,95 470,100 460,105" fill="#95a5a6"/>
                      
                      <rect x="470" y="60" width="150" height="80" rx="10" fill="#2ecc71" opacity="0.8"/>
                      <text x="545" y="95" textAnchor="middle" fill="white">缺陷预测模型</text>
                      <text x="545" y="115" textAnchor="middle" fill="white">部署应用</text>
                    </svg>
                  </div>
                </div>
                
                <div className={`flowchart-detail ${activeFlowchartStep === 2 ? 'active' : ''}`}>
                  <h3 className="text-xl font-bold text-gray-700 mb-4">步骤3: 实施基于影响、频率和成本的优先级排序AI算法</h3>
                  <ul className="list-disc pl-6 mb-4">
                    <li>根据预测影响、发生频率和估计维修成本对缺陷进行评分</li>
                    <li>整合成本估算模型（类比估算、参数估算、自下而上估算）</li>
                    <li>利用成本数据库（如RSMeans）提供参考</li>
                    <li>开发优先级排序框架，根据业务需求调整权重</li>
                    <li>使用高级模型如情感人工神经网络(EANN)预测成本</li>
                  </ul>
                  <div className="mt-4">
                    <svg viewBox="0 0 600 250" className="w-full">
                      <rect x="100" y="30" width="120" height="60" rx="10" fill="#3498db" opacity="0.8"/>
                      <text x="160" y="65" textAnchor="middle" fill="white">影响评估</text>
                      
                      <rect x="240" y="30" width="120" height="60" rx="10" fill="#3498db" opacity="0.8"/>
                      <text x="300" y="65" textAnchor="middle" fill="white">频率分析</text>
                      
                      <rect x="380" y="30" width="120" height="60" rx="10" fill="#3498db" opacity="0.8"/>
                      <text x="440" y="65" textAnchor="middle" fill="white">成本估算</text>
                      
                      <path d="M160,90 L160,125" fill="none" stroke="#95a5a6" strokeWidth="2"/>
                      <path d="M300,90 L300,125" fill="none" stroke="#95a5a6" strokeWidth="2"/>
                      <path d="M440,90 L440,125" fill="none" stroke="#95a5a6" strokeWidth="2"/>
                      
                      <rect x="180" y="125" width="240" height="60" rx="10" fill="#9b59b6" opacity="0.8"/>
                      <text x="300" y="155" textAnchor="middle" fill="white">AI优先级排序算法</text>
                      <text x="300" y="175" textAnchor="middle" fill="white">(可调整权重)</text>
                      
                      <path d="M300,185 L300,210" fill="none" stroke="#95a5a6" strokeWidth="2"/>
                      <polygon points="295,210 300,220 305,210" fill="#95a5a6"/>
                      
                      <rect x="180" y="220" width="240" height="60" rx="10" fill="#2ecc71" opacity="0.8"/>
                      <text x="300" y="250" textAnchor="middle" fill="white">优先级排序结果</text>
                      <text x="300" y="270" textAnchor="middle" fill="white">用于任务调度</text>
                    </svg>
                  </div>
                </div>
                
                <div className={`flowchart-detail ${activeFlowchartStep === 3 ? 'active' : ''}`}>
                  <h3 className="text-xl font-bold text-gray-700 mb-4">步骤4: 利用AI进行任务分组和考虑空间数据的路线优化</h3>
                  <ul className="list-disc pl-6 mb-4">
                    <li>分析已排序缺陷的空间位置</li>
                    <li>将地理位置相近的任务分组到高效的作业工单中</li>
                    <li>应用路线优化算法生成最佳出行路径</li>
                    <li>与调度工具和资源管理系统集成</li>
                    <li>最大限度减少维护人员的移动时间</li>
                  </ul>
                  <div className="mt-4">
                    <svg viewBox="0 0 600 200" className="w-full">
                      <circle cx="150" cy="50" r="10" fill="#e74c3c"/>
                      <circle cx="120" cy="100" r="10" fill="#e74c3c"/>
                      <circle cx="200" cy="80" r="10" fill="#e74c3c"/>
                      <circle cx="180" cy="140" r="10" fill="#e74c3c"/>
                      
                      <circle cx="400" cy="70" r="10" fill="#f39c12"/>
                      <circle cx="450" cy="40" r="10" fill="#f39c12"/>
                      <circle cx="470" cy="100" r="10" fill="#f39c12"/>
                      <circle cx="420" cy="130" r="10" fill="#f39c12"/>
                      
                      <path d="M150,50 L120,100 L200,80 L180,140 L150,50" fill="none" stroke="#e74c3c" strokeWidth="2"/>
                      <path d="M400,70 L450,40 L470,100 L420,130 L400,70" fill="none" stroke="#f39c12" strokeWidth="2"/>
                      
                      <text x="150" y="170" textAnchor="middle">区域A维护路线</text>
                      <text x="450" y="170" textAnchor="middle">区域B维护路线</text>
                      
                      <rect x="250" y="80" width="100" height="40" rx="5" fill="#3498db" opacity="0.8"/>
                      <text x="300" y="105" textAnchor="middle" fill="white">空间优化算法</text>
                    </svg>
                  </div>
                </div>
                
                <div className={`flowchart-detail ${activeFlowchartStep === 4 ? 'active' : ''}`}>
                  <h3 className="text-xl font-bold text-gray-700 mb-4">步骤5: 与现有物业管理系统和工具集成</h3>
                  <ul className="list-disc pl-6 mb-4">
                    <li>与现有物业管理软件进行无缝集成</li>
                    <li>利用API和其他集成机制实现数据交换</li>
                    <li>整合已具备AI功能的物业管理软件（如AppFolio、Happy Property）</li>
                    <li>考虑Vendoroo等AI维护管理解决方案</li>
                    <li>确保工作流程自动化和数据一致性</li>
                  </ul>
                  <div className="mt-4">
                    <svg viewBox="0 0 600 200" className="w-full">
                      <rect x="50" y="50" width="150" height="100" rx="10" fill="#3498db" opacity="0.8"/>
                      <text x="125" y="100" textAnchor="middle" fill="white">AI作业计划系统</text>
                      
                      <path d="M200,100 L250,100" fill="none" stroke="#95a5a6" strokeWidth="2"/>
                      <rect x="250" y="80" width="100" height="40" rx="5" fill="#9b59b6" opacity="0.8"/>
                      <text x="300" y="105" textAnchor="middle" fill="white">API集成</text>
                      <path d="M350,100 L400,100" fill="none" stroke="#95a5a6" strokeWidth="2"/>
                      
                      <rect x="400" y="50" width="150" height="100" rx="10" fill="#2ecc71" opacity="0.8"/>
                      <text x="475" y="85" textAnchor="middle" fill="white">现有物业</text>
                      <text x="475" y="105" textAnchor="middle" fill="white">管理系统</text>
                      <text x="475" y="125" textAnchor="middle" fill="white">(CMMS/ERP)</text>
                    </svg>
                  </div>
                </div>
                
                <div className={`flowchart-detail ${activeFlowchartStep === 5 ? 'active' : ''}`}>
                  <h3 className="text-xl font-bold text-gray-700 mb-4">步骤6: AI系统的持续监控、评估与完善</h3>
                  <ul className="list-disc pl-6 mb-4">
                    <li>持续监控AI系统性能</li>
                    <li>评估缺陷预测的准确性</li>
                    <li>分析作业计划调度的效率</li>
                    <li>收集维护团队的反馈</li>
                    <li>基于新数据和反馈不断完善AI模型</li>
                    <li>迭代训练和反馈循环提高模型准确性</li>
                  </ul>
                  <div className="mt-4">
                    <svg viewBox="0 0 600 200" className="w-full">
                      <path d="M300,50 A100,100 0 1,1 299,50" fill="none" stroke="#3498db" strokeWidth="4"/>
                      <polygon points="310,55 300,40 290,55" fill="#3498db"/>
                      
                      <text x="300" y="20" textAnchor="middle" fontWeight="bold">持续改进循环</text>
                      
                      <text x="390" y="80" textAnchor="start">监控系统性能</text>
                      <text x="390" y="150" textAnchor="start">收集用户反馈</text>
                      <text x="210" y="150" textAnchor="end">模型再训练</text>
                      <text x="210" y="80" textAnchor="end">系统优化调整</text>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI算法 */}
        <section id="ai-algorithms" className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl text-blue-500 font-bold mb-6">利用AI算法实现最优任务优先级排序与分组</h2>
            
            <div className="border-b-4 border-blue-300 mb-10"></div>
            
            <div className="tab-container">
              <div className="tabs">
                <button 
                  className={`tab-btn ${activeAlgorithmStep === 0 ? 'active' : ''}`}
                  onClick={() => showAlgorithmDetail(0)}
                >
                  缺陷严重程度评估
                </button>
                <button 
                  className={`tab-btn ${activeAlgorithmStep === 1 ? 'active' : ''}`}
                  onClick={() => showAlgorithmDetail(1)}
                >
                  缺陷预测方法
                </button>
                <button 
                  className={`tab-btn ${activeAlgorithmStep === 2 ? 'active' : ''}`}
                  onClick={() => showAlgorithmDetail(2)}
                >
                  任务分组算法
                </button>
              </div>
              
              <div className="tab-content">
                {activeAlgorithmStep === 0 && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-700 mb-4">评估缺陷严重程度和运营影响的AI技术</h3>
                    <ul className="list-disc pl-6 mb-4">
                      <li><strong>分类算法</strong> - 根据严重程度级别（轻微、中等、严重）对缺陷进行分类</li>
                      <li><strong>历史影响分析</strong> - 分析历史缺陷后果数据，预测潜在运营影响</li>
                      <li><strong>异常检测算法</strong> - 识别需要立即关注的异常或关键缺陷</li>
                    </ul>
                    <div className="mt-4">
                      <svg viewBox="0 0 600 250" className="w-full">
                        <rect x="100" y="50" width="400" height="150" rx="10" fill="#f8f9fa"/>
                        
                        <rect x="130" y="80" width="80" height="30" rx="5" fill="#e74c3c" opacity="0.8"/>
                        <text x="170" y="100" textAnchor="middle" fill="white">严重</text>
                        
                        <rect x="260" y="80" width="80" height="30" rx="5" fill="#f39c12" opacity="0.8"/>
                        <text x="300" y="100" textAnchor="middle" fill="white">中等</text>
                        
                        <rect x="390" y="80" width="80" height="30" rx="5" fill="#2ecc71" opacity="0.8"/>
                        <text x="430" y="100" textAnchor="middle" fill="white">轻微</text>
                        
                        <line x1="130" y1="140" x2="470" y2="140" stroke="#95a5a6" strokeWidth="2"/>
                        
                        <text x="150" y="160" textAnchor="middle">结构安全</text>
                        <text x="250" y="160" textAnchor="middle">功能影响</text>
                        <text x="350" y="160" textAnchor="middle">维修成本</text>
                        <text x="450" y="160" textAnchor="middle">美观影响</text>
                        
                        <text x="300" y="190" textAnchor="middle" fontStyle="italic">缺陷严重度分类标准</text>
                      </svg>
                    </div>
                  </div>
                )}
                
                {activeAlgorithmStep === 1 && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-700 mb-4">预测未来可能发生的缺陷和维护需求</h3>
                    <ul className="list-disc pl-6 mb-4">
                      <li><strong>时间序列分析</strong> - 识别缺陷发生的时间模式和周期性</li>
                      <li><strong>机器学习模型</strong> - 基于历史数据预测未来缺陷概率</li>
                      <li><strong>深度学习网络</strong> - 处理复杂的多变量预测问题</li>
                    </ul>
                    <div className="mt-4">
                      <svg viewBox="0 0 600 200" className="w-full">
                        <polyline points="50,150 100,120 150,130 200,90 250,100 300,70 350,80 400,50 450,60 500,30 550,40" fill="none" stroke="#3498db" strokeWidth="3"/>
                        
                        <line x1="50" y1="180" x2="550" y2="180" stroke="#95a5a6" strokeWidth="2"/>
                        <line x1="50" y1="50" x2="50" y2="180" stroke="#95a5a6" strokeWidth="2"/>
                        
                        <text x="300" y="195" textAnchor="middle">时间</text>
                        <text x="30" y="115" textAnchor="middle" transform="rotate(-90,30,115)">缺陷频率</text>
                        
                        <rect x="430" y="30" width="120" height="40" rx="5" fill="white" stroke="#3498db"/>
                        <text x="490" y="55" textAnchor="middle" fill="#3498db">预测趋势线</text>
                      </svg>
                    </div>
                  </div>
                )}
                
                {activeAlgorithmStep === 2 && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-700 mb-4">按类型、位置和资源需求分组任务的优化算法</h3>
                    <ul className="list-disc pl-6 mb-4">
                      <li><strong>聚类算法</strong> - 如K-均值、DBSCAN，对相似缺陷或地理位置接近的缺陷进行分组</li>
                      <li><strong>路径优化算法</strong> - 旅行商问题变体，优化维护路线</li>
                      <li><strong>约束满足问题求解器</strong> - 在分组和调度任务时考虑资源可用性（技术人员技能、设备）</li>
                    </ul>
                    <div className="mt-4">
                      <svg viewBox="0 0 600 200" className="w-full">
                        <circle cx="100" cy="80" r="8" fill="#3498db"/>
                        <circle cx="150" cy="120" r="8" fill="#3498db"/>
                        <circle cx="120" cy="160" r="8" fill="#3498db"/>
                        
                        <circle cx="250" cy="70" r="8" fill="#e74c3c"/>
                        <circle cx="300" cy="100" r="8" fill="#e74c3c"/>
                        <circle cx="280" cy="140" r="8" fill="#e74c3c"/>
                        
                        <circle cx="400" cy="60" r="8" fill="#2ecc71"/>
                        <circle cx="450" cy="90" r="8" fill="#2ecc71"/>
                        <circle cx="430" cy="130" r="8" fill="#2ecc71"/>
                        
                        <path d="M100,80 L150,120 L120,160 L100,80" fill="none" stroke="#3498db" strokeWidth="2"/>
                        <path d="M250,70 L300,100 L280,140 L250,70" fill="none" stroke="#e74c3c" strokeWidth="2"/>
                        <path d="M400,60 L450,90 L430,130 L400,60" fill="none" stroke="#2ecc71" strokeWidth="2"/>
                        
                        <text x="123" y="50" textAnchor="middle">任务组A</text>
                        <text x="277" y="50" textAnchor="middle">任务组B</text>
                        <text x="427" y="50" textAnchor="middle">任务组C</text>
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 系统集成 */}
        <section id="integration" className="py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl text-blue-500 font-bold mb-6">集成外部数据源并考虑合规性要求</h2>
            
            <div className="border-b-4 border-blue-300 mb-10"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">整合维修成本数据和估算模型</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>集成劳动力成本数据</li>
                  <li>纳入材料成本信息</li>
                  <li>整合供应商定价数据</li>
                  <li>利用历史维修数据</li>
                  <li>完善成本预测模型</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">考虑建筑物维护法规和合规标准</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>整合相关建筑规范</li>
                  <li>纳入安全法规要求</li>
                  <li>确保合规性要求</li>
                  <li>考虑《建筑物维修和地层管理法》(BMSMA)</li>
                  <li>AI辅助法规合规性检查</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="border border-gray-200 rounded-lg bg-gray-50">
                <div className="accordion-item active">
                  <div className="accordion-header" onClick={() => toggleAccordion('accordion-cost-database')}>
                    <span>成本数据库和估算工具</span>
                    <span className="accordion-icon" style={{transform: 'rotate(180deg)'}}>▼</span>
                  </div>
                  <div id="accordion-cost-database" className="accordion-content">
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>RSMeans</strong> - 广泛使用的建筑成本数据库，提供标准化的材料和劳动力成本</li>
                      <li><strong>类比估算</strong> - 基于类似历史项目的成本进行估算</li>
                      <li><strong>参数估算</strong> - 使用统计关系和成本参数进行估算</li>
                      <li><strong>自下而上估算</strong> - 详细分析各个组件成本后求和</li>
                      <li><strong>EANN（情感人工神经网络）</strong> - 高级成本预测模型</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg bg-gray-50">
                <div className="accordion-item active">
                  <div className="accordion-header" onClick={() => toggleAccordion('accordion-compliance-standards')}>
                    <span>合规性标准与法规参考</span>
                    <span className="accordion-icon" style={{transform: 'rotate(180deg)'}}>▼</span>
                  </div>
                  <div id="accordion-compliance-standards" className="accordion-content">
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>BMSMA</strong> - 建筑物维修和地层管理法，新加坡的关键监管框架</li>
                      <li><strong>建筑安全法规</strong> - 确保维护任务符合安全标准</li>
                      <li><strong>环保要求</strong> - 确保维修活动符合环保标准</li>
                      <li><strong>行业标准</strong> - 如ASHRAE（美国供暖、制冷与空调工程师学会）标准</li>
                      <li><strong>无障碍设施要求</strong> - 确保维护活动不影响无障碍设施的功能</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 实施评估 */}
        <section id="implementation" className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl text-blue-500 font-bold mb-6">评估AI实施的益处并应对潜在挑战</h2>
            
            <div className="border-b-4 border-blue-300 mb-10"></div>
            
            <div className="bc-container">
              <div className="bc-column">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">关键益处详解</h3>
                
                <div className="bc-item benefit">
                  <div className="bc-icon">📊</div>
                  <div className="bc-content">
                    <h4>主动预测性维护</h4>
                    <p>AI系统可在问题发生前预测潜在故障，将维护模式从被动响应转变为主动预防</p>
                  </div>
                </div>
                
                <div className="bc-item benefit">
                  <div className="bc-icon">⏱️</div>
                  <div className="bc-content">
                    <h4>优化资源分配</h4>
                    <p>通过智能分组和调度，显著提高维护团队的工作效率，减少浪费的出行时间</p>
                  </div>
                </div>
                
                <div className="bc-item benefit">
                  <div className="bc-icon">💰</div>
                  <div className="bc-content">
                    <h4>长期成本节约</h4>
                    <p>虽有初始投资，但通过减少应急维修、延长设备寿命和优化资源利用实现长期节约</p>
                  </div>
                </div>
              </div>
              
              <div className="bc-column">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">应对挑战策略</h3>
                
                <div className="bc-item challenge">
                  <div className="bc-icon">🛠️</div>
                  <div className="bc-content">
                    <h4>分阶段实施</h4>
                    <p>采用模块化方法，从最简单或回报最高的区域开始，逐步扩展系统功能</p>
                  </div>
                </div>
                
                <div className="bc-item challenge">
                  <div className="bc-icon">👥</div>
                  <div className="bc-content">
                    <h4>团队培训与参与</h4>
                    <p>通过早期参与和持续培训，确保维护团队熟悉并接受新技术</p>
                  </div>
                </div>
                
                <div className="bc-item challenge">
                  <div className="bc-icon">🔒</div>
                  <div className="bc-content">
                    <h4>数据治理与伦理框架</h4>
                    <p>建立严格的数据隐私保护政策和算法公平性审核机制</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* 结论 */}
        <section id="conclusion" className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl text-blue-500 font-bold mb-6">结论：AI驱动的物业管理与主动建筑物维护的未来</h2>
            <div className="border-b-4 border-blue-300 mb-10"></div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <p className="mb-4 text-base">采用基于人工智能的方法生成物业管理作业计划具有显著的优势。它标志着物业管理从被动响应转向主动维护的重大转变，而人工智能正是实现这一转变的关键驱动力。</p>
              
              <h3 className="text-2xl font-bold mb-4 text-gray-800">未来发展趋势</h3>
              <ul className="list-disc pl-5 space-y-2 mb-4 text-base">
                <li><strong>更智能的预测性维护</strong> - AI算法将继续提升对设备故障和缺陷的预测能力</li>
                <li><strong>数字孪生技术集成</strong> - 结合建筑物虚拟模型，提供更直观的维护规划</li>
                <li><strong>可持续性关注</strong> - 优化能源使用和资源分配，减少维护活动的环境影响</li>
                <li><strong>日常任务自动化</strong> - 更多日常物业管理任务将实现AI驱动的自动化</li>
                <li><strong>技术整合</strong> - AI将与其他智能建筑技术无缝集成，形成综合解决方案</li>
              </ul>
              
              <p className="text-base">人工智能有潜力彻底改变物业管理，创造更高效、更安全和更可持续的建筑物。通过智能分析缺陷报告，优化作业计划，物业管理团队可以显著提高运营效率，降低成本，并最终提升建筑物的价值和居住者的体验。</p>
            </div>
          </div>
        </section>
      </main>

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
    </div>
  );
} 