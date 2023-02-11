// import Piece from "../Piece/Piece";
import "./Board.css";
import whiteKing from "../../assets/white-pieces/white-king.png";
import Square from "../Square/Square";
import Piece from "../Piece/Piece";

const Board: React.FC = () => {
  const boardSize = 64;
  const squaresList = [];
  let isBlack = true;

  for (let i = 0; i < boardSize; i++) {
    const sqColor = isBlack ? "black" : "white";
    const piece = <Piece key={i} image={whiteKing} team={sqColor} />;
    squaresList.push(<Square key={i} piece={piece} team={sqColor} />);
    if ((i + 1) % 8 !== 0) isBlack = !isBlack;
  }

  return <div className="square-container">{squaresList}</div>;
};

export default Board;
