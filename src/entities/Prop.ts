import { ICamera } from "../core/Camera";

interface IProp {
  position: { x: number; y: number };
  size: { w: number; h: number };
  isSolid: boolean;
  color: string;
}
export class Prop {
  position!: { x: number; y: number };
  size!: { w: number; h: number };
  isSolid!: boolean;
  color!: string;

  constructor(propData: IProp) {
    this.position = propData.position;
    this.size = propData.size;
    this.isSolid = propData.isSolid;
    this.color = propData.color;
  }

  render(ctx: CanvasRenderingContext2D, camera: ICamera) {
    ctx.fillStyle = this.color;
    ctx.fillRect(
      this.position.x - camera.position.x,
      this.position.y - camera.position.y,
      this.size.w,
      this.size.h,
    );
  }
}
