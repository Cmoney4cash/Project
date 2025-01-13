// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: true
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.main-header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(26, 26, 26, 0.95)';
    } else {
        header.style.background = 'rgba(26, 26, 26, 0.7)';
    }
});

// Shopping Cart functionality
let cart = [];

function addToCart(product) {
    cart.push(product);
    updateCartCount();
}

function updateCartCount() {
    const cartIcon = document.querySelector('.fa-shopping-cart');
    if (cartIcon) {
        cartIcon.setAttribute('data-count', cart.length);
    }
}

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        // Add your newsletter subscription logic here
        alert('Thank you for subscribing!');
        this.reset();
    });
} 