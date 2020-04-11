export default class Utils {
    static isSnakeEatingItself(snakeCells) {
        if (snakeCells.length === 1) return false;
        const head = snakeCells[0];
        const body = snakeCells.slice(1);
        return Utils.isCellOnOtherCells(body, head);
    }

    static getRandomCell(numRows, numCols) {
        return {
            row: Math.floor(Math.random() * numRows),
            col: Math.floor(Math.random() * numCols)
        };
    }

    static isCellOnOtherCells(otherCells, cellToTest) {
        for (let i = 0; i < otherCells.length; i++) {
            if (cellToTest.row === otherCells[i].row &&
                cellToTest.col === otherCells[i].col) {
                return true;
            }
        }
        return false;
    }

    static getNextSnakeHead(snakeCells, direction) {
        const head = snakeCells[0];
        let newHead;
        switch (direction) {
            case ('up'):
                newHead = { row: head.row - 1, col: head.col };
                break;
            case ('down'):
                newHead = { row: head.row + 1, col: head.col };
                break;
            case ('left'):
                newHead = { row: head.row, col: head.col - 1 };
                break;
            case ('right'):
                newHead = { row: head.row, col: head.col + 1 };
        }
        return newHead;
    }

    static moveSnake(snakeCells, direction) {
        let snake = Utils.growSnake(snakeCells, direction);
        snake.pop();  // remove last
        return snake;
    }

    static growSnake(snakeCells, direction) {
        let newHead = this.getNextSnakeHead(snakeCells, direction);
        snakeCells.unshift(newHead);
        return snakeCells;
    }

    static isHeadOffGrid(snakeCells, numRows, numCols) {
        const head = snakeCells[0];
        return head.row < 0 || head.row > numRows - 1
            || head.col < 0 || head.col > numCols - 1;
    }

    static isSameCell(first, second) {
        return first.row === second.row &&
            first.col === second.col;
    }

    static getRandomItemFromArray(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    static getRandomNumInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static getCellAwayFromEdges(numRows, numCols) {  // start at middle 2/3 of board
        const minRow = Math.floor(numRows * .33);
        const maxRow = Math.floor(numRows * .67);
        const minCol = Math.floor(numCols * .33);
        const maxCol = Math.floor(numCols * .67);

        return {
            row: Utils.getRandomNumInRange(minRow, maxRow),
            col: Utils.getRandomNumInRange(minCol, maxCol)
        }
    }

}