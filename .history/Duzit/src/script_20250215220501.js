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
    todoInput.value = ""; //clears the input field
  }
}
