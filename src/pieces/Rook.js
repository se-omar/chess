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

  // isAttackValid(el) {}

  getAvailAttacks() {}

  getAvailMoves() {
    const availPositions = [];
    const rowsBefore = ROWS.filter((r) => r < this.position[1]).reverse();
    const rowsAfter = ROWS.filter((r) => r > this.position[1]);
    const colsBefore = COLS.filter((c) => c < this.position[0]).reverse();
    const colsAfter = COLS.filter((c) => c > this.position[0]);

    for (let i = 0; i < rowsBefore.length; i += 1) {
      const rb = rowsBefore[i];
      const nextEl = document.querySelector(`#${this.position[0] + rb}`);
      if (nextEl?.firstElementChild) break;
      availPositions.push(this.position[0] + rb);
    }

    for (let i = 0; i < rowsAfter.length; i += 1) {
      const ra = rowsAfter[i];
      const nextEl = document.querySelector(`#${this.position[0] + ra}`);
      if (nextEl?.firstElementChild) break;
      availPositions.push(this.position[0] + ra);
    }

    for (let i = 0; i < colsBefore.length; i += 1) {
      const cb = colsBefore[i];
      const nextEl = document.querySelector(`#${cb + this.position[1]}`);
      if (nextEl?.firstElementChild) break;
      availPositions.push(cb + this.position[1]);
    }

    for (let i = 0; i < colsAfter.length; i += 1) {
      const ca = colsAfter[i];
      const nextEl = document.querySelector(`#${ca + this.position[1]}`);
      if (nextEl?.firstElementChild) break;
      availPositions.push(ca + this.position[1]);
    }

    return availPositions;
  }
}

export default Rook;
