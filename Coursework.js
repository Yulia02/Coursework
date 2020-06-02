'use strict';
let game_field = [
    [' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' '],
];

let empty = ' ',
    width = 4,
    height = 4,
    score = 0;

function new_game() {

}

function arrayToGrid() {
    for(let i = 0; i < height; ++i)
    {
        for(let j = 0; j < width; ++j)
            document.getElementById("cell"+(i*width+1+j)).textContent = game_field[i][j];
    }
}

function number_generation(array) {
    while(true){
        let y = Math.floor(Math.random() * height),
            x = Math.floor(Math.random() * width);
        if (array[y][x] === empty) {
            array[y][x] = 2;
            break;
        }
    }
}

function move_down(array) {
    for (let j = 0; j < array.length; ++j) {
        for (let i = array.length - 2; i >= 0; --i) {
            if (array[i][j] === empty)
                continue;
            let k = i;
            while (k < array.length - 1 && array[k + 1][j] === empty) ++k;
            if (k < array.length - 1 && array[k + 1][j] === array[i][j]) {
                array[k + 1][j] *= 2;
                score +=array[k + 1][j];
                document.getElementById("score").textContent = ("Score: " + score);
                array[i][j] = empty;
            }
            if (k !== i) {
                array[k][j] = array[i][j];
                array[i][j] = empty;
            }
        }
    }
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
                score +=array[k - 1][j];
                document.getElementById("score").textContent = ("Score: " + score);
                array[i][j] = empty;
            }
            if (k !== i) {
                array[k][j] = array[i][j];
                array[i][j] = empty;
            }
        }
    }
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
                score +=array[j][k-1];
                document.getElementById("score").textContent = ("Score: " + score);
                array[j][i] = empty;
            }
            if (k !== i) {
                array[j][k] = array[j][i];
                array[j][i] = empty;
            }
        }
    }
}

function move_right(array) {
    for (let j = 0; j < array.length; ++j) {
        for (let i = array.length - 2; i >= 0; --i) {
            if (array[j][i] === empty)
                continue;
            let k = i;
            while (k < array.length - 1 && array[j][k + 1] === empty) ++k;
            if (k < array.length - 1  && array[j][k + 1] === array[j][i]) {
                array[j][k + 1] *= 2;
                score +=array[j][k+1];
                document.getElementById("score").textContent = ("Score: " + score);
                array[j][i] = empty;
            }
            if (k !== i) {
                array[j][k] = array[j][i];
                array[j][i] = empty;
            }
        }
    }
}

function key_pressed(event) {
    switch (event.keyCode)
    {
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
            move_down(game_field);
            break;
    }
    number_generation(game_field);
    arrayToGrid();

}

addEventListener("keydown", key_pressed);
addEventListener("DOMContentLoaded", arrayToGrid);
number_generation(game_field);
number_generation(game_field);
