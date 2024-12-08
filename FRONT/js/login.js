const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
//const loginErrorMsg = document.getElementById("login-error-msg");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;
    const idschool = loginForm.idschool.value;

    if (username === "admin" && password === "admin" && idschool === "1234") {
        alert("You have successfully logged in.");
        window.location.assign("alumne_asistencia.html", "_self");
    } else {
        console.log("user not existing")
        //loginErrorMsg.style.opacity = 1;
    }
})