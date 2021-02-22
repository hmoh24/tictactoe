const gameBoard = (() => {
    let array = [];
    let initialArrayCreate = document.querySelectorAll('.board').forEach(element => array.push(element.textContent));
    const changePlayer = (input) => {inputMarker = input;}
    let inputMarker = '';
    let playerTurnCounter = 0;
    let computerTurnCounter = 0;
    const boardHolderDiv = document.querySelector('#boardHolder');
    boardHolderDiv.addEventListener('click', function(e){
        if (e.target.classList.contains('board') && e.target.textContent.length < 1){
            array[Number(e.target.id)] = inputMarker;
            if(inputMarker == 'x'){
                playerTurnCounter++
                console.log('player turn is ' + playerTurnCounter);
            }
            else if(inputMarker == 'o'){
                computerTurnCounter++;
                console.log('computer turn is ' + computerTurnCounter);
            }
        }
        gameBoard.updateArray();
    });
    const updateArray = function(){
        const elementsNodeList = document.querySelectorAll('.board');
        for(let i=0; i<array.length; i++){
            elementsNodeList[i].textContent = array[i] ;
        }
        return array;
    }
    return {
        changePlayer,
        updateArray,
        playerTurnCounter,
        computerTurnCounter,
    }
})();

const playerFactory = (user, choice) => {
    let name = user;
    let input = choice;
    const greet = () => console.log(name);
    return Object.assign(
        {input,
        name,
        greet,},
        gameBoard
    )
};

let player = playerFactory('jj', 'x');
let computer = playerFactory('AI', 'o');



const gameLogic = () => {
    if ((gameBoard.playerTurnCounter-gameBoard.computerTurnCounter) == 1){    //wrong logic
        player.changePlayer(player.input);
    }
    else if ((gameBoard.computerTurnCounter - gameBoard.playerTurnCounter) == 1){
        computer.changePlayer(computer.input);
    }
    // const playerButton = document.querySelector('#playerChoose');
    // playerButton.addEventListener('click', function(){
    //     player.changePlayer(player.input);
    // });
    // const computerButton = document.querySelector('#computerChoose');
    // computerButton.addEventListener('click', function(){
    //     computer.changePlayer(computer.input);
    // });
    return {
        // playerButton,
        // computerButton,
    };
};

if (gameBoard.playerTurnCounter-gameBoard.computerTurnCounter === 0){
    player.changePlayer(player.input);
    gameLogic();
}
// plan: minimise global code
// step by step, first sort out clicking and dom manipulation, use text
// change array depending on clicks?? 


// const gameBoard = (() => {
//     let boardArray = []
//     let inputSign = 'x'    // Whoever's turn it is.
    
//     const boardHolderDiv = document.querySelector('#boardHolder');
//     boardHolderDiv.addEventListener("click", function(e){
//       Read inputSign and place in array and update
//     }
  
//     const changePlayer = function(input) {   // Your player objects would call this
//       inputSign = input;
//     }  
//   })();
