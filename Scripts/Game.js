///<reference types="jquery"/>
/**
 * X-Y cartesian vector. All the class functions are functional, i.e. none will
 * change the object's data, just return the result of the operation.
 */
class Point {
    constructor(x, y) {
        this.Add = (b) => {
            return Point.Add(this, b);
        };
        this.Subtract = (b) => {
            return Point.Subtract(this, b);
        };
        this.Scale = (m) => {
            return Point.Scale(this, m);
        };
        this.Dot = (b) => {
            return Point.Dot(this, b);
        };
        this.x = x;
        this.y = y;
    }
    static Add(a, b) {
        return new Point(a.x + b.x, a.y + b.y);
    }
    static Subtract(a, b) {
        return new Point(a.x - b.x, a.y - b.y);
    }
    static Scale(a, m) {
        return new Point(a.x * m, a.y * m);
    }
    static Dot(a, b) {
        return a.x * b.x + a.y * b.y;
    }
}
/**
 * Enumeration for which state the game is in.
 */
var GameState;
(function (GameState) {
    GameState[GameState["MainMenu"] = 1] = "MainMenu";
    GameState[GameState["MoveSelection"] = 2] = "MoveSelection";
})(GameState || (GameState = {}));
/**
 * A single element on the screen.
 */
class GameElement {
}
/**
 * Main Game controller
 */
class Game {
    constructor(gameElementId = "game") {
        // Start the game
        this.Initialize = () => {
            $(this.canvas).click(event => { this.ClickHandler(event); });
            $(this.canvas).contextmenu(event => { this.ClickHandler(event); });
        };
        /**
         * Handles click events.
         */
        this.ClickHandler = (event) => {
            // Determine if left click or right click.
            var leftClick;
            if (!NotNullOrUndefined(event) || !NotNullOrUndefined(event.which)) {
                console.warn("An undefined click event occured");
                return;
            }
            if (event.which === 1 /* Left */) {
                leftClick = true;
            }
            else if (event.which === 3 /* Right */) {
                leftClick = false;
            }
            else {
                // Ignore middle clicks and other.
                return;
            }
            // Get click position.
            if (!NotNullOrUndefined(event.pageX) ||
                !NotNullOrUndefined(event.pageY)) {
                console.warn("An undefined click event occured");
                return;
            }
            var canvasOriginOnPage = new Point(this.canvas.getBoundingClientRect().left, this.canvas.getBoundingClientRect().top);
            var clickPositionOnPage = new Point(event.pageX, event.pageY);
            var clickPosition = clickPositionOnPage
                .Subtract(canvasOriginOnPage);
            console.log(`${leftClick ? "leftclick" : "rightclick"}\
                    (${clickPosition.x}, ${clickPosition.y})`);
            // TODO we have the relative point on the canvas, decide what to do with
            // it.
        };
        var element = document.getElementById(gameElementId);
        this.canvas = element;
        this.context = this.canvas.getContext("2d");
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
function NotNullOrUndefined(obj) {
    if (typeof obj === "undefined")
        return false;
    if (obj == null)
        return false;
    return true;
}
//# sourceMappingURL=Game.js.map