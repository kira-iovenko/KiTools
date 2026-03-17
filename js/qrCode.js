const qrInput = document.getElementById("qrInput");
const qrDiv = document.getElementById("qrCode");
const downloadQrBtn = document.getElementById("downloadQrBtn");
const qrColor = document.getElementById("qrColor");
const qrBgColor = document.getElementById("qrBgColor");

let qrCode = null;

function generateQr(){
    const text = qrInput.value.trim();
    if(text.trim() === ""){
        qrDiv.innerHTML = "";
        qrCode = null;
        return;
    }

    if(qrColor.value === qrBgColor.value){
        qrDiv.innerHTML = "";        
        return;
    }

    qrDiv.innerHTML="";
    const maxSize = Math.max(250, Math.min(qrDiv.clientWidth, qrDiv.clientHeight));
    qrCode = new QRCode(qrDiv, {
        text: text,
        width: maxSize,
        height: maxSize,
        colorDark: qrColor.value,
        colorLight: qrBgColor.value
    });
}
qrInput.addEventListener("input", generateQr);
qrColor.addEventListener("input", generateQr);
qrBgColor.addEventListener("input", generateQr);

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
