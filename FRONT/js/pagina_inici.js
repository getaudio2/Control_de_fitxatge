const comenzarBtn = document.getElementById("comenzar-btn");
const loginBtn = document.getElementById("login-btn");

comenzarBtn.addEventListener("click", () => {
    window.location.assign("login.html", "_self");
});

loginBtn.addEventListener("click", () => {
    window.location.assign("login.html", "_self");
});