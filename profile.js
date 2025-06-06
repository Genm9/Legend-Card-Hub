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
                    <a href="auction-ongoing.html"</a> <button class="view-auction-button">View Auction</button>
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
                    <a href="market.html"</a> <button class="view-card-button">View</button>
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