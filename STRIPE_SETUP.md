# Stripe Payment Setup Guide

## Quick Start (5 minutes)

### 1. Get Your Stripe API Keys
1. Go to https://dashboard.stripe.com/register and create an account
2. Navigate to **Developers → API Keys**
3. Copy your **Secret key** (starts with `sk_test_` for test mode)

### 2. Create Products

**Option A: Using Node.js (Recommended)**
```bash
# Set your API key
export STRIPE_SECRET_KEY=sk_test_xxxxx

# Run the script
cd scripts
node create-stripe-products.js
```

**Option B: Using Bash**
```bash
# Set your API key
export STRIPE_SECRET_KEY=sk_test_xxxxx

# Run the script
cd scripts
./create-stripe-products.sh
```

**Option C: Manual (Stripe Dashboard)**
1. Go to https://dashboard.stripe.com/products
2. Click "+ Add product"
3. Create each product from the list below

### 3. Update Your Website

Copy the Price IDs from the script output and update `js/stripe-payments.js`:

```javascript
// Replace this:
const STRIPE_PRICES = {
    'daily-luck': 'price_xxxxxxxx',
    'lucky-numbers': 'price_xxxxxxxx',
    // ... all 24 services
};

// Also update your public key:
const STRIPE_PUBLIC_KEY = 'pk_test_xxxxx'; // Test mode
// const STRIPE_PUBLIC_KEY = 'pk_live_xxxxx'; // Live mode
```

### 4. Test Payment
1. Open any service page (ai-readings.html, starluck.html, etc.)
2. Click "Buy" on any service
3. Use Stripe test card: `4242 4242 4242 4242`
4. Any future date, any 3-digit CVC, any ZIP

### 5. Go Live
1. Switch to live mode in Stripe Dashboard
2. Create products again in live mode
3. Update keys to live keys (`pk_live_`, `sk_live_`)
4. Deploy website

---

## Product Catalog (24 Services)

### Tier 1: AI Instant Readings ($5-15)
| Service | Price | Type |
|---------|-------|------|
| Daily Luck Score | $5 | One-time |
| Lucky Numbers | $5 | One-time |
| Birth Chart Snapshot | $9 | One-time |
| Lucky Windows (7-Day) | $12 | One-time |
| Yes/No Horary | $7 | One-time |
| Moon Phase Guidance | $6 | One-time |

### Tier 2A: ✦ StarLuck ($15-39)
| Service | Price | Type |
|---------|-------|------|
| Casino Timing Calendar | $27/mo | Subscription |
| Lottery Number Elector | $19 | One-time |
| Sports Betting Horary | $15 | One-time |
| Trading Entry Election | $39 | One-time |
| Investment Moon Cycle | $29/mo | Subscription |

### Tier 2B: 💍 Wedding ($29-75)
| Service | Price | Type |
|---------|-------|------|
| Is He/She The One? | $29 | One-time |
| Synastry Compatibility | $49 | One-time |
| Fertility Timing | $39 | One-time |
| Composite Chart Reading | $59 | One-time |
| Wedding Date Election | $75 | One-time |

### Tier 2C: 🌱 Gardening ($12-25)
| Service | Price | Type |
|---------|-------|------|
| Companion Planting Guide | $12 | One-time |
| Harvest Election | $15 | One-time |
| Personal Garden Moon Guide | $25 | One-time |
| Lunar Planting Calendar | $19/mo | Subscription |

### Tier 3: Premium Consultations ($150-250)
| Service | Price | Type |
|---------|-------|------|
| Natal Chart Reading | $150 | One-time |
| Saturn Return Reading | $200 | One-time |
| Garden Consultation | $150 | One-time |
| Complete Wedding Package | $250 | One-time |

---

## Webhook Setup (For Production)

To automatically deliver services after payment:

1. In Stripe Dashboard, go to **Developers → Webhooks**
2. Add endpoint: `https://yourdomain.com/webhook`
3. Select events:
   - `checkout.session.completed`
   - `invoice.paid` (for subscriptions)
4. Copy webhook secret
5. Add to your server environment:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_xxxxx
   ```

See `js/stripe-payments.js` for example webhook handler code.

---

## Test Cards

| Card Number | Scenario |
|-------------|----------|
| 4242 4242 4242 4242 | Success |
| 4000 0000 0000 9995 | Declined |
| 4000 0025 0000 3155 | Requires 3D Secure |

---

## Files Reference

- `js/stripe-payments.js` — Payment integration
- `scripts/create-stripe-products.js` — Node.js product creator
- `scripts/create-stripe-products.sh` — Bash product creator
- `success.html` — Payment success page
- `cancel.html` — Payment cancel page
