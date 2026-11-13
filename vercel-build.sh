#!/usr/bin/env bash
set -euo pipefail

echo "==> [1/3] Configurando Rust y target wasm32-unknown-unknown..."
if ! command -v rustup >/dev/null 2>&1; then
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --default-toolchain stable --target wasm32-unknown-unknown
  export PATH="$HOME/.cargo/bin:$PATH"
else
  export PATH="$HOME/.cargo/bin:$PATH"
  rustup target add wasm32-unknown-unknown
fi

echo "==> [2/3] Instalando binario precompilado de Trunk..."
if ! command -v trunk >/dev/null 2>&1; then
  mkdir -p "$HOME/.cargo/bin"
  curl -sL https://github.com/trunk-rs/trunk/releases/latest/download/trunk-x86_64-unknown-linux-gnu.tar.gz | tar -xzf - -C "$HOME/.cargo/bin"
  chmod +x "$HOME/.cargo/bin/trunk"
fi

echo "==> Versión de Trunk:"
trunk --version

echo "==> [3/3] Compilando frontend WASM con Trunk en modo release..."
cd frontend
trunk build --release

echo "==> Compilacion finalizada exitosamente. Artefactos listos en frontend/dist"
