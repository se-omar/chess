import { useRef } from "react";
import "./Piece.css";
import PieceImgs from "../../imports/piece-imports";
import Rook from "../Rook";
import Knight from "../Knight";
import Bishop from "../Bishop";
import Pawn from "../Pawn";
import Queen from "../Queen";
import King from "../King";

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

  const getPieceComponent = (
    name: string,
    team: string,
  ): JSX.Element | undefined => {
    if (team === "black") {
      switch (name) {
        case "rook":
          return <Rook team={team} />;
        case "knight":
          return <Knight team={team} />;
        case "bishop":
          return <Bishop team={team} />;
        case "pawn":
          return <Pawn team={team} />;
        case "queen":
          return <Queen team={team} />;
        case "king":
          return <King team={team} />;
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
  return getPieceComponent(props.name, props.team);
  /* <img
     className="piece-style"
     onDragStart={(e) => dragStart(e)}
     onDragEnd={(e) => dragEnd(e)}
     draggable
     src={image}
   /> */
};

// const onMouseDown: MouseEventHandler<HTMLDivElement> = () => {
//   console.log("asdf");
// };

export default Piece;
