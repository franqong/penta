use axum::{Json, Router, routing::get};
use penta_contracts::HealthResponse;
use std::net::SocketAddr;
use tokio::net::TcpListener;
use tower_http::{cors::CorsLayer, trace::TraceLayer};

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    tracing_subscriber::fmt::init();

    let app = Router::new()
        .route("/api/health", get(health))
        .layer(CorsLayer::permissive())
        .layer(TraceLayer::new_for_http());

    let address = SocketAddr::from(([127, 0, 0, 1], 3000));
    let listener = TcpListener::bind(address).await?;

    tracing::info!("Penta Rust backend listening on {address}");
    axum::serve(listener, app).await?;

    Ok(())
}

async fn health() -> Json<HealthResponse> {
    Json(HealthResponse {
        service: "penta-backend".to_string(),
        status: "ok".to_string(),
    })
}
