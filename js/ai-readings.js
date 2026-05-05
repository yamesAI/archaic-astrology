/**
 * AI Readings - Instant Astrology Calculations
 * Traditional algorithms for quick readings
 */

// Sign data with traits
const SIGN_DATA = {
    Aries: {
        element: 'Fire',
        ruler: 'Mars',
        luckyNumbers: [9, 18, 27],
        luckyColors: ['red', 'crimson'],
        traits: ['bold', 'pioneering', 'courageous'],
        bestActivities: ['starting new projects', 'competition']
    },
    Taurus: {
        element: 'Earth',
        ruler: 'Venus',
        luckyNumbers: [6, 15, 24],
        luckyColors: ['green', 'pink'],
        traits: ['patient', 'reliable', 'determined'],
        bestActivities: ['financial planning', 'gardening']
    },
    Gemini: {
        element: 'Air',
        ruler: 'Mercury',
        luckyNumbers: [5, 14, 23],
        luckyColors: ['yellow', 'light blue'],
        traits: ['curious', 'adaptable', 'witty'],
        bestActivities: ['learning', 'socializing']
    },
    Cancer: {
        element: 'Water',
        ruler: 'Moon',
        luckyNumbers: [2, 7, 11],
        luckyColors: ['silver', 'white'],
        traits: ['nurturing', 'intuitive', 'protective'],
        bestActivities: ['home activities', 'cooking']
    },
    Leo: {
        element: 'Fire',
        ruler: 'Sun',
        luckyNumbers: [1, 10, 19],
        luckyColors: ['gold', 'orange'],
        traits: ['confident', 'generous', 'creative'],
        bestActivities: ['performing', 'leading']
    },
    Virgo: {
        element: 'Earth',
        ruler: 'Mercury',
        luckyNumbers: [5, 14, 23],
        luckyColors: ['navy blue', 'sage green'],
        traits: ['analytical', 'practical', 'helpful'],
        bestActivities: ['organizing', 'problem-solving']
    },
    Libra: {
        element: 'Air',
        ruler: 'Venus',
        luckyNumbers: [6, 15, 24],
        luckyColors: ['pink', 'light blue'],
        traits: ['diplomatic', 'charming', 'fair'],
        bestActivities: ['negotiating', 'artistic pursuits']
    },
    Scorpio: {
        element: 'Water',
        ruler: 'Mars',
        luckyNumbers: [9, 18, 27],
        luckyColors: ['crimson', 'burgundy'],
        traits: ['intense', 'passionate', 'resourceful'],
        bestActivities: ['research', 'transformation']
    },
    Sagittarius: {
        element: 'Fire',
        ruler: 'Jupiter',
        luckyNumbers: [3, 12, 21],
        luckyColors: ['purple', 'royal blue'],
        traits: ['adventurous', 'optimistic', 'honest'],
        bestActivities: ['travel', 'teaching']
    },
    Capricorn: {
        element: 'Earth',
        ruler: 'Saturn',
        luckyNumbers: [8, 17, 26],
        luckyColors: ['brown', 'black'],
        traits: ['ambitious', 'disciplined', 'practical'],
        bestActivities: ['career advancement', 'planning']
    },
    Aquarius: {
        element: 'Air',
        ruler: 'Saturn',
        luckyNumbers: [4, 13, 22],
        luckyColors: ['electric blue', 'silver'],
        traits: ['innovative', 'independent', 'humanitarian'],
        bestActivities: ['innovation', 'group work']
    },
    Pisces: {
        element: 'Water',
        ruler: 'Jupiter',
        luckyNumbers: [7, 16, 25],
        luckyColors: ['sea green', 'lavender'],
        traits: ['compassionate', 'artistic', 'intuitive'],
        bestActivities: ['creative arts', 'spiritual practices']
    }
};

// Moon phases
const MOON_PHASES = {
    new: {
        name: 'New Moon',
        emoji: '🌑',
        action: 'Set intentions, plant seeds',
        avoid: 'Major decisions'
    },
    waxing_crescent: {
        name: 'Waxing Crescent',
        emoji: '🌒',
        action: 'Take action, start projects',
        avoid: 'Procrastination'
    },
    first_quarter: {
        name: 'First Quarter',
        emoji: '🌓',
        action: 'Face challenges head-on',
        avoid: 'Giving up'
    },
    waxing_gibbous: {
        name: 'Waxing Gibbous',
        emoji: '🌔',
        action: 'Refine and adjust',
        avoid: 'Rushing'
    },
    full: {
        name: 'Full Moon',
        emoji: '🌕',
        action: 'Celebrate, release',
        avoid: 'New starts'
    },
    waning_gibbous: {
        name: 'Waning Gibbous',
        emoji: '🌖',
        action: 'Share, express gratitude',
        avoid: 'Pushing forward'
    },
    last_quarter: {
        name: 'Last Quarter',
        emoji: '🌗',
        action: 'Release, let go',
        avoid: 'New commitments'
    },
    waning_crescent: {
        name: 'Waning Crescent',
        emoji: '🌘',
        action: 'Rest, meditate',
        avoid: 'Heavy work'
    }
};

// Get current moon phase (simplified calculation)
function getCurrentMoonPhase() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    
    // Simple moon phase approximation
    const c = Math.floor((year - 1900) / 100);
    const e = Math.floor((year - 1900) % 100);
    const f = Math.floor((month + 9) % 12);
    const g = Math.floor((day + 30 * f + (f < 2 ? 0 : 2) - c + Math.floor(c / 4) + Math.floor(e / 4)) % 30);
    
    const age = Math.floor(g);
    
    if (age < 1) return 'new';
    if (age < 7) return 'waxing_crescent';
    if (age < 8) return 'first_quarter';
    if (age < 14) return 'waxing_gibbous';
    if (age < 16) return 'full';
    if (age < 22) return 'waning_gibbous';
    if (age < 23) return 'last_quarter';
    return 'waning_crescent';
}

// Generate daily luck score
function generateLuckScore(sunSign) {
    const sign = SIGN_DATA[sunSign];
    if (!sign) return null;
    
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    
    // Base score with sign influence
    let baseScore = 50;
    
    // Element bonus
    if (sign.element === 'Fire') baseScore += 10;
    else if (sign.element === 'Earth') baseScore += 5;
    else if (sign.element === 'Air') baseScore += 8;
    else if (sign.element === 'Water') baseScore += 7;
    
    // Ruler influence
    if (['Venus', 'Jupiter', 'Sun'].includes(sign.ruler)) baseScore += 10;
    
    // Day variation (pseudo-random but deterministic)
    const variation = (dayOfYear * 17 + sunSign.length * 7) % 30 - 15;
    baseScore += variation;
    
    // Clamp to 0-100
    const score = Math.max(0, Math.min(100, baseScore));
    
    // Generate factors
    const factors = [];
    if (sign.element === 'Fire') factors.push(`${sign.element} energy fuels your confidence today`);
    else if (sign.element === 'Earth') factors.push(`${sign.element} energy grounds your decisions`);
    else if (sign.element === 'Air') factors.push(`${sign.element} energy sharpens your mind`);
    else factors.push(`${sign.element} energy deepens your intuition`);
    
    if (['Venus', 'Jupiter', 'Sun'].includes(sign.ruler)) {
        factors.push(`Your ruler ${sign.ruler} brings favorable energy`);
    }
    
    // Lucky number
    const luckyNum = sign.luckyNumbers[dayOfYear % sign.luckyNumbers.length];
    
    // Rating
    let rating;
    if (score >= 80) rating = "🔥🔥🔥 EXCELLENT";
    else if (score >= 65) rating = "🔥🔥 GOOD";
    else if (score >= 50) rating = "🔥 FAIR";
    else if (score >= 35) rating = "⚠️ CAUTIOUS";
    else rating = "❌ CHALLENGING";
    
    // Advice
    let advice;
    if (score >= 70) advice = `Excellent day for ${sign.bestActivities[0]}! Your ${sign.traits[0]} nature is highlighted.`;
    else if (score >= 50) advice = `Moderate energy today. Good for planning and preparation.`;
    else advice = `Low energy day. Rest and recharge rather than pushing forward.`;
    
    return {
        score,
        rating,
        luckyNumber: luckyNum,
        luckyColor: sign.luckyColors[0],
        luckyTime: ['morning', 'afternoon', 'evening'][dayOfYear % 3],
        factors,
        advice
    };
}

// Generate lucky numbers
function generateLuckyNumbers(sunSign, moonSign = null, risingSign = null) {
    const numbers = new Set();
    
    // Add Sun sign numbers
    if (SIGN_DATA[sunSign]) {
        SIGN_DATA[sunSign].luckyNumbers.forEach(n => numbers.add(n));
    }
    
    // Add Moon sign numbers
    if (moonSign && SIGN_DATA[moonSign]) {
        SIGN_DATA[moonSign].luckyNumbers.slice(0, 2).forEach(n => numbers.add(n));
    }
    
    // Add Rising sign numbers
    if (risingSign && SIGN_DATA[risingSign]) {
        SIGN_DATA[risingSign].luckyNumbers.slice(0, 1).forEach(n => numbers.add(n));
    }
    
    // Add date-based numbers
    const today = new Date();
    numbers.add(today.getDate());
    numbers.add(today.getMonth() + 1);
    
    // Fill to 7 numbers
    let n = 1;
    while (numbers.size < 7) {
        numbers.add(((Array.from(numbers).reduce((a, b) => a + b, 0) + n * 7) % 49) + 1);
        n++;
    }
    
    return {
        numbers: Array.from(numbers).sort((a, b) => a - b),
        powerNumber: Array.from(numbers)[0],
        sunSign,
        explanation: `Based on your ${sunSign} Sun${moonSign ? ` and ${moonSign} Moon` : ''}`
    };
}

// Modal functions
function openReadingModal(type) {
    const modal = document.getElementById('reading-modal');
    const modalBody = document.getElementById('modal-body');
    
    let content = '';
    
    switch(type) {
        case 'daily-luck':
            content = `
                <h2>🎰 Daily Luck Score</h2>
                <p>Enter your Sun sign to get today's personalized luck reading.</p>
                <form id="daily-luck-form">
                    <div class="form-group">
                        <label>Your Sun Sign</label>
                        <select id="sun-sign" required>
                            <option value="">Select your sign...</option>
                            ${Object.keys(SIGN_DATA).map(sign => `<option value="${sign}">${sign}</option>`).join('')}
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary btn-full">Get My Luck Score — $5</button>
                </form>
                <div id="luck-result" style="margin-top: 20px;"></div>
            `;
            break;
            
        case 'lucky-numbers':
            content = `
                <h2>🔢 Lucky Numbers</h2>
                <p>Get your personalized lucky numbers based on your birth chart.</p>
                <form id="lucky-numbers-form">
                    <div class="form-group">
                        <label>Sun Sign</label>
                        <select id="sun-sign" required>
                            <option value="">Select...</option>
                            ${Object.keys(SIGN_DATA).map(sign => `<option value="${sign}">${sign}</option>`).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Moon Sign (optional)</label>
                        <select id="moon-sign">
                            <option value="">Don't know</option>
                            ${Object.keys(SIGN_DATA).map(sign => `<option value="${sign}">${sign}</option>`).join('')}
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary btn-full">Get My Numbers — $5</button>
                </form>
                <div id="numbers-result" style="margin-top: 20px;"></div>
            `;
            break;
            
        case 'birth-snapshot':
            content = `
                <h2>🜛 Birth Chart Snapshot</h2>
                <p>A 300-400 word temperament reading based on your Big Three.</p>
                <form id="snapshot-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Sun Sign</label>
                            <select required>
                                ${Object.keys(SIGN_DATA).map(sign => `<option value="${sign}">${sign}</option>`).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Moon Sign</label>
                            <select required>
                                ${Object.keys(SIGN_DATA).map(sign => `<option value="${sign}">${sign}</option>`).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Rising Sign</label>
                            <select required>
                                ${Object.keys(SIGN_DATA).map(sign => `<option value="${sign}">${sign}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary btn-full">Get My Snapshot — $9</button>
                </form>
            `;
            break;
            
        default:
            content = `<h2>Coming Soon</h2><p>This reading type will be available shortly.</p>`;
    }
    
    modalBody.innerHTML = content;
    modal.classList.add('active');
    
    // Add form handlers
    attachFormHandlers();
}

function closeReadingModal() {
    const modal = document.getElementById('reading-modal');
    modal.classList.remove('active');
}

function attachFormHandlers() {
    // Daily luck form
    const luckForm = document.getElementById('daily-luck-form');
    if (luckForm) {
        luckForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const sign = document.getElementById('sun-sign').value;
            const result = generateLuckScore(sign);
            
            if (result) {
                document.getElementById('luck-result').innerHTML = `
                    <div style="background: var(--color-bg); padding: 20px; border-radius: 12px; text-align: center;">
                        <div style="font-size: 3rem; margin-bottom: 10px;">${result.rating}</div>
                        <div style="font-size: 4rem; font-weight: bold; color: var(--color-primary); margin-bottom: 10px;">${result.score}/100</div>
                        <div style="font-size: 1.2rem; margin-bottom: 20px;">
                            🍀 Lucky Number: <strong>${result.luckyNumber}</strong> | 
                            🎨 Lucky Color: <strong>${result.luckyColor}</strong>
                        </div>
                        <p style="color: var(--color-text-light); margin-bottom: 20px;">${result.advice}</p>
                        <button class="btn btn-primary btn-full" onclick="processPayment('daily-luck', 5)">Pay $5 & Get Full Reading</button>
                    </div>
                `;
            }
        });
    }
    
    // Lucky numbers form
    const numbersForm = document.getElementById('lucky-numbers-form');
    if (numbersForm) {
        numbersForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const sun = document.getElementById('sun-sign').value;
            const moon = document.getElementById('moon-sign').value || null;
            const result = generateLuckyNumbers(sun, moon);
            
            document.getElementById('numbers-result').innerHTML = `
                <div style="background: var(--color-bg); padding: 20px; border-radius: 12px; text-align: center;">
                    <div style="font-size: 2.5rem; margin-bottom: 10px;">🔢</div>
                    <div style="font-size: 2rem; font-weight: bold; color: var(--color-primary); margin-bottom: 10px;">
                        ${result.numbers.join(', ')}
                    </div>
                    <div style="margin-bottom: 20px;">
                        ⚡ Power Number: <strong>${result.powerNumber}</strong>
                    </div>
                    <p style="color: var(--color-text-light); margin-bottom: 20px;">${result.explanation}</p>
                    <button class="btn btn-primary btn-full" onclick="processPayment('lucky-numbers', 5)">Pay $5 & Get Full Report</button>
                </div>
            `;
        });
    }
}

// Payment processing (placeholder)
function processPayment(type, amount) {
    alert(`Redirecting to payment for ${type} ($${amount})...\n\nIn production, this would connect to Stripe.`);
}

// Close modal on outside click
document.addEventListener('click', (e) => {
    const modal = document.getElementById('reading-modal');
    if (e.target === modal) {
        closeReadingModal();
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('AI Readings loaded');
});
