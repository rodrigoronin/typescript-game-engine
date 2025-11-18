import { Application, Assets, Container, Rectangle, Sprite, Texture } from 'pixi.js';

import "./index.css";

import william from './assets/william_idle.png';

// Pixi.js always need an IIFE to work properly
(async () => {
  const app: Application = new Application();

  // Init the app vefore everything
  await app.init({
    background: "#0B1220",
    resizeTo: window,
  });

  document.body.appendChild(app.canvas);

  const container: Container = new Container();
  container.width = app.screen.width;
  container.height = app.screen.height;

  app.stage.addChild(container);

  const player = await loadPlayer();

  container.addChild(player);

  player.scale.set(2);
  player.position.set(app.screen.width / 2, app.screen.height / 2);

  // This is the render loop (I guess)
  app.ticker.add((time) => {
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
      0, // fixed 0 because the actual placeholder sprite is one row
      frameWidth,
      frameHeight
    )
  });

  const player: Sprite = new Sprite(frame);
  player.anchor.set(0.5);

  return player;
}