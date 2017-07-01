import { Point } from "./Point";
import { GraphicsAdapter } from "./GraphicsAdapter";

/**
 * Implementable for any object that can be intersected.
 */
export interface IIntersectable {
    GetIntersection(point:Point):boolean;
}

export interface IClickable {
    OnClick(event: Event): any;
}

export interface IDrawable {
    Draw(g: GraphicsAdapter): void;
}