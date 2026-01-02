const mainView = document.getElementById('main-view');
const toolLinks = document.querySelectorAll(".tool-link");

toolLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const toolFile = link.dataset.tool;
        if (!toolFile) return;
        loadTool(toolFile);
        setActive(link);
    });
});

function loadTool(file){
    fetch(`tools/${file}`)
    .then(res => res.text())
    .then(html => {
        mainView.innerHTML = html;
        if(file === "whitespace.html"){
            const script = document.createElement("script");
            script.src = "js/whitespace.js";
            script.defer = true;
            document.body.appendChild(script);
        }
    })
    .catch(err => {
        mainView.innerHTML = "<p>Error loading tool.</p>";
        console.error(err);
    })
}

function setActive(activeLink){
    toolLinks.forEach(link => link.classList.remove("active"));
    activeLink.classList.add("active");
}