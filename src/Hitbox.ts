import { Point } from "./Point";
import { IIntersectable } from "./Interfaces";



/**
 * A class representing a rectangular hitbox.
 * The extension from a point is the centre of the hitbox (ie. (x,y) is the 
 * centre).
 */
export class Hitbox extends Point implements IIntersectable {

    private _width:  number;
    private _height: number;

    constructor (x: number, y: number, width: number, height: number) {

        super(x, y);

        this._width  = width;
        this._height = height;

    }

    /**
     * Accessors
     */
    GetHeight = (): number => {
        return this._height;
    }

    GetWidth = (): number => {
        return this._width;
    }

    GetLeft = (): number => {
        return this.x - (this._width / 2);
    }

    GetRight = (): number => {
        return this.x + (this._width / 2);
    }

    GetTop = (): number => {
        return this.y - (this._height / 2);
    }

    GetBottom = (): number => {
        return this.y + (this._height / 2);
    }

    GetTopLeft = (): Point => {
        return new Point(this.GetLeft(), this.GetTop());
    }

    GetTopRight = (): Point => {
        return new Point(this.GetRight(), this.GetTop());
    }

    GetBottomRight = (): Point => {
        return new Point(this.GetRight(), this.GetBottom());
    }

    GetBottomLeft = (): Point => {
        return new Point(this.GetLeft(), this.GetBottom());
    }

    /**
     * Mutators
     */
    SetHeight = (height: number): void => {
        this._height = height;
    }

    SetWidth = (width: number): void => {
        this._width = width;
    }

    /**
     * IIntersectable implementation, checks if a point is inside the rectangle.
     */
    GetIntersection = (point: Point): boolean => {

        return point.x >= this.GetLeft()
            && point.x <= this.GetRight()
            && point.y >= this.GetTop()
            && point.y <= this.GetBottom()

    }

}
