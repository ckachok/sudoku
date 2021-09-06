module.exports = 

function solveSudoku(matrix) {
  findSolution(matrix);
  return matrix;
}

function findEmpty(matrix) {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix.length; col++) {
      if (matrix[row][col] === 0) {
        return [row, col];
      }
    }
  }
  return null;
}

function isValidValue(num, position, matrix) {
  const [row, col] = position;

  for (let i = 0; i < matrix.length; i++) {
    if (matrix[i][col] === num && i !== row) {
      return false;
    }
  }

  for (let i = 0; i < matrix.length; i++) {
    if (matrix[row][i] === num && i !== col) {
      return false;
    }
  }

  const boxLength = 3;
  const boxRow = Math.floor(row / boxLength) * boxLength;
  const boxCol = Math.floor(col / boxLength) * boxLength;

  for (let i = boxRow; i < boxRow + boxLength; i++) {
    for (let j = boxCol; j < boxCol + boxLength; j++) {
      if (matrix[i][j] === num && i !== row && j !== col) {
        return false;
      }
    }
  }
  return true;
}

function findSolution(matrix) {
  const emptyPosition = findEmpty(matrix);
  
  if (!emptyPosition) return true;

  for (let i = 1; i <= matrix.length; i++) {
    const valid = isValidValue(i, emptyPosition, matrix);

    if (valid) {
      const [x, y] = emptyPosition;
      matrix[x][y] = i;

      if (findSolution(matrix)) {
        return true;
      } 
      matrix[x][y] = 0;
    }
  }
  return false;
}