/**
 * Payment Component for Legend Card Hub
 * 
 * This script creates a reusable payment modal that can be included in all pages.
 * It handles payment processing functionality for both market purchases and auction bids.
 */

class PaymentComponent {
    constructor() {
        this.paymentMethods = [];
        this.currentItem = null;
        this.init();
    }

    init() {
        // Check if user has saved payment methods (from localStorage)
        this.loadPaymentMethods();
        
        // Create payment modal HTML
        this.createPaymentModal();
        
        // Add event listeners
        this.addEventListeners();
    }

    loadPaymentMethods() {
        // Check localStorage for saved payment methods
        const paymentData = localStorage.getItem('legendCardHub_paymentMethods');
        if (paymentData) {
            try {
                this.paymentMethods = JSON.parse(paymentData);
            } catch (e) {
                console.error('Error parsing payment data:', e);
                localStorage.removeItem('legendCardHub_paymentMethods');
            }
        }
    }

    createPaymentModal() {
        // Create modal container
        const modalContainer = document.createElement('div');
        modalContainer.id = 'payment-modal-container';
        modalContainer.classList.add('payment-modal-container');
        modalContainer.style.display = 'none';
        
        // Create modal HTML
        modalContainer.innerHTML = `
            <div class="payment-modal">
                <div class="payment-close-btn">&times;</div>
                <div class="payment-header">
                    <div class="payment-logo">💳 Secure Payment 💳</div>
                </div>
                
                <div class="toggle-container">
                    <button class="toggle-btn active" id="card-toggle">Credit Card</button>
                    <button class="toggle-btn" id="paypal-toggle">PayPal</button>
                    <div class="toggle-slider"></div>
                </div>
                
                <div id="item-details" class="item-details">
                    <h3>Item Details</h3>
                    <div id="item-info"></div>
                    <div id="item-price"></div>
                </div>
                
                <div id="card-form-container">
                    <h2 class="form-title">Enter Card Details</h2>
                    <form id="card-payment-form">
                        <div class="form-group">
                            <input type="text" id="card-name" class="form-input" placeholder="Cardholder Name" required>
                        </div>
                        <div class="form-group">
                            <input type="text" id="card-number" class="form-input" placeholder="Card Number" required pattern="[0-9]{13,19}">
                        </div>
                        <div class="form-row">
                            <div class="form-group half">
                                <input type="text" id="card-expiry" class="form-input" placeholder="MM/YY" required pattern="(0[1-9]|1[0-2])\/([0-9]{2})">
                            </div>
                            <div class="form-group half">
                                <input type="text" id="card-cvv" class="form-input" placeholder="CVV" required pattern="[0-9]{3,4}">
                            </div>
                        </div>
                        <div class="form-group">
                            <input type="text" id="card-address" class="form-input" placeholder="Billing Address" required>
                        </div>
                        <div class="save-payment-method">
                            <input type="checkbox" id="save-payment" checked>
                            <label for="save-payment">Save payment method for future purchases</label>
                        </div>
                        <button type="submit" class="submit-btn">Complete Payment</button>
                    </form>
                </div>
                
                <div id="paypal-form-container" style="display: none;">
                    <h2 class="form-title">PayPal Checkout</h2>
                    <div class="paypal-info">
                        <p>You will be redirected to PayPal to complete your payment securely.</p>
                    </div>
                    <button id="paypal-checkout-btn" class="submit-btn">Proceed to PayPal</button>
                </div>
                
                <div id="saved-payment-methods" style="display: none;">
                    <h3>Saved Payment Methods</h3>
                    <div id="payment-methods-list"></div>
                </div>
            </div>
        `;
        
        // Add modal to document body
        document.body.appendChild(modalContainer);
    }

    addEventListeners() {
        // Close button
        const closeBtn = document.querySelector('.payment-close-btn');
        closeBtn.addEventListener('click', () => this.closePaymentModal());
        
        // Toggle between payment methods
        const cardToggle = document.getElementById('card-toggle');
        const paypalToggle = document.getElementById('paypal-toggle');
        const cardForm = document.getElementById('card-form-container');
        const paypalForm = document.getElementById('paypal-form-container');
        const toggleSlider = document.querySelector('.payment-modal .toggle-slider');
        
        cardToggle.addEventListener('click', () => {
            cardToggle.classList.add('active');
            paypalToggle.classList.remove('active');
            cardForm.style.display = 'block';
            paypalForm.style.display = 'none';
            toggleSlider.style.transform = 'translateX(0)';
        });
        
        paypalToggle.addEventListener('click', () => {
            paypalToggle.classList.add('active');
            cardToggle.classList.remove('active');
            paypalForm.style.display = 'block';
            cardForm.style.display = 'none';
            toggleSlider.style.transform = 'translateX(100%)';
        });
        
        // Form submissions
        const cardPaymentForm = document.getElementById('card-payment-form');
        cardPaymentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.processCardPayment();
        });
        
        const paypalCheckoutBtn = document.getElementById('paypal-checkout-btn');
        paypalCheckoutBtn.addEventListener('click', () => {
            this.processPaypalPayment();
        });
        
        // Add event listeners for buy buttons in market
        this.addBuyButtonListeners();
        
        // Add event listeners for bid buttons in auction
        this.addBidButtonListeners();
    }

    addBuyButtonListeners() {
        const buyButtons = document.querySelectorAll('.buy-now-btn');
        buyButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Get item details from the parent card-item
                const cardItem = e.target.closest('.card-item');
                if (cardItem) {
                    const itemName = cardItem.querySelector('h3').textContent;
                    const itemPrice = cardItem.querySelector('p').textContent.split('$')[1];
                    this.openPaymentModal('market', {
                        name: itemName,
                        price: itemPrice,
                        id: cardItem.dataset.id || '0'
                    });
                }
            });
        });
    }

    addBidButtonListeners() {
        const bidButtons = document.querySelectorAll('.place-bid-btn');
        bidButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Get item details from the parent auction-item
                const auctionItem = e.target.closest('.auction-item');
                if (auctionItem) {
                    const itemName = auctionItem.querySelector('h3').textContent;
                    const currentBid = auctionItem.querySelector('p').textContent.split('$')[1];
                    this.openPaymentModal('auction', {
                        name: itemName,
                        price: currentBid,
                        id: auctionItem.dataset.id || '0'
                    });
                }
            });
        });
    }

    openPaymentModal(type, item) {
        // Check if user is logged in
        const userData = localStorage.getItem('legendCardHub_user');
        if (!userData) {
            alert('Please log in to make a purchase.');
            // Trigger login modal
            const loginBtn = document.getElementById('login-btn');
            if (loginBtn) loginBtn.click();
            return;
        }
        
        this.currentItem = item;
        
        // Update item details in modal
        const itemInfo = document.getElementById('item-info');
        const itemPrice = document.getElementById('item-price');
        
        itemInfo.textContent = item.name;
        itemPrice.textContent = type === 'auction' ? 
            `Current Bid: $${item.price}` : 
            `Price: $${item.price}`;
        
        // Show saved payment methods if available
        this.updateSavedPaymentMethods();
        
        // Show the modal
        const modalContainer = document.getElementById('payment-modal-container');
        modalContainer.style.display = 'flex';
    }

    closePaymentModal() {
        const modalContainer = document.getElementById('payment-modal-container');
        modalContainer.style.display = 'none';
    }

    updateSavedPaymentMethods() {
        const savedMethodsContainer = document.getElementById('saved-payment-methods');
        const methodsList = document.getElementById('payment-methods-list');
        
        if (this.paymentMethods.length > 0) {
            methodsList.innerHTML = '';
            
            this.paymentMethods.forEach((method, index) => {
                const methodItem = document.createElement('div');
                methodItem.classList.add('saved-payment-method');
                
                methodItem.innerHTML = `
                    <div class="payment-method-info">
                        <span class="card-icon">💳</span>
                        <span class="card-number">**** **** **** ${method.cardNumber.slice(-4)}</span>
                        <span class="card-expiry">${method.expiry}</span>
                    </div>
                    <button class="use-payment-method" data-index="${index}">Use</button>
                `;
                
                methodsList.appendChild(methodItem);
            });
            
            // Add event listeners to use buttons
            const useButtons = methodsList.querySelectorAll('.use-payment-method');
            useButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    const index = e.target.dataset.index;
                    this.usePaymentMethod(index);
                });
            });
            
            savedMethodsContainer.style.display = 'block';
        } else {
            savedMethodsContainer.style.display = 'none';
        }
    }

    usePaymentMethod(index) {
        // Auto-fill the form with saved payment method
        const method = this.paymentMethods[index];
        if (method) {
            document.getElementById('card-name').value = method.cardholderName;
            document.getElementById('card-number').value = method.cardNumber;
            document.getElementById('card-expiry').value = method.expiry;
            document.getElementById('card-address').value = method.billingAddress;
        }
    }

    processCardPayment() {
        // Get form values
        const cardholderName = document.getElementById('card-name').value;
        const cardNumber = document.getElementById('card-number').value;
        const expiry = document.getElementById('card-expiry').value;
        const cvv = document.getElementById('card-cvv').value;
        const billingAddress = document.getElementById('card-address').value;
        const savePayment = document.getElementById('save-payment').checked;
        
        // In a real application, you would send this data to a payment processor
        // For this demo, we'll simulate a successful payment
        
        // Save payment method if checkbox is checked
        if (savePayment) {
            this.savePaymentMethod({
                cardholderName,
                cardNumber,
                expiry,
                billingAddress
            });
        }
        
        // Show success message
        alert(`Payment successful! Thank you for your purchase.`);
        
        // Close the modal
        this.closePaymentModal();
        
        // Update UI (e.g., remove purchased item or update bid)
        this.updateUIAfterPayment();
    }

    processPaypalPayment() {
        // In a real application, you would redirect to PayPal
        // For this demo, we'll simulate a successful payment
        
        // Show success message
        alert(`PayPal payment successful! Thank you for your purchase.`);
        
        // Close the modal
        this.closePaymentModal();
        
        // Update UI (e.g., remove purchased item or update bid)
        this.updateUIAfterPayment();
    }

    savePaymentMethod(method) {
        // Add to payment methods array
        this.paymentMethods.push(method);
        
        // Save to localStorage
        localStorage.setItem('legendCardHub_paymentMethods', JSON.stringify(this.paymentMethods));
    }

    updateUIAfterPayment() {
        if (!this.currentItem) return;
        
        // Find the item in the DOM
        const itemId = this.currentItem.id;
        
        // Check if we're in the market page
        const marketItem = document.querySelector(`.card-item[data-id="${itemId}"]`);
        if (marketItem) {
            // Add a 'Purchased' label
            const purchasedLabel = document.createElement('div');
            purchasedLabel.classList.add('purchased-label');
            purchasedLabel.textContent = 'Purchased';
            marketItem.appendChild(purchasedLabel);
            
            // Disable the buy button
            const buyButton = marketItem.querySelector('.buy-now-btn');
            if (buyButton) {
                buyButton.disabled = true;
                buyButton.textContent = 'Purchased';
            }
        }
        
        // Check if we're in the auction page
        const auctionItem = document.querySelector(`.auction-item[data-id="${itemId}"]`);
        if (auctionItem) {
            // Update the current bid
            const bidElement = auctionItem.querySelector('p');
            if (bidElement && bidElement.textContent.includes('Current Bid')) {
                // Get user data
                const userData = JSON.parse(localStorage.getItem('legendCardHub_user'));
                const username = userData ? userData.username : 'You';
                
                // Update bid amount (add 10% to current bid)
                const currentBid = parseFloat(this.currentItem.price);
                const newBid = (currentBid * 1.1).toFixed(2);
                
                bidElement.textContent = `Current Bid: $${newBid} (by ${username})`;
                
                // Update the stored price
                this.currentItem.price = newBid;
            }
        }
    }
}

// Initialize the payment component when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.paymentComponent = new PaymentComponent();
});