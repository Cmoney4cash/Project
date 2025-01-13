// Initialize map and store locations
let map;
let markers = [];
const stores = [
    {
        id: 1,
        name: 'Alberto New York',
        lat: 40.7128,
        lng: -74.0060,
        address: '123 Fifth Avenue, NY 10001',
        phone: '+1 (212) 555-0123',
        hours: 'Mon-Sat: 10:00 - 19:00'
    },
    // Add more store locations
];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.7128, lng: -74.0060 },
        zoom: 12,
        styles: [
            // Custom map styles for luxury look
            {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [{"color": "#1a1a1a"}]
            }
            // Add more custom styles
        ]
    });

    // Add markers for all stores
    stores.forEach(store => addMarker(store));
}

function addMarker(store) {
    const marker = new google.maps.Marker({
        position: { lat: store.lat, lng: store.lng },
        map: map,
        icon: {
            url: 'images/marker.png',
            scaledSize: new google.maps.Size(30, 30)
        }
    });

    markers.push(marker);

    // Add info window
    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div class="map-info-window">
                <h3>${store.name}</h3>
                <p>${store.address}</p>
                <p>${store.phone}</p>
            </div>
        `
    });

    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });
}

function searchLocations() {
    const input = document.getElementById('location-search').value;
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address: input }, (results, status) => {
        if (status === 'OK') {
            const location = results[0].geometry.location;
            map.setCenter(location);
            
            // Find nearest stores
            const nearest = findNearestStores(location);
            updateStoreList(nearest);
        }
    });
}

function findNearestStores(location) {
    return stores
        .map(store => {
            const distance = google.maps.geometry.spherical.computeDistanceBetween(
                location,
                new google.maps.LatLng(store.lat, store.lng)
            );
            return { ...store, distance };
        })
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 5);
}

function updateStoreList(stores) {
    const storeList = document.querySelector('.store-list');
    storeList.innerHTML = stores.map(store => `
        <div class="store-item" onclick="selectStore(${store.id})">
            <h3>${store.name}</h3>
            <p><i class="fas fa-map-marker-alt"></i> ${store.address}</p>
            <p><i class="fas fa-phone"></i> ${store.phone}</p>
            <p><i class="fas fa-clock"></i> ${store.hours}</p>
            <button class="direction-btn">Get Directions</button>
        </div>
    `).join('');
} 