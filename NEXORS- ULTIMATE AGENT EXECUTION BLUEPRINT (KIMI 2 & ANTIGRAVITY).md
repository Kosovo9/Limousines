# NEXORS: ULTIMATE AGENT EXECUTION BLUEPRINT (KIMI 2 & ANTIGRAVITY)

**OBJETIVO:** Generar el 100% del código de NEXORS (MVP) en 48 horas.
**STACK:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Supabase, Cloudflare Workers.

---

## FASE 1: ESTRUCTURA DE DIRECTORIOS Y CONFIGURACIÓN BASE (COMPLETADA)

... (Contenido de la Fase 1) ...

---

## FASE 2: DATABASE SCHEMA (DDL SQL) Y TYPESCRIPT (COMPLETADA)

... (Contenido de la Fase 2) ...

---

## FASE 3: BACKEND LOGIC (API ENDPOINTS Y SERVER ACTIONS) (COMPLETADA)

... (Contenido de la Fase 3) ...

---

## FASE 4: FRONTEND UI Y SISTEMA DE DISEÑO (COMPLETADA)

... (Contenido de la Fase 4) ...

---

## FASE 5: INTEGRACIONES DE TERCEROS (COMPLETADA)

... (Contenido de la Fase 5) ...

---

## FASE 6: TESTING Y DEPLOYMENT

### 6.1. Testing Framework (Jest & Cypress)

**INSTRUCCIÓN A KIMI 2:** Generar la configuración base de Jest y Cypress.

*   **Jest:** Crear `tests/unit/pricing.test.ts` para probar la función `getRideEstimate` con diferentes escenarios (distancia, tipo de vehículo, surge).
*   **Cypress:** Crear `tests/e2e/bookingFlow.cy.ts` para simular el flujo completo: Login → Buscar Ruta → Seleccionar Vehículo → Iniciar Pago.

### 6.2. CI/CD (GitHub Actions)

**INSTRUCCIÓN A KIMI 2:** Crear el archivo `.github/workflows/deploy.yml` para el despliegue automático a Cloudflare Pages.

```yaml
# .github/workflows/deploy.yml
name: Deploy to Cloudflare Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Install dependencies
        run: npm install
      - name: Build
        run: npm run build
      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: nexors-app
          directory: .next
          # ... (Configuración de variables de entorno de Cloudflare)
```

---

## FASE 7: ENTREGA FINAL

... (Contenido de la Fase 7) ...
