import { state, saveTodos, saveFilter } from "./state.js";
import { renderTodos } from "./ui.js";

// DOM
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const filters = document.querySelectorAll(".filter");
const clearCompletedBtn = document.getElementById("clear-completed");

// ADD TODO
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const text = input.value.trim();
    if (!text) return;

    state.todos.push({
        id: Date.now(),
        text,
        completed: false,
        createdAt: new Date().toISOString()
    });

    input.value = "";
    saveTodos();
    renderTodos();
});

// FILTERS
filters.forEach(btn => {
    btn.addEventListener("click", () => {
        filters.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        state.filter = btn.dataset.filter;
        saveFilter();
        renderTodos();
    });
});

// CLEAR COMPLETED
clearCompletedBtn.addEventListener("click", () => {
    state.todos = state.todos.filter(todo => !todo.completed);
    saveTodos();
    renderTodos();
});

// INIT
renderTodos();