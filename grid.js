// module = module || {};
// module.exports = {
//     takeMove: takeMove,
//     getBoard: getBoard
// }

const rows = 3;
const cols = 5;
//Initalise an empty 2d array
let board = Array(cols).fill().map(() => Array(rows));

//init array to null
for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
        board[i][j] = "hi";
    }
}


const WIDTH = (100 / cols);    
for (let i =0; i < cols; i++) {
    const col = document.createElement("div");
   
    col.className = "cols"; 
    col.style = `width: ${WIDTH}%;`;

    $("#board-border").append(col);

    for (let j=0; j < rows; j++) {
      const square = document.createElement("div");
      square.className = "squares";
      //square.style = "background-color: blue;";
      square.id = "square" + i + j;
      square.addEventListener("click", posClick.bind(null, i, j)) //
      col.appendChild(square);
    }
  }

function posClick(column, row, event) {
    console.log(`column - ${column} row - ${row}  was clicked`);  
    takeMove(column);
}

//Know player
//Should proabbly remove inline styling here
function drawPiece(column, row) {
    //document.getElementById("square"+column+row).style = "background-color: yellow;";
    const piece = document.createElement("div");
    piece.id = piece + column + row;
    piece.className = "tokens";
    document.getElementById("square"+column+row).appendChild(piece);
}

function takeMove(column) {
    let row = rows -1;
    console.log("starting row is " + row);
    for (let i = row; i >= 0; i--) {
        if (board[column][i] === "hi") {
            console.log("Hi " + column + i + "is empty");
            board[column][i] = "notEmpty"
            drawPiece(column, i);
            break;
        } 
    }
    // return 0;
}


function getBoard() {
    return board;
}


//module.exports = grid;

 //hi 