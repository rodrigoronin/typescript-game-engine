type InputAction = "NORMAL_ATTACK" | "DASH" | "INTERACT";

export class Vector2 {
  public x: number = 0;
  public y: number = 0;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

type ButtonStateMap = Record<string, boolean>;

export class InputSystem {
  private _gamepadButtons: ButtonStateMap = {};
  private _buttons: ButtonStateMap = {};
  private _prevButtons: ButtonStateMap = {};
  private static _instance: InputSystem;
  private _movement: Vector2 = { x: 0, y: 0 };
  private _keyboardMovement: Vector2 = { x: 0, y: 0 };
  private _gamepadMovement: Vector2 = { x: 0, y: 0 };
  private readonly DEAD_ZONE: number = 0.18;
  private gamepadActive: boolean = false;

  private constructor() {
    this.setupKeyboard();
  }

  public static get() {
    if (!this._instance) this._instance = new InputSystem();
    return this._instance;
  }

  private setupKeyboard() {
    const map: Record<string, Vector2> = {
      KeyW: new Vector2(0, -1),
      KeyA: new Vector2(-1, 0),
      KeyS: new Vector2(0, 1),
      KeyD: new Vector2(1, 0),
    };

    const keyToAction: Record<string, InputAction> = {
      KeyJ: "NORMAL_ATTACK",
      Space: "DASH",
      KeyF: "INTERACT",
    };
  }
}
