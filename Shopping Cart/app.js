const state = {
    products: [
        { id: 1, name: "Laptop", price: 999, image: "laptop.jpg" },
        { id: 2, name: "Phone", price: 699, image: "phone.jpg" },
        { id: 3, name: "Headphones", price: 199, image: "headphones.jpg" }
    ],
    cart: [] // { productId, quantity }
};

// PERSISTENCE
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(state.cart));
}

function loadCart() {
    const saved = localStorage.getItem("cart");
    if (saved) {
        state.cart = JSON.parse(saved);
    }
}

// ADD
function addToCart(productId) {
    const existing = state.cart.find(item => item.productId === productId);
    if (existing) {
        existing.quantity++;
    } else {
        state.cart.push({ productId, quantity: 1 });
    }
    saveCart();
    renderCart();
}

// UPDATE
function updateQuantity(productId, quantity) {
    const item = state.cart.find(i => i.productId === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
        }
    }
    saveCart();
    renderCart();
}

// REMOVE
function removeFromCart(productId) {
    state.cart = state.cart.filter(item => item.productId !== productId);
    saveCart();
    renderCart();
}

function clearCart() {
    state.cart = [];
    saveCart();
    renderCart();
}

// TOTAL
function getCartTotal() {
    return state.cart.reduce((total, item) => {
        const product = state.products.find(p => p.id === item.productId);
        return total + (product.price * item.quantity);
    }, 0);
}

// COUNT
function getCartCount() {
    return state.cart.reduce((count, item) => count + item.quantity, 0);
}

// RENDER
function renderProducts() {
    const container = document.getElementById("products");
    container.innerHTML = "";
    state.products.forEach(p => {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>$${p.price}</p>
            <button onclick="addToCart(${p.id})">Add to Cart</button>
        `;
        container.appendChild(div);
    });
}

function renderCart() {
    const container = document.getElementById("cart");
    container.innerHTML = "";
    state.cart.forEach(item => {
        const product = state.products.find(p => p.id === item.productId);
        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
            <h4>${product.name}</h4>
            <p>$${product.price} x ${item.quantity}</p>
            <input type="number" value="${item.quantity}" min="0"
                onchange="updateQuantity(${item.productId}, this.value)">
            <button onclick="removeFromCart(${item.productId})">Remove</button>
        `;
        container.appendChild(div);
    });

    document.getElementById("cart-total").innerText = "Total: $" + getCartTotal();
    document.getElementById("cart-count").innerText = getCartCount();
}

// INIT
window.onload = () => {
    loadCart();
    renderProducts();
    renderCart();
};
 