'use strict';

const cells = document.getElementsByClassName('cell');

const gameField = [
  [' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' '],
];

const letters = ['G', 'A', 'M', 'E', ' ', 'O', 'V', 'E', 'R'];

setInterval(() => {
  for (let i = 0; i < 16; i++) {
    cells[i].style.fontSize = 16 / Math.pow(cells[i].innerText.length, 0.5) +
    'vmin';
  }
  document.getElementsByClassName('mask')[0].style.left = (window.innerWidth -
    document.getElementsByClassName('field')[0].offsetWidth) / 2 + 'px';
  document.getElementsByClassName('mask')[0].style.top =
  document.getElementsByClassName('header')[0].offsetHeight + 'px';
}, 0);

function tranformLetters() {
  setTimeout(() => {
    for (let i = 0; i <= letters.length; i++) {
      document.getElementsByClassName('letter')[i].innerText = ' ';
      setTimeout(() => {
        document.getElementsByClassName('letter')[i].innerText = letters[i];
      }, i * 250);
    }
  }, 1);
}

const empty = ' ',
  fieldSize = 4;
let score = 0;

function arrayToGrid() {
  for (let i = 0; i < fieldSize; ++i) {
    for (let j = 0; j < fieldSize; ++j)
      document.getElementById('cell' +
      (i * fieldSize + 1 + j)).textContent = gameField[i][j];
  }
}

function newGame() {
  for (let i = 0; i < fieldSize; i++) {
    gameField[i].fill(empty);
  }
  score = 0;
  document.getElementById('score').textContent = ('Score: ' + score);
  numberGeneration(gameField);
  numberGeneration(gameField);
  arrayToGrid();
}


function checkFilling(array) {
  for (let i = 0; i < fieldSize; ++i) {
    for (let j = 0; j < fieldSize; ++j) {
      if (array[i][j] === empty) {
        return true;
      }
    }
  }
  return false;
}

function numberGeneration(array) {
  if (!checkFilling(gameField))
    return;
  while (true) {
    const y = Math.floor(Math.random() * fieldSize),
      x = Math.floor(Math.random() * fieldSize);
    if (array[y][x] === empty) {
      array[y][x] = 2;
      break;
    }
  }
}

function gameOver(array) {
  if (checkFilling(array))
    return false;
  for (let j = 0; j < fieldSize - 1; ++j) {
    for (let i = 0; i < fieldSize; ++i) {
      if (array[i][j] === array[i][j + 1] || array[j][i] === array[j + 1][i]) {
        return false;
      }
    }
  }
  return true;
}


function gameOverVisual() {
  document.getElementsByClassName('mask')[0].style.visibility = 'visible';
  tranformLetters();
  setTimeout(() => {
    document.getElementsByClassName('right_block')[0].style.backgroundColor =
    '#17a2b8';
    document.getElementsByClassName('right_block')[0].style.color = '#F5F5DC';
  }, 2500);

  document.getElementsByClassName('right_block')[0].
    addEventListener('click', () => {
      document.getElementsByClassName('right_block')[0].style.backgroundColor =
      '#F5F5DC';
      document.getElementsByClassName('right_block')[0].style.color = '#17a2b8';
      document.getElementsByClassName('mask')[0].style.visibility = 'hidden';
    });
}


function moveDown(array) {
  const abc = [];
  let wasMove = false;
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
        document.getElementById('score').textContent = ('Score: ' + score);
        array[i][j] = empty;
        abc.push('' + (k + 1) + j);
        wasMove = true;
      }
      if (k !== i) {
        array[k][j] = array[i][j];
        array[i][j] = empty;
        wasMove = true;
      }
    }
  }
  return wasMove;
}

function moveUp(array) {
  const abc = [];
  let wasMove = false;
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
        document.getElementById('score').textContent = ('Score: ' + score);
        array[i][j] = empty;
        abc.push('' + (k - 1) + j);
        wasMove = true;
      }
      if (k !== i) {
        array[k][j] = array[i][j];
        array[i][j] = empty;
        wasMove = true;
      }
    }
  }
  return wasMove;
}


function moveLeft(array) {
  const abc = [];
  let wasMove = false;
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
        document.getElementById('score').textContent = ('Score: ' + score);
        array[j][i] = empty;
        abc.push('' + j + (k - 1));
        wasMove = true;
      }
      if (k !== i) {
        array[j][k] = array[j][i];
        array[j][i] = empty;
        wasMove = true;
      }
    }
  }
  return wasMove;
}

function moveRight(array) {
  const abc = [];
  let wasMove = false;
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
        document.getElementById('score').textContent = ('Score: ' + score);
        array[j][i] = empty;
        abc.push('' + j + (k + 1));
        wasMove = true;
      }
      if (k !== i) {
        array[j][k] = array[j][i];
        array[j][i] = empty;
        wasMove = true;
      }
    }
  }
  return wasMove;
}

function keyPressed(event) {
  let wasMove = false;
  switch (event.keyCode) {
  case 37:
    wasMove = moveLeft(gameField);
    break;
  case 38:
    wasMove = moveUp(gameField);
    break;
  case 39:
    wasMove = moveRight(gameField);
    break;
  case 40:
    wasMove = moveDown(gameField);
    break;
  default:
    return;
  }
  if (!gameOver(gameField)) {
    if (wasMove) {
      numberGeneration(gameField);
      arrayToGrid();
    }
  } else {
    gameOverVisual();
    newGame();
  }
}


addEventListener('keydown', keyPressed);
addEventListener('DOMContentLoaded', arrayToGrid);
numberGeneration(gameField);
numberGeneration(gameField);
