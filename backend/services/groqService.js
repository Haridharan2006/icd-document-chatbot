const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function askGroq(context, question) {
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are an ICD document assistant. Answer only using the provided document content. If the answer is not present, say 'I could not find that information in the document.'"
      },
      {
        role: "user",
        content: `
Document Content:
${context}

Question:
${question}
`
      }
    ],
    model: "llama-3.3-70b-versatile",
    temperature: 0.1,
  });

  return completion.choices[0].message.content;
}

module.exports = { askGroq };