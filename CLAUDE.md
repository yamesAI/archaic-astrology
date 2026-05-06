# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Archaic Astrology is a static HTML/CSS/JS website for a traditional astrology services business at `archaicyames.com`. It offers tiered services ranging from instant AI-generated readings ($5–15) to premium consultations ($150–300), all processed through Stripe.

There is **no build system, no bundler, and no framework** — files are served directly as static assets. There are also no automated tests.

## Development

Open any HTML file directly in a browser, or use a local static server:

```bash
npx serve .
# or
python3 -m http.server 8080
```

To create Stripe products programmatically (requires `STRIPE_SECRET_KEY` env var):

```bash
export STRIPE_SECRET_KEY=sk_live_xxxxx
node scripts/create-stripe-products.js
# or
./scripts/create-stripe-products.sh
```

## Architecture

### Page Structure

Each specialty service has its own HTML + CSS + JS triple:

| Page | CSS | JS |
|------|-----|----|
| `ai-readings.html` | `css/ai-readings.css` | `js/ai-readings.js` |
| `starluck.html` | `css/starluck.css` | `js/starluck.js` |
| `wedding.html` | `css/wedding.css` | `js/wedding.js` |
| `gardening.html` | `css/gardening.css` | `js/gardening.js` |
| `financial.html` | `css/financial.css` | — |
| `booking.html` | `css/booking.css` | `js/booking.js` |
| `saturn-return-calculator.html` | `css/calculator.css` | `js/calculator.js` |

Shared across all pages: `css/style.css` and `js/main.js`.

### Payment System

There are **two payment JS files** — understand which is active before editing:

- **`js/checkout.js`** — the current active payment handler. Uses pre-created Stripe Payment Links (hardcoded `buy.stripe.com` URLs) stored in `PAYMENT_LINKS`. When a `[data-service]` button is clicked, it opens the corresponding Stripe Payment Link in a new tab. This is the simplest flow and requires no backend.

- **`js/stripe-payments.js`** — older/alternative flow using `stripe.redirectToCheckout()` with Price IDs from `STRIPE_PRICES`. Contains placeholder `STRIPE_PUBLIC_KEY` that must be replaced. Also contains commented webhook handler code for a future Node.js backend.

Buttons on service pages use `data-service` attributes matching keys in both `PAYMENT_LINKS` and `STRIPE_PRICES`. When adding a new service, update both files.

### Post-Payment Flow

- `success.html` — called after checkout; reads `?service=` query param and `pending_service` from `localStorage`, then shows service-specific delivery instructions.
- `cancel.html` — shown when user cancels checkout.
- The `SERVICE_METADATA` object in `stripe-payments.js` defines fulfillment type (`instant`, `subscription`, or `manual`).

### JavaScript Conventions

- All JS files use plain vanilla JS with no imports or modules.
- `js/main.js` defines global utilities (`showNotification`, `formatDate`, `debounce`, etc.) that page-specific scripts rely on — it must load first.
- Each page-specific JS file wraps initialization in `DOMContentLoaded`.
- Astrological calculations (moon phase, luck score, planetary hours) are deterministic client-side algorithms — no external API calls.

### CSS Conventions

- Design tokens live in `:root` in `css/style.css`: colors (`--color-primary: #8B4513`), typography (`--font-heading: 'Cormorant Garamond'`, `--font-body: 'Inter'`), spacing, and transitions.
- Page-specific CSS files extend the base; never override the CSS variables.

## Service Tiers & Stripe Integration

All 30 services have live Stripe Price IDs and Payment Links already created (see `STRIPE_PRODUCTS_CREATED.md`). The `STRIPE_PUBLIC_KEY` in `stripe-payments.js` still contains a placeholder — it needs the real `pk_live_` key before `stripe-payments.js` can be used.

Subscription services (Casino Calendar, Investment Moon, Planting Calendar) use `mode: 'subscription'` in the Stripe checkout flow.

## Key Files for Common Tasks

- **Adding a new service:** `js/checkout.js` (add to `PAYMENT_LINKS`), `js/stripe-payments.js` (add to `STRIPE_PRICES` and optionally `SERVICE_METADATA`), and the relevant HTML page.
- **Changing prices or styling:** price labels are hardcoded in HTML and in the `prices` object in `js/booking.js`.
- **SEO:** `sitemap.xml`, `robots.txt`, and Schema.org JSON-LD blocks are embedded in each page's `<head>`. Strategy is documented in `SEO_STRATEGY.md`.
- **Booking calendar:** `js/booking.js` — availability logic (`isDateAvailable`) uses mock hashing; connect to a real backend to replace it.
