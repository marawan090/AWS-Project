# AWS Captain Project

## Project Overview
This project is a small hands-on example using **LocalStack** to simulate AWS services locally. The goal is to demonstrate basic usage of **AWS CLI** on Windows CMD for simple AWS operations.

Services included:
- **S3** for file storage
- **DynamoDB** as a NoSQL database
- **Lambda** for a simple serverless function

---

## Project Structure

- `s3/` → example files for S3 operations
- `dynamodb/` → JSON files for table creation and item operations
- `lambda/` → Lambda function code, ZIP file, and event JSON
- `screenshots/` → screenshots of the outputs
- `README.md` → this file

---

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

