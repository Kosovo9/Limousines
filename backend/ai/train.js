import { readFileSync, writeFileSync, existsSync } from 'fs'
import path from 'path'
import { HfInference } from '@huggingface/inference'

const hf = new HfInference(process.env.HF_TOKEN)
const TOP_20 = [
  'en','es','fr','de','it','pt','ru','ja','ko','zh',
  'ar','hi','bn','tr','pl','nl','sv','th','vi','id'
]
const EMBEDDINGS_FILE = path.resolve('data/embeddings.json')

export async function train() {
  // If we already have embeddings on disk, load them (quick start)
  if (existsSync(EMBEDDINGS_FILE)) {
    console.log('⚡ Loading pre-trained AI memory from disk...')
    const file = readFileSync(EMBEDDINGS_FILE, 'utf8')
    global.embeddings = JSON.parse(file)
    console.log(`✅ Loaded ${global.embeddings.length} entries.`)
    return
  }

  // Otherwise, train from scratch
  const QA = {}
  try {
      for (const lang of TOP_20) {
        // Fallback if file doesn't exist
        const p = path.resolve(`data/qa/${lang}.json`)
        if (existsSync(p)) {
            const file = readFileSync(p, 'utf8')
            QA[lang] = JSON.parse(file)
        }
      }
  } catch(e) { console.error('Error loading QA files', e) }

  const embeddings = []
  console.log('🧠 Starting AI Training (generating embeddings)...')
  
  // NOTE: Real-time embedding for 2000 items might take time or hit rate limits on free tier.
  // For demo persistence, we mock the vector generation or limit usage.
  // In production, run this primarily in build time or background worker.
  
  if (!process.env.HF_TOKEN) {
      console.warn('⚠️ No HF_TOKEN provided. AI strictly using keyword match fallback.')
      global.embeddings = []
      return
  }

  try {
      for (const [lang, pairs] of Object.entries(QA)) {
        for (const { q, a } of pairs) {
          // Actual call to HF for embedding
          const vector = await hf.featureExtraction({
            model: 'sentence-transformers/all-MiniLM-L6-v2',
            inputs: q,
          })
          embeddings.push({ lang, q, a, vector })
        }
      }
      global.embeddings = embeddings
      writeFileSync(EMBEDDINGS_FILE, JSON.stringify(embeddings))
      console.log('✅ AI trained & saved to disk.')
  } catch (err) {
      console.error('❌ AI Training failed:', err.message)
      global.embeddings = []
  }
}
