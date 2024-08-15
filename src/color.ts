import { Operable } from './structure';

export default class Color implements Operable<Color> {
    constructor (
        public r: number,
        public g: number,
        public b: number,
        public a: number
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
            this.r === this.r &&
            this.g === this.g &&
            this.b === this.b &&
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

    public add (other: Color): this {
        const comp = other.a * (1 - this.a);
        const a = this.a + comp;

        this.r = (this.r * this.a + other.r * comp) / a;
        this.g = (this.g * this.a + other.g * comp) / a;
        this.b = (this.b * this.a + other.b * comp) / a;
        this.a = a;

        return this;
    }
    public sub (other: Color): this {
        const comp = other.a * (1 - this.a);
        const a = Math.max(this.a - comp, 0);

        this.r = Math.max((this.r * this.a - other.r * comp), 0);
        this.g = Math.max((this.g * this.a - other.g * comp), 0);
        this.b = Math.max((this.b * this.a - other.b * comp), 0);
        this.a = a;

        if (a > 0) {
            this.r /= a;
            this.g /= a;
            this.b /= a;
        }

        return this;
    }

    public plus (other: Color): Color {
        const comp = other.a * (1 - this.a);

        const a = this.a + comp;
        const r = (this.r * this.a + other.r * comp) / a;
        const g = (this.g * this.a + other.g * comp) / a;
        const b = (this.b * this.a + other.b * comp) / a;

        return new Color(r, g, b, a);
    }
    public minus (other: Color): Color {
        const comp = other.a * (1 - this.a);
        const a = Math.max(this.a - comp, 0);

        const r = Math.max((this.r * this.a - other.r * comp) / (a || 1), 0);
        const g = Math.max((this.g * this.a - other.g * comp) / (a || 1), 0);
        const b = Math.max((this.b * this.a - other.b * comp) / (a || 1), 0);

        return new Color(r, g, b, a);
    }
}