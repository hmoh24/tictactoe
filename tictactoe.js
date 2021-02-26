const gameBoard = (() => {
    let array = [];
    let initialArrayCreate = document.querySelectorAll('.board').forEach(element => array.push(element.textContent));
    let input = {marker : ''}
    const changePlayer = (choice) => {input.marker = choice;}
    let click = {value:0};
    const turnTrack = () => {
        click.value++;;
    }
    const boardHolderDiv = document.querySelector('#boardHolder');
    boardHolderDiv.addEventListener('click', function(e){
        if (e.target.classList.contains('board') && e.target.textContent.length < 1 && (input.marker == 'x'  || input.marker == 'o')){
            array[Number(e.target.id)] = input.marker;
            turnTrack();
            gameLogic.turnChanger();
            gameLogic.winCheck('x');
            gameLogic.winCheck('o');
            gameLogic.winMessager();
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

let player = playerFactory('jj', 'x');
let player2 = playerFactory('AI', 'o');

if (gameBoard.click.value === 0){
    gameBoard.changePlayer(player.marker);
}

const gameLogic = (() => {
    let win = {victor:''};
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
            console.log('win');
        }
        else if ((gameBoard.array[2]=== marker && gameBoard.array[5]=== marker && gameBoard.array[8] === marker)){
            win.victor = marker;
            console.log('win');
        }
        else if ((gameBoard.array[6] === marker&& gameBoard.array[7]=== marker && gameBoard.array[8] === marker)){
            win.victor = marker;
            console.log('win');
        }
        else if ((gameBoard.array[0] === marker && gameBoard.array[3] === marker && gameBoard.array[6] === marker)){
            win.victor = marker;
            console.log('win');
        }
        else if ((gameBoard.array[3] === marker && gameBoard.array[4] === marker && gameBoard.array[5] === marker)){
            win.victor = marker;
            console.log('win');
        }
        else if ((gameBoard.array[0] === marker && gameBoard.array[4] === marker && gameBoard.array[8] === marker)){
            win.victor = marker;
            console.log('win');
        }
        else if ((gameBoard.array[2] === marker && gameBoard.array[4] === marker && gameBoard.array[6] === marker)){
            win.victor = marker;
            console.log('win');
        }
        else if ((gameBoard.array[1] === marker && gameBoard.array[4] === marker && gameBoard.array[7] === marker)){
            win.victor = marker;
            console.log('win');
        }
    };
    const winMessager = () =>{
        if (gameBoard.click.value > 4 && win.victor !== ''){
            console.log('won');
            if (win.victor === 'x'){
                alert(player.name + ' has won!');
            }
            else if (win.victor === 'o'){
                alert(player2.name + ' has won!');
            }
        }
    };
    return {
        win,
        turnChanger,
        winCheck,
        winMessager
    }
    // if (gameBoard.click.value === 9){
    //     checkWin('x', 'o');
    // }
    
})();


const initialChoose = (() => {  //toggle class
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
    });
    let player1Choice = {value:''};
    let player2Choice = {value:''};
    let player1Name = {value:''};
    let player2Name = {value:''};
    return {
        player1Choice,
        player2Choice,
        player1Name,
        player2Name,
    }
})();


// plan: minimise global code
// step by step, first sort out clicking and dom manipulation, use text
// change array depending on clicks?? 
// win condition logic: its a straight array 1,2,3,4,5,6,7,8,9
//arranged      1 2 3   0 1 2
//              4 5 6   3 4 5
//              7 8 9   6 7 8
// win is any three linking of 1-3, 3-9, 7-9, 1-7, 4-6, 1-9, 3-7, 2-8
// how to test? 


// 
