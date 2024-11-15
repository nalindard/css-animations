// @ts-check
// window.onload = () => {
//   console.log(`Say hi...!`);
// };

/** @type {HTMLCanvasElement} */
// @ts-expect-error noProblem here, lol
const maze = document.getElementById("maze");
/** @type {CanvasRenderingContext2D} */
// @ts-ignore
const ctx = maze.getContext("2d");
/** @type {Cell} */
let current;

class Maze {
  /**
   *
   * @param {number} size
   * @param {number} rows
   * @param {number} columns
   */
  constructor(size, rows, columns) {
    this.size = size;
    this.rows = rows;
    this.columns = columns;
    /** @type {Cell[][]} */
    this.grid = [];
    this.stack = [];
  }

  setUp() {
    for (let r = 0; r < this.rows; r++) {
      /** @type {Cell[]} */
      let row = [];
      for (let c = 0; c < this.columns; c++) {
        row.push(new Cell(r, c, this.grid, this.size));
      }
      this.grid.push(row);
    }
    current =
      this.grid[Math.floor(Math.random() * this.rows)][
        Math.floor(Math.random() * this.columns)
      ];
  }

  async draw() {
    // @ts-ignore
    await new Promise((r) => setTimeout(() => r(), 75));

    maze.style.backgroundColor = "transparent";
    maze.width = this.size;
    maze.height = this.size;

    current.visited = true;

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns; c++) {
        let grid = this.grid;
        grid[r][c].show(this.size, this.rows, this.columns);
      }
    }
    let next = current.checkNeighbours();
    if (next) {
      next.visited = true;
      this.stack.push(current);
      current.highlight(this.columns);
      current.removeWall(current, next);
      current = next;
    } else if (this.stack.length > 0) {
      let cell = this.stack.pop();
      current = cell;
      current.highlight(this.columns);
    }

    if (this.stack.length === 0) return;

    window.requestAnimationFrame(() => this.draw());
  }
}

class Cell {
  /**
   *
   * @param {number} rowNum
   * @param {number} colNum
   * @param {Cell[][]} parentGrid
   * @param {number} parentSize
   */
  constructor(rowNum, colNum, parentGrid, parentSize) {
    this.rowNum = rowNum;
    this.colNum = colNum;
    this.parentGrid = parentGrid;
    this.parentSize = parentSize;
    this.visited = false;
    this.walls = {
      topWall: true,
      rightWall: true,
      bottomWall: true,
      leftWall: true,
    };
  }

  checkNeighbours() {
    let grid = this.parentGrid;
    let row = this.rowNum;
    let col = this.colNum;
    let neighbours = [];

    let top = row !== 0 ? grid[row - 1][col] : undefined;
    let right = col !== grid.length - 1 ? grid[row][col + 1] : undefined;
    let bottom = row !== grid.length - 1 ? grid[row + 1][col] : undefined;
    let left = col !== 0 ? grid[row][col - 1] : undefined;

    if (top && !top.visited) neighbours.push(top);
    if (right && !right.visited) neighbours.push(right);
    if (bottom && !bottom.visited) neighbours.push(bottom);
    if (left && !left.visited) neighbours.push(left);

    if (neighbours.length !== 0) {
      let random = Math.floor(Math.random() * neighbours.length);
      return neighbours[random];
    } else {
      return undefined;
    }
  }

  /** @typedef {import("./types").CellDrawFunction} CellDrawFunction */

  /** @type {CellDrawFunction} */
  drawWallTop(x, y, size, columns, rows) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + size / columns, y);
    ctx.stroke();
  }
  /** @type {CellDrawFunction} */
  drawWallRight(x, y, size, columns, rows) {
    ctx.beginPath();
    ctx.moveTo(x + size / columns, y);
    ctx.lineTo(x + size / columns, y + size / rows);
    ctx.stroke();
  }
  /** @type {CellDrawFunction} */
  drawWallBottom(x, y, size, columns, rows) {
    ctx.beginPath();
    ctx.moveTo(x, y + size / rows);
    ctx.lineTo(x + size / columns, y + size / rows);
    ctx.stroke();
  }
  /** @type {CellDrawFunction} */
  drawWallLeft(x, y, size, columns, rows) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + size / rows);
    ctx.stroke();
  }
  /**
   *
   * @param {Cell} cell1
   * @param {Cell} cell2
   */
  removeWall(cell1, cell2) {
    let x = cell1.colNum - cell2.colNum;

    if (x == 1) {
      cell1.walls.leftWall = false;
      cell2.walls.rightWall = false;
    } else if (x == -1) {
      cell1.walls.rightWall = false;
      cell2.walls.leftWall = false;
    }

    let y = cell1.rowNum - cell2.rowNum;

    if (y == 1) {
      cell1.walls.topWall = false;
      cell2.walls.bottomWall = false;
    } else if (y == -1) {
      cell1.walls.bottomWall = false;
      cell2.walls.topWall = false;
    }
  }

  highlight(columns) {
    let x = (this.colNum * this.parentSize) / columns + 1;
    let y = (this.rowNum * this.parentSize) / columns + 1;

    ctx.fillStyle = "black";
    ctx.fillRect(
      x + 1,
      y + 1,
      this.parentSize / columns - 3,
      this.parentSize / columns - 3
    );
  }

  /**
   *
   * @param {number} size
   * @param {number} rows
   * @param {number} columns
   */
  show(size, rows, columns) {
    const x = (this.colNum * size) / columns;
    const y = (this.rowNum * size) / rows;

    ctx.fillStyle = "transparent";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;

    if (this.walls.topWall) this.drawWallTop(x, y, size, columns, rows);
    if (this.walls.rightWall) this.drawWallRight(x, y, size, columns, rows);
    if (this.walls.bottomWall) this.drawWallBottom(x, y, size, columns, rows);
    if (this.walls.leftWall) this.drawWallLeft(x, y, size, columns, rows);

    if (this.visited)
      ctx.fillRect(x + 1, y + 1, size / columns - 2, size / rows - 2);
    // ctx.arc(x, y, 25, 0, Math.PI * 2);
  }
}

const newMaze = new Maze(750, 7, 7);
newMaze.setUp();
newMaze.draw();
console.log(newMaze);
