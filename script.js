const playerfactory = (name,marker) =>{
    return{name,marker};
}
const gameBoard = (() => {
    //create the gameboard
    let gameBoardArr = ["","","","","","","","",""];

    //select the gameboard
    const boardContainer = document.querySelector(".board-container");

    //make each square for the gameboard
    gameBoardArr.forEach(() => {
        const square = document.createElement("div");
        square.className = 'square';
        boardContainer.appendChild(square);
    }); 
    
    //add eventlistener on each square
    Array.from(boardContainer.children).forEach((item,index)=>{
        item.addEventListener('click',()=>{
            console.log(displayController.activePlayer.marker);
            item.classList.add(displayController.activePlayer.marker);
            gameBoardArr[index] = displayController.activePlayer.marker;
            item.style.pointerEvents = "none";
            displayController.remainingSpots -=1;
            displayController.checkWinner();
            if(displayController.winnerDeclared == false){
                if(displayController.remainingSpots > 0){
                    displayController.nextTurn();
                }
            }
            
            
            
        });
    });

    return{gameBoardArr};

})();
const displayController = (() =>{
    //declare players
    const player1 = playerfactory("Player 1","x");
    const player2 = playerfactory("Player 2","o");
    //setup activePlayer (default player1)
    let activePlayer = player1;
    //setup winningPlayer
    let winnerDeclared = false;
    let remainingSpots = 9;

    

    const winningConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    const checkWinner = () =>{
        winningConditions.forEach((item) =>{
            if(gameBoard.gameBoardArr[item[0]] === displayController.activePlayer.marker && gameBoard.gameBoardArr[item[1]] === displayController.activePlayer.marker && gameBoard.gameBoardArr[item[2]] === displayController.activePlayer.marker){
                winnerDeclared = true;
                console.log(winnerDeclared);
                
            };
        });
    };

    const nextTurn = () =>{ 
        displayController.activePlayer === player1 ? displayController.activePlayer = player2 : displayController.activePlayer = player1;
        console.log('nextPlayer function ran');
        console.log(activePlayer);
    };






    return{activePlayer,nextTurn,checkWinner,winnerDeclared,remainingSpots};

})();







