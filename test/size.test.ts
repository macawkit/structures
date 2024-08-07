import { describe, test } from 'node:test';
import assert from 'node:assert';

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

        checkIndependence(size1, size2);
    });
    void test('add', () => {
        const size1 = new Size(15, 20);
        const size2 = new Size(5, 30);

        size1.add(size2);

        assert.equal(size1.width, 20);
        assert.equal(size1.height, 50);
        assert.equal(size2.width, 5);
        assert.equal(size2.height, 30);

        checkIndependence(size1, size2);
    });
    void test('sub', () => {
        const size1 = new Size(40, 35);
        const size2 = new Size(20, 10);

        size1.sub(size2);

        assert.equal(size1.width, 20);
        assert.equal(size1.height, 25);
        assert.equal(size2.width, 20);
        assert.equal(size2.height, 10);

        checkIndependence(size1, size2);
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

        checkIndependence(size1, size2);
        checkIndependence(size1, size3);
        checkIndependence(size2, size3);
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

        checkIndependence(size1, size2);
        checkIndependence(size1, size3);
        checkIndependence(size2, size3);
    });
    void test('equals', () => {
        const size1 = new Size(74, 28);
        const size2 = new Size(74, 28);

        assert.equal(size1.equals(size2), true);
        assert.equal(size2.equals(size1), true);
        checkIndependence(size1, size2);

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
});

function checkIndependence (s1: Size, s2: Size) {
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