let circles = [];
const numCircles = 20;
const minRadius = 10;
const maxRadius = 30;
const minSpeed = 1;
const maxSpeed = 3;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < numCircles; i++) {
    circles.push(new Circle());
  }
  frameRate(20);
}

function draw() {
  background(220);
  for (let circle of circles) {
    circle.update();
    circle.checkEdges();
    circle.checkCollisions();
    circle.display();
  }
}

class Circle {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.radius = random(minRadius, maxRadius);
    this.dx = random(minSpeed, maxSpeed);
    this.dy = random(minSpeed, maxSpeed);
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
  }

  checkEdges() {
    if (this.x + this.radius > width || this.x - this.radius < 0) {
      this.dx *= -1;
    }
    if (this.y + this.radius > height || this.y - this.radius < 0) {
      this.dy *= -1;
    }
  }

  checkCollisions() {
    for (let otherCircle of circles) {
      if (this !== otherCircle) {
        const distanceX = this.x - otherCircle.x;
        const distanceY = this.y - otherCircle.y;
        const combinedRadius = this.radius + otherCircle.radius;
        if (distanceX * distanceX + distanceY * distanceY < combinedRadius * combinedRadius) {
          // Change direction based on collision angle
          const angle = atan2(distanceY, distanceX);
          const tempDx = this.dx;
          const tempDy = this.dy;
          this.dx = otherCircle.dx * cos(angle) - otherCircle.dy * sin(angle);
          this.dy = otherCircle.dy * cos(angle) + otherCircle.dx * sin(angle);
          otherCircle.dx = tempDx * cos(angle) - tempDy * sin(angle);
          otherCircle.dy = tempDy * cos(angle) + tempDx * sin(angle);
        }
      }
    }
  }

  display() {
    fill(0,0,255); // Random colors
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }
}
