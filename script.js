const input = document.getElementById("taskInput");
const button = document.getElementById("addTaskBtn");
const list = document.getElementById("taskList");

input.addEventListener("keypress", function(e){

    if(e.key === "Enter"){
        button.click();
    }
});

button.addEventListener("click", function () {

    const taskText = input.value.trim();

    if(taskText === "")return;

    const li = document.createElement("li");

    li.textContent = taskText;

    li.addEventListener("click", function (){
        li.classList.toggle("completed");
    });

    //botao de remover tarefas
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Remover";

    deleteBtn.addEventListener("click", function(e){
        e.stopPropagation(); // evita marcar como concluída
        li.remove();
    });

    li.appendChild(deleteBtn);
    
    list.appendChild(li);

    input.value = "";

});