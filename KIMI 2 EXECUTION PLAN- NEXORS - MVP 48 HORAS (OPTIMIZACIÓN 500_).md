# KIMI 2 EXECUTION PLAN: NEXORS - MVP 48 HORAS (OPTIMIZACIÓN 500%)

**ROLE:** Senior Full-Stack Engineer (Stripe, Uber, Google).
**Misión:** Generar código PRODUCTION-READY en 48 horas. Precisión: 100%. Bugs: 0. Testing: Incluido.
**STACK:** Next.js 15 (App Router) + React 19 + Supabase (PostgreSQL/Auth/Realtime) + Cloudflare Workers/Pages + PayPal + Mercado Pago.

---

## PRE-REQUISITOS (HORA 0-1)

### TAREA 0.1: Setup de Repositorio y Entorno

1.  **Inicialización:**
    ```bash
    git init NEXORS
    pnpm create next-app --ts --tailwind --eslint NEXORS
    cd NEXORS
    # Instalar dependencias críticas
    pnpm add @supabase/supabase-js next-intl axios paypal-rest-sdk mercadopago twilio resend zustand recharts @googlemaps/js-api-loader
    pnpm add -D @types/mercadopago @types/paypal-rest-sdk
    ```
2.  **Configuración de Variables de Entorno (`.env.local`):**
    ```
    # SUPABASE
    NEXT_PUBLIC_SUPABASE_URL="[TU_URL_SUPABASE]"
    NEXT_PUBLIC_SUPABASE_ANON_KEY="[TU_ANON_KEY]"
    SUPABASE_SERVICE_ROLE_KEY="[TU_SERVICE_ROLE_KEY]" # Para Cloudflare Workers

    # GOOGLE MAPS
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="[TU_GOOGLE_MAPS_API_KEY]"

    # PAGOS
    PAYPAL_CLIENT_ID="[TU_PAYPAL_CLIENT_ID]"
    PAYPAL_SECRET="[TU_PAYPAL_SECRET]"
    MERCADO_PAGO_ACCESS_TOKEN="[TU_MP_ACCESS_TOKEN]"
    MERCADO_PAGO_WEBHOOK_SECRET="[TU_MP_WEBHOOK_SECRET]"

    # COMUNICACIONES
    TWILIO_ACCOUNT_SID="[TU_TWILIO_ACCOUNT_SID]"
    TWILIO_AUTH_TOKEN="[TU_TWILIO_AUTH_TOKEN]"
    TWILIO_PHONE_NUMBER="[TU_TWILIO_PHONE_NUMBER]"
    RESEND_API_KEY="[TU_RESEND_API_KEY]"
    ```
3.  **Configuración de Next.js (`next.config.js`):**
    ```javascript
    /** @type {import('next').NextConfig} */
    const nextConfig = {
      // Optimización para Cloudflare Pages/Workers
      output: 'standalone', 
      experimental: {
        serverActions: true,
        serverComponentsExternalPackages: ['@supabase/supabase-js', 'axios'],
      },
      // Configuración de i18n
      i18n: {
        locales: ['en', 'es', 'pt', 'de', 'fr', 'it', 'zh', 'ja', 'ko', 'ru', 'ar', 'hi', 'vi', 'th', 'id', 'uk', 'el', 'pl', 'tr', 'sv'],
        defaultLocale: 'en',
      },
    };
    module.exports = nextConfig;
    ```

### TAREA 0.2: Database Schema (DDL SQL-Ready)

**Instrucción:** Ejecutar este DDL directamente en el SQL Editor de Supabase.

```sql
-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS postgis; -- Para datos geoespaciales

-- 1. Tabla COMPANIES (Flotillas)
CREATE TABLE companies (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    name text NOT NULL,
    country text NOT NULL,
    subscription_plan text NOT NULL DEFAULT 'Basic',
    is_active boolean DEFAULT TRUE,
    branding_config jsonb DEFAULT '{}' -- Para white-label (colores, logo URL)
);
-- RLS: Habilitar RLS y definir políticas básicas (ej. solo owner puede ver/editar)

-- 2. Tabla DRIVERS
CREATE TABLE drivers (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    fleet_id uuid REFERENCES companies(id) ON DELETE CASCADE,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE, -- Opcional: si el driver tiene login propio
    name text NOT NULL,
    license_number text UNIQUE,
    phone_number text,
    photo_url text,
    rating numeric(2, 1) DEFAULT 5.0,
    status text DEFAULT 'offline', -- 'online', 'offline', 'on_ride'
    current_location geometry(Point, 4326), -- PostGIS para ubicación
    is_active boolean DEFAULT TRUE
);
CREATE INDEX drivers_location_idx ON drivers USING GIST (current_location);

-- 3. Tabla VEHICLES
CREATE TABLE vehicles (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    fleet_id uuid REFERENCES companies(id) ON DELETE CASCADE,
    type text NOT NULL, -- 'Sedan', 'SUV', 'Limousine', 'Party Bus'
    plate text UNIQUE NOT NULL,
    model text,
    year integer,
    capacity integer,
    photo_url text,
    is_active boolean DEFAULT TRUE
);

-- 4. Tabla RIDES (Viajes)
CREATE TABLE rides (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL, -- Pasajero
    driver_id uuid REFERENCES drivers(id) ON DELETE SET NULL,
    vehicle_id uuid REFERENCES vehicles(id) ON DELETE SET NULL,
    fleet_id uuid REFERENCES companies(id) ON DELETE SET NULL, -- Flotilla que opera el viaje
    pick_up_latlng point NOT NULL,
    drop_off_latlng point NOT NULL,
    pick_up_address text,
    drop_off_address text,
    distance_km numeric,
    duration_min integer,
    cost_total numeric(10, 2) NOT NULL,
    cost_commission numeric(10, 2) NOT NULL, -- Comisión de NEXORS
    status text NOT NULL DEFAULT 'pending_payment', -- 'confirmed', 'driver_assigned', 'in_progress', 'completed', 'cancelled'
    created_at timestamp with time zone DEFAULT now()
);

-- 5. Tabla PAYMENTS
CREATE TABLE payments (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    ride_id uuid REFERENCES rides(id) ON DELETE CASCADE,
    user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    method text NOT NULL, -- 'paypal', 'mercadopago', 'transfer'
    transaction_id text UNIQUE,
    amount numeric(10, 2) NOT NULL,
    status text NOT NULL DEFAULT 'pending', -- 'completed', 'failed', 'refunded'
    created_at timestamp with time zone DEFAULT now()
);

-- 6. Tabla RATINGS
CREATE TABLE ratings (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    ride_id uuid REFERENCES rides(id) ON DELETE CASCADE,
    rater_id uuid REFERENCES auth.users(id) ON DELETE SET NULL, -- Pasajero o Driver
    rated_driver_id uuid REFERENCES drivers(id) ON DELETE SET NULL,
    stars integer NOT NULL CHECK (stars BETWEEN 1 AND 5),
    comment text,
    tags text[], -- Ej: {'clean_car', 'good_music'}
    created_at timestamp with time zone DEFAULT now()
);

-- 7. Tabla SUBSCRIPTIONS
CREATE TABLE subscriptions (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    fleet_id uuid REFERENCES companies(id) ON DELETE CASCADE,
    plan_type text NOT NULL,
    price_monthly numeric(10, 2) NOT NULL,
    start_date date NOT NULL,
    end_date date,
    is_active boolean DEFAULT TRUE,
    stripe_subscription_id text -- Para futura integración de Stripe
);

-- 8. Tabla MESSAGES (Para Chat en Tiempo Real)
CREATE TABLE messages (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    ride_id uuid REFERENCES rides(id) ON DELETE CASCADE,
    sender_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    content text NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);
-- Habilitar Realtime en Supabase para la tabla 'messages' y 'drivers' (para tracking)
```

---

## FASE 1: LANDING PAGE + AUTH (HORAS 1-8)

### TAREA 1.1: Setup de Proyecto y Auth Client

**Instrucción:** Crear la estructura de directorios y el cliente de Supabase.

1.  **`lib/supabase/client.ts`:** (Cliente para el Frontend)
    ```typescript
    import { createBrowserClient } from '@supabase/supabase-js';

    export const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    ```
2.  **`lib/supabase/server.ts`:** (Cliente para Server Components/Actions)
    ```typescript
    import { createServerClient } from '@supabase/ssr';
    import { cookies } from 'next/headers';

    export const createSupabaseServerClient = () => {
      const cookieStore = cookies();
      return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            get: (name: string) => cookieStore.get(name)?.value,
            set: (name: string, value: string, options: any) => cookieStore.set(name, value, options),
            remove: (name: string, options: any) => cookieStore.set(name, '', options),
          },
        }
      );
    };
    ```
3.  **`app/layout.tsx`:** Implementar el `SupabaseProvider` y `IntlProvider` (usando `next-intl`).

### TAREA 1.2: Landing Page (app/page.tsx)

**Instrucción:** Implementar la Landing Page con los colores de NEXORS (#0052CC, #1A1A1A) y la tipografía Inter.

*   **Secciones:** Hero (CTA "Book Now" y "Manage Fleet"), Features (4 verticales), Pricing (3 planes), Testimonials, Footer.
*   **Requisito Crítico:** Debe ser 100% multilingüe usando `next-intl` para todos los textos.

### TAREA 1.3: Sistema de Autenticación

**Instrucción:** Crear las rutas `/auth/login`, `/auth/register`, `/auth/reset-password` y las Server Actions para manejar la autenticación con Supabase.

*   **`app/auth/login/page.tsx`:** Formulario con Server Action para `signInWithPassword`.
*   **`app/auth/register/page.tsx`:** Formulario con Server Action para `signUp`. Debe incluir un campo oculto para el `role` inicial (ej. 'passenger').

### TAREA 1.4: Protección de Rutas (`middleware.ts`)

**Instrucción:** Crear el middleware de Next.js para proteger las rutas `/dashboard`, `/fleet`, `/driver`.

*   **Lógica:** Si el usuario no está autenticado, redirigir a `/auth/login`. Si está autenticado pero intenta acceder a una ruta de rol incorrecto (ej. un 'passenger' a `/fleet`), redirigir a su dashboard principal.

---

## FASE 2: BÚSQUEDA Y BOOKING (HORAS 8-16)

### TAREA 2.1: Integración Google Maps y Estimación

**Instrucción:** Crear la lógica de geolocalización y estimación de ruta.

1.  **`lib/maps/googleMaps.ts`:** Funciones para `searchPlaces` (Places API), `getDistanceMatrix` (Distance Matrix API) y `getDirections` (Directions API).
2.  **`components/LocationSearch.tsx`:** Componente de búsqueda con autocompletado y debounce.

### TAREA 2.2: Lógica de Pricing Dinámico

**Instrucción:** Implementar la lógica de precios en un Cloudflare Worker (simulado inicialmente como una Server Action en Next.js para el MVP).

1.  **`app/api/rides/estimate/route.ts` (POST):**
    *   **Input:** `origin`, `destination`, `vehicleType`, `currency`.
    *   **Lógica:**
        *   Llamar a `getDistanceMatrix`.
        *   Calcular `basePrice` (por tipo de vehículo).
        *   Aplicar `surgeMultiplier`: Consultar la tabla `rides` para contar viajes activos en la zona de `pick_up` (radio de 5km). Si > 5, aplicar +30%.
        *   Aplicar conversión de moneda (usar un servicio de conversión simple o tabla estática para MVP).
    *   **Output:** `totalPrice`, `surgeMultiplier`, `distance`, `duration`.

### TAREA 2.3: Página de Booking (`app/book/page.tsx`)

**Instrucción:** Implementar el flujo de 6 pasos con un estado global usando `zustand` (`hooks/useBooking.ts`).

*   **Paso 3 (Vehicle Selection):** Debe consultar la tabla `vehicles` (a través de una Server Action) para mostrar los tipos de vehículos disponibles en la zona.
*   **Paso 6 (Confirmación):** Llama a la API de `estimate` por última vez antes de proceder al pago.

---

## FASE 3: SISTEMA DE PAGOS (HORAS 16-24)

### TAREA 3.1: Integración PayPal (Server Actions)

**Instrucción:** Implementar la creación de órdenes y la captura de pagos.

1.  **`lib/payments/paypal.ts`:** Funciones de SDK de PayPal para `createOrder` y `capturePayment`.
2.  **`app/api/payments/paypal/create-order/route.ts` (POST):** Crea la orden de PayPal, guarda el `ride` con `status: 'pending_payment'` y retorna el `orderId`.
3.  **`app/api/payments/paypal/capture/route.ts` (POST):** Captura el pago, actualiza `rides.status` a `'confirmed'`, crea registro en `payments` y dispara la notificación (Twilio/Resend).

### TAREA 3.2: Integración Mercado Pago (Webhooks)

**Instrucción:** Implementar la creación de preferencias y el manejo de webhooks (CRÍTICO para Latam).

1.  **`lib/payments/mercadopago.ts`:** Función `createPreference` que retorna el `init_point` (URL de checkout).
2.  **`app/api/payments/mercadopago/webhook/route.ts` (POST):**
    *   **Validación 500%:** Implementar la verificación de la firma digital de Mercado Pago (usando `MERCADO_PAGO_WEBHOOK_SECRET`) antes de procesar el evento.
    *   **Lógica:** Recibe el evento `payment.created` o `payment.updated`. Si el estado es `approved`, actualiza `rides.status` y notifica.

### TAREA 3.3: Disparo de Notificaciones

**Instrucción:** Crear un servicio de notificación atómico.

1.  **`lib/notifications/sender.ts`:** Función `sendRideConfirmation(rideId)` que:
    *   Consulta los datos del viaje.
    *   Llama a `resend.emails.send` (Email transaccional).
    *   Llama a `twilio.messages.create` (SMS de confirmación).

---

## FASE 4: TRACKING EN TIEMPO REAL (HORAS 24-32)

### TAREA 4.1: Real-time Tracking (Pasajero)

**Instrucción:** Usar Supabase Realtime para la ubicación del driver.

1.  **`hooks/useRideTracking.ts`:** Custom hook que se suscribe a los cambios en la tabla `drivers` (filtrando por `id` del driver asignado) y a la tabla `messages` (filtrando por `ride_id`).
2.  **`components/RideTracking.tsx`:** Componente que consume el hook y renderiza el mapa (Google Maps JS API) con el marcador del driver.

### TAREA 4.2: GPS Updates (Driver App - API)

**Instrucción:** Endpoint seguro para que la aplicación del driver envíe su ubicación.

1.  **`app/api/drivers/location/update/route.ts` (POST):**
    *   **Seguridad:** Requiere autenticación de driver (JWT) y valida que el `driverId` en el payload coincida con el usuario autenticado.
    *   **Lógica:**
        ```typescript
        // Ejemplo de actualización de PostGIS en Supabase
        const { error } = await supabase
          .from('drivers')
          .update({ 
            current_location: `POINT(${lng} ${lat})`,
            status: 'on_ride' 
          })
          .eq('id', driverId);
        // Supabase Realtime se encarga automáticamente del broadcast
        ```

### TAREA 4.3: Cálculo de ETA

**Instrucción:** Integrar la lógica de ETA en el componente de tracking.

*   **Lógica:** Cada 10 segundos, llamar a Google Maps Directions API (con `trafficModel: 'best_guess'`) para obtener la duración real del viaje restante.

---

## FASE 5: CHAT Y RATING (HORAS 32-40)

### TAREA 5.1: Chat Pasajero ↔️ Driver

**Instrucción:** Implementar el chat usando la tabla `messages` y Supabase Realtime.

1.  **`components/RideChat.tsx`:** Componente de UI que muestra los mensajes y usa una Server Action para insertar nuevos mensajes en la tabla `messages`.
2.  **Regla de Negocio:** El chat solo está activo si `rides.status` es `'confirmed'`, `'driver_assigned'`, o `'in_progress'`.

### TAREA 5.2: Sistema de Rating

**Instrucción:** Implementar el flujo de rating post-viaje.

1.  **`app/api/rides/[id]/rate/route.ts` (POST):**
    *   **Validación:** Verifica que `rides.status` sea `'completed'` y que el usuario no haya calificado previamente.
    *   **Lógica:** Inserta en la tabla `ratings`. Usa un *Database Trigger* (PostgreSQL Function) en Supabase para recalcular automáticamente el `drivers.rating` promedio después de cada inserción.

---

## FASE 6: DASHBOARDS (HORAS 40-48)

### TAREA 6.1: Dashboard Pasajero (`/dashboard`)

**Instrucción:** Dashboard de alto rendimiento con Server Components.

*   **`app/dashboard/page.tsx`:** Muestra datos de `rides` y `payments` del usuario (obtenidos vía Server Component con `createSupabaseServerClient`).

### TAREA 6.2: Dashboard Gestor de Flotilla (`/fleet`)

**Instrucción:** Dashboard B2B con gestión de activos.

1.  **`app/fleet/vehicles/page.tsx`:** Tabla de vehículos. Server Action para `POST /fleet/vehicles/add`.
2.  **`app/fleet/analytics/page.tsx`:** Uso de `recharts` para visualizar:
    *   MRR de la flotilla (tabla `subscriptions`).
    *   Gráfico de Ocupación por Hora (tabla `rides`).

### TAREA 6.3: Dashboard Driver (`/driver`)

**Instrucción:** Interfaz simple para la operación diaria.

*   **`app/driver/page.tsx`:** Muestra el estado actual (`online/offline`) y la lista de viajes pendientes (`rides.status = 'confirmed'`). Server Action para `PATCH /drivers/{id}/status`.

---
**FIN DEL PLAN DE EJECUCIÓN KIMI 2 (48 HORAS)**
