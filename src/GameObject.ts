import { Point } from "./Point";
import { GraphicsAdapter } from "./GraphicsAdapter";

export interface GameObject {

    /** 
     * Returns true if a point exists inside an object.
     */
    GetIntersection(point:Point): boolean;

    /**
     * If the object can currently be clicked.
     */
    canClick: boolean;

    /** 
     * Function for when the object is clicked.
     */
    OnClick(event:Event): any;

    /** 
     * Draw the object.
     */
    Draw(g: GraphicsAdapter): void;

}
