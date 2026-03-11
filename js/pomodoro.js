let timerDisplay = document.getElementById("pomodoroTimer");
let startBtn = document.getElementById("pomodoroStart");
let pauseBtn = document.getElementById(("pomodoroPause"));
let resetBtn = document.getElementById("pomodoroReset");
let time = 1500;
let timer = null;
let workBtn = document.getElementById("work");
let breakBtn = document.getElementById("break");
function updateDisplay(){
    let minutes = Math.floor(time/60);
    let seconds = time % 60;
    seconds = seconds < 10?"0" + seconds: seconds;
    timerDisplay.textContent = minutes +":" + seconds;
}

function startTime(){
    if(timer!=null){
        return;
    }
    timer = setInterval(() => {
        time--;
        updateDisplay();
        if(time<=0){
            clearInterval(timer);
            timer = null;
            alert("Timer over!");
        }
    }, 1000);
}
startBtn.addEventListener("click", startTime);

function pauseTime(){
    clearInterval(timer);
    timer=null;
}
pauseBtn.addEventListener("click", pauseTime);

function resetTime(){
    pauseTime();
    time=1500;
    updateDisplay();
}
resetBtn.addEventListener("click", resetTime);

function startWork(){
    pauseTime();
    time=1500;
    updateDisplay();
}
function startBreak(){
    pauseTime();
    time=300;
    updateDisplay();
}
workBtn.addEventListener("click", startWork);
breakBtn.addEventListener("click", startBreak);
updateDisplay();
