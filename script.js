let currentPlayer = "";
let playerSymbol = "";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let gameMode = "";
let gameDifficulty = "";

function setGameMode(mode) {
  gameMode = mode;
  document.getElementById("start").style.display = "none";
  if (gameMode === "computer") {
    document.getElementById("pickDifficulty").style.display = "block";
  } else {
    document.getElementById("pickPlayer").style.display = "block";
  }
}

function setDifficulty(difficulty) {
  gameDifficulty = difficulty;
  document.getElementById("pickDifficulty").style.display = "none";
  document.getElementById("pickPlayer").style.display = "block";
}

function pickSymbol(symbol) {
  playerSymbol = symbol;
  document.getElementById("pickPlayer").style.display = "none";
  document.getElementById("chooseStarter").style.display = "block";
}

function startGame(starter) {
  currentPlayer = starter;
  document.getElementById("chooseStarter").style.display = "none";
  document.getElementById("game").style.display = "block";
  document.getElementById("turn").innerText = `${currentPlayer}'s Turn`;

  if (gameMode === "computer" && currentPlayer !== playerSymbol) {
    setTimeout(computerMove, 500);
  }
}

function markCell(index) {
  if (board[index] === "" && gameActive) {
    board[index] = currentPlayer;
    const cell = document.getElementById(`cell${index}`);
    cell.innerText = currentPlayer;
    cell.classList.add(currentPlayer === "X" ? "x" : "o");
    checkWin();

    if (gameActive) {
      if (gameMode === "player") {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        if (gameMode === "computer" && currentPlayer !== playerSymbol) {
          setTimeout(computerMove, 500);
        }
      }
      document.getElementById("turn").innerText = `${currentPlayer}'s Turn`;
    }
  }
}

function computerMove() {
  let move;
  if (gameDifficulty === "easy") {
    move = getRandomMove();
  } else if (gameDifficulty === "hard") {
    move = findBestMove();
  }
  if (move !== undefined) {
    markCell(move);
  }
}

function getRandomMove() {
  const emptyCells = board
    .map((val, index) => (val === "" ? index : null))
    .filter((val) => val !== null);
  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

function findBestMove() {
  let bestMove = -1;
  let bestScore = -Infinity;

  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      board[i] = currentPlayer;
      let score = minimax(board, 0, false);
      board[i] = "";

      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }
  return bestMove;
}

function minimax(board, depth, isMaximizing) {
  const scores = {
    O: 1,
    X: -1,
    tie: 0,
  };

  let result = checkWinner();
  if (result !== null) {
    return scores[result];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = "O";
        let score = minimax(board, depth + 1, false);
        board[i] = "";
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = "X";
        let score = minimax(board, depth + 1, true);
        board[i] = "";
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

function checkWinner() {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  if (!board.includes("")) {
    return "tie";
  }

  return null;
}

function checkWin() {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      document.getElementById(
        "turn"
      ).innerText = `${board[a]} Wins! Restarting game...`;
      setTimeout(resetGame, 3000);
      return;
    }
  }

  if (!board.includes("")) {
    gameActive = false;
    document.getElementById("turn").innerText = "Draw! Restarting game...";
    setTimeout(resetGame, 3000);
  }
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.innerText = "";
    cell.classList.remove("x", "o");
  });
  gameActive = true;
  document.getElementById("game").style.display = "none";
  document.getElementById("start").style.display = "block";
}
