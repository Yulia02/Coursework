'use strict';

const field = new Field();

const cells = document.getElementsByClassName('cell');

const letters = ['G', 'A', 'M', 'E', ' ', 'O', 'V', 'E', 'R'];

setInterval(() => {
  const cellsNum = 16;
  for (let i = 0; i < cellsNum; i++) {
    const size = cellsNum / Math.pow(cells[i].innerText.length, 0.5);
    cells[i].style.fontSize =  size + 'vmin';
  }
  const mask = document.getElementsByClassName('mask')[0];
  const field = document.getElementsByClassName('field')[0];
  const header = document.getElementsByClassName('header')[0];
  mask.style.left = (window.innerWidth - field.offsetWidth) / 2 + 'px';
  mask.style.top = header.offsetHeight + 'px';
}, 0);

function tranformLetters() {
  const timerInterval = 250;
  setTimeout(() => {
    for (let i = 0; i <= letters.length; i++) {
      const letter = document.getElementsByClassName('letter')[i];
      letter.innerText = ' ';
      setTimeout(() => {
        letter.innerText = letters[i];
      }, i * timerInterval);
    }
  }, 1);
}

function arrayToGrid() {
  for (let i = 0; i < field.fieldSize; ++i) {
    for (let j = 0; j < field.fieldSize; ++j)
      document.getElementById('cell' +
        (i * field.fieldSize + 1 + j)).textContent = field.gameField[i][j];
  }
}

function newGame() {
  field.resetField();
  document.getElementById('score').textContent = ('Score: ' + field.score);
  arrayToGrid();
}

function gameOverVisual() {
  document.getElementsByClassName('mask')[0].style.visibility = 'visible';
  tranformLetters();
  setTimeout(() => {
    const rightBlock = document.getElementsByClassName('rightBlock')[0];
    rightBlock.style.backgroundColor = '#17a2b8';
    rightBlock.style.color = '#F5F5DC';
  }, 2500);
  document.getElementsByClassName('rightBlock')[0].
    addEventListener('click', () => {
      const rightBlock = document.getElementsByClassName('rightBlock')[0];
      rightBlock.style.backgroundColor = '#F5F5DC';
      rightBlock.style.color = '#17a2b8';
      document.getElementsByClassName('mask')[0].style.visibility = 'hidden';
    });
}

function keyPressed(event) {
  const obj = {
    get 37() {
      return field.moveLeft();
    },
    get 38() {
      return field.moveUp();
    },
    get 39() {
      return field.moveRight();
    },
    get 40() {
      return field.moveDown();
    },
  };

  const wasMove = obj[event.keyCode];
  if (!field.gameOver()) {
    if (wasMove) {
      field.numberGeneration();
      arrayToGrid();
      document.getElementById('score').textContent = ('Score: ' + field.score);
    }
  } else {
    gameOverVisual();
  }
}

addEventListener('keydown', keyPressed);
addEventListener('DOMContentLoaded', arrayToGrid);
