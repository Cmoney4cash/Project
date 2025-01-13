let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

function toggleFavorite(watchId) {
    const index = favorites.indexOf(watchId);
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(watchId);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoriteButtons();
}

function updateFavoriteButtons() {
    document.querySelectorAll('.favorite-btn').forEach(button => {
        const watchId = button.getAttribute('onclick').match(/'([^']+)'/)[1];
        if (favorites.includes(watchId)) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', updateFavoriteButtons); 