document.addEventListener('DOMContentLoaded', function() {
    const fortuneForm = document.querySelector('.fortune-form');
    const readingResult = document.querySelector('.reading-result');
    const readingContent = document.querySelector('.reading-content');

    fortuneForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const zodiac = document.getElementById('zodiac').value;
        const area = document.getElementById('area').value;
        const question = document.getElementById('question').value;

        // Generate reading (simplified example)
        const reading = generateReading(name, zodiac, area, question);
        
        // Display result
        readingContent.innerHTML = reading;
        readingResult.classList.add('active');
    });
    
    function generateReading(name, zodiac, area, question) {
        const readings = {
            love: "Love is on the horizon. Trust your intuition.",
            career: "A new opportunity will present itself soon.",
            health: "Focus on mental and physical balance.",
            wealth: "Financial growth is coming your way.",
            spiritual: "Your spiritual journey will deepen."
        };
        
        return `
            <p>Dear ${name},</p>
            <p>Based on your ${zodiac} sign and the cosmic alignments:</p>
            <p>${readings[area]}</p>
            <p>Regarding your question: "${question}"</p>
            <p>The stars suggest patience and positive energy will guide you.</p>
        `;
    }
});