const todoForm = document.querySelector("form"); //form
const todoInput = document.getElementById("todo-input"); //input
const todoItemsList = document.getElementById("todo-list"); //ul

let allTodos = getTodos(); //array to store all todos
updateTodoList(); //calls the function to update the unordered list

todoForm.addEventListener("submit", function (event) {
  event.preventDefault(); //prevents page from reloading
  addTodo();
});

function addTodo() {
  const todoText = todoInput.value.trim(); //this variable stores the value of the input field
  if (todoText.length > 0) {
    allTodos.push(todoText); //pushes the value of the input field to the array
    updateTodoList(); //calls the function to update the unordered
    saveTodos();
    todoInput.value = ""; //clears the input field
  }
}

function updateTodoList() {
  todoItemsList.innerHTML = ""; //clears the unordered list
  allTodos.forEach((todo, todoIndex) => {
    //loops through the array
    todoItem = createTodoItem(todo, todo); //calls the function to create the todo item
    todoItemsList.append(todoItem); //appends the todo item to the unordered list
  });
}
function createTodoItem(todo, todoIndex) {
  const todoId = "todo-" + todoIndex;
  const todoLI = document.createElement("li"); //creates a new list item
  todoLI.className = todo; //sets the text of the list item to the value of the input field
  todoLI.innerHTML = `<input class="hidden" type="checkbox" id="${todoId}">
                <label class="custom-checkbox" for="${todoId}">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                        fill="#e8eaed">
                        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                    </svg>
                </label>
                <label for="${todoId}" class="todo-text">
                ${todo} //sets the innerHTML of the list item
                </label>
                <button class="delete-todo">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                            d="M5.755 20.283 4 8h16l-1.755 12.283A2 2 0 0 1 16.265 22h-8.53a2 2 0 0 1-1.98-1.717zM21 4h-5V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v1H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2z" />
                    </svg>
                </button>`; //sets the innerHTML of the list item

  const deleteButton = todoLI.querySelector(".delete-todo"); //selects the delete button
  deleteButton.addEventListener("click", function () {
    deleteTodoItem(todoIndex); //calls the function to delete the todo item
  });
  return todoLI;
}
function deleteTodoItem(todoIndex) {
  allTodos.splice(todoIndex, 1); //deletes the todo item from the array
  updateTodoList(); //calls the function to update the unordered list
  saveTodos();
}
function saveTodos() {
  localStorage.setItem("todo", JSON.stringify(allTodos)); //saves the array to local storage
}

function getTodos() {
  const todos = localStorage.getItem("todo"); //gets the array from local storage
  if (todos) {
    allTodos = JSON.parse(todos);
    updateTodoList();
  }
}
