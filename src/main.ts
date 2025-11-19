import { Application, Assets, Container, Rectangle, Sprite, Texture } from 'pixi.js';

import "./index.css";

import william from './assets/william_idle.png';

// Pixi.js always need an IIFE to work properly with Vite
(async () => {
  const app: Application = new Application();

  // Init the app vefore everything
  await app.init({
    background: "#3bad1bff",
    width: 640,
    height: 360,
    resizeTo: window,
  });

  document.body.appendChild(app.canvas);

  // Set a container to hold the entities for now
  const container: Container = new Container();
  container.width = app.screen.width;
  container.height = app.screen.height;

  app.stage.addChild(container);

  const player = await loadPlayer();

  container.addChild(player);

  player.scale.set(2);
  container.position.set(app.screen.width / 2, app.screen.height / 2);

  // This is the render loop (I guess)
  app.ticker.add((time) => {
    updatePlayer(player, time.deltaTime);
  });
})();

async function loadPlayer() {
  const baseTexture = await Assets.load(william);
  baseTexture.source.scaleMode = 'nearest';
  baseTexture.source.style.magFilter = 'nearest';
  baseTexture.source.style.minFilter = 'nearest';

  const frameWidth = baseTexture.width / 3;
  const frameHeight = baseTexture.height;
  const frameIndex: number = 0;

  const frame: Texture = new Texture({
    source: baseTexture.source,
    frame: new Rectangle(
      frameWidth * frameIndex,
      0, // fixed 0 because the actual placeholder sprite is one row only
      frameWidth,
      frameHeight
    )
  });

  const player: Sprite = new Sprite(frame);
  player.anchor.set(0.5);
  player.speed = 3;

  return player;
}

function updatePlayer(player: Sprite, delta: number) {
  const speed: number = player.speed;

  let vx: number = 0;
  let vy: number = 0;

  if (keys.w) vy -= speed;
  if (keys.a) vx -= speed;
  if (keys.s) vy += speed;
  if (keys.d) vx += speed;

  // normalized diagonal with magnitude
  const magnitude: number = Math.hypot(vx, vy)
  if (magnitude > 0) {
    vx = (vx / magnitude) * speed;
    vy = (vy / magnitude) * speed;
  }

  player.x += vx * delta;
  player.y += vy * delta;
}

const keys: Record<string, boolean> = {
  w: false,
  a: false,
  s: false,
  d: false
}

// event listeners for inputs
window.addEventListener('keydown', (e) => {
  const input = e.key.toLowerCase();
  if (keys[input] !== undefined) keys[input] = true;
})
window.addEventListener('keyup', (e) => {
  const input = e.key.toLowerCase();
  if (keys[input] !== undefined) keys[input] = false;
});
