import './style.css';
import Board from './board';

const username = sessionStorage.getItem('username');
if (!username) {
  const inputt = prompt('Enter your Username');
  sessionStorage.setItem('username', inputt);
}
renderBoard();

function renderBoard() {
  document.querySelector('#app').innerHTML = `
  <div>
    <h2 id="blackName">waiting for a opponent to move</h2>
    <div id="board"></div>
    <h2 id="whiteName"></h2>
  </div>
`;

  document.querySelector('#whiteName').innerHTML = `${sessionStorage.getItem('username')} (You)`;
  const board = new Board();
  board.render(document.querySelector('#board'));
  board.dial();
}
