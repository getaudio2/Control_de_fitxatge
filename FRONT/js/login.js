const form = document.getElementById("login-form");
const loginErrorMsg = document.getElementById("error-div");

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
        showError();
    }
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