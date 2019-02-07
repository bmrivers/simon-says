#Simon Says
Bonny Rivers <br>
General Assembly <br>WDI Santa Monica  <br>
February 2019

---

###Game and Background
This game is a rendition of Simon Says, originally created electronically in 1978 by Ralph Baer. The first game was a copy of Atari's Touch Me, with 4 buttons with lights that map to red, green, yellow, and blue areas of the device. Both games included a count of how many times you can copy "Simon" correctly.

For my version of Simon Says, I added the ability to customize the sound each button makes when pressed or played by simon. I added a function to toggle the sound on and off. I also added a "Stop" button, in the event that the user would like the pattern or game to stop running. The design was inspired by a game called Circles, a memory game for people with Alzheimer's Disease.

###Wireframes
![First Idea](http://i67.tinypic.com/2zom7oz.jpg)
![Second Idea](http://i65.tinypic.com/34yuu54.jpg)


###Screenshot

![Image of Simon Says interface](http://i68.tinypic.com/118zxgp.jpg)

###Technologies Used
JavaScript, HTML, CSS, jQuery, Google Fonts, Visual Studio Code, GitHub, TheRapBoard.com, icons8.com, FreeSound.org, Chrome Dev Tools



####Getting Started

[Simon Says by Bonny Rivers](https://bmrivers.github.io/simon-says/)

Upon clicking the start button, the game will make a move: play a noise and “light up” a button. The user will have approximately 10 seconds to press the same button.

The game plays the same move and then make another random move in a decreasing amount of time. The game will continue speeding up the time it takes for it to play the pattern as more moves are added to the pattern.


Pressing start again will begin a new pattern. The sounds of the pattern can be changed at any point while the game is being played.

###Code Snippet
```javascript
// Lights up a given button based on it's number..
function lightItUp(buttonNum) {
    // Creates an id from currentButton's color
    let currentButton = "#" + buttons[buttonNum].color;
    
    // Selects the element based on id, changes color
    $(currentButton).css('background-color', buttons[buttonNum].color);
    
    // Plays sound from button object
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

    // Renders score
    $(score).html(compMoves.length);
    
    // Generates new move
    let newCompMove;
    newCompMove = Math.floor(Math.random() * 4);
    compMoves.push(newCompMove);

    // Play computers moves
    $(whosTurn).html('Simon Says...')
    runCompMoves();

    // Wait for user to make moves
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
```

###Next Steps
* Simon says is currently unbeatable. I would like to implement winning logic after a certain number of moves.
* Like the game Circles I researched, I would like to have a function that adds more circles to the game board.
* More sounds to select from for the user.