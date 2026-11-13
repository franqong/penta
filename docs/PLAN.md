<!-- Plan de migración tecnológica de Penta. -->

# Plan de migración de Penta

## Objetivo y postura tecnológica

Migrar la aplicación web hacia una arquitectura Rust-first/Rust-only para la
estructura de la interfaz y el backend, sin convertir el proyecto en una
envoltura de JavaScript. La versión actual tiene un frontend React/Vite y un
backend Node/Express/Prisma; el modelo PostgreSQL y las rutas existentes deben
servir como contrato de migración.

WASM es perfectamente viable para gran parte de la interfaz, pero no elimina
las APIs del navegador ni todo el JavaScript generado por el toolchain. El
objetivo realista es que la aplicación, sus componentes, estado, routing,
validación y llamadas de dominio estén escritos en Rust; JavaScript queda
limitado al runtime/glue generado y a adaptadores del navegador cuando no
exista una API Rust equivalente. No usar React como destino final ni Tauri para
esta aplicación web.

## Recomendación de stack

### Frontend: Leptos + WASM

Usar **Leptos** como primera opción:

- componentes, estado y routing en Rust;
- WASM para interactividad;
- SSR/hydration opcional para HTML inicial, SEO y rendimiento percibido;
- posibilidad de compartir tipos y validación con el backend;
- integración natural con `web-sys`/`gloo` solo en los bordes del navegador.

El objetivo es una aplicación Rust que pueda hacer progressive enhancement,
no una SPA que obligue a descargar toda la aplicación antes de mostrar
contenido. Para una primera migración puede usarse CSR, pero las páginas
públicas deberían evolucionar a SSR/hydration.

Alternativas:

- **Dioxus**: evaluar si se quiere compartir más código entre web, escritorio
  y móvil; es atractiva pero aumenta la superficie de targets y no debe
  introducir una capa webview por defecto.
- **Yew**: madura para WASM, pero Leptos encaja mejor con SSR y un modelo
  full-stack moderno.
- **Sycamore**: alternativa válida, pero con menor prioridad por ecosistema.
- **Iced/GPUI/Slint**: son principalmente opciones de escritorio; no son la
  elección para esta web.
- **Tauri**: descartado para Penta web porque la UI seguiría siendo HTML/JS
  dentro de un webview.

### Backend: Axum + SQLx + PostgreSQL

Migrar Node/Express a:

- **Axum** para HTTP, routing, extractores y middleware;
- **Tokio** para runtime asíncrono;
- **SQLx** para PostgreSQL y consultas comprobadas en compilación cuando sea
  posible;
- `serde`/`serde_json` para DTOs;
- `validator` o validadores de dominio propios para entradas;
- `argon2` para contraseñas nuevas, con una estrategia explícita para hashes
  bcrypt existentes;
- sesiones con cookies `HttpOnly`, `Secure`, `SameSite` y rotación, en vez de
  exponer tokens en `localStorage`;
- `tower-http` para CORS, trazas, compresión y límites.

No trasladar Prisma a Rust como una capa equivalente por inercia. Mantener
PostgreSQL y convertir el schema/migrations a SQL versionado; generar tipos
desde consultas o usar DTOs explícitos. Las migraciones deben ejecutarse contra
una copia de prueba antes de cambiar producción.

## Fronteras de JavaScript y navegador

La UI y el estado de negocio no deben vivir en JavaScript. Se permite:

- el cargador/glue generado por `wasm-bindgen`;
- pequeños adaptadores `web-sys`/`gloo` para `localStorage` temporal, Media
  APIs, History, Web Audio o APIs sin wrapper suficiente;
- scripts de build del toolchain.

No se permite introducir React, un store JS, componentes `.jsx`, lógica de
autenticación JS ni un router JS. Encapsular cada API del navegador detrás de
un trait Rust para que el dominio sea testeable y el código WASM no se
disperse por los componentes.

## Estado actual de la migración

La estructura activa ya está consolidada en Rust:

- `frontend/`: Leptos/WASM, routing, componentes, estilos y assets.
- `backend/`: servidor Axum/Tokio inicial con `GET /api/health`.
- `crates/penta-contracts/`: crate compartido para DTOs Rust.
- `Cargo.toml`: workspace Rust raíz.
- `docs/`: decisiones, desarrollo y notas de migración.

La implementación React/Vite y Node/Express/Prisma anterior se conserva en
Git como referencia histórica y punto de comparación, no como parte de la
estructura activa del workspace.

## Arquitectura objetivo

Organizar un workspace Rust:

- `penta-domain`: entidades, reglas, permisos y casos de uso puros;
- `penta-contracts`: DTOs/versionado de API compartidos;
- `penta-web`: componentes Leptos, routing, estado y accesibilidad;
- `penta-server`: Axum, sesiones, handlers y configuración;
- `penta-db`: SQLx, repositorios y migraciones;
- `penta-cli`: tareas de desarrollo, seeds y comprobaciones.

Actualmente estos roles se materializan en `frontend/`, `backend/` y
`crates/penta-contracts/`. La separación interna podrá crecer hacia crates de
dominio, base de datos y servidor cuando avance la implementación funcional.

Conservar la separación visual existente (header, footer, páginas, reproductor)
como componentes Rust. El estado global del reproductor debe ser una máquina
de estados tipada, no un estado implícito repartido entre páginas. Las rutas
actuales (`/`, `/profile`, `/settings`, `/songs`) deben conservar su
comportamiento durante la transición.

## Plan de migración

### Fase 0 — Contratos y medición

- Inventariar rutas, payloads, errores, auth y permisos del backend actual.
- Añadir pruebas de contrato para auth, álbumes, reviews, comunidades, posts,
  usuarios y likes.
- Medir baseline de build, JS descargado, tiempo de carga, interacción,
  navegación, memoria y accesibilidad.
- Congelar el esquema API y crear una copia de la base de datos para migración.
- Definir una política explícita para sesiones y hashes bcrypt existentes.

**Salida:** contrato HTTP documentado, fixtures reproducibles y métricas
baseline; no cambiar todavía la experiencia del usuario.

### Fase 1 — Núcleo Rust y backend paralelo

- Crear workspace, linting, tests y logging estructurado con `tracing`. **Base
  inicial creada.**
- Implementar `penta-domain` y ampliar `penta-contracts` a partir del schema
  actual.
- Implementar Axum/SQLx detrás de un prefijo o entorno paralelo. **Axum y
  `/api/health` creados; SQLx aún pendiente.**
- Migrar primero lecturas públicas de álbumes y canciones.
- Comparar respuestas Rust/Node con los mismos fixtures.

**Salida:** endpoints Rust equivalentes y base de datos sin cambios
destructivos.

### Fase 2 — Primera página Leptos/WASM

- Crear shell Leptos con header, body y footer. **Implementado en
  `frontend/`.**
- Incorporar routing Rust para `/`, `/songs`, `/profile` y `/settings`.
  **Base inicial implementada.**
- Migrar `/songs` como slice vertical: layout, cards, imágenes y reproducción.
  **Layout, cards, covers y controles visuales iniciales implementados.**
- Migrar `/` con las secciones visuales principales y datos estáticos
  provisionales. **Shell y componentes iniciales implementados.**
- Añadir estado inicial del reproductor compartido entre tarjetas y layout
  global. **Implementado como control visual Leptos; la reproducción real aún
  está pendiente.**
- Migrar `/profile` y `/settings` como vistas iniciales. **Estructura visual y
  formularios provisionales implementados; autenticación y persistencia aún
  pendientes.**
- Incorporar logo, avatar, fuentes y recursos SVG existentes desde
  `frontend/assets/`. **Integración inicial implementada mediante Trunk
  `copy-dir`; los assets visuales principales ya están centralizados.**
- Replicar comportamiento dinámico del shell: header reducido al desplazar,
  menú de usuario y reproductor flotante/dockeado. **Base implementada en
  Leptos con señales de scroll; falta ajustar los SVG para equivalencia visual
  exacta con `react-icons`.**
- Reemplazar React Router por routing Rust.
- Reemplazar el estado `track` por estado Leptos tipado.
- Cargar CSS existente de forma gradual, eliminando dependencias de JSX.
- Verificar que la página funciona con WASM deshabilitado cuando sea una página
  pública SSR.

**Salida:** una ruta desplegable con cero componentes React y un tamaño de
bundle WASM medido.

### Fase 3 — Identidad y páginas protegidas

- Migrar login, perfil, settings y logout a cookies de sesión seguras.
- Implementar guards de servidor y de navegación sin confiar solo en WASM.
- Migrar reviews, comunidades, posts, likes y validaciones.
- Mantener errores de API consistentes y no convertir fallos en respuestas
  vacías o estados de éxito.

**Salida:** flujo de usuario completo ejecutándose contra Axum y la UI Leptos.

### Fase 4 — Reproductor y rendimiento

- Encapsular el reproductor mediante Web Audio/Media APIs detrás de un
  adaptador Rust/WASM.
- Definir qué audio se reproduce legalmente y qué URLs son solo previews.
- Añadir lazy loading, imágenes responsivas, caché y paginación.
- Medir WASM inicial, chunks, hidratación, TTI, navegación y consumo de CPU;
  optimizar con datos, no por intuición.

WASM no hace automáticamente más rápida una interfaz: puede reducir la lógica
JS y ofrecer tipado/CPU eficiente, pero el coste de descarga, hidratación,
DOM y red sigue existiendo. SSR, HTML accesible, payloads pequeños y caché
son tan importantes como compilar a WASM.

### Fase 5 — Retirada de React y Node

- Cambiar tráfico progresivamente al backend Rust.
- Ejecutar pruebas de paridad y migración sobre datos reales anonimizados.
- Retirar frontend React/Vite solo cuando todas las rutas y estados tengan
  cobertura funcional y de accesibilidad.
- Retirar Node/Express/Prisma después de una ventana de observación y rollback.
- Actualizar README, despliegue, CI, variables de entorno y monitorización.

## Reglas de seguridad y operación

- Nunca guardar credenciales o tokens de sesión en `localStorage`.
- Aplicar validación de entrada, límites de tamaño, rate limiting, CORS
  explícito, CSRF cuando corresponda y consultas parametrizadas.
- No exponer secretos en WASM ni en el bundle.
- Mantener migrations reversibles o con plan de rollback; hacer backups antes
  de cambios de esquema.
- Usar `cargo fmt`, `cargo clippy -- -D warnings`, tests unitarios,
  integración HTTP, pruebas de navegador y auditoría de dependencias.
- Comparar accesibilidad con teclado, lectores de pantalla, contraste y
  reduced motion; Rust/WASM no reemplaza estas obligaciones del frontend.

## Criterios de éxito

La migración se considera completa cuando la interfaz, el estado, el routing y
la lógica de negocio no dependen de React/JS escrito a mano; el backend corre
en Rust; las rutas existentes, auth y datos se preservan; las páginas públicas
tienen HTML útil antes de WASM; y las métricas de rendimiento y accesibilidad
son iguales o mejores que el baseline documentado.