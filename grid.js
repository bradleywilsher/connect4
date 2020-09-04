



const rows = 4;
const cols = 5;
//Flips after each turn
let p1Turn = true;
const WIDTH = (100 / cols);
const WINNUMBER = 4;


//To be fully functional this should be the kick starter to everything
// function gameInit() {

// }



//Initalise an empty 2d array
let board = Array(cols).fill().map(() => Array(rows));
boardInit();

function boardInit() {
    //init array to null
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            board[i][j] = "empty";
        }
    }
}

//init array to null
// for (let i = 0; i < cols; i++) {
//     for (let j = 0; j < rows; j++) {
//         board[i][j] = "empty";
//     }
// }



for (let i = 0; i < cols; i++) {
    const col = document.createElement("div");

    col.className = "cols";
    col.style = `width: ${WIDTH}%;`;

    // eslint-disable-next-line no-undef -- it does not link JQUERY
    $("#board-border").append(col);

    for (let j = 0; j < rows; j++) {
        const square = document.createElement("div");
        square.className = "squares";
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
function drawToken(column, row) {

    const token = document.createElement("div");
    token.id = token + column + row;

    //Assign each token to the appropriate player 
    if (p1Turn) {
        token.className += "p1Token";
        p1Turn = false;
    } else {
        token.className += "p2Token";
        p1Turn = true;
    }
    document.getElementById("square" + column + row).appendChild(token);
}


function checkWin(col, row) {
    //Adjust number of rols/cols for the array length

    let p1Score = 0;
    let p2Score = 0;
    

    //Horizontal Win
    for (let i = 0; i < cols; i++) {
        if (board[i][row] === "p1") {
            p1Score++;
            if (p1Score >= WINNUMBER) {
                console.log("p1Wins");
                p1Score = 0;
            }
        } else {
            p1Score = 0;
            if (board[i][row] === "p2") {
            p2Score++;
            if (p2Score >= WINNUMBER) {
                console.log("p2Wins");
                p1Score = 0;
            }
            } else {
                p2Score =0;
            }

        }


    }
}


//Can make pure
//inpure -> updates board array
function updateBoard(column, row, localBoard) {
    if (p1Turn) {
        localBoard[column][row] = "p1"
    } else {
        localBoard[column][row] = "p2"
    }
    return localBoard;
}


function takeMove(column) {
    let row = rows - 1;
    for (let i = row; i >= 0; i--) {
        if (board[column][i] === "empty") {
            updateBoard(column, i, board);
            drawToken(column, i);
            checkWin(column, i);
            break;
        }
    }
    // return 0;
}



function getBoard() {
    return board;
}

//functions names in {}


if (typeof module !== 'undefined') {
    module.exports = {
        boardInit,
    }
}