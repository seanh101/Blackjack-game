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
    faceDown = deck.pop();
    dealerScore += getRank(faceDown);
    dealerAces += checkAce(faceDown);

    // set dealer cards and score
    while (dealerScore < 17) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        let suit = card.split("-")[1];
        let rank = card.split("-")[0];
        cardImg.src = `./css/card-library/images/${suit}-r${rank}.svg`;
        dealerScore += getRank(card);
        dealerAces += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }
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
    }

    function stay() {
        dealerScore = reduceAce(dealerScore, dealerAces);
        playerScore = reduceAce(playerScore, playerAces);
    
        playerCanHit = false;
        
        // reveal the face-down card
        let suit = faceDown.split("-")[1];
        let rank = faceDown.split("-")[0];
        document.getElementById("faceDown").src = `./css/card-library/images/${suit}-r${rank}.svg`;
    
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


