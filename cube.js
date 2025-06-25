let selectedColor = "white";

const solvedColors = {
  U: "white",
  F: "green",
  L: "orange",
  R: "red",
  D: "yellow",
  B: "blue"
};

let colorCounts = {
  white: 0, yellow: 0, red: 0, orange: 0, green: 0, blue: 0
};

document.querySelectorAll('.color-swatch').forEach(swatch => {
  swatch.addEventListener('click', () => {
    selectedColor = swatch.getAttribute('data-color');
  });
});

class Cube {
  constructor() {
    this.faces = {
      U: Array(9).fill('white'),
      D: Array(9).fill('yellow'),
      F: Array(9).fill('green'),
      B: Array(9).fill('blue'),
      L: Array(9).fill('orange'),
      R: Array(9).fill('red')
    };
  }

  rotateFace(face, direction = 'CW') {
    const f = this.faces[face];
    const rotated = direction === 'CW'
      ? [f[6], f[3], f[0], f[7], f[4], f[1], f[8], f[5], f[2]]
      : [f[2], f[5], f[8], f[1], f[4], f[7], f[0], f[3], f[6]];
    this.faces[face] = rotated;

    const adjacent = {
      U: [['B', [2,1,0]], ['R', [2,1,0]], ['F', [2,1,0]], ['L', [2,1,0]]],
      D: [['F', [6,7,8]], ['R', [6,7,8]], ['B', [6,7,8]], ['L', [6,7,8]]],
      F: [['U', [6,7,8]], ['R', [0,3,6]], ['D', [2,1,0]], ['L', [8,5,2]]],
      B: [['U', [2,1,0]], ['L', [0,3,6]], ['D', [6,7,8]], ['R', [8,5,2]]],
      L: [['U', [0,3,6]], ['F', [0,3,6]], ['D', [0,3,6]], ['B', [8,5,2]]],
      R: [['U', [8,5,2]], ['B', [0,3,6]], ['D', [8,5,2]], ['F', [8,5,2]]]
    };

    const strips = adjacent[face];
    const temp = strips.map(([adj, idxs]) => idxs.map(i => this.faces[adj][i]));

    const newOrder = direction === 'CW'
      ? [3,0,1,2]
      : [1,2,3,0];

    newOrder.forEach((src, i) => {
      strips[i][1].forEach((pos, j) => {
        this.faces[strips[i][0]][pos] = temp[src][j];
      });
    });
  }

  isSolved() {
    for (let face in this.faces) {
      if (!this.faces[face].every(color => color === this.faces[face][0])) {
        return false;
      }
    }
    return true;
  }
}

const cube = new Cube();
let moveHistory = [];

function initCube() {
  ['U','F','L','R','D','B'].forEach(faceId => {
    const face = document.getElementById(faceId);
    face.innerHTML = '';
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.addEventListener('click', () => fillColor(cell, faceId, i));
      cell.style.background = solvedColors[faceId];
      face.appendChild(cell);
    }
  });
}

function fillColor(cell, faceId, index) {
  const currentColor = cell.style.background;
  if (currentColor) {
    colorCounts[currentColor]--;
    updateColorCount(currentColor);
  }
  if (colorCounts[selectedColor] >= 9) {
    alert(`You can use ${selectedColor} only 9 times!`);
    return;
  }
  cell.style.background = selectedColor;
  cube.faces[faceId][index] = selectedColor;
  colorCounts[selectedColor]++;
  updateColorCount(selectedColor);
}

function updateColorCount(color) {
  document.getElementById(`count-${color}`).innerText = `${colorCounts[color]}/9`;
}

function renderCube() {
  for (let face in cube.faces) {
    const cells = document.getElementById(face).childNodes;
    cube.faces[face].forEach((color, i) => {
      cells[i].style.background = color;
    });
  }
}

function scramble() {
  moveHistory = [];
  const possibleMoves = ['F', "F'", 'U', "U'", 'R', "R'", 'L', "L'", 'D', "D'", 'B', "B'"];
  const moveCount = 20;
  for (let i = 0; i < moveCount; i++) {
    const move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    cube.rotateFace(move[0], move.endsWith("'") ? 'CCW' : 'CW');
    moveHistory.push(move);
  }
  renderCube();
  document.getElementById('moveList').innerText = moveHistory.join(' ');
  document.getElementById('moveCount').innerText = moveHistory.length;
}

function solve() {
  if (cube.isSolved()) {
    document.getElementById('moveList').innerText = "Cube is already solved!";
    document.getElementById('moveCount').innerText = '0';
    return;
  }
  const solveMoves = moveHistory.slice().reverse().map(m => m.endsWith("'") ? m[0] : m[0] + "'");
  solveMoves.forEach(move => cube.rotateFace(move[0], move.endsWith("'") ? 'CCW' : 'CW'));
  renderCube();
  document.getElementById('moveList').innerText = solveMoves.join(' ');
  document.getElementById('moveCount').innerText = solveMoves.length;
}

function clearCube() {
  initCube();
  for (let color in colorCounts) {
    colorCounts[color] = 0;
    updateColorCount(color);
  }
  document.getElementById('moveList').innerText = '';
  document.getElementById('moveCount').innerText = '0';
  cube.faces = {
    U: Array(9).fill('white'),
    D: Array(9).fill('yellow'),
    F: Array(9).fill('green'),
    B: Array(9).fill('blue'),
    L: Array(9).fill('orange'),
    R: Array(9).fill('red')
  };
  moveHistory = [];
}

window.onload = initCube;
