export default class Utils {
    static isSnakeEatingItself(snakeCells) {
      if(snakeCells.length === 1) return false;
      const head = snakeCells[0];
      const body = snakeCells.slice(1, snakeCells.length);             
      return Utils.isCellOnOtherCells(body, head);
    }

    static getRandomCell(numRows, numCols) {
      return {
          row: Math.floor(Math.random()*numRows),
          col: Math.floor(Math.random()*numCols)
      };
    }

    static isCellOnOtherCells(otherCells, cellToTest) {
      for(let i = 0; i < snakeCells.length; i++) {
          if(cellToTest.row === snakeCells[i].row &&
                cellToTest.col === snakeCells[i]) {
              return true;
          }
      }
      return false;
    }
    
    static getNextSnakeHead(snakeCells, direction) {
        const head = snakeCells[0];
        let newHead;
        switch(direction) {
            case('up'):
                newHead = { row: head.row - 1, col: head.col };
                break;
            case('down'):
                newHead = { row: head.row + 1, col: head.col };
                break;
            case('left'):
                newHead = { row: head.row, col: head.col - 1 };
                break;
            case('right'):
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
        let newHead = this.getNextSnakeHead(direction);
        snakeCells.unshift(newHead);
        return snakeCells;
    }
    
    static isHeadOffGrid(snakeCells, numRows, numCols) {
        const head = snakeCells[0];
        return head.row < 0 || head.row > numRows -1
            || head.col < 0 || head.col > numCols - 1;
    }
    
    static isFoodEaten(snakeHead, foodCell) {
        return Utils.isSameCell(snakeHead, foodCell);
    }
    
    static isSameCell(first, second) {
        return first.row === second.row &&
            second.col === second.col;
    }

  }