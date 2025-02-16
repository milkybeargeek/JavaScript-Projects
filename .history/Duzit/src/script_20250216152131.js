const todoForm = document.querySelector("form"); //form
const todoInput = document.getElementById("todo-input"); //input
const todoItemsList = document.getElementById("todo-list"); //ul

let allTodos = []; //array to store all todos

todoForm.addEventListener("submit", function (event) {
  event.preventDefault(); //prevents page from reloading
  addTodo();
});

function addTodo() {
  const todoText = todoInput.value.trim(); //this variable stores the value of the input field
  if (todoText.length > 0) {
    allTodos.push(todoText); //pushes the value of the input field to the array
    createTodoItem(todoText); //calls the function to create the todo item
    todoInput.value = ""; //clears the input field
  }
}

function updateTodoList() {
  todoItemsList.innerHTML = ""; //clears the unordered list
  allTodos.forEach((todo, todoIndex) => {
    //loops through the array
    todoItem = createTodoItem(todo, todo); //calls the function to create the todo item
  });
}
function createTodoItem(todo) {
  const todoLI = document.createElement("li"); //creates a new list item
  todoLI.innerText = todo; //sets the text of the list item to the value of the input field
  return todoLI;
}
