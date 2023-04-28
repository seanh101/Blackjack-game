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
hitButton.addEventListener("click", updateChips);

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

    
    if (reduceAce(playerScore, playerAces) > 21) {
        playerCanHit = false;
        message = "YOU LOSE!";
        chipAmount -= betAmount;
    }
  
    let message = "";
        
    dealerScoreDisplay.innerText = dealerScore;
    playerScoreDisplay.innerText = playerScore;
    resultsDisplay.innerText = message;
    
    }



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

    playerScoreDisplay.textContent = `Player: ${playerScoreDisplayValue}`;
    dealerScoreDisplay.textContent = `Dealer: ${dealerScoreDisplayValue}`;

    if (dealerScoreDisplayValue > 21 || playerScoreDisplayValue > dealerScoreDisplayValue) {
        resultsDisplay.textContent = 'You win!';
        chipAmount += betAmount;
    } else if (dealerScoreDisplayValue > playerScoreDisplayValue) {
        resultsDisplay.textContent = 'You lose!';
        chipAmount -= betAmount;
    } else {
        resultsDisplay.textContent = 'Push!';
    }
    betAmount = 0;
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





function updateChips(betAmount, isWin) {
    const betInput = parseInt(document.getElementById("bet-input").value);
    const chipAmount = parseInt(document.getElementById("chip-amount").innerText);
    
    if (isWin) {
      const winnings = betAmount * 2;
      chipAmount.textContent = Number(chipAmount.textContent) + winnings;
    } else {
      chipAmount.textContent = Number(chipAmount.textContent) - betAmount;
    }
    
    betInput.value = ""; // reset bet input
  }
  hitButton.addEventListener("click", updateChips);

  