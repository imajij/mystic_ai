// Constants
const API_KEY = 'AIzaSyB9ts27PH19bFhiaz6uOQYnlPR2RvhaCns'; // Replace with your Gemini API key
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

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
        return `As a mystic fortune teller, provide a detailed fortune reading for:\n
        Name: ${this.name}\n
        Date of Birth: ${this.dob}\n
        Zodiac Sign: ${this.zodiac}\n
        Question: ${this.question}\n
        Area of Focus: ${this.area}\n
        \n
        Please provide an intuitive and insightful reading that includes:\n
        1. Current energies and influences\n
        2. Future predictions and guidance\n
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

// Get Fortune Reading from Gemini AI
async function getFortunePrediction(fortuneReading) {
    try {
        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gemini-pro',
                contents: [{
                    parts: [{
                        text: fortuneReading.generatePrompt()
                    }]
                }],
                safetySettings: [{
                    category: "HARM_CATEGORY_HARASSMENT",
                    threshold: "BLOCK_NONE"
                }],
                generationConfig: {
                    temperature: 0.7,
                    topP: 0.8,
                    topK: 40,
                    maxOutputTokens: 1024,
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('API Error:', errorData);
            throw new Error(`Fortune telling failed: ${errorData.error?.message || 'Unknown error'}`);
        }

        const data = await response.json();
        console.log('Raw API Response:', data); // Debug log

        // Updated response structure check
        if (data && data.candidates && data.candidates.length > 0) {
            const prediction = data.candidates[0].content?.parts?.[0]?.text || 'No prediction available.';
            if (prediction) {
                return prediction;
            }
        }
        
        throw new Error('Unexpected API response structure');

    } catch (error) {
        console.error('Error details:', error);
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
    readingResult.classList.add('active'); // Show the result container

    const fortuneReading = new FortuneReading(
        document.getElementById('name').value,
        document.getElementById('dob').value,
        document.getElementById('zodiac').value,
        document.getElementById('question').value,
        document.getElementById('area').value
    );

    showLoadingAnimation();
    
    try {
        const prediction = await getFortunePrediction(fortuneReading);
        displayReading(prediction);
    } catch (error) {
        console.error('Submission error:', error);
        displayReading('An error occurred while consulting the celestial forces. Please try again.');
    }

    readingResult.scrollIntoView({ behavior: 'smooth' });
});

// Add form validation
const inputs = fortuneForm.querySelectorAll('input, select, textarea');
inputs.forEach(input => {
    input.addEventListener('input', () => {
        input.classList.toggle('valid', input.checkValidity());
    });
});

// Fix the celestial animation effects
document.querySelectorAll('.star').forEach(star => {
    star.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite`;
});

// Fixed syntax for forEach arrow function
document.querySelectorAll('.moon, .planet').forEach((celestialBody) => {
    celestialBody.style.animation = `float ${Math.random() * 5 + 5}s infinite`;
});