from pydantic import BaseModel
from typing import Optional

# Pydantic Model for Asistencia
class Asistencia(BaseModel):
    fecha: str
    persona_id: int
    comentario: str
    id_clase: str
