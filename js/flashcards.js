let decks = [];
let activeDeckIndex = null;
let activeCardIndex = 0;

const deckView = document.getElementById("deckView");
const cardView = document.getElementById("cardView");

const deckGrid=document.getElementById("deckGrid");
const deckEmptyMessage = document.getElementById("deckEmptyMessage");
const deckSearchInput = document.getElementById("deckSearchInput");

const openDeckModalBtn = document.getElementById("addDeckBtn");
const deckModal = document.getElementById("deckModal");
const deckTitleInput = document.getElementById("deckTitleInput");
const saveDeckBtn = document.getElementById("saveDeckBtn");
const cancelDeckBtn = document.getElementById("cancelDeckBtn");

const backToDecksBtn = document.getElementById("backToDecksBtn");

const addCardBtn = document.getElementById("addCardBtn");
const searchInut = document.getElementById("searchInput");

const flashcard = document.getElementById("flashcard");
const flipBtn = document.getElementById("flipCard");
const cardFront = document.querySelector(".card-front p");
const cardBack = document.getElementById("cardBack");

const prevBtn = document.getElementById("prevCard");
const nextBtn = document.getElementById("nextCard");

const cardList = document.getElementById("cardList");

const modal = document.getElementById("modal");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");
const frontInput = document.getElementById("frontInput");
const backInput = document.getElementById("backInput");

function showDeckView(){
    deckView.classList.remove("hidden");
    cardView.classList.add("hidden");
    activeDeckIndex = null;
}

function showCardView(index){
    activeDeckIndex = index;
    activeCardIndex = 0;
    deckView.classList.add("hidden");
    cardView.classList.remove("hidden");
    renderCard();
    renderCardList();
}

function renderDecks() {
    deckGrid.innerHTML = "";

    if (decks.length === 0){
        deckEmptyMessage.style.display = "block";
        return;
    }

    deckEmptyMessage.style.display = "none";

    decks.forEach((deck, index) => {
        const div = document.createElement("div");
        div.className = "deck-widget";
        div.dataset.index=index;
        div.innerHTML = `<span>${deck.name}</span> <button data-index="${index}" class="delete-deck">x</button>`;
        
        deckGrid.appendChild(div);
    });
}

function renderCard(){
    if(activeDeckIndex === null) return;

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
}

function renderCardList() {
    cardList.innerHTML = "";
    if(activeDeckIndex === null) return;

    const deck = decks[activeDeckIndex];

    deck.cards.forEach((card, index) => {
        const li = document.createElement("li");
        li.textContent = card.front;
        li.dataset.index = index;
        cardList.appendChild(li);
    });
}
openDeckModalBtn.addEventListener("click", () => {
    deckTitleInput.value = "";
    deckModal.classList.remove("hidden");
});

saveDeckBtn.addEventListener("click", () => {
    const title = deckTitleInput.value.trim();
    if(!title) return;
    decks.push({name: title, cards: []});
    deckModal.classList.add("hidden");
    renderDecks();
});

cancelDeckBtn.addEventListener("click", () => {
    deckModal.classList.add("hidden");
});

deckGrid.addEventListener("click", (e) => {
    const deleteBtn = e.target.closest(".delete-deck");
    const widget = e.target.closest(".deck-widget");

    if(deleteBtn) {
        const index = Number(deleteBtn.dataset.index);
        decks.splice(index, 1);
        renderDecks();
        return;
    }
    if (widget){
        const index = Number(widget.dataset.index);
        showCardView(index);
    }
});

backToDecksBtn.addEventListener("click", showDeckView);

addCardBtn.addEventListener("click", () => {
    frontInput.value = "";
    backInput.value = "";
    modal.classList.remove("hidden");

});

saveBtn.addEventListener("click", () => {
    const front = frontInput.value.trim();
    const back = backInput.value.trim();
    if(!front||!back) return;

    decks[activeDeckIndex].cards.push({front, back});
    activeCardIndex = decks[activeDeckIndex].cards.length-1;
    modal.classList.add("hidden");
    renderCard();
    renderCardList();
});

cancelBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
});

cardList.addEventListener("click", (e) => {
    if(e.target.tagName === "LI"){
        activeCardIndex = Number(e.target.dataset.index);
        renderCard();
        renderCardList();
    }
});

flipBtn.addEventListener("click", () => {
    flashcard.classList.toggle("flipped");
});

nextBtn.addEventListener("click", () => {
    if (activeDeckIndex === null) return;

    const deck = decks[activeDeckIndex];
    if(!deck.cards.length) return;

    activeCardIndex = (activeCardIndex + 1) % deck.cards.length;
    renderCard();
    renderCardList();
});

prevBtn.addEventListener("click", () => {
    if (activeDeckIndex === null) return;

    const deck = decks[activeDeckIndex];
    if(!deck.cards.length) return;

    activeCardIndex = (activeCardIndex-1 + deck.cards.length) % deck.cards.length;
    renderCard();
    renderCardList();
});

renderDecks();