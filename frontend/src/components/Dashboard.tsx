import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  ArrowUpTrayIcon,
  MoonIcon,
  SunIcon,
  Bars3Icon,
  XMarkIcon,
  ChartBarIcon,
  AcademicCapIcon,
  ClipboardDocumentListIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import FileUpload from './FileUpload';
import ChatInterface from './ChatInterface';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('chat');
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      navigate('/login');
      return;
    }

    setUser(JSON.parse(userData));
    fetchDocuments();
  }, [navigate]);

  const fetchDocuments = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/documents', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setDocuments(data.documents);
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('تم تسجيل الخروج بنجاح');
    navigate('/');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const renderActiveContent = () => {
    switch (activeTab) {
      case 'upload':
        return <FileUpload onUploadSuccess={fetchDocuments} />;
      case 'chat':
        return <ChatInterface documents={documents} />;
      case 'summary':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">إنتاج الملخصات</h2>
            <p className="text-gray-600">اختر مستنداً لإنتاج ملخص ذكي له</p>
            {/* Summary component will be implemented */}
          </div>
        );
      case 'compare':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">المقارنات</h2>
            <p className="text-gray-600">قارن بين مستندين أو أكثر</p>
            {/* Comparison component will be implemented */}
          </div>
        );
      case 'quiz':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">الاختبارات</h2>
            <p className="text-gray-600">إنتاج اختبارات تفاعلية من مستنداتك</p>
            {/* Quiz component will be implemented */}
          </div>
        );
      default:
        return <ChatInterface documents={documents} />;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-4 py-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 space-x-reverse">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {sidebarOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
            <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              ذكاء المصادر
            </h1>
          </div>

          <div className="flex items-center space-x-4 space-x-reverse">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {darkMode ? (
                <SunIcon className="h-6 w-6 text-yellow-500" />
              ) : (
                <MoonIcon className="h-6 w-6 text-gray-600" />
              )}
            </button>
            
            <div className="flex items-center space-x-2 space-x-reverse">
              <UserCircleIcon className="h-8 w-8 text-gray-600" />
              <div className="hidden md:block">
                <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {user.name}
                </p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {user.subscription === 'free' ? 'مجاني' : 'مميز'}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600"
            >
              <ArrowRightOnRectangleIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} ${darkMode ? 'bg-gray-800' : 'bg-white'} transition-all duration-300 overflow-hidden shadow-sm`}>
          <nav className="p-4">
            <div className="space-y-2">
              <button
                onClick={() => setActiveTab('chat')}
                className={`w-full flex items-center px-3 py-2 rounded-lg text-right transition-colors ${
                  activeTab === 'chat'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <ChatBubbleLeftRightIcon className="h-5 w-5 ml-3" />
                المحادثة الذكية
              </button>

              <button
                onClick={() => setActiveTab('upload')}
                className={`w-full flex items-center px-3 py-2 rounded-lg text-right transition-colors ${
                  activeTab === 'upload'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <ArrowUpTrayIcon className="h-5 w-5 ml-3" />
                رفع المستندات
              </button>

              <button
                onClick={() => setActiveTab('summary')}
                className={`w-full flex items-center px-3 py-2 rounded-lg text-right transition-colors ${
                  activeTab === 'summary'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <ClipboardDocumentListIcon className="h-5 w-5 ml-3" />
                الملخصات
              </button>

              <button
                onClick={() => setActiveTab('compare')}
                className={`w-full flex items-center px-3 py-2 rounded-lg text-right transition-colors ${
                  activeTab === 'compare'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <ChartBarIcon className="h-5 w-5 ml-3" />
                المقارنات
              </button>

              <button
                onClick={() => setActiveTab('quiz')}
                className={`w-full flex items-center px-3 py-2 rounded-lg text-right transition-colors ${
                  activeTab === 'quiz'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <AcademicCapIcon className="h-5 w-5 ml-3" />
                الاختبارات
              </button>
            </div>

            {/* Documents List */}
            <div className="mt-8">
              <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-3`}>
                المستندات المرفوعة ({documents.length})
              </h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {documents.map((doc: any) => (
                  <div
                    key={doc.id}
                    className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} hover:bg-opacity-80 cursor-pointer`}
                  >
                    <div className="flex items-center">
                      <DocumentTextIcon className="h-4 w-4 text-blue-600 ml-2 flex-shrink-0" />
                      <p className={`text-xs truncate ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {doc.originalName}
                      </p>
                    </div>
                    <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'} mt-1`}>
                      {new Date(doc.uploadedAt).toLocaleDateString('ar-SA')}
                    </p>
                  </div>
                ))}
                {documents.length === 0 && (
                  <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'} text-center py-4`}>
                    لا توجد مستندات مرفوعة
                  </p>
                )}
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} min-h-screen`}>
          {renderActiveContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;