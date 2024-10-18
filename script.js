let todoItems=document.getElementById("todoItems");
let addButton=document.getElementById("addButton");
let saveButton=document.getElementById("saveButton");
function todoListFromLocalStorage() {
    let stringifiedList = localStorage.getItem("todoList");
    let parsedList = JSON.parse(stringifiedList);
    if (parsedList === null) {
      return [];
    } else {
      return parsedList;
    }
  }
  
  let todoList = todoListFromLocalStorage();
  let todosCount=todoList.length;
  saveButton.onclick = function () {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  };
    function onChange(checkboxId,labelId){
        let checkEl=document.getElementById(checkboxId);
        console.log(checkEl.status);
        let labelElement=document.getElementById(labelId);
        labelElement.classList.toggle("status")
    }
    function deleteTodo(todoId){
        let todoEl=document.getElementById(todoId);
        todoItems.removeChild(todoEl);
    }

    function createTodo(todo){
        let todoId="todo"+todo.uniqueNo;
        let checkboxId="checkbox"+todo.uniqueNo;
        let labelId="label"+todo.uniqueNo;
        let todosEl=document.createElement("li");
        todosEl.id=todoId;
        todosEl.classList.add("list-container","d-flex","flex-row");
        todoItems.appendChild(todosEl);

        let inputEl=document.createElement("input");
        inputEl.type="checkbox";
        inputEl.id=checkboxId;
        inputEl.classList.add("checkbox-item");
        inputEl.onclick=function(){
            onChange(checkboxId,labelId);
        }
        todosEl.appendChild(inputEl);

        let labelEl=document.createElement("div");
        labelEl.classList.add("label-container","d-flex","flex-row");
        todosEl.appendChild(labelEl);

        let labelContainerEl=document.createElement("label");
        labelContainerEl.setAttribute("for",checkboxId);
        labelContainerEl.classList.add("label-item");
        labelContainerEl.id=labelId;
        labelContainerEl.textContent=todo.text;
        labelEl.appendChild(labelContainerEl);

        let deleteContainer=document.createElement("div");
        deleteContainer.classList.add("delete-items");
        labelEl.appendChild(deleteContainer);

        let deleteEl=document.createElement("i");
        deleteEl.classList.add("fa-solid","fa-trash","icon");
        deleteEl.onclick=function(){
            deleteTodo(todoId);
        }
        deleteContainer.appendChild(deleteEl);
    }
    for(let todo of todoList){
        createTodo(todo);
    }  
    function onAdd() {
        let userElement = document.getElementById("todoInput");
        let userValue = userElement.value;
      
        if(userValue === ""){
          alert("Enter a Valid Text");
          return;
        }
      
        todosCount = todosCount + 1;
      
        let newTodo = {
          text: userValue,
          uniqueNo: todosCount
        };
        todoList.push(newTodo); 
        createTodo(newTodo);
        userElement.value = "";
      }
      
      addButton.onclick = function(){
        onAdd();
      }      

