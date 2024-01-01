import './style.css';
import Board from './board';

const username = localStorage.getItem('username');
if (!username) {
  renderLogin();
  document.querySelector('#loginBtn').addEventListener('click', handleLogin);
} else {
  renderBoard();
  const board = new Board();
  board.render(document.querySelector('#board'));
  board.dial();
}

function renderLogin() {
  document.querySelector('#app').innerHTML = `
  <div>
    <input type="text" id="userInput" />
    <button id="loginBtn" type="button">Sign in</button>
  </div>
`;
}

function renderBoard() {
  document.querySelector('#app').innerHTML = `
  <div>
    <div id="board"></div>
  </div>
`;
}

function handleLogin() {
  const userInput = document.querySelector('#userInput').value;
  if (!userInput) {
    alert('enter a valid username');
  }
  localStorage.setItem('username', userInput);
  renderBoard();
}
