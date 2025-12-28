import { useState } from 'react'
import { askAI, learnAI } from '../hooks/useAI'
import { useI18n } from '../hooks/useI18n'

export default function HelpDesk() {
  const [input, setInput] = useState('')
  const [reply, setReply] = useState('')
  const { t, lang } = useI18n()

  const send = async () => {
    if (!input) return
    const res = await askAI(input, lang)
    setReply(res.a)
    if (res.learn) {
      // Feedback loop simulation
      // In a real UI, this would be a "Thumbs Down" button triggering a form
      // prompt implementation as requested within block structure:
      setTimeout(() => {
          const correct = prompt(t('Was this helpful?'))
          if (correct) learnAI(input, correct, lang)
      }, 500)
    }
  }

  return (
    <div className="p-4 bg-gray-800 text-white rounded shadow-lg max-w-md">
      <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
        🤖 {t('Help Desk 24/7')}
      </h2>
      <div className="mb-4 text-sm text-gray-400">Lang: {lang.toUpperCase()}</div>
      
      <div className="flex gap-2">
        <input 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            className="w-full px-3 py-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400" 
            placeholder={t('Ask anything...')} 
            onKeyDown={e => e.key === 'Enter' && send()}
        />
        <button onClick={send} className="bg-yellow-400 text-black px-4 py-2 rounded font-bold hover:bg-yellow-300">
            {t('Send')}
        </button>
      </div>
      
      {reply && (
        <div className="mt-4 p-3 bg-gray-700 rounded border-l-4 border-yellow-400 animate-fade-in">
            <p className="text-yellow-100">{reply}</p>
        </div>
      )}
    </div>
  )
}
