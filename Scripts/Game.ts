///<reference types="jquery"/>

/**
 * X-Y cartesian vector. All the class functions are functional, i.e. none will
 * change the object's data, just return the result of the operation.
 */
class Point {
    x: number;
    y: number;

    constructor (x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    Add = (b: Point): Point => {
        return Point.Add(this,b);
    }

    Subtract = (b: Point): Point => {
        return Point.Subtract(this,b);
    }

    Scale = (m: number): Point => {
        return Point.Scale(this, m);
    }

    Dot = (b: Point): number => {
        return Point.Dot(this, b);
    }

    Magnitude = (): number => {
        return Point.Magnitude(this);
    }

    static Add (a: Point, b: Point): Point {
        return new Point(a.x + b.x, a.y + b.y);
    }

    static Subtract (a: Point, b: Point): Point {
        return new Point(a.x - b.x, a.y - b.y);
    }

    static Scale(a: Point, m: number): Point {
        return new Point(a.x * m, a.y * m);
    }

    static Dot(a: Point, b: Point): number {
        return a.x * b.x + a.y * b.y;
    }

    static Magnitude(point: Point): number {
        return Math.sqrt(point.Dot(point));
    }

}

/**
 * Implementable for any object that can be intersected.
 */
interface IIntersectable {
    GetIntersection(point:Point):boolean;
}

/**
 * A class representing a rectangular hitbox.

 * The extension from a point is the centre of the hitbox (ie. (x,y) is the 
 * centre).
 */
class Hitbox extends Point implements IIntersectable {

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
        return this.x + (this._height / 2);
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

/**
 * Circular hitbox.
 */
class CircleHitbox extends Point implements IIntersectable {

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

interface IClickable {
    OnClick(event: Event): any;
}

interface IDrawable {
    Draw(g: GraphicsAdapter): void;
}

/**
 * Enumeration for which state the game is in.
 */
enum GameState {
    MainMenu = 1,
    MoveSelection = 2,
}

/**
 * A single element on the screen.
 */
abstract class GameElement {
    hitbox: IIntersectable;

    constructor (hitbox: IIntersectable) {
        this.hitbox = hitbox;
    }
}

class Color {
    r: number;
    g: number;
    b: number;

    constructor (r: number, g: number, b: number) {
        /** 
         * Value normalization.
         */ 
        while (r > 255)
            r -= 256;
        while (r < 0)
            r += 256;
        while (g > 255)
            g -= 256;
        while (g < 0)
            g += 256;
        while (b > 256)
            b -= 256;
        while (b < 0)
            b += 256;

        this.r = r;
        this.g = g;
        this.b = b;
    }

    ToHexString = (): string => {

        /** 
         * Convert individual colors to hex strings.
         */ 
        var red = this.r.toString(16);
        var green = this.g.toString(16);
        var blue = this.b.toString(16);

        /** 
         * Pad with zeroes.
         */
        while (red.length < 2)
            red = '0' + red;

        while (green.length < 2)
            green = '0' + green;

        while (blue.length < 2)
            blue = '0' + blue;

        return '#' + red + green + blue;
    }

}

/**
 * Static helper functions for drawing.
 */
class GraphicsAdapter {

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

/**
 * Class for a single planet.
 */
class Planet extends GameElement implements IClickable, IDrawable {

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

/** 
 * Main Game controller
 */
class Game {

    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    constructor (gameElementId = "game") {
        
        var element = document.getElementById(gameElementId);
        this.canvas = element as HTMLCanvasElement;
        this.context = this.canvas.getContext("2d");
    }

    // Start the game
    Initialize = (): void => {
        $(this.canvas).click(event => {this.ClickHandler(event)});
        $(this.canvas).contextmenu(event => {this.ClickHandler(event)});
    }

    /**
     * Handles click events.
     */
    ClickHandler = (event: JQuery.Event<HTMLElement, null>): void => {

        // Determine if left click or right click.
        var leftClick: boolean;

        if (!NotNullOrUndefined(event) || !NotNullOrUndefined(event.which)) {
            console.warn("An undefined click event occured");
            return;
        }

        if (event.which === JQuery.Mouse.Left) {
            leftClick = true;
        } else if (event.which === JQuery.Mouse.Right) {
            leftClick = false;
        } else {
            // Ignore middle clicks and other.
            return;
        }

        // Get click position.
        if (    !NotNullOrUndefined(event.pageX) ||
                !NotNullOrUndefined(event.pageY)) {
            console.warn("An undefined click event occured");
            return;
        }

        var canvasOriginOnPage = new Point(
            this.canvas.getBoundingClientRect().left,
            this.canvas.getBoundingClientRect().top,
        );

        var clickPositionOnPage = new Point(event.pageX, event.pageY);

        var clickPosition: Point = clickPositionOnPage
                .Subtract(canvasOriginOnPage);

        console.log(`${leftClick ? "leftclick" : "rightclick"}\
                    (${clickPosition.x}, ${clickPosition.y})`);

        // TODO we have the relative point on the canvas, decide what to do with
        // it.
        var planets: Planet[] = [];
        planets.push(new Planet(100, 100, 100, "A"));
        planets.push(new Planet(200, 200, 150, "B"));

        var clickAccepted = false;

        planets.forEach(planet => {

            if (    !clickAccepted
                    && planet.hitbox.GetIntersection(clickPosition)) {

                planet.OnClick(null);
                clickAccepted = true;

            }

            planet.Draw(this.context);

        });

    }
}

/**
 * Page ready function
 */
$(() => {
    // Create a new game object.
    var game = new Game();
    game.Initialize();
});

function NotNullOrUndefined (obj: Object): boolean {
    if (typeof obj === "undefined")
        return false;
    if (obj == null)
        return false;

    return true;
}