import { Point } from "./Point";
import { IIntersectable } from "./Interfaces";

/**
 * Circular hitbox.
 */
export class CircleHitbox extends Point implements IIntersectable {

    private _radius: number;

    constructor (x: number, y: number, radius: number) {

        super(x, y);

        if (radius < 0) {
            console.warn("Negative radius supplied");
            radius *= -1;
        }

        this._radius = radius;

    }

    /**
     * Accessors
     */

    GetRadius = (): number => {
        return this._radius;
    }

    /**
     * Mutators
     */

    /**
     * Takes the absolute value of the supplied radius, just in case.
     */ 
    SetRadius = (radius: number): void => {

        if (radius < 0) {
            console.warn("Negative radius supplied");
            radius *= -1;
        }

        this._radius = radius;
    }

    /**
     * IIntersectable implementation.
     */
    GetIntersection = (point: Point) => {
        return this.Subtract(point).Magnitude() <= this._radius;
    }

}
