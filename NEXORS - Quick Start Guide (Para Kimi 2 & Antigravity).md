# NEXORS - Quick Start Guide (Para Kimi 2 & Antigravity)

## 1. CLONAR & SETUP (Minuto 1)

```bash
git clone https://github.com/[tu-user]/NEXORS.git
cd NEXORS
npm install
cp .env.example .env.local
```

Llenar .env.local con API keys.

## 2. VARIABLES DE ENTORNO (.env.local)

### SUPABASE
- `NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...`

### GOOGLE MAPS
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyD...`

### PAYPAL
- `NEXT_PUBLIC_PAYPAL_CLIENT_ID=xxxxx`
- `PAYPAL_SECRET=xxxxx`

### MERCADO PAGO
- `NEXT_PUBLIC_MERCADO_PAGO_TOKEN=xxxxx`

### TWILIO
- `NEXT_PUBLIC_TWILIO_ACCOUNT_SID=ACxxxx`
- `TWILIO_AUTH_TOKEN=xxxxx`

### RESEND
- `RESEND_API_KEY=re_xxxxx`

### CLOUDFLARE
- `CLOUDFLARE_API_TOKEN=xxxxx`
- `CLOUDFLARE_ZONE_ID=xxxxx`

## 3. ESTRUCTURA INICIAL (Qué construir primero)

**Semana 1 (MUST-HAVE):**
1. Landing page
2. Auth (signup/login)
3. Booking flow
4. Payment integration
5. Basic dashboard

**Semana 2 (NICE-TO-HAVE):**
6. Real-time tracking
7. Chat
8. Fleet dashboard
9. Analytics

## 4. DATABASE SCHEMA (DDL SQL para Supabase)

Ver `schema.sql` en repo (generado por Manus).

## 5. API ENDPOINTS (Documentación)

Ver `API.md` en repo.

## 6. TESTING FRAMEWORK

**Unit tests:**
`npm run test`

**E2E tests (Cypress):**
`npm run test:e2e`

**Coverage:**
`npm run test:coverage`

## 7. DEPLOYMENT (A Cloudflare)

**Preview:**
`npm run build`
`npm run preview`

**Production deploy:**
`git push origin main`

GitHub Actions automáticamente deploya.

## 8. TROUBLESHOOTING

### Error: "Supabase connection failed"
→ Verifica `NEXT_PUBLIC_SUPABASE_URL` y `ANON_KEY`.

### Error: "PayPal SDK not loading"
→ Verifica `NEXT_PUBLIC_PAYPAL_CLIENT_ID`.

### Error: "Google Maps API error"
→ Verifica `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` y que esté enabled en Google Console.

### Error: "Realtime not working"
→ Supabase Realtime disabled. Enablear en Supabase console.

## 9. COMMON TASKS

### Agregar nuevo endpoint API
1. Crear `/app/api/[resource]/[action].ts`
2. Export `POST/GET/PATCH/DELETE` function
3. Validar input, procesar, response

### Agregar componente nuevo
1. Crear `/components/[Name].tsx`
2. Usar Tailwind + variables CSS de colores
3. Exportar default component
4. Importar en página donde se usa

### Agregar página nueva
1. Crear `/app/[route]/page.tsx`
2. Wrapper con `useAuth()` si protegida
3. Exportar default component

### Agregar a Supabase schema
1. Supabase Dashboard → SQL Editor
2. Copiar DDL
3. Ejecutar
4. Update types (si TypeScript)

## 10. PERFORMANCE CHECKLIST

- [ ] Image optimization: Usar `next/image`
- [ ] Code splitting: Dynamic imports para componentes pesados
- [ ] Caching: Cloudflare headers configurados
- [ ] Bundle size: < 200KB inicial
- [ ] API response: < 200ms promedio
- [ ] Lighthouse score: > 85

## 11. SECURITY CHECKLIST

- [ ] HTTPS everywhere
- [ ] Rate limiting en APIs
- [ ] Input validation en todas las formas
- [ ] SQL injection prevention (parameterized queries)
- [ ] CORS configurado
- [ ] Secrets en .env (nunca en código)
- [ ] Error messages no revelan detalles internos
- [ ] Logging de intentos fallidos
