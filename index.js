'use strict';

const field = new Field();

const cells = document.getElementsByClassName('cell');

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


function keyPressed(event) {
  let wasMove = false;
  switch (event.keyCode) {
  case 37:
    wasMove = field.moveLeft();
    break;
  case 38:
    wasMove = field.moveUp();
    break;
  case 39:
    wasMove = field.moveRight();
    break;
  case 40:
    wasMove = field.moveDown();
    break;
  default:
    return;
  }
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
