
let decks = [];
let activeDeckIndex = null;
let activeCardIndex = 0;

const deckList = document.getElementById("decklist");
const addDeckBtn = document.getElementById("addDeckBtn");
const addCardBtn = document.getElementById("addCardBtn");

const flashcard = document.getElementById("flashcard");
const flipBtn = document.getElementById("flipCard");

const cardFront = document.querySelector(".card-front p");
const cardBack = document.getElementById("cardBack");

const prevBtn = document.getElementById("prevCard");
const nextBtn = document.getElementById("nextCard");

const cardList = document.getElementById("cardList");

flipBtn.addEventListener("click", () => {
    flashcard.classList.toggle("flipped");
});

flashcard.addEventListener("click", () => {
    flashcard.classList.toggle("flipped");
});

function renderDecks() {
    deckList.innerHTML = "";
    decks.forEach((deck, index) => {
        const li = document.createElement("li");
        li.textContent = deck.name;
        li.dataset.index=index;

        if(index === activeDeckIndex){
            li.classList.add("active-deck");
        }

        deckList.appendChild(li);
    });
}

function renderCard(){
    if(activeDeckIndex === null){
        cardFront.textContent = "Select a deck";
        cardBack.textContent = "";
        return;
    }

    const deck = decks[activeDeckIndex];

    if (!deck.cards.length){
        cardFront.textContent = "No cards in deck";
        cardBack.textContent= "";
        return;
    }

    const card = deck.cards[activeCardIndex];

    cardFront.textContent = card.front;
    cardBack.textContent = card.back;

    flashcard.classList.remove("flipped");
    renderCardList();
}

function renderCardList() {
    cardList.innerHTML = "";
    if(activeDeckIndex === null) return;

    const deck = decks[activeDeckIndex];

    deck.cards.forEach((card, index) => {
        const li = document.createElement("li");
        li.textContent = `${card.front} - ${card.back}`;

        if (index === activeCardIndex) {
            li.classList.add("active-card");
        }

        li.addEventListener("click", () => {
            activeCardIndex = index;
            renderCard();
            renderCardList();
        });
        cardList.appendChild(li);
    });
}

addDeckBtn.addEventListener("click", () => {
    const name = prompt("Enter deck name:");
    if(!name) return;

    decks.push({name, cards: []});
    activeDeckIndex = decks.length-1;
    activeCardIndex = 0;

    renderDecks();
    renderCard();
    renderCardList();
});

deckList.addEventListener("click", (e) => {
    if (e.target.tagName === "LI"){
        activeDeckIndex = Number(e.target.dataset.index);
        activeCardIndex = 0;
        renderDecks();
        renderCard();
        renderCardList();
    }
});

addCardBtn.addEventListener("click", () => {
    if(activeDeckIndex === null){
        alert("Select a deck first.");
        return;
    }
    const front = prompt("Enter question:");
    const back = prompt("Enter answer:");

    if(!front || !back) return;

    decks[activeDeckIndex].cards.push({front, back});
    activeCardIndex = decks[activeDeckIndex].cards.length -1;

    renderCard();
});

nextBtn.addEventListener("click", () => {
    if (activeDeckIndex === null) return;

    const deck = decks[activeDeckIndex];
    if(!deck.cards.length) return;

    activeCardIndex = (activeCardIndex + 1) % deck.cards.length;
    renderCard();
});

prevBtn.addEventListener("click", () => {
    if (activeDeckIndex === null) return;

    const deck = decks[activeDeckIndex];
    if(!deck.cards.length) return;

    activeCardIndex = (activeCardIndex-1 + deck.cards.length) % deck.cards.length;
    renderCard();
});
