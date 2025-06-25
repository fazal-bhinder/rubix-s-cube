# 📦 Rubik's Cube Solver (2D Web UI)

An interactive, browser-based Rubik's Cube solver where users can fill in cube colors, scramble it randomly, and solve it back using reverse moves.

---

## 📑 Features

- 🎨 **Color Picker Panel** — Choose colors and fill cube faces manually.
- 🔄 **Scramble Button** — Randomly scrambles the cube with 20 random moves.
- 📝 **Move Tracker** — Displays moves used to scramble and solve the cube.
- ⚙️ **Solve Button** — Solves the cube by reversing the scramble moves.
- ♻️ **Clear Button** — Resets cube colors and move history.
- 🎛️ **Live Color Counters** — Ensures no color is used more than 9 times.

---

## 📂 Project Structure

RUBIX_CUBE/
├── index.html # Main HTML layout
├── style.css # Styling for cube, color panel, controls
├── cube.js # Cube logic and UI interaction scripts
└── README.md # Project documentation

---

## How it works

- The cube consists of six 3×3 grids representing each face.
- Users select a color from the color panel and fill the cube.
- Scramble applies random face rotations (20 moves).
- Solve reverses those moves to return the cube to the previous state.
- Each color can only be used up to 9 times.
- Moves and move count are displayed live on the UI.

---

## 🚀 How to Run

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd RubiksCubeSolver
