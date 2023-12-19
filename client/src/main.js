import './style.css';
import Board from './board';

document.querySelector('#app').innerHTML = `
  <div>
    <div id="board"></div>
  </div>
`;

const board = new Board();
board.render(document.querySelector('#board'));
