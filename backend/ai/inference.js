import { HfInference } from '@huggingface/inference'
import { cosineSimilarity } from './utils.js'

const hf = new HfInference(process.env.HF_TOKEN)

export async function ask({ text, lang = 'en' }) {
  if (!global.embeddings || global.embeddings.length === 0) {
      return { a: 'AI is warming up (or no token provided). Please try later.', learn: false }
  }

  try {
      const vector = await hf.featureExtraction({
        model: 'sentence-transformers/all-MiniLM-L6-v2',
        inputs: text,
      })
      
      const candidates = global.embeddings
        .filter(e => e.lang === lang)
        .map(e => ({ ...e, score: cosineSimilarity(vector, e.vector) }))
        .sort((a, b) => b.score - a.score)
      
      const top = candidates[0]
      // Threshold 0.6 for forgiveness in multi-lang models
      if (!top || top.score < 0.6) return { a: 'I am not sure I understand. Can you rephrase?', learn: true }
      
      return { a: top.a, learn: true }
  } catch (error) {
      console.error('Inference error:', error)
      return { a: 'Service momentarily unavailable.', learn: false }
  }
}
