class CartManager {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.init();
    }

    init() {
        this.updateCartDisplay();
        this.bindEvents();
    }

    bindEvents() {
        // Add to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.target.dataset.productId;
                this.addItem(productId);
            });
        });

        // Cart quantity buttons
        document.querySelectorAll('.quantity-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.closest('.cart-item').dataset.productId;
                if (e.target.classList.contains('plus')) {
                    this.updateQuantity(id, 1);
                } else {
                    this.updateQuantity(id, -1);
                }
            });
        });
    }

    addItem(productId) {
        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                id: productId,
                quantity: 1
            });
        }

        this.updateCart();
    }

    removeItem(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.updateCart();
    }

    updateQuantity(productId, change) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                this.removeItem(productId);
            } else {
                this.updateCart();
            }
        }
    }

    updateCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateCartDisplay();
    }

    updateCartDisplay() {
        const cartCount = document.querySelector('.cart-count');
        const cartTotal = document.querySelector('.cart-total');
        const cartItems = document.querySelector('.cart-items');

        if (cartCount) {
            cartCount.textContent = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        }

        if (cartTotal && cartItems) {
            this.renderCartItems(cartItems);
            this.updateTotal(cartTotal);
        }
    }

    renderCartItems(container) {
        container.innerHTML = this.cart.map(item => `
            <div class="cart-item" data-product-id="${item.id}">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p class="price">$${item.price.toLocaleString()}</p>
                    <div class="quantity-controls">
                        <button class="quantity-btn minus">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn plus">+</button>
                    </div>
                </div>
                <button class="remove-item">&times;</button>
            </div>
        `).join('');
    }

    updateTotal(element) {
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        element.textContent = `$${total.toLocaleString()}`;
    }

    checkout() {
        // Add your checkout logic here
        if (this.cart.length === 0) {
            alert('Your cart is empty');
            return;
        }

        // Redirect to checkout page or show checkout modal
        window.location.href = '/checkout.html';
    }
}

// Initialize cart manager
const cartManager = new CartManager(); 