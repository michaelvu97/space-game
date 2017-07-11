import { Point } from "./Point";

export interface IIntersectable {
    GetIntersection(point:Point):boolean;
}
