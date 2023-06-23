// Selects all elements that represent the memory cards in the game and stores them in the cards variable.
const cards = document.querySelectorAll(".memory-card")

// VARIABLES
let currentPlayer = 'player1';
let player1Points = 0;
let cpuPoints = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;

// Set total # of pairs (half the # of cards)
const totalPairs = cards.length / 2;


// LOOP THAT ADDS EVENT.LISTENER TO EACH CARD, when clicked flipCard function is called
cards.forEach(card => card.addEventListener('click', flipCard))


// Function that adds CSS class 'flip' to the memory-card elements.
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add('flip');
  //checks the value of hasFlippedCard variable
  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;
    return;
  } 
    // second click
    secondCard = this;
    
    checkForMatch();
}

// Do cards match?
function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;
  isMatch ? disableCards() : unflipCards();

  if (currentPlayer === 'player1'){
    currentPlayer = 'CPU';
    nextPlayersTurn();
  } else {
    currentPlayer = 'player1';
  }

}

// Its a match!
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
  if(currentPlayer = 'player1'){
    player1Points++;
  }else{
    cpuPoints++;
  }
}

// Not a match
function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip', 'flip-delay');
    resetBoard();
  }, 1100)
}


// Returns game variables to initial values
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false]
  [firstCard, secondCard] = [null, null];
}

// Logic that will run CPU's turn
function nextPlayersTurn() {
  if (currentPlayer === 'CPU') {
    lockBoard = true; // Prevents player1 from choosing cards while CPU is playing

    setTimeout(() => {
      // Simulate CPU's moves
      let unflippedCards = Array.from(cards).filter(card => !card.classList.contains('flip'));
      //first flip
      const randomIndex1 = Math.floor(Math.random() * unflippedCards.length);
      firstCard = unflippedCards[randomIndex1];
      firstCard.classList.add('flip');
      //second flip
      unflippedCards = Array.from(cards).filter(card => !card.classList.contains('flip'));
      const randomIndex2 = Math.floor(Math.random() * unflippedCards.length);
      secondCard = unflippedCards[randomIndex2];
      secondCard.classList.add('flip','flip-delay');


      checkForMatch();
    }, 2500);
  }
}

/*
// Determines WINNER and ends game
function declareWinner() {
  // Compares player points
  let winner;
  if (player1Points > cpuPoints){
    winner = 'player1';
  } else if (cpuPoints > player1Points) {
    winner = 'CPU';
  } else {
    winner = "It's a Tie!"
  }

  // Display winner
}
*/

// Shuffles cards into a random position.. parentheses mean it will be called immediatly at the start of the game
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 25);
    card.style.order = randomPos;
  });
})();