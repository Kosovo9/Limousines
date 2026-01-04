# 🚀 CONFIGURACIÓN FINAL DE PRODUCCIÓN - LIMO.AD

Copia y pega estas variables en sus respectivos dashboards para que el sistema esté sincronizado al 100%.

---

## 1️⃣ BACKEND (Render.com)
**Sección:** *Environment -> Environment Variables*

| Clave | Valor Recomendado | Notas |
|:--- |:--- |:--- |
| **NODE_ENV** | `production` | Activa optimizaciones BESTIA |
| **PORT** | `5000` | Puerto interno |
| **FRONTEND_URL** | `https://limo.ad` | URL de tu dominio personalizado |
| **MONGO_URI** | `mongodb+srv://user:password@cluster0.mongodb.net/dbname` | Reemplaza con tu MONGO_URI real |
| **REDIS_URL** | `rediss://default:token@host:port` | Reemplaza con tu REDIS_URL real |
| **JWT_SECRET** | `TU_JWT_SECRET_DE_64_CARACTERES` | Debe coincidir con el Frontend |
| **CLERK_SECRET_KEY** | `sk_test_...` | Tu llave secreta de Clerk |
| **CLERK_PUBLISHABLE_KEY** | `pk_test_...` | Tu llave pública de Clerk |
| **STRIPE_SECRET_KEY** | `sk_test_...` | Tu llave secreta de Stripe |
| **GOOGLE_AI_API_KEY** | `AIzaSy...` | Tu llave de Google AI |

---

## 2️⃣ FRONTEND (Netlify)
**Sección:** *Site Settings -> Environment variables*

| Clave | Valor Recomendado | Notas |
|:--- |:--- |:--- |
| **VITE_API** | `https://limousines-api.onrender.com/api` | La URL de tu API en Render |
| **VITE_JWT_SECRET** | `TU_JWT_SECRET_DE_64_CARACTERES` | |
| **VITE_CLERK_PUBLISHABLE_KEY**| `pk_test_...` | |

---

## 🏗️ CONFIGURACIÓN DE CONSTRUCCIÓN (Netlify)

Para que el sistema **"All-in-One"** funcione (Landing + App en el mismo sitio), usa estos ajustes:

*   **Base directory:** `.` (Raíz)
*   **Build command:**
    ```bash
    npm run build:landing && npm run build:app && mkdir -p dist/app && cp -r frontend/landing/dist/* dist/ && cp -r frontend/app/dist/* dist/app/
    ```
*   **Publish directory:** `dist`

---

## 🌐 DOMINIO LIMO.AD
1.  En Netlify: **Domain Settings** -> **Add custom domain** -> Escribe `limo.ad`.
2.  Configura los registros **A** y **CNAME** que te dé Netlify en tu panel de control de dominio.
3.  Netlify generará el certificado **SSL (HTTPS)** automáticamente.

---

### 💡 TIP DE AGENTE:
Si quieres que el sistema cargue aún más rápido, una vez que el sitio esté live en `limo.ad`, dime y activaré el **Edge Caching** para las imágenes de las limusinas.
