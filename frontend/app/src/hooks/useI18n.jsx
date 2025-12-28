import { createContext, useContext, useState, useEffect } from 'react'

const LANGS = ['en','es','fr','de','it','pt','ru','ja','ko','zh','ar','hi','bn','tr','pl','nl','sv','th','vi','id']

const I18nCtx = createContext()

export const I18nProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    const browserLang = navigator.language.slice(0, 2)
    return LANGS.includes(browserLang) ? browserLang : 'en'
  })
  const [translations, setTranslations] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    // Try to load the selected language, fallback to English
    import(`../locales/${lang}.json`)
      .then(module => {
        setTranslations(module.default)
        setLoading(false)
      })
      .catch(() => {
        // If language file doesn't exist, load English
        import('../locales/en.json')
          .then(module => {
            setTranslations(module.default)
            setLoading(false)
          })
          .catch(() => {
            console.error('Failed to load translations')
            setLoading(false)
          })
      })
  }, [lang])

  const t = (key) => {
    return translations[key] || key
  }

  return (
    <I18nCtx.Provider value={{ t, lang, setLang, loading, availableLanguages: LANGS }}>
      {children}
    </I18nCtx.Provider>
  )
}

export const useI18n = () => useContext(I18nCtx)
