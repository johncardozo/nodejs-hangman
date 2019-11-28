$(document).ready(function(){

    // Global variables    
    const url = 'http://localhost:3000';
    let lettersGuessed = new Set();
    let lettersToBeGuessed = new Set();
    let errorNumber = 0;
    let movie = null;

    /* show the winner table */
    const showWinnerTable = () => {
        $.get(`${url}/winners`, (data) => {
            // Create the context for the template
            var context = {
                "winners": data
            };

            // Retrieve the template data from the HTML (jQuery is used here).  
            var template = $('#tbody-winners-template').html();
            // Compile the template data into a function  
            var templateScript = Handlebars.compile(template);
            // Pass Data to template script.  
            var html = templateScript(context);

            // Get HTML element
            let tbody = $('#tbody-winners');
            // Remove all HTML element children
            tbody.empty();
            // Insert the movies HTML code into the page 
            tbody.append(html);
        })
    };

    // Configure socket.io
    var socket = io();
    socket.on('winner', showWinnerTable);

    /* Get a random movie for the game */
    const getMovie = () => {

        // Get the movie to play from the server
        $.get(`${url}/movie`, (data) => {
            // Get the movie and generate an array
            movie = data[0].name.split("");
            
            // Get letters to be guessed
            movie.forEach(element => {
                // Add the current letter
                if(element !== ' '){
                    lettersToBeGuessed.add(element);
                }
            });            
            
            // Show current state of the game
            showCurrentState();

            // Show the movie in console (just for testing purposes)
            console.log(movie.join(''));
        })
    };

    /* Show current state of the game */
    const showCurrentState = () => {
        // Clear all blanks
        $("#blanksArea").empty();
        // Loop the movie letters
        movie.forEach(element => {
            // Check if current letter is an space
            if(element === ' '){
                $("#blanksArea").append(`<div class="space">&nbsp;</div>`);
            }else
            // Check whether it has to show the letter or not
            if(lettersGuessed.has(element)){
                $("#blanksArea").append(`<div class="blank">${element}</div>`);
            }else{
                $("#blanksArea").append(`<div class="blank">&nbsp;</div>`);
            }
        });        
    };

    /* Show the message for the winner */
    const showWinner = () => {
        // Show the winner message
        $('#winner-message').show();

        // Get the player
        let player = $("#playerText").val() !== '' ? $("#playerText").val() : 'anonymous';
        
        // Create new winner object
        let winner = {name: player};

        // Post the new winner to server
        $.post(`${url}/winner`, winner);
    };

    /* Show the message for the loser */
    const showLoser = () => {
        // Generate the loser message
        let message = `<strong>Such a loser!!!</strong><br>The correct movie is ${movie.join('')}`;
        // Show the loser message
        $('#loser-message').html(message);
        $('#loser-message').show();
    };   
    /* Click on guessing button */
    $("#guessButton").click(function(){
        // Get the value typed by the user
        let userGuess = $("#guessText").val().toUpperCase();
        
        // Check if the guessing is equal to the movie
        if(movie.join('') === userGuess){
            // Get all the letters to be guessed
            lettersGuessed = lettersToBeGuessed;
            // Show current state of the game
            showCurrentState();
            // Show winner message
            showWinner();
        }else{
            // Show the loser message
            showLoser();
        }
    });

    /* Click on letter button */
    $("#letterButton").click(function(){
        // Get the value typed by the user
        let letter = $("#letterText").val().toUpperCase();

        // Check if the letter is in the movie
        if(movie.includes(letter)){
            // Add the new guessed letter
            lettersGuessed.add(letter);            
            // Show current state of the game
            showCurrentState();
            // Check if there's a winner
            if(lettersGuessed.size == lettersToBeGuessed.size){
                showWinner();
            }
        }else{
            // Increment error number
            errorNumber++;
            // Draw the error
            if(drawError(errorNumber)){
                // Show the loser message
                showLoser();
            }
        }
        // Clean the text input
        $("#letterText").val('');
        $("#letterText").focus();
    });   

    // Hide messages
    $('#winner-message').hide();
    $('#loser-message').hide();

    // Initialize the canvas
    initializeCanvas();

    // Get a random movie for the game
    getMovie();

    // Get the winners
    showWinnerTable();
});