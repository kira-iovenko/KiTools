const queenie = document.getElementById("queenie_sprite");
const guideText = document.getElementById("guideText");
const talking = "images/queenie_talking.png";
const neutral = "images/queenie_neutral.png";

let talkingInterval;
function talk() {
    talkingInterval = setInterval(() => {
        queenie.src = queenie.src.includes("neutral")?talking: neutral;
    }, 140);
}
function stopTalking() {
    clearInterval(talkingInterval);
    queenie.src = neutral;
}
const text = "welcome to KITools! woof woof bark bark!";
let i = 0;
function textAppear() {
    if(i===0){
        talk();
    }
    if(i<text.length){
        guideText.textContent += text[i];
        i++;
        setTimeout(textAppear, 40);
    } else {
        stopTalking();
    }
}
textAppear();