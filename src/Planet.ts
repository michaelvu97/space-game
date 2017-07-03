import { Point } from "./Point";
import { Color } from "./Color";
import { CircleHitbox } from "./CircleHitbox";
import { GraphicsAdapter } from "./GraphicsAdapter";
import { GameObject } from "./GameObject";

/**
 * Class for a single planet.
 */
export class Planet extends CircleHitbox implements GameObject {

    static DEFAULT_RADIUS = 100;

    name: string;
    color: Color;
    
    canClick: boolean = true;

    constructor (x: number, y: number, radius: number = Planet.DEFAULT_RADIUS, 
            name: string = "", color: Color = new Color(0,0,255)) {

        super(x, y, radius);

        this.name = name;

        this.color = color;

    }

    /**
     * IClickable implementation.
     * TODO make this actually do something.
     */
    OnClick = (event: Event):void => {
        console.log(this.name);
    }

    /** 
     * IDrawable implementation.
     */
    Draw = (context: CanvasRenderingContext2D): void => {

        console.log('drawing' + this.name);

        GraphicsAdapter.FillStyle(context, this.color);

        context.beginPath();

        GraphicsAdapter.CirclePath(context, this, this.GetRadius());

        context.fill();
    }

}
