import Structure from './structure';

export default class Size implements Structure<Size>{
    constructor (
        public width: number,
        public height: number
    ) {}

    public get valid (): boolean {
        return this.width >= 0 && this.height >= 0;
    }
    public get square (): number {
        return this.width * this.height;
    }

    public copy (): Size {
        return new Size(this.width, this.height);
    }
    public equals (other: Size, epsilon?: number): boolean {
        if (epsilon)
            return (
                Math.abs(this.width - other.width) < epsilon &&
                Math.abs(this.height - other.height) < epsilon
            );

        return this.width === other.width && this.height === other.width;
    }
    public add (other: Size): void {
        this.width += other.width;
        this.height += other.height;
    }
    public sub (other: Size): void {
        this.width -= other.width;
        this.height -= other.height;
    }
    public plus (other: Size): Size {
        return new Size(this.width + other.width, this.height + other.height);
    }
    public minus (other: Size): Size {
        return new Size(this.width - other.width, this.height - other.height);
    }
}