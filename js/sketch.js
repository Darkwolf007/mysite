let simplex, t;

function setup() {
  var clientHeight = document.getElementById('home').clientHeight;
	var clientWidth = document.getElementById('home').clientWidth;

	var cnv = createCanvas(clientWidth, clientHeight);
  cnv.parent("home");
  background(0);

  pixelDensity(1);
  noSmooth();
  simplex = new SimplexNoise();
  t = 0;
}

function draw() {
  background(220);

  loadPixels();
  for (let y = 0; y < height / 2; y++) {
    for (let x = 0; x < width / 2; x++) {
      let n = simplex.noise3D(x / 300, y / 300, t / 40) * 0.5 + 0.5;

      let th = 8.0 * n * TWO_PI + t * 1.0 / 2;
      let r = 0.5 + 0.5 * cos(th);
      let g = 0.5 + 0.5 * cos(th - PI / 3);
      let b = 0.5 + 0.5 * cos(th - (PI * 2) / 3);
      pixels[(x + y * width) * 4 + 0] = r * 255;
      pixels[(x + y * width) * 4 + 1] = g * 255;
      pixels[(x + y * width) * 4 + 2] = b * 255;
      pixels[(x + y * width) * 4 + 3] = 255;
    }
  }
  updatePixels();
  let g = get(0, 0, width / 2, height / 2);
  image(g, 0, 0, width, height);
  t++;
}

function getColorByTheta(theta, time) {
  let th = 8.0 * theta + time * 2.0;
  let r = 0.5 + 0.5 * cos(th);
  g = 0.5 + 0.5 * cos(th - PI / 3);
  b = 0.5 + 0.5 * cos(th - (PI * 2) / 3);
  return color(r * 255, g * 255, b * 255);
}