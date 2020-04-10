  export default class Grid {
      
      render(numRows, numCols, snakeCells, foodCell) {
          const gridElem = document.getElementById('grid');
          const gridRows = numRows;
          const gridCols = numCols;
          
          gridElem.innerHTML = '';  // remove previously rendered          
          for(let row = 0; row < gridRows; row++) {
              const rowElem = document.createElement('div');
              rowElem.classList.add('row');
              gridElem.appendChild(rowElem);
              for(let col = 0; col < gridCols; col++) {
                  let cellElem = document.createElement('div');
                  cellElem.classList.add('cell');
                  snakeCells.forEach( snakeCell => {
                      if(snakeCell.row === row && snakeCell.col === col) {
                          cellElem.classList.add('snake-cell');
                      }
                  })
                  if(foodCell.row === row && foodCell.col === col) {
                      cellElem.classList.add('food-cell');
                  }
                  rowElem.appendChild(cellElem);
              }
          }
      }
  }