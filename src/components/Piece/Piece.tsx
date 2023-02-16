import { useRef } from "react";
import "./Piece.css";
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
  switch (props.name) {
    case "rook":
      return <Rook team={props.team} />;
    case "knight":
      return <Knight team={props.team} />;
    case "bishop":
      return <Bishop team={props.team} />;
    case "pawn":
      return <Pawn team={props.team} />;
    case "queen":
      return <Queen team={props.team} />;
    case "king":
      return <King team={props.team} />;
    default:
      return <King team={props.team} />;
  }
  /* <img
     className="piece-style"
     onDragStart={(e) => dragStart(e)}
     onDragEnd={(e) => dragEnd(e)}
     draggable
     src={image}
   /> */
};

export default Piece;
