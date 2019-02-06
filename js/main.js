/*----------- constants -------------*/
// the buttons are objects in an array
// each will have its own sound
const buttons = [
    // 0. Red button
    {   src: '../simon-says/sounds/hi-hat-1.wav',
        color: 'red',
    },
    // 1. Blue button 
    {   src: '../simon-says/sounds/coffee-tin.wav',
        color: 'blue',
    },
    // 2. Green button
    {   src: '../simon-says/sounds/kick-1.wav',
        color: 'green',
    },
    // 3. Yellow button
    {   src: '../simon-says/sounds/snare.wav',
        color: 'yellow',
    },
];

const rockAudio = [
    '../simon-says/sounds/hi-hat-1.wav',
    '../simon-says/sounds/coffee-tin.wav',
    '../simon-says/sounds/kick-1.wav',
    '../simon-says/sounds/snare.wav',   
]

const rapAudio = [
    'http://www.therapboard.com/audio/traviscott_yah.mp3',
    'http://www.therapboard.com/audio/bigsean_ohgod.mp3',
    'http://www.therapboard.com/audio/e40_1.mp3',
    'http://www.therapboard.com/audio/takeoff_ayy.mp3',
]

const technoAudio = [
    '../simon-says/sounds/tech-snare.wav',
    '../simon-says/sounds/tech-tom.wav',
    '../simon-says/sounds/tech-kick.wav',
    '../simon-says/sounds/tech-kick2.wav'
]

const sadFaceHtml = '<img src="https://cultofthepartyparrot.com/parrots/hd/sadparrot.gif" width=50px/>';

const player = new Audio();

/*----------- app's state (variables) ------------*/ 
var compMoves, compSpeed, playersMoves, currentMove, 
playing, waitForUser, playMoves;

/*---------- cached element references ---------*/ 

var redButton = $('#red')
var blueButton = $('#blue')
var greenButton = $('#green')
var yellowButton = $('#yellow')
var startButton = $('#start');
var whosTurn = $('#whos-turn');
var stopButton = $('#stop')
var rapChange = $('#rap');
var technoChange = $('#techno');
var rockChange = $('#rock');
var score = $('#score');

/*------------ event listeners ------------*/ 

// Listens for a click on any circle
$('.circle').on('click', function(evt) {
    currentMove = $(evt.target).index();
    lightItUp(currentMove);
    playersMoves.push(currentMove);
});

// Makes game start when Start is clicked
$(startButton).on('click', function(evt) {
    $(stopButton).prop('disabled', false);
    $(startButton).prop('disabled', true);
    init();
});

// Makes game end when Stop is clicked
$(stopButton).on('click', function(evt) {
    playing = false;
    $(whosTurn).html('You stopped the game.');
    $(this).prop('disabled', true);
    $(startButton).prop('disabled', false);
})

// Top buttons control array of sounds to be used

$('#rap').on('click', function() {
    setAudio(rapAudio)
});
$('#techno').on('click', function() {
    setAudio(technoAudio)
});
$('#rock').on('click', function() {
    setAudio(rockAudio)
});


/*------------ functions ------------*/
// Initializes variables for game play
// Is run when start button is clicked.
function init() {
    compMoves = [];
    playersMoves = [];
    currentMove = 0;
    playing = true;
    playerTimeInc = 1.2;
    compSpeed = 1000;
    playGame();
}


// Lights up a given button based on it's number..
function lightItUp(buttonNum) {
    // Creates an id from currentButton's color
    let currentButton = "#" + buttons[buttonNum].color;
    
    // Selects the element based on id, changes color
    $(currentButton).css('background-color', buttons[buttonNum].color);
    
    // Plays sound from button object
    let sound  = buttons[buttonNum].src;
    player.src = sound;
    player.play();

    // Turns button back to black after 150 ms
    setTimeout(function(){
        $(currentButton).css('background-color', 'black');
    }, 150);
}


// Runs the computers moves and player gets to respond.
function playGame() {
    playing = true;

    // Renders score
    $(score).html(compMoves.length);
    
    // Generate new move
    let newCompMove;
    newCompMove = Math.floor(Math.random() * 4);
    compMoves.push(newCompMove);

    //play computers moves
    $(whosTurn).html('Simon Says...')
    runCompMoves();
    

    // wait for user to make moves
    waitForUser = setTimeout(function() {
        $(whosTurn).html('Your turn!')
        playing = checkMoves();
        if (playing) {
            playersMoves = [];
            $(whosTurn).html('Simon Says...')
            playGame();
        }
    }, 6000 + (1000 * (compMoves.length - 1)));
    if (playersMoves.length === compMoves.length) {
        clearTimeout(waitForUser);
    }
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
        if (compMoves[i] !== playersMoves[i]) {
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
    let currIndex = -1;
    playMoves = setInterval(function() {
        if (!playing) {
            clearInterval(playMoves);
            clearTimeout(waitForUser);
        }
        currIndex++;
        if (currIndex >= compMoves.length) {
            return;
        } else {
            lightItUp(compMoves[currIndex]);
        }
        compSpeed *= 0.99;
    }, compSpeed);
}


function setAudio(audioArray) {
    let i = 0;
    buttons.forEach(function(button) {
        button.src = audioArray[i];
        i++;
    });
}