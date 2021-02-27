const gameBoard = (() => {
    let array = [];
    let initialArrayCreate = document.querySelectorAll('.board').forEach(element => array.push(element.textContent));
    let input = {marker : ''};
    const changePlayer = (choice) => {input.marker = choice;}
    let click = {value:0};
    const turnTrack = () => {
        click.value++;;
    };
    const boardHolderDiv = document.querySelector('#boardHolder');
    boardHolderDiv.addEventListener('click', function(e){
        if (e.target.classList.contains('board') && e.target.textContent.length < 1 && (input.marker == 'x'  || input.marker == 'o')){
            array[Number(e.target.id)] = input.marker;
            turnTrack();
            gameLogic.turnChanger();
            gameLogic.winCheck('x');
            gameLogic.winCheck('o');
            gameLogic.roundWinCheck();
        }
        gameBoard.updateArray();
    });
    const updateArray = function(){
        const elementsNodeList = document.querySelectorAll('.board');
        for(let i=0; i<array.length; i++){
            elementsNodeList[i].textContent = array[i] ;
        }
        return array;
    };
    return {
        changePlayer,
        updateArray,
        click,
        input,
        array,
    }
})();

const playerFactory = (user, choice) => {
    let name = user;
    let marker = choice;
    return Object.assign(
        {marker,
        name,},
        gameBoard
    )
};


const gameLogic = (() => {
    let win = {victor:''};
    let score = {value: 0};
    let score2 = {value:0};
    const turnChanger = () => {
        if (gameBoard.click.value%2 !== 0 && gameBoard.click.value !== 0){
            gameBoard.changePlayer(player2.marker);
        }
        else if (gameBoard.click.value%2 == 0 && gameBoard.click.value !== 0 ){
            gameBoard.changePlayer(player.marker);
        };
    };
    const winCheck = (marker) => {    
        if ((gameBoard.array[0] === marker &&gameBoard.array[1]=== marker && gameBoard.array[2] === marker)){
            win.victor = marker;
            
            gameBoard.changePlayer(player.marker);
            console.log('win is' + marker);
        }
        else if ((gameBoard.array[2]=== marker && gameBoard.array[5]=== marker && gameBoard.array[8] === marker)){
            win.victor = marker;
            
            gameBoard.changePlayer(player.marker);
            console.log('win is' + marker);
        }
        else if ((gameBoard.array[6] === marker&& gameBoard.array[7]=== marker && gameBoard.array[8] === marker)){
            win.victor = marker;
            
            gameBoard.changePlayer(player.marker);
            console.log('win is' + marker);
        }
        else if ((gameBoard.array[0] === marker && gameBoard.array[3] === marker && gameBoard.array[6] === marker)){
            win.victor = marker;
            
            gameBoard.changePlayer(player.marker);
            console.log('win is' + marker);
        }
        else if ((gameBoard.array[3] === marker && gameBoard.array[4] === marker && gameBoard.array[5] === marker)){
            win.victor = marker;
            
            gameBoard.changePlayer(player.marker);
            console.log('win is' + marker);
        }
        else if ((gameBoard.array[0] === marker && gameBoard.array[4] === marker && gameBoard.array[8] === marker)){
            win.victor = marker;
            
            gameBoard.changePlayer(player.marker);
            console.log('win is' + marker);
        }
        else if ((gameBoard.array[2] === marker && gameBoard.array[4] === marker && gameBoard.array[6] === marker)){
            win.victor = marker;
            
            gameBoard.changePlayer(player.marker);
            console.log('win is' + marker);
        }
        else if ((gameBoard.array[1] === marker && gameBoard.array[4] === marker && gameBoard.array[7] === marker)){
            win.victor = marker;
            
            gameBoard.changePlayer(player.marker);
            console.log('win is' + marker);
        }
    };
    const roundWinCheck = () =>{
        if (gameBoard.click.value > 4 && win.victor !== ''){
            console.log('win is in roundwincheck ' + win.victor);
            if (win.victor === player.marker){
                gameUIChange.scoreBoardPlayer1();
            }
            else if (win.victor === player2.marker){
                gameUIChange.scoreBoardPlayer2();
            }
        }
    };
    const restartRound = () =>{
        for (let i=0; i < gameBoard.array.length; i++){
            gameBoard.array[i] ='';
        }
    }
    return {
        win,
        score,
        score2,
        turnChanger,
        winCheck,
        roundWinCheck,
        restartRound,
    }
})();


const initialChoose = (() => {                                              //controlling Initial Pop Up
    const player1XButton = document.querySelector('#player1ChooseX');
    const player1OButton = document.querySelector('#player1ChooseO');
    const player2XButton = document.querySelector('#player2ChooseX');
    const player2OButton = document.querySelector('#player2ChooseO');
    const submitButton = document.querySelector('#submit')
    const hiddenDiv = document.querySelector('#hiddenDiv');
    const startDiv = document.querySelector('#start');
    startDiv.addEventListener('click', function(e){
        if (e.target === player1XButton || e.target === player2OButton ){
            e.preventDefault();
            player1XButton.classList.toggle('toggleButton');
            player2OButton.classList.toggle('toggleButton');
            player1Choice.value = 'x';
            player2Choice.value = 'o';
            if (player1OButton.classList.contains('toggleButton') || player2XButton.classList.contains('toggleButton')){
                player1OButton.classList.toggle('toggleButton');
                player2XButton.classList.toggle('toggleButton');
            }
        }
        else if (e.target === player1OButton || e.target === player2XButton ){
            e.preventDefault();
            player1OButton.classList.toggle('toggleButton');
            player2XButton.classList.toggle('toggleButton');
            player1Choice.value = 'o';
            player2Choice.value = 'x';
            if (player1XButton.classList.contains('toggleButton') || player2OButton.classList.contains('toggleButton')){
                player1XButton.classList.toggle('toggleButton');
                player2OButton.classList.toggle('toggleButton');
            }
        }
    })

    const form = document.querySelector('form');
    form.addEventListener('submit', function(e){
        e.preventDefault();
        player1Name.value = document.querySelector('#player1Text').value
        player2Name.value = document.querySelector('#player2Text').value
        startDiv.style.display = 'none';
        hiddenDiv.style.opacity = '100%';
        gameUIChange.boardNameApply();
        initialisePlayers();
        gameBoard.changePlayer(player.marker);
    });
    let player1Choice = {value:''};
    let player2Choice = {value:''};
    let player1Name = {value:''};
    let player2Name = {value:''};
    
    const initialisePlayers = () => {
        player = playerFactory(initialChoose.player1Name.value, initialChoose.player1Choice.value);
        player2 = playerFactory(initialChoose.player2Name.value, initialChoose.player2Choice.value);
    }
    return {
        player1Choice,
        player2Choice,
        player1Name,
        player2Name,
    }
})();

let player;
let player2;

const gameUIChange = (() => {
    const player1Title = document.querySelector('#player1Title');
    const player1BoardText = document.querySelector('#player1Writing');
    const player2Title = document.querySelector('#player2Title');
    const player2BoardText = document.querySelector('#player2Writing');
    const scoreBoardPlayer1 = () => {
        gameLogic.score.value++
        console.log(gameLogic.score.value);
        player1BoardText.textContent = gameLogic.score.value;
       
    }
    const scoreBoardPlayer2 = () => {
        gameLogic.score2.value++
        console.log(gameLogic.score2.value);
        player2BoardText.textContent = gameLogic.score2.value;
    }
    const boardNameApply = () =>{
        player1Title.textContent = initialChoose.player1Name.value;
        player2Title.textContent = initialChoose.player2Name.value;
    }

    const newGameButton = document.querySelector('#newGameButton');
    newGameButton.addEventListener('click', () => {
        location.reload();
    });

    const nextRoundButton = document.querySelector('#nextRoundButton');
    nextRoundButton.addEventListener('click', () => {
        gameLogic.restartRound();
        gameBoard.updateArray();
        gameLogic.win.victor = '';
        gameBoard.click.value = 0;
    });
    return {
        boardNameApply,
        scoreBoardPlayer1,
        scoreBoardPlayer2,
    }
})();


    






// plan: minimise global code
// features: buttons for play next round (reset gameboard method) and button for new game (restart page) and/or fix input at end of round issue DONE
// dont allow additional clicks after round is over
// Draw system
// animation on load of start form?
// Best of system?
// something to increase response? like text saying X won this round

// 
