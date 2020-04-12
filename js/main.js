import Grid from './Grid.js';
import Model from './Model.js';

const initNumRows = 10;
const initNumCols = 10;
let interval;

const model = new Model(initNumRows, initNumCols);

const scoreColors = ['red', 'green', 'blue'];
let scoreColorIdx = 0;

setStartButtonHandler();

function setStartButtonHandler() {
  const button = document.getElementById('btn-start-game');
  button.addEventListener('click', doStartGame);
}

function doStartGame() {
  startGame();
}

function startGame() {
  model.startGame();
  interval = setInterval(() => {
    if (model.nextMoveSnakeEats()) {
      model.moveFoodCell();
      model.growSnake();
    } else {
      model.moveSnake();
    }
  
    Grid.render(model.getNumRows(), model.getNumCols(),
      model.getSnakeCells(), model.getFoodCell());
  
    if (model.isGameOver()) {
      endGame();
    }
  
  }, 250);
}

function endGame() {
  clearInterval(interval);
  setButtonText('Play another game');
  setScoreText();
}

function setButtonText(str) {
  document.getElementById('btn-start-game').innerHTML = str;
}

function setScoreText() {
  scoreColorIdx = scoreColorIdx % scoreColors.length;
  const color = scoreColors[scoreColorIdx++];
  document.getElementById('score').innerHTML = "Score  " + 
      '<span class="score-num" style="color: ' + 'white' + ';">'
       + model.getScore() + '</span>';
}
