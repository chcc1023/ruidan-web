import { useState } from 'react';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;  // 根据不同入口显示不同标题
}

export default function ContactFormModal({ isOpen, onClose, title }: ContactFormModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    projectName: '',
    referralCode: ''  // 新增推荐码字段
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setShowSuccess(false);
    
    // 表单验证
    if (!formData.name.trim()) {
      setError('请输入姓名');
      return;
    }
    if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
      setError('请输入正确的手机号');
      return;
    }
    if (!formData.projectName.trim()) {
      setError('请输入项目名称');
      return;
    }
    // 推荐码为可选字段，不需要验证

    setIsSubmitting(true);
    try {
      const response = await fetch('https://www.ai2049.com/api/admin/sysUccnInfo/addUccnInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickName: formData.name,
          phone: formData.phone,
          leaveWord: formData.projectName, // 使用项目名称作为留言内容
        }),
      });

      if (!response.ok) {
        throw new Error('提交失败');
      }

      setShowSuccess(true);
      setTimeout(() => {
        onClose();
        setFormData({ name: '', phone: '', projectName: '', referralCode: '' });
        setShowSuccess(false);
      }, 2000);
    } catch (err) {
      console.error('提交失败', err);
      setError('提交失败，请稍后重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* 背景遮罩 */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-lg transition-opacity"
        onClick={onClose}
      />
      
      {/* 模态框 */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl w-full max-w-5xl mx-auto shadow-2xl overflow-hidden">
          {/* 科技感背景装饰 */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[80px]" />
          </div>
          
          {/* 网格背景 */}
          <div className="absolute inset-0 -z-10 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(#4444 1px, transparent 1px), linear-gradient(90deg, #4444 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }} />
          </div>

          <div className="flex">
            {/* 左侧图片区域 */}
            <div className="hidden lg:block w-1/2 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600">
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }} />
              </div>
              <div className="relative h-full p-12 flex flex-col justify-center text-white">
                <h3 className="text-3xl font-bold mb-6">让物业管理更智能高效</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <span>AI缺陷识别</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <span>智能工单调度</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <span>数字化运营</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 右侧表单区域 */}
            <div className="w-full lg:w-1/2 p-8">
              {/* 关闭按钮 */}
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors z-10"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* 标题 */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
                <p className="text-gray-600 mt-2">请留下您的联系方式，我们将尽快与您取得联系</p>
              </div>

              {/* 表单 */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    姓名
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="请输入您的姓名"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    手机号
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="请输入您的手机号"
                  />
                </div>

                <div>
                  <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">
                    项目名称
                  </label>
                  <input
                    type="text"
                    id="projectName"
                    value={formData.projectName}
                    onChange={(e) => setFormData(prev => ({ ...prev, projectName: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="请输入项目名称"
                  />
                </div>

                <div>
                  <label htmlFor="referralCode" className="block text-sm font-medium text-gray-700 mb-1">
                    推荐代码
                  </label>
                  <input
                    type="text"
                    id="referralCode"
                    value={formData.referralCode}
                    onChange={(e) => setFormData(prev => ({ ...prev, referralCode: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="请输入推荐代码"
                  />
                </div>

                {error && (
                  <div className="text-red-500 text-sm">{error}</div>
                )}

                {showSuccess && (
                  <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-3 rounded-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>提交成功！我们的顾问将尽快与您联系</span>
                  </div>
                )}

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting || showSuccess}
                    className={`w-full px-6 py-3 rounded-lg focus:ring-4 transition-colors disabled:cursor-not-allowed
                      ${showSuccess 
                        ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500/50 disabled:opacity-100' 
                        : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500/50 disabled:opacity-50'
                      } text-white`}
                  >
                    {isSubmitting ? '提交中...' : showSuccess ? '提交成功！' : '提交'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
