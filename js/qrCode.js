const qrInput = document.getElementById("qrInput");
const generateQrBtn = document.getElementById("generateQrBtn");
const qrDiv = document.getElementById("qrCode");
const downloadQrBtn = document.getElementById("downloadQrBtn");

let qrCode;

generateQrBtn.addEventListener("click", () => {
    const text = qrInput.value;
    if(text.trim() === ""){
        alert("You have to enter something first...");
        return;
    }
    qrDiv.innerHTML = "";
    qrCode = new QRCode(qrDiv, {
        text: text,
        width: 250,
        height: 250
    });
});

downloadQrBtn.addEventListener("click", () => {
    const img = qrDiv.querySelector("img");
    if(!img){
        alert("Generate a QR code first...");
        return;
    }
    const link = document.createElement("a");
    link.href = img.src;
    link.download = "qr-code.png";
    link.click();
});