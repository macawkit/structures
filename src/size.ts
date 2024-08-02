import Structure from './structure';

export default class Size implements Structure<Size>{
    constructor (
        public width: number,
        public height: number
    ) {}

    public copy (): Size {
        return new Size(this.width, this.height);
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