/**
 * X-Y cartesian vector. All the class functions are functional, i.e. none will
 * change the object's data, just return the result of the operation.
 */
export class Point {
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
