import { Point } from "pixi.js";

type InputAction = "NORMAL_ATTACK" | "DASH" | "INTERACT";

type ButtonStateMap = Record<string, boolean>;

export class InputSystem {
  private _gamepadButtons: ButtonStateMap = {};
  private _buttons: ButtonStateMap = {};
  private _prevButtons: ButtonStateMap = {};
  private static _instance: InputSystem;
  private _movement: Point = new Point(0, 0);
  private _keyboardMovement: Point = new Point(0, 0);
  private _gamepadMovement: Point = new Point(0, 0);
  private readonly DEAD_ZONE: number = 0.18;
  private _gamepadActive: boolean = false;

  private constructor() {
    this.setupKeyboard();
  }

  public static get() {
    if (!this._instance) this._instance = new InputSystem();
    return this._instance;
  }

  private setupKeyboard() {
    const map: Record<string, Point> = {
      KeyW: new Point(0, -1),
      KeyA: new Point(-1, 0),
      KeyS: new Point(0, 1),
      KeyD: new Point(1, 0),
    };

    const keyToAction: Record<string, InputAction> = {
      KeyJ: "NORMAL_ATTACK",
      Space: "DASH",
      KeyF: "INTERACT",
    };

    window.addEventListener("keydown", (e: KeyboardEvent) => {
      const mappedKey = map[e.code];
      const action = keyToAction[e.code];

      if (action) this._buttons[action] = true;

      if (e.repeat) return;

      if (mappedKey) {
        this._keyboardMovement.x += mappedKey.x;
        this._keyboardMovement.y += mappedKey.y;
      }
    });
    window.addEventListener("keyup", (e: KeyboardEvent) => {
      const mappedKey = map[e.code];
      const action = keyToAction[e.code];

      if (action) this._buttons[action] = false;

      if (e.repeat) return;

      if (mappedKey) {
        this._keyboardMovement.x -= mappedKey.x;
        this._keyboardMovement.y -= mappedKey.y;
      }
    });
  }

  public poll() {
    this.pollGamepad();
    this.combineSources();
  }

  public commit() {
    this._prevButtons = { ...this._buttons, ...this._gamepadButtons };
  }

  private pollGamepad() {
    this._gamepadActive = false;

    const pads = navigator.getGamepads();
    if (!pads) return;

    const keyToAction: Record<string, InputAction> = {
      x: "NORMAL_ATTACK",
      a: "DASH",
    };

    const gamepadMapper = {
      x: pads[0]?.buttons[2].pressed,
      y: pads[0]?.buttons[0].pressed,
    };

    for (const pad of pads) {
      if (!pad) return;

      let rawX = pad.axes[0];
      let rawY = pad.axes[1];

      const magnitude = Math.hypot(rawX, rawY);

      if (magnitude < this.DEAD_ZONE) {
        rawX = rawY = 0;
      } else {
        this._gamepadActive = true;
        rawX /= magnitude;
        rawY /= magnitude;
      }

      this._gamepadMovement.x = rawX;
      this._gamepadMovement.y = rawY;
      if (this._gamepadActive) break;
    }

    // Using an XBOX ONE gamepad for buttons reference
    if (gamepadMapper.x) this._gamepadButtons[keyToAction.x] = true;
    else this._gamepadButtons[keyToAction.x] = false;
    if (gamepadMapper.y) this._gamepadButtons[keyToAction.y] = false;
    else this._gamepadButtons[keyToAction.a] = false;
  }

  private combineSources() {
    // Golden Rule: if the stick left the deadzone in this frame -> gamepad has priority
    // If it got back to center -> keyboard takes control immediately
    if (this._gamepadActive) {
      this._movement.x = this._gamepadMovement.x;
      this._movement.y = this._gamepadMovement.y;
    } else {
      const kx = Math.sign(this._keyboardMovement.x);
      const ky = Math.sign(this._keyboardMovement.y);
      const magnitude = Math.hypot(kx, ky);
      this._movement.x = magnitude > 0 ? kx / magnitude : 0;
      this._movement.y = magnitude > 0 ? ky / magnitude : 0;
    }
  }

  isPressed(key: string) {
    return !!this._buttons[key] || !!this._gamepadButtons[key];
  }

  wasJustPressed(key: string): boolean {
    const prev = !!this._prevButtons[key];
    const cur = !!this._buttons[key] || this._gamepadButtons[key];
    return !prev && cur;
  }

  wasJustReleased(key: string) {
    const prev = !!this._prevButtons[key];
    const cur = !!this._buttons[key] || !!this._gamepadButtons[key];
    return prev && !cur;
  }

  public getMovementVector() {
    return { ...this._movement };
  }

  public isGamepadActiveThisFrame() {
    return this._gamepadActive;
  }
}
