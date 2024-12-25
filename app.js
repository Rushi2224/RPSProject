// Constants
const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";
const options = [ROCK, PAPER, SCISSORS];

// Variables
let userScore = 0;
let compScore = 0;
let rounds = 5;
let currentRound = 0;

// DOM Elements
const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userSelect = document.querySelector("#userSec");
const compSelect = document.querySelector("#compSec");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const restartBtn = document.querySelector("#restart-btn");
const roundsInput = document.querySelector("#rounds");

// Generate computer choice
const genCompChoice = () => {
  const randIdx = Math.floor(Math.random() * options.length);
  return options[randIdx];
};

// Update scores and display winner
const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    msg.innerText = `You Win! ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
    userScore++;
    userScorePara.innerText = userScore;
  } else {
    msg.innerText = `You Lose! ${compChoice} beats ${userChoice}`;
    msg.style.backgroundColor = "red";
    compScore++;
    compScorePara.innerText = compScore;
  }
};

// Handle game draw
const drawGame = () => {
  msg.innerText = "Game is Draw. Play Again.";
  msg.style.backgroundColor = "orange";
};

// Display user and computer selections
const displaySelections = (userChoice, compChoice) => {
  userSelect.innerText = `User Select: ${userChoice}`;
  compSelect.innerText = `Computer Select: ${compChoice}`;
};

// Main game logic
const playGame = (userChoice) => {
  if (currentRound < rounds) {
    currentRound++;

    const compChoice = genCompChoice();
    displaySelections(userChoice, compChoice);

    if (userChoice === compChoice) {
      drawGame();
    } else {
      let userWin = true;
      if (userChoice === ROCK) {
        userWin = compChoice === PAPER ? false : true;
      } else if (userChoice === PAPER) {
        userWin = compChoice === SCISSORS ? false : true;
      } else {
        userWin = compChoice === ROCK ? false : true;
      }

      showWinner(userWin, userChoice, compChoice);
    }

    if (currentRound === rounds) {
      msg.innerText = userScore > compScore ? "You are the overall winner!" : "Computer wins overall!";
    }
  }
};

// Restart game
restartBtn.addEventListener("click", () => {
  userScore = 0;
  compScore = 0;
  currentRound = 0;
  userScorePara.innerText = 0;
  compScorePara.innerText = 0;
  msg.innerText = "Play your move";
  msg.style.backgroundColor = "#081b31";

  // Get the user-specified number of rounds
  const userRounds = parseInt(roundsInput.value);
  if (!isNaN(userRounds) && userRounds > 0) {
    rounds = userRounds;
  } else {
    rounds = 5; // Default to 5 if input is invalid
  }
});

// Add event listeners to choices
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});
