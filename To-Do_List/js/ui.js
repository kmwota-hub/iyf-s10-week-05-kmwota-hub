import { state, saveTodos } from "./state.js";

// DOM
const list = document.getElementById("todo-list");
const totalCount = document.getElementById("total-count");
const activeCount = document.getElementById("active-count");
const completedCount = document.getElementById("completed-count");
const itemsLeft = document.getElementById("items-left");

// CREATE ELEMENT
export function createTodoElement(todo) {
    const li = document.createElement("li");
    li.className = "todo-item";
    if (todo.completed) li.classList.add("completed");

    li.innerHTML = `
        <div class="todo-left">
            <input type="checkbox" ${todo.completed ? "checked" : ""}>
            <span class="todo-text">${todo.text}</span>
        </div>
        <button class="delete-btn">✕</button>
    `;

    const checkbox = li.querySelector("input");
    const deleteBtn = li.querySelector(".delete-btn");

    checkbox.addEventListener("change", () => {
        const realTodo = state.todos.find(t => t.id === todo.id);
        realTodo.completed = checkbox.checked;
        saveTodos();
        renderTodos();
    });

    deleteBtn.addEventListener("click", () => {
        state.todos = state.todos.filter(t => t.id !== todo.id);
        saveTodos();
        renderTodos();
    });

    return li;
}

// RENDER
export function renderTodos() {
    list.innerHTML = "";

    const filtered = state.todos.filter(todo => {
        if (state.filter === "active") return !todo.completed;
        if (state.filter === "completed") return todo.completed;
        return true;
    });

    if (filtered.length === 0) {
        list.innerHTML = "<p class='empty'>No tasks found</p>";
        return;
    }

    filtered.forEach(todo => {
        list.appendChild(createTodoElement(todo));
    });

    updateStats();
}

// STATS
function updateStats() {
    const total = state.todos.length;
    const completed = state.todos.filter(t => t.completed).length;
    const active = total - completed;

    totalCount.textContent = total;
    activeCount.textContent = active;
    completedCount.textContent = completed;
    itemsLeft.textContent = `${active} items left`;
}