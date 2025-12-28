# 🚀 LIMOUSINES - Checklist de Deployment

## ✅ Estado Actual
- ✅ Código en GitHub: https://github.com/Kosovo9/Limousines
- ✅ CI/CD configurado (.github/workflows/ci.yml)
- ✅ Archivos netlify.toml creados para frontend
- ✅ render.yaml creado para backend
- ✅ **i18n**: 20 idiomas configurados (backend completo, frontend parcial ~5%)
  - Ver detalles en: `I18N_STATUS.md`

---

## 🔴 PENDIENTES CRÍTICOS PARA DEPLOYMENT

### 1. **BACKEND - Render.com** 🖥️

#### 1.1 Crear Cuenta y Servicio
- [ ] Ir a https://render.com y crear cuenta (gratis)
- [ ] Conectar con GitHub
- [ ] Crear nuevo **Web Service**
- [ ] Seleccionar repositorio: `Kosovo9/Limousines`
- [ ] Configurar:
  - **Name**: `limousines-api`
  - **Environment**: `Node`
  - **Region**: `Oregon (US West)` o el más cercano
  - **Branch**: `main`
  - **Root Directory**: `backend`
  - **Build Command**: `npm install`
  - **Start Command**: `npm start`
  - **Plan**: `Free`

#### 1.2 Variables de Entorno en Render
Ir a **Environment** y agregar:

```bash
# Base de datos
MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/limousines?retryWrites=true&w=majority
REDIS_URL=redis://red-xxxxx:6379

# JWT
JWT_SECRET=GENERAR_SECRETO_SEGURO_64_CARACTERES
JWT_REFRESH_SECRET=GENERAR_OTRO_SECRETO_SEGURO_64_CARACTERES

# Puerto
PORT=5000

# Pagos
MP_ACCESS_TOKEN=APP_USR-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
PP_CLIENT=AYxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
PP_SECRET=EGxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Frontend URL (actualizar después de deployment)
FRONTEND_URL=https://limousines-app.netlify.app

# Clerk (autenticación)
CLERK_SECRET_KEY=sk_PLACEHOLDER_SECRET_KEY
CLERK_PUBLISHABLE_KEY=pk_PLACEHOLDER_PUBLISHABLE_KEY

# Node
NODE_VERSION=20
```

#### 1.3 Servicios Externos Necesarios

**MongoDB Atlas** (Base de datos - GRATIS)
- [ ] Ir a https://www.mongodb.com/cloud/atlas
- [ ] Crear cuenta gratuita
- [ ] Crear cluster (M0 Free Tier)
- [ ] Crear database user
- [ ] Whitelist IP: `0.0.0.0/0` (permitir todas)
- [ ] Copiar connection string → `MONGO_URI`

**Redis** (Cache - GRATIS)
Opción A - Render Redis:
- [ ] En Render, crear nuevo **Redis** service (free tier)
- [ ] Copiar URL → `REDIS_URL`

Opción B - Upstash:
- [ ] Ir a https://upstash.com
- [ ] Crear cuenta y Redis database
- [ ] Copiar URL → `REDIS_URL`

**Clerk** (Autenticación - GRATIS hasta 10k usuarios)
- [ ] Ir a https://clerk.com
- [ ] Crear cuenta y aplicación
- [ ] Copiar keys → `CLERK_SECRET_KEY` y `CLERK_PUBLISHABLE_KEY`
- [ ] Configurar dominios permitidos en Clerk Dashboard

---

### 2. **FRONTEND APP - Netlify** 📱

#### 2.1 Deployment
- [ ] Ir a https://app.netlify.com
- [ ] Click **Add new site** → **Import an existing project**
- [ ] Conectar con GitHub → Seleccionar `Kosovo9/Limousines`
- [ ] Configurar:
  - **Site name**: `limousines-app` (o el que prefieras)
  - **Base directory**: `frontend/app`
  - **Build command**: `npm install && npm run build`
  - **Publish directory**: `frontend/app/dist`
  - **Node version**: `20`

#### 2.2 Variables de Entorno en Netlify
Ir a **Site settings** → **Environment variables** y agregar:

```bash
# API Backend (actualizar con URL de Render)
VITE_API=https://limousines-api.onrender.com/api

# JWT Secret (mismo que en backend)
VITE_JWT_SECRET=MISMO_SECRETO_DEL_BACKEND_64_CARACTERES

# Clerk (mismo que backend)
VITE_CLERK_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### 2.3 Configuración Post-Deployment
- [ ] Copiar URL de Netlify (ej: `https://limousines-app.netlify.app`)
- [ ] Actualizar `FRONTEND_URL` en Render backend
- [ ] Agregar dominio en Clerk Dashboard → **Allowed origins**
- [ ] Redeploy backend en Render

---

### 3. **FRONTEND LANDING - Netlify** 🌐

#### 3.1 Deployment
- [ ] En Netlify, crear **otro site**
- [ ] Configurar:
  - **Site name**: `limousines-landing`
  - **Base directory**: `frontend/landing`
  - **Build command**: `npm install && npm run build`
  - **Publish directory**: `frontend/landing/dist`
  - **Node version**: `20`

#### 3.2 Sin Variables de Entorno
La landing page es estática, no requiere variables de entorno.

---

### 4. **CONFIGURACIONES ADICIONALES** ⚙️

#### 4.1 CORS en Backend
Verificar que `backend/server.js` tenga configurado CORS correctamente:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
```

#### 4.2 Actualizar URLs en Clerk
- [ ] Ir a Clerk Dashboard
- [ ] **Paths** → Configurar:
  - Sign-in URL: `https://limousines-app.netlify.app/login`
  - Sign-up URL: `https://limousines-app.netlify.app/register`
  - After sign-in: `https://limousines-app.netlify.app/dashboard`

#### 4.3 Dominios Personalizados (OPCIONAL)
Si tienes dominio propio:
- [ ] En Netlify → **Domain settings** → Add custom domain
- [ ] Configurar DNS según instrucciones de Netlify
- [ ] Actualizar todas las URLs en variables de entorno

---

## 🔧 SCRIPTS DE DEPLOYMENT

### Build Local (Verificar antes de deploy)
```bash
# Instalar todas las dependencias
npm install
cd backend && npm install
cd ../frontend/app && npm install
cd ../landing && npm install
cd ../..

# Build completo
npm run build

# Test local
npm run dev
```

### Verificar Build
```bash
# Backend
cd backend
npm start
# Debe correr en http://localhost:5000

# Frontend App
cd frontend/app
npm run build
npm run preview
# Debe mostrar la app

# Frontend Landing
cd frontend/landing
npm run build
npm run preview
# Debe mostrar la landing
```

---

## 📋 ORDEN DE DEPLOYMENT RECOMENDADO

1. **Primero**: Configurar servicios externos (MongoDB, Redis, Clerk)
2. **Segundo**: Deploy Backend en Render
3. **Tercero**: Deploy Frontend App en Netlify (con URL del backend)
4. **Cuarto**: Deploy Frontend Landing en Netlify
5. **Quinto**: Actualizar FRONTEND_URL en backend
6. **Sexto**: Configurar Clerk con URLs finales
7. **Séptimo**: Testing completo

---

## 🧪 TESTING POST-DEPLOYMENT

### Backend Health Check
```bash
curl https://limousines-api.onrender.com/health
# Debe retornar: {"status":"ok"}
```

### Frontend App
- [ ] Abrir `https://limousines-app.netlify.app`
- [ ] Verificar que carga sin errores
- [ ] Probar login/registro con Clerk
- [ ] Verificar que las llamadas API funcionan

### Frontend Landing
- [ ] Abrir `https://limousines-landing.netlify.app`
- [ ] Verificar que todas las imágenes cargan
- [ ] Verificar enlaces a la app

---

## 🚨 TROUBLESHOOTING COMÚN

### Error: "Cannot connect to database"
- Verificar `MONGO_URI` en Render
- Verificar IP whitelist en MongoDB Atlas (debe ser `0.0.0.0/0`)

### Error: "CORS policy"
- Verificar `FRONTEND_URL` en backend
- Verificar configuración CORS en `server.js`

### Error: "Clerk authentication failed"
- Verificar que las keys de Clerk coincidan en backend y frontend
- Verificar dominios permitidos en Clerk Dashboard

### Error: "API calls failing"
- Verificar `VITE_API` en Netlify apunta a la URL correcta de Render
- Verificar que backend esté corriendo (no en sleep mode)

---

## 💰 COSTOS ESTIMADOS

- **MongoDB Atlas**: $0 (Free Tier M0)
- **Redis (Render/Upstash)**: $0 (Free Tier)
- **Clerk**: $0 (hasta 10,000 usuarios)
- **Render Backend**: $0 (Free Tier - duerme después de inactividad)
- **Netlify Frontend**: $0 (Free Tier - 100GB bandwidth)

**TOTAL: $0/mes** 🎉

---

## 📞 SIGUIENTE PASO

**¿Quieres que te ayude a hacer el deployment paso a paso?**

Puedo:
1. Generar los secretos JWT seguros
2. Guiarte en la configuración de cada servicio
3. Verificar que todo esté correcto antes de deployar
4. Hacer el deployment automático si tienes las credenciales

**¿Por dónde empezamos?** 🚀
