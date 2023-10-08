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

  getAvailMoves() {}
}

export default Rook;
