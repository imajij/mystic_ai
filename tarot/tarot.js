// Card selection and display logic
const tarotDeck = document.querySelector('.tarot-deck');
const selectedCards = document.querySelector('.selected-cards');
const startReadingBtn = document.querySelector('.start-reading');
let selectedCount = 0;
const maxCards = 3;
let selectedCardIds = new Set();

// Card sets for different reading types
const tarotCardSets = {
    'past-present-future': [
        'The Fool', 'The Magician', 'The High Priestess', 'The Empress', 
        'The Emperor', 'The Hierophant', 'The Lovers', 'The Chariot',
        'Strength', 'The Hermit', 'Wheel of Fortune', 'Justice'
    ],
    'love-relationships': [
        'The Lovers', 'Two of Cups', 'Ten of Cups', 'The Empress',
        'Knight of Cups', 'Queen of Cups', 'King of Cups', 'Ace of Cups',
        'Two of Hearts', 'Nine of Cups', 'Three of Cups', 'Four of Cups'
    ],
    'career-path': [
        'The Emperor', 'King of Pentacles', 'Eight of Pentacles', 'Three of Pentacles',
        'Ace of Pentacles', 'Ten of Pentacles', 'Page of Pentacles', 'Queen of Pentacles',
        'Six of Pentacles', 'Knight of Pentacles', 'Four of Pentacles', 'Nine of Pentacles'
    ],
    'spiritual-growth': [
        'The High Priestess', 'The Hermit', 'The Star', 'The Moon',
        'The Sun', 'The World', 'Ace of Wands', 'Seven of Cups',
        'Nine of Wands', 'Ten of Wands', 'Page of Wands', 'Knight of Wands'
    ]
};

let currentReadingType = 'past-present-future';
const readingOptions = document.querySelectorAll('.reading-option');

// Update cards based on reading type
function updateTarotDeck(readingType) {
    tarotDeck.innerHTML = '';
    const cards = tarotCardSets[readingType];
    
    for(let i = 0; i < cards.length; i++) {
        const card = document.createElement('div');
        card.className = 'tarot-card';
        card.dataset.cardId = i;
        card.innerHTML = `
            <div class="card-face card-back"></div>
            <div class="card-face card-front">
                <h4>${cards[i]}</h4>
                <div class="card-image ${readingType}-${i}"></div>
            </div>
        `;
        
        card.addEventListener('click', () => {
            const cardId = card.dataset.cardId;
            
            if(!selectedCardIds.has(cardId) && selectedCount < maxCards) {
                selectedCardIds.add(cardId);
                selectedCount++;
                
                card.classList.add('selected');
                card.style.transform = 'rotateY(180deg)';
                
                const preview = document.createElement('div');
                preview.className = 'card-preview';
                preview.textContent = cards[i];
                selectedCards.appendChild(preview);

                if(selectedCount === maxCards) {
                    startReadingBtn.style.display = 'block';
                }
            }
        });
        
        tarotDeck.appendChild(card);
    }
}

// Add click handlers for reading options
readingOptions.forEach(option => {
    option.addEventListener('click', () => {
        // Remove active class from all options
        readingOptions.forEach(opt => opt.classList.remove('active'));
        // Add active class to clicked option
        option.classList.add('active');
        
        // Reset current selection
        resetReading();
        
        // Update current reading type and refresh deck
        currentReadingType = option.textContent.toLowerCase().replace(/\s+/g, '-');
        updateTarotDeck(currentReadingType);
    });
});

// Initialize with default deck
updateTarotDeck(currentReadingType);

// Reset button functionality
const resetReading = () => {
    selectedCount = 0;
    selectedCardIds.clear();
    startReadingBtn.style.display = 'none';
    
    // Reset all cards
    const cards = document.querySelectorAll('.tarot-card');
    cards.forEach(card => {
        card.classList.remove('selected');
        card.style.transform = 'rotateY(0deg)';
    });
    
    // Clear preview cards
    selectedCards.innerHTML = '<h3>Your Selected Cards</h3>';
};

// Add reset button
const resetBtn = document.createElement('button');
resetBtn.className = 'reset-reading';
resetBtn.textContent = 'Reset Reading';
resetBtn.style.display = 'none';
startReadingBtn.parentNode.insertBefore(resetBtn, startReadingBtn.nextSibling);

startReadingBtn.addEventListener('click', () => {
    resetBtn.style.display = 'block';
});

resetBtn.addEventListener('click', resetReading);