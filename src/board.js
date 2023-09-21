import Pawn from './pieces/Pawn';
import { COLS, ROWS } from './utils/constants';

const pieces = {};
function addPieces(piece, position) {
  pieces[position] = piece;
}

function highlightMoves(piece, availCols, availRows) {
  removeHighlight();

  availCols.forEach((col) => {
    document.querySelector(`#${col}${piece.row}`).classList.add('highlighted');
  });

  availRows.forEach((row) => {
    document.querySelector(`#${piece.col}${row}`).classList.add('highlighted');
  });
}
function handlePieceClick(piece, element) {
  if (!element.classList.contains('clickedPiece')) {
    element.classList.add('clickedPiece');
    const [availCols, availRows] = piece.getAvailableMoves(element);
    highlightMoves(piece, availCols, availRows);
  } else {
    removeHighlight();
    element.classList.remove('clickedPiece');
  }

  document.querySelectorAll('.clickedPiece').forEach((el) => {
    if (el !== element) {
      el.classList.remove('clickedPiece');
    }
  });
}

function renderPiece(id) {
  const whitePawn = new Pawn(id[0], id[1], 'white');
  const blackPawn = new Pawn(id[0], id[1], 'black');
  if (id[1] === '7') {
    const blackPawnEl = blackPawn.render();
    addPieces(blackPawn, id);
    blackPawnEl.addEventListener('click', () => {
      handlePieceClick(blackPawn, blackPawnEl);
    });
  }
  if (id[1] === '2') {
    const whitePawnEl = whitePawn.render();
    addPieces(whitePawn, id);
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
}

function removeHighlight() {
  document
    .querySelectorAll('.highlighted')
    .forEach((el) => el.classList.remove('highlighted'));
}

function movePiece(e) {
  if (e.target.classList.contains('highlighted')) {
    const clickedPiece = document.querySelector('.clickedPiece');
    const position = clickedPiece.parentElement.id;
    const piece = pieces[position];
    e.target.appendChild(clickedPiece);
    [piece.col, piece.row] = e.target.id;
    delete pieces[position];
    pieces[e.target.id] = piece;
    piece.moveCount += 1;

    removeHighlight();
  }
}

export function renderBoard(element) {
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
}
