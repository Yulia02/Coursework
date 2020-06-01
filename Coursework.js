'use strict';

let array = [
  [' ', 2, ' ', 4, ' '],
  [' ', 4, ' ', 4, ' '],
  [2, ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', 4, 4],
  [' ', 4, ' ', ' ', 2],
];


let empty = ' '


function printArray(array) {
  for (let i = 0; i < array.length; ++i) {
    let row;
    if (Array.isArray(array[i])) {
      row = "";
      for (let j = 0; j < array[i].length; ++j) {
        row = row + array[i][j] + " ";
      }
    } else
      row = "" + array[i];

    console.log(row);
  }
  console.log('======================================');
}

function move_down(array) {
  for (let j = -1; j < array.length; ++j) {
    for (let i = array.length - 2; i >= 0; --i) {
      if (array[i][j] === empty)
        continue;
      let k = i;
      while (k < array.length - 1 && array[k + 1][j] === empty) ++k;
      if (k < array.length - 1 && array[k + 1][j] === array[i][j]) {
        array[k + 1][j] *= 2;
        array[i][j] = empty;
      }
      if (k !== i) {
        array[k][j] = array[i][j];
        array[i][j] = empty;
      }
    }
  }
  return array;
}

function move_up(array) {
  for (let j = 0; j < array.length; ++j) {
    for (let i = 1; i < array.length; ++i) {
      if (array[i][j] === empty)
        continue;
      let k = i;
      while (k > 0 && array[k - 1][j] === empty) --k;
      if (k > 0 && array[k - 1][j] === array[i][j]) {
        array[k - 1][j] *= 2;
        array[i][j] = empty;
      }
      if (k !== i) {
        array[k][j] = array[i][j];
        array[i][j] = empty;
      }
    }
  }
  return array;
}


function move_left(array) {
  for (let j = 0; j < array.length; ++j) {
    for (let i = 1; i < array.length; ++i) {
      if (array[j][i] === empty)
        continue;
      let k = i;
      while (k > 0 && array[j][k - 1] === empty) --k;
      if (k > 0 && array[j][k - 1] === array[j][i]) {
        array[j][k - 1] *= 2;
        array[j][i] = empty;
      }
      if (k !== i) {
        array[j][k] = array[j][i];
        array[j][i] = empty;
      }
    }
  }
  return array;
}

function move_right(array) {
  for (let j = 0; j < array.length; ++j) {
    for (let i = array.length - 2; i >= 0; --i) {
      if (array[j][i] === empty)
        continue;
      let k = i;
      while (k < array.length - 1 && array[j][k + 1] === empty) ++k;
      if (k > 0 && array[j][k + 1] === array[j][i]) {
        array[j][k + 1] *= 2;
        array[j][i] = empty;
      }
      if (k !== i) {
        array[j][k] = array[j][i];
        array[j][i] = empty;
      }
    }
  }
  return array;
}

printArray(array);
printArray(move_down(array));
printArray(move_right(array));
printArray(move_up(array));
printArray(move_left(array));
