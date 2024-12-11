from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
from client import get_db_connection
from persona import Persona
from clase import Clase
from asistencia import Asistencia
from franja import Franja
from grado import Grado

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
        "name": fetchPersona[0],
        "email": fetchPersona[1],
        "grado_id": fetchPersona[2],
        "rol": fetchPersona[3],
        "username": fetchPersona[4]
    }

def personas_schema(personas) -> dict:
    return [persona_schema(persona) for persona in personas]
    
def clase_schema(fetchClase):
    return {
    "Modulo": fetchClase[0],
    "Nombre": fetchClase[1],
    "grado_id": fetchClase[2],
    "franja_id": fetchClase[3],
    "Aula": fetchClase[4],
    "Dia": fetchClase[5]
    }

def asistencia_schema(fetchAsistencia):
    return {
    "persona_id": fetchAsistencia[0],
    "modulo": fetchAsistencia[1],
    "fecha": fetchAsistencia[2],
    "comentario": fetchAsistencia[3]
    }
    
def franja_schema(fetchFranja):
    return{
    "hora_inicio": fetchFranja[0],
    "hora_fin": fetchFranja[1],
    "descanso": fetchFranja[2]
    }
    
def grado_schema(fetchGrado):
    return {
    "nombre": fetchGrado[0],
    "curso": fetchGrado[1],
    "grupo": fetchGrado[2]
    }


@app.get("/persona/listAll")
def list_personas():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM persona")
    personas = cursor.fetchall()
    conn.close()
    return personas

@app.get("/persona/profesorAll")
def list_personas():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM persona where rol = 'Profesor'")
    personas = cursor.fetchall()
    conn.close()
    return personas

@app.get("/persona/alumnosAll", response_model=list[dict])
def list_personas():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM persona where rol = 'Alumno'")
    personas = cursor.fetchall()
    #personas = personas_schema(personas)
    conn.close()
    return personas

# Endpoint para enviar la información de una persona a Editar perfil
@app.get("/persona/")
def list_persona_filtrada(name: str, surname: str):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    query = "SELECT * FROM persona WHERE NAME = %s and SURNAME = %s;"
    cursor.execute(query, (name, surname))
    asistencias = cursor.fetchone()
    conn.close()    
    return asistencias

# Endpoint para listar las asistencias a alumne_asistencias.html
@app.get("/asistencia/listAll")
def list_asiste():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT clase.Módulo, clase.Nombre, asistencia.Fecha, asistencia.Comentario FROM asistencia inner JOIN clase ON asistencia.id_clase = clase.id;")
    asistencias = cursor.fetchall()
    conn.close()    
    return asistencias

# Endpoint para rellenar el dropdown de Asignaturas con módulos
@app.get("/clase/modulo/listAll")
def list_modulos():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT DISTINCT Módulo FROM clase;")
    modulos = cursor.fetchall()
    conn.close()    
    return modulos

# Endpoint para filtrar las asistencias según el módulo seleccionado
@app.get("/asistencia/")
def list_asistencias_filtradas(modulo: str):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    query = "SELECT clase.Módulo, asistencia.Fecha, asistencia.Comentario FROM asistencia inner JOIN clase ON asistencia.id_clase = clase.id WHERE Módulo = %s;"
    cursor.execute(query, (modulo,))
    asistencias = cursor.fetchall()
    conn.close()    
    return asistencias

# Endpoint para rellenar el dropdown de Grupo con grupos "Ej: DAW2A"
@app.get("/grupo/listAll")
def list_grupos():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT Nombre_grupo FROM grupo;")
    modulos = cursor.fetchall()
    conn.close()    
    return modulos

# Endpoint para filtrar lista de alumnos por grupo
@app.get("/persona/alumno/listByGroup/")
def list_grupos(nombreGrupo: str):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    query = "SELECT p.Name, p.Surname FROM persona p JOIN grupo g ON p.Grupo_id = g.Id WHERE g.Nombre_grupo = %s AND p.Rol = 'Alumno';"
    cursor.execute(query, (nombreGrupo,))
    alumnos = cursor.fetchall()
    conn.close()    
    return alumnos

# Endpoint para guardar la asistencia de un grupo de alumnos
# a la tabla asistencia de la database
@app.post("/guardar-asistencia-alumnos")
def guardar_asistencia_alumnos_DB(asistencias: list[Asistencia]):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    try:
        for asistencia in asistencias:
            query = """
                INSERT INTO asistencia (Fecha, Persona_id, Comentario, Id_clase)
                VALUES (%s,%s,%s,%s);
            """
            cursor.execute(query, (asistencia.fecha, asistencia.persona_id, asistencia.comentario, asistencia.id_clase))
        conn.commit()
    except mysql.connector.Error as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail="Error al guardar asistencias: " + str(e))
    finally:
        conn.close()

    return {"mensaje": "Asistencias guardadas correctamente"}