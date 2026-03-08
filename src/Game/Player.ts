import { Sprite, Texture } from "pixi.js";
import { Entity } from "../Engine/Entity";

export class Player extends Entity {
  private sprite: Sprite;
  private maxHealth: number = 40;
  private maxSkillPoints: number = 20;
  private currentHealth: number = this.maxHealth;
  private currentSkillPoints: number = this.maxSkillPoints;

  constructor(texture: Texture) {
    super();

    this.sprite = new Sprite(texture);
    this.sprite.texture.source.scaleMode = "nearest";
    this.sprite.anchor.set(0.5);
    this.container.addChild(this.sprite);
    this.sprite.position.set(100);
  }
}
