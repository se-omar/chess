import { ROWS } from '../utils/constants';

class Pawn {
  moveCount = 0;

  clicked = false;

  constructor(position, color) {
    this.position = position;
    this.color = color;
  }

  render() {
    const pawn = document.createElement('img');
    pawn.classList.add('pieces', 'pawn');
    pawn.setAttribute(
      'src',
      `../src/assets/${this.color}Pieces/${this.color}-pawn.png`,
    );

    document.querySelector(`#${this.position}`).appendChild(pawn);

    return pawn;
  }

  getAvailableMoves() {
    const availPositions = [];
    const sign = this.color === 'white' ? 1 : -1;
    if (this.moveCount === 0) {
      availPositions.push(
        this.position[0] + ROWS[ROWS.indexOf(this.position[1]) + 1 * sign],
        this.position[0] + ROWS[ROWS.indexOf(this.position[1]) + 2 * sign],
      );
    } else {
      availPositions.push(
        this.position[0] + ROWS[ROWS.indexOf(this.position[1]) + 1 * sign],
      );
    }

    return availPositions;
  }

  // move() {}
  //
  // attack() {}
}

export default Pawn;
