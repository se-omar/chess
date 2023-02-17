import pieceImports from "../imports/piece-imports";

interface Props {
  team: string;
}

const Pawn: React.FC<Props> = (props: Props) => {
  const image =
    props.team === "black" ? pieceImports.blackPawn : pieceImports.whitePawn;

  return (
    <img
      className="piece-style"
      // onDragStart={(e) => dragStart(e)}
      // onDragEnd={(e) => dragEnd(e)}
      draggable
      src={image}
    />
  );
};

export default Pawn;
