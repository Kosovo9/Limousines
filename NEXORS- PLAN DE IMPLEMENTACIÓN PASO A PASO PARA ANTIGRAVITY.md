# NEXORS: PLAN DE IMPLEMENTACIÓN PASO A PASO PARA ANTIGRAVITY

**ROL:** Agente Antigravity (Optimización y Despliegue)
**OBJETIVO:** Tomar el código generado por Kimi 2 y Antigravity Agent, optimizarlo y prepararlo para el despliegue en producción en Cloudflare Pages.

---

## FASE 1: VALIDACIÓN Y ESTRUCTURA (Horas 0-4)

### 1.1. Estructura de Directorios (Verificación)

**INSTRUCCIÓN:** Verificar que la estructura de carpetas generada por Kimi 2 coincida con el `NEXORS_ULTIMATE_BLUEPRINT.md`.

| Ruta Clave | Archivo/Carpeta | Propósito |
| :--- | :--- | :--- |
| `/` | `package.json` | Dependencias (Next.js 15, Tailwind, Supabase, Zod). |
| `/` | `.env.local` | Variables de entorno (API Keys). |
| `/src/lib/` | `supabase/` | Clientes de Supabase (Server & Client). |
| `/src/lib/` | `actions/` | Server Actions (Lógica de negocio). |
| `/src/app/` | `(main)/` | Rutas principales (Booking, Dashboard). |
| `/src/app/api/` | `payments/` | API Routes para Webhooks y Pagos. |
| `/tests/` | `unit/` | Pruebas unitarias (Jest). |
| `/tests/` | `e2e/` | Pruebas End-to-End (Cypress). |

### 1.2. Validación de Tipos y Dependencias

**INSTRUCCIÓN:** Ejecutar comandos de validación.

1.  **Instalación:** `npm install`
2.  **Validación de Tipos:** `npm run typecheck` (Asegurar que no haya errores de TypeScript).
3.  **Linting:** `npm run lint` (Asegurar que el código cumpla con los estándares de Next.js).

---

## FASE 2: OPTIMIZACIÓN DE CÓDIGO (Horas 4-12)

**INSTRUCCIÓN:** Aplicar el `ANTIGRAVITY_OPTIMIZATION_PLAN.md` al código base.

### 2.1. Performance (Velocidad)

1.  **Imágenes:** Reemplazar todas las etiquetas `<img>` por `<Image>` de `next/image` para optimización automática.
2.  **Code Splitting:** Revisar `src/app/` y asegurar que los componentes pesados (ej. Mapas, Dashboards) usen `dynamic()` imports.
3.  **TanStack Query:** Verificar que todas las llamadas a Server Actions o APIs usen TanStack Query para *caching* y deduplicación.
4.  **Tailwind:** Ejecutar el *build* final para purgar el CSS no utilizado.

### 2.2. Seguridad (Blindaje)

1.  **Input Validation:** Verificar que todas las Server Actions y API Routes usen `Zod` para validar los datos de entrada.
2.  **RLS:** Confirmar que las consultas de Supabase usen el cliente de usuario (`createClient()`) y no el *Service Role Key* en el frontend.
3.  **Webhooks:** Verificar que los endpoints de pago (`/api/payments/*`) incluyan la lógica de verificación de firma (ej. `crypto.subtle` para PayPal/MP).

---

## FASE 3: QA Y PRUEBAS (Horas 12-20)

### 3.1. Pruebas Unitarias (Jest)

**INSTRUCCIÓN:** Ejecutar y verificar la cobertura.

1.  **Ejecución:** `npm run test:unit`
2.  **Cobertura:** Asegurar que la cobertura de las funciones críticas (`pricing.ts`, `auth.ts`) sea **> 70%**.

### 3.2. Pruebas E2E (Cypress)

**INSTRUCCIÓN:** Ejecutar el flujo de usuario completo.

1.  **Ejecución:** `npm run test:e2e`
2.  **Flujos Críticos:** Verificar que el flujo de **Registro → Booking → Pago** se complete sin errores.

---

## FASE 4: DEPLOYMENT Y MONITOREO (Horas 20-24)

### 4.1. Configuración de CI/CD

1.  **GitHub Actions:** Verificar que el archivo `.github/workflows/deploy.yml` esté configurado correctamente para Cloudflare Pages.
2.  **Secrets:** Asegurar que los *secrets* de GitHub (ej. `CLOUDFLARE_API_TOKEN`) estén cargados.

### 4.2. Despliegue Final

1.  **Build:** `npm run build` (Verificar que el build sea exitoso).
2.  **Push:** `git push origin main` (Esto activa el despliegue automático).
3.  **Monitoreo:** Verificar que Sentry y Mixpanel estén recibiendo datos de la aplicación desplegada.

---
[Fin del Plan de Implementación para Antigravity]
