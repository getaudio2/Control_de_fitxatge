const openSidebarBtn = document.querySelector(".fa-bars");
const modulosDropdown = document.getElementById("asignaturadrop");
const fechaDropdown = document.getElementById("fechadrop");
const asistenciaDiv = document.getElementById("asistencias");
const profileDropdownBtn = document.querySelector(".dropbtn");
const contentDropdown = document.querySelector(".dropdown-content");
const errorDiv = document.getElementById("error-div");
const table = document.createElement("table");
table.classList.add("asistencia-table");
let sidebarOpened = true;

openSidebarBtn.addEventListener('click', () => {
    const sidebar = document.getElementById("sidebar");
    const dashboard = document.getElementById("dashboard");
    sidebar.classList.toggle('collapsed');

    if(sidebarOpened){
        dashboard.style.marginLeft = "calc(0vw + 15px)";
        sidebarOpened = false;
    } else {
        dashboard.style.marginLeft = "calc(15vw + 15px)";
        sidebarOpened = true;
    }
});

function formatDate(date) {
    date = date.substring(0, date.length - 5);
    date = date.split("T");
    date = date[0] + " " + date[1];
    return date;
}

function addHeaders() {
    const header = document.createElement("thead");
    const headerRow = document.createElement("tr");
    const headerCol1 = document.createElement("th");
    const headerCol2 = document.createElement("th");
    const headerCol3 = document.createElement("th");
    headerCol1.textContent = "Asignatura";
    headerCol2.textContent = "Fecha y hora";
    headerCol3.textContent = "Estado";
    headerCol1.style.width = "100px";
    headerCol2.style.width = "100px";
    headerCol3.style.width = "100px";
    headerRow.appendChild(headerCol1);
    headerRow.appendChild(headerCol2);
    headerRow.appendChild(headerCol3);

    header.appendChild(headerRow);
    table.appendChild(header);
}

document.addEventListener("DOMContentLoaded", function() {
    profileDropdownBtn.addEventListener("click", () => {
        contentDropdown.style.display = 
        contentDropdown.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", function(e){
        if(!e.target.closest(".dropdown")) {
            contentDropdown.style.display = "none";
        }
    });

    // Fetch per popular el dropdown d'asignatures
    fetch("http://localhost:8000/clase/modulo/listAll")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error a la resposta del servidor");
            }
            return response.json();
        })
        .then(data => {
            data.forEach(option => {
                const opt = document.createElement("option");
                opt.value = option.Módulo;
                opt.textContent = option.Módulo;
                modulosDropdown.appendChild(opt);
            });
        })
        .catch(error => {
            console.error("Error capturat:", error);
            errorDiv.style.visibility = "hidden";
            errorDiv.textContent = "Error al carregar la llista de mòduls";
        });
    // Fetch per popular la taula amb totes les asistències
    fetch("http://localhost:8000/asistencia/listAll")  // Aquí cridem a l'endpoint de l'API
        .then(response => {
            if (!response.ok) {
                throw new Error("Error a la resposta del servidor");
            }
            return response.json();
        })
        .then(data => {
            asistenciaDiv.innerHTML = ""; // Netejar la taula abans d'afegir res
            addHeaders();
            
            // Iterar sobre els alumnes i afegir-los al DOM
            data.forEach(asistencia => {
                const row = document.createElement("tr");

                const modulo = document.createElement("td");
                modulo.textContent = asistencia.Módulo + " " + asistencia.Nombre;
                row.appendChild(modulo);

                const fecha = document.createElement("td");
                var fechaStr = asistencia.Fecha.split("T");
                fecha.textContent = fechaStr[0] + " " + fechaStr[1];
                row.appendChild(fecha);
                const estat = document.createElement("td");
                estat.textContent = asistencia.Comentario;
                row.appendChild(estat);
                
                table.appendChild(row);
            });
            asistenciaDiv.appendChild(table);
        })
        .catch(error => {
            console.error("Error capturat:", error);
            errorDiv.textContent = "Error al carregar la llista de d'alumnes";
        });

    // Actualizar la lista de asignaturas filtradas por el módulo
    // seleccionado en el dropdown
    fechaDropdown.addEventListener("change", () => {
        var actualDate = new Date(Date.now() + 60 * 60 * 1000).toISOString();
        var sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + (60 * 60 * 1000)).toISOString();
        actualDate = formatDate(actualDate);
        sevenDaysAgo = formatDate(sevenDaysAgo);

        const selectedValue = fechaDropdown.value;
        if (selectedValue && !(selectedValue === "sinrango")) {
            fetch("http://localhost:8000/asistencia/porFecha/?" + new URLSearchParams({
                fechaActual: actualDate,
                fechaSemanaAnterior : sevenDaysAgo,
            }).toString())  // Aquí cridem a l'endpoint de l'API
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error a la resposta del servidor");
                }
                return response.json();
            })
            .then(data => {
                asistenciaDiv.innerHTML = ""; // Netejar la taula abans d'afegir res
                table.innerHTML = "";
                addHeaders();
                
                // Iterar sobre els alumnes i afegir-los al DOM
                data.forEach(asistencia => {
                    const row = document.createElement("tr");

                    const modulo = document.createElement("td");
                    modulo.textContent = asistencia.Módulo + " " + asistencia.Nombre;
                    row.appendChild(modulo);

                    const fecha = document.createElement("td");
                    var fechaStr = asistencia.Fecha.split("T");
                    fecha.textContent = fechaStr[0] + " " + fechaStr[1];
                    row.appendChild(fecha);
                    const estat = document.createElement("td");
                    estat.textContent = asistencia.Comentario;
                    row.appendChild(estat);
                    
                    table.appendChild(row);
                });
                asistenciaDiv.appendChild(table);
            })
            .catch(error => {
                console.error("Error capturat:", error);
            errorDiv.textContent = "Error al carregar la llista de d'alumnes";
            });
        } else {
            // Si no selecciona ningún módulo en el dropdown
            // carga todas las asistencias de nuevo
            fetch("http://localhost:8000/asistencia/listAll")  // Aquí cridem a l'endpoint de l'API
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error a la resposta del servidor");
                }
                return response.json();
            })
            .then(data => {
                asistenciaDiv.innerHTML = ""; // Netejar la taula abans d'afegir res
                table.innerHTML = "";
                addHeaders();
                
                // Iterar sobre els alumnes i afegir-los al DOM
                data.forEach(asistencia => {
                    const row = document.createElement("tr");
    
                    const modulo = document.createElement("td");
                    modulo.textContent = asistencia.Módulo + " " + asistencia.Nombre;
                    row.appendChild(modulo);
    
                    const fecha = document.createElement("td");
                    var fechaStr = asistencia.Fecha.split("T");
                    fecha.textContent = fechaStr[0] + " " + fechaStr[1];
                    row.appendChild(fecha);
                    const estat = document.createElement("td");
                    estat.textContent = asistencia.Comentario;
                    row.appendChild(estat);
                    
                    table.appendChild(row);
                });
                asistenciaDiv.appendChild(table);
            })
            .catch(error => {
                console.error("Error capturat:", error);
                errorDiv.textContent = "Error al carregar la llista de d'alumnes";
            });
        }
    });

    // Actualizar la lista de asignaturas filtradas por el módulo
    // seleccionado en el dropdown
    modulosDropdown.addEventListener("change", () => {
        const selectedValue = modulosDropdown.value;
        if (selectedValue && !(selectedValue === "asignatura")) {
            fetch("http://localhost:8000/asistencia/?" + new URLSearchParams({
                modulo: selectedValue,
            }).toString())  // Aquí cridem a l'endpoint de l'API
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error a la resposta del servidor");
                }
                return response.json();
            })
            .then(data => {
                asistenciaDiv.innerHTML = ""; // Netejar la taula abans d'afegir res
                table.innerHTML = "";
                addHeaders();
                
                // Iterar sobre els alumnes i afegir-los al DOM
                data.forEach(asistencia => {
                    const row = document.createElement("tr");

                    const modulo = document.createElement("td");
                    modulo.textContent = asistencia.Módulo + " " + asistencia.Nombre;
                    row.appendChild(modulo);

                    const fecha = document.createElement("td");
                    var fechaStr = asistencia.Fecha.split("T");
                    fecha.textContent = fechaStr[0] + " " + fechaStr[1];
                    row.appendChild(fecha);
                    const estat = document.createElement("td");
                    estat.textContent = asistencia.Comentario;
                    row.appendChild(estat);
                    
                    table.appendChild(row);
                });
                asistenciaDiv.appendChild(table);
            })
            .catch(error => {
                console.error("Error capturat:", error);
            errorDiv.textContent = "Error al carregar la llista de d'alumnes";
            });
        } else {
        // Si no selecciona ningún módulo en el dropdown
        // carga todas las asistencias de nuevo
        fetch("http://localhost:8000/asistencia/listAll")  // Aquí cridem a l'endpoint de l'API
        .then(response => {
            if (!response.ok) {
                throw new Error("Error a la resposta del servidor");
            }
            return response.json();
        })
        .then(data => {
            asistenciaDiv.innerHTML = ""; // Netejar la taula abans d'afegir res
            table.innerHTML = "";
            addHeaders();
            
            // Iterar sobre els alumnes i afegir-los al DOM
            data.forEach(asistencia => {
                const row = document.createElement("tr");

                const modulo = document.createElement("td");
                modulo.textContent = asistencia.Módulo + " " + asistencia.Nombre;
                row.appendChild(modulo);

                const fecha = document.createElement("td");
                var fechaStr = asistencia.Fecha.split("T");
                fecha.textContent = fechaStr[0] + " " + fechaStr[1];
                row.appendChild(fecha);
                const estat = document.createElement("td");
                estat.textContent = asistencia.Comentario;
                row.appendChild(estat);
                
                table.appendChild(row);
            });
            asistenciaDiv.appendChild(table);
        })
        .catch(error => {
            console.error("Error capturat:", error);
            errorDiv.textContent = "Error al carregar la llista de d'alumnes";
        });
        }
    });

    const username = localStorage.getItem('username');

    fetch('http://localhost:8000/user/?' + new URLSearchParams({
        username: username,
    }).toString())
    .then(response => response.json())
    .then(user => {
        document.querySelector('.name-user').textContent = user.Name + " " + user.Surname;
    })
    .catch(error => {
        console.error("Error capturat:", error);
    });
});
