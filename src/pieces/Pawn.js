class Pawn {
  constructor(col, row, color) {
    this.col = col;
    this.row = row;
    this.color = color;
  }

  render() {
    const pawn = document.createElement('img');
    pawn.setAttribute('class', 'pieces pawn');
    pawn.setAttribute(
      'src',
      `../src/assets/${this.color}Pieces/${this.color}-pawn.png`,
    );

    pawn.click((e) => {
      console.log('e:', e);
    });
    document.querySelector(`#${this.col}${this.row}`).appendChild(pawn);
  }

  getAvailableMoves() {}

  // move() {}
  //
  // attack() {}
}

export default Pawn;
