# Planning for Blackjack

## Analyze the app's functionality

As a user...

- I want to be able to play against the dealer, because that is how Blackjack is played.
- I want to be dealt two cards initially, and the dealer to also be dealt two cards, because that is how Blackjack starts.
- I want to see the value of my cards and one of the dealer's cards, but not the other one, because that is how Blackjack works.
- I want to be able to choose whether to hit (get another card) or stand (keep my current hand), because that is how I can try to beat the dealer's hand.
- I want to see the value of my hand and the dealer's hand once I stand, because that is how I can determine who wins.
- I want the dealer to automatically hit until they have a score of 17 or more, because that is how the dealer's turn works in Blackjack.
- I want to know who won or if it was a push, and see the result displayed on the screen, because that is how I can keep track of the game's outcome.
- I want to be able to play again and reset my chip amount, because that is how I can continue playing and trying to win.
- I want to be able to wager a set amount each hand

If there is time to add more features, the following could be considered:

- A "flip" effect for the cards
- Sound to play when you win
- Splitting the cards
- Doubling down


## Think about the overall design (look & feel) of the app

- CSS card library

## Wireframe the UI

<img src="Blackjack_wireframe.png"/>

- 2 starting cards for dealer and player
- 1 extra facedown card shown for deck
- Hit stay and wager buttons located at bottom
- Chip amount in box on right

## Pseudocode

1) Define required constants
    1.1) cardValues - an object that holds the point value of each card
    1.2) startingChips 

2) Define variables used to track the state of the game
    2.1) deck - an array of 52 cards
    2.2) playerHand - an array of cards in the player's hand
    2.3) dealerHand - an array of cards in the dealer's hand
    2.4) playerScore - the total point value of the player's hand
    2.5) dealerScore - the total point value of the dealer's hand
    2.6) chips - the number of chips the player has

3) Cache DOM elements
    3.1) Message place
    3.2) New game button
    3.3) hit button
    3.4) stay button
    3.5) bet button


4) Upon loading the app should:
    4.1) Initialize the state variables
        - Create a deck with a randomly ordered array of 52 cards
        - Shuffle the deck
        - Deal two cards to the player and two cards to the dealer
        - Calculate the player's score
        - Calculate the dealer's score
        - Set the number of chips to the starting amount
    4.2) Render those values to the page
        - Render the game screen, should render 2 cards face up for the player, and 1 & 1 for the dealer
        - Render  win/lose message after each hand
        - Do not render new game button on first view
        - Render the hit, stay, and bet buttons

 5) Handle a player clicking the hit button
    5.1) Add a card to the player's hand
    5.2) Calculate the new player score
    5.3) If the player's score is over 21, end the game and declare the dealer as the winner
    5.4) Render the game screen

6) Handle a player clicking the stay button
    6.1) Show the dealer's facedown card
    6.2) While the dealer's score is less than 17, draw another card for the dealer
    6.3) Calculate the new dealer score
    6.4) Determine the winner and adjust the chips accordingly
    6.5) Render the game screen

7) Handle a player clicking the bet button      
    7.1) Prompt the player to enter their bet amount
    7.2) Subtract the bet amount from the number of chips
    7.3) Render the game screen


 8) Handle a player clicking the new game button
    8.1) Reset the state variables
    8.2) Render the game screen

9) Check for a winner or loser
    9.1) If the player's score is over 21, the dealer wins
    9.2) If the dealer's score is over 21, the player wins
    9.3) If the player's score is higher than the dealer's score, the player wins
    9.4) If the dealer's score is higher than the player's score, the dealer wins
    9.5) If the scores are tied, it's a push and the chips are returned to the player
    9.6) Adjust the chips accordingly

## Identify the application's state (data)

let deck

let playerHand

let dealerHand

let playerScore

let dealerScore

let chips

let betAmount

let gameOver


