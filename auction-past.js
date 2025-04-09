// Past Auctions JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Sample past auction data (in a real app, this would come from a database)
    const pastAuctions = [
        { id: 6, name: "Blastoise 1st Edition", finalBid: 1800.00, endedAt: "2025-03-28" },
        { id: 7, name: "Pikachu Illustrator", finalBid: 25000.00, endedAt: "2025-03-15" }
    ];
    
    // Initialize search functionality
    const searchInput = document.querySelector('.auction-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterAuctions(searchInput.value);
        });
    }
    
    // Initialize view results buttons
    const viewResultsButtons = document.querySelectorAll('.view-results-btn');
    viewResultsButtons.forEach(btn => {
        btn.addEventListener('click', handleViewResults);
    });
    
    /**
     * Handle view results button click
     * @param {Event} event - The click event
     */
    function handleViewResults(event) {
        const auctionItem = event.target.closest('.auction-item');
        const auctionId = parseInt(auctionItem.dataset.id);
        const auction = pastAuctions.find(a => a.id === auctionId);
        
        if (!auction) return;
        
        // In a real app, this would navigate to a detailed results page
        alert(`
            Auction Results for ${auction.name}:
            
            Final Bid: $${auction.finalBid.toFixed(2)}
            Ended On: ${auction.endedAt}
            
            Winner: John
            Total Bids: 24
            Starting Price: $${(auction.finalBid * 0.2).toFixed(2)}
        `);
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