# NEXORS: PRODUCT ROADMAP & FEATURE PRIORITIZATION

**ROL:** Chief Product Officer
**OBJETIVO:** Definir la hoja de ruta de producto de 12 meses, priorizando las 100 *features* para maximizar el Impacto (Revenue, Retention, Acquisition) con el menor Esfuerzo Técnico.

---

## 1. FEATURE PRIORITIZATION MATRIX (Scorecard de las 100 Features)

La priorización se realiza utilizando el marco **ICE (Impact, Confidence, Ease)**, adaptado a **Impacto (I)** y **Esfuerzo (E)**, donde el Score = Impacto / Esfuerzo.

### Escala de Puntuación

*   **Impacto (1-10):** 10 = Genera MRR directo (ej. White-Label), 1 = Mejora estética (ej. Dark Mode).
*   **Esfuerzo (1-10):** 10 = Requiere integración de API compleja (ej. Google Flights), 1 = Cambio de texto en la UI.

### Matriz de Priorización (Extracto de las 100 Features)

| Feature | Impacto (I) | Esfuerzo (E) | Score (I/E) | Priority Rank | Quarter (Q) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1. White-Label Instantáneo** | 10 (Retention/Revenue) | 5 | **2.00** | CRÍTICO | Q1 |
| **2. Cobro de Comisión Automático** | 10 (Revenue) | 5 | **2.00** | CRÍTICO | Q1 |
| **3. Tracking en Tiempo Real (Realtime)** | 9 (Retention/Core) | 5 | **1.80** | CRÍTICO | Q1 |
| **4. Integración Google Flights** | 8 (Acquisition/UX) | 6 | **1.33** | ALTO | Q2 |
| **5. Scheduling Avanzado (Eventos)** | 8 (Revenue/Retention) | 6 | **1.33** | ALTO | Q2 |
| **6. API Access (B2B)** | 7 (Revenue/Retention) | 6 | **1.17** | ALTO | Q2 |
| **7. Analytics Avanzado (Reportes)** | 7 (Retention/Revenue) | 7 | **1.00** | MEDIO | Q2 |
| **8. Dark Mode** | 2 (Retention/UX) | 3 | **0.67** | BAJO | Q4 |
| **9. Soporte para Criptomonedas** | 3 (Acquisition/Innovación) | 8 | **0.38** | BAJO | Q4 |
| **10. Reconocimiento Facial (Driver)** | 5 (Operations/Security) | 9 | **0.56** | BAJO | Q3 |

---

## 2. ROADMAP DE 12 MESES (Visión de Producto)

El *roadmap* se divide en 4 fases trimestrales, cada una con un objetivo estratégico claro.

| Versión | Período | Objetivo Estratégico | Features Clave (Score > 1.0) |
| :--- | :--- | :--- | :--- |
| **MVP (V1.0)** | Semana 1-2 | **Validación de Core y Monetización.** Probar el flujo de booking, pagos y tracking. | 20 Features de TIER 1 (Score 1.8 - 2.0). |
| **V1.1 (Growth)** | Semana 3-8 (Q1) | **Retención y Expansión de MRR.** Implementar las *sticky features* que reducen el *churn* y permiten el *upsell*. | White-Label, Sistema de Afiliados, Pre-autorización de Pago, Notificaciones Push. |
| **V2.0 (Scale)** | Mes 3-6 (Q2) | **Escalabilidad B2B y Globalización.** Abrir la plataforma a integraciones y optimizar la experiencia de los gestores de flotas. | Integración Google Flights, Scheduling Avanzado, API Access, Analytics Avanzado, Geolocalización PostGIS. |
| **V3.0 (Domination)** | Mes 6-12 (Q3-Q4) | **Innovación y Eficiencia Operacional.** Implementar Machine Learning para la predicción de demanda y explorar nuevos mercados. | ML para Surge Pricing, Soporte Criptomonedas, Marketplace de Servicios, Refactorización de Deuda Técnica. |

---

## 3. COMPETITIVE FEATURE MATRIX (Diferenciación Única)

NEXORS compite en el nicho de **Tecnología B2B para Flotas de Lujo**, no en el mercado de consumo masivo.

| Feature | Uber/Lyft (Consumo) | Limo.com (B2B Legacy) | NEXORS (B2B White-Label) |
| :--- | :--- | :--- | :--- |
| **White-Label (Marca Propia)** | No | Limitado (Alto Costo) | **Sí (Instantáneo, Core Feature)** |
| **Comisión por Booking** | 25-40% | 0% (SaaS Puro) | **12-18% (Modelo Híbrido)** |
| **Real-time Tracking (Pasajero)** | Sí | No (o muy básico) | **Sí (Supabase Realtime)** |
| **Scheduling Avanzado (Eventos)** | No | Sí (Complejo) | **Sí (UX Simplificada)** |
| **API Access (B2B)** | No | No | **Sí (Premium Feature)** |
| **Multi-Moneda/Multi-Idioma (20)** | Limitado | No | **Sí (Core Feature)** |

**Diferenciador Único de NEXORS:** La combinación de un **modelo de negocio híbrido (SaaS + Comisión)** con una **tecnología de infraestructura moderna (Edge/Realtime)** que permite a las flotas de élite operar bajo su propia marca con una eficiencia de nivel Uber.

---

## 4. USER FEEDBACK LOOP (Cultura de Producto)

El *feedback loop* debe ser rápido y continuo, integrando datos cualitativos y cuantitativos.

| Tipo de Feedback | Cadencia | Herramienta Recomendada | Quién Analiza | Cómo Influye en Decisiones |
| :--- | :--- | :--- | :--- | :--- |
| **Cuantitativo (Uso)** | Diario/Real-time | **Mixpanel/Posthog** | VP Product, CTO | Feature Adoption, Funnel Drop-offs, Latencia. |
| **Cualitativo (Soporte)** | Semanal | Intercom/Zendesk (Integrado con Chat) | Head of Driver Relations, Customer Support | Identificación de *pain points* y bugs críticos (Score 10/1). |
| **Entrevistas (B2B)** | Mensual | Zoom/Google Meet | VP Product, CMO | Descubrimiento de nuevas *features* de alto valor (Score 8-10). |
| **Encuestas (NPS)** | Trimestral | Typeform/SurveyMonkey | COO | Medición de la salud general del producto y la lealtad. |

---

## 5. METRICS & DASHBOARDS (Product)

El dashboard de producto se centra en la salud del usuario y la eficiencia de la plataforma.

| Métrica | Categoría | Frecuencia | Red Flag (Acción) |
| :--- | :--- | :--- | :--- |
| **DAU/MAU (Daily/Monthly Active Users)** | Core Health | Diario | MAU < 50% de la meta (Revisar Onboarding Flow). |
| **Feature Adoption Rate** | Feature Health | Semanal | Tasa < 20% para una feature clave (Revisar UX/Marketing). |
| **API Latency (p95)** | Performance | Real-time | > 200ms (CTO: Revisar Cloudflare Workers). |
| **Retention Rate (Flotilla)** | Business | Mensual | < 95% (VP Product: Revisar Churn Reasons). |
| **Time to First Ride (TTFR)** | Onboarding | Diario | > 48 horas (COO: Simplificar Vetting/Setup). |

---

## 6. A/B TESTING ROADMAP (Q1)

Los experimentos se centran en la monetización y la optimización del *funnel* de conversión.

| Experimento | Variable | Métrica de Éxito | Duración | Owner |
| :--- | :--- | :--- | :--- | :--- |
| **E1: Pricing Page** | Mostrar $499 vs $299 como precio ancla. | Tasa de Conversión (Plan Pro). | 14 días | CMO |
| **E2: Onboarding Flow** | Requerir datos de vehículo antes vs después del pago. | Time to First Ride (TTFR). | 7 días | VP Product |
| **E3: CTA Landing** | "Book Now" vs "Manage Fleet". | Tasa de Clics (CTR) en el CTA. | 7 días | CMO |
| **E4: Surge Pricing UI** | Mostrar el multiplicador (1.3x) vs solo el precio final. | Tasa de Conversión de Booking. | 14 días | VP Product |
| **E5: White-Label Trial** | 7 días gratis vs 30 días gratis. | Tasa de Conversión a Pago (Churn). | 30 días | Head of Sales |

---

## 7. LOCALIZATION STRATEGY (Más Allá de la Traducción)

La localización es un factor clave para la escalabilidad global (Feature 1.20).

| Región | Requisito de Localización | Feature Adicional Necesaria | Timeline |
| :--- | :--- | :--- | :--- |
| **USA** | **Pagos:** Integración con Stripe (para corporativos). **Compliance:** ADA (Accesibilidad). | Integración con sistemas de contabilidad (QuickBooks). | Q1 |
| **BRASIL** | **Pagos:** Pix (Transferencia instantánea). **Feature:** Soporte para vehículos de logística (furgonetas, camiones). | Integración con sistemas de gestión de impuestos (Nota Fiscal). | Q2 |
| **MÉXICO** | **Pagos:** OXXO/Transferencias bancarias. **Feature:** Soporte para facturación electrónica (CFDI). | Integración con sistemas de gestión de eventos locales. | Q1 |
| **EUROPA** | **Pagos:** SEPA, Apple Pay. **Compliance:** GDPR (DPA). | Soporte para múltiples idiomas en un solo viaje (ej. driver habla francés, pasajero alemán). | Q2 |

---

## 8. TECHNICAL DEBT & REFACTORING (Plan de Sostenibilidad)

La velocidad de 48 horas genera deuda técnica que debe ser gestionada proactivamente para evitar un colapso en la Fase de Escalabilidad (V2.0).

| Deuda Técnica | Problema Potencial | Timeline para Abordar |
| :--- | :--- | :--- |
| **Lógica de Pricing (Server Action)** | La lógica de precios en Next.js Server Action puede ser lenta y costosa de escalar. | **Q2 (Mes 4):** Migrar la lógica de Pricing y Estimación a **Cloudflare Workers** (Edge Computing) para latencia < 50ms. |
| **PostGIS (Ubicación)** | El uso de `geometry(Point, 4326)` en Supabase puede ser complejo de consultar sin optimización. | **Q2 (Mes 5):** Crear índices espaciales avanzados y funciones de PostgreSQL para optimizar las consultas de geolocalización. |
| **Monolito de Auth** | La autenticación de Driver, Pasajero y Gestor está en la misma tabla `users`. | **Q3 (Mes 7):** Refactorizar a un modelo de *Roles* más granular y separar la lógica de Auth en microservicios (Workers). |
| **Security Tech Debt** | La validación de *webhooks* de pago puede ser vulnerable. | **Q1 (Mes 2):** Implementar validación de firma digital y *rate limiting* en todos los *endpoints* de pago. |

---
[Fin del Product Roadmap & Feature Prioritization]
