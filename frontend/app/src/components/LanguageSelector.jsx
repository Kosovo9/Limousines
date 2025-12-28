import { useI18n } from '../hooks/useI18n'

export default function LanguageSelector() {
  const { lang, setLang, availableLanguages } = useI18n()

  const languageNames = {
    en: '🇺🇸 English',
    es: '🇪🇸 Español',
    fr: '🇫🇷 Français',
    de: '🇩🇪 Deutsch',
    it: '🇮🇹 Italiano',
    pt: '🇵🇹 Português',
    ru: '🇷🇺 Русский',
    ja: '🇯🇵 日本語',
    ko: '🇰🇷 한국어',
    zh: '🇨🇳 中文',
    ar: '🇸🇦 العربية',
    hi: '🇮🇳 हिन्दी',
    bn: '🇧🇩 বাংলা',
    tr: '🇹🇷 Türkçe',
    pl: '🇵🇱 Polski',
    nl: '🇳🇱 Nederlands',
    sv: '🇸🇪 Svenska',
    th: '🇹🇭 ไทย',
    vi: '🇻🇳 Tiếng Việt',
    id: '🇮🇩 Bahasa Indonesia'
  }

  return (
    <div className="language-selector">
      <select 
        value={lang} 
        onChange={(e) => setLang(e.target.value)}
        className="lang-select"
        aria-label="Select language"
      >
        {availableLanguages.map(l => (
          <option key={l} value={l}>
            {languageNames[l] || l.toUpperCase()}
          </option>
        ))}
      </select>
      <style jsx>{`
        .language-selector {
          position: relative;
        }
        .lang-select {
          padding: 0.5rem 2rem 0.5rem 0.75rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(10px);
          color: white;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='white' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.5rem center;
        }
        .lang-select:hover {
          border-color: rgba(255, 255, 255, 0.4);
          background: rgba(0, 0, 0, 0.5);
        }
        .lang-select:focus {
          outline: none;
          border-color: #4f46e5;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }
        .lang-select option {
          background: #1a1a1a;
          color: white;
          padding: 0.5rem;
        }
      `}</style>
    </div>
  )
}
