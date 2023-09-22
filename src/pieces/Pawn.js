import { COLS, ROWS } from '../utils/constants';

class Pawn {
  moveCount = 0;

  clicked = false;

  constructor(position, color) {
    this.position = position;
    this.color = color;
  }

  render() {
    const pawn = document.createElement('img');
    pawn.classList.add('pieces', this.color, 'pawn');
    pawn.setAttribute(
      'src',
      `../src/assets/${this.color}Pieces/${this.color}-pawn.png`,
    );

    document.querySelector(`#${this.position}`).appendChild(pawn);

    return pawn;
  }

  getAvailAttacks() {
    const sign = this.color === 'white' ? 1 : -1;
    const availAttacks = [];

    const diagonal1 = document.querySelector(
      `#${
        COLS[COLS.indexOf(this.position[0]) + 1]
        + ROWS[ROWS.indexOf(this.position[1]) + 1 * sign]
      }`,
    );

    const diagonal2 = document.querySelector(
      `#${
        COLS[COLS.indexOf(this.position[0]) - 1]
        + ROWS[ROWS.indexOf(this.position[1]) + 1 * sign]
      }`,
    );
    if (
      diagonal1.firstElementChild
      && !diagonal1.firstElementChild.classList.contains(this.color)
    ) {
      availAttacks.push(
        COLS[COLS.indexOf(this.position[0]) + 1]
          + ROWS[ROWS.indexOf(this.position[1]) + 1 * sign],
      );
    }

    if (
      diagonal2.firstElementChild
      && !diagonal2.firstElementChild.classList.contains(this.color)
    ) {
      availAttacks.push(
        COLS[COLS.indexOf(this.position[0]) - 1]
          + ROWS[ROWS.indexOf(this.position[1]) + 1 * sign],
      );
    }

    return availAttacks;
  }

  getAvailMoves() {
    const sign = this.color === 'white' ? 1 : -1;
    const availPositions = [];
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
