const initializeCanvas = () => {
    // Get the canvas
    var canvas = document.getElementById("hangmanDrawing");
    var context = canvas.getContext("2d");
    // Background
    context.beginPath();
    context.rect(0, 0, 300, 150);
    context.fillStyle = "#F6ECB0";
    context.fill();
    
    // Horizontal lines
    context.beginPath(); 
    context.strokeStyle = "#CEDAAB";
    for (let index = 10; index < 150; index=index+20) {
        context.moveTo(0, index);
        context.lineTo(300, index);
    }
    context.stroke();
    
    // Vertical left margin
    context.beginPath(); 
    context.strokeStyle = "#CF886A";
    context.moveTo(55, 0);
    context.lineTo(55, 150); 
    context.moveTo(52, 0);
    context.lineTo(52, 150); 
    context.stroke();
};

const drawError = (errorNumber) => {

    let end = false;

    // Get the canvas
    var canvas = document.getElementById("hangmanDrawing");
    var context = canvas.getContext("2d");

    // Reset the current path
    context.beginPath(); 
    context.strokeStyle = "black";

    // Draw each part of the hangman
    let x = 150;
    switch (errorNumber) {
        case 1: // Head
            // Draw a circle
            context.arc(x, 50, 15, 0, 2*Math.PI);      
            break;
        case 2: // Body
            // Draw a vertical line
            context.moveTo(x, 65);
            context.lineTo(x, 110);
            break;
        case 3: // Left leg  
            // Draw the line
            context.moveTo(x, 110);
            context.lineTo(x-25, 110+25);
            break;                         
        case 4: // Right leg  
            // Draw the line
            context.moveTo(x, 110);
            context.lineTo(x+25, 110+25);
            break;       
        case 5: // Arms
            // Draw an horizontal line
            context.moveTo(x-25, 80);
            context.lineTo(x+25, 80);
            break;
        case 6: // Tree
            // Draw an horizontal line
            context.moveTo(x-80, 10);
            context.lineTo(x+85, 10);
            // Draw a vertical line
            context.moveTo(x+70, 10);
            context.lineTo(x+70, 150);
            break;
        case 7: // Rope
            // Draw a vertical line
            context.moveTo(x, 10);
            context.lineTo(x, 36);
            // The game has ended
            end = true;
            break;
        default:
            break;
    }

    // Make the line visible
    context.stroke();

    return end;
};

