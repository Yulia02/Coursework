'use strict';

let cells = document.getElementsByClassName('cell');

let game_field = [
  [' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' '],
];

setInterval(() => {
  for (let i = 0; i < 16; i++) {
    cells[i].style.fontSize = 16 / Math.pow(cells[i].innerText.length, 0.5) + 'vmin';
  }
}, 0);


let empty = ' ',
  width = 4,
  height = 4,
  score = 0;

function arrayToGrid() {
  for (let i = 0; i < height; ++i) {
    for (let j = 0; j < width; ++j)
      document.getElementById("cell" + (i * width + 1 + j)).textContent = game_field[i][j];
  }
}

function new_game() {
  for (let i = 0; i < height; i++) {
    game_field[i].fill(empty);
  }
  score = 0;
  document.getElementById("score").textContent = ("Score: " + score);
  number_generation(game_field);
  number_generation(game_field);
  arrayToGrid();
}



function check_filling(array) {
  for (let i = 0; i < height; ++i) {
    for (var j = 0; j < width; ++j) {
      if (array[i][j] === empty) {
        return true;
      }
    }
  }
  return false;
}

function number_generation(array) {
  if (!check_filling(game_field))
    return;
  while (true) {
    let y = Math.floor(Math.random() * height),
      x = Math.floor(Math.random() * width);
    if (array[y][x] === empty) {
      array[y][x] = 2;
      break;
    }
  }
}

function game_over() {
  if (check_filling(game_field))
    return false;
  for (let j = 0; j < array.length - 1; ++j) {
    // there will be a check for the possibility of a move
  }

  return true;
}


function move_down(array) {
  let abc = [];
  let wasMovie = false;
  for (let j = 0; j < array.length; ++j) {
    for (let i = array.length - 2; i >= 0; --i) {
      if (array[i][j] === empty)
        continue;
      let k = i;
      while (k < array.length - 1 && array[k + 1][j] === empty) ++k;
      if (k < array.length - 1 && array[k + 1][j] === array[i][j] &&
        !abc.includes('' + (k + 1) + j)) {
        array[k + 1][j] *= 2;
        score += array[k + 1][j];
        document.getElementById("score").textContent = ("Score: " + score);
        array[i][j] = empty;
        abc.push('' + (k + 1) + j);
        wasMovie = true;
      }
      if (k !== i) {
        array[k][j] = array[i][j];
        array[i][j] = empty;
        wasMovie = true;
      }
    }
  }
  return wasMovie;
}

function move_up(array) {
  let abc = [];
  let wasMovie = false;
  for (let j = 0; j < array.length; ++j) {
    for (let i = 1; i < array.length; ++i) {
      if (array[i][j] === empty)
        continue;
      let k = i;
      while (k > 0 && array[k - 1][j] === empty) --k;
      if (k > 0 && array[k - 1][j] === array[i][j] &&
        !abc.includes('' + (k - 1) + j)) {
        array[k - 1][j] *= 2;
        score += array[k - 1][j];
        document.getElementById("score").textContent = ("Score: " + score);
        array[i][j] = empty;
        abc.push('' + (k - 1) + j);
        wasMovie = true;
      }
      if (k !== i) {
        array[k][j] = array[i][j];
        array[i][j] = empty;
        wasMovie = true;
      }
    }
  }
  return wasMovie;
}


function move_left(array) {
  let abc = [];
  let wasMovie = false;
  for (let j = 0; j < array.length; ++j) {
    for (let i = 1; i < array.length; ++i) {
      if (array[j][i] === empty)
        continue;
      let k = i;
      while (k > 0 && array[j][k - 1] === empty) --k;
      if (k > 0 && array[j][k - 1] === array[j][i] &&
        !abc.includes('' + j + (k - 1))) {
        array[j][k - 1] *= 2;
        score += array[j][k - 1];
        document.getElementById("score").textContent = ("Score: " + score);
        array[j][i] = empty;
        abc.push('' + j + (k - 1));
        wasMovie = true;
      }
      if (k !== i) {
        array[j][k] = array[j][i];
        array[j][i] = empty;
        wasMovie = true;
      }
    }
  }
  return wasMovie;
}

function move_right(array) {
  let abc = [];
  let wasMovie = false;
  for (let j = 0; j < array.length; ++j) {
    for (let i = array.length - 2; i >= 0; --i) {
      if (array[j][i] === empty)
        continue;
      let k = i;
      while (k < array.length - 1 && array[j][k + 1] === empty) ++k;
      if (k < array.length - 1 && array[j][k + 1] === array[j][i] &&
        !abc.includes('' + j + (k + 1))) {
        array[j][k + 1] *= 2;
        score += array[j][k + 1];
        document.getElementById("score").textContent = ("Score: " + score);
        array[j][i] = empty;
        abc.push('' + j + (k + 1));
        wasMovie = true;
      }
      if (k !== i) {
        array[j][k] = array[j][i];
        array[j][i] = empty;
        wasMovie = true;
      }
    }
  }
  return wasMovie;
}

function key_pressed(event) {
  switch (event.keyCode) {
    case 37:
      move_left(game_field);
      break;
    case 38:
      move_up(game_field);
      break;
    case 39:
      move_right(game_field);
      break;
    case 40:
      if (!move_down(game_field))
        return;
      break;
    default:
      return;
  }
  if (!game_over()) {
    number_generation(game_field);
    arrayToGrid();
  } else {
    // Game over!
  }
}


addEventListener("keydown", key_pressed);
addEventListener("DOMContentLoaded", arrayToGrid);
number_generation(game_field);
number_generation(game_field);
