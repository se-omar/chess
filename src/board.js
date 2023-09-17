export const renderBoard = (element) => {
  const rows = ['1', '2', '3', '4', '5', '6', '7', '8'];
  const cols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  let rowHtml = '';
  for (const row of rows.reverse()) {
    rowHtml += '<div>';
    for (const col of cols) {
      rowHtml += `<span class=${
        cols.indexOf(col) % 2 === 0 ? 'black' : ''
      }> ${col}${row}</span>`;
    }
    rowHtml += '</div>';
  }

  element.innerHTML = rowHtml;
  console.log('aeu');
};
