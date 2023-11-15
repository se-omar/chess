import { COLS, ROWS } from '../utils/constants';

class Queen {
  moveCount = 0;

  clicked = false;

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

  pushDiagSquares(rowSign, colSign, pos) {
    const row = ROWS.indexOf(pos[1]);
    const col = COLS.indexOf(pos[0]);
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

  getAvailDiags(pos, direction) {
    switch (direction) {
      case 'top-right': {
        const squares = this.pushDiagSquares(1, 1, pos);
        return squares;
      }

      case 'top-left': {
        const squares = this.pushDiagSquares(1, -1, pos);
        return squares;
      }

      case 'bottom-right': {
        const squares = this.pushDiagSquares(-1, 1, pos);
        return squares;
      }

      case 'bottom-left': {
        const squares = this.pushDiagSquares(-1, -1, pos);
        return squares;
      }

      default:
        return [];
    }
  }

  getMovesAndAttacks() {
    const availPositions = [];
    const availAttacks = [];
    const [topRightMoves, topRightAttacks] = this.getAvailDiags(
      this.position,
      'top-right',
    );
    const [topLeftMoves, topLeftAttacks] = this.getAvailDiags(
      this.position,
      'top-left',
    );
    const [bottomRightMoves, bottomRightAttacks] = this.getAvailDiags(
      this.position,
      'bottom-right',
    );
    const [bottomLeftMoves, bottomLeftAttacks] = this.getAvailDiags(
      this.position,
      'bottom-left',
    );

    availPositions.push(
      ...topRightMoves,
      ...topLeftMoves,
      ...bottomLeftMoves,
      ...bottomRightMoves,
    );

    availAttacks.push(
      ...topRightAttacks,
      ...topLeftAttacks,
      ...bottomLeftAttacks,
      ...bottomRightAttacks,
    );

    return [availPositions, availAttacks];
  }
}

export default Queen;
