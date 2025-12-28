function cosineSimilarity(a, b) {
  let dotProduct = 0;
  let mA = 0;
  let mB = 0;
  for (let i = 0; i < a.length; i++) {
    dotProduct += (a[i] * b[i]);
    mA += (a[i] * a[i]);
    mB += (b[i] * b[i]);
  }
  mA = Math.sqrt(mA);
  mB = Math.sqrt(mB);
  return (mA === 0 || mB === 0) ? 0 : dotProduct / (mA * mB);
}

export { cosineSimilarity }
