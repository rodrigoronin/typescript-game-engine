import { Application, Assets, Container, Rectangle, Sprite, Texture } from 'pixi.js';
import { StateManager, GameState } from './core/state/StateManage';

import './index.css';

import william from './assets/william_idle.png';
import { InputAction, InputManager } from './core/input/InputManager';

const state = new StateManager();
state.setState(GameState.GAME);

const speed = 3;
const input = new InputManager();

// Pixi.js always need an IIFE to work properly with Vite
(async () => {
  const app: Application = new Application();

  // Init the app vefore everything
  await app.init({
    background: '#3bad1bff',
    width: 640,
    height: 360,
    resizeTo: window,
  });

  document.body.appendChild(app.canvas);

  // Set a container to hold the entities for now
  const container: Container = new Container();

  app.stage.addChild(container);

  const player = await loadPlayer();

  container.addChild(player);

  player.scale.set(2);

  // This is the render loop (I guess)
  app.ticker.add((ticker) => {
    updatePlayer(player, ticker.deltaTime);
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
    ),
  });

  const player: Sprite = new Sprite(frame);
  player.anchor.set(0.5);

  return player;
}

function updatePlayer(player: Sprite, delta: number) {
  let vx: number = 0;
  let vy: number = 0;

  if (input.isPressed(InputAction.Up)) vy -= speed;
  if (input.isPressed(InputAction.Left)) vx -= speed;
  if (input.isPressed(InputAction.Down)) vy += speed;
  if (input.isPressed(InputAction.Right)) vx += speed;

  // normalized diagonal with magnitude
  const magnitude: number = Math.hypot(vx, vy);
  if (magnitude > 0) {
    vx = (vx / magnitude) * speed;
    vy = (vy / magnitude) * speed;
  }

  player.x += vx * delta;
  player.y += vy * delta;
}
