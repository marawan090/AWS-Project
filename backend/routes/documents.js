const express = require('express');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    'text/plain',
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('نوع الملف غير مدعوم'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  }
});

// Temporary in-memory document storage
const documents = [];

// Upload document
router.post('/upload', upload.single('document'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'لم يتم رفع أي ملف'
      });
    }

    const document = {
      id: uuidv4(),
      originalName: req.file.originalname,
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
      mimetype: req.file.mimetype,
      uploadedAt: new Date(),
      processed: false,
      content: null // Will be filled after processing
    };

    documents.push(document);

    res.json({
      success: true,
      message: 'تم رفع الملف بنجاح',
      document: {
        id: document.id,
        originalName: document.originalName,
        size: document.size,
        mimetype: document.mimetype,
        uploadedAt: document.uploadedAt
      }
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في رفع الملف'
    });
  }
});

// Get user documents
router.get('/', (req, res) => {
  try {
    const userDocuments = documents.map(doc => ({
      id: doc.id,
      originalName: doc.originalName,
      size: doc.size,
      mimetype: doc.mimetype,
      uploadedAt: doc.uploadedAt,
      processed: doc.processed
    }));

    res.json({
      success: true,
      documents: userDocuments
    });

  } catch (error) {
    console.error('Get documents error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في جلب المستندات'
    });
  }
});

// Delete document
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const docIndex = documents.findIndex(doc => doc.id === id);

    if (docIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'المستند غير موجود'
      });
    }

    // Remove from storage
    documents.splice(docIndex, 1);

    res.json({
      success: true,
      message: 'تم حذف المستند بنجاح'
    });

  } catch (error) {
    console.error('Delete document error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في حذف المستند'
    });
  }
});

module.exports = router;