# MediCode AI

## Overview

MediCode AI is an AI-powered document query system designed for ICD-10 and ICD-11 medical coding documents. The application allows users to upload one or more PDF documents and ask natural language questions about their contents.

The system uses Retrieval-Augmented Generation (RAG) to retrieve relevant document sections and generate accurate responses using a Large Language Model (LLM).

---

## Features

* Multi-document PDF upload
* Automatic PDF text extraction
* Document chunking for efficient retrieval
* Semantic search using transformer-based embeddings
* AI-powered question answering using Groq LLM
* Source-aware responses
* Modern React-based chat interface
* Multiple document support
* Session-based document management

---

## Architecture

User Uploads PDF Documents

↓

PDF Text Extraction

↓

Document Chunking

↓

Embedding Generation

↓

Semantic Similarity Search

↓

Relevant Context Retrieval

↓

Groq LLM

↓

Answer + Source Documents

↓

React Chat Interface

---

## Tech Stack

### Frontend

* React
* Vite
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* Multer
* PDF-Parse

### AI Components

* Groq API
* Xenova Transformers
* Semantic Search
* Retrieval-Augmented Generation (RAG)

---

## Project Structure

```
icd-chatbot/
│
├── backend/
│   ├── services/
│   │   ├── pdfService.js
│   │   ├── embeddingService.js
│   │   └── groqService.js
│   │
│   ├── uploads/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── UploadCard.jsx
│   │   │   ├── ChatBox.jsx
│   │   │   └── DocumentList.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── index.css
│   │
│   └── package.json
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd icd-chatbot
```

### Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file:

```env
GROQ_API_KEY=your_groq_api_key
PORT=5000
```

Start backend:

```bash
node server.js
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

Backend will run at:

```
http://localhost:5000
```

---

## Usage

### Upload Documents

1. Open the application.
2. Click **Choose PDF Files**.
3. Select one or more ICD PDF documents.
4. Click **Upload**.

### Ask Questions

Example queries:

* What is cholera?
* Explain typhoid fever.
* What are the ICD codes for cholera?
* Compare classifications in ICD-10 and ICD-11.
* What diseases are included under A00-A09?

The chatbot retrieves relevant sections from uploaded documents and generates responses based on document content.

---

## APIs

### Upload PDF

```
POST /upload
```

Uploads and processes a PDF document.

---

### Ask Question

```
POST /ask
```

Request:

```json
{
  "question": "What is cholera?"
}
```

---

### Get Uploaded Documents

```
GET /documents
```

Returns a list of uploaded documents and chunk information.

---

### Clear Documents

```
DELETE /documents
```

Clears all uploaded documents from the current session.

---

## Future Enhancements

* Persistent vector database
* Drag-and-drop PDF upload
* Dark mode toggle
* Chat history persistence
* ICD code lookup mode
* ICD-10 vs ICD-11 comparison mode
* User authentication
* Cloud deployment

---

## Learning Outcomes

This project demonstrates:

* Retrieval-Augmented Generation (RAG)
* Semantic Search
* Transformer Embeddings
* PDF Processing
* Full-Stack Development
* React Frontend Development
* REST API Design
* LLM Integration
* Medical Document Analysis

---

## Author

Haridharan B S

Internship Project – MediCode AI
