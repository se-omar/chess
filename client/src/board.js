import Bishop from './pieces/Bishop';
import King from './pieces/King';
import Knight from './pieces/Knight';
import Pawn from './pieces/Pawn';
import Queen from './pieces/Queen';
import Rook from './pieces/Rook';
import { COLS, ROWS } from './utils/constants';
import { isArrayValid } from './utils/helperFns';

// appendLog appends the passed text to messageLog.

class Board {
  turn = 'white';

  check = false;

  checkMate = false;

  stalemate = false;

  pieces = {};

  dial() {
    let expectingMessage = false;
    const conn = new WebSocket('ws://localhost:3000/subscribe');

    conn.addEventListener('close', (ev) => {
      if (ev.code !== 1001) {
        console.log('dialing back in 1 second...');
        setTimeout(this.dial, 1000);
      }
    });
    conn.addEventListener('open', () => {
      console.info('websocket connected');
    });

    // This is where we handle messages received.
    conn.addEventListener('message', (ev) => {
      if (typeof ev.data !== 'string') {
        console.error('unexpected message type', typeof ev.data);
        return;
      }
      console.log('dataaa: ', ev.data);
      const [from, to] = ev.data.split(' ');
      this.moveClickedPiece(from, to);
      if (expectingMessage) {
        expectingMessage = false;
      }
    });
  }

  publishMove(from, to) {
    fetch('http://localhost:3000/publish', {
      method: 'POST',
      body: `${from} ${to}`,
    });
  }

  render(element) {
    let rowHtml = '';
    let iswhite = false;
    for (const row of ROWS.reverse()) {
      rowHtml += '<div class="row">';
      iswhite = !iswhite;
      for (const col of COLS) {
        rowHtml += `<span id="${col}${row}" class=${
          iswhite ? 'white-cell' : 'black-cell'
        }> ${col}${row} </span>`;
        iswhite = !iswhite;
      }

      rowHtml += '</div>';
    }

    element.innerHTML = rowHtml;

    for (const row of ROWS.reverse()) {
      for (const col of COLS) {
        this.renderPiece(col + row);
        document
          .querySelector(`#${col}${row}`)
          .addEventListener('click', (e) => {
            this.handleMovePiece(e);
          });
      }
    }
  }

  switchTurns() {
    if (this.turn === 'white') {
      this.turn = 'black';
    } else {
      this.turn = 'white';
    }
  }

  addPieces(piece, position) {
    this.pieces[position] = piece;
  }

  markMoves(availMoves) {
    this.removeMark();
    availMoves.forEach((pos) => {
      if (pos) {
        document.querySelector(`#${pos}`).classList.add('move');
      }
    });
  }

  markAttacks(availAttacks) {
    availAttacks.forEach((pos) => {
      if (pos) {
        document.querySelector(`#${pos}`).classList.add('attack');
      }
    });
  }

  handlePieceClick(piece, element) {
    if (element.parentElement.classList.contains('attack')) {
      this.moveClickedPiece(element.parentElement);
      this.removePiece(element);
      return;
    }

    if (this.check && piece.name !== 'king') {
      return;
    }

    if (this.turn !== piece.color) {
      return;
    }

    if (!element.classList.contains('clickedPiece')) {
      element.classList.add('clickedPiece');
      const [availMoves, availAttacks] = piece.getMovesAndAttacks(this.pieces);

      this.markMoves(availMoves);
      this.markAttacks(availAttacks);
    } else {
      this.removeMark();
      element.classList.remove('clickedPiece');
    }

    document.querySelectorAll('.clickedPiece').forEach((el) => {
      if (el !== element) {
        el.classList.remove('clickedPiece');
      }
    });
  }

  renderPiece(id) {
    if (id[1] === '7') {
      const blackPawn = new Pawn(id, 'black');
      const blackPawnEl = blackPawn.render();
      this.addPieces(blackPawn, id);
      blackPawnEl.addEventListener('click', () => {
        this.handlePieceClick(blackPawn, blackPawnEl);
      });
    }
    if (id[1] === '2') {
      const whitePawn = new Pawn(id, 'white');
      const whitePawnEl = whitePawn.render();
      this.addPieces(whitePawn, id);
      whitePawnEl.addEventListener('click', () => {
        this.handlePieceClick(whitePawn, whitePawnEl);
      });
    }
    switch (id) {
      case 'A8':
      case 'H8': {
        const blackRook = new Rook(id, 'black');
        const blackRookEl = blackRook.render();
        this.addPieces(blackRook, id);
        blackRookEl.addEventListener('click', () => {
          this.handlePieceClick(blackRook, blackRookEl);
        });
        break;
      }
      case 'B8':
      case 'G8': {
        const blackKnight = new Knight(id, 'black');
        const blackKnightEl = blackKnight.render();
        this.addPieces(blackKnight, id);
        blackKnightEl.addEventListener('click', () => {
          this.handlePieceClick(blackKnight, blackKnightEl);
        });
        break;
      }
      case 'C8':
      case 'F8': {
        const blackBishop = new Bishop(id, 'black');
        const blackBishopEl = blackBishop.render();
        this.addPieces(blackBishop, id);
        blackBishopEl.addEventListener('click', () => {
          this.handlePieceClick(blackBishop, blackBishopEl);
        });
        break;
      }
      case 'E8': {
        const blackKing = new King(id, 'black');
        const blackKingEl = blackKing.render();
        this.addPieces(blackKing, id);
        blackKingEl.addEventListener('click', () => {
          this.handlePieceClick(blackKing, blackKingEl);
        });
        break;
      }
      case 'D8': {
        const blackQueen = new Queen(id, 'black');
        const blackQueenEl = blackQueen.render();
        this.addPieces(blackQueen, id);
        blackQueenEl.addEventListener('click', () => {
          this.handlePieceClick(blackQueen, blackQueenEl);
        });
        break;
      }

      //
      //  white pieces
      //

      case 'A1':
      case 'H1': {
        const whiteRook = new Rook(id, 'white');
        const whiteRookEl = whiteRook.render();
        this.addPieces(whiteRook, id);
        whiteRookEl.addEventListener('click', () => {
          this.handlePieceClick(whiteRook, whiteRookEl);
        });
        break;
      }
      case 'B1':
      case 'G1': {
        const whiteKnight = new Knight(id, 'white');
        const whiteKnightEl = whiteKnight.render();
        this.addPieces(whiteKnight, id);
        whiteKnightEl.addEventListener('click', () => {
          this.handlePieceClick(whiteKnight, whiteKnightEl);
        });
        break;
      }
      case 'C1':
      case 'F1': {
        const whiteBishop = new Bishop(id, 'white');
        const whiteBishopEl = whiteBishop.render();
        this.addPieces(whiteBishop, id);
        whiteBishopEl.addEventListener('click', () => {
          this.handlePieceClick(whiteBishop, whiteBishopEl);
        });
        break;
      }
      case 'E1': {
        const whiteKing = new King(id, 'white');
        const whiteKingEl = whiteKing.render();
        this.addPieces(whiteKing, id);
        whiteKingEl.addEventListener('click', () => {
          this.handlePieceClick(whiteKing, whiteKingEl);
        });
        break;
      }
      case 'D1': {
        const whiteQueen = new Queen(id, 'white');
        const whiteQueenEl = whiteQueen.render();
        this.addPieces(whiteQueen, id);
        whiteQueenEl.addEventListener('click', () => {
          this.handlePieceClick(whiteQueen, whiteQueenEl);
        });
        break;
      }

      default:
    }
  }

  removeMark() {
    document
      .querySelectorAll('.move')
      .forEach((el) => el.classList.remove('move'));

    document
      .querySelectorAll('.attack')
      .forEach((el) => el.classList.remove('attack'));
  }

  moveClickedPiece(from, to) {
    const clickedPiece = document.querySelector(`#${from}`).children[0];
    const piece = this.pieces[from];
    const targetEl = document.querySelector(`#${to}`);
    targetEl.appendChild(clickedPiece);
    piece.position = targetEl.id;
    delete this.pieces[from];
    this.pieces[targetEl.id] = piece;
    piece.moveCount += 1;

    const [kingChecked, king] = this.isKingChecked();

    if (kingChecked) {
      document.querySelector(`#${king.position}`).classList.add('checked');
      this.check = true;
      king.check = true;
    } else {
      document.querySelector(`#${king.position}`).classList.remove('checked');
      king.check = false;
    }

    const [kingMoves, kingAttacks] = this.getKingMovesAndAttacks();

    if (this.isKingDead(kingMoves, kingAttacks, king)) {
      this.checkMate = true;
      alert('checkmate');
    }

    // if (this.isStalemate(kingMoves, kingAttacks, king)) {
    //   this.stalemate = true;
    //   alert('stalemate');
    // }

    this.removeMark();
    this.switchTurns();
  }

  handleMovePiece(e) {
    if (e.target.classList.contains('move')) {
      const clickedPiece = document.querySelector('.clickedPiece');
      const position = clickedPiece.parentElement.id;
      this.publishMove(position, e.target.id);
      this.moveClickedPiece(position, e.target.id);
    }
  }

  isKingChecked() {
    const kingPos = this.getKingPosition();

    for (const pos in this.pieces) {
      const [availMoves, availAttacks] = this.pieces[pos].getMovesAndAttacks();
      if (availAttacks.includes(kingPos)) {
        return [true, this.pieces[kingPos]];
      }
    }
    return [false, this.pieces[kingPos]];
  }

  getKingPosition() {
    for (const pos in this.pieces) {
      const piece = this.pieces[pos];
      if (piece.name === 'king' && piece.color !== this.turn) {
        return pos;
      }
    }

    return '';
  }

  isKingDead(kingMoves, kingAttacks, king) {
    if (king.check && !isArrayValid(kingMoves) && !isArrayValid(kingAttacks)) {
      return true;
    }
    return false;
  }

  isStalemate(kingMoves, kingAttacks, king) {
    if (!king.check && !isArrayValid(kingMoves) && !isArrayValid(kingAttacks)) {
      return true;
    }
    return false;
  }

  getKingMovesAndAttacks() {
    const kingPos = this.getKingPosition();
    const [kingMoves, kingAttacks] = this.pieces[kingPos].getMovesAndAttacks(
      this.pieces,
    );

    return [kingMoves, kingAttacks];
  }

  removePiece(el) {
    el.remove();
  }
}

export default Board;
