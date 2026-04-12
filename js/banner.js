const bannerTitleInput = document.getElementById("bannerTitleInput");
const bannerSubtitleInput = document.getElementById("bannerSubtitleInput");
const bannerBgColor = document.getElementById("bannerBgColor");
const bannerTitleSize = document.getElementById("bannerTitleSize");
const bannerTitle = document.getElementById("bannerTitle");
const bannerSubtitle = document.getElementById("bannerSubtitle");
const bannerTitleColor = document.getElementById("bannerTitleColor");
const bannerSubtitleColor = document.getElementById("bannerSubtitleColor");
const bannerSubtitleSize = document.getElementById("bannerSubtitleSize");
const bannerDownloadBtn = document.getElementById("downloadBannerBtn");
const banner = document.getElementById("banner");
const resetBannerBtn = document.getElementById("resetBannerBtn");
const bannerImageUpload = document.getElementById("bannerImageUpload");
const removeBgImageBtn = document.getElementById("removeBgImageBtn");
const bannerImage = document.getElementById("bannerImage");
const bannerImageX = document.getElementById("bannerImageX");
const bannerImageY = document.getElementById("bannerImageY");
const bannerImageZoom = document.getElementById("bannerImageZoom");
const bannerImageControls = document.getElementById("bannerImageControls");

let offsetX = 0;
let offsetY = 0;
let currentlyMoving = null;

bannerTitleInput.addEventListener("input", ()=> {
    bannerTitle.textContent = bannerTitleInput.value || "Title";
});
bannerSubtitleInput.addEventListener("input", ()=> {
    bannerSubtitle.textContent = bannerSubtitleInput.value || "Subtitle";
});
bannerImageUpload.addEventListener("change", () => {
    const imageFile = bannerImageUpload.files[0];
    if(!imageFile){
        return;
    }
    const reader = new FileReader();
    reader.onload = function(e) {
        bannerImage.src=e.target.result;
        bannerImage.style.display = "block";
        bannerImageControls.classList.remove("hidden");
        bannerImageX.value = 0;
        bannerImageY.value = 0;
        bannerImageZoom.value =1;
        changeImagePosition();
    };
    reader.readAsDataURL(imageFile);
});

function changeImagePosition(){
    const x = bannerImageX.value;
    const y = bannerImageY.value;
    const zoom = Number(bannerImageZoom.value);
    bannerImage.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${zoom})`;
}
bannerImageX.addEventListener("input", changeImagePosition);
bannerImageY.addEventListener("input", changeImagePosition);
bannerImageZoom.addEventListener("input", changeImagePosition);

bannerBgColor.addEventListener("input", () => {
    banner.style.background = bannerBgColor.value;
});
bannerTitleSize.addEventListener("input", () => {
    bannerTitle.style.fontSize = bannerTitleSize.value + "px";
});
bannerTitleColor.addEventListener("input", () => {
    bannerTitle.style.color = bannerTitleColor.value;
});
bannerSubtitleColor.addEventListener("input", () => {
    bannerSubtitle.style.color = bannerSubtitleColor.value;
});
bannerSubtitleSize.addEventListener("input", () => {
    bannerSubtitle.style.fontSize = bannerSubtitleSize.value + "px";
});

bannerDownloadBtn.addEventListener("click", () => {
    html2canvas(document.getElementById("banner")).then(canvas => {
        const link = document.createElement("a");
        link.download = "banner.png"
        link.href=canvas.toDataURL();
        link.click();
    });
});

function makeDraggable(text){
    text.addEventListener("mousedown", (e) => {
        currentlyMoving = text;
        const box = text.getBoundingClientRect();
        const bannerBox = banner.getBoundingClientRect();
        offsetX = e.clientX - box.left;
        offsetY = e.clientY - box.top;
        text.style.transform = "none";
        text.style.left = (box.left - bannerBox.left)+"px";
        text.style.top = (box.top - bannerBox.top) + "px";
        text.style.cursor = "grabbing";
    });
}

makeDraggable(bannerTitle);
makeDraggable(bannerSubtitle);

document.addEventListener("mouseup", () => {
    if(currentlyMoving){
        currentlyMoving.style.cursor = "grab";
    }
    currentlyMoving = null;
});

document.addEventListener("mousemove", (e) => {
    if (!currentlyMoving) return;
    const bannerBox = banner.getBoundingClientRect();
    let x2 = e.clientX - bannerBox.left - offsetX;
    let y2 = e.clientY - bannerBox.top - offsetY;
    const currentTextBox = currentlyMoving.getBoundingClientRect();
    const limitingX = bannerBox.width - currentTextBox.width;
    const limitingY = bannerBox.height - currentTextBox.height;
    x2 = Math.max(0, Math.min(x2, limitingX));
    y2 = Math.max(0, Math.min(y2, limitingY));
    currentlyMoving.style.left = x2+"px";
    currentlyMoving.style.top = y2+"px";
});
resetBannerBtn.addEventListener("click", () => {
    bannerTitleInput.value = "";
    bannerSubtitleInput.value = "";
    bannerBgColor.value = "#b8e0d2";
    bannerTitleColor.value = "#2b3d33";
    bannerTitleSize.value = "47";
    bannerSubtitleColor.value = "#eee";
    bannerSubtitleSize.value = "19";
    bannerTitle.textContent = "Title";
    bannerSubtitle.textContent = "Subtitle";
    banner.style.background = "var(--accent-green)";
    bannerTitle.style.color = "#2b3d33";
    bannerSubtitle.style.color = "#eee";
    bannerTitle.style.fontSize = "47px";
    bannerSubtitle.style.fontSize = "19px";
    bannerTitle.style.left = "50%";
    bannerTitle.style.top = "40%";
    bannerTitle.style.transform = "translate(-50%, -50%)";
    bannerSubtitle.style.left = "50%";
    bannerSubtitle.style.top = "60%";
    bannerSubtitle.style.transform = "translate(-50%, -50%)";
    bannerImage.src="";
    bannerImage.style.display = "none";
    bannerImageControls.classList.add("hidden");
    bannerImageUpload.value = "";
    bannerImageX.value = 0;
    bannerImageY.value = 0;
    bannerImageZoom.value = 1;
    changeImagePosition();
});

removeBgImageBtn.addEventListener("click", () => {
    bannerImage.src="";
    bannerImage.style.display = "none";
    bannerImageControls.classList.add("hidden");
    bannerImageUpload.value = "";
});