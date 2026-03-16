const qrInput = document.getElementById("qrInput");
const generateQrBtn = document.getElementById("generateQrBtn");
const qrDiv = document.getElementById("qrCode");
const downloadQrBtn = document.getElementById("downloadQrBtn");

let qrCode = null;

function generateQr(){
    const text = qrInput.value.trim();
    if(text.trim() === ""){
        qrDiv.innerHTML = "";
        qrCode = null;
        return;
    }
    qrDiv.innerHTML="";
    const maxSize = Math.max(250, Math.min(qrDiv.clientWidth, qrDiv.clientHeight));
    qrCode = new QRCode(qrDiv, {
        text: text,
        width: maxSize,
        height: maxSize
    });
}
qrInput.addEventListener("input", generateQr);


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
