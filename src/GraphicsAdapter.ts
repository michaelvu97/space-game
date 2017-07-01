import { Point } from "./Point";
import { Color } from "./Color";

/**
 * Static helper functions for drawing.
 */
export class GraphicsAdapter {

    /** 
     * Moves the path cursor to a point.
     */
    static MoveTo (context: CanvasRenderingContext2D, point: Point) {
        context.moveTo(point.x, point.y);
    }

    /** 
     * Adds a circle to the path.
     */
    static CirclePath (context: CanvasRenderingContext2D, centre: Point, 
            radius: number): void {
        context.arc(centre.x, centre.y, radius, 0, 360);
    }

    /** 
     * Sets the color to fill the current path with.
     */ 
    static FillStyle (context: CanvasRenderingContext2D, color: Color) {
        context.fillStyle = color.ToHexString();
    }

}
