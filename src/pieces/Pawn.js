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

    const currRowIndex = ROWS.indexOf(this.position[1]);
    const currColIndex = COLS.indexOf(this.position[0]);

    const diagonal1 = document.querySelector(
      `#${COLS[currColIndex + 1] + ROWS[currRowIndex + 1 * sign]}`,
    );

    const diagonal2 = document.querySelector(
      `#${COLS[currColIndex - 1] + ROWS[currRowIndex + 1 * sign]}`,
    );
    if (
      diagonal1.firstElementChild
      && !diagonal1.firstElementChild.classList.contains(this.color)
    ) {
      availAttacks.push(COLS[currColIndex + 1] + ROWS[currRowIndex + 1 * sign]);
    }

    if (
      diagonal2.firstElementChild
      && !diagonal2.firstElementChild.classList.contains(this.color)
    ) {
      availAttacks.push(
        COLS[COLS.indexOf(this.position[0]) - 1] + ROWS[currRowIndex + 1 * sign],
      );
    }

    return availAttacks;
  }

  getAvailMoves() {
    const sign = this.color === 'white' ? 1 : -1;
    const availPositions = [];
    const currRowIndex = ROWS.indexOf(this.position[1]);
    const nextSquarePos = this.position[0] + ROWS[currRowIndex + 1 * sign];
    const nextNextSquarePos = this.position[0] + ROWS[currRowIndex + 2 * sign];
    const nextSquareEl = document.querySelector(`#${nextSquarePos}`);
    const nextNextSquareEl = document.querySelector(`#${nextNextSquarePos}`);

    if (nextSquareEl.firstElementChild) {
      return [];
    }

    if (nextNextSquareEl.firstElementChild || this.moveCount > 0) {
      availPositions.push(nextSquarePos);
      return availPositions;
    }

    availPositions.push(nextSquarePos, nextNextSquarePos);
    return availPositions;
  }

  // move() {}
  //
  // attack() {}
}

export default Pawn;
