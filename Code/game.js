//Selects all elements that represent the memory cards in the game and stores them in the cards variable.
const cards = document.querySelectorAll(".memory-card")

// VARIABLES
let currentPlayer = 'player1';
let player1Points = 0;
let cpuPoints = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;

//set total # of pairs (half the # of cards)
const totalPairs = cards.length / 2;


//LOOP THAT ADDS EVENT.LISTENER TO EACH CARD, when clicked flipCard function is called
cards.forEach(card => card.addEventListener('click', flipCard))


//function that adds CSS class 'flip' to the memory-card elements.
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
// do cards match?
function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;
  isMatch ? disableCards() : unflipCards();
}
// its a match!
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}
// not a match
function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1000)
}


//returns game variables to initial values
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false]
  [firstCard, secondCard] = [null, null];
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

//shuffles cards into a random position.. parentheses mean it will be called immediatly at the start of the game
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 25);
    card.style.order = randomPos;
  });
})();


//Running into a bug where the CPU wont stop chossing cards even after no atch has been made... doesnt flip cards back over