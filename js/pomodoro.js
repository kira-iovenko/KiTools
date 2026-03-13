let timerDisplay = document.getElementById("pomodoroTimer");
let startBtn = document.getElementById("pomodoroStart");
let pauseBtn = document.getElementById(("pomodoroPause"));
let resetBtn = document.getElementById("pomodoroReset");
let time = 1500;
let timer = null;
const alarm = new Audio("../sounds/timer-alarm.mp3");
let workBtn = document.getElementById("work");
let breakBtn = document.getElementById("break");
function updateDisplay(){
    let minutes = Math.floor(Math.max(time,0)/60);
    let seconds = Math.max(time,0) % 60;
    seconds = seconds < 10?"0" + seconds: seconds;
    timerDisplay.textContent = minutes +":" + seconds;
}
function stopAlarm(){
    alarm.pause();
    alarm.currentTime = 0;
}

function startTime(){
    stopAlarm();
    if(timer!=null){
        return;
    }
    timer = setInterval(() => {
        if(time<=0){
            clearInterval(timer);
            timer = null;
            alarm.loop = true;
            alarm.play();
            timerDisplay.textContent = "Time's up!";
            timerDisplay.classList.add("timer-done");
        }
        time--;
        updateDisplay();
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
    stopAlarm();
    time=1500;
    updateDisplay();
    timerDisplay.classList.remove("timer-done");
}
resetBtn.addEventListener("click", resetTime);

function startWork(){
    pauseTime();
    stopAlarm();
    time=1500;
    updateDisplay();
    timerDisplay.classList.remove("timer-done");
}
function startBreak(){
    pauseTime();
    stopAlarm();
    time=300;
    updateDisplay();
    timerDisplay.classList.remove("timer-done");
}
workBtn.addEventListener("click", startWork);
breakBtn.addEventListener("click", startBreak);
updateDisplay();
