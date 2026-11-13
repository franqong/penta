# Notas de migración

## Punto de partida

La versión anterior de Penta estaba separada en dos aplicaciones:

- `frontend/`: React, Vite, JSX, CSS por componente y `react-icons`.
- `backend/`: Node.js, Express, Prisma y JavaScript.

La interfaz React se utiliza como referencia visual y funcional para conservar
la identidad de Penta: header con reducción al hacer scroll, menú de usuario,
perfil, tarjetas, reproductor persistente, footer, fuentes, iconos y assets.
La versión anterior queda preservada en la rama histórica de Git, no mezclada
con la estructura activa.

## Estructura nueva

```text
penta/
├── Cargo.toml
├── Cargo.lock
├── backend/
│   ├── Cargo.toml
│   └── src/main.rs
├── frontend/
│   ├── Cargo.toml
│   ├── Trunk.toml
│   ├── index.html
│   ├── style.css
│   ├── assets/
│   │   ├── fonts/
│   │   ├── main/
│   │   ├── profile-icons/
│   │   ├── socials/
│   │   └── vinyl.svg
│   ├── covers/
│   └── src/
│       ├── icons.rs
│       ├── lib.rs
│       └── main.rs
├── crates/
│   └── penta-contracts/
└── docs/
```

Los nombres `frontend/` y `backend/` representan ahora las implementaciones
activas; ya no necesitan el sufijo `-rust`. Los assets viven dentro del
frontend y Trunk no depende de carpetas del proyecto anterior.

## Equivalencias principales

| Versión anterior | Versión nueva |
| --- | --- |
| React + JSX | Leptos + Rust |
| Vite | Trunk |
| React Router | `leptos_router` |
| Estado local/global en JavaScript | señales y estado tipado de Leptos |
| `react-icons` y componentes JSX | SVG locales y componentes Rust inline |
| Node.js + Express | Axum + Tokio |
| Prisma | SQLx y migraciones SQL planificadas |
| JavaScript de aplicación | Rust compilado a WASM |

El JavaScript que produce `wasm-bindgen` y Trunk continúa existiendo como
glue del navegador, pero la estructura de la aplicación, la UI y el estado no
están escritos manualmente en JavaScript.

## Migrado hasta ahora

- Shell visual con header, navegación, body y footer.
- Routing para home, songs, profile y settings.
- Fuentes, favicons, logos, portadas e iconos locales.
- Perfil con avatar, badge, ubicación, estadísticas y acciones.
- Menú de usuario con iconos SVG equivalentes a los componentes anteriores.
- Reproductor persistente con estado entre rutas, modo grande, modo compacto,
  dock al final de la página y minimización recordada.
- Textura granulada, layout responsive y reducción del header al hacer scroll.
- Backend Axum mínimo con endpoint `/api/health`.

## Pendiente

- Migrar autenticación, sesiones y autorización.
- Incorporar SQLx, PostgreSQL, migraciones y repositorios.
- Migrar endpoints de usuarios, álbumes, reviews, comunidades y posts.
- Conectar datos reales al frontend Leptos.
- Implementar reproducción real mediante APIs de audio del navegador.
- Añadir pruebas de contrato, accesibilidad, integración y rendimiento.
- Retirar definitivamente cualquier comportamiento provisional cuando exista
  paridad funcional con la versión anterior.

## Regla de mantenimiento

La referencia visual puede consultarse desde la rama histórica de React, pero
los nuevos componentes, assets y cambios de interfaz deben incorporarse en
`frontend/` usando Rust y los patrones definidos en `docs/DEVELOPMENT.md`.
