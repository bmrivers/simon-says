/*---- constants -----*/
// the buttons are objects in an array
// each will have its own sound
const buttons = [
    // 0. red button
    {   src: '../simon-says/sounds/coffee-tin.wav',
        color: 'red',
    },
    // 1. blue button 
    {   src: '../simon-says/sounds/hi-hat-1.wav',
        color: 'blue',
    },
    // 2. green button
    {   src: '../simon-says/sounds/kick-1.wav',
        color: 'green',
    },
    // 3. yellow button
    {   src: '../simon-says/sounds/snare.wav',
        color: 'yellow',
    },
];

const sadFaceHtml = '<img src="https://cultofthepartyparrot.com/parrots/hd/sadparrot.gif" width=50px/>';
/*
const otherSounds = {
    farmSounds: {
        src1: ;
    }
}*/

const player = new Audio();

/*----- app's state (variables) -----*/ 
// pattern of moves created by code during gameplay
var compMoves, compSpeed, playersMoves, currentMove, playing;

/*----- cached element references -----*/ 

var redButton = $('#red')
var blueButton = $('#blue')
var greenButton = $('#green')
var yellowButton = $('#yellow')
var startButton = $('#start');
var whosTurn = $('#whos-turn');
var stopButton = $('#stop')

/*----- event listeners -----*/ 

// Listens for a click on any circle
//if (playing) {
    $('.circle').on('click', function(evt) {
        console.log(evt.target);
        currentMove = $(evt.target).index();
        //console.log(currentMove);
        lightItUp(currentMove);
        playersMoves.push(currentMove);
        console.log(playersMoves);
    });
//}

// Makes game start on click of start button
$(startButton).on('click', function(evt) {
    console.log('starting game...');
    $(stopButton).prop('disabled', false);
    $(startButton).prop('disabled', true);
    init();
});

$(stopButton).on('click', function(evt) {
    playing = false;
    $(this).prop('disabled', true);
    $(startButton).prop('disabled', false);
})


/*----- functions -----*/
// Initializes variables for game play
// Is run when start button is clicked.
// Activates buttons??
function init() {
    var score = $('#score');
    compMoves = [0];
    playersMoves = [];
    currentMove = 0;
    playing = true;
    playerTimeInc = 1.2;
    compSpeed = 1000;
    playGame();
}


// lights up a given button.. based on its color..
function lightItUp(buttonNum) {
    // creates an id from currentButton's color
    let currentButton = "#" + buttons[buttonNum].color;
    console.log(currentButton);
    
    // selects the element based on id, changes color
    $(currentButton).css('background-color', buttons[buttonNum].color);
    
    // plays sound from button object
    let sound  = buttons[buttonNum].src;
    player.src = sound;
    player.play();

    // turns button back to black
    setTimeout(function(){
        $(currentButton).css('background-color', 'black');
    }, 150);
}



function playGame() {
    playing = true;
    $(score).html(compMoves.length);
    let newCompMove;

    // generate new move
    newCompMove = Math.floor(Math.random() * 4);
    compMoves.push(newCompMove);

    //play computers moves
    $(whosTurn).html('Simon Says...')
    runCompMoves();
    

    // wait for user to make moves
    setTimeout(function() {
        playing = checkMoves();
        if (playing) {
            playersMoves = [];
            playGame();
            $(whosTurn).html('Simon Says...')
        }
    }, 6000 + (1000 * (compMoves.length - 1)));
}


// Checks if player correctly copied computers moves
// 1. By length, 2. By Content
function checkMoves() {
    // 1. Returns false if the number of moves are unequal
    if (compMoves.length !== playersMoves.length) {
        $(whosTurn)
        .html('Not quite right ' + sadFaceHtml);
        // Enables and disables start/stop respectively
        $(startButton).prop('disabled', false);
        $(stopButton).prop('disabled', true);
        return false;
    }

    // 2. Returns false if computers moves and players are not identical
    for (let i = 0; i < compMoves.length; i++) {
        if(compMoves[i] !== playersMoves[i]) {
            $(whosTurn).html('Not quite right ' + sadFaceHtml);
            // Enables and disables start/stop respectively
            $(startButton).prop('disabled', false);
            $(stopButton).prop('disabled', true);
            return false;
        }
    }
    return true;
}

// lights up or 'plays' all the moves the computer is making
function runCompMoves() {
    $(whosTurn).html('Your turn!')
    let currIndex = -1;
    var playMoves = setInterval(function() {
        currIndex++;
        if (currIndex >= compMoves.length) {
            return;
        } else {
            lightItUp(compMoves[currIndex]);
        }
        compSpeed *= 0.98;
    }, compSpeed);
}
// updates score based on numbers of moves been done


