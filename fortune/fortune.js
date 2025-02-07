// Constants
const API_KEY = ''; // Replace with your actual API key
const API_URL = 'https://api.openai.com/v1/completions'; // Replace with your API endpoint

// DOM Elements
const fortuneForm = document.querySelector('.fortune-form');
const readingResult = document.querySelector('.reading-result');
const readingContent = document.querySelector('.reading-content');

// Fortune Reading Class
class FortuneReading {
    constructor(name, dob, zodiac, question, area) {
        this.name = name;
        this.dob = dob;
        this.zodiac = zodiac;
        this.question = question;
        this.area = area;
    }

    // Generate prompt for AI
    generatePrompt() {
        return `As a mystic fortune teller, provide a detailed fortune reading for:
        Name: ${this.name}
        Date of Birth: ${this.dob}
        Zodiac Sign: ${this.zodiac}
        Question: ${this.question}
        Area of Focus: ${this.area}
        
        Please provide an intuitive and insightful reading that includes:
        1. Current energies and influences
        2. Future predictions and guidance
        3. Spiritual advice and recommendations`;
    }
}

// Animation for loading state
const showLoadingAnimation = () => {
    readingContent.innerHTML = `
        <div class="loading-animation">
            <div class="crystal-ball">
                <div class="inner-glow"></div>
            </div>
            <p>Consulting the celestial forces...</p>
        </div>
    `;
};

// Get Fortune Reading from AI
async function getFortunePrediction(fortuneReading) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                prompt: fortuneReading.generatePrompt(),
                max_tokens: 500,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error('Fortune telling failed');
        }

        const data = await response.json();
        return data.choices[0].text.trim();
    } catch (error) {
        console.error('Error:', error);
        return 'The cosmic forces are unclear at this moment. Please try again later.';
    }
}

// Display the fortune reading
const displayReading = (reading) => {
    readingContent.innerHTML = `
        <div class="fortune-reading">
            <p class="reading-text">${reading}</p>
            <div class="mystic-symbols">
                <span>✨</span>
                <span>🌙</span>
                <span>⭐</span>
            </div>
        </div>
    `;
    readingResult.classList.add('active');
};

// Form submission handler
fortuneForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fortuneReading = new FortuneReading(
        document.getElementById('name').value,
        document.getElementById('dob').value,
        document.getElementById('zodiac').value,
        document.getElementById('question').value,
        document.getElementById('area').value
    );

    showLoadingAnimation();
    readingResult.scrollIntoView({ behavior: 'smooth' });

    const prediction = await getFortunePrediction(fortuneReading);
    displayReading(prediction);
});

// Add form validation
const inputs = fortuneForm.querySelectorAll('input, select, textarea');
inputs.forEach(input => {
    input.addEventListener('input', () => {
        input.classList.toggle('valid', input.checkValidity());
    });
});

// Add celestial animation effects
document.querySelectorAll('.star').forEach(star => {
    star.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite`;
});

document.querySelectorAll('.moon, .planet').forEach(celestialBody => {
    celestialBody.style.animation = `float ${Math.random() * 5 + 5}s infinite`;
});