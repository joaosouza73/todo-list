const input = document.getElementById("taskInput");
const button = document.getElementById("addTaskBtn");
const list = document.getElementById("taskList");
const completedBtn = document.getElementById("completedTasksBtn");

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
    });


    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    
    list.appendChild(li);

    input.value = "";

});

//concluir tarefas
completedBtn.addEventListener("click", function(){

    const task = document.querySelectorAll("#taskList li");
    task.forEach(function(task){
        const checkbox = task.querySelector("input");

        if(checkbox.checked){
            task.remove();
        }
    });
});