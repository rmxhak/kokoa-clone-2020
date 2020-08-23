const toDoForm = document.querySelector(".js-toDoForm"),
       toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LI = 'todos';

let array = [];

function saveToDo(){
    localStorage.setItem(TODOS_LI, JSON.stringify(array))
}

function delteToDo(e){
    const btn = e.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const PP = array.filter(function(todo){
        return todo.id !== parseInt(li.id)
    })
    array = PP;
    saveToDo();
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = array.length + 1;
    li.id = newId;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", delteToDo)
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    toDoList.appendChild(li);
    const toDoObj = {
        id: newId,
        text: text
    };
    array.push(toDoObj);
    saveToDo();
}

function succes() {
    for(let i=0; i < array.length; i++){
       
        array[i].id = i + 1 ;
    }
}

function handleSubmit(e) {
    e.preventDefault();
    succes();
    if(toDoInput.value !== ""){

        const currentValue = toDoInput.value;
        paintToDo(currentValue);
        toDoInput.value = "";
    }
}


function loadToDo(){
    const loadedToDo = localStorage.getItem(TODOS_LI);
    if(loadedToDo !== null){
        const parseToDo = JSON.parse(loadedToDo)
        parseToDo.forEach(function(todo){
            paintToDo(todo.text)
        })
    }
}


function init(){
    loadToDo();
    toDoForm.addEventListener("submit", handleSubmit)
}


init();



    