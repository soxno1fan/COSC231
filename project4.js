/*
 *  Mordechai Sadowsky
 *  JavaScript file for my Project 4.
 *  Due date: 22 Nov. 2013
 *
 *  functions: drawBoard, move, moveUp, moveLeft, moveRight, moveDown, play, explode, endGame
 * 
 *
*/

/*Global Variables*/
boardRows = 10;
boardColumns = 10;
obstacleCount = 10;
baseTime = 2500;
plus_minus = 2000;

currentPosition = 0;
score = 0;
explosionTimer = setTimeout();
playing = false;
leftOpen = 0;
hanSolo = document.createElement("img");


obstacleSource = ["BobaFett.jpg", "JangoFett.png", "Stormtrooper.jpg", "BountyHunter.jpg", "TuskenRaider.jpg"];
//'crater' picture must be absolute address to compare with img.src:
craterSource = ["Fire.png", "http://people.emich.edu/msadows1/231/Projects/Project4/Vader.jpg"];

/*
 * drawBoard() is called once on page loading to create the game board
 * 
*/
function drawBoard() {
    /*Creates game board as a <table> element*/
    var boardString = "";
    var boardId = 0;
    
    for (r=0; r<boardRows; r++) {
        boardString += "<tr>";
        for (c=0; c<boardColumns; c++) {
            boardString += "<td id='boardCell"+(boardId++)+"'></td>";
        }
        boardString += "</tr>";
    }
    
    var myBoard = document.createElement("table");
    myBoard.innerHTML = boardString;
    myBoard.id = "board";
    document.body.appendChild(myBoard);

    /*Initializes little sprite*/
    hanSolo.src = "HanSolo.png";
    hanSolo.height = "47";
    hanSolo.width = "47";
    hanSolo.alt = "sprite";
    
    /*Retrieves previous highscore*/
    var high = getCookie("Highscore");
    if (high) {
        document.getElementById("highscore").innerHTML = high;
    }
    else {
        document.getElementById("highscore").innerHTML = "0000";
    }
}

/*
 *  move() is the event handler for key strokes
 *      This method calls one of four methods depending on the key pressed, each per cardinal direction.
 *      If the attempt to move the sprite was valid, as checked by the directional methods, the sprite
 *      is appended to the new cell, whose background is turned black.
 * 
*/
function move(event) {
    var moved = false;
    
    if (playing) {
        switch (event.keyIdentifier) {
            case 'Up':
            case 'U+0057':
            case 'U+0049':
                moved = moveUp();
                break;
            case 'Left':
            case 'U+0041':
            case 'U+004A':
                moved = moveLeft();
                break;
            case 'Right':
            case 'U+0044':
            case 'U+004C':
                moved = moveRight();
                break;
            case 'Down':
            case 'U+0053':
            case 'U+004B':
                moved = moveDown();
                break;
            default:
                break;
        }
    }
    var here = document.getElementById("boardCell"+currentPosition);
    
    if (moved) {
        if (here.style.backgroundColor != "black") {
            here.style.backgroundColor = "black";
            score += 100;
            leftOpen--;
        }
        document.getElementById("score").innerHTML = score;
        moved.appendChild(hanSolo);
        
        if (leftOpen <= 0) {
            endGame("You win!");
        }
        
    }
}

/*  move functions check the validity of an attempted sprite move, following the same algorithm:
 *      1) Does attempted new space exist? No: return.
 *      2) Is it occupied? No: go to 4.
 *      3) What is occupying? Obstacle: return. Crater: return and end game.
 *      4) Move once space over.
 *  For valid moves, these functions return so as to be able to make background black first
 */
function moveUp() {
    
    var newCell = document.getElementById("boardCell"+(currentPosition - 10));
    
    if (currentPosition <= (boardColumns-1)) {return null;}
    
    else if (newCell.firstChild) {
        if (newCell.firstChild.src == craterSource[1]) {
            endGame("You ran into Darth Vader!");
        }
        return null;
    }
    //newCell.appendChild(hanSolo);
    currentPosition -= 10;
    return newCell;
}

function moveLeft() {
    
    var newCell = document.getElementById("boardCell"+(currentPosition - 1));
    
    if (currentPosition%(boardColumns) <= 0) {return null;}
    
    else if (newCell.firstChild) {
        if (newCell.firstChild.src == craterSource[1]) {
            endGame("You ran into Darth Vader!");
        }
        return null;
    }
    //newCell.appendChild(hanSolo);
    currentPosition--;
    return newCell;
}

function moveRight() {
    
    var newCell = document.getElementById("boardCell"+(currentPosition+1));
    
    if (currentPosition%(boardColumns) >= (boardColumns-1)) {return null;}
    
    else if (newCell.firstChild) {
        if (newCell.firstChild.src == craterSource[1]) {
            endGame("You ran into Darth Vader!");
        }
        return null;
    }
    //newCell.appendChild(hanSolo);
    currentPosition++;
    return newCell;
}

function moveDown() {
    
    var newCell = document.getElementById("boardCell"+(currentPosition+10));
    
    if (currentPosition >= (boardRows*boardColumns-boardColumns)) {return null;}
    
    else if (newCell.firstChild) {
        if (newCell.firstChild.src == craterSource[1]) {
            endGame("You ran into Darth Vader!");
        }
        return null;
    }
    //newCell.appendChild(hanSolo);
    currentPosition+=10;
    return newCell;
}

/*
 *  play() clears the game board and repopulates it with up to 10 randomly placed obstacles.
 *      It also starts calling explode() every 3500±1000 milliseconds.
 */
function play() {
    /*Reset everything*/
    for (i=0; i<(boardColumns*boardRows); i++) {
        var cell = document.getElementById('boardCell'+i);
        cell.innerHTML = "";
        cell.style.backgroundColor = "white";
    }
    clearInterval(explosionTimer);
    score = 0;
    document.getElementById("score").innerHTML = score;
    leftOpen = boardRows*boardColumns-obstacleCount-1;
    
    playing = true;
    
    hanSolo.src="HanSolo.png";
    currentPosition = Math.floor(Math.random()*(boardColumns*boardRows));
    document.getElementById("boardCell"+currentPosition).appendChild(hanSolo);
    document.getElementById("boardCell"+currentPosition).style.backgroundColor = "black";
    
    /*Create random static obstacles*/
    for (i=0; i<obstacleCount; i++) {
        var randomId = Math.floor(Math.random()*(boardColumns*boardRows));
        var image = document.createElement("img");
        image.src = obstacleSource[i%obstacleSource.length];
        
        var cellToFill = document.getElementById("boardCell"+randomId);
        if (cellToFill.firstChild == null) {
            cellToFill.appendChild(image);
        }
        else {i--};
    }
    
    var timerInterval = Math.floor(Math.random()*plus_minus)+baseTime;
    explosionTimer = setTimeout(function(){explode()}, timerInterval);
}

/*
 *  explode() places an image in a random cell on the board, then replaces it one second later with the
 *      "crater" image. If the random cell contains an obstacle, it gets blown up and replaced. If the
 *      random cell contains the sprite, the game is over.
 */
function explode() {
    var newImage = document.createElement("img");
    newImage.src = craterSource[0];
    
    var randomId = Math.floor(Math.random()*(boardColumns*boardRows));
    
    var cellToFill = document.getElementById("boardCell"+randomId);
    var oldImage = cellToFill.firstChild;
    if (oldImage) {
        cellToFill.replaceChild(newImage, oldImage);
        if (oldImage == hanSolo) {
            endGame("Struck by falling spacecraft!");
            return;
        }
    }
    else {
        if (cellToFill.style.backgroundColor != "black") {
            leftOpen--;
        }
        cellToFill.appendChild(newImage);
    }
    
    var a = setTimeout(function(){newImage.src = craterSource[1];},1000);
    var timerInterval = Math.floor(Math.random()*plus_minus)+baseTime;
    explosionTimer = setTimeout(function(){explode()}, timerInterval);
}

function endGame(message) {
    playing = false;
    clearInterval(explosionTimer);
    
    if (message == "You ran into Darth Vader!") {
        hanSolo.src = "Dead.png";
    }
    alert(message);
    
    var previousBest = parseInt(getCookie("Highscore"));
    if (score > previousBest || !previousBest) {
        document.getElementById("highscore").innerHTML = score;
        alert("New Highscore!");
        setCookie("Highscore", score);
    }
        
    
}


function setCookie(argumentName, argumentValue) {
    
    document.cookie = argumentName+'='+escape(argumentValue);
}

function getCookie(argumentName) {
    
    var cookieString = document.cookie;
    var exists = cookieString.indexOf(" "+argumentName+"=");
    if (exists == -1)
        exists = cookieString.indexOf(argumentName+"=");
    if (exists == -1)
        return null;
    else {
        var argumentStart = cookieString.indexOf("=", exists)+1;
        var argumentEnd = cookieString.indexOf(";", exists);
        if (argumentEnd == -1) {argumentEnd = cookieString.length}
        return unescape(cookieString.substring(argumentStart,argumentEnd));
    }
}











