import{r as o,j as e,O as t,L as r}from"./vendor-CdqvSFFa.js";import{u as c}from"./useAuth-Cdlyv25G.js";import"./index-DLN0Q1Tb.js";const g=o.createContext(),d=()=>o.useContext(g);function h(){const{lang:s,setLang:n,availableLanguages:i}=d(),l={en:"🇺🇸 English",es:"🇪🇸 Español",fr:"🇫🇷 Français",de:"🇩🇪 Deutsch",it:"🇮🇹 Italiano",pt:"🇵🇹 Português",ru:"🇷🇺 Русский",ja:"🇯🇵 日本語",ko:"🇰🇷 한국어",zh:"🇨🇳 中文",ar:"🇸🇦 العربية",hi:"🇮🇳 हिन्दी",bn:"🇧🇩 বাংলা",tr:"🇹🇷 Türkçe",pl:"🇵🇱 Polski",nl:"🇳🇱 Nederlands",sv:"🇸🇪 Svenska",th:"🇹🇭 ไทย",vi:"🇻🇳 Tiếng Việt",id:"🇮🇩 Bahasa Indonesia"};return e.jsxs("div",{className:"language-selector",children:[e.jsx("select",{value:s,onChange:a=>n(a.target.value),className:"lang-select","aria-label":"Select language",children:i.map(a=>e.jsx("option",{value:a,children:l[a]||a.toUpperCase()},a))}),e.jsx("style",{jsx:!0,children:`
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
      `})]})}function b(){const{user:s}=c();return s?e.jsxs(e.Fragment,{children:[e.jsxs("nav",{className:"fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between",children:[e.jsxs("div",{className:"flex gap-6 items-center",children:[e.jsx(r,{to:"/dashboard",className:"text-xl font-bold tracking-tighter",children:"LiMo"}),e.jsx("div",{className:"h-6 w-px bg-white/20 mx-2"}),e.jsx(r,{to:"/dashboard",className:"hover:text-white/80 transition-colors",children:"Dashboard"}),e.jsx(r,{to:"/bookings",className:"hover:text-white/80 transition-colors",children:"Bookings"}),e.jsx(r,{to:"/profile",className:"hover:text-white/80 transition-colors",children:"Profile"})]}),e.jsx(h,{})]}),e.jsx("div",{className:"h-20"})," ",e.jsx(t,{})]}):e.jsx(t,{})}export{b as default};
