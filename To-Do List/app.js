// DOM Elements
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");
const filters = document.querySelectorAll(".filter");
const clearCompletedBtn = document.getElementById("clear-completed");

// State
let todos = [];
let currentFilter = "all";

// Functions
function createTodoElement(todo) {
    const li = document.createElement("li");
    li.dataset.id = todo.id;
    li.className = todo.completed ? "completed" : "";

    const span = document.createElement("span");
    span.textContent = todo.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "×";
    deleteBtn.className = "delete";

    li.appendChild(span);
    li.appendChild(deleteBtn);

    // Bonus: edit on double‑click
    span.addEventListener("dblclick", () => editTodo(todo.id, span));

    return li;
}

function renderTodos() {
    todoList.innerHTML = "";

    let filtered = todos;
    if (currentFilter === "active") {
        filtered = todos.filter(t => !t.completed);
    } else if (currentFilter === "completed") {
        filtered = todos.filter(t => t.completed);
    }

    filtered.forEach(todo => {
        const li = createTodoElement(todo);
        todoList.appendChild(li);
    });

    updateStats();
}

function addTodo(text) {
    const newTodo = {
        id: Date.now().toString(),
        text,
        completed: false
    };
    todos.push(newTodo);
    renderTodos();
}

function toggleTodo(id) {
    todos = todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    renderTodos();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

function updateStats() {
    const activeCount = todos.filter(t => !t.completed).length;
    itemsLeft.textContent = `${activeCount} item${activeCount !== 1 ? "s" : ""} left`;
}

function filterTodos(filter) {
    currentFilter = filter;
    filters.forEach(btn => btn.classList.remove("active"));
    document.querySelector(`[data-filter="${filter}"]`).classList.add("active");
    renderTodos();
}

function clearCompleted() {
    todos = todos.filter(t => !t.completed);
    renderTodos();
}

function editTodo(id, span) {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    const inputEdit = document.createElement("input");
    inputEdit.type = "text";
    inputEdit.value = todo.text;
    span.replaceWith(inputEdit);
    inputEdit.focus();

    inputEdit.addEventListener("keydown", e => {
        if (e.key === "Enter") {
            todo.text = inputEdit.value.trim() || todo.text;
            renderTodos();
        } else if (e.key === "Escape") {
            renderTodos();
        }
    });

    inputEdit.addEventListener("blur", () => renderTodos());
}

// Event Listeners
form.addEventListener("submit", function(event) {
    event.preventDefault();
    const text = input.value.trim();
    if (text) {
        addTodo(text);
        input.value = "";
    }
});

todoList.addEventListener("click", function(event) {
    const li = event.target.closest("li");
    if (!li) return;
    const id = li.dataset.id;

    if (event.target.classList.contains("delete")) {
        deleteTodo(id);
    } else if (event.target.tagName === "SPAN") {
        toggleTodo(id);
    }
});

filters.forEach(btn => {
    btn.addEventListener("click", () => filterTodos(btn.dataset.filter));
});

clearCompletedBtn.addEventListener("click", clearCompleted);

// Initialize
renderTodos();
