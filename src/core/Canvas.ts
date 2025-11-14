const displayCanvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
const displayCtx: CanvasRenderingContext2D = displayCanvas.getContext(
  "2d"
) as CanvasRenderingContext2D;

const GAME_WIDTH: number = 640;
const GAME_HEIGHT: number = 360;

// inner canvas (logic resolution)
const gameCanvas: HTMLCanvasElement = document.createElement("canvas");
const gameCtx: CanvasRenderingContext2D = gameCanvas.getContext("2d") as CanvasRenderingContext2D;

gameCanvas.width = GAME_WIDTH;
gameCanvas.height = GAME_HEIGHT;

displayCanvas.style.backgroundColor = "#302F2F";

// --- RESIZE FUNCTION ---
// Adjusts the real size of the outer canvas to fill the entire screen
function resizeDisplayCanvas() {
  displayCanvas.width = window.innerWidth;
  displayCanvas.height = window.innerHeight;
}

// We call at the start and whenever the screen changes size
resizeDisplayCanvas();
window.addEventListener("resize", resizeDisplayCanvas);

// --- EXTERNAL RENDER (copies gameCanvas to displayCanvas, scalling) ---
function renderToDisplay() {
  const DISPLAY_WIDTH: number = displayCanvas.width;
  const DISPLAY_HEIGHT: number = displayCanvas.height;

  // Full scale (pixel perfect)
  const scale: number = Math.floor(
    Math.min(DISPLAY_WIDTH / GAME_WIDTH, DISPLAY_HEIGHT / GAME_HEIGHT)
  );

  const scaledW = GAME_WIDTH * scale;
  const scaledH = GAME_HEIGHT * scale;

  // centralizes
  const offsetX: number = (DISPLAY_WIDTH - scaledW) / 2;
  const offsetY: number = (DISPLAY_HEIGHT - scaledH) / 2;

  displayCtx.clearRect(0, 0, DISPLAY_WIDTH, DISPLAY_HEIGHT);

  // disables blur when upscaling
  displayCtx.imageSmoothingEnabled = false;
  gameCtx.imageSmoothingEnabled = false;

  displayCtx.drawImage(
    gameCanvas,
    0,
    0,
    GAME_WIDTH,
    GAME_HEIGHT,
    offsetX,
    offsetY,
    scaledW,
    scaledH
  );
}

export { renderToDisplay, displayCanvas, displayCtx, gameCanvas, gameCtx, GAME_WIDTH, GAME_HEIGHT };
