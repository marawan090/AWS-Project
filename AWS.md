# AWS Captain Project → SourceIQ Platform

## 🚀 Project Evolution

**This repository has been transformed!** 

What started as a simple AWS CLI demonstration project has evolved into **SourceIQ (ذكاء المصادر)** - a comprehensive Arabic AI-powered document analysis platform.

### 🔄 From Simple Demo to Professional Platform

**Original Project (AWS Captain)**:
- Basic LocalStack AWS CLI examples
- S3, DynamoDB, and Lambda demonstrations
- Command-line tools for learning

**New Project (SourceIQ)**:
- Full-stack web application
- Professional Arabic user interface
- AI-powered document analysis
- Authentication and user management
- Modern React + Node.js architecture

---

## 📁 Current Project Structure

```
SourceIQ Platform/
├── frontend/          # React.js Arabic Interface
├── backend/           # Node.js API Server  
├── uploads/           # Document Storage
├── README.md          # Platform Documentation
└── [legacy files]     # Original AWS examples preserved
```

## 🌟 SourceIQ Features

- 🌐 **Complete Arabic Interface** with RTL support
- 📄 **Document Upload** (PDF, DOCX, images, etc.)
- 🤖 **AI Chat** for document Q&A
- 📊 **Smart Summaries** and analysis
- ⚖️ **Document Comparison** tools
- 🎯 **Interactive Quizzes** generation
- 🔐 **Secure Authentication** system

## 🚀 Getting Started

See the main [README.md](README.md) for complete setup instructions.

Quick start:
```bash
# Start backend
cd backend && npm install && npm run dev

# Start frontend  
cd frontend && npm install && npm start
```

Then visit: http://localhost:3000

---

## 📚 Original AWS Examples (Legacy)

The original AWS CLI examples are preserved below for reference:

## How to Run the Project

### 1. Start LocalStack
```cmd
localstack start
```

### 2. S3 Example
Upload a file to S3:
```cmd
aws --endpoint-url=http://localhost:4566 s3 cp s3/sample_file.txt s3://my-bucket/
```

### 3. DynamoDB Examples
Create a table:
```cmd
aws --endpoint-url=http://localhost:4566 dynamodb create-table --table-name Books --attribute-definitions AttributeName=ISBN,AttributeType=S --key-schema AttributeName=ISBN,KeyType=HASH --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5
```

Add an item:
```cmd
aws --endpoint-url=http://localhost:4566 dynamodb put-item --table-name Books --item file://dynamodb/book.json
```

Get an item:
```cmd
aws --endpoint-url=http://localhost:4566 dynamodb get-item --table-name Books --key file://dynamodb/key.json
```

Delete an item:
```cmd
aws --endpoint-url=http://localhost:4566 dynamodb delete-item --table-name Books --key file://dynamodb/key.json
```

---

### 4. Lambda Example
Create a Lambda function:
```cmd
aws --endpoint-url=http://localhost:4566 lambda create-function --function-name SquareFunction --runtime python3.9 --handler lambda_square.handler --zip-file fileb://lambda/lambda_square.zip --role arn:aws:iam::000000000000:role/lambda-role
```

Invoke the Lambda function:
```cmd
aws --endpoint-url=http://localhost:4566 lambda invoke --function-name SquareFunction --payload file://lambda/event.json lambda/output.json
```

View the output:
```cmd
type lambda/output.json
```

---

## Screenshots
Include screenshots in the `screenshots/` folder:
- s3_upload.png for S3 upload result
- dynamodb_put.png for DynamoDB put-item result
- lambda_invoke.png for Lambda invoke result

---

## Notes
- JSON files are used instead of inline JSON to avoid CMD parsing issues.
- This project is a simple demonstration of AWS CLI usage for learning purposes.

