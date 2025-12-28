---

### 6. ARQUITECTURA DE SISTEMA (Diagrama Conceptual y Componentes)

La arquitectura de NEXORS está diseñada para ser **globalmente distribuida, de baja latencia y altamente escalable**, utilizando un stack tecnológico moderno y sin servidor (serverless) para minimizar los costos operativos y maximizar la velocidad de desarrollo.

#### Diagrama Conceptual (ASCII)

```
[ Cliente (Web/App - Next.js) ] <---> [ Cloudflare (CDN/WAF/Edge) ]
       |                                      |
       | (HTTPS/WSS)                          | (API Calls)
       |                                      |
       +-------------------------------------> [ Cloudflare Workers (API Gateway / Lógica de Negocio) ]
                                                     |
                                                     | (SQL/RPC)
                                                     |
       +-------------------------------------> [ Supabase (PostgreSQL + Auth + Realtime) ]
       |                                                     |
       | (API Calls a Terceros)                              | (Webhooks)
       |                                                     |
       +-----> [ Google Maps API ]                           |
       +-----> [ PayPal API ]                                |
       +-----> [ Mercado Pago API ]                          |
       +-----> [ Twilio API (SMS) ]                          |
       +-----> [ Resend API (Email) ] <----------------------+

```

#### Componentes Clave y Justificación

| Componente | Tecnología | Rol y Justificación |
| :--- | :--- | :--- |
| **Frontend** | Next.js + React | **Experiencia de Usuario (UX) Superior:** Renderizado del lado del servidor (SSR) para SEO y rendimiento. El App Router permite una estructura de proyecto limpia y escalable. Desplegado en Cloudflare Pages para una distribución global instantánea. |
| **Edge Computing** | Cloudflare Workers | **API Gateway y Lógica de Negocio:** Actúa como el cerebro de la aplicación. Ejecuta código en el borde de la red, cerca del usuario, para una latencia mínima. Maneja la validación de requests, orquestación de APIs y lógica de negocio crítica antes de tocar la base de datos. |
| **Backend (BaaS)** | Supabase | **Base de Datos, Autenticación y Real-time:** Proporciona una base de datos PostgreSQL robusta, un sistema de autenticación (Auth) integrado y un motor de Realtime para el tracking en vivo y el chat. Su modelo de "Backend as a Service" acelera drásticamente el desarrollo. |
| **APIs de Terceros** | Google Maps, PayPal, etc. | **Funcionalidad Especializada:** En lugar de reinventar la rueda, se integra con los mejores servicios de su clase para mapas, pagos y comunicaciones. La orquestación se maneja a través de Cloudflare Workers para mantener el control y la seguridad. |

---

### 7. API ENDPOINTS (Contrato de API para MVP)

Los endpoints están diseñados siguiendo los principios RESTful y se exponen a través de Cloudflare Workers. Los ejemplos de request/response están en formato JSON.

#### Autenticación (`/auth`)

*   **`POST /auth/register`**: Registra un nuevo usuario.
    *   **Request:** `{ "email": "user@example.com", "password": "strongpassword", "role": "passenger" }`
    *   **Response:** `{ "userId": "uuid-1234", "sessionToken": "jwt-token" }`
*   **`POST /auth/login`**: Inicia sesión.
    *   **Request:** `{ "email": "user@example.com", "password": "strongpassword" }`
    *   **Response:** `{ "userId": "uuid-1234", "sessionToken": "jwt-token" }`

#### Búsqueda y Booking (`/rides`)

*   **`POST /rides/estimate`**: Obtiene una estimación de precio y tiempo.
    *   **Request:** `{ "origin": { "lat": 34.05, "lng": -118.24 }, "destination": { "lat": 34.15, "lng": -118.44 }, "vehicleType": "SUV" }`
    *   **Response:** `{ "distance": 25.5, "duration": 35, "totalPrice": 85.50, "currency": "USD" }`
*   **`POST /rides/create`**: Crea un nuevo viaje.
    *   **Request:** `{ "origin": { ... }, "destination": { ... }, "vehicleId": "uuid-5678", "paymentMethodId": "paypal-order-id" }`
    *   **Response:** `{ "rideId": "uuid-abcd", "status": "confirmed", "driverInfo": { ... } }`

#### Flotillas (`/fleet`)

*   **`GET /fleet/{id}/analytics`**: Obtiene analíticas de la flotilla.
    *   **Request:** (Headers con `Authorization: Bearer jwt-token`)
    *   **Response:** `{ "totalRidesToday": 150, "totalRevenueToday": 7500, "onlineVehicles": 45, "averageRating": 4.85 }`
*   **`POST /fleet/{id}/vehicles/add`**: Añade un nuevo vehículo a la flotilla.
    *   **Request:** `{ "type": "Limousine", "plate": "NEXORS-1", "model": "Cadillac Escalade", "year": 2024, "capacity": 8 }`
    *   **Response:** `{ "vehicleId": "uuid-efgh", "status": "added" }`

---

### 8. PRICING & FINANCIAL MODEL (Estrategia para $1B Valuation)

El modelo financiero se basa en un crecimiento exponencial del MRR (Ingreso Mensual Recurrente) y un modelo de comisión que escala con el volumen de transacciones de nuestros clientes. El objetivo es alcanzar una valuación de **$1B en 12 meses**, lo que requiere un MRR de aproximadamente **$4M** (asumiendo un múltiplo de 20x ARR).

#### Estructura de Precios SaaS

| Plan | Precio Mensual (USD) | Límite de Vehículos | Límite de Viajes/Mes | Comisión por Viaje | Mercado Objetivo |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Basic** | $299 | 10 | 500 | 18% | Pequeñas flotillas, Startups |
| **Pro** | $499 | 50 | 5,000 | 15% | Flotillas medianas, Agencias de eventos |
| **Enterprise** | $799 | Ilimitado | Ilimitado | 12% | Grandes operadores, Corporativos |

#### Proyección Financiera (Mes 1 a Mes 12)

| Mes | Flotillas Activas | MRR (SaaS) | Ingreso por Comisión | **MRR Total** |
| :--- | :--- | :--- | :--- | :--- |
| **Mes 1** | 200 | $80,000 | $30,000 | **$110,000** |
| **Mes 3** | 1,000 | $400,000 | $150,000 | **$550,000** |
| **Mes 6** | 3,500 | $1,400,000 | $525,000 | **$1,925,000** |
| **Mes 9** | 7,000 | $2,800,000 | $1,050,000 | **$3,850,000** |
| **Mes 12** | 10,000 | $4,000,000 | $1,500,000 | **$5,500,000** |

*Nota: La proyección es agresiva y asume una rápida adopción del mercado y una ejecución impecable de la estrategia Go-to-Market. El MRR Total en el Mes 12 supera el objetivo de $4M, proporcionando un margen de seguridad para alcanzar la valuación deseada.*

---
[Continúa en la siguiente sección del Master Plan]
