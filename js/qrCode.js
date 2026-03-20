const qrInput = document.getElementById("qrInput");
const qrDiv = document.getElementById("qrCode");
const downloadQrBtn = document.getElementById("downloadQrBtn");
const qrColor = document.getElementById("qrColor");
const qrBgColor = document.getElementById("qrBgColor");
const qrType = document.getElementById("qrType");
const wifiFields = document.getElementById("qrWifiField");
const wifiSSID = document.getElementById("wifiSSID");
const wifiPassword = document.getElementById("wifiPassword");
const wifiEncryption = document.getElementById("encryptionWifi");

let qrCode = null;

function generateQr(){
    let text = "";
    if(qrType.value === "text"){
        text = qrInput.value.trim();
    }
    else if(qrType.value === "url"){
        let url = qrInput.value.trim();
        if(url && !url.startsWith("http")){
            url = "https://" + url;
        }
        text = url;
    }
    else if (qrType.value === "phone"){
        const phone = qrInput.value.trim();
        text = phone ? "tel:" + phone:"";
    }
    else if(qrType.value === "wifi"){
        const ssid = wifiSSID.value.trim();
        const password = wifiPassword.value.trim();
        const encryption = wifiEncryption.value;
        if(ssid === ""){
            text = "";
        } else{
            text = `WIFI:T:${encryption};S:${ssid};P:${password};;`
        }
    } 
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
wifiSSID.addEventListener("input", generateQr);
wifiPassword.addEventListener("input", generateQr);
wifiEncryption.addEventListener("change", generateQr);
qrType.addEventListener("change", () =>{
    if(qrType.value === "wifi"){
        wifiFields.classList.add("show");
        qrInput.style.display = "none";
        qrInput.value = "";
    } else{
        wifiFields.classList.remove("show");
        qrInput.style.display = "block";
        wifiSSID.value = "";
        wifiPassword.value = "";
        wifiEncryption.value = "WPA";
    }
    generateQr();
});

if(qrType.value === "wifi"){
    wifiFields.classList.add("show");
    qrInput.style.display = "none";
} else{
    wifiFields.classList.remove("show");
    qrInput.style.display = "block";
}

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
