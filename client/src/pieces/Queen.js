import { COLS, ROWS } from '../utils/constants';

class Queen {
  moveCount = 0;

  clicked = false;

  name = 'queen';

  constructor(position, color) {
    this.position = position;
    this.color = color;
  }

  render() {
    const queen = document.createElement('img');
    queen.classList.add('pieces', this.color, 'queen');
    queen.setAttribute(
      'src',
      `../src/assets/${this.color}Pieces/${this.color}-queen.png`,
    );

    document.querySelector(`#${this.position}`).appendChild(queen);

    return queen;
  }

  pushDiagSquares(rowSign, colSign) {
    const row = ROWS.indexOf(this.position[1]);
    const col = COLS.indexOf(this.position[0]);
    const moveSquares = [];
    const attackSquares = [];
    let i = 1;
    while (i < ROWS.length) {
      const sq = `${COLS[col + i * colSign]}${ROWS[row + i * rowSign]}`;
      if (sq.includes('undefined')) {
        break;
      }

      const sqEl = document.querySelector(`#${sq}`);
      if (sqEl?.firstElementChild) {
        if (!sqEl.firstElementChild.classList.contains(this.color)) {
          attackSquares.push(sq);
        }
        break;
      }
      moveSquares.push(sq);
      i += 1;
    }

    return [moveSquares, attackSquares];
  }

  pushPossibleSquares(rowSign, colSign) {
    const row = ROWS.indexOf(this.position[1]);
    const col = COLS.indexOf(this.position[0]);
    const attackSquares = [];
    let i = 1;
    while (i < ROWS.length) {
      const sq = `${COLS[col + i * colSign]}${ROWS[row + i * rowSign]}`;
      if (sq.includes('undefined')) {
        break;
      }

      const sqEl = document.querySelector(`#${sq}`);
      if (
        sqEl?.firstElementChild
        && sqEl.firstElementChild.classList.contains(this.color)
      ) {
        attackSquares.push(sq);
        break;
      }
      attackSquares.push(sq);
      i += 1;
    }

    return attackSquares;
  }

  getPossibleRowsOrCols(lineArr, direction) {
    const attacks = [];
    for (let i = 0; i < lineArr.length; i += 1) {
      const el = lineArr[i];
      const newPos = direction === 'row' ? this.position[0] + el : el + this.position[1];
      const nextEl = document.querySelector(`#${newPos}`);
      if (
        nextEl?.firstElementChild
        && nextEl.firstElementChild.classList.contains(this.color)
      ) {
        attacks.push(newPos);
        break;
      }
      attacks.push(newPos);
    }

    return attacks;
  }

  getAvailRowsOrCols(lineArr, direction) {
    const availPositions = [];
    const availAttacks = [];
    for (let i = 0; i < lineArr.length; i += 1) {
      const el = lineArr[i];
      const newPos = direction === 'row' ? this.position[0] + el : el + this.position[1];
      const nextEl = document.querySelector(`#${newPos}`);
      if (nextEl?.firstElementChild) {
        if (!nextEl.firstElementChild.classList.contains(this.color)) {
          availAttacks.push(newPos);
        }
        break;
      }
      availPositions.push(newPos);
    }

    return [availPositions, availAttacks];
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

  getPossibleDiags(direction) {
    switch (direction) {
      case 'top-right': {
        const squares = this.pushPossibleSquares(1, 1);
        return squares;
      }

      case 'top-left': {
        const squares = this.pushPossibleSquares(1, -1);
        return squares;
      }

      case 'bottom-right': {
        const squares = this.pushPossibleSquares(-1, 1);
        return squares;
      }

      case 'bottom-left': {
        const squares = this.pushPossibleSquares(-1, -1);
        return squares;
      }

      default:
        return [];
    }
  }

  getPossibleAttacks() {
    const attacks = [];
    const topRightAttacks = this.getPossibleDiags('top-right');
    const topLeftAttacks = this.getPossibleDiags('top-left');
    const bottomRightAttacks = this.getPossibleDiags('bottom-right');
    const bottomLeftAttacks = this.getPossibleDiags('bottom-left');

    const rowsBefore = ROWS.filter((r) => r < this.position[1]).reverse();
    const rowsAfter = ROWS.filter((r) => r > this.position[1]);
    const colsBefore = COLS.filter((c) => c < this.position[0]).reverse();
    const colsAfter = COLS.filter((c) => c > this.position[0]);

    const rowBeforeAttacks = this.getPossibleRowsOrCols(rowsBefore, 'row');
    const rowAfterAttacks = this.getPossibleRowsOrCols(rowsAfter, 'row');
    const colBeforeAttacks = this.getPossibleRowsOrCols(colsBefore, 'col');
    const colAfterAttacks = this.getPossibleRowsOrCols(colsAfter, 'col');

    attacks.push(
      ...topRightAttacks,
      ...topLeftAttacks,
      ...bottomLeftAttacks,
      ...bottomRightAttacks,

      ...rowBeforeAttacks,
      ...rowAfterAttacks,
      ...colBeforeAttacks,
      ...colAfterAttacks,
    );

    return attacks;
  }

  getMovesAndAttacks() {
    const availPositions = [];
    const availAttacks = [];
    const [topRightMoves, topRightAttacks] = this.getAvailDiags('top-right');
    const [topLeftMoves, topLeftAttacks] = this.getAvailDiags('top-left');
    const [bottomRightMoves, bottomRightAttacks] = this.getAvailDiags('bottom-right');
    const [bottomLeftMoves, bottomLeftAttacks] = this.getAvailDiags('bottom-left');

    const rowsBefore = ROWS.filter((r) => r < this.position[1]).reverse();
    const rowsAfter = ROWS.filter((r) => r > this.position[1]);
    const colsBefore = COLS.filter((c) => c < this.position[0]).reverse();
    const colsAfter = COLS.filter((c) => c > this.position[0]);

    const [rowBeforeMoves, rowBeforeAttacks] = this.getAvailRowsOrCols(
      rowsBefore,
      'row',
    );
    const [rowAfterMoves, rowAfterAttacks] = this.getAvailRowsOrCols(
      rowsAfter,
      'row',
    );
    const [colBeforeMoves, colBeforeAttacks] = this.getAvailRowsOrCols(
      colsBefore,
      'col',
    );
    const [colAfterMoves, colAfterAttacks] = this.getAvailRowsOrCols(
      colsAfter,
      'col',
    );

    availPositions.push(
      ...topRightMoves,
      ...topLeftMoves,
      ...bottomLeftMoves,
      ...bottomRightMoves,

      ...rowBeforeMoves,
      ...rowAfterMoves,
      ...colBeforeMoves,
      ...colAfterMoves,
    );

    availAttacks.push(
      ...topRightAttacks,
      ...topLeftAttacks,
      ...bottomLeftAttacks,
      ...bottomRightAttacks,

      ...rowBeforeAttacks,
      ...rowAfterAttacks,
      ...colBeforeAttacks,
      ...colAfterAttacks,
    );

    return [availPositions, availAttacks];
  }
}

export default Queen;
