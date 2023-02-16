import "./Board.css";
import Square from "../Square/Square";
import Piece from "../Piece/Piece";
import PieceImgs from "../../imports/piece-imports";

const Board: React.FC = () => {
  const rowSize = 8;
  const colSize = 8;
  let squaresMatrix: JSX.Element[][] = [];
  let isBlack = true;
  let sqColor = "black";

  const getPieceByPosition: any = (row: number, col: number) => {
    if (row === 0) {
      switch (col) {
        case 0:
        case 7:
          return PieceImgs.blackRook;
        case 1:
        case 6:
          return PieceImgs.blackKnight;
        case 2:
        case 5:
          return PieceImgs.blackBishop;
        case 3:
          return PieceImgs.blackQueen;
        case 4:
          return PieceImgs.blackKing;
      }
    }

    if (row === 1) return PieceImgs.blackPawn;
  };

  const fillMatrix = (): JSX.Element[][] => {
    let key = 0;
    const matrix: JSX.Element[][] = [];
    for (let i = 0; i < colSize; i++) {
      const row: JSX.Element[] = [];
      for (let j = 0; j < rowSize; j++) {
        sqColor = isBlack ? "black" : "white";
        const pieceImg = getPieceByPosition(i, j);
        const piece = <Piece key={key} image={pieceImg} team={sqColor} />;
        row.push(<Square key={key++} piece={piece} team={sqColor} />);
        if (j !== 7) isBlack = !isBlack;
      }
      matrix.push(row);
    }

    return matrix;
  };

  squaresMatrix = fillMatrix();

  return <div className="square-container">{squaresMatrix}</div>;
};

export default Board;
