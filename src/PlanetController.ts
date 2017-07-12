import { Planet } from "./Planet";
import { Player } from "./Player";

export class PlanetController {

    /** 
     * Hash from player id to the planets they own. Use Player.NO_PLAYER_ID for
     * uncontrolled planets.
     */
    planets: { [playerId: number] : Planet[]};

    constructor () {
        this.planets = {};
    }

    /**
     * Adds a planet to the controller.
     */
    public Add(planet: Planet): void {
        
        if (planet == null) {
            alert('NullPlanet: Planetcontroller.Add')
            return;
        }

        if (typeof this.planets[planet.controlledById] !== "undefined") {
            this.planets[planet.controlledById].push(planet);
        } else {
            this.planets[planet.controlledById] = [planet];
        }

    }

}