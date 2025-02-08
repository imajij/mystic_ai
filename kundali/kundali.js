document.getElementById("kundaliForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const name = document.getElementById("name").value;
    const birthDateTime = new Date(document.getElementById("birthDate").value);
    const birthPlace = document.getElementById("birthPlace").value;
    const selectedCharts = Array.from(document.querySelectorAll("input[name='charts']:checked"))
                               .map(chart => chart.value);
    
    if (!birthDateTime) {
        alert("Please enter a valid birth date and time.");
        return;
    }
    
    const latitude = 18.933;  // Placeholder, you need a geocoding API for dynamic values
    const longitude = 72.8166;
    const timezone = 5.5; // Adjust this based on the birth place
    
    const requestData = {
        year: birthDateTime.getFullYear(),
        month: birthDateTime.getMonth() + 1,
        date: birthDateTime.getDate(),
        hours: birthDateTime.getHours(),
        minutes: birthDateTime.getMinutes(),
        seconds: 0,
        latitude: latitude,
        longitude: longitude,
        timezone: timezone,
        config: {
            observation_point: "topocentric",
            ayanamsha: "lahiri"
        }
    };
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-api-key", "bqQdsMUjvA8M8RTOCllA26a06NWAf79r7tGW91AM");
    const chartContainer = document.querySelector(".chart-container");
    try {
        const response = await fetch("https://json.apiastro.com/planets", {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(requestData),
            redirect: 'follow'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        displayAstroChart(data.output[1]);
        console.log(data);
    } catch (error) {
        console.error('Error fetching kundali data:', error);
    }
});

function displayAstroChart(data) {
    const zodiacSigns = {
        1: "Aries", 2: "Taurus", 3: "Gemini", 4: "Cancer",
        5: "Leo", 6: "Virgo", 7: "Libra", 8: "Scorpio",
        9: "Sagittarius", 10: "Capricorn", 11: "Aquarius", 12: "Pisces"
    };

    const chartContainer = document.querySelector(".chart-container");
    
    // Add proper data validation
    if (!data || typeof data !== "object") {
        chartContainer.innerHTML = `
            <div class="astro-chart error">
                <h3>Error Loading Chart</h3>
                <p>Unable to process astrological data. Please try again.</p>
            </div>
        `;
        return;
    }

    // Create chart HTML
    const chartHTML = `
        <div class="astro-chart">
            <div class="chart-header">
                <h3>Your Birth Chart Analysis</h3>
                <p class="chart-timestamp">Generated on ${new Date().toLocaleDateString()}</p>
            </div>
            <div class="planet-grid">
                ${Object.entries(data).map(([planet, info]) => {
                    if (planet !== "debug" && planet !== "ayanamsa" && info && info.current_sign) {
                        return `
                            <div class="planet-card ${info.isRetro === "true" ? 'retrograde' : ''}" 
                                 data-planet="${planet}">
                                <div class="planet-header">
                                    <div class="planet-icon">${getPlanetIcon(planet)}</div>
                                    <h4>${planet}</h4>
                                </div>
                                <div class="planet-details">
                                    <div class="detail-row">
                                        <span class="label">Sign:</span>
                                        <span class="value">${zodiacSigns[info.current_sign]}</span>
                                    </div>
                                    <div class="detail-row">
                                        <span class="label">Degree:</span>
                                        <span class="value">${parseFloat(info.normDegree).toFixed(2)}°</span>
                                    </div>
                                    ${info.isRetro === "true" ? 
                                        `<div class="retro-badge" title="Retrograde">
                                            <span class="retro-icon">R</span>
                                            <span class="retro-text">Retrograde</span>
                                        </div>` : 
                                        ''
                                    }
                                </div>
                            </div>
                        `;
                    }
                    return '';
                }).filter(Boolean).join('')}
            </div>
        </div>
    `;

    // Set the HTML content
    chartContainer.innerHTML = chartHTML;

    // Add animation delays
    document.querySelectorAll('.planet-card').forEach((card, index) => {
        card.style.setProperty('--animation-order', index);
        card.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
    });

    // Show the result container
    document.querySelector('.kundali-result').style.display = 'block';
}

function getPlanetIcon(planet) {
    const planetIcons = {
        'Sun': '☀️',
        'Moon': '🌙',
        'Mars': '♂️',
        'Mercury': '☿',
        'Jupiter': '♃',
        'Venus': '♀️',
        'Saturn': '♄',
        'Rahu': '☊',
        'Ketu': '☋',
        'Uranus': '⛢',
        'Neptune': '♆',
        'Pluto': '♇',
        'Ascendant': '↑'
    };
    return planetIcons[planet] || '🌟';
}
