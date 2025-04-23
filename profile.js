// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Profile Tab Navigation
    const profileTabs = document.querySelectorAll('.profile-tab');
    const profileContents = document.querySelectorAll('.profile-content');

    profileTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            profileTabs.forEach(t => t.classList.remove('active'));
            profileContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show the corresponding content
            const tabName = tab.getAttribute('data-tab');
            document.getElementById(tabName).classList.add('active');
        });
    });

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const darkModeStylesheet = document.getElementById('dark-mode-stylesheet');
    
    // Check if dark mode preference is stored
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // Initialize dark mode based on stored preference
    if (isDarkMode) {
        darkModeStylesheet.setAttribute('href', 'dark-mode.css');
    } else {
        darkModeStylesheet.setAttribute('href', '');
    }
    
    darkModeToggle.addEventListener('click', () => {
        if (darkModeStylesheet.getAttribute('href') === '') {
            darkModeStylesheet.setAttribute('href', 'dark-mode.css');
            localStorage.setItem('darkMode', 'true');
        } else {
            darkModeStylesheet.setAttribute('href', '');
            localStorage.setItem('darkMode', 'false');
        }
    });

    // Username Editing
    const displayUsername = document.getElementById('display-username');
    const overviewUsername = document.getElementById('overview-username');
    const editUsernameBtn = document.getElementById('edit-username-btn');
    const editUsernameInput = document.getElementById('edit-username-input');
    const saveUsernameBtn = document.getElementById('save-username-btn');
    const cancelUsernameBtn = document.getElementById('cancel-username-btn');
    
    let originalUsername = displayUsername.textContent;
    
    editUsernameBtn.addEventListener('click', () => {
        // Hide username display, show edit field
        displayUsername.style.display = 'none';
        editUsernameBtn.style.display = 'none';
        editUsernameInput.style.display = 'inline-block';
        saveUsernameBtn.style.display = 'inline-block';
        cancelUsernameBtn.style.display = 'inline-block';
        
        // Set input value to current username
        editUsernameInput.value = displayUsername.textContent;
        editUsernameInput.focus();
    });
    
    saveUsernameBtn.addEventListener('click', () => {
        const newUsername = editUsernameInput.value.trim();
        if (newUsername) {
            displayUsername.textContent = newUsername;
            overviewUsername.textContent = newUsername;
            originalUsername = newUsername;
        }
        
        // Hide edit field, show username display
        displayUsername.style.display = 'inline';
        editUsernameBtn.style.display = 'inline-block';
        editUsernameInput.style.display = 'none';
        saveUsernameBtn.style.display = 'none';
        cancelUsernameBtn.style.display = 'none';
    });
    
    cancelUsernameBtn.addEventListener('click', () => {
        // Hide edit field, show username display without changes
        displayUsername.style.display = 'inline';
        editUsernameBtn.style.display = 'inline-block';
        editUsernameInput.style.display = 'none';
        saveUsernameBtn.style.display = 'none';
        cancelUsernameBtn.style.display = 'none';
    });

    // Profile Picture Handling
    const profilePic = document.getElementById('profile-pic');
    const editProfilePicBtn = document.getElementById('edit-profile-pic-btn');
    const uploadProfilePic = document.getElementById('upload-profile-pic');
    
    editProfilePicBtn.addEventListener('click', () => {
        uploadProfilePic.click();
    });
    
    uploadProfilePic.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                profilePic.src = e.target.result;
                // In a real app, you would upload this to a server
            };
            reader.readAsDataURL(file);
        }
    });

    // Mock Data for Listings
    const mockListings = [
        { id: 1, name: "Gyarados Shining (1st edition)", description: "#65", price: 99.00, image: "placeholder-Gyarados Shining.jpg" },
        { id: 2, name: "Venusaur Holo (1st edition)", description: "#15", price: 75.00, image: "placeholder-Venusaur Holo.jpg" },
        { id: 3, name: "Mega M Mewtwo EX", description: "#64", price: 35.00, image: "placeholder-Mega M Mewtwo EX.jpg" },
        { id: 4, name: "Charizard VMAX", description: "#20", price: 30.00, image: "placeholder-Charizard VMAX.jpg" },
        { id: 5, name: "Snorlax Jungle Set (1st edition)", description: "#11", price: 45.00, image: "placeholder-Snorlax Jungle Set.jpg" }
    ];
    
    // Mock Data for Bids
    const mockBids = [
        { id: 101, name: "Rayquaza Gold Star", currentBid: 5500.00, yourBid: 5800.00, endTime: "2025-05-01T18:00:00", image: "placeholder-Rayquaza Gold Star.jpg" },
        { id: 102, name: "Blastoise 1st Edition", currentBid: 1800.00, yourBid: 1000.00, endTime: "2025-04-28T12:30:00", image: "placeholder-Blastoise Base Set.jpg" },
        { id: 103, name: "Pikachu Illustrator", currentBid: 21000.00, yourBid: 25000.00, endTime: "2025-05-05T23:45:00", image: "placeholder-Pikachu Illustrator.jpg" }
    ];
    
    // Mock Data for Watchlist
    const mockWatchlist = [
        { id: 201, name: "Ancient Mew Promo", price: 900.00, image: "placeholder-Ancient Mew Promo.jpg" },
        { id: 202, name: "Espeon V Alt Art", price: 210.00, image: "placeholder-Espeon V Alt Art.jpg" },
        { id: 203, name: "Arceus VSTAR", price: 60.00, image: "placeholder-Arceus VSTAR.jpg" },
        { id: 204, name: "Umbreon VMAX Alt Art", price: 1400.00, image: "placeholder-Umbreon VMAX Alt Art.jpg" },
        { id: 205, name: "Lugia PSA 10", price: 1200.00, image: "placeholder-Lugia.jpg" },
    ];

    // Load My Listings
    function loadMyListings() {
        const myListingsGrid = document.getElementById('my-listings-grid');
        myListingsGrid.innerHTML = '';
        
        mockListings.forEach(listing => {
            const listingElement = document.createElement('div');
            listingElement.className = 'card-listing';
            listingElement.dataset.id = listing.id;
            
            listingElement.innerHTML = `
                <img src="${listing.image}" alt="${listing.name}" class="card-image">
                <h3>${listing.name}</h3>
                <p class="card-description">${listing.description}</p>
                <p class="card-price">$${listing.price.toFixed(2)}</p>
                <div class="listing-actions">
                    <button class="edit-listing">Edit</button>
                    <button class="remove-listing">Remove</button>
                </div>
            `;
            
            myListingsGrid.appendChild(listingElement);
        });
        
        // Update overview count
        document.getElementById('overview-listings-count').textContent = mockListings.length;
        
        // Add event listeners to the edit and remove buttons
        document.querySelectorAll('.edit-listing').forEach(button => {
            button.addEventListener('click', (e) => {
                const listingId = parseInt(e.target.closest('.card-listing').dataset.id);
                const listing = mockListings.find(l => l.id === listingId);
                
                // Populate edit form
                document.getElementById('edit-listing-name').value = listing.name;
                document.getElementById('edit-listing-description').value = listing.description;
                document.getElementById('edit-listing-price').value = listing.price;
                
                // Show edit form
                document.getElementById('edit-listing-form').style.display = 'block';
                
                // Scroll to form
                document.getElementById('edit-listing-form').scrollIntoView({ behavior: 'smooth' });
            });
        });
        
        document.querySelectorAll('.remove-listing').forEach(button => {
            button.addEventListener('click', (e) => {
                if (confirm('Are you sure you want to remove this listing?')) {
                    const listingElement = e.target.closest('.card-listing');
                    const listingId = parseInt(listingElement.dataset.id);
                    
                    // Remove from mockListings array
                    const index = mockListings.findIndex(l => l.id === listingId);
                    if (index > -1) {
                        mockListings.splice(index, 1);
                    }
                    
                    // Remove from DOM
                    listingElement.remove();
                    
                    // Update overview count
                    document.getElementById('overview-listings-count').textContent = mockListings.length;
                }
            });
        });
    }

    // Add New Listing Button
    const addListingButton = document.getElementById('add-listing-button');
    addListingButton.addEventListener('click', () => {
        // Clear form fields
        document.getElementById('edit-listing-name').value = '';
        document.getElementById('edit-listing-description').value = '';
        document.getElementById('edit-listing-price').value = '';
        
        // Show form
        document.getElementById('edit-listing-form').style.display = 'block';
        
        // Scroll to form
        document.getElementById('edit-listing-form').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Save Listing Button
    const saveEditListingButton = document.getElementById('save-edit-listing-button');
    saveEditListingButton.addEventListener('click', () => {
        const name = document.getElementById('edit-listing-name').value.trim();
        const description = document.getElementById('edit-listing-description').value.trim();
        const price = parseFloat(document.getElementById('edit-listing-price').value);
        
        if (name && description && !isNaN(price) && price > 0) {
            // Create new listing
            const newListing = {
                id: mockListings.length > 0 ? Math.max(...mockListings.map(l => l.id)) + 1 : 1,
                name,
                description,
                price,
                image: "placeholder-new-card.jpg" // Default image
            };
            
            // Add to mockListings
            mockListings.push(newListing);
            
            // Reload listings
            loadMyListings();
            
            // Hide form
            document.getElementById('edit-listing-form').style.display = 'none';
        } else {
            alert('Please fill in all fields with valid information.');
        }
    });
    
    // Cancel Edit Button
    const cancelEditListingButton = document.getElementById('cancel-edit-listing-button');
    cancelEditListingButton.addEventListener('click', () => {
        document.getElementById('edit-listing-form').style.display = 'none';
    });

    // Load My Bids
    function loadMyBids() {
        const myBidsList = document.getElementById('my-bids-list');
        myBidsList.innerHTML = '';
        
        mockBids.forEach(bid => {
            const bidElement = document.createElement('div');
            bidElement.className = 'bid-item';
            
            // Calculate time remaining
            const endTime = new Date(bid.endTime);
            const now = new Date();
            const timeRemaining = endTime - now;
            
            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            
            const timeRemainingText = timeRemaining > 0 ? 
                `${days}d ${hours}h ${minutes}m remaining` : 
                'Auction ended';
            
            const bidStatus = bid.currentBid > bid.yourBid ? 
                '<span class="outbid">Outbid</span>' : 
                '<span class="winning">Winning</span>';
            
            bidElement.innerHTML = `
                <div class="bid-image">
                    <img src="${bid.image}" alt="${bid.name}">
                </div>
                <div class="bid-details">
                    <h3>${bid.name}</h3>
                    <p>Current Bid: $${bid.currentBid.toFixed(2)}</p>
                    <p>Your Bid: $${bid.yourBid.toFixed(2)}</p>
                    <p>Status: ${bidStatus}</p>
                    <p class="time-remaining">${timeRemainingText}</p>
                </div>
                <div class="bid-actions">
                    <button class="increase-bid-button">Increase Bid</button>
		    <a href="auction-ongoing.html" class="view-auction-button">View Market</a>
                </div>
            `;
            
            myBidsList.appendChild(bidElement);
        });
        
        // Update overview count
        document.getElementById('overview-bids-count').textContent = mockBids.length;
        
        // Add event listeners for bid buttons
        document.querySelectorAll('.increase-bid-button').forEach((button, index) => {
            button.addEventListener('click', () => {
                const newBid = prompt(`Enter your new bid for ${mockBids[index].name} (current highest: $${mockBids[index].currentBid.toFixed(2)})`);
                const bidAmount = parseFloat(newBid);
                
                if (!isNaN(bidAmount) && bidAmount > mockBids[index].currentBid) {
                    mockBids[index].yourBid = bidAmount;
                    mockBids[index].currentBid = bidAmount;
                    loadMyBids(); // Reload bids to show the change
                } else if (!isNaN(bidAmount)) {
                    alert('Your bid must be higher than the current bid!');
                }
            });
        });
    }

    // Load Watchlist
    function loadWatchlist() {
        const watchlistGrid = document.getElementById('my-watchlist-grid');
        watchlistGrid.innerHTML = '';
        
        mockWatchlist.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'watchlist-item';
            
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="card-image">
                <h3>${item.name}</h3>
                <p class="card-price">$${item.price.toFixed(2)}</p>
                <div class="watchlist-actions">
		    <a href="market.html" class="view-card-button">View</a>
                    <button class="remove-watch-button">Remove</button>
                </div>
            `;
            
            watchlistGrid.appendChild(itemElement);
        });
        
        // Update overview count
        document.getElementById('overview-watchlist-count').textContent = mockWatchlist.length;
        
        // Add event listeners for watchlist buttons
        document.querySelectorAll('.remove-watch-button').forEach((button, index) => {
            button.addEventListener('click', (e) => {
                const itemElement = e.target.closest('.watchlist-item');
                itemElement.remove();
                
                // Remove from mockWatchlist array
                mockWatchlist.splice(index, 1);
                
                // Update overview count
                document.getElementById('overview-watchlist-count').textContent = mockWatchlist.length;
            });
        });
    }

    // Settings Form
    const profileSettingsForm = document.querySelector('.profile-settings-form');
    profileSettingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const notificationPreferences = document.getElementById('notification-preferences').value.trim();
        
        if (email) {
            alert('Settings saved successfully!');
        } else {
            alert('Please enter a valid email address.');
        }
    });
    
    // Change Password Button
    const changePasswordButton = document.querySelector('.change-password-button');
    changePasswordButton.addEventListener('click', (e) => {
        e.preventDefault();
        
        const currentPassword = prompt('Enter your current password:');
        if (currentPassword) {
            const newPassword = prompt('Enter your new password:');
            if (newPassword) {
                const confirmPassword = prompt('Confirm your new password:');
                if (newPassword === confirmPassword) {
                    alert('Password changed successfully!');
                } else {
                    alert('Passwords do not match!');
                }
            }
        }
    });

    // Initialize page
    loadMyListings();
    loadMyBids();
    loadWatchlist();
});

// Profile Page Enhancements - Additional functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize dark mode based on body class
    function initializeDarkMode() {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }

    // Toggle dark mode on body element instead of stylesheet
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });
    
    // Initialize dark mode
    initializeDarkMode();

    // Call the function when the overview tab is clicked
    document.querySelector('[data-tab="overview"]').addEventListener('click', createActivityChart);
    
    // Also create the chart on initial load if overview is active
    if (document.querySelector('[data-tab="overview"]').classList.contains('active')) {
        setTimeout(createActivityChart, 500); // Small delay to ensure DOM is ready
    }

    // Search functionality for listings and watchlist
    function addSearchFunctionality() {
        // Create search bar for listings
        const myListingsSection = document.getElementById('my-listings');
        const listingsSearchContainer = document.createElement('div');
        listingsSearchContainer.className = 'search-container';
        listingsSearchContainer.innerHTML = `
            <input type="text" id="listings-search" placeholder="Search your listings..." class="search-input">
            <button id="listings-search-btn" class="search-button">Search</button>
        `;
        myListingsSection.insertBefore(listingsSearchContainer, myListingsSection.querySelector('p').nextSibling);
        
        // Create search bar for watchlist
        const watchlistSection = document.getElementById('watchlist');
        const watchlistSearchContainer = document.createElement('div');
        watchlistSearchContainer.className = 'search-container';
        watchlistSearchContainer.innerHTML = `
            <input type="text" id="watchlist-search" placeholder="Search your watchlist..." class="search-input">
            <button id="watchlist-search-btn" class="search-button">Search</button>
        `;
        watchlistSection.insertBefore(watchlistSearchContainer, watchlistSection.querySelector('p').nextSibling);
        
        // Listings search functionality
        document.getElementById('listings-search-btn').addEventListener('click', () => {
            const searchTerm = document.getElementById('listings-search').value.toLowerCase();
            const listingElements = document.querySelectorAll('#my-listings-grid .card-listing');
            
            listingElements.forEach(element => {
                const cardName = element.querySelector('h3').textContent.toLowerCase();
                const cardDescription = element.querySelector('.card-description').textContent.toLowerCase();
                
                if (cardName.includes(searchTerm) || cardDescription.includes(searchTerm)) {
                    element.style.display = 'block';
                } else {
                    element.style.display = 'none';
                }
            });
        });
        
        // Watchlist search functionality
        document.getElementById('watchlist-search-btn').addEventListener('click', () => {
            const searchTerm = document.getElementById('watchlist-search').value.toLowerCase();
            const watchlistElements = document.querySelectorAll('#my-watchlist-grid .watchlist-item');
            
            watchlistElements.forEach(element => {
                const cardName = element.querySelector('h3').textContent.toLowerCase();
                
                if (cardName.includes(searchTerm)) {
                    element.style.display = 'block';
                } else {
                    element.style.display = 'none';
                }
            });
        });
        
        // Also trigger search on Enter key
        document.getElementById('listings-search').addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                document.getElementById('listings-search-btn').click();
            }
        });
        
        document.getElementById('watchlist-search').addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                document.getElementById('watchlist-search-btn').click();
            }
        });
    }
    
    // Call the search functionality setup
    addSearchFunctionality();

    // Add card sort functionality
    function addSortingFunctionality() {
        // Create sorting controls for listings
        const myListingsGrid = document.getElementById('my-listings-grid');
        const listingsSortContainer = document.createElement('div');
        listingsSortContainer.className = 'sort-container';
        listingsSortContainer.innerHTML = `
            <label for="listings-sort">Sort by:</label>
            <select id="listings-sort" class="sort-select">
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
            </select>
        `;
        myListingsGrid.parentNode.insertBefore(listingsSortContainer, myListingsGrid);
        
        // Create sorting controls for watchlist
        const watchlistGrid = document.getElementById('my-watchlist-grid');
        const watchlistSortContainer = document.createElement('div');
        watchlistSortContainer.className = 'sort-container';
        watchlistSortContainer.innerHTML = `
            <label for="watchlist-sort">Sort by:</label>
            <select id="watchlist-sort" class="sort-select">
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
            </select>
        `;
        watchlistGrid.parentNode.insertBefore(watchlistSortContainer, watchlistGrid);
        
        // Listings sort functionality
        document.getElementById('listings-sort').addEventListener('change', (e) => {
            const sortValue = e.target.value;
            const listingElements = Array.from(document.querySelectorAll('#my-listings-grid .card-listing'));
            
            listingElements.sort((a, b) => {
                const nameA = a.querySelector('h3').textContent;
                const nameB = b.querySelector('h3').textContent;
                const priceA = parseFloat(a.querySelector('.card-price').textContent.replace('$', ''));
                const priceB = parseFloat(b.querySelector('.card-price').textContent.replace('$', ''));
                
                switch(sortValue) {
                    case 'name-asc':
                        return nameA.localeCompare(nameB);
                    case 'name-desc':
                        return nameB.localeCompare(nameA);
                    case 'price-asc':
                        return priceA - priceB;
                    case 'price-desc':
                        return priceB - priceA;
                    default:
                        return 0;
                }
            });
            
            // Re-append elements in the new order
            const listingsGrid = document.getElementById('my-listings-grid');
            listingElements.forEach(element => {
                listingsGrid.appendChild(element);
            });
        });
        
        // Watchlist sort functionality
        document.getElementById('watchlist-sort').addEventListener('change', (e) => {
            const sortValue = e.target.value;
            const watchlistElements = Array.from(document.querySelectorAll('#my-watchlist-grid .watchlist-item'));
            
            watchlistElements.sort((a, b) => {
                const nameA = a.querySelector('h3').textContent;
                const nameB = b.querySelector('h3').textContent;
                const priceA = parseFloat(a.querySelector('.card-price').textContent.replace('$', ''));
                const priceB = parseFloat(b.querySelector('.card-price').textContent.replace('$', ''));
                
                switch(sortValue) {
                    case 'name-asc':
                        return nameA.localeCompare(nameB);
                    case 'name-desc':
                        return nameB.localeCompare(nameA);
                    case 'price-asc':
                        return priceA - priceB;
                    case 'price-desc':
                        return priceB - priceA;
                    default:
                        return 0;
                }
            });
            
            // Re-append elements in the new order
            const watchlistGrid = document.getElementById('my-watchlist-grid');
            watchlistElements.forEach(element => {
                watchlistGrid.appendChild(element);
            });
        });
    }
    
    // Call the sorting functionality setup
    addSortingFunctionality();

    // Add notifications feature
    function addNotificationsFeature() {
        // Create notifications button in header
        const nav = document.querySelector('nav ul');
        const notificationsLi = document.createElement('li');
        const notificationsLink = document.createElement('a');
        notificationsLink.href = '#';
        notificationsLink.id = 'notifications-btn';
        notificationsLink.innerHTML = `
            Notifications <span class="notification-badge">3</span>
        `;
        notificationsLi.appendChild(notificationsLink);
        nav.appendChild(notificationsLi);
        
        // Create notifications panel
        const notificationsPanel = document.createElement('div');
        notificationsPanel.id = 'notifications-panel';
        notificationsPanel.className = 'notifications-panel';
        notificationsPanel.style.display = 'none';
        
        // Add notifications content
        notificationsPanel.innerHTML = `
            <div class="notifications-header">
                <h3>Notifications</h3>
                <button id="mark-all-read">Mark all as read</button>
            </div>
            <div class="notifications-list">
                <div class="notification-item unread">
                    <div class="notification-content">
                        <p><strong>Bid update:</strong> You've been outbid on "Crystal Mage".</p>
                        <span class="notification-time">10 minutes ago</span>
                    </div>
                    <button class="mark-read-btn">✓</button>
                </div>
                <div class="notification-item unread">
                    <div class="notification-content">
                        <p><strong>Price drop:</strong> "Silver Dragon" on your watchlist is now $25 cheaper!</p>
                        <span class="notification-time">2 hours ago</span>
                    </div>
                    <button class="mark-read-btn">✓</button>
                </div>
                <div class="notification-item unread">
                    <div class="notification-content">
                        <p><strong>Card sold:</strong> Your "Forest Guardian" card has been sold for $75.50!</p>
                        <span class="notification-time">1 day ago</span>
                    </div>
                    <button class="mark-read-btn">✓</button>
                </div>
                <div class="notification-item">
                    <div class="notification-content">
                        <p><strong>New message:</strong> Support team has responded to your inquiry.</p>
                        <span class="notification-time">3 days ago</span>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(notificationsPanel);
        
        // Toggle notifications panel
        document.getElementById('notifications-btn').addEventListener('click', (e) => {
            e.preventDefault();
            const panel = document.getElementById('notifications-panel');
            
            if (panel.style.display === 'none') {
                panel.style.display = 'block';
                // Position the panel below the notifications button
                const buttonRect = e.target.getBoundingClientRect();
                panel.style.top = (buttonRect.bottom + window.scrollY) + 'px';
                panel.style.right = (window.innerWidth - buttonRect.right) + 'px';
            } else {
                panel.style.display = 'none';
            }
        });
        
        // Close panel when clicking outside
        document.addEventListener('click', (e) => {
            const panel = document.getElementById('notifications-panel');
            const button = document.getElementById('notifications-btn');
            
            if (panel.style.display === 'block' && 
                !panel.contains(e.target) &&
                !button.contains(e.target)) {
                panel.style.display = 'none';
            }
        });
        
        // Mark individual notifications as read
        document.querySelectorAll('.mark-read-btn').forEach(button => {
            button.addEventListener('click', () => {
                const item = button.closest('.notification-item');
                item.classList.remove('unread');
                button.style.display = 'none';
                
                // Update notification count
                updateNotificationCount();
            });
        });
        
        // Mark all as read
        document.getElementById('mark-all-read').addEventListener('click', () => {
            document.querySelectorAll('.notification-item.unread').forEach(item => {
                item.classList.remove('unread');
                item.querySelector('.mark-read-btn').style.display = 'none';
            });
            
            // Update notification count
            updateNotificationCount();
        });
        
        // Function to update notification count
        function updateNotificationCount() {
            const unreadCount = document.querySelectorAll('.notification-item.unread').length;
            const badge = document.querySelector('.notification-badge');
            
            if (unreadCount > 0) {
                badge.textContent = unreadCount;
                badge.style.display = 'inline-block';
            } else {
                badge.style.display = 'none';
            }
        }
    }
    
    // Call the notifications feature setup
    addNotificationsFeature();
});

   // This code should be added to your script.js file

document.addEventListener('DOMContentLoaded', function() {
    // Elements for username editing
    const displayUsername = document.getElementById('display-username');
    const overviewUsername = document.getElementById('overview-username');
    const editUsernameBtn = document.getElementById('edit-username-btn');
    const editUsernameInput = document.getElementById('edit-username-input');
    const saveUsernameBtn = document.getElementById('save-username-btn');
    const cancelUsernameBtn = document.getElementById('cancel-username-btn');
    
    // Variable to store original username in case of cancel
    let originalUsername = displayUsername.textContent;
    
    // Function to enter edit mode
    function enterEditMode() {
        // Store current username in case user cancels
        originalUsername = displayUsername.textContent;
        
        // Hide username display and edit button
        displayUsername.style.display = 'none';
        editUsernameBtn.style.display = 'none';
        
        // Show input field and buttons
        editUsernameInput.style.display = 'inline-block';
        saveUsernameBtn.style.display = 'inline-block';
        cancelUsernameBtn.style.display = 'inline-block';
        
        // Set input value to current username and focus
        editUsernameInput.value = originalUsername;
        editUsernameInput.focus();
    }
    
    // Function to save username
    function saveUsername() {
        const newUsername = editUsernameInput.value.trim();
        
        // Validate username
        if (newUsername === '') {
            alert('Username cannot be empty!');
            return;
        }
        
        // Update username in all locations
        displayUsername.textContent = newUsername;
        overviewUsername.textContent = newUsername;
        
        // Exit edit mode
        exitEditMode();
    }
    
    // Function to exit edit mode
    function exitEditMode() {
        // Show username display and edit button
        displayUsername.style.display = 'inline';
        editUsernameBtn.style.display = 'inline-block';
        
        // Hide input field and buttons
        editUsernameInput.style.display = 'none';
        saveUsernameBtn.style.display = 'none';
        cancelUsernameBtn.style.display = 'none';
    }
    
    // Function to cancel edit (revert to original username)
    function cancelEdit() {
        // No need to revert username as we didn't change it yet
        exitEditMode();
    }
    
    // Event listeners
    editUsernameBtn.addEventListener('click', enterEditMode);
    saveUsernameBtn.addEventListener('click', saveUsername);
    cancelUsernameBtn.addEventListener('click', cancelEdit);
    
    // Allow saving with Enter key
    editUsernameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            saveUsername();
        }
    });

    // Profile tab functionality (assuming this is needed)
    const profileTabs = document.querySelectorAll('.profile-tab');
    const profileContents = document.querySelectorAll('.profile-content');
    
    profileTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            profileTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all content sections
            profileContents.forEach(content => content.classList.remove('active'));
            
            // Show the content section corresponding to clicked tab
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Dark mode toggle (assuming this is needed)
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const darkModeStylesheet = document.getElementById('dark-mode-stylesheet');
    
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
    });
});