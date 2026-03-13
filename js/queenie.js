const queenie = document.getElementById("queenie_sprite");
const guideText = document.getElementById("guideText");
const talking = "images/queenie_talking.png";
const neutral = "images/queenie_neutral.png";
const textbox = document.querySelector(".textbox");
let talkingInterval;
let typingInterval;
let dialogues = [];
let currentDialogue = 0;
let typing = false;
function talk() {
    talkingInterval = setInterval(() => {
        queenie.src = queenie.src.includes("neutral")?talking: neutral;
    }, 140);
}
function stopTalking() {
    clearInterval(talkingInterval);
    queenie.src = neutral;
}

function textAppear(text, callback) {
    let i = 0;
    guideText.textContent = "";
    typing = true;
    talk();
    const interval = setInterval(() => {
        guideText.textContent += text[i];
        i++;
        if (i>=text.length){
            clearInterval(interval);
            stopTalking();
            typing = false;
            if(callback) callback();
        }
    }, 40); 
}

function nextDialogue(){
    if(currentDialogue < dialogues.length){
        textAppear(dialogues[currentDialogue]);
        currentDialogue++;
        if (currentDialogue === dialogues.length){
            textbox.classList.add("no-arrow");
        }
    }
}

function userFirstVisit() {
    dialogues = ["Hi! Welcome to KITools.", "Feel free to check all the tools in the sidebar!"]; 
    localStorage.setItem("visitedBefore", "true");
    nextDialogue();
}

function returnVisit(){
    dialogues = ["Welcome back! :D", "What shall we do today?"];
    nextDialogue();
}
if(!localStorage.getItem("visitedBefore")){
    userFirstVisit();
} else{
    returnVisit();
}

document.querySelector(".textbox").addEventListener("click", () => {
    if(typing){
        clearInterval(typingInterval);
        guideText.textContent = dialogues[currentMessage -1];
        stopTalking();
        typing = false;
    } else{
        nextDialogue();
    }
});
