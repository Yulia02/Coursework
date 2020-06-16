'use strict';
class Field {

  constructor(fieldSize = 4, empty = ' ') {
    this.score = 0;
    this.fieldSize = fieldSize;
    this.empty = empty;
    this.gameField = [...Array(fieldSize)].map(() =>
      Array(fieldSize).fill(empty));
    this.numberGeneration();
    this.numberGeneration();
  }

  resetField() {
    for (let i = 0; i < this.fieldSize; i++) {
      this.gameField[i].fill(this.empty);
    }
    this.score = 0;
    this.numberGeneration();
    this.numberGeneration();

  }

  checkFilling() {
    for (let i = 0; i < this.fieldSize; ++i) {
      for (let j = 0; j < this.fieldSize; ++j) {
        if (this.gameField[i][j] === this.empty) {
          return true;
        }
      }
    }
    return false;
  }

  numberGeneration() {
    if (!this.checkFilling())
      return;
    while (true) {
      const y = Math.floor(Math.random() * this.fieldSize),
        x = Math.floor(Math.random() * this.fieldSize);
      if (this.gameField[y][x] === this.empty) {
        this.gameField[y][x] = 2;
        break;
      }
    }
  }

  gameOver() {
    if (this.checkFilling())
      return false;
    for (let j = 0; j < this.fieldSize - 1; ++j) {
      for (let i = 0; i < this.fieldSize; ++i) {
        if (this.gameField[i][j] === this.gameField[i][j + 1] ||
          this.gameField[j][i] === this.gameField[j + 1][i]) {
          return false;
        }
      }
    }
    return true;
  }

  moveDown() {
    const temp = [];
    let wasMove = false;
    for (let j = 0; j < this.gameField.length; ++j) {
      for (let i = this.gameField.length - 2; i >= 0; --i) {
        if (this.gameField[i][j] === this.empty)
          continue;
        let k = i;
        while (k < this.gameField.length - 1 && this.gameField[k + 1][j] ===
          this.empty) ++k;
        if (k < this.gameField.length - 1 && this.gameField[k + 1][j] ===
          this.gameField[i][j] &&
          !temp.includes('' + (k + 1) + j)) {
          this.gameField[k + 1][j] *= 2;
          this.score += this.gameField[k + 1][j];
          this.gameField[i][j] = this.empty;
          temp.push('' + (k + 1) + j);
          wasMove = true;
        }
        if (k !== i) {
          this.gameField[k][j] = this.gameField[i][j];
          this.gameField[i][j] = this.empty;
          wasMove = true;
        }
      }
    }
    return wasMove;
  }

  moveUp() {
    const temp = [];
    let wasMove = false;
    for (let j = 0; j < this.gameField.length; ++j) {
      for (let i = 1; i < this.gameField.length; ++i) {
        if (this.gameField[i][j] === this.empty)
          continue;
        let k = i;
        while (k > 0 && this.gameField[k - 1][j] === this.empty) --k;
        if (k > 0 && this.gameField[k - 1][j] === this.gameField[i][j] &&
          !temp.includes('' + (k - 1) + j)) {
          this.gameField[k - 1][j] *= 2;
          this.score += this.gameField[k - 1][j];
          this.gameField[i][j] = this.empty;
          temp.push('' + (k - 1) + j);
          wasMove = true;
        }
        if (k !== i) {
          this.gameField[k][j] = this.gameField[i][j];
          this.gameField[i][j] = this.empty;
          wasMove = true;
        }
      }
    }
    return wasMove;
  }


  moveLeft() {
    const temp = [];
    let wasMove = false;
    for (let j = 0; j < this.gameField.length; ++j) {
      for (let i = 1; i < this.gameField.length; ++i) {
        if (this.gameField[j][i] === this.empty)
          continue;
        let k = i;
        while (k > 0 && this.gameField[j][k - 1] === this.empty) --k;
        if (k > 0 && this.gameField[j][k - 1] === this.gameField[j][i] &&
          !temp.includes('' + j + (k - 1))) {
          this.gameField[j][k - 1] *= 2;
          this.score += this.gameField[j][k - 1];
          this.gameField[j][i] = this.empty;
          temp.push('' + j + (k - 1));
          wasMove = true;
        }
        if (k !== i) {
          this.gameField[j][k] = this.gameField[j][i];
          this.gameField[j][i] = this.empty;
          wasMove = true;
        }
      }
    }
    return wasMove;
  }

  moveRight() {
    const temp = [];
    let wasMove = false;
    for (let j = 0; j < this.gameField.length; ++j) {
      for (let i = this.gameField.length - 2; i >= 0; --i) {
        if (this.gameField[j][i] === this.empty)
          continue;
        let k = i;
        while (k < this.gameField.length - 1 && this.gameField[j][k + 1] ===
          this.empty) ++k;
        if (k < this.gameField.length - 1 && this.gameField[j][k + 1] ===
          this.gameField[j][i] &&
          !temp.includes('' + j + (k + 1))) {
          this.gameField[j][k + 1] *= 2;
          this.score += this.gameField[j][k + 1];
          this.gameField[j][i] = this.empty;
          temp.push('' + j + (k + 1));
          wasMove = true;
        }
        if (k !== i) {
          this.gameField[j][k] = this.gameField[j][i];
          this.gameField[j][i] = this.empty;
          wasMove = true;
        }
      }
    }
    return wasMove;
  }


}
