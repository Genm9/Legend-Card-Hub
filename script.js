// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Homepage Image Slider (Banner)
    const bannerImages = ['placeholder-banner.jpg']; // Add more images if you have them
    const banner = document.querySelector('.banner img');
    let currentImageIndex = 0;

    function changeBannerImage() {
        if (banner) {
            banner.src = bannerImages[currentImageIndex];
            currentImageIndex = (currentImageIndex + 1) % bannerImages.length;
        }
    }

    if (banner && bannerImages.length > 1) {
        setInterval(changeBannerImage, 3000); // Change image every 3 seconds
    }
};


// Card Market Filtering and Pagination
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-filter input[type="text"]');
    const categorySelect = document.querySelector('.search-filter select');
    const cardItems = document.querySelectorAll('.card-item');
    const pageNumbers = document.querySelectorAll('.pagination .page-number');
    const prevButton = document.querySelector('.pagination a:contains("Previous")');
    const nextButton = document.querySelector('.pagination a:contains("Next")');
    const cardsPerPage = 3; // Number of cards per page
    let currentPage = 1;

    function filterCards() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categorySelect.value.toLowerCase();

        cardItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const categoryMatch = selectedCategory === '' || title.includes(selectedCategory); // Basic category match
            const searchMatch = title.includes(searchTerm);

            const itemPage = item.dataset.page ? parseInt(item.dataset.page) : 1;
            const belongsToCurrentPage = itemPage === currentPage;

            if (categoryMatch && searchMatch && belongsToCurrentPage) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    function showPage(page) {
        currentPage = page;
        filterCards(); // Re-apply filtering when page changes
        updatePaginationButtons();
    }

    function updatePaginationButtons() {
        pageNumbers.forEach(page => page.classList.remove('active'));
        const currentPageButton = document.querySelector(`.pagination a[data-page="${currentPage}"]`);
        if (currentPageButton) {
            currentPageButton.classList.add('active');
        }

        prevButton.style.visibility = currentPage === 1 ? 'hidden' : 'visible';
        nextButton.style.visibility = currentPage === pageNumbers.length ? 'hidden' : 'visible';
    }

    function changePageHandler(event) {
        event.preventDefault();
        const targetPage = parseInt(event.target.dataset.page);
        if (!isNaN(targetPage) && targetPage >= 1 && targetPage <= pageNumbers.length) {
            showPage(targetPage);
        } else if (event.target === prevButton && currentPage > 1) {
            showPage(currentPage - 1);
        } else if (event.target === nextButton && currentPage < pageNumbers.length) {
            showPage(currentPage + 1);
        }
    }

    // Event listeners for filtering
    if (searchInput && categorySelect) {
        searchInput.addEventListener('input', filterCards);
        categorySelect.addEventListener('change', filterCards);
    }

    // Event listeners for pagination
    pageNumbers.forEach(page => page.addEventListener('click', changePageHandler));
    prevButton.addEventListener('click', changePageHandler);
    nextButton.addEventListener('click', changePageHandler);

    // Initial setup
    showPage(currentPage);
    updatePaginationButtons();
});

// Auction Hall Tabs
// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.auction-status-tabs button');
    const auctionItems = document.querySelectorAll('.auction-item');
    
    // Sample auction data (in a real app, this would come from a database)
    const auctions = {
        ongoing: [
            { id: 1, name: "Arceus VSTAR", currentBid: 20.00, timeLeft: 34 * 60 * 60 + 10 * 60 * 60 }, // 1d 10h in seconds
            { id: 2, name: "Rayquaza Gold Star", currentBid: 5500.00, timeLeft: 6 * 24 * 60 * 60 + 15 * 60 * 60 }, // 6d 15h in seconds
            { id: 3, name: "Umbreon VMAX Alt Art", currentBid: 1400.00, timeLeft: 3 * 24 * 60 * 60 } // 3d in seconds
        ],
        upcoming: [
            { id: 4, name: "Charizard VMAX", startingBid: 250.00, startsIn: 2 * 24 * 60 * 60 }, // 2d in seconds
            { id: 5, name: "Lugia PSA 10", startingBid: 1200.00, startsIn: 5 * 24 * 60 * 60 } // 5d in seconds
        ],
        past: [
            { id: 6, name: "Blastoise 1st Edition", finalBid: 1800.00, endedAt: "2025-03-28" },
            { id: 7, name: "Pikachu Illustrator", finalBid: 25000.00, endedAt: "2025-03-15" }
        ]
    };

    // Initialize tab functionality
    initTabs();
    
    // Start countdown timers
    updateCountdowns();
    setInterval(updateCountdowns, 1000);
    
    // Initialize search and filter (if present in the HTML)
    const searchInput = document.querySelector('.auction-search');
    if (searchInput) {
        searchInput.addEventListener('input', filterAuctions);
    }
    
    // Initialize bid buttons
    const bidButtons = document.querySelectorAll('.place-bid-btn');
    bidButtons.forEach(btn => {
        btn.addEventListener('click', handleBidPlacement);
    });
    
    /**
     * Initialize tab switching functionality
     */
    function initTabs() {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                tabButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Display auctions based on selected tab
                const tabType = button.textContent.toLowerCase();
                displayAuctions(tabType);
            });
        });
    }
    
    /**
     * Display auctions based on tab selected
     * @param {string} tabType - The type of auctions to display (ongoing, upcoming, past)
     */
    function displayAuctions(tabType) {
        const auctionListings = document.querySelector('.auction-listings');
        auctionListings.innerHTML = ''; // Clear current auctions
        
        let auctionsToDisplay = [];
        
        if (tabType.includes('ongoing')) {
            auctionsToDisplay = auctions.ongoing;
            
            auctionsToDisplay.forEach(auction => {
                const auctionElement = createAuctionElement(auction, 'ongoing');
                auctionListings.appendChild(auctionElement);
            });
        } 
        else if (tabType.includes('upcoming')) {
            auctionsToDisplay = auctions.upcoming;
            
            auctionsToDisplay.forEach(auction => {
                const auctionElement = createAuctionElement(auction, 'upcoming');
                auctionListings.appendChild(auctionElement);
            });
        }
        else if (tabType.includes('past')) {
            auctionsToDisplay = auctions.past;
            
            auctionsToDisplay.forEach(auction => {
                const auctionElement = createAuctionElement(auction, 'past');
                auctionListings.appendChild(auctionElement);
            });
        }
    }
    
    /**
     * Create an auction element
     * @param {Object} auction - The auction object
     * @param {string} type - The type of auction (ongoing, upcoming, past)
     * @returns {HTMLElement} - The auction element
     */
    function createAuctionElement(auction, type) {
        const auctionDiv = document.createElement('div');
        auctionDiv.className = 'auction-item';
        auctionDiv.dataset.id = auction.id;
        
        // Create image (placeholder)
        const img = document.createElement('img');
        img.src = `placeholder-${auction.name.replace(/\s/g, '-')}.jpg`;
        img.alt = auction.name;
        
        // Create title
        const title = document.createElement('h3');
        title.textContent = auction.name;
        
        // Create price info
        const priceInfo = document.createElement('p');
        if (type === 'ongoing') {
            priceInfo.textContent = `Current Bid: $${auction.currentBid.toFixed(2)}`;
        } else if (type === 'upcoming') {
            priceInfo.textContent = `Starting Bid: $${auction.startingBid.toFixed(2)}`;
        } else {
            priceInfo.textContent = `Final Bid: $${auction.finalBid.toFixed(2)}`;
        }
        
        // Create time info
        const timeInfo = document.createElement('p');
        timeInfo.className = 'time-info';
        
        if (type === 'ongoing') {
            timeInfo.textContent = 'Time Left: ...';
            timeInfo.dataset.timeLeft = auction.timeLeft;
            timeInfo.className += ' countdown';
        } else if (type === 'upcoming') {
            timeInfo.textContent = 'Starts In: ...';
            timeInfo.dataset.startsIn = auction.startsIn;
            timeInfo.className += ' countdown-start';
        } else {
            timeInfo.textContent = `Ended On: ${auction.endedAt}`;
        }
        
        // Create action button
        const actionLink = document.createElement('a');
        actionLink.href = `#auction-${auction.id}`;
        
        if (type === 'ongoing') {
            actionLink.textContent = 'View Auction';
            actionLink.className = 'view-auction-btn';
        } else if (type === 'upcoming') {
            actionLink.textContent = 'Notify Me';
            actionLink.className = 'notify-btn';
        } else {
            actionLink.textContent = 'View Results';
            actionLink.className = 'view-results-btn';
        }
        
        // Add place bid button for ongoing auctions
        if (type === 'ongoing') {
            const bidButton = document.createElement('button');
            bidButton.textContent = 'Place Bid';
            bidButton.className = 'place-bid-btn';
            bidButton.dataset.auctionId = auction.id;
            auctionDiv.appendChild(bidButton);
        }
        
        // Assemble the auction item
        auctionDiv.appendChild(img);
        auctionDiv.appendChild(title);
        auctionDiv.appendChild(priceInfo);
        auctionDiv.appendChild(timeInfo);
        auctionDiv.appendChild(actionLink);
        
        return auctionDiv;
    }
    
    /**
     * Update all countdown timers
     */
    function updateCountdowns() {
        // Update ongoing auction countdowns
        document.querySelectorAll('.countdown').forEach(element => {
            let timeLeft = parseInt(element.dataset.timeLeft);
            
            if (timeLeft <= 0) {
                element.textContent = 'Auction Ended';
                element.parentElement.classList.add('ended');
            } else {
                timeLeft--;
                element.dataset.timeLeft = timeLeft;
                
                const days = Math.floor(timeLeft / (24 * 60 * 60));
                const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
                const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
                const seconds = timeLeft % 60;
                
                element.textContent = `Time Left: ${days}d ${hours}h ${minutes}m ${seconds}s`;
            }
        });
        
        // Update upcoming auction countdowns
        document.querySelectorAll('.countdown-start').forEach(element => {
            let startsIn = parseInt(element.dataset.startsIn);
            
            if (startsIn <= 0) {
                element.textContent = 'Starting Now!';
                element.parentElement.classList.add('starting');
            } else {
                startsIn--;
                element.dataset.startsIn = startsIn;
                
                const days = Math.floor(startsIn / (24 * 60 * 60));
                const hours = Math.floor((startsIn % (24 * 60 * 60)) / (60 * 60));
                const minutes = Math.floor((startsIn % (60 * 60)) / 60);
                const seconds = startsIn % 60;
                
                element.textContent = `Starts In: ${days}d ${hours}h ${minutes}m ${seconds}s`;
            }
        });
    }
    
    /**
     * Handle bid placement
     * @param {Event} event - The click event
     */
    function handleBidPlacement(event) {
        const auctionId = parseInt(event.target.dataset.auctionId);
        const auction = auctions.ongoing.find(a => a.id === auctionId);
        
        if (!auction) return;
        
        // In a real app, show a bid modal here
        const bidAmount = prompt(`Current bid for ${auction.name} is $${auction.currentBid.toFixed(2)}. Enter your bid amount:`);
        
        if (bidAmount && !isNaN(bidAmount)) {
            const newBid = parseFloat(bidAmount);
            
            if (newBid > auction.currentBid) {
                auction.currentBid = newBid;
                
                // Update displayed bid
                const priceInfo = event.target.parentElement.querySelector('p');
                priceInfo.textContent = `Current Bid: $${newBid.toFixed(2)}`;
                
                alert(`Bid placed successfully! You are now the highest bidder for ${auction.name}.`);
            } else {
                alert('Your bid must be higher than the current bid.');
            }
        }
    }
    
    /**
     * Filter auctions based on search input
     */
    function filterAuctions() {
        const searchTerm = searchInput.value.toLowerCase();
        const activeTab = document.querySelector('.auction-status-tabs button.active').textContent.toLowerCase();
        
        let filteredAuctions;
        if (activeTab.includes('ongoing')) {
            filteredAuctions = auctions.ongoing.filter(auction => 
                auction.name.toLowerCase().includes(searchTerm));
        } else if (activeTab.includes('upcoming')) {
            filteredAuctions = auctions.upcoming.filter(auction => 
                auction.name.toLowerCase().includes(searchTerm));
        } else {
            filteredAuctions = auctions.past.filter(auction => 
                auction.name.toLowerCase().includes(searchTerm));
        }
        
        const auctionListings = document.querySelector('.auction-listings');
        auctionListings.innerHTML = '';
        
        filteredAuctions.forEach(auction => {
            const auctionElement = createAuctionElement(auction, activeTab);
            auctionListings.appendChild(auctionElement);
        });
    }
});

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

// Support Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    const supportOptions = document.querySelectorAll('.support-option');
    const contentSections = document.querySelectorAll('.support-content-area > div');
    const faqListItems = document.querySelectorAll('#faq-section ul li');

    supportOptions.forEach(option => {
        option.addEventListener('click', function() {
            supportOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');

            const sectionId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            contentSections.forEach(section => section.style.display = 'none';
            document.getElementById(sectionId).style.display = 'block';
        });
    });

    faqListItems.forEach(listItem => {
        listItem.addEventListener('click', function() {
            this.classList.toggle('active');
            const answer = this.querySelector('.faq-answer');
            const icon = this.querySelector('.faq-toggle-icon');

            if (answer) {
                answer.classList.toggle('active');
            }
            if (icon) {
                icon.classList.toggle('active');
            }
        });
    });

    // Show FAQ section by default
    showSupportContent('faq-section');
});

function showSupportContent(sectionId) {
    const contentSections = document.querySelectorAll('.support-content-area > div');
    contentSections.forEach(section => section.style.display = 'none';
    document.getElementById(sectionId).style.display = 'block';
}