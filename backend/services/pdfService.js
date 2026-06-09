const fs = require("fs");
const { PDFParse } = require("pdf-parse");

async function extractText(pdfPath) {
  const dataBuffer = fs.readFileSync(pdfPath);

  const parser = new PDFParse({
    data: dataBuffer
  });

  const result = await parser.getText();

  return result.text;
}

module.exports = { extractText };