const flipBtn = document.getElementById("flipBtn");
const result = document.getElementById("result");
const coin = document.getElementById("coin");

flipBtn.addEventListener("click", () => {
    const isHeads = Math.random() < 0.5;
    result.textContent = "Let's see...";
    coin.style.transition = "none";
    coin.style.transform = "rotateY(0deg)";

    void coin.offsetWidth;
    coin.style.transition = "transform 0.9s ease-in-out";
    const spins = 3;
    const lastRotate = spins * 360 + (isHeads ? 0 : 180);
    coin.style.transform = `rotateY(${lastRotate}deg)`;
    setTimeout(function () {
        if (isHeads) {
            result.textContent = "Heads!";
        } else {
            result.textContent = "Tails!";
        }
    }, 900);
});