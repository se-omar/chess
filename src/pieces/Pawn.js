import { COLS, ROWS } from '../utils/constants';

class Pawn {
  moveCount = 0;

  constructor(col, row, color) {
    this.col = col;
    this.row = row;
    this.color = color;
  }

  render() {
    console.log('aoeuoae');
    const pawn = document.createElement('img');
    pawn.setAttribute('class', 'pieces pawn');
    pawn.setAttribute(
      'src',
      `../src/assets/${this.color}Pieces/${this.color}-pawn.png`,
    );

    pawn.addEventListener('click', (e) => {
      const [availCols, availRows] = this.getAvailableMoves();
      this.highlightMoves(availCols, availRows);
    });
    document.querySelector(`#${this.col}${this.row}`).appendChild(pawn);
  }

  getAvailableMoves() {
    const availCols = [];
    const availRows = [];
    if (this.moveCount === 0) {
      if (this.color === 'white') {
        availRows.push(
          ROWS[ROWS.indexOf(this.row) + 1],
          ROWS[ROWS.indexOf(this.row) + 2],
        );
      } else {
        availRows.push(
          ROWS[ROWS.indexOf(this.row) - 1],
          ROWS[ROWS.indexOf(this.row) - 2],
        );
      }
    }

    return [availCols, availRows];
  }

  highlightMoves(availCols, availRows) {
    availCols.forEach((col) => {
      document
        .querySelector(`#${col}${this.row}`)
        .setAttribute('class', 'highlighted');
    });

    availRows.forEach((row) => {
      document.querySelector(`#${this.col}${row}`).className += ' highlighted';
    });
  }

  // move() {}
  //
  // attack() {}
}

export default Pawn;
