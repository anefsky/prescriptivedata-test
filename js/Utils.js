export default class Utils {

    static isArrHeadOnBody(arrCells) {
        if (arrCells.length === 1) return false;
        const head = arrCells[0];
        const body = arrCells.slice(1);
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
                    cellToTest.col === otherCells[i].col) return true;
        }
        return false;
    }

    static getNextArrayHead(arrCells, direction) {
        const head = arrCells[0];
        switch (direction) {
            case ('up'): return { row: head.row - 1, col: head.col };
            case ('down'): return { row: head.row + 1, col: head.col };
            case ('left'): return { row: head.row, col: head.col - 1 };
            case ('right'): return { row: head.row, col: head.col + 1 };
         }
    }

    static moveArrCellsForward(arrCells, direction) {
        let grown = Utils.growArrCellsForward(arrCells, direction);
        grown.pop();  // remove last
        return grown;
    }

    static growArrCellsForward(arrCells, direction) {
        let newHead = this.getNextArrayHead(arrCells, direction);
        arrCells.unshift(newHead);
        return arrCells;
    }

    static isHeadOffGrid(arrCells, numRows, numCols) {
        const head = arrCells[0];
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

    static getCellAwayFromEdges(numRows, numCols, pctAreaToExclude) {
        const minRow = Math.floor(numRows * (pctAreaToExclude / 100));
        const maxRow = Math.floor(numRows * (1 - (pctAreaToExclude / 100)));
        const minCol = Math.floor(numCols * (pctAreaToExclude / 100));
        const maxCol = Math.floor(numCols * (1 - (pctAreaToExclude / 100)));

        return {
            row: Utils.getRandomNumInRange(minRow, maxRow),
            col: Utils.getRandomNumInRange(minCol, maxCol)
        }
    }

    static getValuesFromObjectAsArray(obj) {
        const values = [];
        Object.keys(obj).forEach(x => values.push(obj[x]));
        return values;
    }
}