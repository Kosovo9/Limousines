import { HfInference } from '@huggingface/inference'
import { writeFileSync } from 'fs'
import path from 'path'

const hf = new HfInference(process.env.HF_TOKEN)
const EMBEDDINGS_FILE = path.resolve('data/embeddings.json')

export async function learn({ text, correctAnswer, lang }) {
  if (!process.env.HF_TOKEN) return
  
  try {
      const vector = await hf.featureExtraction({
        model: 'sentence-transformers/all-MiniLM-L6-v2',
        inputs: text,
      })
      
      const newEntry = { lang, q: text, a: correctAnswer, vector }
      
      // Update in-memory
      if (!global.embeddings) global.embeddings = []
      global.embeddings.push(newEntry)
      
      // Persist to disk (simple append logic simulation by rewriting)
      // In real prod, use a Vector DB (Pinecone/Weaviate)
      writeFileSync(EMBEDDINGS_FILE, JSON.stringify(global.embeddings))
      
      console.log('✅ AI Learned new response for:', lang)
  } catch (e) {
      console.error('Learn failed:', e)
  }
}
