$(document).ready(function () {
  let player = { x: 180, y: 550, width: 40, height: 40 };
  let obstacles = [];
  let score = 0;
  let highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : 0;
  let gameInterval, obstacleInterval, moveInterval;
  let gameRunning = false;
  let keys = {};
  let currentLevel = 1;
  let obstacleSpeed = 5;
  let lastSpeedCheckpoint = 0;

  $("#highScoreDisplay").text(highScore);
  showScreen("#startScreen");

  $(document).keydown(function (e) {
    if (!gameRunning) return;
    keys[e.key] = true;
  });

  $(document).keyup(function (e) {
    keys[e.key] = false;
  });

  $("#startButton").click(function () {
    resetGame();
    showScreen("#gameArea");
    startGameLoop();
  });

  $("#nextLevelButton").click(function () {
    resetPlayer();
    $("#score").text("Score: 0");
    showScreen("#gameArea");
    startGameLoop();
  });

  $("#restartButton").click(function () {
    resetGame();
    showScreen("#gameArea");
    startGameLoop();
  });

  function showScreen(screenId) {
    $(".screen, #gameArea").hide();
    $(screenId).show();
    clearInterval(gameInterval);
    clearInterval(obstacleInterval);
    clearInterval(moveInterval);
    gameRunning = false;
  }

  function startGameLoop() {
    gameRunning = true;
    obstacles.forEach(obs => obs.remove());
    obstacles = [];
    keys = {};
    lastSpeedCheckpoint = 0;
    startMoveLoop();

    gameInterval = setInterval(gameLoop, 30);
    obstacleInterval = setInterval(spawnObstacle, 1000);
  }

  function gameLoop() {
    for (let i = 0; i < obstacles.length; i++) {
      let obs = obstacles[i];
      let newTop = parseInt(obs.css("top")) + obstacleSpeed;
      obs.css("top", newTop + "px");

      if (checkCollision(player, {
        x: parseInt(obs.css("left")),
        y: newTop,
        width: 40,
        height: 40
      })) {
        endGame();
        return;
      }

      if (newTop > 600) {
        obs.remove();
        obstacles.splice(i, 1);
        score += 2;
        $("#score").text("Score: " + score);
        handleScoreUpdate();
        i--;
      }
    }
  }

  function spawnObstacle() {
    let obstacleX = Math.floor(Math.random() * 360);
    let $obstacle = $("<div class='obstacle'></div>");
    $obstacle.css("left", obstacleX + "px");
    $("#gameArea").append($obstacle);
    obstacles.push($obstacle);
  }

  function startMoveLoop() {
    moveInterval = setInterval(() => {
      if (keys["ArrowLeft"] && player.x > 0) {
        player.x -= 5;
      }
      if (keys["ArrowRight"] && player.x < (400 - player.width)) {
        player.x += 5;
      }
      if (currentLevel === 3) {
        if (keys["ArrowUp"] && player.y > 0) {
          player.y -= 5;
        }
        if (keys["ArrowDown"] && player.y < (600 - player.height)) {
          player.y += 5;
        }
      }
      $("#player").css({ left: player.x + "px", top: player.y + "px" });
    }, 20);
  }

  function handleScoreUpdate() {
    if (currentLevel === 1 && score >= 50) {
      currentLevel = 2;
      score = 0;
      obstacleSpeed = 5;
      lastSpeedCheckpoint = 0;
      $("#levelIndicator").text("Level 2");
      $("#nextLevelNum").text("2");
      showScreen("#levelUpScreen");
    } else if (currentLevel === 2) {
      if (score >= lastSpeedCheckpoint + 10) {
        obstacleSpeed += 0.5;
        lastSpeedCheckpoint = score;
      }
      if (score >= 50) {
        currentLevel = 3;
        score = 0;
        obstacleSpeed = 6;
        lastSpeedCheckpoint = 0;

        player.width = 30;
        player.height = 30;
        player.y = 550;

        $("#player").css({
          width: player.width + "px",
          height: player.height + "px",
          top: player.y + "px"
        });

        $("#levelIndicator").text("Level 3 – Endless Mode");
        $("#gameArea").css("background-color", "#fdf2e9");
        $("#nextLevelNum").text("3");
        showScreen("#levelUpScreen");
      }
    } else if (currentLevel === 3) {
      if (score >= lastSpeedCheckpoint + 10) {
        obstacleSpeed += 0.5;
        lastSpeedCheckpoint = score;
      }
    }
  }

  function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
  }

  function endGame() {
    gameRunning = false;
    clearInterval(gameInterval);
    clearInterval(obstacleInterval);
    clearInterval(moveInterval);
    keys = {};

    $("#finalScore").text(score);
    if (score > highScore) {
      highScore = score;
      localStorage.setItem('highScore', highScore);
    }
    $("#finalHighScore").text(highScore);
    showScreen("#gameOverScreen");
  }

  function resetPlayer() {
    player = {
      x: 180,
      y: 550,
      width: 40,
      height: 40
    };
    $("#player").css({
      width: player.width + "px",
      height: player.height + "px",
      left: player.x + "px",
      top: player.y + "px"
    });
  }

  function resetGame() {
    score = 0;
    currentLevel = 1;
    obstacleSpeed = 5;
    lastSpeedCheckpoint = 0;
    resetPlayer();
    $("#score").text("Score: 0");
    $("#levelIndicator").text("Level 1");
    $("#gameArea").css("background-color", "lightgray");
    $("#highScoreDisplay").text(highScore);
  }
});
