/*----------- constants -------------*/
// The buttons are objects in an array
// each will has its own sound
const buttons = [
    {   src: '../simon-says/sounds/hi-hat-1.wav',
        color: 'red',
    },
    {   src: '../simon-says/sounds/coffee-tin.wav',
        color: 'blue',
    },
    {   src: '../simon-says/sounds/kick-1.wav',
        color: 'green',
    },
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
playing, waitForUser, playMoves, playSound;

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

$('.circle').on('click', function(evt) {
    currentMove = $(evt.target).index();
    lightItUp(currentMove);
    playersMoves.push(currentMove);
});

$(startButton).on('click', function(evt) {
    $(stopButton).prop('disabled', false);
    $(startButton).prop('disabled', true);
    init();
});

$(stopButton).on('click', function(evt) {
    playing = false;
    $(whosTurn).html('You stopped the game.');
    $(this).prop('disabled', true);
    $(startButton).prop('disabled', false);
})

$('#rap').on('click', function() {
    setAudio(rapAudio)
});

$('#techno').on('click', function() {
    setAudio(technoAudio)
});

$('#rock').on('click', function() {
    setAudio(rockAudio)
});

$('#audio-enable').hide()

$('#audio-disable').on('click', function() {
    playSound = false;
    $('#audio-disable').hide()
    $('#audio-enable').show()
});

$('#audio-enable').on('click', function() {
    playSound = true;
    $('#audio-enable').hide()
    $('#audio-disable').show()
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
    playSound = true;
}

// Lights up a given button based on it's number..
function lightItUp(buttonNum) {
    let currentButton = "#" + buttons[buttonNum].color;
    
    $(currentButton).css('background-color', buttons[buttonNum].color);
    if (playSound) {
        let sound  = buttons[buttonNum].src;
        player.src = sound;
        player.play();
    }

    // Turns button back to black after 150 ms
    setTimeout(function(){
        $(currentButton).css('background-color', 'black');
    }, 150);
}

// Runs the computers moves and player gets to respond.
function playGame() {
    playing = true;
    $(score).html(compMoves.length);

    let newCompMove;
    newCompMove = Math.floor(Math.random() * 4);
    compMoves.push(newCompMove);

    $(whosTurn).html('Simon Says...')
    runCompMoves();

    waitForUser = setTimeout(function() {
        $(whosTurn).html('Your turn!')
        playing = checkMoves();
        if (playing) {
            playersMoves = [];
            $(whosTurn).html('Simon Says...')
            playGame();
        }
    }, 6000 + (1000 * (compMoves.length - 1)));

    // ClearTimeout if user makes as many moves as computer 'says'
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

// Lights up or 'plays' all the moves the computer is making
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

// Changes the audio played by the buttons
function setAudio(audioArray) {
    let i = 0;
    buttons.forEach(function(button) {
        button.src = audioArray[i];
        i++;
    });
}