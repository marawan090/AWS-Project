import React, { useState, useRef, useEffect } from 'react';
import { 
  PaperAirplaneIcon,
  DocumentTextIcon,
  UserIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  demo?: boolean;
}

interface ChatInterfaceProps {
  documents: any[];
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ documents }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'مرحباً! أنا مساعدك الذكي في تحليل المستندات. ارفع مستنداتك واسأل أي سؤال عنها وسأقدم لك إجابات دقيقة مبنية على محتواها فقط.',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          message: input,
          documentIds: documents.map(doc => doc.id)
        })
      });

      const data = await response.json();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: data.response || 'عذراً، لم أتمكن من معالجة سؤالك.',
        timestamp: new Date(),
        demo: data.demo
      };

      setMessages(prev => [...prev, aiMessage]);

      if (!data.success) {
        toast.error('خطأ في معالجة السؤال');
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'عذراً، حدث خطأ في الاتصال بالخادم. يرجى المحاولة مرة أخرى.',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      toast.error('خطأ في الاتصال');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ar-SA', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const suggestedQuestions = [
    'لخص لي المحتوى الرئيسي',
    'ما أهم النقاط في هذا المستند؟',
    'اعطني ملخص مختصر',
    'ما هي التوصيات المذكورة؟',
    'قارن بين النقاط المختلفة'
  ];

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">المحادثة الذكية</h2>
            <p className="text-gray-600">
              {documents.length > 0 
                ? `${documents.length} مستند متاح للتحليل`
                : 'لا توجد مستندات مرفوعة'}
            </p>
          </div>
          <LightBulbIcon className="h-8 w-8 text-blue-600" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-3xl flex items-start space-x-3 space-x-reverse ${
                message.type === 'user' ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              {/* Avatar */}
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user'
                    ? 'bg-blue-100'
                    : 'bg-green-100'
                }`}
              >
                {message.type === 'user' ? (
                  <UserIcon className="h-5 w-5 text-blue-600" />
                ) : (
                  <LightBulbIcon className="h-5 w-5 text-green-600" />
                )}
              </div>

              {/* Message Content */}
              <div
                className={`rounded-lg p-4 ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                {message.demo && (
                  <div className="mt-2 text-xs opacity-75 italic">
                    * هذه إجابة تجريبية - لتفعيل الذكاء الاصطناعي الكامل، يرجى إضافة مفتاح Groq API
                  </div>
                )}
                <p
                  className={`text-xs mt-2 ${
                    message.type === 'user' ? 'text-blue-200' : 'text-gray-500'
                  }`}
                >
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-end">
            <div className="max-w-3xl flex items-start space-x-3 space-x-reverse flex-row-reverse">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <LightBulbIcon className="h-5 w-5 text-green-600" />
              </div>
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className="flex space-x-1 space-x-reverse">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-gray-600 text-sm">جاري التفكير...</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length <= 2 && !loading && (
        <div className="p-4 border-t border-gray-100">
          <p className="text-sm text-gray-600 mb-3">أسئلة مقترحة:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => setInput(question)}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Documents Status */}
      {documents.length > 0 && (
        <div className="px-4 py-2 bg-blue-50 border-t border-blue-100">
          <div className="flex items-center text-sm text-blue-700">
            <DocumentTextIcon className="h-4 w-4 ml-2" />
            <span>المستندات المتاحة للتحليل:</span>
            <div className="mr-2 flex-wrap">
              {documents.slice(0, 3).map((doc: any, index: number) => (
                <span key={doc.id} className="inline-block">
                  {doc.originalName.substring(0, 20)}
                  {doc.originalName.length > 20 ? '...' : ''}
                  {index < Math.min(documents.length - 1, 2) ? '، ' : ''}
                </span>
              ))}
              {documents.length > 3 && (
                <span> و {documents.length - 3} مستند آخر</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-end space-x-3 space-x-reverse">
          <div className="flex-1">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                documents.length > 0
                  ? 'اسأل أي سؤال عن مستنداتك...'
                  : 'ارفع مستنداً أولاً ثم اسأل عنها...'
              }
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              disabled={loading}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!input.trim() || loading}
            className={`p-3 rounded-lg transition-colors ${
              !input.trim() || loading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <PaperAirplaneIcon className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
          <span>اضغط Enter للإرسال، Shift+Enter لسطر جديد</span>
          <span>{input.length}/1000</span>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;