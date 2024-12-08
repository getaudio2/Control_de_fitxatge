const openSidebarBtn = document.querySelector(".fa-bars");
const modulosDropdown = document.getElementById("asignaturadrop");
const asistenciaDiv = document.getElementById("asistencias");
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

document.addEventListener("DOMContentLoaded", function() {

    fetch("http://localhost:8000/clase/listAll")
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
            alert("Error al carregar la llista de mòduls");
        });
    // Cridem a l'endpoint de l'API fent un fetch
    fetch("http://localhost:8000/asistencia/listAll")  // Aquí cridem a l'endpoint de l'API
        .then(response => {
            if (!response.ok) {
                throw new Error("Error a la resposta del servidor");
            }
            return response.json();
        })
        .then(data => {
            asistenciaDiv.innerHTML = ""; // Netejar la taula abans d'afegir res
            
            // Iterar sobre els alumnes i afegir-los al DOM
            data.forEach(asistencia => {
                const table = document.createElement("table");
                const row = document.createElement("tr");
                table.classList.add("asistencia-table");

                const modulo = document.createElement("td");
                modulo.textContent = asistencia.Módulo;
                row.appendChild(modulo);

                const fecha = document.createElement("td");
                fecha.textContent = asistencia.Fecha;
                row.appendChild(fecha);
                
                table.appendChild(row);
                asistenciaDiv.appendChild(table);
            });
        })
        .catch(error => {
            console.error("Error capturat:", error);
            alert("Error al carregar la llista d'alumnes");
        });

    modulosDropdown.addEventListener("change", () => {
        const selectedValue = modulosDropdown.value;
        if (selectedValue) {
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
                
                // Iterar sobre els alumnes i afegir-los al DOM
                data.forEach(asistencia => {
                    const table = document.createElement("table");
                    const row = document.createElement("tr");
                    table.classList.add("asistencia-table");

                    const modulo = document.createElement("td");
                    modulo.textContent = asistencia[0]; //asistencia.Módulo
                    row.appendChild(modulo);

                    const fecha = document.createElement("td");
                    fecha.textContent = asistencia[1]; //asistencia.Fecha
                    row.appendChild(fecha);
                    
                    table.appendChild(row);
                    asistenciaDiv.appendChild(table);
                });
            })
            .catch(error => {
                console.error("Error capturat:", error);
                alert("Error al carregar la llista d'alumnes");
            });
        }
    });
});
