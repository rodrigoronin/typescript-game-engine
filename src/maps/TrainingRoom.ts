import { ICamera } from "../core/Camera";
import { Prop } from "../entities/Prop";
import { MAP_GRID } from "./TrainingRoomMap";

export const props: Prop[] = [];

const CELL_SIZE: number = 32;

export function buildPropsFromGrid(): void {
  for (let row = 0; row < MAP_GRID.length; row++) {
    for (let col = 0; col < MAP_GRID[row].length; col++) {
      const posX = col * CELL_SIZE;
      const posY = row * CELL_SIZE;

      if (MAP_GRID[row][col] === 1) {
        props.push(
          new Prop({
            position: { x: posX, y: posY },
            size: { w: 32, h: 32 },
            isSolid: true,
            color: "#FFF",
          }),
        );
      } else if (MAP_GRID[row][col] === 2) {
        props.push(
          new Prop({
            position: { x: posX, y: posY },
            size: { w: 32, h: 32 },
            isSolid: true,
            color: "red",
          }),
        );
      }
    }
  }
}

buildPropsFromGrid();

export function renderGrid(
  ctx: CanvasRenderingContext2D,
  camera: ICamera,
): void {
  const cameraX = camera.position.x;
  const cameraY = camera.position.y;

  // always do two nested loops to cover rows and columns
  // then calculate x and y based on the current row and column
  for (let row = 0; row < MAP_GRID.length; row++) {
    for (let col = 0; col < MAP_GRID[row].length; col++) {
      const x = col * CELL_SIZE;
      const y = row * CELL_SIZE;

      if (MAP_GRID[row][col] !== 0) continue;

      ctx.fillStyle = "#0B1220";
      ctx.fillRect(x - cameraX, y - cameraY, CELL_SIZE, CELL_SIZE);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      ctx.lineWidth = 0.5;
      ctx.strokeRect(x - cameraX, y - cameraY, CELL_SIZE, CELL_SIZE);
    }
  }
}
