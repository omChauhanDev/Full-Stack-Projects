const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]; 

function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","","",]
    boxes.forEach((box)=>{
        box.innerText = "";
        box.style.pointerEvents = 'all';
        box.classList.remove('win');
        // box.classList = `box box${index+1}`; 
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

boxes.forEach((box, index)=>{
    box.addEventListener('click', ()=>{
        handleClick(index);
    });
});

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = 'none';
        swapTurn();
        checkGameOver();
    }
}

function checkGameOver(){
    let winner = "";
    for(let i=0; i<winningPositions.length; i++){
        const position = winningPositions[i];
        if((gameGrid[position[0]]!=="" && gameGrid[position[1]]!=="" && gameGrid[position[2]]!=="") &&
        gameGrid[position[0]]===gameGrid[position[1]] && gameGrid[position[1]]===gameGrid[position[2]]){
            
            winner = gameGrid[position[0]];

            boxes.forEach((box)=>{
                box.style.pointerEvents = 'none';
            });

            boxes[position[0]].classList.add('win');
            boxes[position[1]].classList.add('win');
            boxes[position[2]].classList.add('win');        

            gameInfo.innerText = `Winner is - ${winner}`;

            newGameBtn.classList.add("active");
            return;
        }
        else{
            let filled = 0;
            gameGrid.forEach((grid)=>{
                if(grid !== ""){
                    filled++;
                }
            });
            if(filled === 9){
                gameInfo.innerText = `Game Tied!`;
                newGameBtn.classList.add("active");
            }
        }
    }
}

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

newGameBtn.addEventListener('click', initGame);