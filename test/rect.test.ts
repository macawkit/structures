import { describe, test } from 'node:test';
import assert from 'node:assert';

import { checkRectIndependence } from './utils';

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
});