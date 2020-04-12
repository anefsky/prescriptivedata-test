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

    getKeyEventToActionMap() {
        return {
            ArrowUp: 'up',
            ArrowDown: 'down',
            ArrowLeft: 'left',
            ArrowRight: 'right'
        };
    }

    setArrowKeysHandler() {
        document.addEventListener('keydown', event => {
            const direction = this.getKeyEventToActionMap()[event.key];
            if(direction) {
                event.preventDefault();  // stop page from repositioning
                this.setDirection(direction);
            }
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
        const percentBoardToExclude = 33;  // don't want to snake to start close to edge
        this.snakeCells.push(Utils.getCellAwayFromEdges(this.numRows, this.numCols, 
                percentBoardToExclude));
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
        const directions = Utils.getValuesFromObjectAsArray(this.getKeyEventToActionMap());
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

    setNextSnakeHead() {
        this.nextSnakeHead = Utils.getNextArrayHead(this.snakeCells, this.direction);
    }

    isGameOver() {
        return Utils.isHeadOffGrid(this.snakeCells, this.numRows, this.numCols)
            || Utils.isArrHeadOnBody(this.snakeCells);
    }

    getSnakeCells() { return this.snakeCells; }
    getFoodCell() { return this.foodCell; }
    getNumRows() { return this.numRows; }
    getNumCols() { return this.numCols; }
}

