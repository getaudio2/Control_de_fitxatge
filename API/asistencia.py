from pydantic import BaseModel
from typing import Optional

# Pydantic Model for Alumne
class Asistencia(BaseModel):
    Fecha: str
    Persona_id: int
    Comentario: str