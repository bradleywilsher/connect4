const rows = 3;
const cols =3;



// let board = new Array(cols);
// for (let i =0; i < rows; i++) {
//     board[i] = new Array(rows);
// }

//Initalise an empty 2d array
let board = Array(cols).fill().map(() => Array(rows));
console.log(board);



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
    document.getElementById("square"+row+column).style = "background-color: yellow;";
}

 