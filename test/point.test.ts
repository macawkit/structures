import { describe, test } from 'node:test';
import assert from 'node:assert';

import { checkPointIndependence } from './utils';

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

        checkPointIndependence(point1, point2);
    });
    void test('add', () => {
        const point1 = new Point(15, 20);
        const point2 = new Point(5, 30);

        point1.add(point2);

        assert.equal(point1.x, 20);
        assert.equal(point1.y, 50);
        assert.equal(point2.x, 5);
        assert.equal(point2.y, 30);

        checkPointIndependence(point1, point2);
    });
    void test('sub', () => {
        const point1 = new Point(40, 35);
        const point2 = new Point(20, 10);

        point1.sub(point2);

        assert.equal(point1.x, 20);
        assert.equal(point1.y, 25);
        assert.equal(point2.x, 20);
        assert.equal(point2.y, 10);

        checkPointIndependence(point1, point2);
    });
    void test('plus', () => {
        const point1 = new Point(60, 10);
        const point2 = new Point(25, 30);

        const point3 = point1.plus(point2);

        assert.equal(point1.x, 60);
        assert.equal(point1.y, 10);
        assert.equal(point2.x, 25);
        assert.equal(point2.y, 30);
        assert.equal(point3.x, 85);
        assert.equal(point3.y, 40);

        checkPointIndependence(point1, point2);
        checkPointIndependence(point1, point3);
        checkPointIndependence(point2, point3);
    });
    void test('minus', () => {
        const point1 = new Point(37, 18);
        const point2 = new Point(7, 8);

        const point3 = point1.minus(point2);

        assert.equal(point1.x, 37);
        assert.equal(point1.y, 18);
        assert.equal(point2.x, 7);
        assert.equal(point2.y, 8);
        assert.equal(point3.x, 30);
        assert.equal(point3.y, 10);

        checkPointIndependence(point1, point2);
        checkPointIndependence(point1, point3);
        checkPointIndependence(point2, point3);
    });
    void test('equals', () => {
        const point1 = new Point(74, 28);
        const point2 = new Point(74, 28);

        assert.equal(point1.equals(point2), true);
        assert.equal(point2.equals(point1), true);
        checkPointIndependence(point1, point2);

        point1.x = 72;
        point1.y = 27;
        point2.x = 72;
        point2.y = 27;
        assert.equal(point1.equals(point2), true);

        point2.x += 1;
        assert.equal(point1.equals(point2), false);
        point2.x -= 1;
        assert.equal(point1.equals(point2), true);
        point2.y -= 1;
        assert.equal(point1.equals(point2), false);
        point2.y += 1;
        assert.equal(point1.equals(point2), true);

        point2.y += 0.05;
        assert.equal(point1.equals(point2), false);
        assert.equal(point1.equals(point2, 0.01), false);
        assert.equal(point1.equals(point2, 0.1), true);
        point2.y -= 0.055;
        assert.equal(point1.equals(point2, 0.01), true);
        point2.x += 0.005;
        assert.equal(point1.equals(point2, 0.01), true);
        point2.x += 0.006;
        assert.equal(point1.equals(point2, 0.01), false);
        assert.equal(point1.equals(point2, 0.1), true);
    });
    void test('valid', () => {
        const point1 = new Point(0, 0);
        assert.equal(point1.valid, true);

        point1.y = NaN;
        assert.equal(point1.valid, false);
    });
});

