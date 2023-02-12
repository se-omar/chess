// import Piece from "../Piece/Piece";
import "./Board.css";
import whiteKing from "../../assets/white-pieces/white-king.png";
import Square from "../Square/Square";
import Piece from "../Piece/Piece";

const Board: React.FC = () => {
  const rowSize = 8;
  const colSize = 8;
  const squaresMatrix: JSX.Element[][] = [];
  let isBlack = true;
  let sqColor = "black";
  let key = 0;

  for (let i = 0; i < colSize; i++) {
    const row: JSX.Element[] = [];
    for (let j = 0; j < rowSize; j++) {
      sqColor = isBlack ? "black" : "white";
      const piece = <Piece key={key} image={whiteKing} team={sqColor} />;
      row.push(<Square key={key++} piece={piece} team={sqColor} />);
      if (j !== 7) isBlack = !isBlack;
    }
    squaresMatrix.push(row);
    console.log(squaresMatrix);
  }

  return <div className="square-container">{squaresMatrix}</div>;
};

export default Board;
