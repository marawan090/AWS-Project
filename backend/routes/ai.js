const express = require('express');
const Groq = require('groq-sdk');
const router = express.Router();

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "demo-key"
});

// Chat with documents
router.post('/chat', async (req, res) => {
  try {
    const { message, documentIds = [] } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'السؤال مطلوب'
      });
    }

    // For demo, we'll use a simple response
    // In production, this would analyze the uploaded documents
    const systemPrompt = `أنت مساعد ذكي باللغة العربية متخصص في تحليل المستندات والإجابة على الأسئلة بناءً على محتواها. 
    قدم إجابات دقيقة ومفيدة بناءً على المحتوى المتاح فقط.
    إذا لم تجد المعلومة في المستندات، اذكر ذلك بوضوح.`;

    try {
      const completion = await groq.chat.completions.create({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
        model: "mixtral-8x7b-32768", // Using available model
        temperature: 0.7,
        max_tokens: 1000,
      });

      const response = completion.choices[0]?.message?.content || 'عذراً، لم أتمكن من الإجابة على سؤالك.';

      res.json({
        success: true,
        response,
        timestamp: new Date().toISOString()
      });

    } catch (groqError) {
      console.log('Using demo response due to API key limitation');
      
      // Demo response for development
      const demoResponse = `شكراً لسؤالك: "${message}"

هذه إجابة تجريبية من منصة ذكاء المصادر. في النسخة الكاملة، سأقوم بتحليل المستندات المرفوعة والإجابة بناءً على محتواها.

المميزات المتاحة:
• تحليل المستندات بالذكاء الاصطناعي
• إنتاج الملخصات
• المقارنات والجداول
• الاختبارات التفاعلية

لتفعيل الذكاء الاصطناعي الكامل، يرجى إضافة مفتاح Groq API في إعدادات الخادم.`;

      res.json({
        success: true,
        response: demoResponse,
        demo: true,
        timestamp: new Date().toISOString()
      });
    }

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في معالجة السؤال'
    });
  }
});

// Generate summary
router.post('/summary', async (req, res) => {
  try {
    const { documentId, type = 'detailed' } = req.body;

    if (!documentId) {
      return res.status(400).json({
        success: false,
        message: 'معرف المستند مطلوب'
      });
    }

    // Demo summary
    const summary = {
      type,
      content: `ملخص ${type === 'detailed' ? 'مفصل' : 'مختصر'} للمستند

النقاط الرئيسية:
• النقطة الأولى من المستند
• النقطة الثانية المهمة
• الخلاصة والتوصيات

هذا ملخص تجريبي. في النسخة الكاملة، سيتم تحليل محتوى المستند الفعلي.`,
      generatedAt: new Date().toISOString(),
      wordCount: 45
    };

    res.json({
      success: true,
      summary,
      demo: true
    });

  } catch (error) {
    console.error('Summary error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في إنتاج الملخص'
    });
  }
});

// Generate comparison
router.post('/compare', async (req, res) => {
  try {
    const { documentIds, topic } = req.body;

    if (!documentIds || documentIds.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'مطلوب مستندين على الأقل للمقارنة'
      });
    }

    // Demo comparison
    const comparison = {
      topic: topic || 'مقارنة عامة',
      documents: documentIds,
      table: {
        headers: ['الجانب', 'المستند الأول', 'المستند الثاني'],
        rows: [
          ['النقطة الأولى', 'وجهة نظر المستند الأول', 'وجهة نظر المستند الثاني'],
          ['النقطة الثانية', 'تفاصيل من المستند الأول', 'تفاصيل من المستند الثاني'],
          ['الخلاصة', 'استنتاج المستند الأول', 'استنتاج المستند الثاني']
        ]
      },
      generatedAt: new Date().toISOString()
    };

    res.json({
      success: true,
      comparison,
      demo: true
    });

  } catch (error) {
    console.error('Comparison error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في إنتاج المقارنة'
    });
  }
});

// Generate quiz
router.post('/quiz', async (req, res) => {
  try {
    const { documentId, difficulty = 'medium', questionCount = 5 } = req.body;

    if (!documentId) {
      return res.status(400).json({
        success: false,
        message: 'معرف المستند مطلوب'
      });
    }

    // Demo quiz
    const quiz = {
      documentId,
      difficulty,
      questions: [
        {
          id: 1,
          question: 'ما هي النقطة الرئيسية في المستند؟',
          type: 'multiple-choice',
          options: ['الخيار الأول', 'الخيار الثاني', 'الخيار الثالث', 'الخيار الرابع'],
          correctAnswer: 0
        },
        {
          id: 2,
          question: 'اذكر تفصيلاً مهماً من المستند.',
          type: 'text',
          correctAnswer: 'إجابة نموذجية'
        },
        {
          id: 3,
          question: 'هل المعلومة التالية صحيحة؟',
          type: 'true-false',
          statement: 'بيان للتحقق من صحته',
          correctAnswer: true
        }
      ],
      generatedAt: new Date().toISOString()
    };

    res.json({
      success: true,
      quiz,
      demo: true
    });

  } catch (error) {
    console.error('Quiz error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في إنتاج الاختبار'
    });
  }
});

module.exports = router;