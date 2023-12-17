import { COLS, ROWS } from '../utils/constants';

class King {
  moveCount = 0;

  clicked = false;

  name = 'king';

  constructor(position, color) {
    this.position = position;
    this.color = color;
  }

  render() {
    const king = document.createElement('img');
    king.classList.add('pieces', this.color, 'king');
    king.setAttribute(
      'src',
      `../src/assets/${this.color}Pieces/${this.color}-king.png`,
    );

    document.querySelector(`#${this.position}`).appendChild(king);

    return king;
  }

  pushDiagSquares(rowSign, colSign) {
    const row = ROWS.indexOf(this.position[1]);
    const col = COLS.indexOf(this.position[0]);
    let moveSquare;
    let attackSquare;
    const sq = `${COLS[col + 1 * colSign]}${ROWS[row + 1 * rowSign]}`;
    if (sq.includes('undefined')) {
      return [null, null];
    }

    const sqEl = document.querySelector(`#${sq}`);
    if (sqEl?.firstElementChild) {
      if (!sqEl.firstElementChild.classList.contains(this.color)) {
        attackSquare = sq;
      }
    } else {
      moveSquare = sq;
    }

    return [moveSquare, attackSquare];
  }

  getAvailDiags(direction) {
    switch (direction) {
      case 'top-right': {
        const squares = this.pushDiagSquares(1, 1);
        return squares;
      }

      case 'top-left': {
        const squares = this.pushDiagSquares(1, -1);
        return squares;
      }

      case 'bottom-right': {
        const squares = this.pushDiagSquares(-1, 1);
        return squares;
      }

      case 'bottom-left': {
        const squares = this.pushDiagSquares(-1, -1);
        return squares;
      }

      default:
        return [];
    }
  }

  getAvailRowsOrCols(sq) {
    if (sq.includes('undefined')) {
      return [null, null];
    }
    let availPosition;
    let availAttack;
    const nextEl = document.querySelector(`#${sq}`);
    if (nextEl?.firstElementChild) {
      if (!nextEl.firstElementChild.classList.contains(this.color)) {
        availAttack = sq;
      }
    } else {
      availPosition = sq;
    }

    return [availPosition, availAttack];
  }

  getMovesAndAttacks() {
    const availPositions = [];
    const availAttacks = [];
    const [topRightMove, topRightAttack] = this.getAvailDiags('top-right');
    const [topLeftMove, topLeftAttack] = this.getAvailDiags('top-left');
    const [bottomRightMove, bottomRightAttack] = this.getAvailDiags('bottom-right');
    const [bottomLeftMove, bottomLeftAttack] = this.getAvailDiags('bottom-left');

    const rowBefore = this.position[0] + ROWS[ROWS.indexOf(this.position[1]) - 1];
    const rowAfter = this.position[0] + ROWS[ROWS.indexOf(this.position[1]) + 1];
    const colBefore = COLS[COLS.indexOf(this.position[0]) - 1] + this.position[1];
    const colAfter = COLS[COLS.indexOf(this.position[0]) + 1] + this.position[1];

    const [rowBeforeMove, rowBeforeAttack] = this.getAvailRowsOrCols(rowBefore);
    const [rowAfterMove, rowAfterAttack] = this.getAvailRowsOrCols(rowAfter);
    const [colBeforeMove, colBeforeAttack] = this.getAvailRowsOrCols(colBefore);
    const [colAfterMove, colAfterAttack] = this.getAvailRowsOrCols(colAfter);

    availPositions.push(
      topRightMove,
      topLeftMove,
      bottomLeftMove,
      bottomRightMove,

      rowBeforeMove,
      rowAfterMove,
      colBeforeMove,
      colAfterMove,
    );

    availAttacks.push(
      topRightAttack,
      topLeftAttack,
      bottomLeftAttack,
      bottomRightAttack,

      rowBeforeAttack,
      rowAfterAttack,
      colBeforeAttack,
      colAfterAttack,
    );

    return [availPositions, availAttacks];
  }
}

export default King;
