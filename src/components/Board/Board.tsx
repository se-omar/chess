import "./Board.css";
import Square from "../Square/Square";
import Piece from "../Piece/Piece";
// import PieceImgs from "../../imports/piece-imports";

const Board: React.FC = () => {
  const rowSize = 8;
  const colSize = 8;
  let squaresMatrix: JSX.Element[][] = [];
  let isBlack = true;
  let sqColor = "black";

  const getPieceByPosition: any = (row: number, col: number) => {
    let name = "";
    let team = "";
    if (row === 0 || row === 1) team = "black";
    else if (row === 7 || row === 6) team = "white";

    if (row === 1 || row === 6) {
      name = "pawn";
    } else {
      switch (col) {
        case 0:
        case 7:
          name = "rook";
          break;
        case 1:
        case 6:
          name = "knight";
          break;
        case 2:
        case 5:
          name = "bishop";
          break;
        case 3:
          name = "queen";
          break;
        case 4:
          name = "king";
          break;
      }
    }

    return {
      name,
      team,
    };
  };

  const fillMatrix = (): JSX.Element[][] => {
    let key = 0;
    const matrix: JSX.Element[][] = [];
    for (let i = 0; i < colSize; i++) {
      const row: JSX.Element[] = [];
      for (let j = 0; j < rowSize; j++) {
        sqColor = isBlack ? "black" : "white";
        const pieceInfo = getPieceByPosition(i, j);
        let piece = null;
        if (pieceInfo.team !== "") {
          piece = (
            <Piece key={key} name={pieceInfo.name} team={pieceInfo.team} />
          );
        }
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
