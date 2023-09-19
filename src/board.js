export const renderBoard = (element) => {
  const rows = ['1', '2', '3', '4', '5', '6', '7', '8'];
  const cols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const renderPiece = (id) => {
    if (id[1] === '7') {
      return "<img class='pieces pawn' src='../src/assets/blackPieces/black-pawn.png' />";
    }
    if (id[1] === '2') {
      return "<img class='pieces pawn' src='../src/assets/whitePieces/white-pawn.png' />";
    }
    switch (id) {
      case 'A8':
      case 'H8':
        return "<img class='pieces' src='../src/assets/blackPieces/black-rook.png' />";
      case 'B8':
      case 'G8':
        return "<img class='pieces' src='../src/assets/blackPieces/black-knight.png' />";
      case 'C8':
      case 'F8':
        return "<img class='pieces' src='../src/assets/blackPieces/black-bishop.png' />";
      case 'D8':
        return "<img class='pieces' src='../src/assets/blackPieces/black-king.png' />";
      case 'E8':
        return "<img class='pieces' src='../src/assets/blackPieces/black-queen.png' />";

      //
      //  white pieces
      //

      case 'A1':
      case 'H1':
        return "<img class='pieces' src='../src/assets/whitePieces/white-rook.png' />";
      case 'B1':
      case 'G1':
        return "<img class='pieces' src='../src/assets/whitePieces/white-knight.png' />";
      case 'C1':
      case 'F1':
        return "<img class='pieces' src='../src/assets/whitePieces/white-bishop.png' />";
      case 'D1':
        return "<img class='pieces' src='../src/assets/whitePieces/white-king.png' />";
      case 'E1':
        return "<img class='pieces' src='../src/assets/whitePieces/white-queen.png' />";

      default:
        return '';
    }
  };

  let rowHtml = '';
  let iswhite = false;
  for (const row of rows.reverse()) {
    rowHtml += '<div class="row">';
    iswhite = !iswhite;
    for (const col of cols) {
      rowHtml += `<span id="${col}${row}" class=${iswhite ? 'white' : 'black'}>
      ${renderPiece(col + row)}
      </span>`;
      iswhite = !iswhite;
    }

    rowHtml += '</div>';
  }

  element.innerHTML = rowHtml;

  document.querySelectorAll('.pieces').forEach((el) => {
    el.addEventListener('click', (e) => {
      console.log('e:', e);
    });
  });
};
