let countdown;
let allSeconds=0;
let seconds=0;
let running=false;
const setTime=document.getElementById("setTime");
const timeCircle = document.getElementById("timeCircle");
const display = document.getElementById("display");
const hourInput = document.getElementById("hours");
const minuteInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");
const startTimeBtn = document.getElementById("startTimeBtn");
const pauseTimeBtn = document.getElementById("pauseTimeBtn");
const resetTimeBtn = document.getElementById("resetTimeBtn");
const continueToTimerBtn = document.getElementById("continueToTimerBtn");
const progressCirc=document.getElementById("progressCirc");
const circleLength = 2*Math.PI*100;

progressCirc.style.strokeDashArray=circleLength;
progressCirc.style.strokeDashoffset=0;
function updateDisplay(seconds){
    let hrs = Math.floor(seconds/3600);
    let mins = Math.floor((seconds%3600) / 60);
    let secs = seconds % 60;
    display.textContent = String(hrs).padStart(2, "0") + ":" + String(mins).padStart(2,"0")+ ":"+ String(secs).padStart(2,"0");
}
startTimeBtn.addEventListener("click", () => {
    if(running) return;
    running=true;
    countdown = setInterval(() => {
        if(seconds <=0){
            clearInterval(countdown);
            running=false;
            alert("Timer over!");
            return;
        }
        seconds--;
        updateDisplay(seconds);
        const progression = seconds/allSeconds;
        const offset = circleLength * (1-progression);
        progressCirc.style.strokeDashoffset = offset;
    }, 1000);
});

pauseTimeBtn.addEventListener("click", () => {
    clearInterval(countdown);
    running=false;
});

resetTimeBtn.addEventListener("click", () => {
    clearInterval(countdown);
    seconds=0;
    running=false;
    hourInput.value="";
    minuteInput.value="";
    secondsInput.value="";
    updateDisplay(0);
    timeCircle.style.display="none";
    setTime.style.display="block";
});

continueToTimerBtn.addEventListener("click", ()=> {
    seconds = (parseInt(hourInput.value)||0)*3600+(parseInt(minuteInput.value)||0)*60+(parseInt(secondsInput.value)||0);
    if (seconds<=0) return;
    allSeconds = seconds;
    updateDisplay(seconds);
    progressCirc.style.strokeDashoffset=0;
    setTime.style.display = "none";
    timeCircle.style.display = "block";
});