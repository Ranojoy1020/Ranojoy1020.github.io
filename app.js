const canvas = document.getElementById("myCanvas");
const landing = document.getElementsByClassName("landing");
const GRAVITY = 1;
var energyLoss = 0.9;

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight * 0.9;

window.addEventListener("resize", () => {
  canvas.width = document.documentElement.clientWidth * 0.99;
  canvas.height = document.documentElement.clientHeight * 0.9;
  init();
});

var mouse = {
  x: undefined,
  y: undefined,
};
window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});
// canvas.style.background = "#262626";

var context = canvas.getContext("2d");

class Ball {
  constructor(x, y, dx = 0, dy, radius, fill) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.maxRadius = 30;
    this.fill = fill;
  }
  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 2, true);
    context.fillStyle = `${this.fill}`;
    context.fill();
    context.stroke();
    context.closePath();
  }
  update() {
    if (
      this.y + this.radius + this.dy > canvas.height ||
      this.y + this.radius + this.dy <= this.radius + 20
    ) {
      this.dy = -this.dy; //* energyLoss;
    } else {
      this.dy; //+= GRAVITY;
    }

    if (
      this.x + this.radius + this.dx > canvas.width ||
      this.x + this.radius + this.dx <= this.radius + 20
    ) {
      this.dx = -this.dx; //* energyLoss;
    }
    this.x += this.dx;
    this.y += this.dy;
    
    // * Mouse Interaction
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 100 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius < this.maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  }
}

var ballArray = [];

function init() {
  ballArray = [];
  for (let i = 0; i < 30; i++) {
    let radius = 10;
    let x = Math.random() * (canvas.width - radius * 5) + radius;
    let y = Math.random() * (canvas.height - radius * 5) + radius;
    let dx = Math.random() * 2 + 0.5;
    let dy = Math.random() * 2 + 0.5;
    let color = ["#59ADFF", "#E64C64", "#FFFFFF"];
    let fill = color[Math.floor(Math.random() * 3)];
    let ball = new Ball(x, y, dx, dy, radius, fill);
    ballArray.push(ball);
  }
}

function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < ballArray.length; i++) {
    ballArray[i].update();
  }
  // ball.update();
}
init();
animate();
console.log();
