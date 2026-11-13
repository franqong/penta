# Desarrollo local con Rust y WebAssembly

## Dependencias Rust

Las dependencias se declaran en los `Cargo.toml` del workspace y no se
instalan manualmente dentro de cada carpeta.

La primera vez, Cargo descarga y compila las dependencias. Los artefactos se
guardan en la caché global de Cargo y en el directorio `target/` del workspace.
Las ejecuciones posteriores reutilizan esos artefactos y recompilan solo lo
necesario.

Cambiar versiones o features puede provocar una recompilación más amplia.
`cargo clean` elimina los artefactos compilados y obliga a compilar nuevamente.

## Frontend WASM

El frontend se encuentra en `frontend/` y usa Leptos, WebAssembly y
Trunk. Trunk cumple un rol similar al servidor de desarrollo de Vite:

1. Compila el crate Rust para `wasm32-unknown-unknown`.
2. Genera el JavaScript de integración mediante `wasm-bindgen`.
3. Sirve HTML, CSS, JavaScript generado y WASM.
4. Observa los archivos y recompila cuando detecta cambios.

Instalación inicial:

```bash
rustup target add wasm32-unknown-unknown
cargo install trunk --locked
```

Servidor de desarrollo:

```bash
cd frontend
trunk serve --open
```

El navegador recibe principalmente:

```text
index.html
*.wasm
JavaScript generado
CSS
assets
```

`frontend/index.html` copia los recursos locales de `frontend/assets/` y
`frontend/covers/` al resultado de Trunk. Las fuentes, favicons, logos,
portadas e iconos pertenecen ahora al frontend Rust y no dependen de una
instalación JavaScript separada.

La interfaz, el estado, el routing y la lógica de presentación se escriben en
Rust. El JavaScript generado funciona como glue entre WASM y las APIs del
navegador; no contiene la estructura principal escrita manualmente de la
aplicación.

## Backend

El backend Rust se ejecuta como un binario nativo independiente con Axum y
Tokio:

```bash
cargo run -p penta-backend
```

El frontend WASM se comunica con el backend mediante HTTP. El backend,
PostgreSQL, las sesiones y la lógica del servidor no se compilan a WASM.

## Producción

Compilar el frontend:

```bash
cd frontend
trunk build --release
```

Esto genera los archivos estáticos que pueden desplegarse en un servidor web.
El backend se compila por separado:

```bash
cargo build --release -p penta-backend
```

En resumen, Cargo compila Rust de forma incremental, Trunk automatiza la
compilación del frontend hacia WASM y el backend continúa siendo un binario
nativo.
