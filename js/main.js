import Grid from './Grid.js';
import Model from './Model.js';

const initNumRows = 10;
const initNumCols = 10;
let snakeInterval, foodInterval;

const model = new Model(initNumRows, initNumCols);

const scoreColors = ['blue', 'green', 'red'];
let scoreColorIdx = 0;
let prevScore = 0;
const SNAKE_INTERVAL_MS = 250;
const MIN_FOOD_INTERVAL_MS = 4000;
const MAX_FOOD_INTERVAL_MS = 10000;

setStartButtonHandler();

function setStartButtonHandler() {
  const button = document.getElementById('btn-start-game');
  button.addEventListener('click', doStartGame);
}

function enableStartButton(doEnable) {
  document.getElementById('btn-start-game').disabled = !doEnable;
}

function doStartGame() {
  enableStartButton(false)
  startGame();
}

function startGame() {
  model.startGame();
  startFoodInterval();
  snakeInterval = setInterval(() => {
    if (model.nextMoveSnakeEats()) {
      restartFoodInterval();
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
  }, SNAKE_INTERVAL_MS);
}

function startFoodInterval() {
  foodInterval = setInterval(() => {
    model.moveFoodCell();
  }, Math.floor(Math.random() * 
    (MAX_FOOD_INTERVAL_MS - MIN_FOOD_INTERVAL_MS)) + MIN_FOOD_INTERVAL_MS);
}

function restartFoodInterval() {
  clearInterval(foodInterval);
  startFoodInterval();
}

function endGame() {
  clearInterval(snakeInterval);
  clearInterval(foodInterval);
  setButtonText('Play another game');
  setScoreText();
  enableStartButton(true);
}

function setButtonText(str) {
  document.getElementById('btn-start-game').innerHTML = str;
}

function setScoreText() {
  const score = model.getScore();
  if(score > prevScore) scoreColorIdx++;
  scoreColorIdx = scoreColorIdx % scoreColors.length;
  const color = scoreColors[scoreColorIdx];
  document.getElementById('score').innerHTML = "Score  " + 
      '<span class="score-num" style="background-color:' + 
          color + '";>' + score + '</span>';
  prevScore = score;
}
