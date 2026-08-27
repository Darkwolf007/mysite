// ============================================================
// CONTRAST FUR FLOW
// Single line per grid cell
// Faster animation
// Smooth mouse brushing
// Strong contrasting Perlin gradient
// ============================================================


// ============================================================
// COLOR PALETTES
// ============================================================
const COLOR_PALETTES = [

  // 0 — PETROL → SAGE → GOLD → CORAL → ELECTRIC CYAN
  [
    "#35545B",
    "#718C72",
    "#C39A52",
    "#C9675B",
    "#00CFE8"
  ],

  // 1 — BLUE → MAUVE → TERRACOTTA → GOLD → ACID GREEN
  [
    "#405B78",
    "#80647D",
    "#B6654D",
    "#D2A84F",
    "#9EEA32"
  ],

  // 2 — TEAL → VIOLET → ROSE → AMBER → ELECTRIC BLUE
  [
    "#397A78",
    "#6F5B8C",
    "#B85E73",
    "#D79A43",
    "#168DFF"
  ],

  // 3 — INDIGO → TURQUOISE → SAND → ORANGE → HOT PINK
  [
    "#434C7A",
    "#438E89",
    "#BBA875",
    "#D77842",
    "#FF3D8D"
  ],

  // 4 — FOREST → BLUE → LAVENDER → COPPER → YELLOW
  [
    "#476B58",
    "#466E91",
    "#8B75A0",
    "#B96B4E",
    "#FFD633"
  ],

  // 5 — SLATE → EMERALD → OCHRE → MAGENTA → CYAN
  [
    "#4C5863",
    "#43816D",
    "#B68A43",
    "#B94E82",
    "#00D8D8"
  ],

  // 6 — NAVY → JADE → ROSE → ORANGE → VIOLET
  [
    "#394C69",
    "#489078",
    "#B76679",
    "#D97B3F",
    "#A855F7"
  ]
];

const ACTIVE_PALETTE = 0;
let activePalette = [];


// ============================================================
// GRID
// ============================================================

let gridStep = 12;

let cols = 0;
let rows = 0;

let bendAmount = [];
let bendAngle = [];


// ============================================================
// FLOW FIELD
// ============================================================

let flowZ = 0;

let flowInc = 0.008;

// faster ambient animation
let flowSpeed = 0.0012;


// ============================================================
// COLOR FIELD
// ============================================================

let colorZ = 500;

// lower = bigger gradient patches
let colorInc = 0.009;

// animated color drift
let colorSpeed = 0.001;


// ============================================================
// BRUSH
// ============================================================

const brushRadius = 240;

const brushPower = 1.0;

// closer to 1 = slower spring-back
const brushReturn = 0.982;


// ============================================================
// SMOOTH MOUSE
// ============================================================

let smoothMouseX = 0;
let smoothMouseY = 0;

let previousSmoothX = 0;
let previousSmoothY = 0;

let smoothDragHeading = 0;

// 0 → 1
// lets press/release fade naturally
let brushActivity = 0;


// ============================================================
// SETUP
// ============================================================

function setup() {

  const canvas = createCanvas(
    windowWidth,
    windowHeight
  );

  const holder =
    document.getElementById("home-bg");

  if (holder) {
    canvas.parent("home-bg");
  }

  pixelDensity(1);

  frameRate(30);

  buildPalette();

  buildGrid();


  smoothMouseX =
    width * 0.5;

  smoothMouseY =
    height * 0.5;

  previousSmoothX =
    smoothMouseX;

  previousSmoothY =
    smoothMouseY;


  background(
    10,
    12,
    16
  );
}


// ============================================================
// BUILD PALETTE
// ============================================================

function buildPalette() {

  activePalette = [];

  const selected =
    COLOR_PALETTES[
      ACTIVE_PALETTE
    ];

  for (
    let i = 0;
    i < selected.length;
    i++
  ) {

    activePalette.push(
      color(
        selected[i]
      )
    );
  }
}


// ============================================================
// BUILD GRID
// ============================================================

function buildGrid() {

  cols =
    ceil(
      width / gridStep
    ) + 1;

  rows =
    ceil(
      height / gridStep
    ) + 1;


  bendAmount = [];

  bendAngle = [];


  const totalCells =
    cols * rows;


  for (
    let i = 0;
    i < totalCells;
    i++
  ) {

    bendAmount[i] = 0;

    bendAngle[i] = 0;
  }
}


// ============================================================
// DRAW
// ============================================================

function draw() {

  background(
    10,
    12,
    16
  );


  // ==========================================================
  // SMOOTH MOUSE POSITION
  // ==========================================================

  previousSmoothX =
    smoothMouseX;

  previousSmoothY =
    smoothMouseY;


  smoothMouseX =
    lerp(
      smoothMouseX,
      mouseX,
      0.09
    );


  smoothMouseY =
    lerp(
      smoothMouseY,
      mouseY,
      0.09
    );


  // ==========================================================
  // SMOOTH DRAG VELOCITY
  // ==========================================================

  const dragX =
    smoothMouseX -
    previousSmoothX;


  const dragY =
    smoothMouseY -
    previousSmoothY;


  const dragMagnitude =
    sqrt(
      dragX * dragX +
      dragY * dragY
    );


  /*const dragging =
    mouseIsPressed &&
    dragMagnitude > 0.04;*/

  const dragging =
    dragMagnitude > 0.04;


  // ==========================================================
  // SMOOTH DRAG HEADING
  // ==========================================================

  if (dragging) {

    const rawHeading =
      atan2(
        dragY,
        dragX
      );


    smoothDragHeading =
      lerpAngle(
        smoothDragHeading,
        rawHeading,
        0.10
      );


    // soft press-on
    brushActivity =
      lerp(
        brushActivity,
        1,
        0.08
      );

  } else {

    // soft release
    brushActivity =
      lerp(
        brushActivity,
        0,
        0.045
      );
  }


  const radiusSquared =
    brushRadius *
    brushRadius;


  // ==========================================================
  // FIELD
  // ==========================================================

  let yoff = 0;


  for (
    let y = 0;
    y < rows;
    y++
  ) {

    let xoff = 0;


    for (
      let x = 0;
      x < cols;
      x++
    ) {

      const index =
        x +
        y * cols;


      const px =
        x * gridStep;


      const py =
        y * gridStep;


      // ======================================================
      // FLOW FIELD
      // ======================================================

      const flowNoise =
        noise(
          xoff,
          yoff,
          flowZ
        );


      const baseHeading =
        flowNoise *
        TWO_PI *
        2.0;


      const baseVector =
        p5.Vector.fromAngle(
          baseHeading
        );


      // ======================================================
      // SMOOTH BRUSH INTERACTION
      // ======================================================

      if (
        brushActivity >
        0.001
      ) {

        const dx =
          px -
          smoothMouseX;


        const dy =
          py -
          smoothMouseY;


        const dSquared =
          dx * dx +
          dy * dy;


        if (
          dSquared <
          radiusSquared
        ) {

          const d =
            sqrt(
              dSquared
            );


          let influence =
            1 -
            d / brushRadius;


          // smoothstep radial falloff
          influence =
            influence *
            influence *
            (
              3 -
              2 * influence
            );


          // eased mouse press/release
          influence *=
            brushPower *
            brushActivity;


          // smoothly rotate brush direction
          bendAngle[index] =
            lerpAngle(
              bendAngle[index],
              smoothDragHeading,
              0.09
            );


          // smoothly grow local influence
          const targetBend =
            max(
              bendAmount[index],
              influence
            );


          bendAmount[index] =
            lerp(
              bendAmount[index],
              targetBend,
              0.20
            );
        }
      }


      // ======================================================
      // BRUSHED VECTOR
      // ======================================================

      let finalVector =
        baseVector.copy();


      if (
        bendAmount[index] >
        0.001
      ) {

        const brushVector =
          p5.Vector.fromAngle(
            bendAngle[index]
          );


        finalVector =
          p5.Vector.lerp(
            baseVector,
            brushVector,
            bendAmount[index]
          );


        if (
          finalVector.magSq() >
          0.0001
        ) {

          finalVector.normalize();
        }


        // slow spring-back
        bendAmount[index] *=
          brushReturn;
      }


      const finalHeading =
        finalVector.heading();


      // ======================================================
      // COLOR PERLIN FIELD
      // ======================================================

      const colorNoiseValue =
        noise(
          x * colorInc,
          y * colorInc,
          colorZ
        );


      let colorValue =
        map(
          colorNoiseValue,
          0.28,
          0.72,
          0,
          1
        );


      colorValue =
        constrain(
          colorValue,
          0,
          1
        );


      // smooth contrast curve
      colorValue =
        colorValue *
        colorValue *
        (
          3 -
          2 * colorValue
        );


      const strandColor =
        getGradientColor(
          colorValue
        );


      // ======================================================
      // SINGLE STRAND
      // ======================================================

      const interaction =
        bendAmount[index];


      const strandSize =
        gridStep *
        (
          0.95 +
          interaction *
          0.55
        );


      const cosHeading =
        cos(
          finalHeading
        );


      const sinHeading =
        sin(
          finalHeading
        );


      const backSize =
        strandSize *
        0.42;


      const frontSize =
        strandSize *
        0.58;


      const x1 =
        px -
        cosHeading *
        backSize;


      const y1 =
        py -
        sinHeading *
        backSize;


      const x2 =
        px +
        cosHeading *
        frontSize;


      const y2 =
        py +
        sinHeading *
        frontSize;


      // ======================================================
      // DRAW STRAND
      // ======================================================

      stroke(
        red(strandColor),
        green(strandColor),
        blue(strandColor),
        185
      );


      strokeWeight(
        0.72 +
        interaction *
        0.32
      );


      line(
        x1,
        y1,
        x2,
        y2
      );


      xoff +=
        flowInc;
    }


    yoff +=
      flowInc;
  }


  // ==========================================================
  // ANIMATION
  // ==========================================================

  flowZ +=
    flowSpeed;


  colorZ +=
    colorSpeed;
}


// ============================================================
// GRADIENT
// ============================================================

function getGradientColor(t) {

  t =
    constrain(
      t,
      0,
      1
    );


  const lastIndex =
    activePalette.length -
    1;


  const palettePosition =
    t *
    lastIndex;


  const indexA =
    constrain(
      floor(
        palettePosition
      ),
      0,
      lastIndex
    );


  const indexB =
    min(
      indexA + 1,
      lastIndex
    );


  let blendAmount =
    palettePosition -
    indexA;


  blendAmount =
    blendAmount *
    blendAmount *
    (
      3 -
      2 *
      blendAmount
    );


  return lerpColor(
    activePalette[indexA],
    activePalette[indexB],
    blendAmount
  );
}


// ============================================================
// SMOOTH ANGLE INTERPOLATION
// ============================================================

function lerpAngle(
  angleA,
  angleB,
  amount
) {

  const angleDifference =
    atan2(
      sin(
        angleB -
        angleA
      ),
      cos(
        angleB -
        angleA
      )
    );


  return (
    angleA +
    angleDifference *
    amount
  );
}


// ============================================================
// RESIZE
// ============================================================

function windowResized() {

  resizeCanvas(
    windowWidth,
    windowHeight
  );


  buildGrid();


  smoothMouseX =
    mouseX;

  smoothMouseY =
    mouseY;


  background(
    10,
    12,
    16
  );
}
