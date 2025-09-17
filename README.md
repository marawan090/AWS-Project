# منصة ذكاء المصادر (SourceIQ)

منصة ذكية شاملة باللغة العربية لتحليل المستندات باستخدام الذكاء الاصطناعي

## نظرة عامة

**ذكاء المصادر** هي منصة ويب احترافية تمكن المستخدمين العرب من رفع مصادرهم المختلفة وطرح أسئلة ذكية عليها للحصول على إجابات دقيقة مبنية على محتوى المستندات فقط.

### المميزات الرئيسية

- 📄 **رفع المستندات**: دعم جميع الأنواع (PDF, DOCX, صور, جداول البيانات)
- 💬 **محادثة ذكية**: اسأل أي سؤال واحصل على إجابات دقيقة
- 📊 **ملخصات ذكية**: إنتاج ملخصات مفصلة أو مختصرة
- ⚖️ **المقارنات**: جداول مقارنة منظمة بين المصادر
- 🎯 **اختبارات تفاعلية**: إنتاج أسئلة تفاعلية من المحتوى
- 🔍 **تحليل البيانات**: فهم عميق للمحتوى المضمن

## التقنيات المستخدمة

### الواجهة الأمامية (Frontend)
- **React.js 18** مع TypeScript
- **Tailwind CSS** مع دعم RTL للعربية
- **React Router** للتنقل
- **React Dropzone** لرفع الملفات
- **Heroicons** للأيقونات
- **React Hot Toast** للإشعارات

### الخادم الخلفي (Backend)
- **Node.js** مع Express.js
- **JWT** للمصادقة الآمنة
- **Bcryptjs** لتشفير كلمات المرور
- **Multer** لرفع الملفات
- **Groq API** للذكاء الاصطناعي
- **Express Validator** للتحقق من البيانات

## التثبيت والتشغيل

### المتطلبات المسبقة
- Node.js (v18 أو أحدث)
- npm أو yarn
- مفتاح Groq API (اختياري للمميزات الكاملة)

### 1. تحميل المشروع
```bash
git clone https://github.com/marawan090/AWS-Project.git
cd AWS-Project
```

### 2. تشغيل الخادم الخلفي
```bash
cd backend
npm install
npm run dev
```
الخادم سيعمل على `http://localhost:5000`

### 3. تشغيل الواجهة الأمامية
```bash
cd frontend
npm install
npm start
```
الواجهة ستعمل على `http://localhost:3000`

### 4. إعداد متغيرات البيئة
أنشئ ملف `.env` في مجلد `backend`:
```env
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# قاعدة البيانات
MONGODB_URI=mongodb://localhost:27017/sourceiq

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# Groq API (للذكاء الاصطناعي الكامل)
GROQ_API_KEY=your-groq-api-key-here

# AWS S3 (للتخزين السحابي)
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_BUCKET_NAME=sourceiq-uploads
AWS_REGION=us-east-1
```

## كيفية الاستخدام

### 1. إنشاء حساب
- انتقل إلى `http://localhost:3000`
- انقر على "إنشاء حساب"
- املأ البيانات المطلوبة

### 2. رفع المستندات
- من لوحة التحكم، انقر على "رفع المستندات"
- اسحب الملفات أو انقر للاختيار
- الأنواع المدعومة: PDF, DOCX, TXT, JPG, PNG, XLSX

### 3. المحادثة مع المستندات
- انقر على "المحادثة الذكية"
- اطرح أسئلتك عن المستندات المرفوعة
- احصل على إجابات دقيقة مبنية على المحتوى

### 4. إنتاج الملخصات
- اختر "الملخصات" من الشريط الجانبي
- حدد المستند المطلوب
- اختر نوع الملخص (مفصل أو مختصر)

## API Reference

### المصادقة (Authentication)
```http
POST /api/auth/register
POST /api/auth/login
```

### المستندات (Documents)
```http
POST /api/documents/upload
GET /api/documents
DELETE /api/documents/:id
```

### الذكاء الاصطناعي (AI)
```http
POST /api/ai/chat
POST /api/ai/summary
POST /api/ai/compare
POST /api/ai/quiz
```

## الهيكل التنظيمي

```
SourceIQ/
├── frontend/                 # الواجهة الأمامية
│   ├── src/
│   │   ├── components/      # مكونات React
│   │   ├── App.tsx         # التطبيق الرئيسي
│   │   └── index.css       # التنسيقات العربية
│   └── package.json
├── backend/                 # الخادم الخلفي
│   ├── routes/             # مسارات API
│   ├── server.js           # الخادم الرئيسي
│   └── package.json
├── uploads/                # ملفات المستخدمين
└── README.md
```

## المساهمة

نرحب بالمساهمات! يرجى:

1. عمل Fork للمشروع
2. إنشاء فرع جديد للميزة (`git checkout -b feature/amazing-feature`)
3. تأكيد التغييرات (`git commit -m 'Add amazing feature'`)
4. رفع للفرع (`git push origin feature/amazing-feature`)
5. فتح Pull Request

## الترخيص

هذا المشروع مرخص تحت رخصة MIT - انظر ملف [LICENSE](LICENSE) للتفاصيل.

## الدعم

للدعم والاستفسارات:
- 📧 البريد الإلكتروني: support@sourceiq.com
- 📱 الهاتف: +966 50 123 4567

## شاشات المنصة

### الصفحة الرئيسية
![الصفحة الرئيسية](https://github.com/user-attachments/assets/4bac6e2e-8775-4336-95fb-a8f6f39181ab)

### صفحة تسجيل الدخول
![تسجيل الدخول](https://github.com/user-attachments/assets/83f37dda-fa1c-44be-8661-8f1bbc681f04)

### لوحة التحكم
![لوحة التحكم](https://github.com/user-attachments/assets/753e9412-27d5-4f96-bf12-b0fea48c5d43)

---

**ذكاء المصادر** - منصة الذكاء الاصطناعي للمحتوى العربي 🚀