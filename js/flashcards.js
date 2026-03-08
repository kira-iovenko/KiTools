let decks = [];
let activeDeckIndex = null;
let activeCardIndex = 0;
let editingIndex = null;
let studyMode = false;

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
const exitStudyModeBtn = document.getElementById("exitStudyModeBtn");
const addCardBtn = document.getElementById("addCardBtn");
const searchInput = document.getElementById("searchInput");

const flashcard = document.getElementById("flashcard");
const flipBtn = document.getElementById("flipCard");
const cardFront = document.querySelector(".card-front p");
const cardBack = document.getElementById("cardBack");

const prevBtn = document.getElementById("prevCard");
const nextBtn = document.getElementById("nextCard");

const cardList = document.getElementById("cardGrid");

const modal = document.getElementById("modal");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");
const frontInput = document.getElementById("frontInput");
const backInput = document.getElementById("backInput");
const storageKey = "flashcards";
const storageVersion = 1;

function loadStorage(){
    try{
        const raw = localStorage.getItem(storageKey);
        if (!raw) return;
        const parsed = JSON.parse(raw);
        if(!parsed.version|| parsed.version !== storageVersion){
            console.warn("Mismatch of storage version, data is resetting.");
            localStorage.removeItem(storageKey);
            decks = [];
            return;
        }
        if(!Array.isArray(parsed.decks)){
            console.warn("Deck structure is invalid.");
            return;
        }
        decks = parsed.decks;
    } catch(error){
        console.error("Failed to parse storage.", error);
        decks=[];
    }
}
function saveStorage(){
    const data = {version: storageVersion, decks: decks};
    try{
        localStorage.setItem(storageKey, JSON.stringify(data));
    } catch(error){
        console.error("Failed saviing to storage.", error);
    }
}
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
        div.innerHTML = `<span>${deck.name}</span> <button class="study-deck" data-index="${index}">Study</button> <button data-index="${index}" class="delete-deck">x</button>`;
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
        const container = document.createElement("div");
        container.className = "card-container";
        container.dataset.index = index;
        container.innerHTML = `
                <div class="card-widget">${card.front}</div> 
                <div class="card-actions">
                    <button class="edit-card" data-index="${index}">Edit</button>
                    <button class="delete-card" data-index="${index}">Delete</button>
                </div>`;
        cardList.appendChild(container);
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
    saveStorage();
    deckModal.classList.add("hidden");
    renderDecks();
});

cancelDeckBtn.addEventListener("click", () => {
    deckModal.classList.add("hidden");
});

deckGrid.addEventListener("click", (e) => {
    const studyBtn = e.target.closest(".study-deck");
    if(studyBtn) {
        const index=Number(studyBtn.dataset.index);
        studyModeOn(index);
        return;
    }
    const deleteBtn = e.target.closest(".delete-deck");
    const widget = e.target.closest(".deck-widget");
    if(deleteBtn) {
        const index = Number(deleteBtn.dataset.index);
        decks.splice(index, 1);
        saveStorage();
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
    if (editingIndex !== null) {
        decks[activeDeckIndex].cards[editingIndex] = {front, back};
        activeCardIndex = editingIndex;
        editingIndex = null;
    } else {
        decks[activeDeckIndex].cards.push({front, back});
        activeCardIndex = decks[activeDeckIndex].cards.length - 1;
    }
    modal.classList.add("hidden");
    saveStorage();
    renderCard();
    renderCardList();
});

cancelBtn.addEventListener("click", () => {
    editingIndex = null;
    modal.classList.add("hidden");
});

cardList.addEventListener("click", (e) => {
    const editBtn = e.target.closest(".edit-card");
    const deleteBtn = e.target.closest(".delete-card");
    const widget = e.target.closest(".card-widget");
    if(deleteBtn){
        const index = Number(deleteBtn.dataset.index);
        decks[activeDeckIndex].cards.splice(index, 1);
        if(activeCardIndex >= decks[activeDeckIndex].cards.length){
            activeCardIndex = decks[activeDeckIndex].cards.length - 1;
        }
        saveStorage();
        renderCard();
        renderCardList();
        return;
    }
    if(editBtn){
        editingIndex = Number(editBtn.dataset.index);
        const card = decks[activeDeckIndex].cards[editingIndex];
        frontInput.value = card.front;
        backInput.value = card.back;
        modal.classList.remove("hidden");
        return;
    }
    if (widget){
        activeCardIndex = Number(widget.dataset.index);
        renderCard();
    }
});

flipBtn.addEventListener("click", () => {
    flashcard.classList.toggle("flipped");
});

flashcard.addEventListener("click", () => {
    flashcard.classList.toggle("flipped");
});

nextBtn.addEventListener("click", () => {
    if (activeDeckIndex === null) return;
    const deck = decks[activeDeckIndex];
    if(!deck.cards.length) return;
    activeCardIndex = (activeCardIndex + 1) % deck.cards.length;
    animateCardChange("next");
});

prevBtn.addEventListener("click", () => {
    if (activeDeckIndex === null) return;
    const deck = decks[activeDeckIndex];
    if(!deck.cards.length) return;
    activeCardIndex = (activeCardIndex-1 + deck.cards.length) % deck.cards.length;
    animateCardChange("prev");
});

function animateCardChange(direction){
    const cardChange = direction === "next"?"slide-left":"slide-right";
    flashcard.classList.add(cardChange);
    setTimeout(() => {
        renderCard();
        }, 175);
    setTimeout(() => {
        flashcard.classList.remove(cardChange);
    }, 350);
}

deckSearchInput.addEventListener("input", () =>{
    const term = deckSearchInput.value.toLowerCase();
    const deckWidgets = document.querySelectorAll(".deck-widget");
    deckWidgets.forEach(deck=>{
        const name=deck.textContent.toLowerCase();
        if (name.includes(term)){
            deck.style.display = "";
        } else{
            deck.style.display="none";
        }
    });
});
searchInput.addEventListener("input",()=> {
    const term = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll(".card-container");
    cards.forEach(card =>{
        const text=card.textContent.toLowerCase();
        if(text.includes(term)){
            card.style.display="";
        }
        else{
            card.style.display="none";
        }
    });

});

function studyModeOn(index){
    studyMode = true;
    activeDeckIndex = index;
    activeCardIndex = 0;
    exitStudyModeBtn.style.display="block";
    deckView.classList.add("hidden");
    cardView.classList.remove("hidden");
    addCardBtn.style.display = "none";
    searchInput.style.display = "none";
    backToDecksBtn.style.display = "none";
    cardList.style.display="none";
    renderCard();
}
function exitStudyMode(){
    studyMode = false;
    addCardBtn.style.display = "";
    searchInput.style.display = "";
    cardList.style.display="";
    backToDecksBtn.style.display = "";
    exitStudyModeBtn.style.display = "none";
    showDeckView();
}
exitStudyModeBtn.addEventListener("click", exitStudyMode);


loadStorage();
renderDecks();