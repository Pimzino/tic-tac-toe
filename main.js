const statusArea = document.getElementById('statusArea');
const restartButton = document.getElementById('restartButton');
const cells = document.querySelectorAll('.cell');

let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

  if (boardState[clickedCellIndex] !== '' || !gameActive) {
    return;
  }

  boardState[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;
  clickedCell.classList.add(currentPlayer);

  if (checkWin()) {
    statusArea.textContent = `Player ${currentPlayer} has won!`;
    gameActive = false;
    return;
  }

  if (boardState.every(cell => cell !== '')) {
    statusArea.textContent = 'Game is a draw!';
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusArea.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      return true;
    }
  }
  return false;
}

function restartGame() {
  currentPlayer = 'X';
  boardState = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  statusArea.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('X', 'O');
  });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

// Initial status
statusArea.textContent = `Player ${currentPlayer}'s turn`;
