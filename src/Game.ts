import { Point } from "./Point";
import { Planet } from "./Planet";
import { Color } from "./Color";
import { GameObject } from "./GameObject"
import { Player } from "./Player";
import { PlanetController } from "./PlanetController";
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
export class Game {

    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    planetController: PlanetController;

    constructor (gameElementId = "game") {
        
        var element = document.getElementById(gameElementId);
        this.canvas = element as HTMLCanvasElement;
        this.context = this.canvas.getContext("2d");

        this.planetController = new PlanetController();

    }

    // Start the game
    Initialize = (): void => {
        $(this.canvas).click(event => {this.ClickHandler(event)});
        $(this.canvas).contextmenu(event => {this.ClickHandler(event)});


        // Testing
        this.planetController.Add(new Planet(100, 100, 50, "planetA", 
                new Color(0,0,255))
        );

        this.planetController.Add(new Planet(400, 400, 75, "planetB",
                new Color(255,0,255))
        );

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
        var clickAccepted = false;
        this.planets.forEach(planet => {

            if (    !clickAccepted
                    && planet.GetIntersection(clickPosition)
                    && planet.canClick) {

                planet.OnClick(null, this);
                clickAccepted = true;

            }

        });

    }

    /**
     * Updates the canvas and draws all the onscreen elements.
     */
    UpdateCanvas = (): void => {

        // Clear screen
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.planets.forEach(planet => {
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

    // Set screen update to a timer for now.
    setTimeout(game.UpdateCanvas, 16.6);
});

function NotNullOrUndefined (obj: Object): boolean {
    if (typeof obj === "undefined")
        return false;
    if (obj == null)
        return false;

    return true;
}