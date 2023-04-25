// Initialize variables
let deck;
let dealerHand = [];
let playerHand = [];
let dealerScore = 0;
let playerScore = 0;
let dealerAces = 0;
let playerAces = 0;
let faceDown;

/*----- constants -----*/

window.onload = function() {
    createDeck();
    shuffleDeck();
    startGame();
}

function createDeck() {
    const suits = ['spades', 'clubs', 'diamonds', 'hearts'];
    const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
    deck = [];

    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < ranks.length; j++) {
            deck.push(ranks[j] + "-" + suits[i]);
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

// Initialize the game
function startGame() {
    faceDown = deck.pop();
    dealerScore += getRank(faceDown);
    dealerAces += checkAce(faceDown);
    while (dealerScore < 17) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = `./card-library/images/${suits}-r${ranks}.svg`;
        dealerScore += getRank(card);
        dealerAces += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }
    console.log(dealerSum);
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
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}


