import Piece from "../Piece/Piece";

import "./Board.css";
import whiteKing from "../../assets/white-pieces/white-king.png";
const Board: React.FC = () => {
  return (
    <div className="fill-window">
      <Piece image={whiteKing} team="white" />
    </div>
  );
};

export default Board;
