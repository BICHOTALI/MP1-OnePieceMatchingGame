//Selects all elements that represent the memory cards in the game and stores them in the cards variable.
const cards = document.querySelectorAll(".memory-card")

let hasFlippedCard = false;
let firstCard, secondCard;



//function that adds CSS class flip to the memory-card element.
function flipCard() {
  this.classList.add('flip');
  //checks the value of hasFlippedCard variable
  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;
  } else {
    // second click
    hasFlippedCard = false;
    secondCard = this;
    
    // do cards match?
  }


}

//LOOP THAT ADDS EVENT.LISTENER TO EACH CARD, when clicked flipCard function is called
cards.forEach(card => card.addEventListener('click', flipCard))

