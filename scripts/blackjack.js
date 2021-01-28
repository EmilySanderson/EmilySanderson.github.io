/*
BlackJack Game code
Created by Emily Sanderson
Last modified on January 6th, 2021
*/
/* initiate global variables */
var deck = [];
var shuffledDeck = [];
class Participant { //participant class used to score each players hand
  constructor(name) {
    this.name = name;
    this.hand = [];
  }
  score() { //calculates score
    //a participant cannot win with two high aces, thus there being only 2 options no matter the number of aces
    let handValue = [0,0]; //two possibilities in case of aces high or low, o/w they are equivalent
    let aceCounter = 0;
    this.hand.forEach(function(card){
      handValue[0] += card.Value
      aceCounter +=  (card.Face == "A") ? 1 : 0;
    })

    //if participant has an ace, their aces high score is 10 greater, o/w the two handValues are the same
    handValue[1] = (aceCounter == 0) ? handValue[0] : handValue[0] + 10;
    return handValue;
  }
}
let playerOne = new Participant("playerOne");
let theHouse = new Participant("theHouse");

/* Displays the game area, hides the begin game button and call createDeck */
function createTable() {
  $(document).ready(function(){
    $("#beginGameBtn").hide();
    $("#gameArea").show();
  })
  createDeck();
}

/* Creates the deck by adding 'card' objects to the global array deck */
function createDeck() {
  // Elements of the card object
  suit = ["spade","heart","diamond","club"];
  face = ["A",2,3,4,5,6,7,8,9,10,"J","Q","K"];
  value = [1,2,3,4,5,6,7,8,9,10,10,10,10];
  //Iterate through each suit and face to produce all 52 cards
  for (i=0; i< suit.length; i++) {
    for (j=0; j<face.length;j++) {
      /*
      var temp used with the html code to get the symbol for each card.
      the html code is &$<6-digit number>;, with the ace of spades being the first, &#127137;
      The HTML codes include the Knight card between the Jack j=10 & Queen j=11,
      so adjusting temp so it have the correct code
      */
      var temp = (j > 10) ? j+1 : j;

      switch(i){
        case 0: //html codes for spades
          var htmlCode = 127137 + temp;
          break;
        case 1: //html codes for hearts
          var htmlCode = 127153 + temp;
          break;
        case 2: //html codes for diamonds
          var htmlCode = 127169 + temp;
          break;
        case 3: //html codes for clubs
          var htmlCode = 127185 + temp;
          break;
      }
      var symbol = "&#"+htmlCode+";"; //generate html code
      // create card object and push it to the deck array
      var card = {Suit: suit[i], Face: face[j], Value: value[j], Symbol: symbol};
      deck.push(card);
    }
  }
}

/*
 * At the beginning of a game, both the player and the house are dealt 2 cards
 * The hitMe and Stay buttons are enabled
 * All fields reset, deck array is shuffled
 * cards are dealt and UI & messaging is updated.
*/
function dealHands(){
  //Enable the buttons (if not already enabled)
  document.getElementById('hitMeBtn').disabled = false;
  document.getElementById('stayBtn').disabled = false;
  //Clear the playing field
  var valueFields = document.getElementsByClassName('value');
  var cardAreas = document.getElementsByClassName('cardArea');
  valueFields.innerHTML = '';
  cardAreas.innerHTML = '';
  //Shuffle Deck
  shuffledDeck = shuffle([...deck]);
  //Recreate/Reset participants hands, dealing two cards each
  playerOne.hand = [shuffledDeck.pop(),shuffledDeck.pop()];
  theHouse.hand = [shuffledDeck.pop(),shuffledDeck.pop()];
  // Update the interface with the new cards & scores
  updateUI();
  // Check to see if either player is a winner at this point
  $(document).ready(function () {
    messages("dealHands");
  });
}

/*
 * Shuffle Deck by randomly choosing a number between 0 & i (starting at 51),
 * then replacing the ith element with that with the index of the randonly chosen number,
 * decreasing i every time a swap is made until every index in deck has swapped at least once.
*/
function shuffle(d) {
  for (i=51;i>0;i--){
    var index = Math.floor(Math.random()*i); //select random number to swap
    var temp = d[i]; // Assign a temporary var to the ith element of the deck
    d[i] = d[index]; // Swap the ith element with the random index
    d[index] = temp; // Swap the random index value with the ith value
  }
  return d; //return a shuffled deck
}

/*
* Function called when player clicks the Hit Me button
* Adds another card to the players hand, updates the UI and check to see if player busts or wins or neither
*/
function hitMe() {
  //Add another card to player one's hand
  playerOne.hand.push(shuffledDeck.pop());
  updateUI();
  $(document).ready(function () {
    messages("hitMe");
  });
}

/*
*Update the UI after every move with the new scores and card HTML codes
*/
function updateUI() {
  //Reset the card Areas before updating it
  var cardAreas = document.getElementsByClassName('cardArea');
  cardAreas[0].innerHTML = '';
  cardAreas[1].innerHTML = '';
  // Update value valueFields
  var valueAreas = document.getElementsByClassName('value');
  //Player One score, display both possibilities if player One has at least one ace
  var playerOneScore = playerOne.score();
  valueAreas[0].innerHTML = (playerOneScore[0] == playerOneScore[1]) ? "Value: "+ playerOneScore[0] : "Value: "+ playerOneScore[0]+ " or "+playerOneScore[1];
  //House score, display both possibilities if the House has at least one ace
  var theHouseScore = theHouse.score();
  valueAreas[1].innerHTML = (theHouseScore[0] == theHouseScore[1]) ? "Value: "+ theHouseScore[0] : "Value: "+ theHouseScore[0]+ " or "+theHouseScore[1];
  //Add card icons to each players 'mats'
  var cardAreas = document.getElementsByClassName('cardArea');
  //Add span to each card, adjusting the span's class to red if hearts or diamonds (for red font colour) or black
  var colourClass;

  for (i=0; i<playerOne.hand.length; i++){ // For the Player's UI
    colourClass = (playerOne.hand[i].Suit == "heart" || playerOne.hand[i].Suit == "diamond") ? "red" : "black";
    cardAreas[0].innerHTML += "<span class="+colourClass+">" + playerOne.hand[i].Symbol;"</span>";
  }
  for (j=0; j<theHouse.hand.length; j++){ // For the House's UI
    colourClass = (theHouse.hand[j].Suit == "heart" || theHouse.hand[j].Suit == "diamond") ? "red" : "black";
    cardAreas[1].innerHTML += "<span class="+colourClass+">" + theHouse.hand[j].Symbol;"</span>";
  }
}

/*
* Stay function ends the player's turn, and tests to see if the House won, or if the house needs to draw a cards
*/
function stay() { //have to do testing before being able to draw for the house
  messages("stay");
}

/*
* Given a parameter func, tests to see if there are any winners and display a given message
* func = dealHands tests for natural 21s
* func = hitMe tests to see if playerOne won, busted or neither
* func = stay tests to see if house has greater score than playerOne
* func = hitHouse tests to see if house drawing another card gets them to win, bust or neither
*/
var gameOver = false;

function messages(func) {
  var gameOver = false; // to test if the game is over, so the buttons can be disabled
  // switch between different inputs to have unique messages, and calling the gameOver function
  var dualScorePlayer = playerOne.score();
  var dualScoreHouse = theHouse.score();
  switch (func) {
    case "dealHands":
      if ((dualScoreHouse[1] == 21) && (dualScorePlayer[1]==21)) { //Player & House have naturals
        alert("Wowza a double blackjack! Its a tie, please play again.");
        gameOver = true;
        break;
      } else if ((dualScoreHouse[1] == 21) && (dualScorePlayer[1] != 21)) { // House has natural 21
        alert("House got a natural 21, sorry you lose, please play again.");
        gameOver = true;
        break;
      } else if ((dualScorePlayer[1] == 21) && (dualScoreHouse[1] != 21)) { //Player has natural 21
        alert("Congrats, a natural 21, you won! Please play again.");
        gameOver = true;
        break;
      }
      break;
    case "hitMe":
      if  ((dualScorePlayer[0] > 21) && (dualScorePlayer[1] > 21)) { //Player busts
        gameOver = true;
        alert("Bust! You lose. Please play again.");
        break;
      } else if ((dualScorePlayer[0] == 21) || (dualScorePlayer[1] == 21)){ //player gets 21
        alert("Congrats! You scored 21, you win. Please play again!");
        gameOver = true;
        break;
      } else { // Player has less than 21, they can continue
        gameOver = false;
        break;
      }
      break;
    case "stay":
      //When the player hits stay before having enough points, aces high or low
      if (dualScorePlayer[1] < 21) { //if both player's scores are less than 21
        if ((dualScoreHouse[0] >= dualScorePlayer[1]) || (dualScoreHouse[1] >= dualScorePlayer[1])) { //if either house score is greater than players largest valid score
          alert("You hit stay too soon and lost, please play again.")
          gameOver = true;
          break;
        } else { //if house still can't beat the player, they draw a card
          hitHouse();
          break;
        }
      } else { // if player has an ace, and their aces high score is greater than 21
        if ((dualScoreHouse[0] > dualScorePlayer[0]) || (dualScoreHouse[1] > dualScorePlayer[0])) { //either houses scores are greater than the only valid player score
          alert("You hit stay too soon and lost, please play again.")
          gameOver = true;
          break;
        } else { // house still can't beat players lower score, house draws a card
          hitHouse();
          break;
        }
      }
      break;
    case "hitHouse":
      // If player or house do have aces, aces high or aces low will result in the same score
      //if aces, is when an ace is high is it over 21, so second score not valid
      var secondValid = (dualScorePlayer[1] > 21) ? false : true;
      if (dualScoreHouse[0] > 21) { // House's aces low is over 21, automatic bust
        alert("House bust, you win. Please play again")
        gameOver = true;
        break;
      } else { // House's aces low below 22
        if (dualScoreHouse[1] <= 21) { //Houses aces high less than or equal to 21
          if (secondValid) {
            if (dualScoreHouse[1] > dualScorePlayer[1]){ //compare against aces high player score
              alert("House wins, you lose. Please play again")
              gameOver = true;
              break;
            } else {
              hitHouse();
              break;
            }
          } else if (dualScoreHouse[1] > dualScorePlayer[0]){ // compare against aces low player score
            alert("House wins, you lose. Please play again")
            gameOver = true;
            break;
          } else {
            hitHouse();
            break;
          }
        } else { //if House's aces high above 21
          if (secondValid) {
            if (dualScoreHouse[0] > dualScorePlayer[1]){ //Compare House aces low to player aces high (if below 21)
              alert("House wins, you lose. Please play again")
              gameOver = true;
              break;
            } else {
              hitHouse();
              break;
            }
          } else if (dualScoreHouse[0] > dualScorePlayer[0]){ //Compare House aces low to player aces low
            alert("House wins, you lose. Please play again")
            gameOver = true;
            break;
          } else {
            hitHouse();
            break;
          }
        }
      }
    break;
    default:
      gameOver = false;
  }
  if (gameOver) {
    document.getElementById('hitMeBtn').disabled = true;
    document.getElementById('stayBtn').disabled = true;
  }
}

/*
* House draws a card, house's mat and score updated and house's hand is checked for win, bust or neither
*/
function hitHouse() {
  theHouse.hand.push(shuffledDeck.pop());
  updateUI();
  $(document).ready(function(){
    messages("hitHouse");
  });

}
