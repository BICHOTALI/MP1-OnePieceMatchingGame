//Selects all elements that represent the memory cards in the game and stores them in the cards variable.
const cards = document.querySelectorAll(".memory-card")

// VARIABLES
let currentPlayer = 'player1';
let player1Points = 0;
let cpuPoints = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

//set total # of pairs (half the # of cards)
const totalPairs = cards.length / 2;


//LOOP THAT ADDS EVENT.LISTENER TO EACH CARD, when clicked flipCard function is called
cards.forEach(card => card.addEventListener('click', flipCard))


// Function that adds CSS class 'flip' to the memory-card elements.
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return; //removes double click bug

  this.classList.add('flip');

  // Checks the value of hasFlippedCard variable
  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  } 
    // second click
    secondCard = this;
    
    checkForMatch()

    // Switch of current players turn
    if (currentPlayer === 'player1') {
      currentPlayer = 'CPU';
      nextPlayersTurn();
    } else {
      currentPlayer = 'player1';
    }
}


// Do cards match?
function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;

  isMatch ? disableCards() : unflipCards();
}


// Its a match!
function disableCards() {
  if (currentPlayer === 'player1') {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    player1Points++; // Increment of players points
  } else {
    cpuPoints++; // Increment of cpu points
  }

  resetBoard();
}


// Not a match
function unflipCards() {
  if (currentPlayer === 'player1') {
    lockBoard = true;

    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');

      resetBoard();

      currentPlayer = 'CPU';
      nextPlayersTurn();
    }, 1000)
  }
}


// Returns game variables to initial values
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false]
  [firstCard, secondCard] = [null, null];
}


// logic that handles the next players move (called when its CPU's turn)
function nextPlayersTurn() {
  if (currentPlayer === 'CPU') {
    lockBoard = true; // Prevents player from interacting with gameboard while CPU is playing
    setTimeout(() => {
      // Simulate CPU's moves
      const unFlippedCards = Array.from(cards).filter(card => !card.classList.contains('flip')); // Creates an array from the cards array
      const randomIndex = Math.floor(Math.random() * unFlippedCards.length); // Generates a random index for selection from array
      const randomCard = unFlippedCards[randomIndex]; // Accesses card from array using random index

      randomCard.classList.add('flip');
      secondCard = randomCard;
      checkForMatch();

      // Switch turns back to player1
      currentPlayer = 'player1';
      lockBoard = false;
    }, 3000)
  }
}


// Determines WINNER and ends game
function declareWinner() {
  
}


//shuffles cards into a random position.. parentheses mean it will be called immediatly at the start of the game
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();
