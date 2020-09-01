// module = module || {};
// module.exports = {
//     takeMove: takeMove,
//     getBoard: getBoard
// }

const rows = 3;
const cols =3;
//Initalise an empty 2d array
let board = Array(cols).fill().map(() => Array(rows));
// console.log(board[1][1]);
// console.log(board[1]);



//init array to null
for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
        board[i][j] = "hi";
    }
}

console.log(board[1][1]);
console.log(board[1]);
console.log(board);

for (let i =0; i < cols; i++) {
    const col = document.createElement("div");
    col.className = "ourRow";
    document.getElementById("board-div").appendChild(col);
      
    for (let j=0; j < rows; j++) {
      const square = document.createElement("div");
      square.className = "ourSquare";
      square.style = "background-color: blue;";
      square.id = "square" + i + j;
      square.addEventListener("click", posClick.bind(null, i, j)) //
      col.appendChild(square);
    }
  }

function posClick(column, row, event) {
    console.log(`column - ${column} row - ${row}  was clicked`);  
    takeMove(column);
    console.log("++++++++++++++++++++++")
}

//Know player
//Should proabbly remove inline styling here
function drawPiece(column, row) {
    document.getElementById("square"+column+row).style = "background-color: yellow;";
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