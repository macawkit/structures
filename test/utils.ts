import assert from 'node:assert';

import { Point, Size, Rect } from '../src/index.js';

export function checkPointIndependence (p1: Point, p2: Point): void {
    const x0 = p1.x;
    const y0 = p1.y;

    const x1 = Math.trunc(Math.random() * 100);
    const y1 = Math.trunc(Math.random() * 100);
    const x2 = Math.trunc(Math.random() * 100);
    const y2 = Math.trunc(Math.random() * 100);

    p2.x = x2;
    p2.y = y2;

    assert.equal(p1.x, x0);
    assert.equal(p1.y, y0);
    assert.equal(p2.x, x2);
    assert.equal(p2.y, y2);

    p1.x = x1;
    p1.y = y1;

    assert.equal(p1.x, x1);
    assert.equal(p1.y, y1);
    assert.equal(p2.x, x2);
    assert.equal(p2.y, y2);
}

export function checkSizeIndependence (s1: Size, s2: Size): void {
    const w0 = s1.width;
    const h0 = s1.height;

    const w1 = Math.trunc(Math.random() * 100);
    const h1 = Math.trunc(Math.random() * 100);
    const w2 = Math.trunc(Math.random() * 100);
    const h2 = Math.trunc(Math.random() * 100);

    s2.width = w2;
    s2.height = h2;

    assert.equal(s1.width, w0);
    assert.equal(s1.height, h0);
    assert.equal(s2.width, w2);
    assert.equal(s2.height, h2);

    s1.width = w1;
    s1.height = h1;

    assert.equal(s1.width, w1);
    assert.equal(s1.height, h1);
    assert.equal(s2.width, w2);
    assert.equal(s2.height, h2);
}

export function checkRectIndependence (r1: Rect, r2: Rect): void {
    checkSizeIndependence(r1 as unknown as Size, r2 as unknown as Size);
    checkPointIndependence(r1 as unknown as Point, r2 as unknown as Point);
}

export function testProperties<T extends object, R> (
    subject: T,
    keys: (keyof T)[],
    value: T[keyof T],
    test: () => R,
    result: R
): void {
    for (const key of keys) {
        const original = subject[key];
        subject[key] = value;

        assert.equal(test(), result);
        subject[key] = original;
    }
}