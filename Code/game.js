// Get the canvas element from the HTML document that will host my game
const canvas = document.getElementById('game-canvas');
//Gets the 2D rendering context for the canvas that will allow us to draw on it
const ctx = canvas.getContext('2d');

// Card properties
const cardWidth = 25;
const cardHeight = 25;

//This class helps me create cards and common behaviors/properites without having to repeat code
class Card {
    constructor(name){
        this.name = name;
        this.width = cardWidth;
        this.height = cardHeight;
        this.isFlipped = false;
        this.isMatched = false;
    }
}

// Array of cards that contains all the different cards and their matching pairs
const cards = [
    new Card('Luffy'),
    new Card('Luffy'),
    new Card('Zoro'),
    new Card('Zoro'),
    new Card('Nami'),
    new Card('Nami'),
    new Card('Usopp'),
    new Card('Usopp'),
    new Card('Sanji'),
    new Card('Sanji'),
    new Card('Chopper'),
    new Card('Chopper'),
    new Card('Robin'),
    new Card('Robin'),
    new Card('Franky'),
    new Card('Franky'),
    new Card('Brook'),
    new Card('Brook'),
    new Card('Jinbe'),
    new Card('Jinbe')
]
  // Function to generate a unique ID
  function generateUniqueId() {
    return Math.random().toString().slice(2);
  }
  
  // Assign unique IDs to each card
  cards.forEach((card, index) => {
    card.id = generateUniqueId() + index;
  });
  
  // Display the cards with their IDs
  cards.forEach((card) => {
    console.log(`Card: ${card.name}, ID: ${card.id}`);
  });

  // Function that randomizes the placement of the cards at the start of a new game
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  shuffleArray(cards);
