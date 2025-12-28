# NEXORS: ANALYTICS, BI & INSIGHTS

**ROL:** Head of Analytics & VP Data
**OBJETIVO:** Establecer un marco de datos (Data Framework) que permita la toma de decisiones basada en métricas, la predicción de comportamiento del usuario y la optimización del Revenue.

---

## 1. ANALYTICS FRAMEWORK (Eventos y Propiedades)

El *framework* se centra en la trazabilidad del *funnel* de monetización y la calidad del servicio.

| Evento Clave | Propiedades Asociadas | Funnel (Etapa) |
| :--- | :--- | :--- |
| **User Signed Up** | `userId`, `timestamp`, `userRole` (passenger/fleet/driver), `acquisitionChannel`, `country`. | Adquisición |
| **Fleet Subscribed** | `fleetId`, `subscriptionPlan`, `priceMonthly`, `paymentMethod`. | Monetización (SaaS) |
| **Ride Booked** | `rideId`, `vehicleType`, `distanceKm`, `estimatedPrice`, `isScheduled` (vs instant). | Booking |
| **Payment Completed** | `rideId`, `amount`, `paymentMethod` (paypal/mp), `isFirstPayment`, `transactionId`. | Monetización (Comisión) |
| **Ride Completed** | `rideId`, `driverId`, `fleetId`, `actualDuration`, `actualPrice`, `commissionEarned`. | Servicio |
| **Rating Submitted** | `rideId`, `stars`, `commentLength`, `tags` (clean car, late, etc.). | Calidad/Retention |
| **Feature Adopted** | `featureName` (white_label, advanced_scheduling), `fleetId`, `usageCount`. | Producto |

**Tool:** **Posthog** (o Mixpanel) para *event tracking* y *funnel analysis*. Integración directa con Supabase (PostgreSQL) para *data warehousing*.

---

## 2. DASHBOARDS (Real-time Decision Making)

Cada rol de liderazgo tiene un *dashboard* dedicado, centrado en sus métricas de acción.

| Dashboard | Rol | Métricas Clave | Frecuencia |
| :--- | :--- | :--- | :--- |
| **Executive** | CEO | MRR, Churn Rate, LTV/CAC, Growth Rate (MoM). | Diario |
| **Operations** | COO | Support Tickets (SLA), Payment Success Rate, Driver Vetting Status, Incident Count. | Real-time |
| **Product** | VP Product | Feature Adoption Rate, Conversion Rate (Booking), API Latency, Error Rate. | Diario/Semanal |
| **Finance** | CFO | Revenue (SaaS vs Commission), Expenses (Vendor Costs), Burn Rate, Runway (Meses). | Mensual |
| **Sales** | Head of Sales | Pipeline Value, Conversion Rate (Demo to Close), CAC by Channel. | Semanal |

---

## 3. METRICS LIBRARY (Definiciones de Éxito)

| Categoría | Métrica | Definición | Target |
| :--- | :--- | :--- | :--- |
| **User** | **Retention (Day 30)** | % de usuarios que reservan un viaje 30 días después de su primer viaje. | > 15% |
| **Ride** | **Avg Revenue per Ride (ARR)** | Ingreso total (Comisión) / Total de viajes completados. | $15 USD |
| **Payment** | **Chargeback Rate** | % de transacciones disputadas por el banco. | < 0.5% |
| **Business** | **LTV/CAC Ratio** | Lifetime Value / Customer Acquisition Cost. | > 3:1 |
| **Operational** | **Uptime %** | Porcentaje de tiempo que la API de Booking está disponible. | 99.9% |

---

## 4. SEGMENTATION & COHORTS (Análisis de Comportamiento)

La segmentación permite personalizar el marketing y el desarrollo de productos.

| Segmento | Criterio de Segmentación | Acción Estratégica |
| :--- | :--- | :--- |
| **High-Value Customers** | Top 20% de flotillas por MRR o volumen de viajes. | Asignar un Account Manager dedicado (Q2). Ofrecer acceso Beta a nuevas features. |
| **At-Risk Churn** | Flotillas con Churn Score > 0.7 (predicción) o sin actividad en 30 días. | Campaña de re-engagement con descuento en el Plan Pro. Llamada de soporte proactiva. |
| **Corporate Accounts** | Flotillas con contratos B2B (Unlimited Executive). | Priorizar el desarrollo de features de facturación y reportes (Analytics Avanzado). |
| **Geographic Cohorts** | USA, México, Brasil, Europa. | Comparar el ARPU y el Churn entre regiones para identificar el *product-market fit* más fuerte. |

---

## 5. PREDICTIVE ANALYTICS ROADMAP (AI para el Revenue)

| Modelo Predictivo | Objetivo | Datos de Entrenamiento | Timeline |
| :--- | :--- | :--- | :--- |
| **Churn Prediction** | Identificar flotillas con alta probabilidad de cancelar su suscripción. | Historial de uso de features, tickets de soporte, rating promedio. | Q2 (Mes 4) |
| **Peak Demand Forecasting** | Predecir la demanda por zona y hora para optimizar el *surge pricing*. | Datos históricos de viajes, eventos locales (API), clima. | Q3 (Mes 7) |
| **LTV Prediction** | Estimar el valor futuro de un nuevo cliente en el momento del *signup*. | Canal de adquisición, plan de suscripción inicial. | Q1 (Mes 2) |
| **Fraud Detection** | Identificar patrones de pago inusuales o manipulación de GPS. | Transacciones fallidas, velocidad de GPS, viajes fantasma. | Q2 (Mes 5) |

---

## 6. RETENTION & ENGAGEMENT STRATEGIES

| Métrica | Target | Estrategia de Retención |
| :--- | :--- | :--- |
| **Retention Day 1** | > 50% | **In-App Tutorial:** Guía forzada para que el usuario complete su primer booking. |
| **Retention Day 7** | > 30% | **Email Sequence:** Demostrar el valor de las features core (Tracking, Chat). |
| **Retention Day 30** | > 15% | **Descuento:** Ofrecer un 10% de descuento en la comisión por booking si se renueva el Plan Pro. |
| **Win-Back Campaign** | 10% de ex-clientes regresan. | **Oferta:** 3 meses de Plan Basic gratis para flotillas que cancelaron hace más de 60 días. |

---

## 7. REPORTING CADENCE (Ritmo de la Empresa)

| Cadencia | Foco | Audiencia |
| :--- | :--- | :--- |
| **Daily Standup (15 min)** | MRR, Active Users, Critical Issues (Error Rate, Incident Count). | Equipo Fundador, Ingenieros. |
| **Weekly Review (1 hora)** | Cohort Analysis, Feature Adoption, Sales Pipeline, Churn Score. | Equipo de Liderazgo (CEO, CTO, CMO, COO). |
| **Monthly Review (2 horas)** | Full Financials, Vendor Costs, LTV/CAC, Investor Metrics. | Equipo de Liderazgo, Finance Controller. |
| **Quarterly Review (4 horas)** | Strategic Review, Product Roadmap Decisions, Hiring Plan. | Equipo Fundador, Board (futuro). |

---

## 8. DATA PRIVACY IN ANALYTICS (Compliance por Diseño)

| Principio | Implementación | Compliance |
| :--- | :--- | :--- |
| **Anonymization** | **Hashing:** Todos los `userId` y `fleetId` se almacenan en el *analytics tool* como *hashed IDs* (ej. SHA-256) para desvincularlos de la PII. | GDPR, CCPA |
| **Data Retention** | **Logs Detallados:** 7 días. **Datos de Analytics:** 90 días. **Datos de Transacción:** 7 años (por impuestos). | Minimización de datos. |
| **PII Storage** | **No almacenar PII** (Nombre, Email, Teléfono) en el *analytics tool*. Solo en Supabase (DB segura). | Reducción del riesgo de *data breach*. |
| **Deletion Requests** | **Proceso Automatizado:** Si un usuario solicita la eliminación de datos (GDPR), un *script* debe eliminar el *hashed ID* del *analytics tool* y la PII de Supabase. | Derecho al Olvido. |

---
[Fin del Analytics, BI & Insights Playbook]
