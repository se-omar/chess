import { COLS, ROWS } from '../utils/constants';

class Rook {
  moveCount = 0;

  clicked = false;

  name = 'rook';

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

  isAttackValid(el) {
    return (
      el
      && el.firstElementChild
      && !el.firstElementChild.classList.contains(this.color)
    );
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

  getMovesAndAttacks() {
    const availPositions = [];
    const availAttacks = [];
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
      ...rowBeforeMoves,
      ...rowAfterMoves,
      ...colBeforeMoves,
      ...colAfterMoves,
    );

    availAttacks.push(
      ...rowBeforeAttacks,
      ...rowAfterAttacks,
      ...colBeforeAttacks,
      ...colAfterAttacks,
    );

    return [availPositions, availAttacks];
  }
}

export default Rook;
