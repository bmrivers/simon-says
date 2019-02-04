/*---- constants -----*/
// the buttons are objects in an array
// each will have its own sound
const buttons = [
    // 0. red button
    {   soundSrc: null,
        color: 'red',
    },
    // 1. blue button 
    {   soundSrc: null,
        color: 'blue',
    },
    // 2. green button
    {   soundSrc: null,
        color: 'green',
    },
    // 3. yellow button
    {   soundSrc: null,
        color: 'yellow',
    },
];


/*----- app's state (variables) -----*/ 
// pattern of moves created by code during gameplay
var compMoves = [0, 3, 1 ,2];
var playersMoves = [];
var currentMove = 0;
var playing;

/*----- cached element references -----*/ 
// red

var redButton = $('#red')
console.log(redButton);

var blueButton = $('#blue')
console.log(blueButton);

var greenButton = $('#green')
console.log(greenButton);

var yellowButton = $('#yellow')
console.log(yellowButton);

var score = $('#score');

// blue
// green
// yellow

/*----- event listeners -----*/ 

// listens for a click on any circle
$('.circle').on('click', function(evt) {
    console.log(evt.target);
    currentMove = $(evt.target).index();
    //console.log(currentMove);
    lightItUp(currentMove);
    playersMoves.push(currentMove);
    console.log(playersMoves);
});


// makes game start on click of start button
$('#start').on('click', function(evt) {
    console.log('starting game...');
    play();
});

/*----- functions -----*/
// lights up a given button.. based on its color..
function lightItUp(buttonNum) {
    // creates an id from currentButton's color
    let currentButton = "#" + buttons[buttonNum].color;
    console.log(currentButton);
    // selects the element based on id, changes color
    $(currentButton).css('background-color', buttons[buttonNum].color);
    // turns button back to black
    setTimeout(function(){
        $(currentButton).css('background-color', 'black');
    }, 100);
}

function play() {
    playing = true;
    $(score).html(compMoves.length);
    let newCompMove;
    //while (playing) {
        newCompMove = Math.floor(Math.random() * 4);
        compMoves.push(newCompMove);
        runCompMoves();
        setTimeout(function() {
            playing = checkMoves();
            if(playing){
                playersMoves = [];
                play();
            } else {
                alert('Your final score is ' + compMoves - 1);
            }
        }, 10000);
    //}
}

// checks if player correctly copied computers moves
function checkMoves() {
    if (compMoves.length !== playersMoves.length) {
        alert('not enough moves.');
        return false;
    }
    for (let i = 0; i < compMoves.length; i++) {
        if(compMoves[i] !== playersMoves[i]) {
            alert('You messed up somehwere...')
            return false;
        }
    }
    alert('You did what the computer did!');
    return true;
}

// lights up or 'plays' all the moves the computer is making
function runCompMoves() {
    let currIndex = -1;
    var playMoves = setInterval(function() {
        currIndex++;
        if (currIndex >= compMoves.length) {
            return;
        } else {
            lightItUp(compMoves[currIndex]);
        }
    }, 1000);
}
// updates score based on numbers of moves been done

/*
function automateMoves(btnIdx) {
    console.log(btnIdx + buttons[btnIdx]);
    lightItUp(buttons[btnIdx);
}*/
//function playerPress(move) {
        // plays sound
    // pushes number to compOrPlayer array
    // returns div back to normal state (border only)
// 
