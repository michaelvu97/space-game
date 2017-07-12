import { Color } from "./Color";

export class Player {

    color: Color;

    private _id: number;

    // For planets not controlled by a player.
    public static NO_PLAYER_ID = -1;


    constructor (id: number, color: Color) {

        this._id = id;
        this.color = color;

    }


    public getId(): number {

        return this._id;

    }


    public setId(id: number): void {

        if (id < 0) {
            alert('Argument out of range exception: Player Id:' + id);
            return;
        }

        this._id = id;

    }

}