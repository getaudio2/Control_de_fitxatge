# Control_de_fitxatge

# Consulta lista de personas

Mediante una consulta basica, podemos obtener la lista total de personas (alumnos, profesores) que manejamos en nuestra base de datos.
````
SELECT * FROM persona
````

![alt text](image.png)

````
SELECT * FROM persona where rol = 'Profesor';
````
![alt text](image-2.png)

````
SELECT * FROM persona where rol = 'Alumno';
````
![alt text](image-3.png)

# Consulta Asistencia

````
"SELECT * FROM asistencia";
````
![alt text](image-1.png)