/**
 * Astro Gardening - Lunar Planting Calendar
 */

// Moon phases with gardening data
const MOON_PHASES = {
    new: { name: 'New Moon', plant: false, action: 'Plan, prepare beds' },
    waxing_crescent: { name: 'Waxing Crescent', plant: true, plantType: 'above-ground', action: 'Plant annuals, leafy greens' },
    first_quarter: { name: 'First Quarter', plant: true, plantType: 'above-ground', action: 'Plant flowering annuals' },
    waxing_gibbous: { name: 'Waxing Gibbous', plant: true, plantType: 'fruiting', action: 'Plant vines, melons' },
    full: { name: 'Full Moon', plant: false, action: 'Harvest, gather seeds' },
    waning_gibbous: { name: 'Waning Gibbous', plant: true, plantType: 'roots', action: 'Plant root crops' },
    last_quarter: { name: 'Last Quarter', plant: true, plantType: 'roots', action: 'Plant tubers, bulbs' },
    waning_crescent: { name: 'Waning Crescent', plant: false, action: 'Weed, prune, cultivate' }
};

// Signs and plant parts
const SIGN_PLANTS = {
    Aries: { element: 'Fire', part: 'seeds', plants: ['tomatoes', 'peppers', 'squash'] },
    Taurus: { element: 'Earth', part: 'roots', plants: ['carrots', 'beets', 'potatoes'] },
    Gemini: { element: 'Air', part: 'flowers', plants: ['herbs', 'flowering annuals'] },
    Cancer: { element: 'Water', part: 'leaves', plants: ['lettuce', 'spinach', 'cabbage'] },
    Leo: { element: 'Fire', part: 'seeds', plants: ['sunflowers', 'corn', 'melons'] },
    Virgo: { element: 'Earth', part: 'roots', plants: ['radishes', 'turnips', 'onions'] },
    Libra: { element: 'Air', part: 'flowers', plants: ['flowers', 'clematis', 'sweet peas'] },
    Scorpio: { element: 'Water', part: 'roots', plants: ['garlic', 'mushrooms', 'rhubarb'] },
    Sagittarius: { element: 'Fire', part: 'seeds', plants: ['asparagus', 'strawberries'] },
    Capricorn: { element: 'Earth', part: 'roots', plants: ['rhubarb', 'horseradish'] },
    Aquarius: { element: 'Air', part: 'flowers', plants: ['legumes', 'cover crops'] },
    Pisces: { element: 'Water', part: 'leaves', plants: ['cucumbers', 'pumpkins'] }
};

// Generate lunar calendar
function generateLunarCalendar(months = 1, startDate = new Date()) {
    const calendar = [];
    const days = months * 30;
    
    for (let i = 0; i < days; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        
        // Simplified moon phase calculation
        const moonAge = ((date.getDate() + date.getMonth() * 30) % 29.5);
        let phase;
        if (moonAge < 1) phase = 'new';
        else if (moonAge < 7) phase = 'waxing_crescent';
        else if (moonAge < 8) phase = 'first_quarter';
        else if (moonAge < 14) phase = 'waxing_gibbous';
        else if (moonAge < 16) phase = 'full';
        else if (moonAge < 22) phase = 'waning_gibbous';
        else if (moonAge < 23) phase = 'last_quarter';
        else phase = 'waning_crescent';
        
        // Simplified moon sign
        const signs = Object.keys(SIGN_PLANTS);
        const signIndex = Math.floor((i / 2.5) % 12);
        const moonSign = signs[signIndex];
        
        const phaseData = MOON_PHASES[phase];
        
        calendar.push({
            date: date,
            dateStr: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
            phase: phase,
            phaseName: phaseData.name,
            moonSign: moonSign,
            canPlant: phaseData.plant,
            plantType: phaseData.plantType,
            action: phaseData.action,
            element: SIGN_PLANTS[moonSign].element
        });
    }
    
    return calendar;
}

// Get personalized garden advice
function getGardenAdvice(sunSign) {
    const signData = SIGN_PLANTS[sunSign];
    if (!signData) return null;
    
    const elementStyles = {
        Fire: { style: 'Intensive, passionate', bestFor: 'heat-loving crops', approach: 'enthusiastic starts' },
        Earth: { style: 'Methodical, practical', bestFor: 'food production', approach: 'patient, long-term' },
        Air: { style: 'Experimental, diverse', bestFor: 'trying new varieties', approach: 'planning and layout' },
        Water: { style: 'Nurturing, intuitive', bestFor: 'moisture-loving plants', approach: 'responsive care' }
    };
    
    const element = elementStyles[signData.element];
    
    return {
        element: signData.element,
        style: element.style,
        bestFor: element.bestFor,
        approach: element.approach,
        luckyPlants: signData.plants,
        recommendedSigns: Object.entries(SIGN_PLANTS)
            .filter(([sign, data]) => data.element === signData.element && sign !== sunSign)
            .map(([sign]) => sign)
    };
}

// Modal functions
function openGardeningModal(type) {
    const modal = document.getElementById('gardening-modal');
    const modalBody = document.getElementById('gardening-modal-body');
    
    let content = '';
    
    switch(type) {
        case 'planting-calendar':
            content = `
                <h2>🗓️ Lunar Planting Calendar</h2>
                <p>Get your personalized monthly gardening calendar.</p>
                <form id="calendar-form">
                    <div class="form-group">
                        <label>Your Sun Sign</label>
                        <select id="garden-sign" required>
                            <option value="">Select...</option>
                            ${Object.keys(SIGN_PLANTS).map(s => `<option value="${s}">${s}</option>`).join('')}
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary btn-full">Get Calendar — $19/month</button>
                </form>
                <div id="calendar-preview" style="margin-top: 20px;"></div>
            `;
            break;
            
        case 'moon-guide':
            content = `
                <h2>🌙 Personal Garden Moon Guide</h2>
                <p>Discover your elemental gardening style.</p>
                <form id="guide-form">
                    <div class="form-group">
                        <label>Your Sun Sign</label>
                        <select id="guide-sign" required>
                            ${Object.keys(SIGN_PLANTS).map(s => `<option value="${s}">${s}</option>`).join('')}
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary btn-full">Get My Guide — $25</button>
                </form>
                <div id="guide-result" style="margin-top: 20px;"></div>
            `;
            break;
            
        default:
            content = `<h2>Gardening Service</h2><p>Available for purchase.</p><button class="btn btn-primary btn-full" onclick="alert('Redirecting to payment...')">Purchase</button>`;
    }
    
    modal = modal || document.createElement('div');
    modalBody.innerHTML = content;
    modal.classList.add('active');
    
    // Attach handlers
    const calendarForm = document.getElementById('calendar-form');
    if (calendarForm) {
        calendarForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const sign = document.getElementById('garden-sign').value;
            const calendar = generateLunarCalendar(1);
            
            let previewHTML = '<h4>This Week Preview:</h4><div style="max-height: 200px; overflow-y: auto;">';
            calendar.slice(0, 7).forEach(day => {
                const canPlant = day.canPlant ? '🌱' : '❌';
                previewHTML += `
                    <div style="padding: 8px; border-bottom: 1px solid var(--color-border);">
                        <strong>${day.dateStr}</strong> — ${day.phaseName} in ${day.moonSign}
                        <br><small>${canPlant} ${day.action}</small>
                    </div>
                `;
            });
            previewHTML += '</div>';
            
            document.getElementById('calendar-preview').innerHTML = previewHTML + `
                <button class="btn btn-primary btn-full" style="margin-top: 15px;" onclick="processPayment('planting-calendar', 19)">Subscribe $19/month</button>
            `;
        });
    }
    
    const guideForm = document.getElementById('guide-form');
    if (guideForm) {
        guideForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const sign = document.getElementById('guide-sign').value;
            const advice = getGardenAdvice(sign);
            
            document.getElementById('guide-result').innerHTML = `
                <div style="background: #f5faf5; padding: 20px; border-radius: 12px;">
                    <h4>${sign} Gardener Profile</h4>
                    <p><strong>Element:</strong> ${advice.element}</p>
                    <p><strong>Style:</strong> ${advice.style}</p>
                    <p><strong>Best For:</strong> ${advice.bestFor}</p>
                    <p><strong>Lucky Plants:</strong> ${advice.luckyPlants.join(', ')}</p>
                    <button class="btn btn-primary btn-full" style="margin-top: 15px;" onclick="processPayment('moon-guide', 25)">Get Full Guide — $25</button>
                </div>
            `;
        });
    }
}

function closeGardeningModal() {
    const modal = document.getElementById('gardening-modal');
    if (modal) modal.classList.remove('active');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('Gardening module loaded');
});
