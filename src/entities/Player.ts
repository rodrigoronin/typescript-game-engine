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

  getBounds() {
    const top: number = this.position.y;
    const left: number = this.position.x;
    const right: number = this.position.x + this.size.width;
    const bottom: number = this.position.y + this.size.height;

    return {
      top,
      left,
      bottom,
      right,
    };
  }

  update(deltaTime: number, directions: IDirections) {
    let moveX: number = 0;
    let moveY: number = 0;

    if (directions.left) moveX -= 1;
    if (directions.right) moveX += 1;
    if (directions.up) moveY -= 1;
    if (directions.down) moveY += 1;

    // Normalize movement vector when moving diagonally
    const magnitude = Math.hypot(moveX, moveY);
    if (magnitude !== 0) {
      moveX /= magnitude;
      moveY /= magnitude;
    }

    this.position.x += moveX * this.speed * (deltaTime / 1000);
    this.position.y += moveY * this.speed * (deltaTime / 1000);
  }
}
