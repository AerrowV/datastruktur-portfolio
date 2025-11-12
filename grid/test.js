// Taget fra Andrés Repository

import { strict as assert } from 'assert';
import Grid from './grid.js';

describe('Grid', function () {
  const rows = 3;
  const cols = 4;

  // helper for sorting coord arrays
  const sortCoords = (a, b) => (a.row - b.row) || (a.col - b.col);
  const valueAt = (r, c) => r * cols + c;

  let grid;

  beforeEach(function () {
    grid = new Grid(rows, cols);
  });

  describe('structure', function () {
    it('rows() returns the configured number of rows', function () {
      assert.equal(grid.rows(), rows);
    });

    it('cols() returns the configured number of cols', function () {
      assert.equal(grid.cols(), cols);
    });

    it('size() returns rows * cols', function () {
      assert.equal(grid.size(), rows * cols);
    });
  });

  describe('index mapping', function () {
    it('indexFor() maps all in-bounds cells correctly', function () {
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const expected = r * cols + c;
          assert.equal(grid.indexFor({ row: r, col: c }), expected);
        }
      }
    });

    it('rowColFor() maps indices to row/col correctly', function () {
      // 0 -> (0,0), last -> (rows-1, cols-1)
      const first = grid.rowColFor(0);
      assert.deepEqual(first, { row: 0, col: 0 });

      const last = grid.rowColFor(rows * cols - 1);
      assert.deepEqual(last, { row: rows - 1, col: cols - 1 });

      // all indices round-trip
      for (let i = 0; i < rows * cols; i++) {
        const rc = grid.rowColFor(i);
        assert.ok(typeof rc.row === 'number' && typeof rc.col === 'number');
        assert.equal(grid.indexFor(rc), i);
      }
    });

    it('indexFor(rowColFor(i)) === i for all i in range', function () {
      for (let i = 0; i < grid.size(); i++) {
        const rc = grid.rowColFor(i);
        assert.equal(grid.indexFor(rc), i);
      }
    });

    it('rowColFor(indexFor({row,col})) === {row,col} for all cells', function () {
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = grid.indexFor({ row: r, col: c });
          const rc = grid.rowColFor(idx);
          assert.deepEqual(rc, { row: r, col: c });
        }
      }
    });

    it('indexFor returns undefined for out-of-bounds', function () {
      assert.equal(grid.indexFor({ row: -1, col: 0 }), undefined);
      assert.equal(grid.indexFor({ row: 0, col: -1 }), undefined);
      assert.equal(grid.indexFor({ row: rows, col: 0 }), undefined);
      assert.equal(grid.indexFor({ row: 0, col: cols }), undefined);
      assert.equal(grid.indexFor({ row: rows, col: cols }), undefined);
    });

    it('rowColFor returns undefined for out-of-bounds index', function () {
      assert.equal(grid.rowColFor(-1), undefined);
      assert.equal(grid.rowColFor(rows * cols), undefined);
      assert.equal(grid.rowColFor(9999), undefined);
    });
  });

  describe('set/get and fill', function () {
    it('set() stores values and get() retrieves them', function () {
      grid.set({ row: 0, col: 0 }, 'A');
      grid.set({ row: 1, col: 2 }, 'B');
      grid.set({ row: 2, col: 3 }, 'C');

      assert.equal(grid.get({ row: 0, col: 0 }), 'A');
      assert.equal(grid.get({ row: 1, col: 2 }), 'B');
      assert.equal(grid.get({ row: 2, col: 3 }), 'C');
      assert.equal(grid.get({ row: 2, col: 2 }), null); // untouched cell stays default
    });

    it('get() returns undefined for out-of-bounds', function () {
      assert.equal(grid.get({ row: -1, col: 0 }), undefined);
      assert.equal(grid.get({ row: 0, col: -1 }), undefined);
      assert.equal(grid.get({ row: rows, col: 0 }), undefined);
      assert.equal(grid.get({ row: 0, col: cols }), undefined);
    });

    it('set() on out-of-bounds is ignored (no throw, no effect)', function () {
      assert.doesNotThrow(() => {
        grid.set({ row: -1, col: 0 }, 'X');
        grid.set({ row: 0, col: cols }, 'Y');
      });
      // in-bounds cell still default null
      assert.equal(grid.get({ row: 0, col: 0 }), null);
    });

    it('fill() writes the value into all cells', function () {
      grid.fill('X');
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          assert.equal(grid.get({ row: r, col: c }), 'X');
        }
      }
    });

    it('fill() can be followed by set() to override specific cells', function () {
      grid.fill(0);
      grid.set({ row: 1, col: 1 }, 42);
      assert.equal(grid.get({ row: 1, col: 1 }), 42);
      assert.equal(grid.get({ row: 0, col: 0 }), 0);
    });
  });

  describe('directional accessors', function () {
    beforeEach(function () {
      // set distinct values for easy verification
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          grid.set({ row: r, col: c }, valueAt(r, c));
        }
      }
    });

    it('east() returns the cell to the right; undefined at row end', function () {
      const mid = grid.east({ row: 1, col: 1 });
      assert.deepEqual(mid, { row: 1, col: 2, value: valueAt(1, 2) });

      const atEnd = grid.east({ row: 2, col: cols - 1 });
      assert.equal(atEnd, undefined);
    });

    it('west() returns the cell to the left; undefined at row start', function () {
      const mid = grid.west({ row: 1, col: 2 });
      assert.deepEqual(mid, { row: 1, col: 1, value: valueAt(1, 1) });

      const atStart = grid.west({ row: 0, col: 0 });
      assert.equal(atStart, undefined);
    });

    it('south() returns the cell below; undefined at bottom', function () {
      const mid = grid.south({ row: 0, col: 1 });
      assert.deepEqual(mid, { row: 1, col: 1, value: valueAt(1, 1) });

      const atBottom = grid.south({ row: rows - 1, col: 3 });
      assert.equal(atBottom, undefined);
    });

    it('north() returns the cell above; undefined at top', function () {
      const mid = grid.north({ row: 2, col: 2 });
      assert.deepEqual(mid, { row: 1, col: 2, value: valueAt(1, 2) });

      const atTop = grid.north({ row: 0, col: 2 });
      assert.equal(atTop, undefined);
    });

    it('nextInRow() equals east() and nextInCol() equals south()', function () {
      const start = { row: 1, col: 1 };
      assert.deepEqual(grid.nextInRow(start), grid.east(start));
      assert.deepEqual(grid.nextInCol(start), grid.south(start));

      const endRow = { row: 1, col: cols - 1 };
      assert.equal(grid.nextInRow(endRow), undefined);

      const endCol = { row: rows - 1, col: 1 };
      assert.equal(grid.nextInCol(endCol), undefined);
    });
  });

  describe('neighbours and neighbourValues', function () {
    beforeEach(function () {
      // fill grid with distinct values
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          grid.set({ row: r, col: c }, valueAt(r, c));
        }
      }
    });

    it('neighbours() returns all 8-adjacent cells for interior cell', function () {
      // For 3x4 grid, interior cell (1,1) has 8 neighbors
      const expected = [
        { row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 },
        { row: 1, col: 0 },                     { row: 1, col: 2 },
        { row: 2, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 2 },
      ];
      const nbs = grid.neighbours({ row: 1, col: 1 }).slice().sort(sortCoords);
      assert.deepEqual(nbs, expected.sort(sortCoords));
    });

    it('neighbours() excludes out-of-bounds cells at edges/corners', function () {
      // top-left corner has 3 neighbors
      const tl = grid.neighbours({ row: 0, col: 0 }).slice().sort(sortCoords);
      const expectedTL = [
        { row: 0, col: 1 }, { row: 1, col: 0 }, { row: 1, col: 1 },
      ].sort(sortCoords);
      assert.deepEqual(tl, expectedTL);

      // edge (not corner) e.g., (0,2) has 5 neighbors
      const edge = grid.neighbours({ row: 0, col: 2 });
      assert.equal(edge.length, 5);
    });

    it('neighbourValues() returns values for all neighbor cells', function () {
      const vals = grid.neighbourValues({ row: 1, col: 1 }).sort((a, b) => a - b);
      const expectedVals = [
        valueAt(0, 0), valueAt(0, 1), valueAt(0, 2),
        valueAt(1, 0),                 valueAt(1, 2),
        valueAt(2, 0), valueAt(2, 1), valueAt(2, 2),
      ].sort((a, b) => a - b);
      assert.deepEqual(vals, expectedVals);
    });

    it('neighbours() and neighbourValues() return empty arrays for out-of-bounds input', function () {
      assert.deepEqual(grid.neighbours({ row: -1, col: 0 }), []);
      assert.deepEqual(grid.neighbours({ row: rows, col: cols }), []);
      assert.deepEqual(grid.neighbourValues({ row: -1, col: 0 }), []);
    });
  });

  describe('bounds behavior consistency', function () {
    it('directional methods return undefined for out-of-bounds input', function () {
      assert.equal(grid.north({ row: -1, col: 0 }), undefined);
      assert.equal(grid.south({ row: rows, col: 0 }), undefined);
      assert.equal(grid.west({ row: 0, col: -1 }), undefined);
      assert.equal(grid.east({ row: 0, col: cols }), undefined);
      assert.equal(grid.nextInRow({ row: 1, col: cols }), undefined);
      assert.equal(grid.nextInCol({ row: rows, col: 1 }), undefined);
    });
  });
});