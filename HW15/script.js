let player = { x: 180, y: 550, width: 40, height: 40 };
let obstacles = [];
let score = 0;
let highScore = 0;
let gameInterval;
let obstacleInterval;
let gameRunning = false;

if (localStorage.getItem('highScore')) {
    highScore = parseInt(localStorage.getItem('highScore'));
}

$(document).keydown(function(e) {
    if (!gameRunning) return;
    
    if (e.key === "ArrowLeft" && player.x > 0) {
        player.x -= 20; 
        $("#player").css("left", player.x + "px");
    } else if (e.key === "ArrowRight" && player.x < 360) {
        player.x += 20; 
        $("#player").css("left", player.x + "px");
    }
});


function spawnObstacle() {
    let obstacleX = Math.floor(Math.random() * 360);
    let $obstacle = $("<div class='obstacle'></div>");
    $obstacle.css("left", obstacleX + "px");
    $("#gameArea").append($obstacle);
    obstacles.push($obstacle);
}


function gameLoop() {
    for (let i = 0; i < obstacles.length; i++) {
      let obs = obstacles[i];
      let newTop = parseInt(obs.css("top")) + 5;
      obs.css("top", newTop + "px");

      if (checkCollision(player, { x: parseInt(obs.css("left")), y: newTop, width: 40, height: 40 })) {
        endGame();
      }

      if (newTop > 600) {
        obs.remove();
        obstacles.splice(i, 1);
        score++;
        $("#score").text("Score: " + score);
        i--;
      }
    }
}

function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

$("#startButton").click(function() {
    if (gameRunning) return;
    gameRunning = true;
    player.x = 180;
    score = 0;
    $("#player").css({ left: player.x + "px", top: player.y + "px" });
    $("#score").text("Score: 0");
    obstacles.forEach(obs => obs.remove());
    obstacles = [];
  
    gameInterval = setInterval(gameLoop, 30);
    obstacleInterval = setInterval(spawnObstacle, 1000);
});

function endGame() {
    gameRunning = false;
    clearInterval(gameInterval);
    clearInterval(obstacleInterval);
    
    if (score > highScore) {
      highScore = score;
      localStorage.setItem('highScore', highScore);
      alert("New High Score: " + highScore + "!");
    } else {
      alert("Game Over! Your score: " + score);
    }
}
  
  
  
  
  
  
  