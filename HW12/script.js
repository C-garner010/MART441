
class Obstacle {
    constructor(id, type, x, y, width, height) {
      this.id = id;
      this.type = type;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }
  
    draw(ctx) {
      ctx.fillStyle = this.type === "rock" ? "gray" : "green";
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  
    move() {
      this.y += 1;
      if (this.y > canvas.height) {
        this.y = -this.height;
      }
    }
  }
  
  class Player {
    constructor(x, y, size, color) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.baseColor = color;
      this.color = color;
      this.speed = 12;
      this.lastMove = { dx: 0, dy: 0 };
      this.isFlashing = false;
    }
  
    draw(ctx) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.size, this.size);
    }
  
    move(dx, dy, obstacles) {
      this.lastMove = { dx, dy };
      const newX = this.x + dx;
      const newY = this.y + dy;
  
      if (
        newX < 0 ||
        newY < 0 ||
        newX + this.size > canvas.width ||
        newY + this.size > canvas.height
      ) return;
  
      for (let obs of obstacles) {
        if (
          newX < obs.x + obs.width &&
          newX + this.size > obs.x &&
          newY < obs.y + obs.height &&
          newY + this.size > obs.y
        ) return;
      }
  
      this.x = newX;
      this.y = newY;
    }
  
    bounceBack() {
      this.x -= this.lastMove.dx * 2;
      this.y -= this.lastMove.dy * 2;
      this.x = Math.max(0, Math.min(this.x, canvas.width - this.size));
      this.y = Math.max(0, Math.min(this.y, canvas.height - this.size));
    }
  
    flashRed(duration = 300) {
      if (this.isFlashing) return;
      this.color = "red";
      this.isFlashing = true;
      setTimeout(() => {
        this.color = this.baseColor;
        this.isFlashing = false;
      }, duration);
    }
  }
  
  class Collectible {
    constructor(id, type, x, y, size) {
      this.id = id;
      this.type = type;
      this.x = x;
      this.y = y;
      this.size = size;
      this.collected = false;
    }
  
    draw(ctx) {
      if (this.collected) return;
      ctx.fillStyle = this.type === "coin" ? "gold" : "purple";
      ctx.beginPath();
      ctx.arc(this.x + this.size / 2, this.y + this.size / 2, this.size / 2, 0, Math.PI * 2);
      ctx.fill();
    }
  
    move() {
      this.y += 1;
      if (this.y > canvas.height) {
        this.y = -this.size;
      }
    }
  
    checkCollision(player) {
      return (
        !this.collected &&
        player.x < this.x + this.size &&
        player.x + player.size > this.x &&
        player.y < this.y + this.size &&
        player.y + player.size > this.y
      );
    }
  }

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let obstacles = [];
let collectibles = [];
let player;
let score = 0;
let gameOver = false;
let recentlyHitObstacles = new Set();
let restartButton = null;

function startGame() {
  obstacles = [];
  collectibles = [];
  score = 0;
  gameOver = false;
  recentlyHitObstacles.clear();
  player = new Player(50, 50, 30, "blue");

  if (restartButton) {
    restartButton.remove();
    restartButton = null;
  }

  Promise.all([
    fetch('obstacles.json').then(res => res.json()),
    fetch('collectibles.json').then(res => res.json())
  ])
  .then(([obstacleData]) => {
    obstacles = obstacleData.map(obj =>
      new Obstacle(obj.id, obj.type, obj.x, obj.y, obj.width, obj.height)
    );

    for (let i = 0; i < 5; i++) {
      spawnNewCollectible();
    }

    requestAnimationFrame(gameLoop);
  })
  .catch(err => {
    console.error("JSON load error:", err);
  });
}

document.addEventListener("keydown", (e) => {
  if (!player || gameOver) return;

  switch (e.key) {
    case "ArrowUp": player.move(0, -player.speed, obstacles); break;
    case "ArrowDown": player.move(0, player.speed, obstacles); break;
    case "ArrowLeft": player.move(-player.speed, 0, obstacles); break;
    case "ArrowRight": player.move(player.speed, 0, obstacles); break;
  }
});

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (gameOver) {
    ctx.fillStyle = score >= 1000 ? "green" : "red";
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.fillText(score >= 1000 ? "Winner!" : "Game Over", canvas.width / 2, canvas.height / 2);

    if (!restartButton) {
      createRestartButton();
    }

    return; 
  }


  for (let obs of obstacles) {
    obs.move();
    obs.draw(ctx);

    if (
      player.x < obs.x + obs.width &&
      player.x + player.size > obs.x &&
      player.y < obs.y + obs.height &&
      player.y + player.size > obs.y
    ) {
      if (!recentlyHitObstacles.has(obs)) {
        score -= 10;
        recentlyHitObstacles.add(obs);
        player.bounceBack();
        player.flashRed();
        setTimeout(() => recentlyHitObstacles.delete(obs), 500);
      }
    }
  }

  for (let item of collectibles) {
    item.move();
    item.draw(ctx);

    if (item.checkCollision(player)) {
      item.collected = true;
      score += 100;
      spawnNewCollectible();
    }
  }

  player.draw(ctx);

  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.textAlign = "left";
  ctx.fillText("Score: " + score, 10, 25);

  if (score >= 1000 || score <= -200) {
    gameOver = true;
    requestAnimationFrame(gameLoop);
    return;
  }

  requestAnimationFrame(gameLoop);
}

function spawnNewCollectible() {
  let tries = 0;
  const maxTries = 50;
  const size = 20;

  while (tries < maxTries) {
    let x = Math.random() * (canvas.width - size);
    let y = Math.random() * (canvas.height - size);

    let overlaps = obstacles.some(obs => {
      return (
        x < obs.x + obs.width &&
        x + size > obs.x &&
        y < obs.y + obs.height &&
        y + size > obs.y
      );
    });

    if (!overlaps) {
      collectibles.push(new Collectible(Date.now() + Math.random(), "coin", x, y, size));
      break;
    }

    tries++;
  }
}

function createRestartButton() {
  restartButton = document.createElement("button");
  restartButton.textContent = "Restart Game";
  restartButton.style.position = "absolute";
  restartButton.style.top = "65%";
  restartButton.style.left = "50%";
  restartButton.style.transform = "translate(-50%, -50%)";
  restartButton.style.padding = "12px 24px";
  restartButton.style.fontSize = "18px";
  restartButton.style.cursor = "pointer";
  restartButton.style.zIndex = 10;

  document.body.appendChild(restartButton);

  restartButton.addEventListener("click", () => {
    startGame();
  });
}

startGame();
