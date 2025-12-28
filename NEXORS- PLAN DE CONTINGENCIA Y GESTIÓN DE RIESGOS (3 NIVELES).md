# NEXORS: PLAN DE CONTINGENCIA Y GESTIÓN DE RIESGOS (3 NIVELES)

**ROL:** Chief Risk Officer & CTO
**OBJETIVO:** Definir protocolos de respuesta inmediata para los fallos más críticos del sistema, asegurando la continuidad del negocio (RTO < 1 hora).

---

## 1. MATRIZ DE RIESGOS CRÍTICOS

Basado en el "Risk Register & Contingencies" del Master Plan, se priorizan los fallos por su impacto en la operación y la reputación.

| Riesgo | Nivel | Impacto en Negocio | Protocolo de Respuesta |
| :--- | :--- | :--- | :--- |
| **Caída de Supabase (DB)** | **ALTO** | Pérdida total de datos en tiempo real, Auth, y transacciones. | **Riesgo ALTO** |
| **Fallo de Pago (PayPal/MP)** | **ALTO** | Pérdida de ingresos, frustración del usuario, riesgo de *chargebacks*. | **Riesgo ALTO** |
| **Fallo de Google Maps API** | **MEDIO** | Imposibilidad de calcular rutas/precios, *booking* detenido. | **Riesgo MEDIO** |
| **Fallo de Real-time Tracking** | **MEDIO** | Pérdida de confianza, llamadas al soporte, mala UX. | **Riesgo MEDIO** |
| **Bug Crítico en Producción** | **BAJO** | Pérdida de funcionalidad específica, errores de usuario. | **Riesgo BAJO** |

---

## 2. PLAN DE CONTINGENCIA POR NIVEL DE RIESGO

### 2.1. RIESGO ALTO (Impacto: Pérdida de Ingresos o Datos)

**A. FALLO CRÍTICO: CAÍDA DE SUPABASE (Base de Datos)**

| Paso | Acción | Responsable | RTO (Tiempo Objetivo) |
| :--- | :--- | :--- | :--- |
| **1. Detección** | Alerta automática de Sentry/Datadog (DB Connection Error). | DevOps Lead | T+0 min |
| **2. Respuesta** | Contactar inmediatamente al soporte Enterprise de Supabase. | CTO | T+5 min |
| **3. Contingencia** | **Failover a Read Replica:** Si es una falla regional, redirigir el tráfico de lectura a la réplica de respaldo. | DevOps Lead | T+15 min |
| **4. Comunicación** | Publicar estado en la página de status (Cloudflare Pages). | CCO | T+30 min |
| **5. Recuperación** | Restaurar el último *backup* (RPO < 15 min) si la falla es total. | CTO | T+60 min |

**B. FALLO CRÍTICO: FALLO DE PAGO (PayPal/Mercado Pago)**

| Paso | Acción | Responsable | RTO (Tiempo Objetivo) |
| :--- | :--- | :--- | :--- |
| **1. Detección** | Alerta de Sentry (5xx en `/api/payments/*`) + Alerta de PayPal/MP. | DevOps Lead | T+0 min |
| **2. Respuesta** | **Deshabilitar el método de pago fallido** en el frontend (Feature Flag). | Kimi 2 / Antigravity | T+5 min |
| **3. Contingencia** | **Redirección:** Si PayPal falla, forzar la redirección a Mercado Pago (y viceversa). | Kimi 2 / Antigravity | T+10 min |
| **4. Soporte** | Soporte al cliente ofrece **pago manual** (transferencia bancaria) o **código de promoción** para el siguiente viaje. | CCO | T+30 min |
| **5. Recuperación** | Monitorear el estado del proveedor y re-habilitar el método de pago. | DevOps Lead | T+60 min |

### 2.2. RIESGO MEDIO (Impacto: Pérdida de Funcionalidad Clave)

**A. FALLO: GOOGLE MAPS API (Cálculo de Precios/Rutas)**

| Paso | Acción | Responsable | RTO (Tiempo Objetivo) |
| :--- | :--- | :--- | :--- | |
| **1. Detección** | Alerta de Sentry (Error 4xx en `getRouteAndDistance`). | DevOps Lead | T+0 min |
| **2. Respuesta** | **Fallback Pricing:** Activar un *fallback* de precios basado en **distancia aérea** (Haversine Formula) y un precio fijo por tipo de vehículo. | Kimi 2 / Antigravity | T+10 min |
| **3. Contingencia** | Deshabilitar el cálculo de ruta visual en el mapa, pero permitir el *booking* con el precio *fallback*. | Kimi 2 / Antigravity | T+15 min |
| **4. Recuperación** | Monitorear el estado de Google y re-habilitar la API. | DevOps Lead | T+30 min |

**B. FALLO: REAL-TIME TRACKING (Supabase Realtime)**

| Paso | Acción | Responsable | RTO (Tiempo Objetivo) |
| :--- | :--- | :--- | :--- |
| **1. Detección** | Alerta de Sentry (WebSocket Disconnects Masivos). | DevOps Lead | T+0 min |
| **2. Respuesta** | **Degradación:** Cambiar el *polling* de la ubicación del driver de 5 segundos a 30 segundos (vía Server Action). | Kimi 2 / Antigravity | T+10 min |
| **3. Contingencia** | Notificar al pasajero: "El seguimiento en vivo está temporalmente degradado. Por favor, confíe en la ETA." | CCO | T+15 min |
| **4. Recuperación** | Si la falla persiste, evaluar la migración a un servicio de Real-time dedicado (ej. Ably/Pusher). | CTO | T+24 horas |

### 2.3. RIESGO BAJO (Impacto: Bugs o Fallas Aisladas)

**A. FALLO: BUG CRÍTICO EN PRODUCCIÓN (Ej. Botón de Pago Roto)**

| Paso | Acción | Responsable | RTO (Tiempo Objetivo) |
| :--- | :--- | :--- | :--- |
| **1. Detección** | Alerta de Sentry (Error Rate > 5% en una ruta). | DevOps Lead | T+0 min |
| **2. Respuesta** | **Rollback:** Revertir inmediatamente al *commit* anterior en GitHub (Zero-downtime deployment). | Antigravity Agent | T+15 min |
| **3. Contingencia** | Si el *rollback* no funciona, aplicar un *hotfix* de emergencia. | Kimi 2 / Antigravity | T+30 min |
| **4. Comunicación** | Notificar al equipo de soporte sobre el *bug* y la solución. | CCO | T+60 min |

---

## 3. RESUMEN DE RECUPERACIÓN

| Nivel de Riesgo | RTO Máximo | RPO Máximo | Estrategia Clave |
| :--- | :--- | :--- | :--- |
| **ALTO** | 60 minutos | 15 minutos | Failover, Redundancia de Pagos, Comunicación Inmediata. |
| **MEDIO** | 30 minutos | 0 minutos | Degradación Controlada, Fallback Logic (Haversine). |
| **BAJO** | 15 minutos | 0 minutos | Rollback Automático, Hotfix Rápido. |

---
[Fin del Plan de Contingencia y Gestión de Riesgos]
