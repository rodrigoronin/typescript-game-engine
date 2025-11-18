import { Application, Assets, Container, Rectangle, Sprite, Texture } from "pixi.js";
import { Camera } from "./Camera";

import william from "../assets/william_idle.png";
import { getDirections } from "../input/InputManager";
import { Player } from "../entities/Player";

export class Game {
  app: Application;
  camera!: Camera;
  worldLayer!: Container;
  entityLayer!: Container;
  FXLayer!: Container;
  UILayer!: Container;
  player!: Player;

  constructor(app: Application) {
    this.app = app;

    this.initLayers();
    this.initPlayer();
    this.initCamera();
    this.initWorld();
  }

  async init() {
    await this.initPlayer();
    this.initCamera();
  }

  initLayers() {
    this.worldLayer = new Container();
    this.entityLayer = new Container();
    this.FXLayer = new Container();
    this.UILayer = new Container();

    this.app.stage.addChild(this.worldLayer, this.entityLayer, this.FXLayer, this.UILayer);
  }

  async initPlayer() {
    const texture = await Assets.load(william);
    const frame0: Texture = new Texture({
      source: texture,
      frame: new Rectangle(0, 0, 64, 64)
    });
    const playerSprite: Sprite = new Sprite(frame0);

    this.player = new Player(playerSprite);
    this.player.sprite.pivot.set(0.5);

    this.player.sprite.x = 300;
    this.player.sprite.y = 300;

    this.entityLayer.addChild(this.player.sprite);
  }

  initCamera() {
    this.camera = new Camera({
      position: { x: 0, y: 0 },
      size: {
        width: this.app.screen.width,
        height: this.app.screen.height,
      },
      lerpSpeed: 0.08,
    });
  }

  initWorld() {

  }

  readInputs(dt: number) {
    const dir = getDirections();

    let moveX = 0;
    let moveY = 0;

    if (dir.left) moveX -= 1;
    if (dir.right) moveX += 1;
    if (dir.up) moveY -= 1;
    if (dir.down) moveY += 1;

    const magnitude = Math.hypot(moveX, moveY);

    if (magnitude !== 0) {
      moveX /= magnitude;
      moveY /= magnitude;
    }

    this.player.velocity.x = moveX;
    this.player.velocity.y = moveY;
  }

  readPlayer(deltaTime: number) {
    this.player.update(deltaTime);
  }

  update(deltaMS: number) {
    if (!this.player) return;

    const dt = deltaMS / 1000;

    this.readInputs(dt);
    this.readPlayer(dt);
    // this.readCamera(dt);
    // this.updateLayers();
  }
}
