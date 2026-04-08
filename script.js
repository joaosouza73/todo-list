const input = document.getElementById("taskInput");
const button = document.getElementById("addTaskBtn");
const list = document.getElementById("todoList");
const startBtn = document.getElementById("startTaskBtn");
const finishBtn = document.getElementById("finishTaskBtn");
const doingList = document.getElementById("doingList");
const weekList = document.getElementById("weekTasks");

input.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        button.click();
    }
});

button.addEventListener("click", function () {

    const taskText = input.value.trim();
    if(taskText === "")return;

    const li = document.createElement("li");

    //checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    // texto da tarefa
    const span = document.createElement("span");
    span.textContent = taskText;

    //botao de remover tarefas
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Remover";

    deleteBtn.addEventListener("click", function(e){
        e.stopPropagation(); // evita marcar como concluída
        li.remove();
        saveTasks();
    });


    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    
    list.appendChild(li);
    saveTasks();

    input.value = "";

});

// iniciar tarefas
startBtn.addEventListener("click", function(){

    const tasks = document.querySelectorAll("#todoList li");

    tasks.forEach(function(task){

        const checkbox = task.querySelector("input");

        if(checkbox.checked){

            // move direto para "Fazendo"
           task.classList.add("moving");

            setTimeout(() => {
                doingList.appendChild(task);
                task.classList.remove("moving");
                checkbox.checked = false;
                saveTasks();
            }, 200);
        }
    });

});

finishBtn.addEventListener("click", function(){

    const tasks = document.querySelectorAll("#todoList li, #doingList li");

    tasks.forEach(function(task){

        const checkbox = task.querySelector("input");

        if(checkbox.checked){

            task.classList.add("moving");

            setTimeout(() => {
                weekList.appendChild(task);
                task.classList.remove("moving");
                checkbox.checked = false;
                saveTasks();
            }, 200);
        }
    });

});

function saveTasks(){

    const todo = [];
    const doing = [];
    const done = [];

    document.querySelectorAll("#todoList li span").forEach(el => {
        todo.push(el.textContent);
    });

    document.querySelectorAll("#doingList li span").forEach(el => {
        doing.push(el.textContent);
    });

    document.querySelectorAll("#weekTasks li span").forEach(el => {
        done.push(el.textContent);
    });

    localStorage.setItem("todoList", JSON.stringify(todo));
    localStorage.setItem("doingList", JSON.stringify(doing));
    localStorage.setItem("weekTasks", JSON.stringify(done));
}
function loadTasks(){

    const todo = JSON.parse(localStorage.getItem("todoList")) || [];
    const doing = JSON.parse(localStorage.getItem("doingList")) || [];
    const done = JSON.parse(localStorage.getItem("weekTasks")) || [];

    function createTask(text, list){

        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        const span = document.createElement("span");
        span.textContent = text;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Remover";

        deleteBtn.addEventListener("click", function(e){
            e.stopPropagation();
            li.remove();
            saveTasks(); // 🔥 importante
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        list.appendChild(li);
    }

    todo.forEach(text => createTask(text, list));
    doing.forEach(text => createTask(text, doingList));
    done.forEach(text => createTask(text, weekList));
}

// 🔥 executa quando abre a página
loadTasks();

