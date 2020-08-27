const rows = 4;
const cols =5;
for (let i =0; i < rows; i++) {
  const row = document.createElement("div");
  document.body.appendChild(row);
  row.className = "row";

  for (let j=0; j < cols; j++) {
    const square = document.createElement("div");
    square.className = "square";
    square.style = "background-color: blue;";
    row.appendChild(square);
  }
}


// .square {
//     width: 30px;
//     height: 30px;
//     border: 1px solid black;
//   }
  
//   .row {
//     display: flex; 
//     flex-direction: row;  
//   }