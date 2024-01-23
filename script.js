let F= 11;//number of fielders
let gridSize;
let N = 5;//number of no balls
const runVal = [1,1,1,1,1,1,2,2,2,2,2,4,4,4,4,6,6,6];//array of runs
let arr=[];//array
let F_loc= [];//fielderLocations
let N_loc = [];//noballLocations
let Score = 0;//initial score
let Lives=0;
//Difficulty levels
const levels = [
    { name: "Easy", scoreLimit: 10, message: "Congratulations! You've mastered the Easy level. Ready to step up the challenge?" },
    { name: "Medium", scoreLimit: 20, message: "Impressive! You've conquered the Medium level. Can you handle the Tough level?" },
    { name: "Tough", scoreLimit: 30, message: "Incredible! You've triumphed over the Tough level. You're a true Minesweeper Pro!" }
  ];
//GridSizes
const sizes = [
  { name: "6x6", gridSize: 6 },
  { name: "7x7", gridSize: 7 }
];

let selectedLevel = levels[0];//selectedLevel
let selectedSize = sizes[0];//selectedSize

//Generate random fielder 
function generateLocations() {
  F_loc = [];
  N_loc= [];
 
  while (F_loc.length<F) {
    const position = Math.floor(Math.random() * (gridSize * gridSize));
    if (!F_loc.includes(position)) {
      F_loc.push(position);
    }
  }
  while (N_loc.length<N) {
    const position = Math.floor(Math.random() * (gridSize * gridSize));
    if (!F_loc.includes(position) && !N_loc.includes(position)) {
      // Make sure the no ball position does not overlap with a fielder position
      N_loc.push(position);
    }
  }

}

//Check if block contains a fielder
function Fielder(position) {
  return F_loc.includes(position);
}

//Check if block contains a no ball
function NoBall(position) {
    return N_loc.includes(position);
  }

//block clicking
function Click(position) {
  const block = document.getElementById("block-" + position);

  if (block.classList.contains("clicked")) {
    // Block already clicked
    return;
  }

  block.classList.add("clicked", "revealed");

  if (NoBall(position)) {
    block.style.backgroundImage= 'url(https://th.bing.com/th/id/OIP.5U-Rh7jgSjmSP3o9HF6ZDwHaEz?pid=ImgDet&rs=1)' ;
    block.style.backgroundSize= '60px 60px';
    block.textContent = ""; 
    // If the block contains a no ball, increase the number of lives
    Lives++;
    updateLives();
    block.textContent = "";
    return;
  }
  if (Fielder(position)) {
    block.style.backgroundImage= 'url(https://qph.fs.quoracdn.net/main-qimg-07c78cf7c1a526113ab77b7ad822fb9f)' ;
    block.style.backgroundSize= '60px 60px';
    block.textContent = ""; 
    

    // If the block contains a fielder, check if there are any lives left
    if (Lives > 0) {
        // If there are lives left, decrease the number of lives and continue the game
        Lives--;
        updateLives();
        return;
    } 
    else {
        setTimeout(function(){
            for(i=0;i<gridSize*gridSize;i++){
                show(i);
            }},1);
        // If there are no lives left, end the game with a delay
        setTimeout(function () {
            endGame(false);
        }, 200);
        return;
    }
  }
  run=arr[position];
  Score += run;
  updateScore();
  const runImage = RunImage(run);
  block.innerHTML = `<img src='${runImage}' alt='${run} Runs' style='width:60px'>`;
}

//Reveal all the unclicked Grids
function show(position){
    const block = document.getElementById("block-" + position);
    if (Fielder(position)) {
        block.style.backgroundImage= 'url(https://qph.fs.quoracdn.net/main-qimg-07c78cf7c1a526113ab77b7ad822fb9f)' ;
        block.style.backgroundSize= '60px 60px';
        block.textContent = ""; 
    }
    else if (NoBall(position)) {
        block.style.backgroundImage='url(https://th.bing.com/th/id/OIP.5U-Rh7jgSjmSP3o9HF6ZDwHaEz?pid=ImgDet&rs=1)';
        block.style.backgroundSize='60px 60px';
        block.textContent = "";
    }
    else{
        run= arr[position];
        const runImage = RunImage(run);
        block.innerHTML = `<img src='${runImage}' alt='${run} Runs' style='width:60px'>`;
    }
}

// Get the image of run
function RunImage(run) {
  switch (run) {
    case 1:
      return "https://www.drodd.com/images15/1-10.png";
    case 2:
      return "https://webstockreview.net/images250_/clipart-numbers-red-18.png";
    case 4:
      return "https://www.wivb.com/wp-content/uploads/sites/97/2019/06/cropped-4.png";
    case 6:
      return "https://www.clker.com/cliparts/1/w/A/m/0/b/number-6-button.svg.med.png";
    default:
      return "";
  }
}

function updateScore() {
  const scoreElement = document.getElementById("score");
  scoreElement.textContent =Score;// Update score on the scorecard
}

function updateLives() {
    const livesElement = document.getElementById("lives");
    livesElement.textContent = Lives; // Display the number of lives
}

// End the game and display the final score
function endGame() {
    let result;
    let nxtLvlInd = levels.indexOf(selectedLevel);

    if (Score >= selectedLevel.scoreLimit) {
        if (nxtLvlInd < levels.length) {
            result = levels[nxtLvlInd].message;
          } 
      playWinAudio(); // Play the audio here
      setTimeout(function() {
        alert(result);
        resetGame();
      }, 4000); // Delay the alert message 
    } else {
      result = "Oops! You Lose!";
      alert(result);
      resetGame();
    }
  }
  
function playWinAudio() {
    // Get a reference to the audio element
    const audioElement = document.getElementById("win-audio");
  
    // Set the playback start time (in seconds)
    const startTime = 1;
    const endTime = 10;
  
    // Play the audio from the start time to the end time
    audioElement.currentTime = startTime;
    audioElement.play();
  
    // Stop the audio after the specified duration
    setTimeout(function() {
      audioElement.pause();
    }, (endTime - startTime) * 1000);
}
// Reset the game
function resetGame() {
  Score = 0;
  updateScore();
  generateLocations();
  initializeGameBoard();
}
// Initialize the game board
function initializeGameBoard() {
  const gameBoard = document.getElementById("game-board");
  gameBoard.innerHTML = "";
  gameBoard.style.gridTemplateColumns =`repeat(${gridSize},1fr)`;
  
  for (let i = 0; i < gridSize * gridSize; i++) {
    const block = document.createElement("div");
    block.className = "block";
    block.id = "block-" + i;
    block.textContent= i + 1;

    block.addEventListener("click", function () {
      Click(i);
    });
    gameBoard.appendChild(block);
  }
}
// Initialize the game
function initializeGame() {
  gridSize = selectedSize.gridSize;
  arr=[];
  for(i=0;i<gridSize*gridSize;i++){
    const index = Math.floor(Math.pow(Math.random(),1) * runVal.length);
    let run= runVal[index];
    arr.push(run);
  }
  generateLocations();
  initializeGameBoard();
  resetGame();
}
// Populate difficulty level select options
function populateDifficultyLevels() {
  const levelSelect = document.getElementById("difficulty-level");

  levelSelect.innerHTML = "";

  levels.forEach((level, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = level.name;
    levelSelect.appendChild(option);
  });
}
// Populate grid size select options
function populateGridSizes() {
  const sizeSelect = document.getElementById("grid-size-select");
  sizeSelect.innerHTML = "";

  sizes.forEach((size, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = size.name;
    sizeSelect.appendChild(option);
  });
}
// Set the difficulty level based on the selected option
function setDifficultyLevel() {
  const levelSelect = document.getElementById("difficulty-level");
  const selectedOption = levelSelect.options[levelSelect.selectedIndex];
  selectedLevel = levels[selectedOption.value];
  resetGame();
}
// Set the grid size based on the selected option
function setGridSize() {
  const sizeSelect = document.getElementById("grid-size-select");
  const selectedOption = sizeSelect.options[sizeSelect.selectedIndex];
  selectedSize = sizes[selectedOption.value];
  resetGame();
}
// Start game button click handler
document.getElementById("start-button").addEventListener("click", function () {
  initializeGame();
});
// Handle difficulty level selection change
document.getElementById("difficulty-level").addEventListener("change", function () {
  setDifficultyLevel();
});
// Handle grid size selection change
document.getElementById("grid-size-select").addEventListener("change", function () {
  setGridSize();
  initializeGame();
});
// Initialize the game with default settings
populateDifficultyLevels();
populateGridSizes();
initializeGame();
