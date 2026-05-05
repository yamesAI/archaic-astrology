/**
 * Wedding & Synastry - Relationship Astrology
 */

// Calculate compatibility score
function calculateCompatibility(sign1, sign2) {
    const elements = {
        Aries: 'Fire', Taurus: 'Earth', Gemini: 'Air', Cancer: 'Water',
        Leo: 'Fire', Virgo: 'Earth', Libra: 'Air', Scorpio: 'Water',
        Sagittarius: 'Fire', Capricorn: 'Earth', Aquarius: 'Air', Pisces: 'Water'
    };
    
    const elem1 = elements[sign1];
    const elem2 = elements[sign2];
    
    let score = 50;
    let factors = [];
    
    // Element compatibility
    if (elem1 === elem2) {
        score += 15;
        factors.push(`Both ${elem1} — natural understanding`);
    } else if (
        (elem1 === 'Fire' && elem2 === 'Air') ||
        (elem1 === 'Air' && elem2 === 'Fire') ||
        (elem1 === 'Earth' && elem2 === 'Water') ||
        (elem1 === 'Water' && elem2 === 'Earth')
    ) {
        score += 20;
        factors.push(`${elem1} and ${elem2} — complementary energies`);
    } else {
        score += 5;
        factors.push(`${elem1} and ${elem2} — different approaches require understanding`);
    }
    
    // Modality (simplified)
    const modalities = {
        Aries: 'Cardinal', Cancer: 'Cardinal', Libra: 'Cardinal', Capricorn: 'Cardinal',
        Taurus: 'Fixed', Leo: 'Fixed', Scorpio: 'Fixed', Aquarius: 'Fixed',
        Gemini: 'Mutable', Virgo: 'Mutable', Sagittarius: 'Mutable', Pisces: 'Mutable'
    };
    
    if (modalities[sign1] === modalities[sign2]) {
        score += 10;
        factors.push('Same modality — similar rhythms');
    }
    
    // Special pairs
    const specialPairs = [
        ['Aries', 'Libra'], ['Taurus', 'Scorpio'], ['Gemini', 'Sagittarius'],
        ['Cancer', 'Capricorn'], ['Leo', 'Aquarius'], ['Virgo', 'Pisces']
    ];
    
    const pair = [sign1, sign2].sort();
    for (let sp of specialPairs) {
        if (sp[0] === pair[0] && sp[1] === pair[1]) {
            score += 15;
            factors.push('Opposite signs — magnetic attraction');
            break;
        }
    }
    
    const finalScore = Math.min(100, score);
    
    let rating;
    if (finalScore >= 80) rating = "💫💫💫 SOULMATE POTENTIAL";
    else if (finalScore >= 65) rating = "💫💫 EXCELLENT MATCH";
    else if (finalScore >= 50) rating = "💫 GOOD COMPATIBILITY";
    else if (finalScore >= 35) rating = "⚖️ MODERATE — WORK REQUIRED";
    else rating = "⚠️ CHALLENGING";
    
    return { score: finalScore, rating, factors };
}

// Modal functions
function openWeddingModal(type) {
    const modal = document.getElementById('wedding-modal');
    const modalBody = document.getElementById('wedding-modal-body');
    
    let content = '';
    
    switch(type) {
        case 'wedding-election':
            content = `
                <h2>💒 Wedding Date Election</h2>
                <p>Find the most auspicious dates for your wedding ceremony.</p>
                <form id="wedding-form">
                    <div class="form-group">
                        <label>Partner 1 Sun Sign</label>
                        <select id="p1-sign" required>
                            <option value="">Select...</option>
                            ${['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'].map(s => `<option value="${s}">${s}</option>`).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Partner 2 Sun Sign</label>
                        <select id="p2-sign" required>
                            <option value="">Select...</option>
                            ${['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'].map(s => `<option value="${s}">${s}</option>`).join('')}
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary btn-full">Find Wedding Dates — $75</button>
                </form>
                <div id="wedding-preview" style="margin-top: 20px;"></div>
            `;
            break;
            
        case 'synastry':
            content = `
                <h2>💕 Synastry Compatibility</h2>
                <p>Check your astrological compatibility.</p>
                <form id="synastry-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Your Sign</label>
                            <select id="syn-sign1" required>
                                ${['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'].map(s => `<option value="${s}">${s}</option>`).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Partner's Sign</label>
                            <select id="syn-sign2" required>
                                ${['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'].map(s => `<option value="${s}">${s}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary btn-full">Check Compatibility — $49</button>
                </form>
                <div id="synastry-result" style="margin-top: 20px;"></div>
            `;
            break;
            
        default:
            content = `<h2>Wedding Service</h2><p>Available for purchase. Book your consultation.</p><a href="booking.html" class="btn btn-primary btn-full">Book Now</a>`;
    }
    
    modalBody.innerHTML = content;
    modal.classList.add('active');
    
    // Attach handlers
    const weddingForm = document.getElementById('wedding-form');
    if (weddingForm) {
        weddingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const p1 = document.getElementById('p1-sign').value;
            const p2 = document.getElementById('p2-sign').value;
            
            document.getElementById('wedding-preview').innerHTML = `
                <div style="background: #fff5f5; padding: 20px; border-radius: 12px; border: 1px solid var(--color-border);">
                    <p style="margin-bottom: 15px;">Analyzing compatibility between <strong>${p1}</strong> and <strong>${p2}</strong>...</p>
                    <button class="btn btn-primary btn-full" onclick="processPayment('wedding-election', 75)">Proceed to Payment — $75</button>
                </div>
            `;
        });
    }
    
    const synastryForm = document.getElementById('synastry-form');
    if (synastryForm) {
        synastryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const s1 = document.getElementById('syn-sign1').value;
            const s2 = document.getElementById('syn-sign2').value;
            const result = calculateCompatibility(s1, s2);
            
            document.getElementById('synastry-result').innerHTML = `
                <div style="background: #fff5f5; padding: 20px; border-radius: 12px; border: 1px solid var(--color-border); text-align: center;">
                    <div style="font-size: 2rem; margin-bottom: 10px;">${result.rating}</div>
                    <div style="font-size: 3rem; font-weight: bold; color: var(--wedding-primary); margin-bottom: 15px;">${result.score}/100</div>
                    <ul style="text-align: left; margin-bottom: 20px;">
                        ${result.factors.map(f => `<li>✓ ${f}</li>`).join('')}
                    </ul>
                    <button class="btn btn-primary btn-full" onclick="processPayment('synastry', 49)">Get Full Report — $49</button>
                </div>
            `;
        });
    }
}

function closeWeddingModal() {
    const modal = document.getElementById('wedding-modal');
    modal.classList.remove('active');
}

// Wedding election form
document.addEventListener('DOMContentLoaded', () => {
    const electionForm = document.getElementById('wedding-election-form');
    if (electionForm) {
        electionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Wedding election request submitted! In production, this would process payment and generate your report.');
        });
    }
});

// Close modal on outside click
document.addEventListener('click', (e) => {
    const modal = document.getElementById('wedding-modal');
    if (e.target === modal) {
        closeWeddingModal();
    }
});
