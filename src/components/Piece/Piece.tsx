interface PieceProps {
  image: string;
  team: string;
}

const Piece: React.FC<PieceProps> = (props: PieceProps) => {
  return <img src={props.image} />;
};

export default Piece;
