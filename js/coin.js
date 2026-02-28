const flipBtn = document.getElementById("flipBtn");
const result = document.getElementById("result");
const coin = document.getElementById("coin");

flipBtn.addEventListener("click", () => {
    const isHeads = Math.random() < 0.5;
    result.textContent = "Let's see...";
    coin.parentElement.classList.remove("landed");
    coin.classList.remove("landed");
    coin.style.transition = "none";
    coin.style.transform = "rotateY(0deg)";
    void coin.offsetWidth;
    coin.style.transition="transform 0.8s cubic-bezier(.22,1.2,.36,1)";
    const spins = 3;
    const lastRotate = spins * 360 + (isHeads ? 0 : 180);
    coin.style.transform = `rotateY(${lastRotate}deg)`;
    const onEnd = (event) => {
        if(event.propertyName !== "transform") return;
        result.textContent = isHeads ? "Heads!":"Tails!";
        coin.parentElement.classList.add("landed");
        // coin.removeEventListener("transitionend", onEnd);
    };
    coin.addEventListener("transitionend", onEnd, {once: true});
});

