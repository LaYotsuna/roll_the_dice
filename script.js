'use strict';

// Selecting game elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

// For the rules button
const rules = document.querySelector('.rules');
const overlay = document.querySelector('.overlay');
const btnCloseButton = document.querySelector('.close-rules');
const btnOpenButton = document.querySelectorAll('.open-rules');

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

// Variables for the start and restart game function
let scores, currentScore, activePlayer, playing;

const startGame = function () {
  // Reset all variables to 0
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // Set player scores to 0
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  // Change visual effects of players and hide dice
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

// Start game
startGame();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generates a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // Check for rolled 1, if true, switch to the next player
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if score is at least is >= 100
    // Finish the game
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', startGame);

// Button rules

//Function to open overlay
const openButton = function () {
  console.log('Button clicked');
  rules.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

// Function to hide overlay
const closeRules = function () {
  console.log(rules.classList.add('hidden'));
  console.log(overlay.classList.add('hidden'));
};

// Open rules on button click
for (let x = 0; x < btnOpenButton.length; x++) {
  console.log(btnOpenButton[x].addEventListener('click', openButton));
}
// Close rules on "x" click
btnCloseButton.addEventListener('click', closeRules);
// Close rules on overlay click
overlay.addEventListener('click', closeRules);
// Close rules on "Esc" key press
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && !rules.classList.contains('hidden')) {
    closeRules();
  }
});
