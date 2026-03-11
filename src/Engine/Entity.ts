import { Container } from "pixi.js";

export abstract class Entity {
  public container: Container;

  constructor() {
    this.container = new Container();
  }

  update(_deltaTime: number): void {}

  // TODO: implement Component pattern later
  addComponent(component: any) {
    console.log("Component added");
  }

  destroy() {
    this.container.destroy({ children: true });
  }
}
