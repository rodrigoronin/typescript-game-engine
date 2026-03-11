import { Application, Assets, Container } from "pixi.js";
import { Player } from "./Game/Player";
import { NPC } from "./Game/NPC";

import "./style..css";

import playerImg from "./Game/Assets/wizard.png";
import vaatiImg from "./Game/Assets/Vaati.png";

const app: Application = new Application();
await app.init({
  width: innerWidth,
  height: innerHeight,
  background: "#3d3d3d",
});

const world: Container = new Container();

const textures = await Assets.load([playerImg, vaatiImg]);
const [playerTexture, vaatiTexture] = Object.values(textures);

const player: Player = new Player(playerTexture);
player.container.position.set(100);

const vaati: NPC = new NPC(vaatiTexture);
vaati.container.position.x = 200;
vaati.container.position.y = 100;

world.addChild(player.container);
world.addChild(vaati.container);

world.scale.set(3);

app.stage.addChild(world);

app.ticker.add((ticker) => {
  const dt = ticker.deltaMS / 1000;
});

document.body.appendChild(app.canvas);
