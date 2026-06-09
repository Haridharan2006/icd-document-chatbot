function getRelevantChunks(question, chunks) {

  const keywords = question
    .toLowerCase()
    .split(" ");

  const scoredChunks = chunks.map((chunk, index) => {

    const lowerChunk = chunk.toLowerCase();

    let score = 0;

    keywords.forEach(word => {
      if (lowerChunk.includes(word)) {
        score++;
      }
    });

    return {
      chunkId: index + 1,
      chunk,
      score
    };
  });

  scoredChunks.sort((a, b) => b.score - a.score);

  return scoredChunks.slice(0, 3);
}

module.exports = { getRelevantChunks };