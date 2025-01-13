// Product Gallery
function initProductGallery() {
    const mainImage = document.getElementById('main-image');
    const thumbnails = document.querySelectorAll('.thumbnail-grid img');
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            mainImage.src = thumb.src;
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            // Add active class to clicked thumbnail
            thumb.classList.add('active');
        });
    });
}

// Product Zoom
function initZoom() {
    const mainImage = document.querySelector('.main-image');
    
    mainImage.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = mainImage.getBoundingClientRect();
        const x = (e.clientX - left) / width * 100;
        const y = (e.clientY - top) / height * 100;
        
        mainImage.style.transformOrigin = `${x}% ${y}%`;
    });

    mainImage.addEventListener('mouseenter', () => {
        mainImage.style.transform = 'scale(1.5)';
    });

    mainImage.addEventListener('mouseleave', () => {
        mainImage.style.transform = 'scale(1)';
    });
}

// Add to Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(product) {
    cart.push(product);
    updateCart();
    showNotification('Product added to cart');
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    // Update cart icon count
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Schedule Viewing
function initScheduleViewing() {
    const scheduleBtn = document.querySelector('.schedule-viewing');
    if (scheduleBtn) {
        scheduleBtn.addEventListener('click', () => {
            // Create modal
            const modal = document.createElement('div');
            modal.className = 'viewing-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <h2>Schedule a Viewing</h2>
                    <form id="viewing-form">
                        <input type="text" placeholder="Name" required>
                        <input type="email" placeholder="Email" required>
                        <input type="tel" placeholder="Phone" required>
                        <input type="date" required>
                        <input type="time" required>
                        <button type="submit">Schedule</button>
                    </form>
                    <button class="close-modal">&times;</button>
                </div>
            `;
            document.body.appendChild(modal);
            
            // Handle close
            modal.querySelector('.close-modal').addEventListener('click', () => {
                modal.remove();
            });
            
            // Handle form submit
            modal.querySelector('form').addEventListener('submit', (e) => {
                e.preventDefault();
                // Add your scheduling logic here
                showNotification('Viewing scheduled successfully');
                modal.remove();
            });
        });
    }
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
    initProductGallery();
    initZoom();
    initScheduleViewing();
}); 