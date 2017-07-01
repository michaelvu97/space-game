import { IIntersectable } from "./Interfaces";
/**
 * A single element on the screen.
 */
export abstract class GameElement {
    hitbox: IIntersectable;

    constructor (hitbox: IIntersectable) {
        this.hitbox = hitbox;
    }
}