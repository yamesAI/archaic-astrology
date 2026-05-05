/**
 * Stripe Products Creator
 * Creates all Archaic Astrology products with pricing
 * 
 * Usage:
 *   export STRIPE_SECRET_KEY=sk_test_xxxxx
 *   node create-stripe-products.js
 */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_YOUR_KEY');

const products = [
    // TIER 1: AI Instant ($5-15)
    {
        name: 'Daily Luck Score',
        description: 'Get your personalized daily luck rating based on your Sun sign. Includes lucky number, color, and timing recommendations.',
        price: 500,
        type: 'one_time',
        service_id: 'daily-luck'
    },
    {
        name: 'Lucky Numbers',
        description: 'Your personalized lucky numbers based on your birth chart. Perfect for lottery, games, and important dates.',
        price: 500,
        type: 'one_time',
        service_id: 'lucky-numbers'
    },
    {
        name: 'Birth Chart Snapshot',
        description: '300-400 word temperament reading based on your Sun, Moon, and Rising signs. Instant PDF delivery.',
        price: 900,
        type: 'one_time',
        service_id: 'birth-snapshot'
    },
    {
        name: 'Lucky Windows (7-Day)',
        description: 'Seven-day outlook with best timing windows for important activities. Updated weekly.',
        price: 1200,
        type: 'one_time',
        service_id: 'lucky-windows'
    },
    {
        name: 'Yes/No Horary',
        description: 'Ask one specific question. Traditional horary astrology gives a clear yes or no answer with timing.',
        price: 700,
        type: 'one_time',
        service_id: 'horary-yesno'
    },
    {
        name: 'Moon Phase Guidance',
        description: 'Personalized moon phase calendar with action recommendations for your sign.',
        price: 600,
        type: 'one_time',
        service_id: 'moon-phase'
    },
    
    // TIER 2A: StarLuck ($15-39)
    {
        name: 'Casino Timing Calendar',
        description: 'Monthly calendar showing optimal casino timing based on your chart and planetary hours.',
        price: 2700,
        type: 'recurring',
        interval: 'month',
        service_id: 'casino-calendar'
    },
    {
        name: 'Lottery Number Elector',
        description: 'Find the optimal time to buy tickets + receive personalized lucky numbers based on electional astrology.',
        price: 1900,
        type: 'one_time',
        service_id: 'lottery-elector'
    },
    {
        name: 'Sports Betting Horary',
        description: 'One specific game analysis using horary astrology. Get the edge on your sports bets.',
        price: 1500,
        type: 'one_time',
        service_id: 'sports-horary'
    },
    {
        name: 'Trading Entry Election',
        description: 'Optimal entry timing for your trades. 72-hour window analysis with specific hour recommendations.',
        price: 3900,
        type: 'one_time',
        service_id: 'trading-election'
    },
    {
        name: 'Investment Moon Cycle',
        description: 'Monthly moon phase analysis for investment decisions. Know when to enter and exit positions.',
        price: 2900,
        type: 'recurring',
        interval: 'month',
        service_id: 'investment-moon'
    },
    
    // TIER 2B: Wedding ($29-75)
    {
        name: 'Is He/She The One?',
        description: 'Horary reading on your relationship question. Clear guidance on compatibility and timing.',
        price: 2900,
        type: 'one_time',
        service_id: 'the-one'
    },
    {
        name: 'Synastry Compatibility Report',
        description: 'Detailed compatibility analysis between two charts. Strengths, challenges, and timing.',
        price: 4900,
        type: 'one_time',
        service_id: 'synastry'
    },
    {
        name: 'Fertility Timing',
        description: 'Optimal conception windows based on both partners\' charts. 3-month outlook with best dates.',
        price: 3900,
        type: 'one_time',
        service_id: 'fertility'
    },
    {
        name: 'Composite Chart Reading',
        description: 'The chart of your relationship as its own entity. Understand your partnership\'s purpose.',
        price: 5900,
        type: 'one_time',
        service_id: 'composite'
    },
    {
        name: 'Wedding Date Election',
        description: 'Find the most auspicious dates for your wedding ceremony. Includes 3-5 optimal dates with analysis.',
        price: 7500,
        type: 'one_time',
        service_id: 'wedding-election'
    },
    
    // TIER 2C: Gardening ($12-25)
    {
        name: 'Companion Planting Guide',
        description: 'Personalized companion planting recommendations based on your chart and local climate.',
        price: 1200,
        type: 'one_time',
        service_id: 'companion'
    },
    {
        name: 'Harvest Election',
        description: 'Optimal timing for harvesting specific crops based on lunar phases and your garden\'s chart.',
        price: 1500,
        type: 'one_time',
        service_id: 'harvest-election'
    },
    {
        name: 'Personal Garden Moon Guide',
        description: '12-month personalized gardening calendar based on your elemental affinity.',
        price: 2500,
        type: 'one_time',
        service_id: 'moon-guide'
    },
    {
        name: 'Lunar Planting Calendar',
        description: 'Monthly lunar planting calendar customized for your location and chart. Best times to plant each crop.',
        price: 1900,
        type: 'recurring',
        interval: 'month',
        service_id: 'planting-calendar'
    },
    
    // TIER 3: Premium ($150-250)
    {
        name: 'Natal Chart Reading (Consultation)',
        description: 'Complete 60-minute natal chart reading. Book after purchase.',
        price: 15000,
        type: 'one_time',
        service_id: 'natal-reading'
    },
    {
        name: 'Saturn Return Reading (Consultation)',
        description: 'Navigate your Saturn Return with confidence. 75-minute consultation with written report.',
        price: 20000,
        type: 'one_time',
        service_id: 'saturn-return'
    },
    {
        name: 'Garden Consultation',
        description: 'One-hour personalized garden planning session. Includes lunar calendar setup.',
        price: 15000,
        type: 'one_time',
        service_id: 'garden-consult'
    },
    {
        name: 'Complete Wedding Package (Consultation)',
        description: 'Synastry + Election + Composite. Everything for your perfect astrological wedding.',
        price: 25000,
        type: 'one_time',
        service_id: 'wedding-complete'
    }
];

async function createProducts() {
    console.log('🏛️  Creating Archaic Astrology Products in Stripe...\n');
    
    const priceMap = {};
    
    for (const product of products) {
        try {
            console.log(`Creating: ${product.name} ($${(product.price / 100).toFixed(2)})`);
            
            // Create price data
            const priceData = {
                currency: 'usd',
                unit_amount: product.price,
            };
            
            if (product.type === 'recurring') {
                priceData.recurring = { interval: product.interval || 'month' };
            }
            
            // Create product with price
            const stripeProduct = await stripe.products.create({
                name: product.name,
                description: product.description,
                metadata: {
                    service_id: product.service_id,
                    tier: product.price < 1500 ? 'tier-1' : 
                          product.price < 7500 ? 'tier-2' : 'tier-3'
                },
                default_price_data: priceData
            });
            
            priceMap[product.service_id] = stripeProduct.default_price;
            
            console.log(`  ✅ Product: ${stripeProduct.id}`);
            console.log(`  ✅ Price: ${stripeProduct.default_price}\n`);
            
        } catch (error) {
            console.error(`  ❌ FAILED: ${error.message}\n`);
        }
    }
    
    // Output results
    console.log('\n═══════════════════════════════════════════');
    console.log('✅ Product creation complete!');
    console.log('═══════════════════════════════════════════\n');
    
    console.log('// Copy these into js/stripe-payments.js:');
    console.log('const STRIPE_PRICES = {');
    for (const [key, value] of Object.entries(priceMap)) {
        console.log(`  '${key}': '${value}',`);
    }
    console.log('};');
}

// Check for API key
if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.includes('YOUR')) {
    console.error('❌ ERROR: Please set your Stripe Secret Key');
    console.error('');
    console.error('Get your key from: https://dashboard.stripe.com/apikeys');
    console.error('Then run:');
    console.error('  export STRIPE_SECRET_KEY=sk_test_xxxxx');
    console.error('  node create-stripe-products.js');
    process.exit(1);
}

createProducts();
