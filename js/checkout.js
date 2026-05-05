/**
 * Stripe Payment Links Integration
 * No backend required - uses Stripe Payment Links
 * 
 * How to set up:
 * 1. Go to https://dashboard.stripe.com/payment-links
 * 2. Create payment links for each product
 * 3. Copy the URLs below
 * 4. Replace the placeholder URLs with real ones
 */

// Payment Links - Replace these with your actual Stripe Payment Link URLs
const PAYMENT_LINKS = {
    // AI Readings ($5-15)
    'daily-luck': 'https://buy.stripe.com/YOUR_LINK_HERE',
    'lucky-numbers': 'https://buy.stripe.com/YOUR_LINK_HERE',
    'birth-snapshot': 'https://buy.stripe.com/YOUR_LINK_HERE',
    'lucky-windows': 'https://buy.stripe.com/YOUR_LINK_HERE',
    'horary-yesno': 'https://buy.stripe.com/YOUR_LINK_HERE',
    'moon-phase': 'https://buy.stripe.com/YOUR_LINK_HERE',
    
    // StarLuck ($15-39)
    'casino-calendar': 'https://buy.stripe.com/YOUR_LINK_HERE',
    'lottery-elector': 'https://buy.stripe.com/YOUR_LINK_HERE',
    'sports-horary': 'https://buy.stripe.com/YOUR_LINK_HERE',
    'investment-moon': 'https://buy.stripe.com/YOUR_LINK_HERE',
    
    // Wedding ($29-75)
    'the-one': 'https://buy.stripe.com/YOUR_LINK_HERE',
    'synastry': 'https://buy.stripe.com/YOUR_LINK_HERE',
    'fertility': 'https://buy.stripe.com/YOUR_LINK_HERE',
    'composite': 'https://buy.stripe.com/YOUR_LINK_HERE',
    'wedding-election': 'https://buy.stripe.com/YOUR_LINK_HERE',
    
    // Gardening ($12-25)
    'companion': 'https://buy.stripe.com/YOUR_LINK_HERE',
    'harvest-election': 'https://buy.stripe.com/YOUR_LINK_HERE',
    'moon-guide': 'https://buy.stripe.com/YOUR_LINK_HERE',
    'planting-calendar': 'https://buy.stripe.com/YOUR_LINK_HERE',
    
    // Financial ($75-300)
    'trading-election': 'https://buy.stripe.com/YOUR_LINK_HERE',
    'market-timing': 'https://buy.stripe.com/YOUR_LINK_HERE',
    'astrota-report': 'https://buy.stripe.com/YOUR_LINK_HERE',
    'business-launch': 'https://buy.stripe.com/YOUR_LINK_HERE',
    'ipo-election': 'https://buy.stripe.com/YOUR_LINK_HERE',
    'executive-horary': 'https://buy.stripe.com/YOUR_LINK_HERE',
    'annual-strategy': 'https://buy.stripe.com/YOUR_LINK_HERE',
    
    // Premium ($150-250)
    'natal-reading': 'https://buy.stripe.com/YOUR_LINK_HERE',
    'saturn-return': 'https://buy.stripe.com/YOUR_LINK_HERE',
    'garden-consult': 'https://buy.stripe.com/YOUR_LINK_HERE',
    'wedding-complete': 'https://buy.stripe.com/YOUR_LINK_HERE'
};

/**
 * Handle payment button clicks
 * Redirects to Stripe Payment Link
 */
function handlePayment(serviceId) {
    const link = PAYMENT_LINKS[serviceId];
    
    if (!link || link.includes('YOUR_LINK_HERE')) {
        showPaymentSetupModal(serviceId);
        return;
    }
    
    // Redirect to Stripe Payment Link
    window.open(link, '_blank');
}

/**
 * Show setup modal when payment links aren't configured
 */
function showPaymentSetupModal(serviceId) {
    const modal = document.createElement('div');
    modal.className = 'payment-modal';
    modal.innerHTML = `
        <div class="payment-modal-backdrop" onclick="this.parentElement.remove()"></div>
        <div class="payment-modal-content">
            <h3>🔧 Payment Setup Required</h3>
            <p>This service requires Stripe Payment Link configuration.</p>
            <div class="setup-steps">
                <p><strong>To enable payments:</strong></p>
                <ol>
                    <li>Go to <a href="https://dashboard.stripe.com/payment-links" target="_blank">Stripe Dashboard → Payment Links</a></li>
                    <li>Create a payment link for: <code>${serviceId}</code></li>
                    <li>Copy the payment link URL</li>
                    <li>Paste it in <code>js/checkout.js</code></li>
                </ol>
            </div>
            <button onclick="this.closest('.payment-modal').remove()" class="btn-close">Close</button>
        </div>
    `;
    document.body.appendChild(modal);
}

// Auto-attach click handlers to payment buttons
document.addEventListener('DOMContentLoaded', function() {
    // Find all buttons with stripe-buy class or data-service attribute
    const paymentButtons = document.querySelectorAll('[data-service], .stripe-buy');
    
    paymentButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const serviceId = this.getAttribute('data-service');
            if (serviceId) {
                handlePayment(serviceId);
            }
        });
    });
});

// CSS for modal
const style = document.createElement('style');
style.textContent = `
    .payment-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .payment-modal-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.7);
    }
    .payment-modal-content {
        position: relative;
        background: white;
        padding: 2rem;
        border-radius: 12px;
        max-width: 500px;
        width: 90%;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    .payment-modal-content h3 {
        margin-top: 0;
        color: #1a1a1a;
    }
    .payment-modal-content code {
        background: #f0f0f0;
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
        font-family: monospace;
    }
    .payment-modal-content ol {
        padding-left: 1.5rem;
        line-height: 1.8;
    }
    .payment-modal-content a {
        color: #c9a227;
    }
    .btn-close {
        background: #1a1a1a;
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 6px;
        cursor: pointer;
        margin-top: 1rem;
    }
`;
document.head.appendChild(style);

console.log('🐍 lazycobra checkout loaded. Payment links needed for full functionality.');
