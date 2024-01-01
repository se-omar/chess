import './style.css';
import Board from './board';

const username = JSON.parse(sessionStorage.getItem('username'));
if (!username) {
  const inputt = prompt('Enter your Username');
  sessionStorage.setItem('username', inputt);
}
renderBoard();

function renderBoard() {
  document.querySelector('#app').innerHTML = `
  <div>
    <h2 id="opName">waiting for a opponent to move</h2>
    <div id="board"></div>
    <h2 id="myName"></h2>
  </div>
`;

  document.querySelector('#myName').innerHTML = sessionStorage.getItem('username');
  const board = new Board();
  board.render(document.querySelector('#board'));
  board.dial();
}
