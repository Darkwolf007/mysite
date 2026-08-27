// Ported from https://openprocessing.org/@u110137/2777365 — kept just the
// flow-field pen drawing itself (the Pen class + spawnPen), dropped the
// WEBGL paper/shadow/tilt scene and the two magnet "pins" holding it down,
// so this draws straight onto a plain 2D canvas like the site's other
// hero sketches.
let colors = [];
colors.push(["#600001", "#a8322f", "#d06b20", "#e1972f", "#013c90", "#3d2842", "#a40211", "#1587b3", "#51cee7", "#f889b9", "#ee390c", "#2c0505"]);
colors.push(["#013f61", "#07606a", "#0f7b9c", "#366a1c", "#eb7300", "#142027", "#e8eddd"]);
colors.push(["#0c0c49", "#243487", "#6f90c9", "#75a8f5", "#CEC86B", "#815138"]);
colors.push(["#080d0a", "#515e57", "#f7de78", "#eecb43", "#ee970e", "#a98715", "#d4580c"]);
colors.push(["#fa5e04", "#db3004", "#ac4d1d", "#634740", "#5b1602"]);

let cindex = 0;
let pindex = 0;
let pens = [];
let div = 39;
let amp = 50;
let steps = 30; // segments drawn per pen per frame — fast-forwards the growth
let speed = 1; // multiplies steps; clicking boosts this

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("home-bg");

  pindex = floor(random(colors.length));
  div *= height / 600;
  background(20, 20, 20);

  // A first seed so the sketch starts drawing immediately, not just on click.
  spawnPen(random(width), random(height));
}

function draw() {
  pens = pens.filter((p) => p.alive);
  for (let p of pens) {
    p.show();
  }

  // Keep dropping random seeds on their own, same as the automatic
  // noise-walk in the site's other hero sketches.
  if (frameCount % 90 === 0) {
    spawnPen(random(width), random(height));
  }

  // A pen follows the cursor continuously, mouse held or not.
  if (frameCount % 4 === 0 && (mouseX !== pmouseX || mouseY !== pmouseY)) {
    spawnPen(mouseX, mouseY);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseDragged() {
  if (frameCount % 2 === 0) spawnPen(mouseX, mouseY);
}

function mousePressed() {
  speed = 3; // held down = fast-forwarded further, until release
  spawnPen(mouseX, mouseY);
}

function mouseReleased() {
  speed = 1;
}

function spawnPen(x, y) {
  cindex = (cindex + 1) % colors[pindex].length;
  let pcolor = color(colors[pindex][cindex]);
  pcolor.setAlpha(100);
  pens.push(new Pen(createVector(x, y), pcolor));
}

function keyPressed() {
  if (key === "r" || key === "R") {
    pens = [];
    background(20, 20, 20);
    noiseSeed(random(1000));
    pindex = (pindex + 1) % colors.length;
    spawnPen(random(width), random(height));
  }
  if (key === "s" || key === "S") {
    saveCanvas("sketch8", "png");
  }
}

class Pen {
  constructor(pos, col) {
    this.pos = pos;
    this.lpos = createVector(pos.x, pos.y);
    this.col = col;
    this.counter = 0;
    this.alive = true;
  }

  show() {
    this.counter += 10;
    if (this.counter > 150) this.alive = false;
    const n = floor(steps * speed);
    for (let i = 0; i < n; i++) {
      this.pos.x += (0.5 - noise(this.pos.y / div)) * amp;
      this.pos.y += (0.5 - noise(this.pos.x / div)) * amp;
      stroke(this.col);
      strokeWeight(4);
      line(this.lpos.x, this.lpos.y, this.pos.x, this.pos.y);
      this.lpos.x = this.pos.x;
      this.lpos.y = this.pos.y;
    }
  }
}
