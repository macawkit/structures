import Structure from './structure';
import Point from './point';
import Size from './size';

export default class Rect implements Structure<Rect> {
    constructor (
        public point: Point,
        public size: Size
    ) {}

    public get valid (): boolean {
        return this.size.valid && this.point.valid;
    }

    public get x (): number {return this.point.x;}
    public set x (x: number) {
        this.point.x = x;
    }

    public get x1 (): number {return this.point.x;}
    public set x1 (x: number) {
        const diff = x - this.point.x;
        this.point.x = x;
        this.size.width -= diff;
    }

    public get x2 (): number {return this.point.x + this.size.width;}
    public set x2 (x: number) {
        const diff = x - this.x2;
        this.size.width += diff;
    }

    public get y (): number {return this.point.y;}
    public set y (y: number) {
        this.point.y = y;
    }

    public get y1 (): number {return this.point.y;}
    public set y1 (y: number) {
        const diff = y - this.point.y;
        this.point.y = y;
        this.size.height -= diff;
    }

    public get y2 (): number {return this.point.y + this.size.height;}
    public set y2 (y: number) {
        const diff = y - this.y2;
        this.size.height += diff;
    }

    public get width (): number {return this.size.width;}
    public set width (width: number) {
        this.size.width = width;
    }

    public get height (): number {return this.size.height;}
    public set height (height: number) {
        this.size.height = height;
    }

    public get p1 (): Point {return this.point.copy();}
    public set p1 (point: Point) {
        const xDiff = point.x - this.point.x;
        const yDiff = point.y - this.point.y;
        this.point = point;
        this.size.width -= xDiff;
        this.size.height -= yDiff;
    }
    public get p2 (): Point {return new Point(this.x2, this.y2);}
    public set p2 (point: Point) {
        const xDiff = point.x - this.x2;
        const yDiff = point.y - this.y2;
        this.size.width += xDiff;
        this.size.height += yDiff;
    }

    //todo: not sure about these guys, they will depend on coordinate system
    public get top (): number {
        return this.point.y;
    }
    public get left (): number {
        return this.point.x;
    }
    public get bottom (): number {
        return this.point.y + this.size.height;
    }
    public get right (): number {
        return this.point.x + this.size.width;
    }

    public copy (): Rect {
        return new Rect(this.point.copy(), this.size.copy());
    }
    public equals (other: Rect, epsilon?: number): boolean {
        return (
            this.point.equals(other.point, epsilon) &&
            this.size.equals(other.size, epsilon)
        );
    }
    public reset (): void {
        this.point.reset();
        this.size.reset();
    }

    public intersect (other: Rect): this {
        const x2 = Math.min(this.x2, other.x2);
        const y2 = Math.min(this.y2, other.y2);

        this.point.max(other.point);

        this.size.width = x2 - this.point.x;
        this.size.height = y2 - this.point.y;

        if (!this.size.positive)    //there is no intersection, data is irrelevant
            this.reset();

        return this;
    }
    public intersection (other: Rect): Rect {
        const p1 = this.point.maximal(other.point);
        const p2 = Point.max(this.x2, this.y2, other.x2, other.y2);

        const width = p2.x - p1.x;
        const height = p2.y - p1.y;

        if (width > 0 && height > 0)
            return new Rect(p1, new Size(width, height));

        p1.reset();                 //there is no intersection, data is irrelevant
        return new Rect(p1, new Size(0, 0));
    }

    public union (other: Rect): this {
        const x2 = Math.max(this.x2, other.x2);
        const y2 = Math.max(this.y2, other.y2);

        this.point.min(other.point);
        this.size.width = x2 - Math.min(this.point.x, other.point.x);
        this.size.height = y2 - Math.min(this.point.y, other.point.y);

        return this;
    }
    public united (other: Rect): Rect {
        const p1 = this.point.minimal(other.point);
        return new Rect(
            p1,
            new Size(
                Math.max(this.x2, other.x2) - p1.x,
                Math.max(this.y2, other.y2) - p1.y
            )
        );
    }

    public static fromArray ([x, y, width, height]: number[]): Rect {
        return new Rect(
            new Point(x, y),
            new Size(width, height)
        );
    }
    public static fromNumbers (x: number, y: number, width: number, height: number): Rect {
        return new Rect(
            new Point(x, y),
            new Size(width, height)
        );
    }
    public static from2PointsNumbers (x1: number, y1: number, x2: number, y2: number): Rect {
        return new Rect(
            new Point(x1, y1),
            new Size(x2 - x1, y2 - y1)
        );
    }
}
