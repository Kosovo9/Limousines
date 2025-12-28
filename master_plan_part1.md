# NEXORS: MASTER PLAN ESTRATÉGICO V1.0
## Plataforma Global de Transportación Ejecutiva

**Autor:** Manus AI (Ingeniero Senior VP de Generación de Prompts)
**Fecha:** 27 de Diciembre de 2025
**Tono:** Plan de Dominación Global ($1B Valuation)

---

### 1. EXECUTIVE SUMMARY: NEXORS - Redefiniendo la Movilidad Ejecutiva Global

NEXORS es una plataforma **SaaS (Software as a Service) de marca blanca** diseñada para la gestión y operación de servicios de transporte ejecutivo y especializado a nivel global. Su misión es desintermediar y potenciar a las flotillas, agencias de eventos, operadores turísticos y empresas logísticas, proporcionándoles una solución tecnológica de vanguardia que les permite competir directamente con gigantes del sector, manteniendo su identidad de marca. NEXORS no es un operador de transporte; es el sistema operativo invisible que impulsa a los operadores de élite.

El mercado actual de transporte ejecutivo y especializado carece de una solución tecnológica unificada, escalable y multilingüe que combine la robustez de un sistema de gestión de flotas (FMS) con la experiencia de usuario de una aplicación de consumo (B2C). Los operadores se ven obligados a utilizar sistemas obsoletos o a depender de plataformas de terceros que capturan una porción significativa de su margen. NEXORS ataca este vacío ofreciendo una solución **B2B2C** completa que permite a las flotillas vender sus servicios bajo su propia marca (white-label) mientras se benefician de la infraestructura de Supabase, Cloudflare Workers y Next.js.

La estrategia de monetización es dual y altamente escalable:
1.  **Suscripción SaaS Híbrida:** Ingreso mensual recurrente (MRR) a través de planes escalonados ($299, $499, $799 USD/mes) basados en el tamaño de la flota y el volumen de viajes.
2.  **Comisión por Booking:** Un porcentaje (12-18%) de cada viaje completado a través de la plataforma, asegurando una participación directa en el éxito transaccional de nuestros clientes.

**Tracción Esperada (Mes 1):** El objetivo es alcanzar un MRR de **$100k+** con la adquisición de **100+ flotillas** piloto. Este crecimiento inicial se impulsará mediante una estrategia de Go-to-Market hiperfocalizada en los mercados de USA (corporativo), México (eventos), Brasil (B2B) y Europa (turismo), aprovechando la necesidad inmediata de digitalización y optimización de costos en estos sectores.

---

### 2. USER PERSONAS: El Ecosistema NEXORS

La plataforma NEXORS debe satisfacer las necesidades críticas de cuatro arquetipos de usuario principales, cada uno con motivaciones y puntos de dolor distintos.

| Persona | Rol y Mercado | Puntos de Dolor (Pain Points) | Cita Clave (Quote) |
| :--- | :--- | :--- | :--- |
| **1. Corporate Executive** | Usuario Final (USA) | Necesidad de puntualidad, discreción y facturación corporativa automática. El tiempo es el activo más valioso. | *"Necesito un servicio que sepa mi itinerario antes que yo y que la factura esté en mi bandeja de entrada antes de aterrizar."* |
| **2. Event Coordinator** | Cliente SaaS (México) | Gestión caótica de múltiples vehículos y horarios para eventos masivos (bodas, congresos). Falta de visibilidad en tiempo real. | *"Si un autobús se retrasa, mi evento se arruina. Necesito un dashboard que me muestre dónde están mis 15 vehículos en todo momento."* |
| **3. Fleet Manager** | Cliente SaaS (Brasil) | Altos costos operativos, baja ocupación de vehículos y dificultad para asignar conductores de manera eficiente. Búsqueda de optimización de rutas. | *"Mi suscripción de $799/mes debe pagarse sola con la optimización de rutas y la reducción de vehículos inactivos que me ofrezca la plataforma."* |
| **4. Tourism Operator** | Cliente SaaS (Europa) | Necesidad de integrar reservas de transporte con paquetes turísticos y ofrecer una experiencia de marca premium a turistas internacionales. | *"Mis clientes esperan una experiencia de lujo. NEXORS debe ser mi marca, no una app genérica. Necesito que el app hable 5 idiomas europeos."* |

---

### 3. USER FLOWS: La Experiencia de Usuario Secuencial

Los flujos de usuario deben ser intuitivos, rápidos y diseñados para la eficiencia, reflejando la naturaleza premium y de alta velocidad del servicio.

#### A) "Booking a Ride" (Pasajero - Flujo B2C)

| Paso | Acción del Usuario | Sistema (Backend/API) | Objetivo |
| :--- | :--- | :--- | :--- |
| **1. Inicio** | Abre la aplicación (web/móvil) y se autentica (o como invitado). | Valida sesión de usuario. | Acceso rápido a la interfaz de reserva. |
| **2. Ubicación** | Ingresa punto de recogida (`pick-up`) y destino (`drop-off`). | Google Places API: Autocompleta y geocodifica las direcciones. | Definir la ruta del servicio. |
| **3. Estimación** | Selecciona el tipo de vehículo (Sedan, SUV, Limousine, Party Bus). | API de Estimación: Calcula precio dinámico (distancia, demanda, tipo de vehículo) y ETA. | Mostrar costo y tiempo de viaje. |
| **4. Confirmación** | Revisa el desglose de precios y presiona "Book Now". | Crea un registro `ride` con status `pending_payment`. | Iniciar la transacción. |
| **5. Pago** | Selecciona método de pago (PayPal/Mercado Pago) y completa la transacción. | API de Pagos: Procesa el pago y actualiza `ride` a status `confirmed`. | Asegurar el ingreso y confirmar el servicio. |
| **6. Asignación** | Recibe confirmación (SMS/Email) y ve la pantalla de tracking. | Sistema de Asignación: Notifica a los drivers disponibles en la zona. | Conectar al pasajero con el driver. |
| **7. Tracking** | Monitorea la ubicación del driver en tiempo real y ETA. | Supabase Realtime: Broadcast de la ubicación GPS del driver. | Reducir la ansiedad del pasajero. |
| **8. Finalización** | El driver completa el viaje. El pasajero recibe la factura. | Actualiza `ride` a status `completed`. Genera factura automática. | Cerrar el ciclo de servicio y pago. |
| **9. Rating** | Califica al driver y al servicio (1-5 estrellas). | API de Rating: Actualiza el perfil del driver y guarda el `rating`. | Mantener la calidad del servicio. |

#### B) "Managing Fleet" (Gestor - Flujo B2B)

| Paso | Acción del Usuario | Sistema (Backend/API) | Objetivo |
| :--- | :--- | :--- | :--- |
| **1. Login** | Inicia sesión en el Dashboard de Flotilla (`/fleet`). | Valida credenciales y rol (`fleet_manager`). | Acceso al centro de control. |
| **2. Gestión de Activos** | Añade nuevos vehículos y asigna drivers existentes a esos vehículos. | API de Flotillas: Crea/actualiza registros en `vehicles` y `drivers`. | Mantener el inventario de la flota actualizado. |
| **3. Monitoreo** | Visualiza el mapa de la flota, el estado (online/offline) y la ocupación de cada vehículo. | Supabase Realtime: Muestra la ubicación de todos los vehículos en tiempo real. | Optimización de recursos y respuesta rápida. |
| **4. Reportes** | Accede a reportes de rendimiento (ingresos, ocupación, rating promedio). | API de Analytics: Ejecuta consultas complejas sobre `rides` y `payments`. | Toma de decisiones estratégicas. |
| **5. Suscripción** | Revisa el estado de su suscripción SaaS y gestiona el pago mensual. | API de Suscripciones: Muestra el plan actual y la fecha de renovación. | Asegurar el MRR de NEXORS. |

#### C) "Driving with App" (Chofer - Flujo Driver)

| Paso | Acción del Usuario | Sistema (Backend/API) | Objetivo |
| :--- | :--- | :--- | :--- |
| **1. Disponibilidad** | Inicia sesión en la app de driver y cambia su estado a "Online". | API de Drivers: Actualiza `drivers.status` a `online`. | Indicar que está listo para recibir viajes. |
| **2. Recepción** | Recibe una notificación de un nuevo viaje asignado. | Supabase Realtime: Envía notificación push al driver más cercano y adecuado. | Iniciar el servicio. |
| **3. Aceptación** | Revisa los detalles del viaje (origen, destino, pago estimado) y presiona "Accept Ride". | API de Drivers: Actualiza `ride` a status `driver_assigned`. | Confirmar el compromiso. |
| **4. Navegación** | Inicia la navegación hacia el punto de recogida. | Google Maps Directions API: Proporciona la ruta óptima. | Llegar al pasajero de manera eficiente. |
| **5. Tracking GPS** | La app envía automáticamente su ubicación GPS cada 5 segundos. | API de Drivers: POST a `/drivers/{id}/location`. | Permitir el tracking en tiempo real al pasajero. |
| **6. Finalización** | Llega al destino y presiona "Complete Ride". | API de Rides: Actualiza `ride` a status `completed`. Desactiva el tracking. | Cerrar el ciclo transaccional. |
| **7. Pago** | Ve el resumen de su ganancia y el saldo acumulado. | API de Pagos: Muestra el monto acreditado a su cuenta. | Motivación y transparencia financiera. |

---
[Continúa en la siguiente sección del Master Plan]
