#!/bin/bash
# ========================================
# Stripe Products Creation Script
# For Archaic Astrology Ecosystem
# ========================================

# Configuration
# Get your API key from: https://dashboard.stripe.com/apikeys
STRIPE_SECRET_KEY="${STRIPE_SECRET_KEY:-sk_test_YOUR_SECRET_KEY}"

if [[ "$STRIPE_SECRET_KEY" == *"YOUR_SECRET_KEY"* ]]; then
    echo "❌ ERROR: Please set your Stripe Secret Key"
    echo ""
    echo "Get your key from: https://dashboard.stripe.com/apikeys"
    echo "Then run:"
    echo "  export STRIPE_SECRET_KEY=sk_test_xxxxx"
    echo "  ./create-stripe-products.sh"
    exit 1
fi

echo "🏛️  Creating Archaic Astrology Products in Stripe..."
echo ""

# Function to create a product
create_product() {
    local name="$1"
    local description="$2"
    local price_cents="$3"
    local price_type="$4"  # one_time or recurring
    local metadata="$5"
    
    echo "Creating: $name ($$$(echo "scale=2; $price_cents/100" | bc))"
    
    # Build price data
    if [ "$price_type" == "recurring" ]; then
        price_data="default_price_data[unit_amount]=$price_cents&default_price_data[currency]=usd&default_price_data[recurring][interval]=month"
    else
        price_data="default_price_data[unit_amount]=$price_cents&default_price_data[currency]=usd"
    fi
    
    # Create product
    response=$(curl -s -X POST https://api.stripe.com/v1/products \
        -u "$STRIPE_SECRET_KEY:" \
        -d "name=$name" \
        -d "description=$description" \
        -d "$price_data" \
        -d "metadata[service_id]=$(echo "$name" | tr '[:upper:]' '[:lower:]' | tr ' ' '_' | tr -d '!')" \
        2>/dev/null)
    
    # Check for errors
    if echo "$response" | grep -q '"error"'; then
        echo "  ❌ FAILED: $(echo "$response" | grep -o '"message": "[^"]*"' | head -1)"
        return 1
    else
        product_id=$(echo "$response" | grep -o '"id": "prod_[^"]*"' | head -1 | cut -d'"' -f4)
        price_id=$(echo "$response" | grep -o '"default_price": "price_[^"]*"' | head -1 | cut -d'"' -f4)
        echo "  ✅ Product: $product_id"
        echo "  ✅ Price: $price_id"
        echo ""
        
        # Append to output file
        echo "  '$service_id': '$price_id'," >> stripe-price-ids.txt
        return 0
    fi
}

# Clear previous output
> stripe-price-ids.txt
echo "# Stripe Price IDs - Generated $(date)" >> stripe-price-ids.txt
echo "STRIPE_PRICES = {" >> stripe-price-ids.txt

echo "═══════════════════════════════════════════"
echo "TIER 1: AI INSTANT READINGS ($5-15)"
echo "═══════════════════════════════════════════"

service_id="daily-luck"
create_product "Daily Luck Score" "Get your personalized daily luck rating based on your Sun sign. Includes lucky number, color, and timing recommendations." 500 "one_time"

service_id="lucky-numbers"
create_product "Lucky Numbers" "Your personalized lucky numbers based on your birth chart. Perfect for lottery, games, and important dates." 500 "one_time"

service_id="birth-snapshot"
create_product "Birth Chart Snapshot" "300-400 word temperament reading based on your Sun, Moon, and Rising signs. Instant PDF delivery." 900 "one_time"

service_id="lucky-windows"
create_product "Lucky Windows (7-Day)" "Seven-day outlook with best timing windows for important activities. Updated weekly." 1200 "one_time"

service_id="horary-yesno"
create_product "Yes/No Horary" "Ask one specific question. Traditional horary astrology gives a clear yes or no answer with timing." 700 "one_time"

service_id="moon-phase"
create_product "Moon Phase Guidance" "Personalized moon phase calendar with action recommendations for your sign." 600 "one_time"

echo "═══════════════════════════════════════════"
echo "TIER 2A: ✦ STARLUCK ($15-39)"
echo "═══════════════════════════════════════════"

service_id="casino-calendar"
create_product "Casino Timing Calendar" "Monthly calendar showing optimal casino timing based on your chart and planetary hours." 2700 "recurring"

service_id="lottery-elector"
create_product "Lottery Number Elector" "Find the optimal time to buy tickets + receive personalized lucky numbers based on electional astrology." 1900 "one_time"

service_id="sports-horary"
create_product "Sports Betting Horary" "One specific game analysis using horary astrology. Get the edge on your sports bets." 1500 "one_time"

service_id="trading-election"
create_product "Trading Entry Election" "Optimal entry timing for your trades. 72-hour window analysis with specific hour recommendations." 3900 "one_time"

service_id="investment-moon"
create_product "Investment Moon Cycle" "Monthly moon phase analysis for investment decisions. Know when to enter and exit positions." 2900 "recurring"

echo "═══════════════════════════════════════════"
echo "TIER 2B: 💍 WEDDING ($29-75)"
echo "═══════════════════════════════════════════"

service_id="the-one"
create_product "Is He/She The One?" "Horary reading on your relationship question. Clear guidance on compatibility and timing." 2900 "one_time"

service_id="synastry"
create_product "Synastry Compatibility Report" "Detailed compatibility analysis between two charts. Strengths, challenges, and timing." 4900 "one_time"

service_id="fertility"
create_product "Fertility Timing" "Optimal conception windows based on both partners' charts. 3-month outlook with best dates." 3900 "one_time"

service_id="composite"
create_product "Composite Chart Reading" "The chart of your relationship as its own entity. Understand your partnership's purpose." 5900 "one_time"

service_id="wedding-election"
create_product "Wedding Date Election" "Find the most auspicious dates for your wedding ceremony. Includes 3-5 optimal dates with analysis." 7500 "one_time"

echo "═══════════════════════════════════════════"
echo "TIER 2C: 🌱 GARDENING ($12-25)"
echo "═══════════════════════════════════════════"

service_id="companion"
create_product "Companion Planting Guide" "Personalized companion planting recommendations based on your chart and local climate." 1200 "one_time"

service_id="harvest-election"
create_product "Harvest Election" "Optimal timing for harvesting specific crops based on lunar phases and your garden's chart." 1500 "one_time"

service_id="moon-guide"
create_product "Personal Garden Moon Guide" "12-month personalized gardening calendar based on your elemental affinity." 2500 "one_time"

service_id="planting-calendar"
create_product "Lunar Planting Calendar" "Monthly lunar planting calendar customized for your location and chart. Best times to plant each crop." 1900 "recurring"

echo "═══════════════════════════════════════════"
echo "TIER 3: PREMIUM CONSULTATIONS ($150-250)"
echo "═══════════════════════════════════════════"

service_id="natal-reading"
create_product "Natal Chart Reading (Consultation)" "Complete 60-minute natal chart reading. Book after purchase." 15000 "one_time"

service_id="saturn-return"
create_product "Saturn Return Reading (Consultation)" "Navigate your Saturn Return with confidence. 75-minute consultation with written report." 20000 "one_time"

service_id="garden-consult"
create_product "Garden Consultation" "One-hour personalized garden planning session. Includes lunar calendar setup." 15000 "one_time"

service_id="wedding-complete"
create_product "Complete Wedding Package (Consultation)" "Synastry + Election + Composite. Everything for your perfect astrological wedding." 25000 "one_time"

# Close the JS object
echo "}" >> stripe-price-ids.txt

echo "═══════════════════════════════════════════"
echo "✅ All products created!"
echo "═══════════════════════════════════════════"
echo ""
echo "Price IDs saved to: stripe-price-ids.txt"
echo ""
echo "Next steps:"
echo "1. Copy the price IDs from stripe-price-ids.txt"
echo "2. Update js/stripe-payments.js with the real price IDs"
echo "3. Test a purchase in Stripe's test mode"
