import { describe, test } from 'node:test';
import assert from 'node:assert';

import { Point } from '../src';

void describe('Point', () => {
    void test('creation', () => {
        const point = new Point(20, 40);

        assert.equal(point.x, 20);
        assert.equal(point.y, 40);
    });
    void test('copy', () => {
        const point1 = new Point(10, 5);
        const point2 = point1.copy();

        assert.equal(point1.x, 10);
        assert.equal(point1.y, 5);
        assert.equal(point2.x, 10);
        assert.equal(point2.y, 5);

        checkIndependence(point1, point2);
    });
    void test('add', () => {
        const point1 = new Point(15, 20);
        const point2 = new Point(5, 30);

        point1.add(point2);

        assert.equal(point1.x, 20);
        assert.equal(point1.y, 50);
        assert.equal(point2.x, 5);
        assert.equal(point2.y, 30);

        checkIndependence(point1, point2);
    });
    void test('sub', () => {
        const point1 = new Point(40, 35);
        const point2 = new Point(20, 10);

        point1.sub(point2);

        assert.equal(point1.x, 20);
        assert.equal(point1.y, 25);
        assert.equal(point2.x, 20);
        assert.equal(point2.y, 40);

        checkIndependence(point1, point2);
    });
});

function checkIndependence (p1: Point, p2: Point) {
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