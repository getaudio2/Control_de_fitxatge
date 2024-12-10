const form = document.getElementById("login-form");
const loginErrorMsg = document.getElementById("login-error-msg");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = form.email.value;
    const password = form.password.value;
    const idschool = form.idschool.value;

    if (email === "admin@example.com" && password === "admin" && idschool === "1234") {
        // window.location.href = "alumne_asistencia.html";
        window.location.assign("alumne_asistencia.html", "_self");
    } else {
        console.log("user not existing")
        loginErrorMsg.style.opacity = 1;
    }
})