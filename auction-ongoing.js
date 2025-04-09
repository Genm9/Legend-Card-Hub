// Ongoing Auctions JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Sample ongoing auction data (in a real app, this would come from a database)
    const ongoingAuctions = [
        { id: 1, name: "Arceus VSTAR", currentBid: 20.00, timeLeft: 34 * 60 * 60 + 10 * 60 * 60 }, // 1d 10h in seconds
        { id: 2, name: "Rayquaza Gold Star", currentBid: 5500.00, timeLeft: 6 * 24 * 60 * 60 + 15 * 60 * 60 }, // 6d 15h in seconds
        { id: 3, name: "Umbreon VMAX Alt Art", currentBid: 1400.00, timeLeft: 3 * 24 * 60 * 60 } // 3d in seconds
    ];
    
    // Initialize search functionality
    const searchInput = document.querySelector('.auction-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterAuctions(searchInput.value);
        });
    }
    
    // Initialize bid buttons
    const bidButtons = document.querySelectorAll('.place-bid-btn');
    bidButtons.forEach(btn => {
        btn.addEventListener('click', handleBidPlacement);
    });
    
    // Start countdown timers
    updateCountdowns();
    // Update countdowns every second
    setInterval(updateCountdowns, 1000);
    
    /**
     * Update all countdown timers
     */
    function updateCountdowns() {
        document.querySelectorAll('.countdown').forEach(element => {
            let timeLeft = parseInt(element.dataset.timeLeft);
            
            if (timeLeft <= 0) {
                element.textContent = 'Auction Ended';
                element.parentElement.classList.add('ended');
            } else {
                // Decrease time by 1 second
                timeLeft--;
                element.dataset.timeLeft = timeLeft;
                
                // Calculate days, hours, minutes, seconds
                const days = Math.floor(timeLeft / (24 * 60 * 60));
                const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
                const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
                const seconds = timeLeft % 60;
                
                // Update display
                if (days > 0) {
                    element.textContent = `Time Left: ${days}d ${hours}h ${minutes}m ${seconds}s`;
                } else if (hours > 0) {
                    element.textContent = `Time Left: ${hours}h ${minutes}m ${seconds}s`;
                } else {
                    element.textContent = `Time Left: ${minutes}m ${seconds}s`;
                }
            }
        });
    }
    
    /**
     * Handle bid placement
     * @param {Event} event - The click event
     */
    function handleBidPlacement(event) {
        const auctionId = parseInt(event.target.dataset.auctionId);
        const auction = ongoingAuctions.find(a => a.id === auctionId);
        
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