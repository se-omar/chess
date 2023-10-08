import { COLS, ROWS } from '../utils/constants';

class Rook {
  moveCount = 0;

  clicked = false;

  constructor(position, color) {
    this.position = position;
    this.color = color;
  }

  render() {
    const rook = document.createElement('img');
    rook.classList.add('pieces', this.color, 'rook');
    rook.setAttribute(
      'src',
      `../src/assets/${this.color}Pieces/${this.color}-rook.png`,
    );

    document.querySelector(`#${this.position}`).appendChild(rook);

    return rook;
  }

  isAttackValid(el) {}

  getAvailAttacks() {}

  getAvailMoves() {
    const availPositions = [];
    const availRows = ROWS.filter((r) => r !== this.position[1]);
    const availCols = COLS.filter((c) => c !== this.position[0]);

    availRows.forEach((row) => {
      availPositions.push(this.position[0] + row);
    });

    availCols.forEach((col) => {
      availPositions.push(col + this.position[1]);
    });

    console.log(availPositions);

    return availPositions;
  }
}

export default Rook;
