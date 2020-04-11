import Grid from './Grid.js';
import Model from './Model.js';

const initNumRows = 10;
const initNumCols = 10;

const grid = new Grid();
const model = new Model(initNumRows, initNumCols);


document.addEventListener('keydown', event => {
  event.preventDefault();  // stop grid from repositioning
  const keyEventToActionMap = {
    ArrowUp: 'up',
    ArrowDown: 'down',
    ArrowLeft: 'left',
    ArrowRight: 'right'
  }
  model.setDirection(keyEventToActionMap[event.key]);
});


model.startGame();
const interval = setInterval(() => {
  if (model.nextMoveSnakeEats()) {

    model.growSnake();
  } else {
    model.moveSnake();
  }

  grid.render(model.getNumRows(), model.getNumCols(),
    model.getSnakeCells(), model.getFoodCell());

  if (model.isGameOver()) {
    clearInterval(interval);
  }

}, 500);
