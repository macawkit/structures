import Structure from './structure';

export default class Point implements Structure<Point>{
    constructor (
        public x: number,
        public y: number
    ) {}

    public copy (): Point {
        return new Point(this.x, this.y);
    }
    public add (other: Point): void {
        this.x += other.x;
        this.y += other.y;
    }
    public sub (other: Point): void {
        this.x -= other.x;
        this.y -= other.y;
    }
    public plus (other: Point): Point {
        return new Point(this.x + other.x, this.y + other.y);
    }
    public minus (other: Point): Point {
        return new Point(this.x - other.x, this.y - other.y);
    }
}