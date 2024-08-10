import { describe, test } from 'node:test';
import assert from 'node:assert';

import { checkPointIndependence, checkSizeIndependence } from './utils';

import { Point, Quadrant, Size } from '../src';

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
    void test('reset', () => {
        const point1 = new Point(50, 30);

        point1.reset();
        assert.equal(point1.x, 0);
        assert.equal(point1.y, 0);

        point1.y = NaN;
        assert.equal(point1.valid, false);
        point1.reset();
        assert.equal(point1.valid, true);
        assert.equal(point1.x, 0);
        assert.equal(point1.y, 0);
    });
    void test('min-max', () => {
        const p1 = new Point(20, 70);
        const p2 = new Point(5, 95);

        const min = p1.minimal(p2);
        const max = p1.maximal(p2);

        assert.equal(min.x, 5);
        assert.equal(min.y, 70);
        assert.equal(max.x, 20);
        assert.equal(max.y, 95);

        min.max(p1);
        max.min(p2);

        assert.equal(min.x, 20);
        assert.equal(min.y, 70);
        assert.equal(max.x, 5);
        assert.equal(max.y, 95);

        checkPointIndependence(min, p1);
        checkPointIndependence(min, p2);
        checkPointIndependence(max, p1);
        checkPointIndependence(max, p2);
        checkPointIndependence(min, max);

        const sMin = Point.min(1, 2, 3, 4);
        const sMax = Point.max(1, 2, 3, 4);
        assert.equal(sMin.x, 1);
        assert.equal(sMin.y, 2);
        assert.equal(sMax.x, 3);
        assert.equal(sMax.y, 4);
    });
    void test('quadrant', () => {
        const ref = new Point(5, 5);
        const point = new Point(5, 5);

        assert.equal(point.quadrant(ref), Quadrant.all);

        point.x = 7;
        point.y = 7;
        assert.equal(point.quadrant(ref), Quadrant.first);

        point.x = 5;
        assert.equal(point.quadrant(ref), Quadrant.firstSecond);

        point.x = 3;
        assert.equal(point.quadrant(ref), Quadrant.second);

        point.y = 5;
        assert.equal(point.quadrant(ref), Quadrant.secondThird);

        point.y = 3;
        assert.equal(point.quadrant(ref), Quadrant.third);

        point.x = 5;
        assert.equal(point.quadrant(ref), Quadrant.thirdForth);

        point.x = 7;
        assert.equal(point.quadrant(ref), Quadrant.forth);

        point.y = 5;
        assert.equal(point.quadrant(ref), Quadrant.forthFirst);
    });
});

