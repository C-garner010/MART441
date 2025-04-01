
$(document).ready(function() {
    $(document).keypress(function(event) {
        var audio = document.getElementById("bgMusic");

        audio.play();
        console.log("Audio started playing!");

        getKey(event);
    });
});

class Square {
    constructor(x, y, height, width, color) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.color = color;
    }

    setX(x) {
        this.x = x;
    }
    setY(y) {
        this.y = y;
    }
    setHeight(height) {
        this.height = height;
    }
    setWidth(width) {
        this.width = width;
    }
    setColor(color) {
        this.color = color;
    }
    get theX() {
        return this.x;
    }
    get theY() {
        return this.y;
    }
    get theHeight() {
        return this.height;
    }
    get theWidth() {
        return this.width;
    }
    get theColor() {
        return this.color;
    }
}


var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

var x = 50, y = 50; 
var x2 = 100, y2 = 100; 

var square1 = new Square(x, y, 20, 20, "blue");
var square2 = new Square(x2, y2, 50, 50, "green");

drawSquare(); 

$(document).ready(function() {
    $(document).keypress(function(event) {
        getKey(event);
    });
});

function getKey(event) {
    var didCollide = hasCollided(square1, square2);
    if (didCollide) {
        square1.setColor("red");
        square2.setColor("yellow");
        changeBackgroundColor(); 

        square1.setHeight(square1.theHeight + 1); 
        square1.setWidth(square1.theWidth + 1); 
        square2.setHeight(square2.theHeight + 1); 
        square2.setWidth(square2.theWidth + 1); 
    }

    var char = event.which || event.keyCode;
    var actualLetter = String.fromCharCode(char);

    if (actualLetter === "w") {
        moveUp();
    } else if (actualLetter === "s") {
        moveDown();
    } else if (actualLetter === "d") {
        moveRight();
    } else if (actualLetter === "a") {
        moveLeft();
    }

    drawSquare(); 
}

function moveUp() {
    if (y > 0) y -= 10; 
    square1.setY(y); 
}

function moveDown() {
    if (y + square1.theHeight < canvas.height) y += 10; 
    square1.setY(y); 
}

function moveLeft() {
    if (x > 0) x -= 10; 
    square1.setX(x); 
}

function moveRight() {
    if (x + square1.theWidth < canvas.width) x += 10; 
    square1.setX(x); 
}

var square2DirectionX = 2; 
var square2DirectionY = 2; 

function moveAutonomously() {
    y2 += square2DirectionY;
    if (y2 + square2.theHeight > canvas.height || y2 < 0) {
        square2DirectionY = -square2DirectionY; 
    }

    x2 += square2DirectionX;
    if (x2 + square2.theWidth > canvas.width || x2 < 0) {
        square2DirectionX = -square2DirectionX; 
    }

    square2.setX(x2);
    square2.setY(y2);
}

function drawSquare() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    ctx.fillStyle = "#FFFFFF"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = square1.theColor;
    ctx.fillRect(square1.theX, square1.theY, square1.theWidth, square1.theHeight);

    ctx.fillStyle = square2.theColor;
    ctx.fillRect(square2.theX, square2.theY, square2.theWidth, square2.theHeight);
}


function hasCollided(object1, object2) {
    return !(
        ((object1.y + object1.height) < (object2.y)) ||
        (object1.y > (object2.y + object2.height)) ||
        ((object1.x + object1.width) < object2.x) ||
        (object1.x > (object2.x + object2.width))
    );
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function changeBackgroundColor() {
    document.body.style.backgroundColor = getRandomColor(); 
}

function animate() {
    moveAutonomously(); 
    var didCollide = hasCollided(square1, square2);
    if (didCollide) {
        square1.setColor("red");
        square2.setColor("yellow");
        changeBackgroundColor(); 

        square1.setHeight(square1.theHeight + 1); 
        square1.setWidth(square1.theWidth + 1); 
        square2.setHeight(square2.theHeight + 1); 
        square2.setWidth(square2.theWidth + 1); 
    }

    drawSquare(); 
    requestAnimationFrame(animate); 
}

animate(); 
