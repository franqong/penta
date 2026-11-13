use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct HealthResponse {
    pub service: String,
    pub status: String,
}
