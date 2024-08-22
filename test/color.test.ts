import { describe, test } from 'node:test';
import assert from 'node:assert';

import { Color } from '../src';

void describe('Color', () => {
    void test('creation', () => {
        const c = new Color(0, 5, 2);

        assert.equal(c.r, 0);
        assert.equal(c.g, 5);
        assert.equal(c.b, 2);
        assert.equal(c.a, 1);
    });
    void test('copy', () => {
        const color = new Color(0.7, 0.4, 1, 0.15);
        const copy = color.copy();

        assert.equal(copy.r, 0.7);
        assert.equal(copy.g, 0.4);
        assert.equal(copy.b, 1);
        assert.equal(copy.a, 0.15);

        checkColorIndependence(color, copy);
    });
    void test('over', () => {
        const c1 = new Color(0.42, 0.63, 0.17, 0);
        const c2 = new Color(0.32, 0.57, 0.44);

        c1.over(c2);

        assert.equal(c1.r, 0.32);
        assert.equal(c1.g, 0.57);
        assert.equal(c1.b, 0.44);
        assert.equal(c1.a, 1);

        c1.r = 0.42;
        c1.g = 0.63;
        c1.b = 0.17;
        c1.a = 1;
        c1.over(c2);

        assert.equal(c1.r, 0.42);
        assert.equal(c1.g, 0.63);
        assert.equal(c1.b, 0.17);
        assert.equal(c1.a, 1);

        c1.a = 0.46;
        c2.a = 0.72;
        c1.over(c2);

        //I don't really know how to check it, so it may be wrong
        assert.equal(Math.abs(c1.r - 0.37) < 0.01, true);
        assert.equal(Math.abs(c1.g - 0.60) < 0.01, true);
        assert.equal(Math.abs(c1.b - 0.29) < 0.01, true);
        assert.equal(Math.abs(c1.a - 0.84) < 0.01, true);

        checkColorIndependence(c1, c2);
    });
    void test('under', () => {
        const c1 = new Color(0.2, 0.3, 0.25);
        const c2 = new Color(0.1, 0.4, 0.7);

        c1.under(c2);

        assert.equal(c1.r, 0.1);
        assert.equal(c1.g, 0.4);
        assert.equal(c1.b, 0.7);
        assert.equal(c1.a, 1);

        c1.r = 0.2;
        c1.g = 0.3;
        c1.b = 0.25;
        c2.a = 0;
        c1.under(c2);

        assert.equal(c1.r, 0.2);
        assert.equal(c1.g, 0.3);
        assert.equal(c1.b, 0.25);
        assert.equal(c1.a, 1);

        c1.a = 0.75;
        c2.a = 0.63;
        c1.under(c2);

        //I don't really know how to check it, so it may be wrong
        assert.equal(Math.abs(c1.r - 0.13) < 0.01, true);
        assert.equal(Math.abs(c1.g - 0.37) < 0.01, true);
        assert.equal(Math.abs(c1.b - 0.56) < 0.01, true);
        assert.equal(Math.abs(c1.a - 0.9) < 0.01, true);

        checkColorIndependence(c1, c2);
    });
    void test('toString', () => {
        const color = new Color(0.6, 0.2, 0.4, 0.8);

        assert.equal(color.toString(), 'Color(0.6, 0.2, 0.4, 0.8)');
    });

    void test('assign', () => {
        const c1 = new Color(0.2, 0.17, 0.34, .04);
        const c2 = new Color(0.87, 0.24, .59, 0.1);

        c1.assign(c2);

        assert.equal(c1.r, 0.87);
        assert.equal(c1.g, 0.24);
        assert.equal(c1.b, .59);
        assert.equal(c1.a, 0.1);
        assert.equal(c2.r, 0.87);
        assert.equal(c2.g, 0.24);
        assert.equal(c2.b, .59);
        assert.equal(c2.a, 0.1);

        checkColorIndependence(c1, c2);
    });
});

export function checkColorIndependence (c1: Color, c2: Color): void {
    const r0 = c1.r;
    const g0 = c1.g;
    const b0 = c1.b;
    const a0 = c1.a;

    const r1 = Math.trunc(Math.random() * 100);
    const g1 = Math.trunc(Math.random() * 100);
    const b1 = Math.trunc(Math.random() * 100);
    const a1 = Math.trunc(Math.random() * 100);
    const r2 = Math.trunc(Math.random() * 100);
    const g2 = Math.trunc(Math.random() * 100);
    const b2 = Math.trunc(Math.random() * 100);
    const a2 = Math.trunc(Math.random() * 100);

    c2.r = r2;
    c2.g = g2;
    c2.b = b2;
    c2.a = a2;

    assert.equal(c1.r, r0);
    assert.equal(c1.g, g0);
    assert.equal(c1.b, b0);
    assert.equal(c1.a, a0);
    assert.equal(c2.r, r2);
    assert.equal(c2.g, g2);
    assert.equal(c2.b, b2);
    assert.equal(c2.a, a2);

    c1.r = r1;
    c1.g = g1;
    c1.b = b1;
    c1.a = a1;

    assert.equal(c1.r, r1);
    assert.equal(c1.g, g1);
    assert.equal(c1.b, b1);
    assert.equal(c1.a, a1);
    assert.equal(c2.r, r2);
    assert.equal(c2.g, g2);
    assert.equal(c2.b, b2);
    assert.equal(c2.a, a2);
}