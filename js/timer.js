let countdown;
let allSeconds=0;
let seconds=0;
let running=false;
const setTime=document.getElementById("setTime");
const timeCircle = document.getElementById("timeCircle");
const display = document.getElementById("display");
let hrArea=0;
let minArea= 0;
let secArea=0;
const hrInput=document.getElementById("hrInput");
const minInput=document.getElementById("minInput");
const secInput=document.getElementById("secInput");
const startTimeBtn = document.getElementById("startTimeBtn");
const pauseTimeBtn = document.getElementById("pauseTimeBtn");
const resetTimeBtn = document.getElementById("resetTimeBtn");
const continueToTimerBtn = document.getElementById("continueToTimerBtn");
const progressCirc=document.getElementById("progressCirc");
const circleLength = 2*Math.PI*100;

progressCirc.style.strokeDashArray=circleLength;
progressCirc.style.strokeDashoffset=0;

function timeInputUpdate(){
    hrInput.textContent = String(hrArea).padStart(2,"0");
    minInput.textContent = String(minArea).padStart(2,"0");
    secInput.textContent = String(secArea).padStart(2,"0");
}
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
    hrArea=0;
    minArea=0;
    secArea=0;
    timeInputUpdate();
    updateDisplay(0);
    timeCircle.style.display="none";
    setTime.style.display="block";
});

continueToTimerBtn.addEventListener("click", ()=> {
    seconds = hrArea*3600+minArea *60 +secArea;
    if (seconds<=0) return;
    allSeconds = seconds;
    updateDisplay(seconds);
    progressCirc.style.strokeDashoffset=0;
    setTime.style.display = "none";
    timeCircle.style.display = "block";
});

document.querySelectorAll(".timeArrow").forEach(btn => {
    btn.addEventListener("click", () =>{
        const target = btn.dataset.target;
        const right = btn.classList.contains("right");
        if(target === "hours"){
            hrArea = right?(hrArea+1) %24:(hrArea-1+24)%24;
        }
        if(target === "minutes"){
            minArea = right?(minArea+1)%60 :(minArea-1+60)%60;
        }
        if(target==="seconds"){
            secArea = right?(secArea+1)%60:(secArea-1+60)%60;
        }
        timeInputUpdate();
    });
});
timeInputUpdate();