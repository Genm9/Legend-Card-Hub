document.addEventListener('DOMContentLoaded', function() {
    // ... (rest of your existing script.js code) ...

    // Profile Page Elements
    const profileTabs = document.querySelectorAll('.profile-tab');
    const profileContents = document.querySelectorAll('.profile-content');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const darkModeStylesheet = document.getElementById('dark-mode-stylesheet');
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedDarkMode = localStorage.getItem('darkMode');

    const editProfilePicBtn = document.getElementById('edit-profile-pic-btn');
    const uploadProfilePicInput = document.getElementById('upload-profile-pic');
    const profilePic = document.getElementById('profile-pic');

    const displayUsername = document.getElementById('display-username');
    const overviewUsername = document.getElementById('overview-username');
    const editUsernameBtn = document.getElementById('edit-username-btn');
    const editUsernameInput = document.getElementById('edit-username-input');
    const saveUsernameBtn = document.getElementById('save-username-btn');
    const cancelUsernameBtn = document.getElementById('cancel-username-btn');

    // Overview Section Elements
    const overviewListingsCount = document.getElementById('overview-listings-count');
    const overviewBidsCount = document.getElementById('overview-bids-count');
    const overviewWatchlistCount = document.getElementById('overview-watchlist-count');

    // My Listings Section Elements
    const myListingsGrid = document.getElementById('my-listings-grid');
    const addListingButton = document.getElementById('add-listing-button');
    const editListingForm = document.getElementById('edit-listing-form');
    const saveEditListingButton = document.getElementById('save-edit-listing-button');
    const cancelEditListingButton = document.getElementById('cancel-edit-listing-button');
    const editListingNameInput = document.getElementById('edit-listing-name');
    const editListingDescriptionInput = document.getElementById('edit-listing-description');
    const editListingPriceInput = document.getElementById('edit-listing-price');

    // My Bids and Watchlist
    const myBidsList = document.getElementById('my-bids-list');
    const myWatchlistGrid = document.getElementById('my-watchlist-grid');

    let editingListingId = null;  // Track which listing is being edited

    // Data Storage (Use LocalStorage for simplicity - replace with server calls in real app)
    let userListings = JSON.parse(localStorage.getItem('userListings')) || [
        { id: 1, name: 'Charizard', description: 'Holo, 1st Edition', price: 250 },
        { id: 2, name: 'Pikachu', description: 'Base Set, Mint', price: 100 },
    ];
    let userBids = JSON.parse(localStorage.getItem('userBids')) || [
        { id: 101, auctionName: 'Rare Charizard Auction', bid: 150, leadingBid: 200, endsIn: '2 days' },
    ];
    let userWatchlist = JSON.parse(localStorage.getItem('userWatchlist')) || [
        { id: 201, name: 'Blastoise', price: 75 },
    ];
    let currentUsername = localStorage.getItem('username') || 'User123';

    // --- Helper Functions ---
    function renderListings() {
        myListingsGrid.innerHTML = '';
        userListings.forEach(listing => {
            const listingElement = document.createElement('div');
            listingElement.classList.add('market-card-item');
            listingElement.innerHTML = `
                <img src="placeholder-card.png" alt="${listing.name}">
                <h3>${listing.name}</h3>
                <p>${listing.description}</p>
                <p>Price: $${listing.price.toFixed(2)}</p>
                <button class="edit-button" data-id="${listing.id}">Edit</button>
                <button class="remove-button" data-id="${listing.id}">Remove</button>
            `;
            myListingsGrid.appendChild(listingElement);
        });
        overviewListingsCount.textContent = userListings.length;
        localStorage.setItem('userListings', JSON.stringify(userListings));
    }

    function renderBids() {
        myBidsList.innerHTML = '';
        userBids.forEach(bid => {
            const bidElement = document.createElement('div');
            bidElement.classList.add('auction-bid-item');
            bidElement.innerHTML = `
                <img src="placeholder-auction.png" alt="${bid.auctionName}">
                <div>
                    <h3>${bid.auctionName}</h3>
                    <p>Your Bid: $${bid.bid.toFixed(2)}</p>
                    <p>Current Leading Bid: $${bid.leadingBid.toFixed(2)}</p>
                    <p>Ends In: ${bid.endsIn}</p>
                </div>
                <button class="withdraw-bid-button" data-id="${bid.id}">Withdraw Bid</button>
            `;
            myBidsList.appendChild(bidElement);
        });
        overviewBidsCount.textContent = userBids.length;
        localStorage.setItem('userBids', JSON.stringify(userBids));
    }

    function renderWatchlist() {
        myWatchlistGrid.innerHTML = '';
        userWatchlist.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('market-card-item');
            itemElement.innerHTML = `
                <img src="placeholder-card.png" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>Current Price: $${item.price.toFixed(2)}</p>
                <button class="remove-watchlist-button" data-id="${item.id}">Remove</button>
            `;
            myWatchlistGrid.appendChild(itemElement);
        });
        overviewWatchlistCount.textContent = userWatchlist.length;
        localStorage.setItem('userWatchlist', JSON.stringify(userWatchlist));
    }

    // --- Event Listeners ---

    // Initial Renders
    renderListings();
    renderBids();
    renderWatchlist();
    overviewUsername.textContent = currentUsername;

    // Dark Mode
      if (storedDarkMode === 'enabled' || (storedDarkMode === null && prefersDarkMode)) {
        darkModeStylesheet.href = 'dark-mode.css';
    }

    profileTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            profileTabs.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            profileContents.forEach(content => content.classList.remove('active'));
            const tabId = this.dataset.tab;
            const selectedContent = document.getElementById(tabId);
            if (selectedContent) {
                selectedContent.classList.add('active');
            }
        });
    });

    darkModeToggle.addEventListener('click', function() {
        if (darkModeStylesheet.href) {
            darkModeStylesheet.href = '';
            localStorage.setItem('darkMode', 'disabled');
        } else {
            darkModeStylesheet.href = 'dark-mode.css';
            localStorage.setItem('darkMode', 'enabled');
        }
    });

    // Profile Picture
    editProfilePicBtn.addEventListener('click', () => {
        uploadProfilePicInput.click();
    });

    uploadProfilePicInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                profilePic.src = e.target.result;
                localStorage.setItem('profilePic', e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });
      const storedProfilePic = localStorage.getItem('profilePic');
    if (storedProfilePic) {
        profilePic.src = storedProfilePic;
    }

    // Username
    editUsernameBtn.addEventListener('click', () => {
        displayUsername.style.display = 'none';
        editUsernameBtn.style.display = 'none';
        editUsernameInput.style.display = 'inline-block';
        saveUsernameBtn.style.display = 'inline-block';
        cancelUsernameBtn.style.display = 'inline-block';
    });

    saveUsernameBtn.addEventListener('click', () => {
        const newUsername = editUsernameInput.value.trim();
        if (newUsername) {
            currentUsername = newUsername;
            displayUsername.textContent = currentUsername;
             overviewUsername.textContent = currentUsername;
            localStorage.setItem('username', currentUsername);
            displayUsername.style.display = 'inline-block';
            editUsernameBtn.style.display = 'inline-block';
            editUsernameInput.style.display = 'none';
            saveUsernameBtn.style.display = 'none';
            cancelUsernameBtn.style.display = 'none';
        } else {
            alert('Username cannot be empty.');
        }
    });

    cancelUsernameBtn.addEventListener('click', () => {
        editUsernameInput.value = currentUsername;
        displayUsername.style.display = 'inline-block';
        editUsernameBtn.style.display = 'inline-block';
        editUsernameInput.style.display = 'none';
        saveUsernameBtn.style.display = 'none';
        cancelUsernameBtn.style.display = 'none';
    });

    // My Listings
    addListingButton.addEventListener('click', () => {
        editingListingId = null; // Clear any previous editing state
        editListingForm.style.display = 'block';
        editListingNameInput.value = '';
        editListingDescriptionInput.value = '';
        editListingPriceInput.value = '';
    });

    saveEditListingButton.addEventListener('click', () => {
        const name = editListingNameInput.value.trim();
        const description = editListingDescriptionInput.value.trim();
        const price = parseFloat(editListingPriceInput.value);

        if (name && description && !isNaN(price) && price > 0) {
            if (editingListingId) {
                // Update existing listing
                const index = userListings.findIndex(listing => listing.id === editingListingId);
                if (index !== -1) {
                    userListings[index] = { id: editingListingId, name, description, price };
                }
            } else {
                // Add new listing
                const newId = userListings.length > 0 ? Math.max(...userListings.map(l => l.id)) + 1 : 1;
                userListings.push({ id: newId, name, description, price });
            }
            renderListings();
            editListingForm.style.display = 'none';
        } else {
            alert('Please fill in all fields with valid values.');
        }
    });

    cancelEditListingButton.addEventListener('click', () => {
        editListingForm.style.display = 'none';
    });

    myListingsGrid.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('edit-button')) {
            const id = parseInt(target.dataset.id);
            editingListingId = id;
            const listingToEdit = userListings.find(listing => listing.id === id);
            if (listingToEdit) {
                editListingNameInput.value = listingToEdit.name;
                editListingDescriptionInput.value = listingToEdit.description;
                editListingPriceInput.value = listingToEdit.price;
                editListingForm.style.display = 'block';
            }
        } else if (target.classList.contains('remove-button')) {
            const id = parseInt(target.dataset.id);
            userListings = userListings.filter(listing => listing.id !== id);
            renderListings();
        }
    });

    // My Bids
    myBidsList.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('withdraw-bid-button')) {
            const id = parseInt(target.dataset.id);
            userBids = userBids.filter(bid => bid.id !== id);
            renderBids();
        }
    });

    // Watchlist
    myWatchlistGrid.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('remove-watchlist-button')) {
            const id = parseInt(target.dataset.id);
            userWatchlist = userWatchlist.filter(item => item.id !== id);
            renderWatchlist();
        }
    });
});