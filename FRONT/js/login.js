const form = document.getElementById("login-form");
const loginErrorMsg = document.getElementById("error-div");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = form.email.value;
    const password = form.password.value;
    const idschool = form.idschool.value;

    const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: email,
            password: password
        })
    });

    if (response.ok) {
        localStorage.setItem('username', email);

        fetch('http://localhost:8000/user/?' + new URLSearchParams({
            username: email,
        }).toString())
        .then(response => response.json())
        .then(user => {
            console.log(user);
            if (user.Rol === "Profesor") {
                window.location.assign("profe_asistencia.html", "_self");
            } else if (user.Rol === "Alumno") {
                window.location.assign("alumne_asistencia.html", "_self");
            }
        })
        .catch(error => {
            console.error("Error capturat:", error);
        });
    } else {
        console.log("user not existing")
        showError();
    }

    /*
    if (email === "admin@example.com" && password === "admin" && idschool === "1234") {
        // window.location.href = "alumne_asistencia.html";
        window.location.assign("alumne_asistencia.html", "_self");
    } else {
        console.log("user not existing")
        showError();
    }*/
})

function showError() {
    loginErrorMsg.classList.remove("hidden");
    setTimeout(() => {
        loginErrorMsg.classList.add("visible");
    }, 10);

    setTimeout(() => {
        hideError();
    }, 4000);
}

function hideError() {
    loginErrorMsg.classList.remove('visible');
    setTimeout(() => {
        loginErrorMsg.classList.add("hidden");
    }, 500);
}