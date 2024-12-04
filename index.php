<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tic-Tac-Toe</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <div id="start">
      <h1>TIC-TAC-TOE</h1>
      <p>Choose Mode:</p>
      <button onclick="setGameMode('player')">Player vs Player</button>
      <button onclick="setGameMode('computer')">Player vs Computer</button>
    </div>
    <div id="pickDifficulty" style="display: none">
      <p>Choose Difficulty:</p>
      <button onclick="setDifficulty('easy')">Easy</button>
      <button onclick="setDifficulty('hard')">Hard</button>
    </div>
    <div id="pickPlayer" style="display: none">
      <p>Pick your symbol:</p>
      <button id="x" onclick="pickSymbol('X')">X</button>
      <button id="o" onclick="pickSymbol('O')">O</button>
    </div>
    <div id="chooseStarter" style="display: none">
      <button onclick="startGame('X')">X</button>
      <button onclick="startGame('O')">O</button>
      <button onclick="startGame(Math.random() < 0.5 ? 'X' : 'O')">
        Random
      </button>
    </div>
    <div id="game" style="display: none">
      <p id="turn"></p>
      <div id="grid">
        <div class="cell" id="cell0" onclick="markCell(0)"></div>
        <div class="cell" id="cell1" onclick="markCell(1)"></div>
        <div class="cell" id="cell2" onclick="markCell(2)"></div>
        <div class="cell" id="cell3" onclick="markCell(3)"></div>
        <div class="cell" id="cell4" onclick="markCell(4)"></div>
        <div class="cell" id="cell5" onclick="markCell(5)"></div>
        <div class="cell" id="cell6" onclick="markCell(6)"></div>
        <div class="cell" id="cell7" onclick="markCell(7)"></div>
        <div class="cell" id="cell8" onclick="markCell(8)"></div>
      </div>
    </div>
    <script src="script.js"></script>
  </body>
</html>
