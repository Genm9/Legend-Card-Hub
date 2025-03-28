// script.js

// Homepage Image Slider (Basic)
const bannerImages = ['placeholder-banner.jpg', 'placeholder-banner2.jpg', 'placeholder-banner3.jpg']; // Add more images if you have them
const banner = document.querySelector('.banner img');
let currentImageIndex = 0;

function changeBannerImage() {
    if (banner) {
        banner.src = bannerImages[currentImageIndex];
        currentImageIndex = (currentImageIndex + 1) % bannerImages.length;
    }
}

}

// Card Market Filtering
const searchInput = document.querySelector('.search-filter input[type="text"]');
const categorySelect = document.querySelector('.search-filter select');
const cardItems = document.querySelectorAll('.card-item');

function filterCards() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categorySelect.value.toLowerCase();

    cardItems.forEach(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        const categoryMatch = selectedCategory === '' || title.includes(selectedCategory); // Basic category match
        const searchMatch = title.includes(searchTerm);

        if (categoryMatch && searchMatch) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

if (searchInput && categorySelect) {
    searchInput.addEventListener('input', filterCards);
    categorySelect.addEventListener('change', filterCards);
}

// Auction Hall Tabs
const auctionTabs = document.querySelectorAll('.auction-status-tabs button');
const auctionListings = document.querySelector('.auction-listings'); // Assuming all listings are shown initially

if (auctionTabs.length > 0) {
    auctionTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            auctionTabs.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const tabName = this.textContent.toLowerCase().replace(/\s+/g, '-'); // Normalize tab name for ID

            // In a real application, you would fetch and display different auction listings
            // based on the tab clicked (Ongoing, Upcoming, Past).
            // For this basic example, we'll show/hide based on a simple filter.
            const auctionItems = auctionListings.querySelectorAll('.auction-item');

            auctionItems.forEach(item => {
                // This is a very basic example - you'd need more specific data attributes
                // on the auction items to filter correctly in a real scenario.
                const status = item.dataset.status ? item.dataset.status.toLowerCase() : '';
                if (tabName === 'ongoing' && status === 'ongoing') {
                    item.style.display = 'block';
                } else if (tabName === 'upcoming' && status === 'upcoming') {
                    item.style.display = 'block';
                } else if (tabName === 'past-auctions' && status === 'past') {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Profile Page Tabs
document.addEventListener('DOMContentLoaded', function() {
    const profileTabs = document.querySelectorAll('.profile-tab');
    const profileContents = document.querySelectorAll('.profile-content');

    profileTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            profileTabs.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const tabId = this.dataset.tab;
            profileContents.forEach(content => content.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });
});

// Card Archaeology Tabs
document.addEventListener('DOMContentLoaded', function() {
    const archaeologyTabs = document.querySelectorAll('.archaeology-tab');
    const archaeologyContents = document.querySelectorAll('.archaeology-content');

    archaeologyTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            archaeologyTabs.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const tabId = this.dataset.tab;
            archaeologyContents.forEach(content => content.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });
});