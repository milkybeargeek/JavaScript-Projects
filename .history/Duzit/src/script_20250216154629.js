const todoForm = document.querySelector("form"); // form
const todoInput = document.getElementById("todo-input"); // input
const todoItemsList = document.getElementById("todo-list"); // ul

let allTodos = getTodos(); // Get stored todos
updateTodoList(); // Update UI initially

todoForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevents page from reloading
  addTodo();
});

function addTodo() {
  const todoText = todoInput.value.trim(); // Get input value
  if (todoText.length > 0) {
    const todoObject = {
      text: todoText,
      completed: false,
    };
    allTodos.push(todoObject); // Add new todo
    saveTodos();
    updateTodoList(); // Refresh list
    todoInput.value = ""; // Clear input field
  }
}

function updateTodoList() {
  todoItemsList.innerHTML = ""; // Clear list before re-rendering
  allTodos.forEach((todo, todoIndex) => {
    const todoItem = createTodoItem(todo, todoIndex);
    todoItemsList.append(todoItem);
  });
}

function createTodoItem(todo, todoIndex) {
  const todoId = "todo-" + todoIndex;
  const todoLI = document.createElement("li"); // Create new list item
  todoLI.className = "todo-item"; // Set class

  todoLI.innerHTML = `
    <input class="hidden" type="checkbox" id="${todoId}">
    <label class="custom-checkbox" for="${todoId}">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
        </svg>
    </label>
    <label for="${todoId}" class="todo-text">${todo.text}</label>
    <button class="delete-todo">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M5.755 20.283 4 8h16l-1.755 12.283A2 2 0 0 1 16.265 22h-8.53a2 2 0 0 1-1.98-1.717zM21 4h-5V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v1H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2z" />
        </svg>
    </button>
  `;

  const deleteButton = todoLI.querySelector(".delete-todo");
  deleteButton.addEventListener("click", function () {
    deleteTodoItem(todoIndex);
  });

  const checkbox = todoLI.querySelector("input");
  checkbox.addEventListener("change", () => {
    allTodos[todoIndex].completed = checkbox.checked;
    saveTodos();
  });
  checkbox.checked = todo.completed;

  return todoLI;
}

function deleteTodoItem(todoIndex) {
  allTodos = allTodos.filter((_, index) => index !== todoIndex);
  saveTodos();
  updateTodoList();
}

function saveTodos() {
  localStorage.setItem("todo", JSON.stringify(allTodos));
}

function getTodos() {
  const todos = localStorage.getItem("todo");
  return todos ? JSON.parse(todos) : [];
}
