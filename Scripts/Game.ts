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
    GetIntersection(point: Point) {

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
    GetIntersection(point: Point) {
        return this.Subtract(point).Magnitude() <= this._radius;
    }

}

interface IClickable {
    OnClick(event: Event): any;
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
    hitbox: IClickable;
    
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