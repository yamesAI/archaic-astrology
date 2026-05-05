/**
 * Stripe Payment Links Integration
 * Live payment processing - lazycobra
 * 
 * All 31+ products connected via Stripe Payment Links
 * Created: 2026-05-05
 */

// Payment Links - LIVE STRIPE PAYMENT LINKS
const PAYMENT_LINKS = {
    'daily-luck': 'https://buy.stripe.com/00w9ASgCN2c64JocGd9Ve0w',
    'lucky-numbers': 'https://buy.stripe.com/8x228q4U5bMG6RwcGd9Ve0v',
    'birth-snapshot': 'https://buy.stripe.com/fZucN41HTaIC1xcdKh9Ve0u',
    'lucky-windows': 'https://buy.stripe.com/fZuaEW86heYS6RwcGd9Ve0t',
    'horary-yesno': 'https://buy.stripe.com/3cIdR872d9Eyfo27lT9Ve0s',
    'moon-phase': 'https://buy.stripe.com/bJe6oGeuFaICcbQ9u19Ve0r',
    'casino-calendar': 'https://buy.stripe.com/7sY7sK5Y99EyejYdKh9Ve0q',
    'lottery-elector': 'https://buy.stripe.com/3cI6oGfyJaIC1xceOl9Ve0p',
    'sports-horary': 'https://buy.stripe.com/6oU4gyfyJ6sm4JofSp9Ve0o',
    'trading-election': 'https://buy.stripe.com/dRmdR81HT5oicbQgWt9Ve08',
    'investment-moon': 'https://buy.stripe.com/fZuaEW4U58Au6Rw0Xv9Ve0m',
    'the-one': 'https://buy.stripe.com/00w00i0DPaICgs6fSp9Ve0l',
    'synastry': 'https://buy.stripe.com/28E14m0DP1826RwcGd9Ve0k',
    'fertility': 'https://buy.stripe.com/dRm4gy86h8Augs60Xv9Ve0j',
    'composite': 'https://buy.stripe.com/3cIcN44U59Ey5NscGd9Ve0i',
    'wedding-election': 'https://buy.stripe.com/6oU28q5Y97wq5Ns49H9Ve0h',
    'companion': 'https://buy.stripe.com/aFa8wO3Q17wqfo249H9Ve0g',
    'harvest-election': 'https://buy.stripe.com/28E3cu86hbMGa3IeOl9Ve0f',
    'moon-guide': 'https://buy.stripe.com/dRmcN44U57wq1xc49H9Ve0e',
    'planting-calendar': 'https://buy.stripe.com/14A14mfyJ9Ey6Rw6hP9Ve0d',
    'natal-reading': 'https://buy.stripe.com/28EeVc4U52c6a3I9u19Ve0c',
    'saturn-return': 'https://buy.stripe.com/6oUdR85Y9aIC7VA7lT9Ve0b',
    'garden-consult': 'https://buy.stripe.com/fZu7sK4U5dUO7VAbC99Ve0a',
    'wedding-complete': 'https://buy.stripe.com/3cIfZg86haIC0t8gWt9Ve09',
    'market-timing': 'https://buy.stripe.com/7sY4gybiteYScbQ7lT9Ve07',
    'astrota-report': 'https://buy.stripe.com/9B6cN472d03Yb7MbC99Ve06',
    'business-launch': 'https://buy.stripe.com/cNi3cuaep2c67VAay59Ve05',
    'ipo-election': 'https://buy.stripe.com/5kQ4gycmxcQKb7May59Ve04',
    'executive-horary': 'https://buy.stripe.com/dRmaEW9al8Au4JobC99Ve03',
    'annual-strategy': 'https://buy.stripe.com/4gM8wO1HT4ke4Jo6hP9Ve02',
};

/**
 * Handle payment button clicks
 * Redirects to Stripe Payment Link
 */
function handlePayment(serviceId) {
    const link = PAYMENT_LINKS[serviceId];
    
    if (!link) {
        alert('Service temporarily unavailable. Please contact support.');
        return;
    }
    
    // Open Stripe Payment Link in new tab
    window.open(link, '_blank');
}

// Auto-attach click handlers to payment buttons
document.addEventListener('DOMContentLoaded', function() {
    // Find all buttons with data-service attribute
    const paymentButtons = document.querySelectorAll('[data-service]');
    
    paymentButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const serviceId = this.getAttribute('data-service');
            if (serviceId) {
                handlePayment(serviceId);
            }
        });
    });
    
    console.log('🐍 lazycobra checkout ready. ' + Object.keys(PAYMENT_LINKS).length + ' payment methods loaded.');
});
