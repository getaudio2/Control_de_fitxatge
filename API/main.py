from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from client import get_db_connection
from API.persona import Persona
from API.clase import Clase
from API.asistencia import Asistencia
import csv
from io import StringIO

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def persona_schema(fetchPersona):
    return {
        "Name": fetchPersona[0],
        "Email": fetchPersona[1],
        "Clase_id": fetchPersona[2],
        "Rol": fetchPersona[3],
        "username": fetchPersona[4]
    }
    
def clase_schema(fetchClase):
    return {
    "Modulo": fetchClase[0],
    "Nombre": fetchClase[1],
    "Grado": fetchClase[2],
    "Curso": fetchClase[3],
    "Grupo": fetchClase[4],
    "Franja": fetchClase[5],
    "Aula": fetchClase[6],
    "Dia": fetchClase[7]
    }


@app.get("/persona/list")
def list_alumnes():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM persona")
    alumnes = cursor.fetchall()
    conn.close()
    return alumnes

@app.get("/alumne/show/{id}")
def show_alumne(id: int):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Alumne WHERE IdAlumne = %s", (id,))
    alumne = cursor.fetchone()
    conn.close()
    if alumne:
        return alumne
    raise HTTPException(status_code=404, detail="No se encontro al alumno")