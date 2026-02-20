# Credit Platform Frontend

Una aplicación frontend moderna y avanzada para la gestión de operaciones de crédito, construida con las últimas tecnologías del ecosistema React. Este proyecto enfatiza el rendimiento, la escalabilidad, la mantenibilidad y la Experiencia de Desarrollo (DX).

## 🚀 Stack Técnico

Este proyecto aprovecha un stack de vanguardia diseñado para aplicaciones de nivel empresarial:

- **Core:** [React 19](https://react.dev/) + [TypeScript 5.7](https://www.typescriptlang.org/)
- **Herramienta de Construcción:** [Vite 7](https://vitejs.dev/) - Construcción y HMR (Hot Module Replacement) ultrarrápidos.
- **Enrutamiento:** [@tanstack/react-router](https://tanstack.com/router) - Enrutamiento basado en archivos y tipado seguro, con caché y precarga integrados.
- **Gestión de Estado:**
  - **Estado del Servidor:** [@tanstack/react-query](https://tanstack.com/query) - Para la gestión asíncrona de datos, caché y sincronización.
  - **Estado del Cliente:** [Zustand](https://github.com/pmndrs/zustand) - Gestión de estado minimalista y de alto rendimiento para el estado global de la UI.
- **Estilos:** [Tailwind CSS 4](https://tailwindcss.com/) - Framework CSS "utility-first".
  - **Librería de UI:** Construida sobre primitivas de [Radix UI](https://www.radix-ui.com/) (vía [shadcn/ui](https://ui.shadcn.com/)).
  - **Iconos:** [Lucide React](https://lucide.dev/).
  - **Animaciones:** `tw-animate-css` y `tailwindcss-animate`.
- **Formularios:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) para validación de esquemas.
- **Internacionalización:** [i18next](https://www.i18next.com/) + `react-i18next` para un soporte multilenguaje robusto.
- **Manejo de Fechas:** [date-fns](https://date-fns.org/).
- **Cliente HTTP:** [Axios](https://axios-http.com/) con interceptores avanzados.

## 🏗️ Arquitectura

El proyecto sigue una **Arquitectura Basada en Features**, asegurando alta cohesión y bajo acoplamiento. Cada lógica de dominio está encapsulada dentro de su propio módulo en `src/features`.

### Clean Architecture en el Core de los Features

Dentro de cada implementación en `src/features`, el código está estructurado siguiendo los principios de **Clean Architecture** para separar responsabilidades y hacer que la lógica de negocio sea independiente de frameworks y UI:

- **Capa de Dominio (`core/domain`)**: Contiene las entidades de negocio, tipos e interfaces de repositorios. No depende de nada.
- **Capa de Aplicación (`core/application`)**: Implementa los Casos de Uso (ej. `create-credit.use-case.ts`). Orquesta el flujo de datos pero no maneja detalles de UI o infraestructura.
- **Capa de Infraestructura (`api`)**: Implementa los repositorios definidos en el dominio (Patrón Adapter). Maneja la comunicación externa (peticiones HTTP).
- **Capa de Presentación (`presentation`)**: Componentes React y hooks que consumen la capa de Aplicación.

### Estructura de Directorios

```
src/
├── features/           # Módulos específicos del dominio (Auth, Credits, etc.)
│   ├── credits/        # Módulo de ejemplo
│   │   ├── api/        # Infraestructura: Implementación de API e Interceptores
│   │   ├── core/
│   │   │   ├── domain/       # Interfaces de Repositorio, Entidades, Esquemas Zod
│   │   │   ├── application/  # Casos de Uso
│   │   ├── presentation/     # Componentes, Páginas
│   │   └── *.queries.ts      # Hooks de React Query (Controlador)
├── routes/             # Definiciones de rutas basadas en archivos
├── components/         # Componentes de UI compartidos
├── lib/                # Utilidades compartidas
└── config/             # Configuración del entorno
```

## 🧩 Patrones de Diseño y Buenas Prácticas

El código aplica intencionalmente varios patrones de diseño para asegurar escalabilidad:

1.  **Patrón Repository**: Abstrae la capa de datos. La UI/Casos de Uso dependen de interfaces (`credits.repository.ts`), no de Axios directamente.
2.  **Patrón Adapter**: La capa de API adapta las respuestas HTTP a las entidades del Dominio.
3.  **Patrón Use Case**: Encapsula reglas de negocio específicas (ej. `create-credit.use-case.ts`), haciéndolas reutilizables y testeables.
4.  **Patrón Observer**: Implementado vía stores de **Zustand** y **React Query** para actualizaciones de estado reactivas.
5.  **Compound Components**: Usado en elementos de UI (Dialog, Form) para un renderizado flexible.
6.  **Custom Hooks**: Para reutilización de lógica (ej. `useThemeMenu`, `useLoginMutation`).

### 🔐 Seguridad e Interceptores

Implementamos **Interceptores de Axios** avanzados para manejar la autenticación de forma segura:

- **Interceptor de Token**: Inyecta automáticamente el token JWT `Bearer` en cada cabecera de petición.
- **Interceptor de Refresh Token**: Maneja las respuestas `401 Unauthorized`. Pausa la petición fallida, la añade a una cola, intenta refrescar el token usando un refresh token, y luego reintenta las peticiones en cola de forma transparente.

### 📡 Tiempo Real (Socket.IO)

La aplicación maneja eventos en tiempo real utilizando **Socket.IO**:

- **SocketProvider**: Un Context Provider global que gestiona la conexión del socket (singleton). Se conecta automáticamente al inicio y maneja eventos de conexión/desconexión.
- **Custom Hooks**: Se crean hooks específicos por feature, como `useNotificationSocket`, que consumen el socket global para escuchar eventos de negocio y actualizar el estado de React Query.

### 📝 Manejo de Formularios

Los formularios se construyen usando **React Hook Form** combinado con **Zod** para validación de esquemas. Esto asegura:

- Valores de formulario con tipado seguro.
- Renderizado de alto rendimiento (componentes no controlados).
- Lógica de validación centralizada en `domain/*.schemas.ts`.
- Componentes de Input reutilizables que envuelven la lógica.

### 🎨 Personalización (Tema y Lenguaje)

La plataforma soporta personalización completa:

- **Tema**: Alternar entre modo **Claro** y **Oscuro**.
- **Color Primario**: Los usuarios pueden cambiar dinámicamente el color primario de la marca.
- **Lenguaje**: Cambiar entre **Inglés** y **Español** usando `i18next`.
  La lógica está encapsulada en `src/components/theme-menu`.

## ⚙️ Configuración y Variables de Entorno

Crea un archivo `.env` en el directorio raíz. Puedes usar el backend proporcionado en la prueba técnica como referencia.

Ejemplo `.env`:

```env
# URL del Backend (Apunta al backend de la prueba técnica)
VITE_BACKEND_BASE_URL=http://localhost:3010/api

# URL de WebSocket para funcionalidades de tiempo real
VITE_WS_URL=http://localhost:3010/realtime
```

## 🛠️ Comenzando

1.  **Instalar dependencias:**

    ```bash
    pnpm install
    ```

2.  **Iniciar servidor de desarrollo:**

    ```bash
    pnpm dev
    ```

3.  **Construir para producción:**
    ```bash
    pnpm build
    ```

> **Nota sobre Tests:** Debido a limitaciones de tiempo para la entrega de esta prueba técnica, no se incluyeron tests automatizados (Unitarios/Integración) en esta iteración. Sin embargo, la arquitectura está completamente diseñada para soportar tests fácilmente (inyección de dependencias vía repositorios, casos de uso aislados).
