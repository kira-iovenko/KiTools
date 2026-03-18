const bannerTitleInput = document.getElementById("bannerTitleInput");
const bannerSubtitleInput = document.getElementById("bannerSubtitleInput");
const bannerBgColor = document.getElementById("bannerBgColor");
const bannerTitleSize = document.getElementById("bannerTitleSize");
const bannerTitle = document.getElementById("bannerTitle");
const bannerSubtitle = document.getElementById("bannerSubtitle");
bannerTitleInput.addEventListener("input", ()=> {
    bannerTitle.textContent = bannerTitleInput.value || "Title";
});
bannerSubtitleInput.addEventListener("input", ()=> {
    bannerSubtitle.textContent = bannerSubtitleInput.value || "Subtitle";
});
bannerBgColor.addEventListener("input", () => {
    banner.style.background = bannerBgColor.value;
});
bannerTitleSize.addEventListener("input", () => {
    bannerTitle.style.fontSize = bannerTitleSize.value + "px";
});