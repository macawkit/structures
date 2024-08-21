import { describe, test } from 'node:test';
import assert from 'node:assert';

import { checkSizeIndependence } from './utils';

import { Size } from '../src';

void describe('Size', () => {
    void test('creation', () => {
        const size = new Size(30, 10);

        assert.equal(size.width, 30);
        assert.equal(size.height, 10);
    });
    void test('copy', () => {
        const size1 = new Size(10, 5);
        const size2 = size1.copy();

        assert.equal(size1.width, 10);
        assert.equal(size1.height, 5);
        assert.equal(size2.width, 10);
        assert.equal(size2.height, 5);

        checkSizeIndependence(size1, size2);
    });
    void test('add', () => {
        const size1 = new Size(15, 20);
        const size2 = new Size(5, 30);

        size1.add(size2);

        assert.equal(size1.width, 20);
        assert.equal(size1.height, 50);
        assert.equal(size2.width, 5);
        assert.equal(size2.height, 30);

        checkSizeIndependence(size1, size2);
    });
    void test('sub', () => {
        const size1 = new Size(40, 35);
        const size2 = new Size(20, 10);

        size1.sub(size2);

        assert.equal(size1.width, 20);
        assert.equal(size1.height, 25);
        assert.equal(size2.width, 20);
        assert.equal(size2.height, 10);

        checkSizeIndependence(size1, size2);
    });
    void test('plus', () => {
        const size1 = new Size(60, 10);
        const size2 = new Size(25, 30);

        const size3 = size1.plus(size2);

        assert.equal(size1.width, 60);
        assert.equal(size1.height, 10);
        assert.equal(size2.width, 25);
        assert.equal(size2.height, 30);
        assert.equal(size3.width, 85);
        assert.equal(size3.height, 40);

        checkSizeIndependence(size1, size2);
        checkSizeIndependence(size1, size3);
        checkSizeIndependence(size2, size3);
    });
    void test('minus', () => {
        const size1 = new Size(37, 18);
        const size2 = new Size(7, 8);

        const size3 = size1.minus(size2);

        assert.equal(size1.width, 37);
        assert.equal(size1.height, 18);
        assert.equal(size2.width, 7);
        assert.equal(size2.height, 8);
        assert.equal(size3.width, 30);
        assert.equal(size3.height, 10);

        checkSizeIndependence(size1, size2);
        checkSizeIndependence(size1, size3);
        checkSizeIndependence(size2, size3);
    });
    void test('equals', () => {
        const size1 = new Size(74, 28);
        const size2 = new Size(74, 28);

        assert.equal(size1.equals(size2), true);
        assert.equal(size2.equals(size1), true);
        checkSizeIndependence(size1, size2);

        size1.width = 72;
        size1.height = 27;
        size2.width = 72;
        size2.height = 27;
        assert.equal(size1.equals(size2), true);

        size2.width += 1;
        assert.equal(size1.equals(size2), false);
        size2.width -= 1;
        assert.equal(size1.equals(size2), true);
        size2.height -= 1;
        assert.equal(size1.equals(size2), false);
        size2.height += 1;
        assert.equal(size1.equals(size2), true);

        size2.height += 0.05;
        assert.equal(size1.equals(size2), false);
        assert.equal(size1.equals(size2, 0.01), false);
        assert.equal(size1.equals(size2, 0.1), true);
        size2.height -= 0.055;
        assert.equal(size1.equals(size2, 0.01), true);
        size2.width += 0.005;
        assert.equal(size1.equals(size2, 0.01), true);
        size2.width += 0.006;
        assert.equal(size1.equals(size2, 0.01), false);
        assert.equal(size1.equals(size2, 0.1), true);
    });
    void test('valid', () => {
        const size1 = new Size(0, 0);
        assert.equal(size1.valid, true);

        size1.width = -1;
        assert.equal(size1.valid, false);
        size1.height = -1;
        assert.equal(size1.valid, false);
        size1.height = 1;
        assert.equal(size1.valid, false);
        size1.width = -Infinity;
        assert.equal(size1.valid, false);
        size1.width = 0;
        assert.equal(size1.valid, true);

        size1.height = NaN;
        assert.equal(size1.valid, false);
    });
    void test('square', () => {
        const size1 = new Size(9, 16);
        assert.equal(size1.valid, true);
        assert.equal(size1.square, 9 * 16);
    });
    void test('reset', () => {
        const size = new Size(50, 30);

        size.reset();
        assert.equal(size.width, 0);
        assert.equal(size.height, 0);

        size.width = NaN;
        assert.equal(size.valid, false);
        size.reset();
        assert.equal(size.valid, true);
        assert.equal(size.width, 0);
        assert.equal(size.height, 0);
    });
    void test('min-max', () => {
        const size1 = new Size(50, 30);
        const size2 = new Size(10, 80);

        const min = size1.minimal(size2);
        const max = size1.maximal(size2);

        assert.equal(min.width, 10);
        assert.equal(min.height, 30);
        assert.equal(max.width, 50);
        assert.equal(max.height, 80);

        min.max(size1);
        max.min(size2);

        assert.equal(min.width, 50);
        assert.equal(min.height, 30);
        assert.equal(max.width, 10);
        assert.equal(max.height, 80);

        checkSizeIndependence(min, size1);
        checkSizeIndependence(min, size2);
        checkSizeIndependence(max, size1);
        checkSizeIndependence(max, size2);
        checkSizeIndependence(min, max);

        const sMin = Size.min(1, 2, 3, 4);
        const sMax = Size.max(1, 2, 3, 4);
        assert.equal(sMin.width, 1);
        assert.equal(sMin.height, 2);
        assert.equal(sMax.width, 3);
        assert.equal(sMax.height, 4);
    });
    void test('positive', () => {
        const size = new Size(0, 0);
        assert.equal(size.positive, false);

        size.width = 1;
        assert.equal(size.positive, false);

        size.height = 1;
        assert.equal(size.positive, true);

        size.height = NaN;
        assert.equal(size.positive, false);

        size.height = -1;
        size.width = -1;
        assert.equal(size.positive, false);
    });
    void test('change', () => {
        const size = new Size(7, 4);

        size.set(15, 32);
        assert.equal(size.width, 15);
        assert.equal(size.height, 32);

        size.adjust(7, -9);
        assert.equal(size.width, 22);
        assert.equal(size.height, 23);
    });
    void test('toString', () => {
        const size = new Size(640, 480);
        assert.equal(size.toString(), 'Size(640, 480)');
    });
});