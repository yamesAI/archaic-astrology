/**
 * StarLuck Jackpot - Cosmic Timing Calculations
 * Gambling, lottery, and speculation timing
 */

// Planetary hour calculation
function getPlanetaryHour(dayOfWeek, hour) {
    const dayRulers = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
    const hourOrder = ['Saturn', 'Jupiter', 'Mars', 'Sun', 'Venus', 'Mercury', 'Moon'];
    
    const dayRuler = dayRulers[dayOfWeek];
    const dayRulerIndex = hourOrder.indexOf(dayRuler);
    const hourRulerIndex = (dayRulerIndex + hour) % 7;
    
    return hourOrder[hourRulerIndex];
}

// Calculate luck score for activities
function calculateStarluckScore(sunSign, activity, date = new Date()) {
    const signData = {
        Aries: { element: 'Fire', ruler: 'Mars' },
        Taurus: { element: 'Earth', ruler: 'Venus' },
        Gemini: { element: 'Air', ruler: 'Mercury' },
        Cancer: { element: 'Water', ruler: 'Moon' },
        Leo: { element: 'Fire', ruler: 'Sun' },
        Virgo: { element: 'Earth', ruler: 'Mercury' },
        Libra: { element: 'Air', ruler: 'Venus' },
        Scorpio: { element: 'Water', ruler: 'Mars' },
        Sagittarius: { element: 'Fire', ruler: 'Jupiter' },
        Capricorn: { element: 'Earth', ruler: 'Saturn' },
        Aquarius: { element: 'Air', ruler: 'Saturn' },
        Pisces: { element: 'Water', ruler: 'Jupiter' }
    };
    
    const sign = signData[sunSign];
    if (!sign) return null;
    
    let baseScore = 50;
    let factors = [];
    let recommendation = '';
    
    // Day of week influence
    const day = date.getDay();
    const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][day];
    const dayRuler = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'][day];
    
    // Activity-specific scoring
    switch(activity) {
        case 'casino':
            if (dayRuler === 'Venus') {
                baseScore += 20;
                factors.push('Friday (Venus day) — excellent for games of chance');
            } else if (dayRuler === 'Jupiter') {
                baseScore += 15;
                factors.push('Thursday (Jupiter day) — good for calculated risks');
            } else if (dayRuler === 'Saturn') {
                baseScore -= 10;
                factors.push('Saturday brings restraint — set strict limits');
            }
            
            if (sign.ruler === 'Venus') {
                baseScore += 10;
                factors.push('Your Venus rulership favors aesthetic luck');
            }
            
            recommendation = baseScore >= 60 ? 
                '🎰 Favorable for slots, roulette, and chance games' :
                '⚠️ Conservative play recommended today';
            break;
            
        case 'lottery':
            if (dayRuler === 'Jupiter') {
                baseScore += 25;
                factors.push('Jupiter day — fortune favors the bold');
            } else if (dayRuler === 'Venus') {
                baseScore += 15;
                factors.push('Venus influence brings attraction energy');
            }
            
            if (['Jupiter', 'Venus'].includes(sign.ruler)) {
                baseScore += 10;
                factors.push(`Your ${sign.ruler} rulership aligns with fortune`);
            }
            
            recommendation = baseScore >= 65 ?
                '🎱 Excellent day for lottery — luck is amplified' :
                '🎱 Moderate potential — play for fun, not expectation';
            break;
            
        case 'sports':
            if (dayRuler === 'Mars') {
                baseScore += 20;
                factors.push('Tuesday (Mars day) — competitive energy is high');
            } else if (dayRuler === 'Sun') {
                baseScore += 10;
                factors.push('Sunday brings visibility to favorites');
            }
            
            if (sign.ruler === 'Mars') {
                baseScore += 15;
                factors.push('Your Mars rulership gives competitive edge');
            }
            
            recommendation = baseScore >= 60 ?
                '⚽ Good day for sports betting — follow your analysis' :
                '⚽ Avoid underdog bets today — stick to favorites';
            break;
            
        case 'trading':
            if (dayRuler === 'Jupiter') {
                baseScore += 20;
                factors.push('Jupiter day favors expansion trades');
            } else if (dayRuler === 'Mercury') {
                baseScore += 10;
                factors.push('Mercury day — good for quick moves');
            } else if (dayRuler === 'Saturn') {
                baseScore += 15;
                factors.push('Saturn day favors disciplined, long positions');
            }
            
            if (['Mercury', 'Jupiter', 'Saturn'].includes(sign.ruler)) {
                baseScore += 10;
                factors.push(`${sign.ruler} rulership supports financial decisions`);
            }
            
            recommendation = baseScore >= 65 ?
                '📈 Favorable for entries — watch for your optimal window' :
                '📊 Wait for better alignment — preserve capital';
            break;
            
        default:
            recommendation = 'General luck assessment complete';
    }
    
    // Moon phase influence
    const moonAge = (date.getDate() % 29.5);
    if (moonAge < 14) {
        baseScore += 5;
        factors.push('Waxing moon — growth energy supports risk');
    } else {
        factors.push('Waning moon — conserve and review positions');
    }
    
    // Planetary hour
    const currentHour = date.getHours();
    const planetaryHour = getPlanetaryHour(day, currentHour);
    
    if (['Venus', 'Jupiter'].includes(planetaryHour)) {
        baseScore += 10;
        factors.push(`${planetaryHour} hour amplifies positive outcomes`);
    } else if (planetaryHour === 'Saturn') {
        baseScore -= 5;
        factors.push('Saturn hour — discipline required');
    }
    
    const finalScore = Math.max(0, Math.min(100, baseScore));
    
    let rating;
    if (finalScore >= 80) rating = "🔥🔥🔥 EXCELLENT";
    else if (finalScore >= 65) rating = "🔥🔥 GOOD";
    else if (finalScore >= 50) rating = "🔥 FAIR";
    else if (finalScore >= 35) rating = "⚠️ CAUTIOUS";
    else rating = "❌ AVOID";
    
    return {
        score: finalScore,
        rating,
        factors,
        recommendation,
        planetaryHour,
        dayRuler
    };
}

// Modal functions
function openStarluckModal(type) {
    const modal = document.getElementById('starluck-modal');
    const modalBody = document.getElementById('starluck-modal-body');
    
    let content = '';
    
    switch(type) {
        case 'casino-calendar':
            content = `
                <h2>🎰 Casino Timing Calendar</h2>
                <p>Get your personalized monthly calendar for optimal casino timing.</p>
                <form id="casino-form">
                    <div class="form-group">
                        <label>Your Sun Sign</label>
                        <select id="sun-sign" required>
                            <option value="">Select...</option>
                            ${['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'].map(s => `<option value="${s}">${s}</option>`).join('')}
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary btn-full">Get Casino Calendar — $27/month</button>
                </form>
                <div id="casino-preview" style="margin-top: 20px;"></div>
            `;
            break;
            
        case 'lottery-elector':
            content = `
                <h2>🎱 Lottery Number Elector</h2>
                <p>Find the optimal time to buy your ticket + get lucky numbers.</p>
                <form id="lottery-form">
                    <div class="form-group">
                        <label>Sun Sign</label>
                        <select required>
                            ${['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'].map(s => `<option value="${s}">${s}</option>`).join('')}
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary btn-full">Elect My Numbers — $19</button>
                </form>
            `;
            break;
            
        default:
            handlePayment(type);
            return;
    }
    
    modalBody.innerHTML = content;
    modal.classList.add('active');
    
    // Attach handlers
    const casinoForm = document.getElementById('casino-form');
    if (casinoForm) {
        casinoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const sign = document.getElementById('sun-sign').value;
            const result = calculateStarluckScore(sign, 'casino');
            
            document.getElementById('casino-preview').innerHTML = `
                <div style="background: rgba(255,215,0,0.1); padding: 20px; border-radius: 12px; border: 1px solid rgba(255,215,0,0.3);">
                    <div style="font-size: 2rem; margin-bottom: 10px;">${result.rating}</div>
                    <div style="font-size: 3rem; font-weight: bold; color: #ffd700; margin-bottom: 10px;">${result.score}/100</div>
                    <p style="margin-bottom: 15px;">${result.recommendation}</p>
                    <ul style="text-align: left; margin-bottom: 20px;">
                        ${result.factors.map(f => `<li>✓ ${f}</li>`).join('')}
                    </ul>
                    <button class="btn btn-primary btn-full" onclick="processPayment('casino-calendar', 27)">Subscribe $27/month</button>
                </div>
            `;
        });
    }
}

function closeStarluckModal() {
    const modal = document.getElementById('starluck-modal');
    modal.classList.remove('active');
}

// Luck calculator on page
document.addEventListener('DOMContentLoaded', () => {
    const calculatorForm = document.getElementById('luck-calculator-form');
    if (calculatorForm) {
        calculatorForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const sign = document.getElementById('calc-sun').value;
            const activity = document.getElementById('calc-activity').value;
            
            if (sign && activity) {
                const result = calculateStarluckScore(sign, activity);
                const resultDiv = document.getElementById('calculator-result');
                
                resultDiv.innerHTML = `
                    <div style="text-align: center;">
                        <div style="font-size: 2.5rem; margin-bottom: 10px;">${result.rating}</div>
                        <div style="font-size: 4rem; font-weight: bold; color: #ffd700; margin-bottom: 15px;">${result.score}/100</div>
                        <p style="font-size: 1.1rem; margin-bottom: 15px;">${result.recommendation}</p>
                        <p style="color: rgba(255,255,255,0.7); font-size: 0.9rem;">
                            Current: ${result.dayRuler} day, ${result.planetaryHour} hour
                        </p>
                    </div>
                `;
                resultDiv.style.display = 'block';
            }
        });
    }
});

// Close modal on outside click
document.addEventListener('click', (e) => {
    const modal = document.getElementById('starluck-modal');
    if (e.target === modal) {
        closeStarluckModal();
    }
});
