// Initialize variables
let deck;
let dealerHand = [];
let playerHand = [];
let dealerScore = 0;
let playerScore = 0;
let dealerAces = 0;
let playerAces = 0;
let faceDown;
let playerCanHit = true;
let chipAmount = 500;
let betAmount = 0;

// Constants

const suits = ['spades', 'clubs', 'diamonds', 'hearts'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

// Call functions on page load
window.onload = function() {
    createDeck();
    shuffleDeck();
    dealCards();
    
}

function createDeck() {
    deck = [];

    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < ranks.length; j++) {
            deck.push(ranks[j]+ "-" + suits[i]);
        }
    }
}

// Shuffle the deck of cards
function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

// Start the game
function dealCards() {
    
       // clear any existing cards
       const dealerCardContainer = document.querySelector('#dealer-cards');
       while (dealerCardContainer.firstElementChild) {
           dealerCardContainer.firstElementChild.remove();
       }
   
       // deal one card face-down
       let faceDownCardImg = document.createElement("img");
       let faceDownCard = deck.pop();
       let faceDownSuit = faceDownCard.split("-")[1];
       let faceDownRank = faceDownCard.split("-")[0];
       faceDownCardImg.src = `./css/card-library/images/backs/red.svg`;
       dealerScore += getRank(faceDownCard);
       dealerAces += checkAce(faceDownCard);
       dealerCardContainer.append(faceDownCardImg);
   
       // deal one card face-up
       let faceUpCardImg = document.createElement("img");
       let faceUpCard = deck.pop();
       let faceUpSuit = faceUpCard.split("-")[1];
       let faceUpRank = faceUpCard.split("-")[0];
       faceUpCardImg.src = `./css/card-library/images/${faceUpSuit}-r${faceUpRank}.svg`;
       dealerScore += getRank(faceUpCard);
       dealerAces += checkAce(faceUpCard);
       dealerCardContainer.append(faceUpCardImg);
   
       // set dealer score
       console.log(dealerScore);

    // set player cards and score
    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        let suit = card.split("-")[1];
        let rank = card.split("-")[0];
        cardImg.src = `./css/card-library/images/${suit}-r${rank}.svg`;
        playerScore += getRank(card);
        playerAces += checkAce(card);
        document.getElementById("player-cards").append(cardImg);
    }

    console.log(playerScore)
    // event listeners
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);

    
}

function hit() {
    if (!playerCanHit) {
        return;
    }
    let cardImg = document.createElement("img");
    let card = deck.pop();
    let suit = card.split("-")[1];
    let rank = card.split("-")[0];
    cardImg.src = `./css/card-library/images/${suit}-r${rank}.svg`;
    playerScore += getRank(card);
    playerAces += checkAce(card);
    document.getElementById("player-cards").append(cardImg);

    if (reduceAce(playerScore, playerAces) > 21) {
        playerCanHit = false;
    }
    let message = "";
        if (playerScore > 21) {
            message = "YOU LOSE!";
          
        }
    
        
        document.getElementById("dealer-score").innerText = dealerScore;
        document.getElementById("player-score").innerText = playerScore;
        document.getElementById("results").innerText = message;
    
    }

console.log(faceDown);

    function stay() {
        dealerScore = reduceAce(dealerScore, dealerAces);
        playerScore = reduceAce(playerScore, playerAces);
    
        playerCanHit = false;
        
        // reveal the face-down card
        let faceDownCardImg = document.createElement("img");
        let faceDownCard = deck.pop();
       let faceDownSuit = faceDownCard.split("-")[1];
       let faceDownRank = faceDownCard.split("-")[0];
       faceDownCardImg.src = `./css/card-library/images/backs/red.svg`;
        let message = "";
        if (playerScore > 21) {
            message = "YOU LOSE!";
          
        }
        else if (dealerScore > 21) {
            message = "YOU WIN";
            
        }
        else if (playerScore === dealerScore) {
            message = "PUSH";
            
        }
        else if (playerScore > dealerScore) {
            message = "YOU WIN!";
            
        }
        else if (playerScore < dealerScore) {
            message = "YOU LOSE!";
            
        }
        
        document.getElementById("dealer-score").innerText = dealerScore;
        document.getElementById("player-score").innerText = playerScore;
        document.getElementById("results").innerText = message;
    
    }
    





function getRank(card) {
    let data = card.split('-');
    let rank = data[0];

    if (isNaN(rank)) {
        if (rank === 'A') {
            return 11;
        }
        return 10;
    }
    return parseInt(rank);
}

function checkAce(card) {
    if (card[0] === "A") {
        return 1;
    }
    return 0;
}

function reduceAce(playerScore, playerAces) {
    while (playerScore > 21 && playerAces > 0) {
        playerScore -= 10;
        playerAces -= 1;
    }
    return playerScore;
}

// Chips
let playerChips = chipAmount;
// Add event listener for bet button
document.getElementById("bet").addEventListener("click", function() {
    // Get bet amount entered by user
    let betAmount = document.getElementById("bet-input").value;
  
  
     // Convert bet amount to integer
     betAmount = parseInt(betAmount);

     // Subtract bet amount from player's chips and update display
     playerChips -= betAmount;
     document.getElementById("chips").innerHTML = `Chips: ${playerChips}`;
 
     // Start the game
     let gameResult = dealCards();
 
     // Update player's chips based on game outcome
     if (gameResult === "win") {
       playerChips += betAmount * 2; // double the bet amount for a win
       document.getElementById("results").innerHTML = "You win!";
     } else {
       document.getElementById("results").innerHTML = "You lose!";
     }
     document.getElementById("chips").innerHTML = `Chips: ${playerChips}`;
   });
 
   function updateChipsDisplay() {
     document.getElementById("chips").innerText = playerChips;
   }
 
   function playAgain() {
    // reset game variables
    dealerHand = [];
    playerHand = [];
    dealerScore = 0;
    playerScore = 0;
    dealerAces = 0;
    playerAces = 0;
    faceDown = null;
    playerCanHit = true;

    // reset card images and result message
    document.getElementById("dealer-cards").innerHTML = "";
    document.getElementById("player-cards").innerHTML = "";
    document.getElementById("results").innerText = "";

    // shuffle and deal cards again
    createDeck();
    shuffleDeck();
    dealCards();
}

document.getElementById("play-again").addEventListener("click", playAgain);


