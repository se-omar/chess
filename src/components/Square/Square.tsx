import whiteSquare from "../../assets/white-square.jpeg";
import blackSquare from "../../assets/black-square.jpeg";
import "./Square.css";

interface Props {
  color: string;
}

const Square: React.FC<Props> = ({ color }: Props) => {
  return (
    <span className="square">
      <img
        className="square-img"
        src={color === "black" ? blackSquare : whiteSquare}
      />
    </span>
  );
};

export default Square;