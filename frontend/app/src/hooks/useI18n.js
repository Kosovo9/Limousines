import { createContext, useContext, useState } from 'react'
import { TOP_20 } from '../../../../backend/config/langs.js' 
// Note: In a real monorepo build, sharing generic config like langs array is tricky without workspace packages.
// For simplicity, we hardcode generic fallback or copy the array.
// Re-defining purely for frontend isolation:
const LANGS = ['en','es','fr','de','it','pt','ru','ja','ko','zh','ar','hi','bn','tr','pl','nl','sv','th','vi','id']

const I18nCtx = createContext()

export const I18nProvider = ({ children }) => {
  const [lang, setLang] = useState(navigator.language.slice(0, 2) || 'en')

  const t = (key) => {
    // Basic dictionary map. In prod this should fetch form /i18n/disclaimer or load json chunk
    const map = {
      en: { 'Help Desk 24/7': 'Help Desk 24/7', 'Ask anything...': 'Ask anything...', 'Send': 'Send', 'Was this helpful?': 'Was this helpful? Type correct answer or leave empty' },
      es: { 'Help Desk 24/7': 'Asistencia 24/7', 'Ask anything...': 'Pregunta lo que sea...', 'Send': 'Enviar', 'Was this helpful?': '¿Te ayudó? Escribe la respuesta correcta o déjalo vacío' },
      fr: { 'Help Desk 24/7': 'Assistance 24/7', 'Ask anything...': 'Demande n importe quoi...', 'Send': 'Envoyer', 'Was this helpful?': 'Est-ce utile ? Tape la bonne réponse ou laisse vide' },
      // ... expand as needed for UI components
    }
    const safeLang = LANGS.includes(lang) ? lang : 'en'
    return map[safeLang]?.[key] || key
  }

  return <I18nCtx.Provider value={{ t, lang, setLang }}>{children}</I18nCtx.Provider>
}
export const useI18n = () => useContext(I18nCtx)
