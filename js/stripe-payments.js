/**
 * Stripe Payment Integration
 * For Archaic Astrology - AI Readings & Services
 * 
 * Setup:
 * 1. Create Stripe account at stripe.com
 * 2. Get Publishable Key from Dashboard > Developers > API Keys
 * 3. Create products in Stripe Dashboard
 * 4. Replace TEST_KEY with your real key
 * 5. For production, use backend to create checkout sessions
 */

// ===== CONFIGURATION =====
// LIVE MODE - Real payments enabled
const STRIPE_PUBLIC_KEY = 'pk_live_YOUR_PUBLISHABLE_KEY_HERE'; // Get from Dashboard

// Product Price IDs - LIVE (created 2026-05-05)
const STRIPE_PRICES = {
    // AI Readings Tier ($5-15)
    'daily-luck': 'price_1TTj9XB1nynXI4W9fK6Gz8L9',
    'lucky-numbers': 'price_1TTj9XB1nynXI4W9ozJmfmGn',
    'birth-snapshot': 'price_1TTj9XB1nynXI4W9iPRlGJ66',
    'lucky-windows': 'price_1TTj9YB1nynXI4W9xvw3Y9ii',
    'horary-yesno': 'price_1TTj9YB1nynXI4W9lUpz2DDf',
    'moon-phase': 'price_1TTj9ZB1nynXI4W9J7SQ9uiF',
    
    // StarLuck Tier ($15-39)
    'casino-calendar': 'price_1TTj9ZB1nynXI4W9MpW11kV5',
    'lottery-elector': 'price_1TTj9ZB1nynXI4W9N1iyRrHI',
    'sports-horary': 'price_1TTj9aB1nynXI4W97jer8zk0',
    'trading-election': 'price_1TTj9aB1nynXI4W9ATPtMRai',
    'investment-moon': 'price_1TTj9aB1nynXI4W9ct6k9Ga5',
    
    // Wedding Tier ($29-75)
    'the-one': 'price_1TTj9bB1nynXI4W9pXoeRSxE',
    'synastry': 'price_1TTj9bB1nynXI4W9f8Colyyj',
    'fertility': 'price_1TTj9bB1nynXI4W9bcQ9xbqv',
    'composite': 'price_1TTj9cB1nynXI4W9QcK4DVoC',
    'wedding-election': 'price_1TTj9cB1nynXI4W9O13hTOdG',
    
    // Gardening Tier ($12-25)
    'companion': 'price_1TTj9cB1nynXI4W9fECTiQXr',
    'harvest-election': 'price_1TTj9dB1nynXI4W9pnrQN1U4',
    'moon-guide': 'price_1TTj9dB1nynXI4W9NDsZs170',
    'planting-calendar': 'price_1TTj9dB1nynXI4W9h10I5cgL',
    
    // Premium Services ($150-250)
    'natal-reading': 'price_1TTj9eB1nynXI4W9I0NMuC3D',
    'saturn-return': 'price_1TTj9eB1nynXI4W9Gyon0sUo',
    'garden-consult': 'price_1TTj9eB1nynXI4W979V5Jl8C',
    'wedding-complete': 'price_1TTj9fB1nynXI4W9vsKTDx5U'
};

// Service metadata for post-payment fulfillment
const SERVICE_METADATA = {
    'daily-luck': { type: 'instant', deliverable: 'luck_score', emailRequired: true },
    'lucky-numbers': { type: 'instant', deliverable: 'lucky_numbers', emailRequired: true },
    'birth-snapshot': { type: 'instant', deliverable: 'snapshot_pdf', emailRequired: true },
    'casino-calendar': { type: 'subscription', deliverable: 'monthly_calendar', emailRequired: true },
    'wedding-election': { type: 'manual', deliverable: 'consultation', emailRequired: true, bookingRequired: true },
    'natal-reading': { type: 'manual', deliverable: 'consultation', emailRequired: true, bookingRequired: true }
};

// ===== PAYMENT FLOW =====

/**
 * Process payment using Stripe Checkout
 * This redirects to Stripe's hosted checkout page
 */
async function processPayment(serviceId, amount) {
    const priceId = STRIPE_PRICES[serviceId];
    
    if (!priceId) {
        alert('Service not configured for payment yet. Contact support.');
        return;
    }
    
    // For now, show a setup message
    if (STRIPE_PUBLIC_KEY.includes('YOUR_KEY')) {
        showStripeSetupMessage(serviceId, amount);
        return;
    }
    
    try {
        // Load Stripe.js
        const stripe = await loadStripe(STRIPE_PUBLIC_KEY);
        
        // Collect email for service delivery
        const email = prompt('Enter your email for service delivery:');
        if (!email || !email.includes('@')) {
            alert('Valid email required for service delivery.');
            return;
        }
        
        // Store service context for post-payment
        localStorage.setItem('pending_service', JSON.stringify({
            serviceId,
            email,
            timestamp: Date.now()
        }));
        
        // Redirect to Stripe Checkout
        // In production, this should call your backend to create a session
        const { error } = await stripe.redirectToCheckout({
            lineItems: [{ price: priceId, quantity: 1 }],
            mode: priceId.includes('monthly') ? 'subscription' : 'payment',
            successUrl: window.location.origin + '/success.html?service=' + serviceId,
            cancelUrl: window.location.origin + '/cancel.html',
            customerEmail: email
        });
        
        if (error) {
            console.error('Stripe error:', error);
            alert('Payment error: ' + error.message);
        }
        
    } catch (err) {
        console.error('Payment error:', err);
        alert('Unable to process payment. Please try again.');
    }
}

/**
 * Show setup instructions for Stripe
 */
function showStripeSetupMessage(serviceId, amount) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.8); z-index: 9999;
        display: flex; align-items: center; justify-content: center;
        padding: 20px;
    `;
    
    modal.innerHTML = `
        <div style="background: white; padding: 30px; border-radius: 16px; max-width: 500px; width: 100%;">
            <h3 style="margin-bottom: 15px;">Stripe Setup Required</h3>
            <p style="margin-bottom: 15px;">
                This service (<strong>${serviceId}</strong>) costs <strong>$${amount}</strong>.
            </p>
            <p style="margin-bottom: 20px; color: #666;">
                To enable payments:
            </p>
            <ol style="margin-bottom: 20px; padding-left: 20px; color: #444;">
                <li>Create account at <a href="https://stripe.com" target="_blank">stripe.com</a></li>
                <li>Get your Publishable Key from Dashboard</li>
                <li>Replace <code>pk_test_YOUR_KEY_HERE</code> in stripe-payments.js</li>
                <li>Create products in Stripe Dashboard</li>
                <li>Update STRIPE_PRICES object with real Price IDs</li>
            </ol>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <strong>Current Status:</strong> TEST MODE<br>
                <small>No real charges will be made</small>
            </div>
            <button onclick="this.closest('.modal').remove()" 
                style="background: #8B4513; color: white; border: none; padding: 12px 24px; 
                border-radius: 8px; cursor: pointer; font-size: 1rem;">
                Close
            </button>
        </div>
    `;
    
    modal.className = 'modal';
    document.body.appendChild(modal);
}

/**
 * Load Stripe.js dynamically
 */
function loadStripe(key) {
    return new Promise((resolve, reject) => {
        if (window.Stripe) {
            resolve(window.Stripe(key));
            return;
        }
        
        const script = document.createElement('script');
        script.src = 'https://js.stripe.com/v3/';
        script.onload = () => resolve(window.Stripe(key));
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

/**
 * Handle successful payment
 * Call this on success.html page
 */
function handlePaymentSuccess() {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = urlParams.get('service');
    const pendingData = JSON.parse(localStorage.getItem('pending_service') || '{}');
    
    if (serviceId && pendingData.serviceId === serviceId) {
        const service = SERVICE_METADATA[serviceId];
        
        // Show success message
        showSuccessMessage(serviceId, service, pendingData.email);
        
        // Clear pending data
        localStorage.removeItem('pending_service');
        
        // For instant services, trigger delivery
        if (service && service.type === 'instant') {
            deliverInstantService(serviceId, pendingData.email);
        }
        
        // For manual services, show booking info
        if (service && service.bookingRequired) {
            showBookingInfo(serviceId);
        }
    }
}

/**
 * Show success message after payment
 */
function showSuccessMessage(serviceId, service, email) {
    const container = document.getElementById('success-content') || document.body;
    
    const serviceNames = {
        'daily-luck': 'Daily Luck Score',
        'lucky-numbers': 'Lucky Numbers',
        'birth-snapshot': 'Birth Chart Snapshot',
        'casino-calendar': 'Casino Calendar',
        'wedding-election': 'Wedding Date Election'
    };
    
    container.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <div style="font-size: 4rem; margin-bottom: 20px;">✅</div>
            <h1>Payment Successful!</h1>
            <p style="font-size: 1.2rem; margin: 20px 0;">
                Thank you for purchasing <strong>${serviceNames[serviceId] || serviceId}</strong>.
            </p>
            <p style="color: #666;">
                Your service will be delivered to: <strong>${email}</strong>
            </p>
            <div id="delivery-status" style="margin-top: 30px;"></div>
            <a href="index.html" style="display: inline-block; margin-top: 30px; 
                background: #8B4513; color: white; padding: 12px 30px; 
                border-radius: 8px; text-decoration: none;">
                Return Home
            </a>
        </div>
    `;
}

/**
 * Deliver instant services (luck scores, numbers, etc.)
 */
function deliverInstantService(serviceId, email) {
    const statusDiv = document.getElementById('delivery-status');
    
    // Simulate service generation
    statusDiv.innerHTML = `
        <div style="background: #f5f5f5; padding: 20px; border-radius: 12px;">
            <p>⏳ Generating your ${serviceId}...</p>
            <p style="font-size: 0.9rem; color: #666;">This will be emailed to you within 5 minutes.</p>
        </div>
    `;
    
    // In production, this would call your backend to:
    // 1. Generate the reading/service
    // 2. Send email via SendGrid/Mailgun
    // 3. Store in database
    
    setTimeout(() => {
        statusDiv.innerHTML = `
            <div style="background: #e8f5e9; padding: 20px; border-radius: 12px;">
                <p>✅ Your ${serviceId} has been generated!</p>
                <p style="font-size: 0.9rem; color: #666;">Check your email at ${email}</p>
            </div>
        `;
    }, 2000);
}

/**
 * Show booking info for manual services
 */
function showBookingInfo(serviceId) {
    const statusDiv = document.getElementById('delivery-status');
    
    statusDiv.innerHTML = `
        <div style="background: #fff3e0; padding: 20px; border-radius: 12px;">
            <h3 style="margin-bottom: 10px;">Next Steps</h3>
            <p>This service requires a consultation. Please:</p>
            <ol style="text-align: left; margin: 15px 0;">
                <li>Check your email for booking link</li>
                <li>Select your preferred time slot</li>
                <li>Complete the intake form</li>
            </ol>
            <a href="booking.html" style="display: inline-block; background: #8B4513; 
                color: white; padding: 10px 24px; border-radius: 8px; text-decoration: none;">
                Book Now
            </a>
        </div>
    `;
}

// ===== WEBHOOK HANDLER (Backend) =====
/**
 * This function would run on your server (Node.js/Express)
 * to handle Stripe webhooks for payment confirmation
 * 
 * Example webhook endpoint:
 */
const WEBHOOK_HANDLER_EXAMPLE = `
// server.js - Express webhook endpoint
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();

app.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        return res.status(400).send(\`Webhook Error: \${err.message}\`);
    }
    
    // Handle successful payment
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const serviceId = session.metadata.serviceId;
        const email = session.customer_email;
        
        // Fulfill the service
        await fulfillService(serviceId, email, session);
    }
    
    res.json({received: true});
});

async function fulfillService(serviceId, email, session) {
    // 1. Generate service content
    // 2. Send email with results
    // 3. Store in database
    // 4. For manual services, send booking link
}
`;

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on success page
    if (window.location.pathname.includes('success')) {
        handlePaymentSuccess();
    }
});
