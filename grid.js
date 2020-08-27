const rows = 3;
const cols =3;

for (let i =0; i < rows; i++) {
  const row = document.createElement("div");
  document.body.appendChild(row);
  row.className = "ourRow";
    
  for (let j=0; j < cols; j++) {
    const square = document.createElement("div");
    square.className = "ourSquare";
    square.id = "square" + i + j;
    square.addEventListener("click", posClick.bind(null, i, j)) //start of EV
    row.appendChild(square);

  }
}

function posClick(row, column, event) {
    console.log(`row - ${row} column - ${column} was clicked`);
    const playedPeice = document.createElement("div");
    document.getElementById("square"+row+column).style = "background-color: yellow;";
}

 

// // A grid position was clicked call the game's turn function, redraw and then check for a winner.
// function positionClick(row, column, event) {
//     takeTurn(row, column);
//     const board = getBoard();
//     if (!isValidRowOrColumn(board) || !board.every(isValidColumn)) {
//         throw "Expecting 'getBoard' to return a 2d array where all values match are null or one of the strings 'nought' or 'cross'. Actually received: " + JSON.stringify(board);
//     }
//     drawBoard(board);
//     const winner = checkWinner();
//     if (winner) {
//         if (typeof winner !== "string" || !["noughts", "crosses", "nobody"].includes(winner)) {
//             throw "Expecting 'checkWinner' to return null or one of the strings 'noughts', 'crosses' or 'nobody'. Actually received: " + winner;
//         }
//         const winnerName = document.getElementById("winner-name");
//         winnerName.innerText = winner;
//         const winnerDisplay = document.getElementById("winner-display");
//         winnerDisplay.style.display = "block";
//     }
// }