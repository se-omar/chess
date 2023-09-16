import './style.css';
import { renderBoard } from './board';

document.querySelector('#app').innerHTML = `
  <div>
    <div id="board"></div>
  </div>
`;

renderBoard(document.querySelector('#board'));
