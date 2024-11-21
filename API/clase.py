from pydantic import BaseModel
from typing import Optional

# Pydantic Model for Alumne
class Clase(BaseModel):
    Modulo: str
    Nombre: str
    Grado: str
    Curso: int
    Grupo: str
    Franja: int
    Aula: str
    Dia: str