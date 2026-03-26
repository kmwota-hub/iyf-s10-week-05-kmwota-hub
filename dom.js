// 1. The h1 element
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
const firstNavLink = document.querySelector(".nav-link");
const parentLi = firstNavLink.parentElement;
console.log("Parent li of first nav-link:", parentLi);

// Select the article, then get its next sibling (section)
const article = document.querySelector("article");
const nextSiblingSection = article.nextElementSibling;
console.log("Next sibling of article:", nextSiblingSection);

// Select the ul, then get all its child li elements
const navList = document.querySelector("nav ul");
const navListItems = navList.children;
console.log("Child li elements of ul:", navListItems);

// Start from the footer and navigate up to the body
const footer = document.querySelector("footer");
const footerParent = footer.parentElement; // should be body
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

