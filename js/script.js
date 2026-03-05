const darkMode = document.getElementById("darkMode");

if(localStorage.getItem("mode")== "dark"){
    document.body.classList.add("dark-mode");
    darkMode.textContent = "Light Mode";
}
darkMode.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){
        localStorage.setItem("mode", "dark");
        darkMode.textContent = "Light Mode";
    } else {
        localStorage.setItem("mode", "light");
        darkMode.textContent = "Dark Mode";
    }
});