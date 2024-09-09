import { describe, test } from 'node:test';
import assert from 'node:assert';

import { Color } from '../src';

import { testProperties } from './utils';

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
    void test('equals', () => {
        const c1 = new Color(.46, .34, .85, .74);
        const c2 = new Color(.46, .34, .85, .74);

        assert.equal(c1.equals(c2), true);
        assert.equal(c2.equals(c1), true);

        testProperties(c2, ['r', 'g', 'b', 'a'], 0.43, () => c2.equals(c1) || c1.equals(c2), false);
        testProperties(c2, ['r', 'g', 'b', 'a'], NaN, () => c2.equals(c1) || c1.equals(c2), false);
        testProperties(c2, ['r', 'g', 'b', 'a'], 0, () => c2.equals(c1) || c1.equals(c2), false);

        assert.equal(c1.equals(c2), true);
        assert.equal(c2.equals(c1), true);

        c2.r -= 0.005;
        assert.equal(c1.equals(c2), false);
        assert.equal(c1.equals(c2, 0.01), true);
        c2.r -= 0.006;
        assert.equal(c1.equals(c2, 0.01), false);

        c2.r = .46;
        c2.g += 0.005;
        assert.equal(c1.equals(c2), false);
        assert.equal(c1.equals(c2, 0.01), true);
        c2.g += 0.006;
        assert.equal(c1.equals(c2, 0.01), false);

        c2.g = .34;
        c2.b += 0.008;
        assert.equal(c1.equals(c2), false);
        assert.equal(c1.equals(c2, 0.01), true);
        c2.b += 0.004;
        assert.equal(c1.equals(c2, 0.01), false);

        c2.b = .85;
        c2.a -= 0.001;
        assert.equal(c1.equals(c2), false);
        assert.equal(c1.equals(c2, 0.01), true);
        c2.a -= 0.01;
        assert.equal(c1.equals(c2, 0.01), false);

        c2.a = .74;
        assert.equal(c1.equals(c2), true);
        assert.equal(c2.equals(c1), true);
    });
    void test('valid', () => {
        const c = new Color(0.45, 0.51, 0.23, .8);

        assert.equal(c.valid, true);

        testProperties(c, ['r', 'g', 'b', 'a'], -0.5, () => c.valid, false);
        testProperties(c, ['r', 'g', 'b', 'a'], NaN, () => c.valid, false);
        testProperties(c, ['a'], 1.7, () => c.valid, false);

        assert.equal(c.valid, true);
    });

    void test('reset', () => {
        const c = new Color(0.12, 0.74, 0.25, .35);
        c.reset();

        assert.equal(c.r, 0);
        assert.equal(c.g, 0);
        assert.equal(c.b, 0);
        assert.equal(c.a, 1);
    });

    void test('text', () => {
        const c = new Color(0, 0, 0);

        assert.equal(c.hex, '#000000');
        assert.equal(c.hexa, '#000000ff');
        assert.equal(c.cssRGB, 'rgb(0, 0, 0)');
        assert.equal(c.cssRGBA, 'rgba(0, 0, 0, 1)');

        c.g = 1;
        assert.equal(c.hex, '#00ff00');
        assert.equal(c.hexa, '#00ff00ff');
        assert.equal(c.cssRGB, 'rgb(0, 255, 0)');
        assert.equal(c.cssRGBA, 'rgba(0, 255, 0, 1)');

        c.b = 0.25;
        assert.equal(c.hex, '#00ff40');
        assert.equal(c.hexa, '#00ff40ff');
        assert.equal(c.cssRGB, 'rgb(0, 255, 64)');
        assert.equal(c.cssRGBA, 'rgba(0, 255, 64, 1)');

        c.r = 0.5;
        assert.equal(c.hex, '#80ff40');
        assert.equal(c.hexa, '#80ff40ff');
        assert.equal(c.cssRGB, 'rgb(128, 255, 64)');
        assert.equal(c.cssRGBA, 'rgba(128, 255, 64, 1)');

        c.a = 0.58;
        assert.equal(c.hex, '#80ff40');
        assert.equal(c.hexa, '#80ff4093');
        assert.equal(c.cssRGB, 'rgb(128, 255, 64)');
        assert.equal(c.cssRGBA, 'rgba(128, 255, 64, 0.58)');

        c.r = 4;
        c.g = 2;
        c.b = 1;
        assert.equal(c.hex, '#ff8040');
        assert.equal(c.hexa, '#ff804093');
        assert.equal(c.cssRGB, 'rgb(255, 128, 64)');
        assert.equal(c.cssRGBA, 'rgba(255, 128, 64, 0.58)');
    });
    void test('normalize', () => {
        const c = new Color(167, 74, 211).normalize(255);

        assert.equal(c.hex, '#a74ad3');
        assert.equal(c.hexa, '#a74ad3ff');
        assert.equal(c.cssRGB, 'rgb(167, 74, 211)');
        assert.equal(c.cssRGBA, 'rgba(167, 74, 211, 1)');

        c.r = 5;
        c.g = 2;
        c.b = 1;
        c.normalize();
        assert.equal(c.r, 1);
        assert.equal(c.g, 0.4);
        assert.equal(c.b, 0.2);

        c.r = 0.5;
        c.normalize(1);
        assert.equal(c.r, 0.5);
        assert.equal(c.g, 0.4);
        assert.equal(c.b, 0.2);

        c.normalize();
        assert.equal(c.r, 1);
        assert.equal(c.g, 0.8);
        assert.equal(c.b, 0.4);
    });
    void test('abnormal', () => {
        const c = Color.random(false);

        assert.equal(c.abnormal, false);

        testProperties(c, ['r', 'g', 'b', 'a'], -0.5, () => c.abnormal, true);
        testProperties(c, ['r', 'g', 'b', 'a'], 2, () => c.abnormal, true);
        testProperties(c, ['r', 'g', 'b', 'a'], NaN, () => c.abnormal, true);

        assert.equal(c.abnormal, false);
    });
    void test('random', () => {
        const co = Color.random();

        assert.equal(co.a, 1);
        assert.equal(co.r >= 0 && co.r <= 1, true);
        assert.equal(co.g >= 0 && co.g <= 1, true);
        assert.equal(co.b >= 0 && co.b <= 1, true);

        //this is not guaranteed, but the probability of it being false negative is really low
        assert.equal(co.r !== 0 || co.g !== 0 || co.b !== 0, true);

        const ct = Color.random(false);

        assert.equal(ct.a >= 0 && ct.a <= 1, true);
        assert.equal(ct.r >= 0 && ct.r <= 1, true);
        assert.equal(ct.g >= 0 && ct.g <= 1, true);
        assert.equal(ct.b >= 0 && ct.b <= 1, true);

        //this is not guaranteed, but the probability of it being false negative is really low
        assert.equal(co.r !== 0 || co.g !== 0 || co.b !== 0 || ct.a !== 0, true);
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