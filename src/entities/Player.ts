import { IDirections } from "../input/InputManager";

interface IPlayer {
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
  speed: number;
  color: string;
  update?(deltaTime: number, directions: IDirections): void;
}

export class Player {
  position!: { x: number; y: number };
  size!: {
    width: number;
    height: number;
  };
  speed!: number;
  color!: string;

  constructor(playerData: IPlayer) {
    Object.assign(this, playerData);
  }

  update(deltaTime: number, directions: IDirections) {
    let moveX: number = 0;
    let moveY: number = 0;

    if (directions.left === true) moveX -= 1;
    if (directions.right === true) moveX += 1;
    if (directions.up === true) moveY -= 1;
    if (directions.down === true) moveY += 1;

    // Normalize movement vector when moving diagonally
    const magnitude = Math.sqrt(moveX * moveX + moveY * moveY);
    if (magnitude > 0) {
      moveX /= magnitude;
      moveY /= magnitude;
    }

    this.position.x += moveX * this.speed * (deltaTime / 1000);
    this.position.y += moveY * this.speed * (deltaTime / 1000);
  }
}
