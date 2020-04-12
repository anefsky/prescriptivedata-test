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

        this.setArrowKeysHandler();
    }

    setArrowKeysHandler() {
        document.addEventListener('keydown', event => {
            event.preventDefault();  // stop grid from repositioning
            const keyEventToActionMap = {
              ArrowUp: 'up',
              ArrowDown: 'down',
              ArrowLeft: 'left',
              ArrowRight: 'right'
            }
            this.setDirection(keyEventToActionMap[event.key]);
        });
    }

    getScore() {
        return this.snakeCells.length - 1;
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
        this.snakeCells = Utils.growArrCellsForward(this.snakeCells, this.direction);
    }

    moveSnake() {
        this.snakeCells = Utils.moveArrCellsForward(this.snakeCells, this.direction);
    }

    getSnakeCells() {
        return this.snakeCells;
    }

    getFoodCell() {
        return this.foodCell;
    }

    setNextSnakeHead() {
        this.nextSnakeHead = Utils.getNextArrayHead(this.snakeCells, this.direction);
    }

    isGameOver() {
        return Utils.isHeadOffGrid(this.snakeCells, this.numRows, this.numCols)
            || Utils.isArrHeadOnBody(this.snakeCells);
    }

    getNumRows() { return this.numRows; }
    getNumCols() { return this.numCols; }
}

