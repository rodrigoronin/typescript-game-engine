import { Sprite } from "pixi.js";
import { IDirections } from "../input/InputManager";

export class Player {
  sprite;
  velocity = { x: 0, y: 0 };
  speed = 150;

  constructor(sprite: Sprite) {
    this.sprite = sprite
    this.sprite.anchor.set(0.5, 0.5);
  }

  update(deltaTime: number) {
    this.sprite.x += this.velocity.x * this.speed * deltaTime;
    this.sprite.y += this.velocity.y * this.speed * deltaTime;
  }
}
