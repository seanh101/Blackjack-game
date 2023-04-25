// Initialize variables
let deck;
let dealerHand = [];
let playerHand = [];
let dealerScore = 0;
let playerScore = 0;
let dealerAces = 0;
let playerAces = 0;

/*----- constants -----*/

window.onload = function() {
    createDeck();
    shuffleDeck();
}

function createDeck() {
    const suits = ['s', 'c', 'd', 'h'];
    const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
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
    console.log(deck);
}
