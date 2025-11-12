export class Grid {
  constructor(rows, cols) {
    this._rows = rows;
    this._cols = cols;
    this.arr = new Array(rows * cols).fill(null);
  }

  rows() {
    return this._rows;
  }

  cols() {
    return this._cols;
  }

  size() {
    return this.arr.length;
  }

  fill(value) {
    this.arr.fill(value);
  }

  outOfBounds(row, col) {
    return row < 0 || row >= this._rows || col < 0 || col >= this._cols;
  }

  indexFor({ row, col }) {
    if (this.outOfBounds(row, col)) {
      return undefined;
    }

    const index = row * this._cols + col;

    return index;
  }

  rowColFor(index) {
    if (index < 0 || index >= this.arr.length) {
      return undefined;
    }

    const rowCol = {
      row: Math.floor(index / this._cols),
      col: index % this._cols,
    };

    return rowCol;
  }

  set({ row, col }, value) {
    const index = this.indexFor({ row, col });

    if (index !== undefined) {
      this.arr[index] = value;
    }
  }

  get({ row, col }) {
    const index = this.indexFor({ row, col });

    if (index !== undefined) {
      return this.arr[index];
    }
  }

  neighbours({ row, col }) {
    const list = [];
    
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) { 
          continue;
        }

        const r = row + dr;
        const c = col + dc;

        if (!this.outOfBounds(r, c)) {
          list.push({ row: r, col: c });
        }
      }
    }
    return list;
  }

  neighbourValues({ row, col }) {
    if (this.outOfBounds(row, col)){
      return [];
    }

    const values = [];
    for (const n of this.neighbours({ row, col })) {
      values.push(this.get(n));
    }
    
    return values;
  }

  nextInRow({ row, col }) {
    return this.east({ row, col });
  }

  nextInCol({ row, col }) {
    return this.south({ row, col });
  }

  north({ row, col }) {
    const r = row - 1;

    if (this.outOfBounds(r, col)) {
      return undefined;
    }

    const rowCol = { row: r, col, value: this.get({ row: r, col }) };

    return rowCol;
  }

  south({ row, col }) {
    const r = row + 1;

    if (this.outOfBounds(r, col)) {
      return undefined;
    }

    const rowCol = { row: r, col, value: this.get({ row: r, col }) };

    return rowCol;
  }

  west({ row, col }) {
    const c = col - 1;

    if (this.outOfBounds(row, c)) {
      return undefined;
    }

    const rowCol = { row, col: c, value: this.get({ row, col: c }) };

    return rowCol;
  }

  east({ row, col }) {
    const c = col + 1;

    if (this.outOfBounds(row, c)) {
      return undefined;
    }

    const rowCol = { row, col: c, value: this.get({ row, col: c }) };

    return rowCol;
  }
}
