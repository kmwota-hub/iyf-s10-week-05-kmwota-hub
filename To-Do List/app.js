// DOM
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const filters = document.querySelectorAll(".filter");

const totalCount = document.getElementById("total-count");
const activeCount = document.getElementById("active-count");
const completedCount = document.getElementById("completed-count");
const itemsLeft = document.getElementById("items-left");
const clearCompletedBtn = document.getElementById("clear-completed");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";

// local storage
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function createTodoElement(todo, index) {
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

    // animation
    li.style.opacity = "0";
    li.style.transform = "translateY(10px)";
    setTimeout(() => {
        li.style.transition = "all 0.3s ease";
        li.style.opacity = "1";
        li.style.transform = "translateY(0)";
    }, 10);

    // checkbox
    const checkbox = li.querySelector("input");
    checkbox.addEventListener("change", () => {
        todos[index].completed = checkbox.checked;
        saveTodos();
        renderTodos();
    });

    // delete
    const deleteBtn = li.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
        // exit animation
        li.style.transition = "all 0.3s ease";
        li.style.opacity = "0";
        li.style.transform = "translateX(20px)";
        
        setTimeout(() => {
            todos.splice(index, 1);
            saveTodos();
            renderTodos();
        }, 300);
    });

    return li;
}

// render
function renderTodos() {
    list.innerHTML = "";

    let filtered = todos.filter(todo => {
        if (currentFilter === "active") return !todo.completed;
        if (currentFilter === "completed") return todo.completed;
        return true;
    });

    filtered.forEach((todo, index) => {
        list.appendChild(createTodoElement(todo, index));
    });

    updateStats();
}

// stats
function updateStats() {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const active = total - completed;

    totalCount.textContent = total;
    activeCount.textContent = active;
    completedCount.textContent = completed;
    itemsLeft.textContent = `${active} items left`;
}

// add todo
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const text = input.value.trim();
    if (!text) return;

    todos.push({
        text,
        completed: false
    });

    input.value = "";
    saveTodos();
    renderTodos();
});

// filters
filters.forEach(btn => {
    btn.addEventListener("click", () => {
        filters.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        currentFilter = btn.dataset.filter;
        renderTodos();
    });
});

// clear completed
clearCompletedBtn.addEventListener("click", () => {
    todos = todos.filter(todo => !todo.completed);
    saveTodos();
    renderTodos();
});

// init
renderTodos();