const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions=[
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

function init(){
    currentPlayer="X"
    gameGrid=["","","",
              "","","",
              "","",""
    ];
    boxes.forEach((box, index) => {
        box.innerText = ""; // Clear the board
        boxes[index].style.pointerEvents = "all";
        box.classList.remove("win");
    }); 
    newGameBtn.classList.remove("active");
    gameInfo.innerText=`Current Player: ${currentPlayer}`;
    
}
init();

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
});

function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer="O";
    }
    else{
        currentPlayer="X";
    }
    gameInfo.innerText=`Current turn: ${currentPlayer}`;
}

function checkGameOver(){
    let ans="";
    winningPositions.forEach((position)=>{
        if((gameGrid[position[0]]!=="" && gameGrid[position[0]]===gameGrid[position[1]] && gameGrid[position[1]]===gameGrid[position[2]])){
            if(gameGrid[position[1]]==="X"){
                ans="X";
            }
            else{
                ans="O";
            }
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });
    if(ans!==""){
        gameInfo.innerText=`Winner Player: ${ans}`;
        newGameBtn.classList.add("active");
        return;
    }
    let count=0;
    gameGrid.forEach((box)=>{
        if(box!==""){
            count++;
        }
    });
    if(count===9){
        gameInfo.innerText=`Match Tied !!`;
        newGameBtn.classList.add("active");
    } 
}

function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";
        //swap
        swapTurn();
        //check win condition
        checkGameOver();
    }
}

newGameBtn.addEventListener("click", init);