const openSidebarBtn = document.querySelector(".fa-bars");
const profileDropdownBtn = document.querySelector(".dropbtn");
const contentDropdown = document.querySelector(".dropdown-content");
const profileName = document.querySelector(".name-user");
const nameInput = document.querySelector(".name-input");
const surnameInput = document.querySelector(".surname-input");
const emailInput = document.querySelector(".email-input");
const deptInput = document.querySelector(".dept-input");
const profileId = document.querySelector(".perfil-id");
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

    const fullNameArray = profileName.innerText.split(" ");

    fetch("http://localhost:8000/persona/?" + new URLSearchParams({
        name: fullNameArray[0],
        surname: fullNameArray[1],
    }).toString())
    .then(response => {
        if (!response.ok) {
            throw new Error("Error a la resposta del servidor");
        }
        return response.json();
    })
    .then(data => {
        nameInput.value = data.Name;
        surnameInput.value = data.Surname;
        emailInput.value = data.Email;
        deptInput.value = data.Rol;
        profileId.textContent = "00" + data.Id;

    })
    .catch(error => {
        console.error("Error capturat:", error);
        alert("Error al carregar les dades de la persona");
    });
});