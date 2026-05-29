from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random

app = FastAPI()

"""
IDEAS PARA ESCALAR ESTE PROYECTO:
1. Integración con Spotify: Puedes usar la librería 'spotipy' para buscar canciones reales.
2. Integración con YouTube: Puedes usar 'pytube' o la API de Google para obtener enlaces de video.
3. Base de Datos: En lugar de usar una lista en Python, podrías usar SQLite (módulo 'sqlite3')
   para guardar tus canciones favoritas.
4. Categorías: Añadir un filtro para recomendar música según el estado de ánimo (mood).
"""

# Configuramos CORS para que el frontend (usualmente en el puerto 5173 o 3000) pueda consultar la API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # En producción deberías especificar el dominio real
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Datos iniciales para que el usuario pueda ver cómo funcionan los diccionarios y listas
music_database = [
    {
        "song": "B.Y.O.B.",
        "artist": "System of a Down",
        "image": "https://upload.wikimedia.org/wikipedia/en/2/2b/System_of_a_Down_-_Mezmerize.jpg",
        "year": "2005",
        "deezerId": "1274534",
        "genre": "Metal"
    },
    {
        "song": "Everlong",
        "artist": "Foo Fighters",
        "image": "https://upload.wikimedia.org/wikipedia/en/0/0d/FooFighters-TheColourAndTheShape.jpg",
        "year": "1997",
        "deezerId": "136314",
        "genre": "Rock"
    },
    {
        "song": "Schism",
        "artist": "Tool",
        "image": "https://upload.wikimedia.org/wikipedia/en/b/b4/Tool_-_Lateralus.jpg",
        "year": "2001",
        "deezerId": "139192",
        "genre": "Metal"
    },
    {
        "song": "The Pretender",
        "artist": "Foo Fighters",
        "image": "https://upload.wikimedia.org/wikipedia/en/b/b7/Foo_Fighters_-_Echoes%2C_Silence%2C_Patience_%26_Grace.jpg",
        "year": "2007",
        "deezerId": "136329",
        "genre": "Rock"
    }
]

@app.get("/")
def read_root():
    return {"message": "Bienvenido a la API de Recomendaciones de Penta"}

@app.get("/recommend")
def get_recommendation():
    # Usamos random.choice para elegir un elemento aleatorio de nuestra lista
    return random.choice(music_database)
