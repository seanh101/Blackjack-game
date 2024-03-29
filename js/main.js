// Constants

const suits = ['spades', 'clubs', 'diamonds', 'hearts'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

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

// Cached DOM elements
const dealerCardContainer = document.querySelector('#dealer-cards');
const playerCardContainer = document.querySelector('#player-cards');
const hitButton = document.getElementById('hit');
const stayButton = document.getElementById('stay');
const playAgainBtn = document.getElementById("play-again");
const dealerScoreDisplay = document.getElementById('dealer-score');
const playerScoreDisplay = document.getElementById('player-score');
const resultsDisplay = document.getElementById('results');
const chipAmountDisplay = document.getElementById('chip-amount');

// event listeners
hitButton.addEventListener("click", hit);
stayButton.addEventListener("click", stay);
playAgainBtn.addEventListener("click", playAgain);


// Load game
window.onload = function() {
    createDeck();
    shuffleDeck();
    dealCards();
    
}

// Functions

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
       
    while (dealerCardContainer.firstElementChild) {
        dealerCardContainer.firstElementChild.remove();
       }
   
    // deal one card face-down
    let faceDownCardImg = document.createElement("img");
    let faceDownCard = deck.pop();
       
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
       
    while (dealerScore < 17) {
        let dealerHitCardImg = document.createElement("img");
        let dealerHitCard = deck.pop();
        let dealerHitSuit = dealerHitCard.split("-")[1];
        let dealerHitRank = dealerHitCard.split("-")[0];
        dealerHitCardImg.src = `./css/card-library/images/${dealerHitSuit}-r${dealerHitRank}.svg`;
        dealerScore += getRank(dealerHitCard);
        dealerAces += checkAce(dealerHitCard);
        dealerCardContainer.append(dealerHitCardImg);
    }

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
        playerCardContainer.append(cardImg);
    }
    console.log(playerScore)
}

// Player Hit Function
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
    playerCardContainer.append(cardImg);

    while (dealerScore < 17) {
        let dealerHitCardImg = document.createElement("img");
        let dealerHitCard = deck.pop();
        let dealerHitSuit = dealerHitCard.split("-")[1];
        let dealerHitRank = dealerHitCard.split("-")[0];
        dealerHitCardImg.src = `./css/card-library/images/${dealerHitSuit}-r${dealerHitRank}.svg`;
        dealerScore += getRank(dealerHitCard);
        dealerAces += checkAce(dealerHitCard);
        dealerCardContainer.append(dealerHitCardImg);
    }

    let message = "";
    if (reduceAce(playerScore, playerAces) > 21) {
        playerCanHit = false;
        message = "YOU LOSE!";
    }
        
    dealerScoreDisplay.textContent = reduceAce(dealerScore, dealerAces);
    playerScoreDisplay.textContent = reduceAce(playerScore, playerAces);

    resultsDisplay.innerText = message;
    
    }

// Stay Function
function stay() {
    playerCanHit = false;
    while (dealerScore < 17) {
        let dealerHitCardImg = document.createElement("img");
        let dealerHitCard = deck.pop();
        let dealerHitSuit = dealerHitCard.split("-")[1];
        let dealerHitRank = dealerHitCard.split("-")[0];
        dealerHitCardImg.src = `./css/card-library/images/${dealerHitSuit}-r${dealerHitRank}.svg`;
        dealerScore += getRank(dealerHitCard);
        dealerAces += checkAce(dealerHitCard);
        dealerCardContainer.append(dealerHitCardImg);
    }

    let playerScoreDisplayValue = reduceAce(playerScore, playerAces);
    let dealerScoreDisplayValue = reduceAce(dealerScore, dealerAces);

    if (dealerScoreDisplayValue > 21 || playerScoreDisplayValue > dealerScoreDisplayValue) {
        resultsDisplay.textContent = 'You win!';
      
    } else if (dealerScoreDisplayValue > playerScoreDisplayValue) {
        resultsDisplay.textContent = 'You lose!';
        
    } else {
        resultsDisplay.textContent = 'Push!';
        
    }
    playerCanHit = false;

}

// Return numerical rank value
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

// take card as input, 1 for Ace 0 other
function checkAce(card) {
    if (card[0] === "A") {
        return 1;
    }
    return 0;
}

// Adjusts score acording to how many aces
function reduceAce(playerScore, playerAces) {
    while (playerScore > 21 && playerAces > 0) {
        playerScore -= 10;
        playerAces -= 1;
    }
    return playerScore;
}

// Reset game
function playAgain() {
    resultsDisplay.textContent = "";
    dealerScoreDisplay.textContent = "";
    playerScoreDisplay.textContent = "";
    while (dealerCardContainer.firstElementChild) {
        dealerCardContainer.firstElementChild.remove();
    }
    while (playerCardContainer.firstElementChild) {
        playerCardContainer.firstElementChild.remove();
    }
    deck = [];
    dealerHand = [];
    playerHand = [];
    dealerScore = 0;
    playerScore = 0;
    dealerAces = 0;
    playerAces = 0;
    playerCanHit = true;
    createDeck();
    shuffleDeck();
    dealCards();
    chipAmountDisplay.textContent = chipAmount;
}

// Update Chips after bet
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
 
   