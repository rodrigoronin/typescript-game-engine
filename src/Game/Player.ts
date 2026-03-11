import { Sprite, Texture, type PointData } from "pixi.js";
import { Entity } from "../Engine/Entity";
import { InputSystem } from "../Engine/Systems/InputSystem";

export class Player extends Entity {
  private _sprite: Sprite;
  // STATS AND ATTRIBUTES
  private _maxHealth: number = 40;
  private _maxSkillPoints: number = 20;
  private currentHealth: number = this._maxHealth;
  private currentSkillPoints: number = this._maxSkillPoints;
  private _speed: number = 100;
  // MOVEMENT
  private _input: InputSystem = InputSystem.get();

  constructor(texture: Texture) {
    super();

    this._sprite = new Sprite(texture);
    this._sprite.texture.source.scaleMode = "nearest";
    this._sprite.anchor.set(0.5);
    this.container.addChild(this._sprite);
  }

  update(_deltaTime: number): void {
    const deltaSec: number = _deltaTime / 1000;
    const move: PointData = this._input.getMovementVector();

    // Movement
    // future variables for collision calc later
    const futureX = this.container.x + move.x * this._speed * deltaSec;
    const futureY = this.container.y + move.y * this._speed * deltaSec;

    this.container.x = futureX;
    this.container.y = futureY;
  }
}
