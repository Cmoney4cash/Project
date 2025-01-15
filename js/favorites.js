// Store favorites in localStorage
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

function toggleFavorite(event) {
    const button = event.currentTarget;
    const watchItem = button.closest('.watch-item');
    const watchData = {
        id: watchItem.querySelector('p').textContent,
        name: watchItem.querySelector('h3').textContent,
        image: watchItem.querySelector('img').src
    };

    button.classList.toggle('active');

    if (button.classList.contains('active')) {
        // Add to favorites if not already present
        if (!favorites.find(item => item.id === watchData.id)) {
            favorites.push(watchData);
            console.log('Added to favorites:', watchData); // Debug log
        }
    } else {
        // Remove from favorites
        favorites = favorites.filter(item => item.id !== watchData.id);
        console.log('Removed from favorites:', watchData); // Debug log
    }

    // Save to localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    // If we're on the favorites page, reload the favorites
    if (window.location.pathname.includes('favorites.html')) {
        loadFavorites();
    }
}

function loadFavorites() {
    const favoritesGrid = document.querySelector('.favorites-grid');
    if (!favoritesGrid) return; // Exit if not on favorites page

    if (favorites.length === 0) {
        favoritesGrid.innerHTML = `
            <div class="no-favorites">
                <p>No favorites selected yet</p>
                <a href="collection.html" class="browse-link">Browse Collection</a>
            </div>`;
        return;
    }

    favoritesGrid.innerHTML = favorites.map(watch => `
        <div class="watch-item">
            <img src="${watch.image}" alt="${watch.name}">
            <div class="watch-details">
                <h3>${watch.name}</h3>
                <p>${watch.id}</p>
                <button class="favorite-btn active" onclick="toggleFavorite(event)">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add click listeners to all favorite buttons
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', toggleFavorite);
    });

    // Load favorites if we're on the favorites page
    if (window.location.pathname.includes('favorites.html')) {
        loadFavorites();
    }

    // Check and highlight already favorited items on collection page
    if (!window.location.pathname.includes('favorites.html')) {
        favorites.forEach(favorite => {
            const matchingItem = document.querySelector(`p:contains("${favorite.id}")`);
            if (matchingItem) {
                const button = matchingItem.closest('.watch-item').querySelector('.favorite-btn');
                button.classList.add('active');
            }
        });
    }
});
