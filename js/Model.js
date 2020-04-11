import Utils from './Utils.js';

export default class Model {

    snakeCells;
    foodCell;
    numRows;
    numCols;
    nextSnakeHead;
    direction;

    constructor(numRows, numCols) {
        this.numRows = numRows;
        this.numCols = numCols;
    }

    nextMoveSnakeEats() {
        this.setNextSnakeHead();
        return Utils.isSameCell(this.nextSnakeHead, this.foodCell);
    }

    setDirection(direction) {
        this.direction = direction;
    }

    placeFirstSnakeCell() {
        this.snakeCells.push(Utils.getCellAwayFromEdges(this.numRows, this.numCols));
    }

    placeFoodCell() {  // cannot be on a snake cell
        let onSnakeCell = true;
        let randomCell;
        while(onSnakeCell) {
            randomCell = Utils.getRandomCell(this.numRows, this.numCols);
            if(!Utils.isCellOnOtherCells(this.snakeCells, randomCell)) {
                onSnakeCell = false;
            }
        }
        this.foodCell = randomCell;
    }

    moveFoodCell() {
        this.placeFoodCell();
    }

    startGame() {
        this.snakeCells = [];        
        this.placeFirstSnakeCell();
        this.placeFoodCell();
        const directions = ['up', 'down', 'left', 'right'];
        this.direction = Utils.getRandomItemFromArray(directions);
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
        this.nextSnakeHead = Utils.getNextSnakeHead(this.snakeCells, this.direction);
    }

    isGameOver() {
        return Utils.isHeadOffGrid(this.snakeCells, this.numRows, this.numCols)
            || Utils.isSnakeEatingItself(this.snakeCells);
    }

    getNumRows() { return this.numRows; }
    getNumCols() { return this.numCols; }
}

