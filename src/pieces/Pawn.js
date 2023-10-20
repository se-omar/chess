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

  getMovesAndAttacks() {
    const sign = this.color === 'white' ? 1 : -1;
    let availPositions = [];
    const availAttacks = [];

    const currRowIndex = ROWS.indexOf(this.position[1]);
    const currColIndex = COLS.indexOf(this.position[0]);

    const nextSquarePos = this.position[0] + ROWS[currRowIndex + 1 * sign];
    const nextNextSquarePos = this.position[0] + ROWS[currRowIndex + 2 * sign];
    const nextSquareEl = document.querySelector(`#${nextSquarePos}`);
    const nextNextSquareEl = document.querySelector(`#${nextNextSquarePos}`);

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

    if (nextSquareEl.firstElementChild) {
      availPositions = [];
    } else if (nextNextSquareEl.firstElementChild || this.moveCount > 0) {
      availPositions.push(nextSquarePos);
    } else {
      availPositions.push(nextSquarePos, nextNextSquarePos);
    }

    return [availPositions, availAttacks];
  }
}

export default Pawn;
