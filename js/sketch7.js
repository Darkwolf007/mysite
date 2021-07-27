let font;
let points = [];
let vehicles = [];
let targets = [];
let vehicle;
let changeTarget;
let textsize1, textsize2;
let Text1, Text2;
let textinput1, textinput2;

function preload() {
  font = loadFont('fonts/Helvetica.ttf');
}

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent("home-bg");
  colorMode(HSB);
  textinput1 = createInput('Rainbow');
  textinput2 = createInput('Unicorn');
  textinput1.position(0, height);
  textinput2.position(0, height + 25);
  changeTarget = false;
  vehicleText(); // Create the vehicles based on text
  targetText(); // Crate the targets array for the second text
  showText(); // Just a function for the Instructions.
  // Generate new vehicles
  for (let i = 0; i < points.length; i++) {
    vehicles.push(new Vehicle(createVector(points[i].x, points[i].y)));
  }
  setInterval(changeText, 6500);
  textinput2.input(targetText);
  textinput1.input(vehicleText);
}

function draw() {
  background(0);
  // Make sure the text is not empty!
  if (Text2.length < 1) {
    Text2 = 'Unicorn';
  }
  if (Text1.length < 1) {
    Text1 = 'Rainbow';
  }

  // My best solution to try shrinking the text som it always fits
  if (points.length < targets.length) {
    textsize2 -= 10;
    targets = font.textToPoints(Text2, 50, 300, textsize2);
  }
  if (targets[targets.length - 1].x > width) {
    textsize2 -= 10;
    targets = font.textToPoints(Text2, 10, 300, textsize2);
  }
  if (points[points.length - 1].x > width) {
    textsize1 -= 10;
    points = font.textToPoints(Text1, 10, 300, textsize1);
    vehicles = [];
    for (let i = 0; i < points.length; i++) {
      vehicles.push(new Vehicle(createVector(points[i].x, points[i].y)));
    }
  }

  for (let i = 0; i < vehicles.length; i++) {
    let vehicle = vehicles[i];
    vehicle.show();
    vehicle.move();
    if (!changeTarget) {
      target = createVector(points[i].x, points[i].y);
    } else if (changeTarget) {
      j = constrain(i, 0, targets.length - 1);
      target = createVector(targets[j].x, targets[j].y);
    }

    vehicle.applyBehavior(target);
  }
}

function changeText() {
  changeTarget = !changeTarget;
}

function showText() {
  createP('<=  Text1').position(180, 387);
  createP('<=  Text2').position(180, 413);
  createP("Text1 transforms into Text2. So if Text1 characters are less, Text2 will aslo be displayed small as there won't be enough vehicles to display Text2").position(0, 440);
}

function vehicleText() {
  textsize1 = 300;
  textsize2 = 400;
  Text1 = textinput1.value();
  points = font.textToPoints(Text1, 50, 300, textsize1);
  vehicles = [];
  for (let i = 0; i < points.length; i++) {
    vehicles.push(new Vehicle(createVector(points[i].x, points[i].y)));
  }
}

function targetText() {
  textsize2 = 300;
  textsize1 = 300;
  Text2 = textinput2.value();
  targets = font.textToPoints(Text2, 50, 300, textsize2);
}