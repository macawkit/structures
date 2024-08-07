import Structure from './structure';

export default class Point implements Structure<Point>{
    constructor (
        public x: number,
        public y: number
    ) {}

    public get valid (): boolean {
        return this.x === this.x &&
            this.y === this.y;
    }
    public copy (): Point {
        return new Point(this.x, this.y);
    }
    public equals (other: Point, epsilon?: number): boolean {
        if (epsilon)
            return (
                Math.abs(this.x - other.x) < epsilon &&
                Math.abs(this.y - other.y) < epsilon
            );

        return this.x === other.x && this.y === other.y;
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