from pydantic import BaseModel
from typing import Optional

# Pydantic Model for Asistencia
class Asistencia(BaseModel):
    persona_id: int
    clase_id: int
    fecha: str
    Comentario: str