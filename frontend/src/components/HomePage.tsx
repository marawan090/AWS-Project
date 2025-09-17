import React from 'react';
import { Link } from 'react-router-dom';
import { 
  DocumentTextIcon, 
  ChatBubbleLeftRightIcon, 
  LightBulbIcon,
  ChartBarIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="flex items-center">
                <LightBulbIcon className="h-8 w-8 text-blue-600 ml-2" />
                <span className="text-xl font-bold text-gray-900">ذكاء المصادر</span>
                <span className="text-sm text-gray-500 mr-2">SourceIQ</span>
              </div>
            </div>
            
            <div className="hidden md:flex space-x-8 space-x-reverse">
              <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">الرئيسية</a>
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">المميزات</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">الأسعار</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">اتصل بنا</a>
            </div>

            <div className="flex space-x-4 space-x-reverse">
              <Link 
                to="/login" 
                className="text-gray-700 hover:text-blue-600 transition-colors px-4 py-2"
              >
                تسجيل الدخول
              </Link>
              <Link 
                to="/register" 
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                إنشاء حساب
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ذكاء المصادر
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              أدخل مصادرك، اسأل أسئلتك، واحصل على إجابات ذكية مبنية عليها فقط
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/register" 
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors transform hover:scale-105"
              >
                ابدأ الآن مجاناً
              </Link>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors">
                شاهد الفيديو التعريفي
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">المميزات الرئيسية</h2>
            <p className="text-xl text-gray-600">منصة شاملة لتحليل المستندات بالذكاء الاصطناعي</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl hover:shadow-lg transition-shadow">
              <DocumentTextIcon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">رفع المستندات</h3>
              <p className="text-gray-600">
                دعم جميع أنواع الملفات: PDF، Word، صور، جداول البيانات وأكثر
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl hover:shadow-lg transition-shadow">
              <ChatBubbleLeftRightIcon className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">محادثة ذكية</h3>
              <p className="text-gray-600">
                اسأل أي سؤال واحصل على إجابات دقيقة مبنية على مصادرك فقط
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl hover:shadow-lg transition-shadow">  
              <ChartBarIcon className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">ملخصات ذكية</h3>
              <p className="text-gray-600">
                إنتاج ملخصات مفصلة أو مختصرة قابلة للتحميل كـ PDF
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-xl hover:shadow-lg transition-shadow">
              <LightBulbIcon className="h-12 w-12 text-yellow-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">المقارنات</h3>
              <p className="text-gray-600">
                جداول مقارنة منظمة بين المصادر المختلفة قابلة للتصدير
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-xl hover:shadow-lg transition-shadow">
              <AcademicCapIcon className="h-12 w-12 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">اختبارات تفاعلية</h3>
              <p className="text-gray-600">
                إنتاج أسئلة تفاعلية من سهل إلى صعب مع النتائج
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-8 rounded-xl hover:shadow-lg transition-shadow">
              <ChartBarIcon className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">تحليل البيانات</h3>
              <p className="text-gray-600">
                فهم عميق للمحتوى المضمن من صور ورسوم بيانية وأكواد
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">آراء المستخدمين</h2>
            <p className="text-xl text-gray-600">ماذا يقول عملاؤنا عن منصة ذكاء المصادر</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">أ</span>
                </div>
                <div className="mr-4">
                  <h4 className="font-semibold text-gray-900">أحمد محمد</h4>
                  <p className="text-gray-600 text-sm">باحث أكاديمي</p>
                </div>
              </div>
              <p className="text-gray-700">
                "منصة رائعة ساعدتني في تحليل الأبحاث بسرعة والوصول للمعلومات المطلوبة بدقة عالية."
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-semibold">م</span>
                </div>
                <div className="mr-4">
                  <h4 className="font-semibold text-gray-900">مريم العلي</h4>
                  <p className="text-gray-600 text-sm">طالبة جامعية</p>
                </div>
              </div>
              <p className="text-gray-700">
                "وفرت علي ساعات من القراءة والتلخيص. الآن أستطيع التركيز على الأهم في دراستي."
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-semibold">خ</span>
                </div>
                <div className="mr-4">
                  <h4 className="font-semibold text-gray-900">خالد السالم</h4>
                  <p className="text-gray-600 text-sm">مدير مشاريع</p>
                </div>
              </div>
              <p className="text-gray-700">
                "أداة لا غنى عنها لتحليل التقارير والمستندات في العمل. سهلة الاستخدام ونتائج دقيقة."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">خطط الاشتراك</h2>
            <p className="text-xl text-gray-600">اختر الخطة المناسبة لاحتياجاتك</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">مجاني</h3>
              <p className="text-4xl font-bold text-gray-900 mb-6">0 ريال</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full ml-3"></span>
                  5 مصادر يومياً
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full ml-3"></span>
                  ملخصات أساسية
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full ml-3"></span>
                  دعم المحادثة
                </li>
              </ul>
              <Link 
                to="/register" 
                className="w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-lg text-center font-semibold hover:bg-gray-300 transition-colors block"
              >
                ابدأ مجاناً
              </Link>
            </div>

            {/* Premium Plan */}
            <div className="bg-blue-600 text-white p-8 rounded-xl transform scale-105 shadow-xl">
              <h3 className="text-2xl font-bold mb-4">مميز</h3>
              <p className="text-4xl font-bold mb-6">29 ريال/شهر</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full ml-3"></span>
                  مصادر غير محدودة
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full ml-3"></span>
                  جميع المميزات
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full ml-3"></span>
                  تصدير PDF
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full ml-3"></span>
                  دعم أولوية
                </li>
              </ul>
              <button className="w-full bg-white text-blue-600 py-3 px-6 rounded-lg text-center font-semibold hover:bg-gray-100 transition-colors">
                اشترك الآن
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">احترافي</h3>
              <p className="text-4xl font-bold text-gray-900 mb-6">59 ريال/شهر</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full ml-3"></span>
                  كل ما في المميز
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full ml-3"></span>
                  API متقدم
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full ml-3"></span>
                  تحليلات مفصلة
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full ml-3"></span>
                  دعم 24/7
                </li>
              </ul>
              <button className="w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-lg text-center font-semibold hover:bg-gray-300 transition-colors">
                اشترك الآن
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <LightBulbIcon className="h-8 w-8 text-blue-500 ml-2" />
                <span className="text-xl font-bold">ذكاء المصادر</span>
              </div>
              <p className="text-gray-400">
                منصة الذكاء الاصطناعي لتحليل المستندات والإجابة على الأسئلة
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">الروابط السريعة</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#home" className="hover:text-white transition-colors">الرئيسية</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">المميزات</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">الأسعار</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">الدعم</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">مركز المساعدة</a></li>
                <li><a href="#" className="hover:text-white transition-colors">اتصل بنا</a></li>
                <li><a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">تواصل معنا</h4>
              <p className="text-gray-400 mb-2">support@sourceiq.com</p>
              <p className="text-gray-400">+966 50 123 4567</p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 ذكاء المصادر. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;