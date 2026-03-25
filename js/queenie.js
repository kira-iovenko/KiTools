document.addEventListener("DOMContentLoaded", () => {
    createQueenie();
    queenieInitialize();
});
const isInTools = window.location.pathname.includes("tools");
const basePath = isInTools ?"../":"";
const talking = basePath + "images/queenie_talking.png";
const neutral = basePath + "images/queenie_neutral.png";
const blinking = basePath+ "images/queenie_blinking.png";

let talkingInterval;
let typingInterval;
let dialogues = [];
let currentDialogue = 0;
let typing = false;
let queenie;
let guideText;
let textbox;

function talk() {
    talkingInterval = setInterval(() => {
        queenie.src = queenie.src.includes("neutral")?talking: neutral;
    }, 140);
}

function createQueenie(){
    const queenieHtml = `
        <div class="queenie">
            <div class="textbox">
                <p id="guideText"></p>
            </div>
            <img id="queenie_sprite" src="${neutral}" alt="Queenie sprite">
        </div>
    `;
    document.body.insertAdjacentHTML("beforeend", queenieHtml);
    queenie = document.getElementById("queenie_sprite");
    guideText = document.getElementById("guideText");
    textbox = document.querySelector(".textbox");
}

function queenieInitialize(){
    dialogueSetup();
    clickSetup();
    blinkRandomly();
}

function stopTalking() {
    clearInterval(talkingInterval);
    talkingInterval = null;
    queenie.src=neutral;
}

function textAppear(text, callback) {
    let i = 0;
    guideText.textContent = "";
    typing = true;
    talk();
    typingInterval = setInterval(() => {
        guideText.textContent += text[i];
        i++;
        if (i>=text.length){
            clearInterval(typingInterval);
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

function blinkRandomly(){
    function blinkCycle(){
        const delay = 3500 + Math.random()*3500;
        setTimeout(() => {
            if(!talkingInterval && !typing){
                queenie.src=blinking;
                setTimeout(()=> {
                    queenie.src= neutral;
                    blinkCycle();
                }, 150);
            } else{
                blinkCycle();
            }
        }, delay);
    }
    blinkCycle();
}
function dialogueSetup(){
    const currentPath = window.location.pathname;
    if(currentPath.includes("whitespace")){
        dialogues = ["Clean up time? Yes! Make the text ~bonito~", "Those sneaky double spaces... make text not neat!", "Can you  spot a double space?"];
    }
    else if(currentPath.includes("preview-html")){
        dialogues = ["Preview is a good way to check for code correctness!", "Ooh, got some code to show off? :)"];
    }
    else if(currentPath.includes("json-formatter")){
        dialogues = ["JSON: a beautiful format of simplicity and flexibility!", "Want to check your JSON's validity? We can also make it pretty!"];
    }
    else if(currentPath.includes("timer")){
        dialogues = ["Time is precious...that's why we gotta track it!", "I wonder if anyone ever tried using a sundial as a timer..."];
    }
    else if(currentPath.includes("pomodoro")){
        dialogues = ["Alright, time to focus!", "Ahem, don't get distracted... I'm watching! O_O"];
    }
    else if(currentPath.includes("coin")){
        dialogues = ["I choose heads!", "I choose tails!", "Uhh...two options? That's a tough one!", "I'm not feeling lucky today... why don't you flip it for me?"];
    }
    else if(currentPath.includes("flashcards")){
        dialogues = ["Study time! I can make you some company :)", "You better not skip out on these..."];
    }
    else if(currentPath.includes("qrCode")){
        dialogues = ["QR codes? I know you can make it look cool!", "Let's make some fancy QR codes~"];
    }
    else if(currentPath.includes("banner")){
        dialogues = ["You gotta make it memorable! Or not...", "Hmm...wanna make a banner for GitHub? Or a band? Or for me? :D"];
    }
    else{
        if(!localStorage.getItem("visitedBefore")){
            dialogues = ["Hi! Welcome to KITools.", "Pick something from the tools in the sidebar!"];
            localStorage.setItem("visitedBefore", "true");
        } else{
            dialogues = ["Welcome back! :D", "What shall we do today?"];
        }
    }
    nextDialogue();
} 
function clickSetup(){
    textbox.addEventListener("click", () =>{
        if(typing){
            clearInterval(typingInterval);
            guideText.textContent = dialogues[Math.max(0,currentDialogue -1)];
            stopTalking();
            typing=false;
        } else{
            nextDialogue();
        }
    });
}