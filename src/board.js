import Pawn from './pieces/Pawn';
import { COLS, ROWS } from './utils/constants';

const handlePieceClick = (piece, element) => {
  if (!element.classList.contains('clickedPiece')) {
    element.classList.add('clickedPiece');
    const [availCols, availRows] = piece.getAvailableMoves();
    piece.highlightMoves(availCols, availRows);
  } else {
    piece.removeHighlight();
    element.classList.remove('clickedPiece');
  }

  document.querySelectorAll('.clickedPiece').forEach((el) => {
    if (el !== element) {
      el.classList.remove('clickedPiece');
    }
  });
};

const renderPiece = (id) => {
  const whitePawn = new Pawn(id[0], id[1], 'white');
  const blackPawn = new Pawn(id[0], id[1], 'black');
  if (id[1] === '7') {
    const blackPawnEl = blackPawn.render();
    blackPawnEl.addEventListener('click', () => {
      handlePieceClick(blackPawn, blackPawnEl);
    });
  }
  if (id[1] === '2') {
    const whitePawnEl = whitePawn.render();
    whitePawnEl.addEventListener('click', () => {
      handlePieceClick(whitePawn, whitePawnEl);
    });
  }
  // switch (id) {
  //   case 'A8':
  //   case 'H8':
  //     return "<img class='pieces' src='../src/assets/blackPieces/black-rook.png' />";
  //   case 'B8':
  //   case 'G8':
  //     return "<img class='pieces' src='../src/assets/blackPieces/black-knight.png' />";
  //   case 'C8':
  //   case 'F8':
  //     return "<img class='pieces' src='../src/assets/blackPieces/black-bishop.png' />";
  //   case 'D8':
  //     return "<img class='pieces' src='../src/assets/blackPieces/black-king.png' />";
  //   case 'E8':
  //     return "<img class='pieces' src='../src/assets/blackPieces/black-queen.png' />";
  //
  //   //
  //   //  white pieces
  //   //
  //
  //   case 'A1':
  //   case 'H1':
  //     return "<img class='pieces' src='../src/assets/whitePieces/white-rook.png' />";
  //   case 'B1':
  //   case 'G1':
  //     return "<img class='pieces' src='../src/assets/whitePieces/white-knight.png' />";
  //   case 'C1':
  //   case 'F1':
  //     return "<img class='pieces' src='../src/assets/whitePieces/white-bishop.png' />";
  //   case 'D1':
  //     return "<img class='pieces' src='../src/assets/whitePieces/white-king.png' />";
  //   case 'E1':
  //     return "<img class='pieces' src='../src/assets/whitePieces/white-queen.png' />";
  //
  //   default:
  //     return '';
  // }
};

const movePiece = (e) => {
  if (e.target.classList.contains('highlighted')) {
    const clickedPiece = document.querySelector('.clickedPiece');
    e.target.appendChild(clickedPiece);
  }
};

export const renderBoard = (element) => {
  let rowHtml = '';
  let iswhite = false;
  for (const row of ROWS.reverse()) {
    rowHtml += '<div class="row">';
    iswhite = !iswhite;
    for (const col of COLS) {
      rowHtml += `<span id="${col}${row}" class=${
        iswhite ? 'white' : 'black'
      }> </span>`;
      iswhite = !iswhite;
    }

    rowHtml += '</div>';
  }

  element.innerHTML = rowHtml;

  for (const row of ROWS.reverse()) {
    for (const col of COLS) {
      renderPiece(col + row);
      document
        .querySelector(`#${col}${row}`)
        .addEventListener('click', movePiece);
    }
  }
};
