//  9.1: Selecting Elements 
// // 1. The h1 element
const heading = document.querySelector("h1");
console.log("h1 element:", heading);

// 2. All elements with class "content"
const contentParagraphs = document.getElementsByClassName("content");
console.log("All .content elements:", contentParagraphs);

// 3. The form with id "contact-form"
const form = document.getElementById("contact-form");
console.log("Form with id contact-form:", form);

// 4. The email input
const emailInput = document.querySelector("#email");
console.log("Email input:", emailInput);

// 5. All list items in the nav
const navItems = document.querySelectorAll("nav ul li");
console.log("All nav list items:", navItems);

// 6. The first .nav-link
const firstNavLink = document.querySelector(".nav-link");
console.log("First .nav-link:", firstNavLink);

// 7. The last paragraph
const allParagraphs = document.querySelectorAll("p");
const lastParagraph = allParagraphs[allParagraphs.length - 1];
console.log("Last paragraph:", lastParagraph);

// 9.2 Task
// Select the header, then navigate to the nav inside it
const header = document.querySelector("header");
const navInsideHeader = header.querySelector("nav");
console.log("Nav inside header:", navInsideHeader);

// Select the first nav-link, then get its parent li
const FirstNavLink = document.querySelector(".nav-link");
const parentLi = FirstNavLink.parentElement;
console.log("Parent li of first nav-link:", parentLi);

// Select the article, then get its next sibling (section)
const Article = document.querySelector("article");
const nextSiblingSection = Article.nextElementSibling;
console.log("Next sibling of article:", nextSiblingSection);

// Select the ul, then get all its child li elements
const navList = document.querySelector("nav ul");
const navListItems = navList.children;
console.log("Child li elements of ul:", navListItems);

// Start from the footer and navigate up to the body
const Footer = document.querySelector("footer");
const footerParent = Footer.parentElement; // should be body
console.log("Footer's parent (body):", footerParent);


// 9.3: Modifying Content
const h1 = document.querySelector("h1");

// Reading text
console.log("textContent:", h1.textContent);   // Includes hidden text
console.log("innerText:", h1.innerText);       // Only visible text

// Modifying text
h1.textContent = "New Title";   // Changes the heading

const article = document.querySelector("article");

// Reading HTML
console.log("innerHTML:", article.innerHTML);

// Modifying HTML (⚠️ careful with security!)
article.innerHTML = `
    <h2>Updated Article</h2>
    <p>This is new content.</p>
`;

// Safer: textContent (escapes HTML)
const userInput = "<script>alert('hack!')</script>";
article.textContent = userInput;  // Displays as text, not executed

const link = document.querySelector(".nav-link");

// Get attribute
console.log("getAttribute href:", link.getAttribute("href"));
console.log("property href:", link.href);

// Set attribute
link.setAttribute("href", "https://example.com");
link.href = "https://example.com";  // Same result

// Check attribute
console.log("Has target attribute?", link.hasAttribute("target"));

// Remove attribute
link.removeAttribute("target");

// Data attributes example
// Suppose you add: <div data-id="123" data-category="tech"></div>
const element = document.querySelector("[data-id]");
console.log("data-id:", element.dataset.id);
console.log("data-category:", element.dataset.category);

// Add new data attribute
element.dataset.newAttr = "value";
console.log("data-new-attr:", element.dataset.newAttr);

const container = document.querySelector(".container");

// Inline styles
container.style.backgroundColor = "#f0f0f0";
container.style.padding = "30px";
container.style.borderRadius = "8px";

// Multiple styles at once
Object.assign(container.style, {
    backgroundColor: "#333",
    color: "white",
    padding: "20px"
});

// 9.4: Adding & Removing Elements
// Create new element
const newParagraph = document.createElement("p");
newParagraph.textContent = "This is a new paragraph!";
newParagraph.className = "content highlight";

// Add to the page
const article = document.querySelector("article");
article.appendChild(newParagraph);  // Add at end

// Insert before another element
const firstParagraph = article.querySelector("p");
article.insertBefore(newParagraph, firstParagraph);  // Add before first p

// Modern insertion methods
article.prepend(newParagraph);         // First child
article.append(newParagraph);          // Last child
firstParagraph.before(newParagraph);   // Before sibling
firstParagraph.after(newParagraph);    // After sibling

// Remove an element
const footer = document.querySelector("footer");
footer.remove();

// Remove child
const nav = document.querySelector("nav");
const lastLink = nav.querySelector("li:last-child");
lastLink.parentElement.removeChild(lastLink);

// Clear all children
article.innerHTML = "";  // Simple but rebuilds DOM
// OR safer loop
while (article.firstChild) {
    article.removeChild(article.firstChild);
}

const navItem = document.querySelector(".nav-link").parentElement;
const clone = navItem.cloneNode(true);  // true = deep clone
clone.querySelector("a").textContent = "New Link";
document.querySelector(".nav-list").appendChild(clone);

// Dynamic Function to Add Nav Items
function addNavItem(text, href) {
    // Create li
    const li = document.createElement("li");

    // Create anchor
    const a = document.createElement("a");
    a.textContent = text;
    a.href = href;
    a.className = "nav-link";

    // Append anchor to li
    li.appendChild(a);

    // Append li to nav list
    const navList = document.querySelector(".nav-list");
    navList.appendChild(li);
}

// Usage
addNavItem("Blog", "/blog");
addNavItem("Portfolio", "/portfolio");


// 10: event listeners
const button = document.createElement("button");
button.textContent = "Click Me";
document.body.appendChild(button);

// Different ways to attach listeners
button.addEventListener("click", () => console.log("Button clicked!"));
button.addEventListener("click", () => console.log("Clicked again!"));

function handleClick() {
    console.log("Handled!");
}
button.addEventListener("click", handleClick);

// Removing a listener
button.removeEventListener("click", handleClick);

const element = document.querySelector("h1");
const input = document.querySelector("#name");
const form = document.querySelector("#contact-form");

function handler(event) {
    console.log("Event:", event.type, "Target:", event.target);
}

// Mouse events
element.addEventListener("click", handler);
element.addEventListener("dblclick", handler);
element.addEventListener("mouseenter", handler);
element.addEventListener("mouseleave", handler);
element.addEventListener("mousemove", handler);

// Keyboard events
input.addEventListener("keydown", handler);
input.addEventListener("keyup", handler);

// Form events
form.addEventListener("submit", handler);
input.addEventListener("focus", handler);
input.addEventListener("blur", handler);
input.addEventListener("input", handler);
input.addEventListener("change", handler);

// Window events
window.addEventListener("load", handler);
window.addEventListener("resize", handler);
window.addEventListener("scroll", handler);

let count = 0;

const counterDisplay = document.createElement("p");
counterDisplay.textContent = `Count: ${count}`;
document.body.appendChild(counterDisplay);

const plusBtn = document.createElement("button");
plusBtn.textContent = "+";
document.body.appendChild(plusBtn);

const minusBtn = document.createElement("button");
minusBtn.textContent = "-";
document.body.appendChild(minusBtn);

const resetBtn = document.createElement("button");
resetBtn.textContent = "Reset";
document.body.appendChild(resetBtn);

function updateDisplay() {
    counterDisplay.textContent = `Count: ${count}`;
}

plusBtn.addEventListener("click", () => {
    count++;
    updateDisplay();
});

minusBtn.addEventListener("click", () => {
    if (count > 0) count--;
    updateDisplay();
});

resetBtn.addEventListener("click", () => {
    count = 0;
    updateDisplay();
});

document.addEventListener("click", function(event) {
    console.log("Target:", event.target);
    console.log("Current Target:", event.currentTarget);
    console.log("Type:", event.type);
    console.log("Position:", event.clientX, event.clientY);

    event.preventDefault();
    event.stopPropagation();
});

document.addEventListener("keydown", function(event) {
    console.log("Key:", event.key);
    console.log("Code:", event.code);
    console.log("Shift:", event.shiftKey);
    console.log("Ctrl:", event.ctrlKey);
    console.log("Alt:", event.altKey);
});

const form = document.querySelector("#contact-form");

document.addEventListener("keydown", function(event) {
    // Ctrl+S
    if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        alert("Saved!");
    }

    // Escape clears inputs
    if (event.key === "Escape") {
        form.querySelectorAll("input").forEach(input => input.value = "");
    }

    // Ctrl+Enter submits form
    if (event.ctrlKey && event.key === "Enter") {
        event.preventDefault();
        form.requestSubmit(); // modern way to trigger submit
    }
});

const taskList = document.createElement("ul");
document.body.appendChild(taskList);

const input = document.createElement("input");
input.placeholder = "New task";
document.body.appendChild(input);

const addBtn = document.createElement("button");
addBtn.textContent = "Add Task";
document.body.appendChild(addBtn);

addBtn.addEventListener("click", () => {
    const li = document.createElement("li");
    li.textContent = input.value;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
    input.value = "";
});

// Delegation
taskList.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
        event.target.classList.toggle("completed");
    }
    if (event.target.tagName === "BUTTON") {
        event.target.parentElement.remove();
    }
});

const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");

nameInput.addEventListener("input", () => {
    if (nameInput.value.length < 2) {
        showError(nameInput, "Name must be at least 2 characters");
    } else {
        clearError(nameInput);
    }
});

emailInput.addEventListener("input", () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        showError(emailInput, "Please enter a valid email");
    } else {
        clearError(emailInput);
    }
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    console.log("Form data:", data);

    if (data.name.length >= 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        showSuccess("Form submitted successfully!");
        form.reset();
    }
});

function showError(input, message) {
    input.classList.add("error");
    let errorMsg = input.nextElementSibling;
    if (!errorMsg || !errorMsg.classList.contains("error-message")) {
        errorMsg = document.createElement("span");
        errorMsg.className = "error-message";
        input.insertAdjacentElement("afterend", errorMsg);
    }
    errorMsg.textContent = message;
}

function clearError(input) {
    input.classList.remove("error");
    const errorMsg = input.nextElementSibling;
    if (errorMsg && errorMsg.classList.contains("error-message")) {
        errorMsg.remove();
    }
}

function showSuccess(message) {
    alert(message);
}
