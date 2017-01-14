var canvas, context;

var ballX = 0;
var ballY = 0;

var ballSpeedX = 2;
var ballSpeedY = 5;

window.onload = function() {
    // for 2d context, canvas.width and canvas.height
    canvas = document.getElementById('gameBoard');
    canvas.width = 800;
    canvas.height = 600;

    context = canvas.getContext('2d');

    var framesPerSecond;

    setInterval(updateAll, 1000 / framesPerSecond);
}

function updateAll() {

    // reset and paint background
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // draw ball and movements
    drawBall();

}

function drawBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    if (ballX > canvas.width || ballX < 0) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballY > canvas.height || ballY < 0) {
        ballSpeedY = -ballSpeedY;
    }

    context.fillStyle = 'white';
    context.beginPath();
    context.arc(ballX, ballY, 10, 0, 2 * Math.PI, true);
    context.fill();
}
