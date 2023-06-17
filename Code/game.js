//Selects all elements that represent the memory cards in the game and stores them in the cards variable.
const cards = document.querySelectorAll(".memory-card")

//function that adds flip to the class of the memory card div
function flipCard(){
  this.classList.toggle('flip')
}

//LOOP THAT ADDS EVENT.LISTENER TO EACH CARD
cards.forEach(card => card.addEventListener('click', flipCard))

