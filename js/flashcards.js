const flashcard = document.getElementById("flashcard");
const flipBtn = document.getElementById("flipCard");

flipBtn.addEventListener("click", () => {
    flashcard.classList.toggle("flipped");
});

flashcard.addEventListener("click", () => {
    flashcard.classList.toggle("flipped");
});