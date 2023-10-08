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

  isAttackValid(el) {
    return (
      el
      && el.firstElementChild
      && !el.firstElementChild.classList.contains(this.color)
    );
  }

  getAvailAttacks() {
    const sign = this.color === 'white' ? 1 : -1;
    const availAttacks = [];

    const currRowIndex = ROWS.indexOf(this.position[1]);
    const currColIndex = COLS.indexOf(this.position[0]);
    const diagonal1Pos = COLS[currColIndex + 1] + ROWS[currRowIndex + 1 * sign];
    const diagonal2Pos = COLS[currColIndex - 1] + ROWS[currRowIndex + 1 * sign];

    const diagonal1El = document.querySelector(`#${diagonal1Pos}`);
    const diagonal2El = document.querySelector(`#${diagonal2Pos}`);

    if (this.isAttackValid(diagonal1El)) {
      availAttacks.push(diagonal1Pos);
    }

    if (this.isAttackValid(diagonal2El)) {
      availAttacks.push(diagonal2Pos);
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
}

export default Pawn;
