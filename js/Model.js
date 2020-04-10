  import Utils from './Utils.js';
  
  export default class Model {
  
    snakeCells;
    foodCell;
    numRows;
    numCols;
    nextSnakeHead;
    direction;
    
    constructor(numRows, numCols) { 
        this.snakeCells = [];
        this.numRows = numRows;
        this.numCols = numCols;
        const directions = ['up', 'down', 'left', 'right'];
        this.direction = directions[Math.floor(Math.random() * directions.length)];

    }
    
    nextMoveSnakeEats() {
        this.setNextSnakeHead();
    }
    
    setDirection(direction) {
        this.direction = direction;
    }
    
    startGame() {
        this.snakeCells.push(Utils.getRandomCell(this.numRows, this.numCols));
        this.foodCell = Utils.getRandomCell(this.numRows, this.numCols);
    }
    
    isGameOver() {
        return Utils.isGameOver(this.snakeCells, this.foodCell);
    }
    
    growSnake() {
        this.snakeCells = Utils.growSnake(this.snakeCells, this.direction);
    }
    
    moveSnake() {
        this.snakeCells = Utils.moveSnake(this.snakeCells, this.direction);
    }
    
    getSnakeCells() {
        return this.snakeCells;
    }
    
    getFoodCell() {
        return this.foodCell;
    }
    
    setNextSnakeHead() {
        this.snakeHead = Utils.getNextSnakeHead();
    }
    
    isGameOver() {
        return Utils.isHeadOffGrid(this.snakeCells, this.numRows, this.numCols)
         ||  Utils.isSnakeEatingItself(this.snakeCells);
    }
    
    isFoodEaten() {
        return Utils.isFoodEaten(this.snakeCells, this.foodCell)
    }
    
    getNumRows() { return this.numRows; }
    getNumCols() { return this.numCols; }
  }
  
  