// @ts-check

/** @type {HTMLCanvasElement} */ // @ts-ignore
const canvas = document.getElementById("canvas-1");
/** @type {CanvasRenderingContext2D} */ // @ts-ignore
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray = [];
let hue = 0;

window.onresize = function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.fillStyle = "white";
  ctx.fillRect(20, 20, 100, 100);
};

/** @type {{x:number | undefined, y:number | undefined}} */
const mouse = {
  x: undefined,
  y: undefined,
};

// Click Events,
canvas.onclick = function ({ x, y }) {
  mouse.x = x;
  mouse.y = y;
  //   drawCircle();
  for (let i = 0; i < 5; i++) particleArray.push(new Particle());
};

// Mousemove Events,
canvas.onmousemove = function ({ x, y }) {
  mouse.x = x;
  mouse.y = y;
  //   particleArray.forEach((p) => {
  //     p.update();
  //     p.draw();
  //   });
  //   drawCircle();
  //   particleArray.push(new Particle());
  for (let i = 0; i < 5; i++) particleArray.push(new Particle());
};

// function drawCircle() {
//   ctx.fillStyle = "cyan";
//   //   ctx.strokeStyle = "blue";
//   ctx.lineWidth = 7;
//   ctx.beginPath();
//   // @ts-expect-error
//   ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
//   ctx.fill();
//   //   ctx.stroke();
// }

// drawCircle();

class Particle {
  constructor() {
    this.x = mouse.x ?? Math.random() * canvas.width;
    this.y = mouse.y ?? Math.random() * canvas.height;
    this.size = Math.random() * 15 + 1;
    // this.size = 50
    this.speedX = Math.random() * 5 - 2.5;
    this.speedY = Math.random() * 5 - 2.5;

    this.hue = `hsl(${hue}, 100%, 50%)`;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.1;
    // if (this.size > 0.2) this.size -= 2;
  }

  draw() {
    // ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.fillStyle = this.hue;
    // ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// function init() {
//   for (let i = 0; i < 100; i++) {
//     particleArray.push(new Particle());
//   }
//   console.log(particleArray);
// }
// init();

function handleParticles() {
  //   particleArray.forEach((p, i) => {
  //     p.update();
  //     p.draw();

  //     if (p.size <= 0.3) particleArray.splice(i, 1);

  //     particleArray.forEach((p2, j) => {
  //       const dx = p.x - p2.x;
  //       const dy = p.y - p2.y;
  //       const distance = Math.sqrt(dx * dx + dy * dy);
  //       // console.log(distance);
  //       if (distance < 100) {
  //         ctx.beginPath();
  //         ctx.moveTo(p.x, p.y);
  //         ctx.lineTo(p2.x, p2.y);
  //         ctx.stroke();
  //       }
  //     });
  //   });

  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
    particleArray[i].draw();
    for (let j = i; j < particleArray.length; j++) {
    //   if (j % 3 === 0) {

      const dx = particleArray[i].x - particleArray[j].x;
      const dy = particleArray[i].y - particleArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      // console.log(distance);
      if (distance < 100) {
        ctx.beginPath();
        ctx.strokeStyle = particleArray[i].hue;
        // ctx.lineWidth = particleArray[i].size / 10;
        ctx.lineWidth = 0.2;
        ctx.moveTo(particleArray[i].x, particleArray[i].y);
        ctx.lineTo(particleArray[j].x, particleArray[j].y);
        ctx.stroke();
        ctx.closePath();
      }

    // }

    }
    if (particleArray[i].size <= 0.3) {
      particleArray.splice(i, 1);
      i--;
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //   ctx.fillStyle = "black";
  //   ctx.fillStyle = `rgba(0, 0, 0, 0.1)`;
  //   ctx.fillRect(0, 0, canvas.width, canvas.height);

  //   drawCircle();
  handleParticles();
  requestAnimationFrame(animate);
  hue++;
}

animate();
