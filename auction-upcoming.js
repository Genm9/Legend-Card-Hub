// Upcoming Auctions JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Sample upcoming auction data (in a real app, this would come from a database)
    const upcomingAuctions = [
        { id: 4, name: "Charizard VMAX", startingBid: 250.00, startsIn: 2 * 24 * 60 * 60 }, // 2d in seconds
        { id: 5, name: "Lugia PSA 10", startingBid: 1200.00, startsIn: 5 * 24 * 60 * 60 } // 5d in seconds
    ];
    
    // Initialize search functionality
    const searchInput = document.querySelector('.auction-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterAuctions(searchInput.value);
        });
    }
    
    // Initialize notify buttons
    const notifyButtons = document.querySelectorAll('.notify-btn');
    notifyButtons.forEach(btn => {
        btn.addEventListener('click', handleNotifyMe);
    });
    
    // Start countdown timers
    updateStartCountdowns();
    // Update countdowns every second
    setInterval(updateStartCountdowns, 1000);
    
    /**
     * Update all countdown timers for auction starts
     */
    function updateStartCountdowns() {
        document.querySelectorAll('.countdown-start').forEach(element => {
            let startsIn = parseInt(element.dataset.startsIn);
            
            if (startsIn <= 0) {
                element.textContent = 'Starting Now!';
                element.parentElement.classList.add('starting');
            } else {
                // Decrease time by 1 second
                startsIn--;
                element.dataset.startsIn = startsIn;
                
                // Calculate days, hours, minutes, seconds
                const days = Math.floor(startsIn / (24 * 60 * 60));
                const hours = Math.floor((startsIn % (24 * 60 * 60)) / (60 * 60));
                const minutes = Math.floor((startsIn % (60 * 60)) / 60);
                const seconds = startsIn % 60;
                
                // Update display
                if (days > 0) {
                    element.textContent = `Starts In: ${days}d ${hours}h ${minutes}m ${seconds}s`;
                } else if (hours > 0) {
                    element.textContent = `Starts In: ${hours}h ${minutes}m ${seconds}s`;
                } else {
                    element.textContent = `Starts In: ${minutes}m ${seconds}s`;
                }
            }
        });
    }
    
    /**
     * Handle notify me button click
     * @param {Event} event - The click event
     */
    function handleNotifyMe(event) {
        const auctionItem = event.target.closest('.auction-item');
        const auctionName = auctionItem.querySelector('h3').textContent;
        
        // In a real app, this would set up a notification in the database
        alert(`You will be notified when the auction for ${auctionName} begins.`);
        
        // Change button text to show it's been clicked
        event.target.textContent = 'Notification Set';
        event.target.classList.add('notified');
    }
    
    /**
     * Filter auctions based on search input
     * @param {string} searchTerm - The search term
     */
    function filterAuctions(searchTerm) {
        searchTerm = searchTerm.toLowerCase();
        
        const auctionItems = document.querySelectorAll('.auction-item');
        auctionItems.forEach(item => {
            const cardName = item.querySelector('h3').textContent.toLowerCase();
            
            if (cardName.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
});