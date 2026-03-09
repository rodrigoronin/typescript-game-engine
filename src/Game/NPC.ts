import { Sprite, type Texture } from "pixi.js";
import { Entity } from "../Engine/Entity";

export class NPC extends Entity {
  private sprite: Sprite;

  constructor(texture: Texture) {
    super();

    this.sprite = new Sprite(texture);
    this.sprite.texture.source.scaleMode = "nearest";
    this.sprite.anchor.set(0.5);

    this.container.addChild(this.sprite);
  }
}
