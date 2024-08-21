import Structure from './structure';

export default class Color implements Structure<Color> {
    constructor (
        public r: number,
        public g: number,
        public b: number,
        public a = 1
    ) {}

    public copy (): Color {
        return new Color(this.r, this.g, this.b, this.a);
    }
    public reset (): this {
        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.a = 1;

        return this;
    }
    public get valid (): boolean {
        return (
            this.r >= 0 &&
            this.g >= 0 &&
            this.b >= 0 &&
            this.a >= 0 && this.a <= 1
        );
    }
    public equals (other: Color, epsilon?: number): boolean {
        if (epsilon) {
            return (
                Math.abs(this.r - other.r) < epsilon &&
                Math.abs(this.g - other.g) < epsilon &&
                Math.abs(this.b - other.b) < epsilon &&
                Math.abs(this.a - other.a) < epsilon
            );
        }

        return (
            this.r === other.r &&
            this.g === other.g &&
            this.b === other.b &&
            this.a === other.a
        );
    }
    public toString (): string {
        return `Color(${this.r.toString()}, ${this.g.toString()}, ${this.b.toString()}, ${this.a.toString()})`;
    }

    public over (background: Color): this {
        const comp = background.a * (1 - this.a);
        const a = this.a + comp;

        if (a > 0) {
            this.r = (this.r * this.a + background.r * comp) / a;
            this.g = (this.g * this.a + background.g * comp) / a;
            this.b = (this.b * this.a + background.b * comp) / a;
        }
        this.a = a;

        return this;
    }
    public under (foreground: Color): this {
        const comp = this.a * (1 - foreground.a);
        const a = foreground.a + comp;

        if (a > 0) {
            this.r = (foreground.r * foreground.a + this.r * comp) / a;
            this.g = (foreground.g * foreground.a + this.g * comp) / a;
            this.b = (foreground.b * foreground.a + this.b * comp) / a;
        }
        this.a = a;

        return this;
    }
    public subFromBottom (background: Color): this {
        const comp = background.a * (1 - this.a);
        const a = Math.max(this.a - comp, 0);

        this.r = Math.max((this.r * this.a - background.r * comp), 0);
        this.g = Math.max((this.g * this.a - background.g * comp), 0);
        this.b = Math.max((this.b * this.a - background.b * comp), 0);
        this.a = a;

        if (a > 0) {
            this.r /= a;
            this.g /= a;
            this.b /= a;
        }

        return this;
    }
    public subFromTop (foreground: Color): this {
        const comp = this.a * (1 - foreground.a);
        const a = Math.max(foreground.a - comp, 0);

        this.r = Math.max((foreground.r * foreground.a - this.r * comp), 0);
        this.g = Math.max((foreground.g * foreground.a - this.g * comp), 0);
        this.b = Math.max((foreground.b * foreground.a - this.b * comp), 0);
        this.a = a;

        if (a > 0) {
            this.r /= a;
            this.g /= a;
            this.b /= a;
        }

        return this;
    }
}