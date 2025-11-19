export enum InputAction {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right',
  Pause = 'pause',
}

export class InputManager {
  private keys: Record<InputAction, boolean> = {
    [InputAction.Up]: false,
    [InputAction.Down]: false,
    [InputAction.Left]: false,
    [InputAction.Right]: false,
    [InputAction.Pause]: false,
  };

  private keyMap: Record<string, InputAction> = {
    w: InputAction.Up,
    s: InputAction.Down,
    a: InputAction.Left,
    d: InputAction.Right,
    escape: InputAction.Pause,
  };

  constructor() {
    window.addEventListener('keydown', (e) => this.onKeyDown(e));
    window.addEventListener('keyup', (e) => this.onKeyUp(e));
  }

  private onKeyDown(event: KeyboardEvent): void {
    const key = event.key.toLowerCase();
    const mapped = this.keyMap[key];
    if (mapped) this.keys[mapped] = true;
  }

  private onKeyUp(event: KeyboardEvent): void {
    const key = event.key.toLowerCase();
    const mapped = this.keyMap[key];
    if (mapped) this.keys[mapped] = false;
  }

  isPressed(action: InputAction): boolean {
    return this.keys[action];
  }
}
