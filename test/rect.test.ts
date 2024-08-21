import { describe, test } from 'node:test';
import assert from 'node:assert';

import { checkPointIndependence, checkRectIndependence } from './utils';

import { Rect, Point, Size } from '../src';

void describe('Rect', () => {
    void test('creation', () => {
        const rect = new Rect(new Point(2, 3), new Size(10, 10));

        assert.equal(rect.x, 2);
        assert.equal(rect.y, 3);
        assert.equal(rect.width, 10);
        assert.equal(rect.height, 10);

        const rect2 = Rect.fromArray([2, 3, 10, 10]);
        assert.equal(rect2.x, 2);
        assert.equal(rect2.y, 3);
        assert.equal(rect2.width, 10);
        assert.equal(rect2.height, 10);

        const rect3 = Rect.fromNumbers(2, 3, 10, 10);
        assert.equal(rect3.x, 2);
        assert.equal(rect3.y, 3);
        assert.equal(rect3.width, 10);
        assert.equal(rect3.height, 10);
    });
    void test('copy', () => {
        const rect = Rect.fromNumbers(5, 15, 30, 20);
        const copy = rect.copy();

        assert.equal(rect.x, 5);
        assert.equal(rect.y, 15);
        assert.equal(rect.width, 30);
        assert.equal(rect.height, 20);
        assert.equal(copy.x, 5);
        assert.equal(copy.y, 15);
        assert.equal(copy.width, 30);
        assert.equal(copy.height, 20);

        checkRectIndependence(rect, copy);
    });
    void test('moving', () => {
        const rect = Rect.fromNumbers(5, 5, 10, 10);

        rect.x += 5;
        assert.equal(rect.point.x, 10);
        assert.equal(rect.x, 10);
        assert.equal(rect.y, 5);

        rect.y -= 2;
        assert.equal(rect.point.y, 3);
        assert.equal(rect.y, 3);
        assert.equal(rect.x, 10);

        rect.point.x = 20;
        assert.equal(rect.point.x, 20);
        assert.equal(rect.x, 20);
        assert.equal(rect.y, 3);

        rect.point.y = 30;
        assert.equal(rect.point.y, 30);
        assert.equal(rect.y, 30);
        assert.equal(rect.x, 20);

        rect.point = new Point(7, 8);
        assert.equal(rect.x, 7);
        assert.equal(rect.y, 8);

        rect.point.move(3, 2);
        assert.equal(rect.x, 10);
        assert.equal(rect.y, 10);
    });
    void test('resizing', () => {
        const rect = Rect.fromNumbers(3, 3, 22, 21);

        rect.width += 5;
        assert.equal(rect.size.width, 27);
        assert.equal(rect.width, 27);
        assert.equal(rect.height, 21);

        rect.height -= 7;
        assert.equal(rect.size.height, 14);
        assert.equal(rect.height, 14);
        assert.equal(rect.width, 27);

        rect.size.width = 17;
        assert.equal(rect.size.width, 17);
        assert.equal(rect.width, 17);
        assert.equal(rect.height, 14);

        rect.size.height = 4;
        assert.equal(rect.size.height, 4);
        assert.equal(rect.height, 4);
        assert.equal(rect.width, 17);

        rect.size = new Size(9, 9);
        assert.equal(rect.width, 9);
        assert.equal(rect.height, 9);

        rect.size.adjust(-4, 1);
        assert.equal(rect.width, 5);
        assert.equal(rect.height, 10);
    });
    void test('twoPointer', () => {
        const rect = Rect.fromNumbers(10, 10, 20, 20);
        assert.equal(rect.x1, 10);
        assert.equal(rect.y1, 10);
        assert.equal(rect.x2, 30);
        assert.equal(rect.y2, 30);
        assert.equal(rect.width, 20);
        assert.equal(rect.height, 20);

        rect.point.move(5, -5);
        assert.equal(rect.x1, 15);
        assert.equal(rect.y1, 5);
        assert.equal(rect.x2, 35);
        assert.equal(rect.y2, 25);
        assert.equal(rect.width, 20);
        assert.equal(rect.height, 20);

        rect.size.adjust(-1, 2);
        assert.equal(rect.x1, 15);
        assert.equal(rect.y1, 5);
        assert.equal(rect.x2, 34);
        assert.equal(rect.y2, 27);
        assert.equal(rect.width, 19);
        assert.equal(rect.height, 22);

        rect.p1 = new Point(10, 20);
        assert.equal(rect.x1, 10);
        assert.equal(rect.y1, 20);
        assert.equal(rect.x2, 34);
        assert.equal(rect.y2, 27);
        assert.equal(rect.width, 24);
        assert.equal(rect.height, 7);

        rect.p2 = new Point(50, 40);
        assert.equal(rect.x1, 10);
        assert.equal(rect.y1, 20);
        assert.equal(rect.x2, 50);
        assert.equal(rect.y2, 40);
        assert.equal(rect.width, 40);
        assert.equal(rect.height, 20);

        checkPointIndependence(rect.point, rect.p1);
        checkPointIndependence(rect.point, rect.p2);
        checkPointIndependence(rect.p1, rect.p2);
    });
    void test('equals', () => {
        const rect = Rect.from2PointsNumbers(5, 5, 10, 10);
        const copy = rect.copy();

        assert.equal(copy.x, 5);
        assert.equal(copy.y, 5);
        assert.equal(copy.width, 5);
        assert.equal(copy.height, 5);
        assert.equal(rect.point.equals(copy.point), true);
        assert.equal(rect.size.equals(copy.size), true);
        assert.equal(rect.equals(copy), true);

        copy.x = 7;
        assert.equal(rect.point.equals(copy.point), false);
        assert.equal(rect.size.equals(copy.size), true);
        assert.equal(rect.equals(copy), false);

        rect.x = 7;
        assert.equal(rect.point.equals(copy.point), true);
        assert.equal(rect.size.equals(copy.size), true);
        assert.equal(rect.equals(copy), true);

        copy.height = 20;
        assert.equal(rect.point.equals(copy.point), true);
        assert.equal(rect.size.equals(copy.size), false);
        assert.equal(rect.equals(copy), false);

        rect.height = 20;
        assert.equal(rect.point.equals(copy.point), true);
        assert.equal(rect.size.equals(copy.size), true);
        assert.equal(rect.equals(copy), true);

        copy.point.reset();
        copy.size.reset();
        assert.equal(rect.point.equals(copy.point), false);
        assert.equal(rect.size.equals(copy.size), false);
        assert.equal(rect.equals(copy), false);
    });
    void test('reset', () => {
        const rect = Rect.from2PointsNumbers(10, 5, 30, 35);

        assert.equal(rect.x, 10);
        assert.equal(rect.y, 5);
        assert.equal(rect.width, 20);
        assert.equal(rect.height, 30);

        rect.reset();
        assert.equal(rect.x, 0);
        assert.equal(rect.y, 0);
        assert.equal(rect.width, 0);
        assert.equal(rect.height, 0);
    });
    void test('intersect', () => {
        const r1 = Rect.fromNumbers(-5, -10, 5, 10);
        r1.intersect(Rect.fromNumbers(0, -1, 7, 32));

        assert.equal(r1.x, 0);
        assert.equal(r1.y, 0);
        assert.equal(r1.width, 0);
        assert.equal(r1.height, 0);

        r1.set(10, 20, 40, 50);

        const r2 = Rect.fromNumbers(13, 24, 17, 32);
        r1.intersect(r2);

        assert.equal(r1.equals(r2), true);
        assert.equal(r1.x, 13);
        assert.equal(r1.y, 24);
        assert.equal(r1.width, 17);
        assert.equal(r1.height, 32);
        assert.equal(r2.x, 13);
        assert.equal(r2.y, 24);
        assert.equal(r2.width, 17);
        assert.equal(r2.height, 32);
        checkRectIndependence(r1, r2);

        r1.set(1, 3, 30, 30);
        r2.set(5, 8, 50, 20);

        r1.intersect(r2);
        assert.equal(r1.x, 5);
        assert.equal(r1.y, 8);
        assert.equal(r1.width, 26);
        assert.equal(r1.height, 20);
        assert.equal(r2.x, 5);
        assert.equal(r2.y, 8);
        assert.equal(r2.width, 50);
        assert.equal(r2.height, 20);
        checkRectIndependence(r1, r2);

        r2.reset();
        r1.intersect(r2);
        assert.equal(r1.x, 0);
        assert.equal(r1.y, 0);
        assert.equal(r1.width, 0);
        assert.equal(r1.height, 0);
        checkRectIndependence(r1, r2);

        r1.set(32, 33, 5, 10);
        r2.set(2, 7, 12, 21);
        r1.intersect(r2);
        assert.equal(r1.x, 0);
        assert.equal(r1.y, 0);
        assert.equal(r1.width, 0);
        assert.equal(r1.height, 0);
        assert.equal(r2.x, 2);
        assert.equal(r2.y, 7);
        assert.equal(r2.width, 12);
        assert.equal(r2.height, 21);
        checkRectIndependence(r1, r2);

        r1.set(15, 20, 15, 10);
        r2.set(10, 5, 45, 50);
        r1.intersect(r2);
        assert.equal(r1.x, 15);
        assert.equal(r1.y, 20);
        assert.equal(r1.width, 15);
        assert.equal(r1.height, 10);
        assert.equal(r2.x, 10);
        assert.equal(r2.y, 5);
        assert.equal(r2.width, 45);
        assert.equal(r2.height, 50);
        checkRectIndependence(r1, r2);
    });
    void test('intersection', () => {
        const r1 = Rect.from2PointsNumbers(-24, -65, -13, -52);
        const r2 = Rect.from2PointsNumbers(-5, -6, 9, 4);
        const r3 = r1.intersection(r2);

        assert.equal(r1.x, -24);
        assert.equal(r1.y, -65);
        assert.equal(r1.width, 11);
        assert.equal(r1.height, 13);
        assert.equal(r2.x, -5);
        assert.equal(r2.y, -6);
        assert.equal(r2.width, 14);
        assert.equal(r2.height, 10);
        assert.equal(r3.x, 0);
        assert.equal(r3.y, 0);
        assert.equal(r3.width, 0);
        assert.equal(r3.height, 0);
        checkRectIndependence(r1, r2);
        checkRectIndependence(r1, r3);
        checkRectIndependence(r3, r2);

        r1.set(-24, -65, 13, 12);
        r2.set(-5, -6, 9, 4);

        const r4 = r2.intersection(r1);
        assert.equal(r1.x, -24);
        assert.equal(r1.y, -65);
        assert.equal(r1.width, 13);
        assert.equal(r1.height, 12);
        assert.equal(r2.x, -5);
        assert.equal(r2.y, -6);
        assert.equal(r2.width, 9);
        assert.equal(r2.height, 4);
        assert.equal(r4.x, 0);
        assert.equal(r4.y, 0);
        assert.equal(r4.width, 0);
        assert.equal(r4.height, 0);
        checkRectIndependence(r1, r2);
        checkRectIndependence(r1, r4);
        checkRectIndependence(r4, r2);

        r1.set(-7, 8, 36, 21);
        r2.set(4, -3, 12, 19);
        const r5 = r1.intersection(r2);

        assert.equal(r1.x, -7);
        assert.equal(r1.y, 8);
        assert.equal(r1.width, 36);
        assert.equal(r1.height, 21);
        assert.equal(r2.x, 4);
        assert.equal(r2.y, -3);
        assert.equal(r2.width, 12);
        assert.equal(r2.height, 19);
        assert.equal(r5.x, 4);
        assert.equal(r5.y, 8);
        assert.equal(r5.width, 12);
        assert.equal(r5.height, 8);
        assert.equal(r5.equals(r2.intersection(r1)), true);
        checkRectIndependence(r1, r2);
        checkRectIndependence(r1, r5);
        checkRectIndependence(r5, r2);
    });
    void test('union', () => {
        const r1 = new Rect(new Point(4, 6), new Size(12, 14));
        const r2 = new Rect(new Point(9, 5), new Size(9, 3));

        r1.union(r2);
        assert.equal(r1.x, 4);
        assert.equal(r1.y, 5);
        assert.equal(r1.width, 14);
        assert.equal(r1.height, 15);
        assert.equal(r2.x, 9);
        assert.equal(r2.y, 5);
        assert.equal(r2.width, 9);
        assert.equal(r2.height, 3);
        checkRectIndependence(r1, r2);
    });
    void test('united', () => {
        const r1 = new Rect(new Point(2, 7), new Size(8, 3));
        const r2 = new Rect(new Point(-5, 0), new Size(7, 21));

        const r3 = r1.united(r2);
        assert.equal(r3.equals(r2.united(r1)), true);
        assert.equal(r1.x, 2);
        assert.equal(r1.y, 7);
        assert.equal(r1.width, 8);
        assert.equal(r1.height, 3);
        assert.equal(r2.x, -5);
        assert.equal(r2.y, 0);
        assert.equal(r2.width, 7);
        assert.equal(r2.height, 21);
        assert.equal(r3.x, -5);
        assert.equal(r3.y, 0);
        assert.equal(r3.width, 15);
        assert.equal(r3.height, 21);
        checkRectIndependence(r1, r2);
        checkRectIndependence(r3, r2);
        checkRectIndependence(r3, r1);
    });
    void test('toString', () => {
        const rect = new Rect(new Point(782, 378), new Size(13, 938));
        assert.equal(rect.toString(), 'Rect(782, 378, 13, 938)');
    });
});