const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
require("dotenv").config();
const { extractText } = require("./services/pdfService");
const app = express();
const { askGroq } = require("./services/groqService");
const { createChunks } = require("./services/chunkService");
const { getRelevantChunks } = require("./services/retrievalService");
const {getRelevantChunksSemantic} = require("./services/semanticRetrieval");
app.use(cors());
app.use(express.json());
let documents = [];
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.get("/", (req, res) => {
  res.send("ICD Chatbot Backend Running");
});

app.post("/upload", upload.single("pdf"), async (req, res) => {

  if (!req.file) {
    return res.status(400).json({
      message: "No file uploaded"
    });
  }

  const documentText = await extractText(req.file.path);

  const chunks = createChunks(documentText);

  documents.push({
    filename: req.file.originalname,
    chunks
  });

  res.json({
    message: "PDF uploaded and processed",
    filename: req.file.originalname,
    chunks: chunks.length,
    totalDocuments: documents.length
  });

});
app.post("/ask", async (req, res) => {

  const { question } = req.body;

  if (documents.length === 0) {
    return res.status(400).json({
      answer: "Please upload a PDF first."
    });
  }

  try {

    let allRelevantChunks = [];

    for (const doc of documents) {

      const chunks =
        await getRelevantChunksSemantic(
          question,
          doc.chunks
        );

      chunks.forEach(chunk => {
        allRelevantChunks.push({
          filename: doc.filename,
          ...chunk
        });
      });

    }

    allRelevantChunks.sort(
      (a, b) => b.score - a.score
    );

    const relevantChunks =
      allRelevantChunks.slice(0, 5);

    const context = relevantChunks
      .map(item => item.chunk)
      .join("\n\n");

    const answer = await askGroq(
      context,
      question
    );

    res.json({
      answer,
      sources: [...new Set(
        relevantChunks.map(
          item => item.filename
        )
      )]
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      answer: "Error communicating with Groq."
    });

  }

});
const PORT = process.env.PORT || 5000;

app.get("/documents", (req, res) => {

  res.json({
    documents: documents.map(doc => ({
      filename: doc.filename,
      chunks: doc.chunks.length
    }))
  });

});
app.delete("/documents", (req, res) => {

  documents = [];

  res.json({
    message: "All documents cleared"
  });

});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});