const openSidebarBtn = document.querySelector(".fa-bars");
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


    // Cridem a l'endpoint de l'API fent un fetch
    fetch("http://localhost:8000/asistencia/listAll")  // Aquí cridem a l'endpoint de l'API
        .then(response => {
            if (!response.ok) {
                throw new Error("Error a la resposta del servidor");
            }
            return response.json();
        })
        .then(data => {
            const asistenciaDiv = document.getElementById("asistencias");
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
});
