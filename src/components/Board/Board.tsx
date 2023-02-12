import "./Board.css";
import Square from "../Square/Square";
import Piece from "../Piece/Piece";
import PieceImgs from "../../imports/piece-imports";

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
      const piece = (
        <Piece key={key} image={PieceImgs.blackKnight} team={sqColor} />
      );
      row.push(<Square key={key++} piece={piece} team={sqColor} />);
      if (j !== 7) isBlack = !isBlack;
    }
    squaresMatrix.push(row);
    console.log(squaresMatrix);
  }

  return <div className="square-container">{squaresMatrix}</div>;
};

export default Board;
