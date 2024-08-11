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
});