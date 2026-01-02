const input = document.getElementById("userText");
const output= document.getElementById("outputText");
const cleanBtn = document.getElementById("cleanBtn");
const copyBtn = document.getElementById("copyBtn");

cleanBtn.addEventListener("click", () =>{
    let text = input.value;
    text=text.trim();
    text=text.replace(/\s+/g, " ");
    output.value = text;
});

copyBtn.addEventListener("click", () => {
    output.select();
    document.execCommand("copy");
    alert("Copied!");
});