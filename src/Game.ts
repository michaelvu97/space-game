import { IIntersectable } from "./Interfaces";
import { Point } from "./Point";
import { Planet } from "./Planet";
import * as $ from "jquery";

/**
 * Enumeration for which state the game is in.
 */
enum GameState {
    MainMenu = 1,
    MoveSelection = 2,
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