import { Application, Assets, Container } from "pixi.js";
import texture from "./Game/Assets/wizard.png";
import { Player } from "./Game/Player";

import "./style..css";

const app: Application = new Application();
await app.init({
  width: innerWidth,
  height: innerHeight,
  background: "#3d3d3d",
});

const world: Container = new Container();

const playerTexture = await Assets.load(texture);

const player: Player = new Player(playerTexture);

world.addChild(player.container);

world.scale.set(2);

app.stage.addChild(world);
app.stage.scale.set(2);

app.ticker.add((ticker) => {
  const dt = ticker.deltaMS / 1000;
});

document.body.appendChild(app.canvas);
