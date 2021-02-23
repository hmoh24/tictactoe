const gameBoard = (() => {
    let array = [];
    let initialArrayCreate = document.querySelectorAll('.board').forEach(element => array.push(element.textContent));
    const changePlayer = (input) => {inputMarker = input;}
    let inputMarker = '';
    let click = {value:0};
    const turnTrack = () => {
        click.value++;;
    }
    const boardHolderDiv = document.querySelector('#boardHolder');
    boardHolderDiv.addEventListener('click', function(e){
        if (e.target.classList.contains('board') && e.target.textContent.length < 1 && (inputMarker == 'x'  || inputMarker == 'o')){
            array[Number(e.target.id)] = inputMarker;
            turnTrack();
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
}

// gameLogic();


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
