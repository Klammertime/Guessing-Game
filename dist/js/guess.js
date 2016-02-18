/*
 * Word Guessing Game
 *
 */
'use strict';
//Define a container for the game, its variables and its methods.
var game = {
    score: 0,
    answerPosition: 0, // position of the current answer in the answersList - start at 0
    display: '', // the current dash/guessed letters display - ex '-a-a--r--t'
    wrong: '', // all the wrong letters guessed so far
    answer: '', // the correct answer - one word from game.answersList
    wrongCount: 0, // the number of wrong guesses so far
    over: false, // is the game over?
    answersList: [ // list of answers to cycle through
        'lamp',
        'cat',
        'snow',
        'couch',
        'leaves',
        'moon',
        'northern lights',
        'transition',
        'snowstorm',
        'exotic wallpaper'
    ]
};


game.restart = function() {
    // Initialize the game at the beginning or after restart
    // Initialize the game variables - the model

    // Get the answer position from storage
    // Note that the getItem method and the standard object notation
    // yield different results when the property does not exist:
    // localStorage.getItem("noSuchProperty"); is null if it doesn't exit
    // and Number(null) is 0

    game.answerPosition = Number(localStorage.getItem("Guessing Game Position"));
    game.answer = game.answersList[game.answerPosition].toLowerCase(); // get the word from this round
    // from the answerList by using the updated answerPosition from localStorage.getItem. Looks like
    // you can call it whatever you want even with spaces because its always a string.

    game.display = '-'.repeat(game.answer.length);
    game.wrong = '';
    game.wrongCount = 0;
    game.over = false;

    // Initialize the web page (the view)
    $('progress').val('0'); // initialize the progress bar
    $('#display').text(game.display);
    $('#wrong').text('');
    $('#guess').val('');
    $('#guess').focus();
    game.updateScore(0);
    game.updatePosition();
};


game.play = function() {
    // Invoked when the user enters a letter
    if (game.over) { // if the game is over
        $('#wrong').text('Press RESTART to play again.'); // user has to restart
    } else { //if the game is not over yet
        var letter = $('#guess').val().toLowerCase();
        var position = game.answer.indexOf(letter);
        if (position >= 0) {
            // It's a good guess, update the game display in the model
            while (position >= 0) {
                // update the game display and find all remaining occurrences
                game.display = game.display.substring(0, position) + letter + game.display.substring(position + 1);
                // get the next occurrence
                position = game.answer.indexOf(letter, position + 1);
            }
            // update the dash display in the view
            $('#display').text(game.display);
        } else { // If it's a wrong guess
            game.wrong = letter + ' ' + game.wrong;
            game.wrongCount++;
            $('#wrong').text(game.wrong);
            $('progress').val(game.wrongCount);
        }
        // reinitialize the guess after a delay for usability
        setTimeout(function() {
            $('#guess').val('');
        }, 1000);
        // check for a win or loss
        game.outcome();
    }
};


game.outcome = function() {
    // check if the game is won or lost
    if (game.answer === game.display) {
        $('#wrong').text('Congratulations! You win and may leave the house!');
        game.over = true; // game is over.  User has to restart to play again
        game.updateScore(20);
    } else if (game.wrongCount > 6) {
        $('#wrong').text('You lose and there is so much snow, good luck getting out of the house! The answer was ' + game.answer);
        game.over = true; // game is over.  User has to restart to play again
        // update score in local storage and on page
        game.updateScore(-10);
    }
};

game.updateScore = function(increment) {
    // add increment to the score (if any) in local storage
    localStorage['Guessing Game Score'] = Number(localStorage.getItem('Guessing Game Score')) + increment;
    // display the score on the page
    $('#score').text(localStorage.getItem('Guessing Game Score'));
};

game.updatePosition = function() {
    // use the modulo operator to cycle through the list, if the number is smaller, it returns
    // that number, unless its the same, so returns 0 and starts over
    game.answerPosition = (game.answerPosition + 1) % game.answersList.length;
    // save it in storage
    localStorage['Guessing Game Position'] = game.answerPosition;
};


// Main program starts here
$(document).ready(function() {
    game.restart();
    $('#guess').on('input', game.play);
    $('button').click(game.restart);
});