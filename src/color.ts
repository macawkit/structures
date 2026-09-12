import Structure from './structure.js';

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
    public assign (other: Color): this {
        this.r = other.r;
        this.g = other.g;
        this.b = other.b;
        this.a = other.a;

        return this;
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
    public get abnormal (): boolean {
        return !this.valid || this.r > 1 || this.g > 1 || this.b > 1;
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
    public get cssRGBA (): string {
        const multiplier = 255 / Math.max(this.r, this.g, this.b, 1);
        const r = Math.round(this.r * multiplier).toString();
        const g = Math.round(this.g * multiplier).toString();
        const b = Math.round(this.b * multiplier).toString();
        const a = this.a.toString();

        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }
    public get cssRGB (): string {
        const m = 255 / Math.max(this.r, this.g, this.b, 1);

        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        return 'rgb(' + Math.round(this.r * m) + ', ' + Math.round(this.g * m) + ', ' + Math.round(this.b * m) + ')';
    }
    public get hex (): string {
        const multiplier = 255 / Math.max(this.r, this.g, this.b, 1);
        const r = leadingZeroPad(Math.round(this.r * multiplier).toString(16), 2);
        const g = leadingZeroPad(Math.round(this.g * multiplier).toString(16), 2);
        const b = leadingZeroPad(Math.round(this.b * multiplier).toString(16), 2);

        return '#' + r + g + b;
    }
    public get hexa (): string {
        const a = leadingZeroPad(Math.trunc(this.a * 255).toString(16), 2);

        return this.hex + a;
    }
    public normalize (cutoff = 0): this {
        const multiplier = 1 / Math.max(this.r, this.g, this.b, cutoff);
        this.r *= multiplier;
        this.g *= multiplier;
        this.b *= multiplier;

        return this;
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

    public static random (opaque = true): Color {
        return new Color(Math.random(), Math.random(), Math.random(), opaque ? 1 : Math.random());
    }
}

const paddings = new Map<number, string[]>;
function leadingZeroPad (value: string, length: number): string {
    let padding = paddings.get(length);
    if (!padding) {
        padding = [];
        paddings.set(length, padding);
        for (let i = 0; i <= length; ++i)
            padding.push('0'.repeat(length - i));
    }

    return padding[value.length] + value;
}