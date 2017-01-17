var canvas, context;
var canvasWidth = 800;
var canvasHeight = 600;

var mouseX = canvasWidth / 2;
var mouseY = canvasHeight;

var ballX = canvasWidth / 2;
var ballY = canvasHeight - 100;

var ballSpeedX = 5;
var ballSpeedY = -8;

var paddleHeight = 12;
var paddleWidth = 100;
var paddleDistance = canvasHeight * 0.10;

var BRICK_W = 50;
var BRICK_H = 20;
var GROUT = 2;
var brickCols = 16;
var brickRows = 16;
var brickGrid = new Array(brickCols * brickRows);

window.onload = function() {
    // for 2d context, canvas.width and canvas.height
    canvas = document.getElementById('gameBoard');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    canvas.addEventListener('mousemove', calcMousePosition);

    context = canvas.getContext('2d');

    var framesPerSecond = 30;

    brickReset();

    setInterval(drawAll, 1000 / framesPerSecond);
}
function brickReset() {
    for (var i=0; i < brickGrid.length; i++) {
        brickGrid[i] = true;
    }
}
function calcMousePosition(event) {
    rect = canvas.getBoundingClientRect();
    root = document.documentElement;
    mouseX = event.clientX - rect.left - root.scrollLeft;
    mouseY = event.clientY - rect.top - root.scrollTop;
}


function drawAll() {
    // reset and paint background
    drawRect(0, 0, canvas.width, canvas.height, 'black');

    // draw ball
    context.fillStyle = 'white';
    context.beginPath();
    context.arc(ballX, ballY, 10, 0, 2 * Math.PI, true);
    context.fill();

    // draw bricks
    drawBricks();

    // draw paddle
    drawRect(mouseX - paddleWidth / 2, canvas.height - paddleDistance, paddleWidth, paddleHeight, 'red' );


    moveAll();
}
function ballReset() {
    ballX = canvas.width / 2;
    ballY = canvas.height - paddleDistance;
    ballspeedX = 2;
    ballSpeedY = -5;
}
function drawText(text, x, y, color) {
    context.fillStyle = color;
    context.fillText(text, x, y);
}

function drawRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
    context.fillStyle = fillColor;
    context.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);

}

function ballMove() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // right
    if (ballX > canvas.width) {
        ballSpeedX *= -1;
    }
    // left
    if (ballX < 0) {
        ballSpeedX *= -1;
    }
    // bottom
    if (ballY > canvas.height) {
        ballSpeedY *= -1;
    }
    // top
    if (ballY < 0) {
        ballSpeedY *= -1;
    }
}

function moveAll() {

    ballMove();

    ballBrickHandling();

    paddleCollisionHandling();

}

function paddleCollisionHandling() {
    var paddleTopEdge = canvas.height - paddleDistance;
    var paddleBottomEdge =  canvas.height - paddleDistance + paddleHeight;
    var paddleLeftEdge = mouseX - paddleWidth / 2;
    var paddleRightEdge = mouseX + paddleWidth /2;

    if (ballX > paddleLeftEdge &&
        ballX < paddleRightEdge &&
        ballY < paddleBottomEdge &&
        ballY > paddleTopEdge) {
            ballSpeedY *= -1;
            ballSpeedX =  (ballX - (paddleLeftEdge + paddleWidth / 2)) * 0.35;
    }
}

function indexOfColRow(col, row) {
    return col + brickCols * row;
}

function drawBricks() {

    for (var col=0; col < brickCols; col++) {
        for ( var row=0; row < brickRows; row++) {
            var brickGridIndex = indexOfColRow(col, row);
            if (brickGrid[brickGridIndex]) {
                drawRect(BRICK_W * col, row * BRICK_H, BRICK_W - GROUT, BRICK_H - GROUT, "blue")
            }
        }
    }
}
function ballBrickHandling() {

    var ballCol = Math.floor(ballX / BRICK_W);
    var ballRow = Math.floor(ballY / BRICK_H);
    var prevBallCol = Math.floor((ballX - ballSpeedX) / BRICK_W);
    var prevBallRow = Math.floor((ballY - ballSpeedY) / BRICK_H);

    var index = indexOfColRow(ballCol, ballRow);
    var brickContact = brickGrid[index];

    var bothTestFailed = true;

    if (brickContact &&
        ballCol >= 0 && ballCol < brickCols &&
        ballRow >= 0 && ballRow < brickRows) {

        if (ballCol != prevBallCol) {
            var adjBrick = indexOfColRow(prevBallCol, ballRow)
            if (brickGrid[adjBrick] == false) {
                bothTestFailed = false;
                ballSpeedX *= -1;
            }
        }
        if (ballRow != prevBallRow) {
            var adjBrick = indexOfColRow(ballCol, prevBallRow)
            if (brickGrid[adjBrick] == false) {
                bothTestFailed = false;
                ballSpeedY *= -1;
            }
        }
        if (bothTestFailed) {
            ballSpeedX *= -1;
            ballSpeedY *= -1;
        }

        brickGrid[index] = false;
    }

}
