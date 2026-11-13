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

Compilar el frontend localmente:

```bash
cd frontend
trunk build --release
```

Esto genera los archivos estáticos que pueden desplegarse en un servidor web (`frontend/dist/`).
El backend se compila por separado:

```bash
cargo build --release -p penta-backend
```

### Despliegue del Frontend en Vercel

El frontend WebAssembly de Leptos se despliega en Vercel como sitio estático SPA utilizando `vercel.json` y el script de build `vercel-build.sh`.

#### Configuración en el panel de Vercel:
1. **Framework Preset**: `Other`.
2. **Root Directory**: `./` (la raíz del repositorio). **No** cambiarlo a `frontend/`, ya que Cargo necesita acceder al workspace (`Cargo.toml` raíz) para compilar las dependencias.
3. **Build & Development Settings**: Dejar la configuración por defecto para que Vercel utilice las directivas definidas en `vercel.json`:
   - **Build Command**: `bash vercel-build.sh`
   - **Output Directory**: `frontend/dist`
   - **Install Command**: vacío (deshabilitado, la instalación de Rust y Trunk se realiza dentro de `vercel-build.sh`)

#### Optimización del build en Vercel:
A diferencia del entorno local (donde se compila Trunk una sola vez con Cargo), en Vercel el script `vercel-build.sh` descarga el binario precompilado oficial de Trunk en segundos en lugar de compilarlo desde el código fuente (`cargo install trunk`), evitando tiempos de espera excesivos y límites de memoria del contenedor.

En resumen, Cargo compila Rust de forma incremental, Trunk automatiza la
compilación del frontend hacia WASM y el backend continúa siendo un binario
nativo.
