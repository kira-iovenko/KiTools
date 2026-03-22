const inputJson = document.getElementById("inputJson");
const formatJsonBtn = document.getElementById("formatJsonBtn");
const outputJson = document.getElementById("outputJson");
const jsonStatus = document.getElementById("jsonStatus");
const validateJsonBtn = document.getElementById("validateJsonBtn");
formatJsonBtn.addEventListener("click", function() {
    const text = inputJson.value;
    try{
        const parsedJson = JSON.parse(text);
        const formattedJson = JSON.stringify(parsedJson, null, 2);
        outputJson.textContent = formattedJson;
        jsonStatus.textContent = "JSON is valid!";
        jsonStatus.style.color = "var(--accent-green)";
    }
    catch (error){
        jsonStatus.textContent="JSON is invalid.";
        jsonStatus.style.color = "#fa4343";
        outputJson.textContent = error.message;
    }
});
validateJsonBtn.addEventListener("click", function() {
    const text = inputJson.value;
    try{ 
    JSON.parse(text);
    jsonStatus.textContent="JSON is valid!";
    jsonStatus.style.color = "var(--accent-green)";
    outputJson.textContent="";
    }
    catch (error){
        jsonStatus.textContent = "JSON is invalid.";
        jsonStatus.style.color = "#fa4343";
        outputJson.textContent = error.message;
    }
});