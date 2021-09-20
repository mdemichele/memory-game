const gameContainer = document.getElementById("game");
let alreadyMatched = [];
let previousColor = "";
let previousCard = null;
let currentColor = "";
let currentCard = null;
let score = 6;
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "teal",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "teal"
];

// HELPER FUNCTION 01: here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

// HELPER FUNCTION 02: flip one card over 
function flipOneCard(card) {
  return new Promise(resolve => {
    setTimeout(() => {
      card.style.background = "url('card-background.jpg')";
      resolve("flipped one after 1 second");
    }, 1000);
  });
}

// HELPER FUNCTION 03: flip cards back over
function flipTwoCards(previousCard, currentCard) {
  return new Promise(resolve => {
    setTimeout(() => {
      previousCard.style.background = "url('card-background.jpg')";
      currentCard.style.background = "url('card-background.jpg')";
      resolve("flipped two after 1 second");
    }, 1000);
  });
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
async function handleCardClick(event) {
  
  // Only run this function if two cards aren't already flipped
  if (currentCard == null) { 
    // Get the color from the class name  
    currentColor = event.target.className;
  
    // Set the background to the card color
    currentCard = event.target;
    currentCard.style.background = currentColor;
  
    // Check if a previous card has also been flipped
    if (previousCard != null) {
      
      // if user clicked on the same card twice and current card already matched 
      if (currentCard == previousCard && alreadyMatched.includes(currentCard)) { 
        console.log("clicked the same card twice. Card has alreay been matched/")
        // reset previous card 
        previousColor = "";
        previousCard = null;
        
        // reset current card 
        currentColor = "";
        currentCard = null;
        
        return null; 
      }
    
      // if user clicked on the same card twice and current card isn't already matched 
      if (currentCard == previousCard && !(alreadyMatched.includes(currentCard)) ) {
        console.log("clicked on same card twice. card has not been matched yet.");
        // flip card back over 
        let response = await flipOneCard(currentCard);
        console.log(response);
        // Reset previous card 
        previousColor = "";
        previousCard = null;
        
        // Reset current card 
        currentColor = "";
        currentCard = null;
        return null;
      }
    
      // Check if current card and previous card match 
      if (currentColor == previousColor) { 
        // Change score message based on matches left 
        score--; 
        let documentScore = document.getElementById("score");
        if (score == 5) {
          documentScore.innerText = "5 more!";
        } else if (score == 4) {
          documentScore.innerText = "come on baby, 4 left!";
        } else if (score == 3) {
          documentScore.innerText = "ahhh snap, 3 left!!!";
        } else if (score == 2) {
          documentScore.innerText = "don't fail me now, 2 left!!!";
        } else if (score == 1) {
          documentScore.innerText = "ONEEEEEE MORE!!!";
        } else {
          documentScore.innerText = "Winner winner, chicken dinner!!";
        }
      
        alreadyMatched.push(currentCard);
        alreadyMatched.push(previousCard);
      
        // Reset previous card 
        previousColor = "";
        previousCard = null;
      
        // Reset current card 
        currentColor = "";
        currentCard = null;
      } 
    
    else { 
      // if first click was a card that is already matched and second click is not 
      if (alreadyMatched.includes(previousCard) && !(alreadyMatched.includes(currentCard)) ) {
          
        // flip current card back over 
        let response = await flipOneCard(currentCard);
        console.log(response);
        // Reset previous card to nothing 
        previousColor = "";
        previousCard = null;
        
        // Reset current card 
        currentColor = "";
        currentCard = null;
      } 
      // if first click was a card that is not matched and second click is matched 
      else if ( !(alreadyMatched.includes(previousCard)) && alreadyMatched.includes(currentCard)) {  
        // Flip previous card back over 
        let response = await flipOneCard(previousCard);
        console.log(response);
        // Reset previous card to nothing 
        previousColor = "";
        previousCard = null;
        
        // Reset current card 
        currentColor = "";
        currentCard = null;
      } 
      // if neither click is a card that has already been matched 
      else if ( !(alreadyMatched.includes(previousCard)) && !(alreadyMatched.includes(currentCard)) ){
  
        // flip both cards back over 
        let response = await flipTwoCards(previousCard, currentCard);
        console.log(response);
        // Reset previous card to nothing 
        previousColor = "";
        previousCard = null;
        
        // Reset current card 
        currentColor = "";
        currentCard = null;
      }
    }
    
  } 
    else {
      // Set previous card to current card 
      previousColor = currentColor;
      previousCard = currentCard;
      
      // reset current card 
      currentColor = "";
      currentCard = null;
    }
  }
  else {
    console.log("can't flip more than two at a time!");
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
