const openSidebarBtn = document.querySelector(".fa-bars");
const modulosDropdown = document.getElementById("asignaturadrop");
const asistenciaDiv = document.getElementById("asistencias");
const profileDropdownBtn = document.querySelector(".dropbtn");
const contentDropdown = document.querySelector(".dropdown-content");
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

    // Càrrega de mòduls
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
    // Càrrega d'alumnes
    fetch("http://localhost:8000/persona/alumnosAll")  // Aquí cridem a l'endpoint de l'API
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
                const row = document.createElement("tr");

                const nombreAlumno = document.createElement("td");
                nombreAlumno.textContent = asistencia.Name + " " + asistencia.Surname;
                row.appendChild(nombreAlumno);

                const circleColor = ['green', 'yellow', 'red', 'blue'];
                
                circleColor.forEach((color, index) => {
                    const circleCell = document.createElement('td');
                    const circle = document.createElement('div');
                    circle.classList.add('circle', color);

                    if (index === 0) circle.classList.add('checked');

                    circle.addEventListener('click', () => {
                        const siblingCircles = circleCell.parentElement.querySelectorAll('.circle');
                        siblingCircles.forEach(sibling => sibling.classList.remove('checked'));
                        circle.classList.toggle('checked');
                    });

                    circleCell.appendChild(circle);
                    row.appendChild(circleCell);
                });
                
                table.appendChild(row);
                asistenciaDiv.appendChild(table);
            });
        })
        .catch(error => {
            console.error("Error capturat:", error);
            alert("Error al carregar la llista d'alumnes");
        });
});
