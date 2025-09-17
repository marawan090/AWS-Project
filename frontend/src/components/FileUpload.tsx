import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { 
  ArrowUpTrayIcon,
  DocumentTextIcon,
  XMarkIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

interface FileUploadProps {
  onUploadSuccess: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setSelectedFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc'],
      'text/plain': ['.txt'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    maxSize: 50 * 1024 * 1024, // 50MB
    multiple: true
  });

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async () => {
    if (selectedFiles.length === 0) {
      toast.error('يرجى اختيار ملف للرفع');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const formData = new FormData();
        formData.append('document', file);

        const response = await fetch('http://localhost:5000/api/documents/upload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: formData
        });

        const data = await response.json();

        if (data.success) {
          setUploadProgress(((i + 1) / selectedFiles.length) * 100);
          toast.success(`تم رفع ${file.name} بنجاح`);
        } else {
          toast.error(`فشل في رفع ${file.name}: ${data.message}`);
        }
      }

      setSelectedFiles([]);
      onUploadSuccess();
    } catch (error) {
      toast.error('خطأ في رفع الملفات');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 بايت';
    const k = 1024;
    const sizes = ['بايت', 'كيلوبايت', 'ميجابايت', 'جيجابايت'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">رفع المستندات</h2>
        <p className="text-gray-600">
          ارفع مستنداتك لتحليلها بالذكاء الاصطناعي. الأنواع المدعومة: PDF، Word، صور، جداول البيانات
        </p>
      </div>

      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
        }`}
      >
        <input {...getInputProps()} />
        <ArrowUpTrayIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        
        {isDragActive ? (
          <p className="text-lg text-blue-600 font-medium">اسحب الملفات هنا...</p>
        ) : (
          <div>
            <p className="text-lg text-gray-600 mb-2">
              اسحب الملفات هنا أو انقر للاختيار
            </p>
            <p className="text-sm text-gray-500">
              حد أقصى 50 ميجابايت لكل ملف
            </p>
          </div>
        )}
      </div>

      {/* File Rejections */}
      {fileRejections.length > 0 && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center mb-2">
            <ExclamationCircleIcon className="h-5 w-5 text-red-600 ml-2" />
            <h4 className="text-red-800 font-medium">ملفات مرفوضة:</h4>
          </div>
          <ul className="text-red-700 text-sm space-y-1">
            {fileRejections.map(({ file, errors }) => (
              <li key={file.name}>
                <strong>{file.name}</strong>:
                {errors.map(error => (
                  <span key={error.code} className="mr-2">
                    {error.code === 'file-too-large' && 'الملف كبير جداً'}
                    {error.code === 'file-invalid-type' && 'نوع الملف غير مدعوم'}
                  </span>
                ))}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Selected Files */}
      {selectedFiles.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            الملفات المحددة ({selectedFiles.length})
          </h3>
          <div className="space-y-3">
            {selectedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <DocumentTextIcon className="h-8 w-8 text-blue-600 ml-3" />
                  <div>
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="p-1 text-red-600 hover:text-red-800 transition-colors"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Upload Progress */}
          {uploading && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">جاري الرفع...</span>
                <span className="text-sm text-gray-600">{Math.round(uploadProgress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Upload Button */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={uploadFiles}
              disabled={uploading}
              className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                uploading
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {uploading ? 'جاري الرفع...' : `رفع ${selectedFiles.length} ملف`}
            </button>
          </div>
        </div>
      )}

      {/* Usage Info */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center mb-2">
          <CheckCircleIcon className="h-5 w-5 text-blue-600 ml-2" />
          <h4 className="text-blue-800 font-medium">نصائح مفيدة:</h4>
        </div>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• يمكنك رفع عدة ملفات في نفس الوقت</li>
          <li>• سيتم معالجة المستندات تلقائياً بعد الرفع</li>
          <li>• المستندات المحمية بكلمة مرور غير مدعومة حالياً</li>
          <li>• للحصول على أفضل النتائج، استخدم ملفات واضحة وعالية الجودة</li>
        </ul>
      </div>
    </div>
  );
};

export default FileUpload;