let tasks;
let savedTasks = localStorage.getItem("tasks");
if(savedTasks !==null){
    tasks = JSON.parse(savedTasks);
} else{
    tasks = [];
}

function saveTasks(){
    let stringTasks = JSON.stringify(tasks);
    localStorage.setItem("tasks", stringTasks);
}

function createTasks(){
    let tbody = document.querySelector("#todo-list-table tbody");
    tbody.innerHTML = "";
    for(let i=0; i<tasks.length; i++){
        let task = tasks[i];
        let row=document.createElement("tr");
        if(task.done === true){
            row.classList.add("completed");
        }
        let isChecked = "";
        if(task.done === true){
            isChecked = "checked";
        }
        row.innerHTML = `
            <td><input type="checkbox" ${isChecked}></td>
            <td>${task.text}</td>
            <td>${task.date}</td>
            <td>${task.time}</td>
            <td><button class="task-delete-btn">X</button></td>
        `;
        let checkbox = row.querySelector("input");
        checkbox.addEventListener("click", function(){
            toggleTask(i);
        });
        let deleteTaskBtn = row.querySelector("button");
        deleteTaskBtn.addEventListener("click", function(){
            deleteTask(i);
        });
        tbody.appendChild(row);
    }
}

function addTask(){
    let taskInput = document.getElementById("taskInput").value;
    let dateInput = document.getElementById("taskDateInput").value;
    let timeInput = document.getElementById("taskTimeInput").value;
    if(taskInput === ""){
        return;
    }
    let task = {
        text: taskInput,
        date: dateInput,
        time: timeInput,
        done: false
    };
    tasks.push(task);
    saveTasks();
    createTasks();
    document.getElementById("taskInput").value = "";
}
document.querySelector(".todo-list button").addEventListener("click", addTask);
function toggleTask(index){
    if(tasks[index].done === true){
        tasks[index].done = false;
    } else{
        tasks[index].done = true;
    }
    saveTasks();
    createTasks();
}

function deleteTask(index){
    tasks.splice(index,1);
    saveTasks();
    createTasks();
}
createTasks();