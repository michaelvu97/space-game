import { Point } from "./Point";
import { IClickable } from "./Interfaces";
import { IDrawable } from "./Interfaces";
import { Color } from "./Color";
import { CircleHitbox } from "./CircleHitbox";
import { GraphicsAdapter } from "./GraphicsAdapter";
import { GameElement } from "./GameElement";

/**
 * Class for a single planet.
 */
export class Planet extends GameElement implements IClickable, IDrawable {

    static DEFAULT_RADIUS = 100;

    name: string;
    color: Color;

    constructor (x: number, y: number, radius: number = Planet.DEFAULT_RADIUS, 
            name: string = "", color: Color = new Color(0,0,255)) {

        super(new CircleHitbox(x, y, radius));

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

        var hitBox = this.hitbox as CircleHitbox;

        GraphicsAdapter.CirclePath(context, hitBox, hitBox.GetRadius());

        context.fill();
    }
}
