document.addEventListener('DOMContentLoaded', function() {
    // Card filtering functionality
    const searchInput = document.querySelector('.search-filter input');
    const categorySelect = document.querySelector('.search-filter select');
    const cardItems = document.querySelectorAll('.card-item');
    
    // Store original card data for filtering
    const originalCards = [];
    cardItems.forEach(card => {
        originalCards.push({
            element: card,
            title: card.querySelector('h3').textContent.toLowerCase(),
            price: card.querySelector('p').textContent.toLowerCase(),
            visible: true
        });
    });
    
    // Add event listeners for filtering
    searchInput.addEventListener('input', debounce(filterCards, 300));
    categorySelect.addEventListener('change', filterCards);
    
    // Initialize the page with session storage data if available
    initializePage();
    
    // Function to filter cards based on search and category
    function filterCards() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categorySelect.value.toLowerCase();
        
        // Save to session storage
        sessionStorage.setItem('cardSearchTerm', searchTerm);
        sessionStorage.setItem('cardCategory', selectedCategory);
        
        // Hide all cards initially
        let visibleCount = 0;
        
        originalCards.forEach(card => {
            // Check if card matches search term
            const matchesSearch = card.title.includes(searchTerm) || 
                                  card.price.includes(searchTerm);
            
            // Check if card matches selected category
            let matchesCategory = true;
            if (selectedCategory) {
                const isPokemon = card.title.includes('charizard') || 
                                  card.title.includes('pikachu') || 
                                  card.title.includes('blastoise') ||
                                  card.title.includes('venusaur') ||
                                  card.title.includes('mew') ||
                                  card.title.includes('mewtwo') ||
                                  card.title.includes('gyarados') ||
                                  card.title.includes('espeon') ||
                                  card.title.includes('snorlax');
                
                // Extract price as a number
                const priceStr = card.price.match(/\$[\d,]+\.\d+/);
                const price = priceStr ? parseFloat(priceStr[0].replace(/[$,]/g, '')) : 0;
                
                const isRare = price > 100;
                
                const isFirstEdition = card.title.includes('1st edition') || 
                                       card.title.includes('first edition');
                
                switch(selectedCategory) {
                    case 'pokemon':
                        matchesCategory = isPokemon;
                        break;
                    case 'rare':
                        matchesCategory = isRare;
                        break;
                    case 'first-edition':
                        matchesCategory = isFirstEdition;
                        break;
                }
            }
            
            // Show or hide the card based on filters
            if (matchesSearch && matchesCategory) {
                card.element.style.display = '';
                card.visible = true;
                visibleCount++;
            } else {
                card.element.style.display = 'none';
                card.visible = false;
            }
        });
        
        // Update UI based on filter results
        updateFilterResultsUI(visibleCount);
    }
    
    // Function to update UI based on filter results
    function updateFilterResultsUI(visibleCount) {
        const pagination = document.querySelector('.pagination');
        
        // Remove existing no-results message if it exists
        const existingNoResults = document.querySelector('.no-results');
        if (existingNoResults) {
            existingNoResults.remove();
        }
        
        if (visibleCount === 0) {
            // No results found
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.innerHTML = `
                <p>No cards found matching your criteria.</p>
                <button class="reset-filters">Reset Filters</button>
            `;
            
            // Add no-results message before pagination
            pagination.parentNode.insertBefore(noResults, pagination);
            
            // Add event listener to reset button
            const resetButton = noResults.querySelector('.reset-filters');
            resetButton.addEventListener('click', resetFilters);
            
            // Hide pagination when no results
            pagination.style.display = 'none';
        } else {
            // Show pagination when there are results
            pagination.style.display = 'flex';
        }
        
        // Update the filter badge/pill display
        updateFilterBadges();
    }
    
    // Function to reset all filters
    function resetFilters() {
        searchInput.value = '';
        categorySelect.selectedIndex = 0;
        
        // Clear session storage
        sessionStorage.removeItem('cardSearchTerm');
        sessionStorage.removeItem('cardCategory');
        
        // Show all cards
        originalCards.forEach(card => {
            card.element.style.display = '';
            card.visible = true;
        });
        
        // Update UI
        updateFilterResultsUI(originalCards.length);
    }
    
    // Function to update filter badges/pills
    function updateFilterBadges() {
        // Check if active-filters container exists, create if not
        let activeFilters = document.querySelector('.active-filters');
        if (!activeFilters) {
            activeFilters = document.createElement('div');
            activeFilters.className = 'active-filters';
            const marketHeader = document.querySelector('.market-header');
            marketHeader.appendChild(activeFilters);
        } else {
            // Clear existing filters
            activeFilters.innerHTML = '';
        }
        
        // Add search term pill if exists
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            const pill = document.createElement('div');
            pill.className = 'filter-pill';
            pill.innerHTML = `Search: ${searchTerm} <span class="remove">×</span>`;
            activeFilters.appendChild(pill);
            
            // Add click event to remove pill
            pill.querySelector('.remove').addEventListener('click', function() {
                searchInput.value = '';
                filterCards();
            });
        }
        
        // Add category pill if selected
        const category = categorySelect.value;
        if (category) {
            const categoryText = categorySelect.options[categorySelect.selectedIndex].text;
            const pill = document.createElement('div');
            pill.className = 'filter-pill';
            pill.innerHTML = `Category: ${categoryText} <span class="remove">×</span>`;
            activeFilters.appendChild(pill);
            
            // Add click event to remove pill
            pill.querySelector('.remove').addEventListener('click', function() {
                categorySelect.selectedIndex = 0;
                filterCards();
            });
        }
        
        // Hide the container if no active filters
        if (!searchTerm && !category) {
            activeFilters.style.display = 'none';
        } else {
            activeFilters.style.display = 'flex';
        }
    }
    
    // Function to initialize page with stored filter values
    function initializePage() {
        // Load stored values
        const storedSearchTerm = sessionStorage.getItem('cardSearchTerm');
        const storedCategory = sessionStorage.getItem('cardCategory');
        
        // Apply stored values if they exist
        if (storedSearchTerm) {
            searchInput.value = storedSearchTerm;
        }
        
        if (storedCategory) {
            for (let i = 0; i < categorySelect.options.length; i++) {
                if (categorySelect.options[i].value.toLowerCase() === storedCategory) {
                    categorySelect.selectedIndex = i;
                    break;
                }
            }
        }
        
        // Apply filters if any are stored
        if (storedSearchTerm || storedCategory) {
            filterCards();
        }
        
        // Highlight active page in pagination
        highlightActivePage();
        
        // Add badges to special cards
        applySpecialBadges();
        
        // Add back to top button
        addBackToTopButton();
    }
    
    // Function to highlight the active page in pagination
    function highlightActivePage() {
        const currentPage = window.location.pathname;
        const paginationLinks = document.querySelectorAll('.pagination a');
        
        paginationLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href) {
                const hrefPath = href.split('/').pop();
                const currentPath = currentPage.split('/').pop();
                
                if (hrefPath === currentPath) {
                    link.classList.add('active');
                } else if (currentPath === '' && hrefPath === 'market.html') {
                    // Handle case for root URL
                    link.classList.add('active');
                }
            }
        });
    }
    
    // Function to apply special badges to cards
    function applySpecialBadges() {
        cardItems.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const priceText = card.querySelector('p').textContent;
            const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
            
            // Check for first edition
            if (title.includes('1st edition') || title.includes('first edition')) {
                card.classList.add('first-edition');
            }
            
            // Check for rare cards (price > $100)
            if (price > 100) {
                card.classList.add('rare-card');
            }
            
		// Make cards clickable
document.addEventListener('click', function() {
    // Define card URLs here
    const cardUrls = {
        "charizard": "https://example.com/charizard",
        "pikachu": "https://example.com/pikachu",
        "blastoise": "https://example.com/blastoise",
        "venusaur": "https://www.pricecharting.com/game/pokemon-base-set/venusaur-15",
        "mewtwo": "https://example.com/mewtwo"
    };

    // Make cards clickable
    document.querySelectorAll('.card-item').forEach(card => {
        card.style.cursor = 'pointer'; // Set cursor to pointer

        card.addEventListener('click', function() {
            const cardTitle = this.querySelector('h3').textContent.toLowerCase(); // Get card title
            const url = cardUrls[cardTitle]; // Find URL from object

            if (url) {
                window.location.href = url; // Redirect to URL
            } else {
                console.warn("No URL found for:", cardTitle); // Debugging if no URL is set
            }
        });
    });
});

        });
    }
    
    // Function to add back to top button
    function addBackToTopButton() {
        const backToTopBtn = document.createElement('div');
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.innerHTML = '&uarr;';
        document.body.appendChild(backToTopBtn);
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top when clicked
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Handle image error loading
    const cardImages = document.querySelectorAll('.card-item img');
    cardImages.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'placeholder-default.jpg';
            this.onerror = () => {
                this.style.background = '#e0f7fa';
                this.style.height = '200px';
                this.alt = 'Card image placeholder';
            };
        });
    });
    
    // Utility function to debounce (prevent too many calls)
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                func.apply(context, args);
            }, wait);
        };
    }
});