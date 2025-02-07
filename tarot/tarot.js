document.getElementById("kundaliForm").addEventListener("submit", function(event) {
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
    
    fetch("https://json.apiastro.com/planets", {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(requestData),
        redirect: 'follow'
    })
    .then(response => response.json())
    .then(data => {
        document.querySelector(".chart-container").innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    })
    .catch(error => console.error('Error fetching kundali data:', error));
});
