import axios from 'axios'
import fs from 'node:fs/promises'
import path from 'path'

// Using direct Unsplash source URLs which redirect to an image.
// In production, you might want to use the API properly to avoid rate limits or redirect issues,
// but for a pre-build script this is often sufficient for demos.
const SOURCES = [
  { name: 'wedding-limo', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80' },
  { name: 'party-bus', url: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=800&q=80' },
  { name: 'armored-suv', url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80' }, // Tough car look
  { name: 'xv-party', url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80' }, // Event/Party
  { name: 'champagne', url: 'https://images.unsplash.com/photo-1598155523122-38423bb4d6c1?auto=format&fit=crop&w=800&q=80' }
]

async function download(name, url) {
  try {
    console.log(`Downloading ${name} from ${url}...`)
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    await fs.writeFile(path.resolve('frontend/landing/public/photos', `${name}.jpg`), response.data)
    console.log(`✅ Saved ${name}.jpg`)
  } catch (err) {
    console.error(`❌ Failed to download ${name}: ${err.message}`)
  }
}

(async () => {
  try {
    // Ensure directory exists in frontend/landing/public/photos
    await fs.mkdir('frontend/landing/public/photos', { recursive: true })
    
    for (const img of SOURCES) {
      await download(img.name, img.url)
    }
    console.log('✅ All royalty-free photos processed.')
  } catch (e) {
    console.error('Script error:', e)
    process.exit(1)
  }
})()
