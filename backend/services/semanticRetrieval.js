const { createEmbedding } = require("./embeddingService");

function cosineSimilarity(a, b) {

  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  return dot / (
    Math.sqrt(normA) *
    Math.sqrt(normB)
  );
}

async function getRelevantChunksSemantic(
  question,
  chunks
) {

  const questionEmbedding =
    await createEmbedding(question);

  const scoredChunks = [];

  for (let i = 0; i < chunks.length; i++) {

    const chunkEmbedding =
      await createEmbedding(chunks[i]);

    const score = cosineSimilarity(
      questionEmbedding,
      chunkEmbedding
    );

    scoredChunks.push({
      chunkId: i + 1,
      chunk: chunks[i],
      score
    });
  }

  scoredChunks.sort(
    (a, b) => b.score - a.score
  );

  return scoredChunks.slice(0, 3);
}

module.exports = {
  getRelevantChunksSemantic
};