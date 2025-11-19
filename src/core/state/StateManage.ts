// Game State Manager
export enum GameState {
  GAME = 'GAME',
  PLAYING = 'PLAYING',
  PAUSED = 'PAUSED'
}

export class StateManager {
  private _state: GameState = GameState.GAME

  get state() {
    return this._state;
  }

  setState(newState: GameState) {
    this._state = newState;
    console.log("[STATE] ->", newState);
  }
}