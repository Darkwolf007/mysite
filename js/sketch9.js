// Perlin-noise flow field of short "hair" strands. Each strand's resting
// angle comes from noise (as in the original sketch), but a click-and-drag
// also pushes strands near the cursor toward the drag direction — like
// brushing fur — and they spring back to their resting angle over time.
// Colors are the same palette arrays as sketch8.js instead of the
// original's HSB rainbow.
let colors = [];
colors.push(["#600001", "#a8322f", "#d06b20", "#e1972f", "#013c90", "#3d2842", "#a40211", "#1587b3", "#51cee7", "#f889b9", "#ee390c", "#2c0505"]);
colors.push(["#013f61", "#07606a", "#0f7b9c", "#366a1c", "#eb7300", "#142027", "#e8eddd"]);
colors.push(["#0c0c49", "#243487", "#6f90c9", "#75a8f5", "#CEC86B", "#815138"]);
colors.push(["#080d0a", "#515e57", "#f7de78", "#eecb43", "#ee970e", "#a98715", "#d4580c"]);
colors.push(["#fa5e04", "#db3004", "#ac4d1d", "#634740", "#5b1602"]);
let pindex = 0;
let coff = 0; // slowly drifts which color in the palette each strand picks, for a bit of life
let paletteColors = []; // colors[pindex] pre-built into p5.Color objects (with alpha) once, not per-cell every frame

let scale = 20;
let cols, rows;
let flowFields = [];
let bendAmount = []; // 0..1 how "brushed" each strand currently is
let bendAngle = []; // the direction it's currently brushed toward
let zoff = 0;
let inc = 0.01;
const brushRadius = 160;

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("home-bg");
  frameRate(30);
  pindex = floor(random(colors.length));
  buildPaletteColors();
  buildGrid();
  background(20, 20, 20);
}

// ceil()+1 (rather than floor()) so the grid always overshoots the canvas
// a little on every side — otherwise whenever width/height isn't an exact
// multiple of scale, the last row/column of strands sits just past the
// edge and never gets drawn, leaving a bare strip along that edge.
function buildGrid() {
  cols = ceil(width / scale) + 1;
  rows = ceil(height / scale) + 1;
  flowFields = [];
  bendAmount = [];
  bendAngle = [];
  for (let i = 0; i < cols * rows; i++) {
    flowFields[i] = createVector(0, 0);
    bendAmount[i] = 0;
    bendAngle[i] = 0;
  }
}

function buildPaletteColors() {
  paletteColors = colors[pindex].map((hex) => {
    const c = color(hex);
    c.setAlpha(120);
    return c;
  });
}

function draw() {
  // Low-alpha repaint instead of a hard clear, so strands leave a soft
  // fading trail rather than popping in and out every frame.
  noStroke();
  fill(20, 20, 20, 10);
  rect(0, 0, width, height);

  const dragging = mouseIsPressed && (mouseX !== pmouseX || mouseY !== pmouseY);
  const dragVec = dragging ? createVector(mouseX - pmouseX, mouseY - pmouseY) : null;
  const dragHeading = dragVec ? dragVec.heading() : 0;

  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      const index = x + y * cols;
      const px = x * scale;
      const py = y * scale;

      const angle = noise(xoff, yoff, zoff) * TWO_PI * 8;
      const base = p5.Vector.fromAngle(angle);
      base.setMag(1);
      flowFields[index] = base;

      if (dragging) {
        const d = dist(px, py, mouseX, mouseY);
        if (d < brushRadius) {
          bendAngle[index] = dragHeading;
          bendAmount[index] = max(bendAmount[index], 1 - d / brushRadius);
        }
      }

      let v = base;
      if (bendAmount[index] > 0.01) {
        const brushed = p5.Vector.fromAngle(bendAngle[index]);
        v = p5.Vector.lerp(base, brushed, bendAmount[index]);
        v.normalize();
        bendAmount[index] *= 0.94; // springs back toward the noise field
      }

      const hi = floor((map(v.heading(), -PI, PI, 0, paletteColors.length) + coff) % paletteColors.length);
      stroke(paletteColors[(hi + paletteColors.length) % paletteColors.length]);

      push();
      translate(px, py);
      rotate(v.heading());
      line(0, 0, scale, 0);
      pop();

      xoff += inc;
    }
    yoff += inc;
  }

  zoff += 0.002 + map(mouseX, 0, width, 0.001, 0.01);
  coff += 0.01;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  buildGrid();
  background(20, 20, 20);
}
