export interface IDirections {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
}

const directions: IDirections = {
  up: false,
  down: false,
  left: false,
  right: false,
};

export function isMoving(): boolean {
  return directions.up || directions.down || directions.left || directions.right;
}

export function getDirections(): IDirections {
  return directions;
}

export function initInput() {
  window.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();

    switch (key) {
      case "ArrowUp":
      case "w":
        directions.up = true;
        break;
      case "ArrowDown":
      case "s":
        directions.down = true;
        break;
      case "ArrowLeft":
      case "a":
        directions.left = true;
        break;
      case "ArrowRight":
      case "d":
        directions.right = true;
        break;
      default:
        break;
    }
  });

  window.addEventListener("keyup", (e) => {
    const key = e.key.toLowerCase();

    switch (key) {
      case "ArrowUp":
      case "w":
        directions.up = false;
        break;
      case "ArrowDown":
      case "s":
        directions.down = false;
        break;
      case "ArrowLeft":
      case "a":
        directions.left = false;
        break;
      case "ArrowRight":
      case "d":
        directions.right = false;
        break;
      default:
        break;
    }
  });
}
