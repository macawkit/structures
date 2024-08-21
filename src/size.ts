import { Coordinate } from './structure';

export default class Size implements Coordinate<Size>{
    constructor (
        public width: number,
        public height: number
    ) {}

    public get valid (): boolean {
        return this.width === this.width &&
            this.height === this.height &&
            this.width >= 0 && this.height >= 0;
    }
    public get square (): number {
        return this.width * this.height;
    }
    public get positive (): boolean {
        return this.width > 0 && this.height > 0;
    }

    public copy (): Size {
        return new Size(this.width, this.height);
    }
    public equals (other: Size, epsilon?: number): boolean {
        if (epsilon) {
            return (
                Math.abs(this.width - other.width) < epsilon &&
                Math.abs(this.height - other.height) < epsilon
            );
        }

        return this.width === other.width && this.height === other.height;
    }
    public reset (): void {
        this.width = 0;
        this.height = 0;
    }
    public toString (): string {
        return `Size(${this.width.toString()}, ${this.height.toString()})`;
    }

    public add (other: Size): this {
        this.width += other.width;
        this.height += other.height;

        return this;
    }
    public sub (other: Size): this {
        this.width -= other.width;
        this.height -= other.height;

        return this;
    }
    public min (other: Size): this {
        this.width = Math.min(this.width, other.width);
        this.height = Math.min(this.height, other.height);

        return this;
    }
    public max (other: Size): this {
        this.width = Math.max(this.width, other.width);
        this.height = Math.max(this.height, other.height);

        return this;
    }
    public set (width: number, height: number): this {
        this.width = width;
        this.height = height;

        return this;
    }
    public adjust (width: number, height: number): this {
        this.width += width;
        this.height += height;

        return this;
    }

    public plus (other: Size): Size {
        return new Size(
            this.width + other.width,
            this.height + other.height
        );
    }
    public minus (other: Size): Size {
        return new Size(
            this.width - other.width,
            this.height - other.height
        );
    }
    public minimal (other: Size): Size {
        return new Size(
            Math.min(this.width, other.width),
            Math.min(this.height, other.height)
        );
    }
    public maximal (other: Size): Size {
        return new Size(
            Math.max(this.width, other.width),
            Math.max(this.height, other.height)
        );
    }

    public static max (x1: number, y1: number, x2: number, y2: number): Size {
        return new Size(Math.max(x1, x2), Math.max(y1, y2));
    }
    public static min (x1: number, y1: number, x2: number, y2: number): Size {
        return new Size(Math.min(x1, x2), Math.min(y1, y2));
    }
}