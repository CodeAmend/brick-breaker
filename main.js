var canvas, context;
var canvasWidth = 800;
var canvasHeight = 600;

var mouse = {
    x:0,
    y:0
}

var ballX = 0;
var ballY = 0;

var ballSpeedX = 1;
var ballSpeedY = 2;

var paddleHeight = 10;
var paddleWidth = 100;
var paddleDistance = canvasHeight * 0.10;

window.onload = function() {
    // for 2d context, canvas.width and canvas.height
    canvas = document.getElementById('gameBoard');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    canvas.addEventListener('mousemove', calcMousePosition);

    context = canvas.getContext('2d');

    var framesPerSecond;

    setInterval(updateAll, 1000 / framesPerSecond);
}

function calcMousePosition(event) {
    rect = canvas.getBoundingClientRect();
    root = document.documentElement;

    mouse.x = event.clientX - rect.left - root.scrollLeft;
    mouse.y = event.clientY - rect.top - root.scrollTop;
}

function updateAll() {

    // draw ball and movements
    drawAll();
    moveAll();


}

function drawAll() {
    // reset and paint background
    drawRect(0, 0, canvas.width, canvas.height, 'black');

    // draw ball
    context.fillStyle = 'white';
    context.beginPath();
    context.arc(ballX, ballY, 10, 0, 2 * Math.PI, true);
    context.fill();

    // draw paddle
    drawRect(mouse.x - paddleWidth / 2, canvas.height - paddleDistance, paddleWidth, paddleHeight, 'white' );
}

function drawRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
    context.fillStyle = fillColor;
    context.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);

}

function moveAll() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    if (ballX > canvas.width) {
        ballSpeedX *= -1;
    }
    if (ballX < 0) {
        ballSpeedX *= -1;
    }
    if (ballY > canvas.height) {
        ballSpeedY *= -1;
    }
    if (ballY < 0) {
        ballSpeedY *= -1;
    }
}
