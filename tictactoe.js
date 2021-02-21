const gameBoard = (() => {
    let array = [];
    let initialArrayCreate = document.querySelectorAll('.board').forEach(element => array.push(element.textContent));
    return {
        array,
    }
})();

const playerFactory = (user, inputChoice) => {
    const win = function(){
        //think of good way to find win 
        console.log(user + 'has won!');
    };
    let name = user;
    const greet = () => console.log(name);
    const boardChange = function(){
        const boardHolderDiv = document.querySelector('#boardHolder');
        boardHolderDiv.addEventListener('click', function(e){
            if (e.target.classList.contains('board')){
                e.target.textContent = inputChoice;
            }
        });
    }
    return {
        boardChange,
        greet,
        name,
    }
}

let player = playerFactory('j', 'x');

let computer = playerFactory('AI', 'o');

player.boardChange();

// plan: minimise global code
// step by step, first sort out clicking and dom manipulation, use text
     