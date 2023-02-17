import whiteSquare from "../../assets/white-square.jpeg";
import blackSquare from "../../assets/black-square.jpeg";
// import whiteKing from "../../assets/white-pieces/white-king.png";
import "./Square.css";
// import Piece from "../Piece/Piece";

interface Props {
  team: string;
  piece: JSX.Element | null;
}

const Square: React.FC<Props> = ({ team: color, piece }: Props) => {
  return (
    <div className="square-div">
      <img
        className="square-img"
        src={color === "black" ? blackSquare : whiteSquare}
      />
      {piece !== null && piece}
    </div>
  );
};

export default Square;
