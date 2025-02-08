document.addEventListener('DOMContentLoaded', () => {
    const crystalForm = document.getElementById('crystalForm');
    const predictionResult = document.querySelector('.prediction-result');
    const predictionContent = document.querySelector('.prediction-content');

    // Crystal ball animation enhancement
    const crystalBall = document.querySelector('.crystal-ball');
    crystalBall.addEventListener('mouseover', () => {
        crystalBall.style.animation = 'none';
        crystalBall.style.transform = 'scale(1.1)';
    });

    crystalBall.addEventListener('mouseout', () => {
        crystalBall.style.animation = 'float 6s infinite ease-in-out';
        crystalBall.style.transform = 'scale(1)';
    });

    // Form submission handler
    crystalForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const question = document.getElementById('question').value;
        const category = document.getElementById('category').value;

        // Show loading state
        predictionContent.innerHTML = `
            <div class="loading">
                <div class="crystal-ball">
                    <div class="crystal-glow"></div>
                </div>
                <p>The crystal ball is revealing your future...</p>
            </div>
        `;
        predictionResult.style.display = 'block';

        try {
            // Simulate API call with timeout
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Generate mystical prediction
            const prediction = generatePrediction(question, category);
            
            // Display prediction with fade-in effect
            predictionContent.innerHTML = `
                <div class="prediction-text">
                    <h3>The Crystal Ball Reveals...</h3>
                    <p>${prediction}</p>
                    <div class="mystical-symbols">✨🔮⭐</div>
                </div>
            `;
        } catch (error) {
            predictionContent.innerHTML = `
                <div class="error-message">
                    The crystal ball is clouded. Please try again later.
                </div>
            `;
        }

        // Scroll to prediction
        predictionResult.scrollIntoView({ behavior: 'smooth' });
    });
});

function generatePrediction(question, category) {
    const predictions = {
        life: [
            "A significant transformation awaits you in the coming months. Trust your intuition as it guides you through this change.",
            "The crystal ball shows multiple paths converging. Your next decision will shape your destiny.",
            "A long-awaited opportunity will present itself when the moon is full. Stay alert and prepared."
        ],
        love: [
            "Love's energy surrounds you. An unexpected encounter will spark a deep connection.",
            "Past connections resurface with new meaning. Trust your heart's wisdom in matters of love.",
            "The crystal ball reveals a harmonious union in your future. Patience will be rewarded."
        ],
        career: [
            "Your creative energies are aligning with professional opportunities. Bold action will bring success.",
            "A mentor figure will emerge to guide you toward your true calling.",
            "Financial abundance flows when you follow your passion. Trust your unique talents."
        ],
        spiritual: [
            "A period of profound spiritual growth approaches. Meditation will reveal hidden truths.",
            "Ancient wisdom seeks to reach you through dreams. Keep a dream journal in the coming weeks.",
            "Your spiritual path is illuminated by celestial energies. Trust the signs that appear."
        ],
        health: [
            "Balance in body and spirit brings healing. Focus on holistic wellness practices.",
            "The crystal ball shows renewed vitality through natural remedies and mindful living.",
            "A breakthrough in personal well-being awaits. Listen to your body's wisdom."
        ]
    };

    // Select a random prediction from the appropriate category
    const categoryPredictions = predictions[category];
    const randomIndex = Math.floor(Math.random() * categoryPredictions.length);
    return categoryPredictions[randomIndex];
}