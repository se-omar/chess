import { useRef } from "react";
import "./Piece.css";
import PieceImgs from "../../imports/piece-imports";

interface Props {
  team: string;
  name: string;
  position?: Position;
}

interface Position {
  x: number;
  y: number;
}

const Piece: React.FC<Props> = (props: Props) => {
  const dragPiece = useRef<number>(0);
  // const [width, setWidth] = useState(0);
  // const [height, setHeight] = useState(0);

  const getPieceImage = (name: string, team: string): string | undefined => {
    if (team === "black") {
      switch (name) {
        case "rook":
          return PieceImgs.blackRook;
        case "knight":
          return PieceImgs.blackKnight;
        case "bishop":
          return PieceImgs.blackBishop;
        case "pawn":
          return PieceImgs.blackPawn;
        case "queen":
          return PieceImgs.blackQueen;
        case "king":
          return PieceImgs.blackKing;
      }
    }

    if (team === "white") {
      switch (name) {
        case "rook":
          return PieceImgs.whiteRook;
        case "knight":
          return PieceImgs.whiteKnight;
        case "bishop":
          return PieceImgs.whiteBishop;
        case "pawn":
          return PieceImgs.whitePawn;
        case "queen":
          return PieceImgs.whiteQueen;
        case "king":
          return PieceImgs.whiteKing;
      }
    }
  };

  const dragStart: any = (e: any, position: number) => {
    dragPiece.current = position;
    console.log(e.target);
  };

  const dragEnd: any = (e: DragEvent) => {
    // setWidth(e.clientX - 50);
    // setHeight(e.clientY - 50);
    console.log("drag end");
    console.log("client x: ", e.clientX);
    console.log("client y: ", e.clientY);
  };

  // const dragEnter: any = (e: any) => {
  //   // dragOverItem.current = position;
  //   console.log("drag enter");
  // };
  const image = getPieceImage(props.name, props.team);
  return (
    <img
      className="piece-style"
      onDragStart={(e) => dragStart(e)}
      onDragEnd={(e) => dragEnd(e)}
      draggable
      src={image}
    />
  );
};

// const onMouseDown: MouseEventHandler<HTMLDivElement> = () => {
//   console.log("asdf");
// };

export default Piece;
