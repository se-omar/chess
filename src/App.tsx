import React, { type ReactElement } from "react";
import "./App.css";
import Board from "./components/Board/Board";


const App: React.FC = (): ReactElement => {
  return (
    <div className="App">
      <Board />
    </div>
  );
};

export default App;
