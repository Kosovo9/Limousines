---

### 4. DATABASE SCHEMA (SQL-Ready para Supabase/PostgreSQL)

El esquema de base de datos está diseñado para ser robusto, escalable y aprovechar las capacidades nativas de PostgreSQL (Supabase), incluyendo tipos de datos geoespaciales (`geometry` o `point`) para el tracking en tiempo real y el manejo eficiente de relaciones.

#### Entidades Principales y Estructura (DDL Simplificado)

| Tabla | Propósito | Clave Primaria (PK) | Claves Foráneas (FK) | Notas de Supabase |
| :--- | :--- | :--- | :--- | :--- |
| `users` | Autenticación y Perfiles | `id` (UUID) | - | Integración con `auth.users` |
| `companies` | Flotillas, Agencias, Operadores | `id` (UUID) | `owner_id` (FK a `users.id`) | Almacena plan SaaS y branding |
| `drivers` | Perfiles de Conductores | `id` (UUID) | `fleet_id` (FK a `companies.id`) | Almacena `rating`, `location` (Point) |
| `vehicles` | Inventario de Vehículos | `id` (UUID) | `fleet_id` (FK a `companies.id`) | Almacena `type`, `capacity`, `current_location` (Point) |
| `rides` | Transacciones de Viaje | `id` (UUID) | `user_id`, `driver_id`, `vehicle_id` | Almacena `pick_up`, `drop_off` (Point), `status` |
| `payments` | Historial de Transacciones | `id` (UUID) | `ride_id`, `user_id` | Almacena `method`, `amount`, `status` |
| `subscriptions` | Gestión de Suscripciones SaaS | `id` (UUID) | `fleet_id` (FK a `companies.id`) | Almacena `plan_type`, `price`, `start_date`, `end_date` |
| `ratings` | Feedback de Viajes | `id` (UUID) | `ride_id`, `user_id`, `driver_id` | Almacena `stars` (1-5), `comment` |
| `support_tickets` | Soporte al Cliente | `id` (UUID) | `user_id` | Almacena `status`, `priority` |
| `notifications` | Historial de Notificaciones | `id` (UUID) | `user_id` | Almacena `type` (SMS/Email/Push), `content` |

#### Relaciones Críticas (1:N y 1:1)

1.  **`users` 1:N `rides`**: Un usuario puede realizar múltiples viajes.
2.  **`companies` 1:N `vehicles`**: Una flotilla posee múltiples vehículos.
3.  **`companies` 1:N `drivers`**: Una flotilla gestiona múltiples conductores.
4.  **`rides` 1:1 `payments`**: Cada viaje completado genera un único registro de pago.
5.  **`rides` 1:N `ratings`**: Un viaje puede tener múltiples ratings (pasajero al driver, driver al pasajero, aunque inicialmente solo pasajero al driver).
6.  **`companies` 1:1 `subscriptions`**: Cada flotilla tiene una suscripción activa (o inactiva).

---

### 5. FEATURES PRIORIZADO (100 Features con Criterio de Impacto)

La priorización se basa en el **Impacto Crítico** para alcanzar el MVP en 48 horas (TIER 1), seguido por el **Valor Agregado** (TIER 2) y la **Escalabilidad/Dominación** (TIER 3).

#### TIER 1: MVP Crítico (20 Features - Horas 0-12)

| ID | Feature | Módulo | Impacto |
| :--- | :--- | :--- | :--- |
| 1.1 | Landing Page Multilingüe (20 idiomas) | Frontend | **Tracción/SEO** |
| 1.2 | Autenticación (Email/Google/Apple) | Auth | **Core** |
| 1.3 | Búsqueda de Ubicación (Google Places API) | Booking | **Core** |
| 1.4 | Selección de Tipo de Vehículo (4 tipos) | Booking | **Core** |
| 1.5 | Pricing Dinámico (Base + Distancia + Demanda) | Backend/API | **Core/Monetización** |
| 1.6 | Checkout Seguro (PayPal + Mercado Pago) | Pagos | **Monetización** |
| 1.7 | Confirmación de Viaje (SMS + Email) | Notificaciones | **UX/Core** |
| 1.8 | Tracking en Tiempo Real (Supabase Realtime) | Tracking | **UX/Core** |
| 1.9 | Chat Pasajero ↔️ Driver (Mensajes en vivo) | Tracking | **UX/Seguridad** |
| 1.10 | Rating Post-Viaje (1-5 estrellas) | Feedback | **Calidad** |
| 1.11 | Historial de Viajes (Pasajero) | Dashboard | **UX** |
| 1.12 | Dashboard Gestor de Flotilla (Vista general) | Dashboard B2B | **Core B2B** |
| 1.13 | Asignación de Choferes a Vehículos (Manual) | Dashboard B2B | **Core B2B** |
| 1.14 | Dashboard Chofer (Acepta/Rechaza viajes) | Driver App | **Core Driver** |
| 1.15 | Sistema de Facturación Automática (PDF) | Pagos | **Legal/B2B** |
| 1.16 | Suscripción SaaS (3 planes) | Monetización | **MRR** |
| 1.17 | Cobro de Comisión por Booking (Automático) | Monetización | **Revenue** |
| 1.18 | Panel de Control Admin (Transacciones, Usuarios) | Admin | **Control** |
| 1.19 | Soporte Live Chat (Widget) | Soporte | **UX/Retención** |
| 1.20 | Multi-moneda y Traducción Automática (20 idiomas) | Global | **Escalabilidad** |

#### TIER 2: Valor Agregado (30 Features - Horas 12-24)

| ID | Feature | Módulo | Impacto |
| :--- | :--- | :--- | :--- |
| 2.1 | Integración Google Flights (Detección de vuelos) | Booking | **UX Premium** |
| 2.2 | Scheduling Avanzado (Reserva múltiple/Eventos) | Booking | **B2B/Revenue** |
| 2.3 | Sistema de Afiliados (Referral program) | Marketing | **Tracción** |
| 2.4 | White-label Instantáneo (Logo/Colores de Flotilla) | B2B | **Retención B2B** |
| 2.5 | Recordatorios de Mantenimiento (Alertas a Gerente) | B2B | **Operacional** |
| 2.6 | Geolocalización de Driver (PostGIS/Supabase) | Tracking | **Eficiencia** |
| 2.7 | Sistema de Pre-autorización de Pago | Pagos | **Riesgo** |
| 2.8 | Notificaciones Push (Viajes, Cambios) | Notificaciones | **UX** |
| 2.9 | Opción "Viaje Favorito" (Guardar ruta) | Dashboard | **UX** |
| 2.10 | Perfil de Driver Detallado (Bio, Idiomas) | Driver App | **UX Premium** |
| 2.11 | Dashboard de Ingresos por Driver | Dashboard B2B | **Operacional** |
| 2.12 | Reporte de Ocupación de Vehículos (Heatmap) | Dashboard B2B | **Operacional** |
| 2.13 | Filtro de Búsqueda por Amenidades (Wi-Fi, Bebidas) | Booking | **UX Premium** |
| 2.14 | Integración con Calendario (Google/Outlook) | Booking | **UX** |
| 2.15 | Sistema de Créditos/Wallet (Pre-pago) | Pagos | **Retención** |
| 2.16 | Validación de Licencia de Conducir (OCR) | Admin | **Seguridad** |
| 2.17 | Alerta de Desviación de Ruta (Driver) | Tracking | **Seguridad** |
| 2.18 | Integración con CRM (Webhook para Salesforce/HubSpot) | B2B | **Escalabilidad** |
| 2.19 | Configuración de Tarifas Personalizadas (B2B) | Dashboard B2B | **B2B** |
| 2.20 | Dark Mode (Interfaz) | Frontend | **UX** |
| 2.21 | Opción "Propina al Driver" (Post-pago) | Pagos | **UX/Driver** |
| 2.22 | Reporte de Emisiones de CO2 por Viaje | Dashboard | **Sostenibilidad** |
| 2.23 | Autenticación de Dos Factores (2FA) | Auth | **Seguridad** |
| 2.24 | Integración con Slack/Teams (Notificaciones B2B) | B2B | **Operacional** |
| 2.25 | Exportación de Datos a Excel/CSV (Reportes) | Dashboard | **UX B2B** |
| 2.26 | Sistema de Quejas y Reembolsos (Flujo) | Soporte | **UX/Legal** |
| 2.27 | Mapa de Cobertura Global (Landing Page) | Frontend | **Marketing** |
| 2.28 | Pre-reserva de Asientos (Party Bus) | Booking | **UX Premium** |
| 2.29 | Sistema de Promociones y Cupones | Marketing | **Tracción** |
| 2.30 | Dashboard de Métricas de Retención (Churn, LTV) | Admin | **Control** |

#### TIER 3: Dominación y Escalabilidad (50 Features - Horas 24-36+)

| ID | Feature | Módulo | Impacto |
| :--- | :--- | :--- | :--- |
| 3.1 | API Pública para Integración de Partners | API | **Ecosistema** |
| 3.2 | Marketplace de Servicios Adicionales (Catering, Guía) | Monetización | **Revenue** |
| 3.3 | Integración con Sistemas de Logística (API) | B2B | **Expansión** |
| 3.4 | Machine Learning para Predicción de Demanda | AI/Backend | **Eficiencia** |
| 3.5 | Optimización de Rutas Multi-parada (Algoritmo) | Backend | **Operacional** |
| 3.6 | Sistema de Subastas de Viajes (Drivers) | Driver App | **Operacional** |
| 3.7 | Reconocimiento Facial/QR para Check-in (Driver) | Seguridad | **Seguridad** |
| 3.8 | Integración con Blockchain para Trazabilidad de Pagos | Pagos | **Innovación** |
| 3.9 | Sistema de Gamificación para Drivers (Bonos, Badges) | Driver App | **Retención Driver** |
| 3.10 | Soporte para Criptomonedas (Pagos) | Pagos | **Innovación** |
| ... | *40 features adicionales de Analytics, AI, y Expansión Geográfica* | Varios | **Dominación** |

---
[Continúa en la siguiente sección del Master Plan]
