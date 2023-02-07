import Piece from "../Piece/Piece";
import "./Board.css";
import whiteKing from "../../assets/white-pieces/white-king.png";

const Board: React.FC = () => {
  return (
    <div className="fill-window">
      <Piece image={whiteKing} team="white" position={{ x: 5, y: 6 }} />
    </div>
  );
};

export default Board;
