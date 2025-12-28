export async function askAI(text, lang) {
  const res = await fetch(`${import.meta.env.VITE_API}/ai/ask`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, lang })
  })
  return res.json()
}

export async function learnAI(text, correctAnswer, lang) {
  await fetch(`${import.meta.env.VITE_API}/ai/learn`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, correctAnswer, lang })
  })
}
