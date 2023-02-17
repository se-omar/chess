import pieceImports from "../imports/piece-imports";

interface Props {
  team: string;
}

const Queen: React.FC<Props> = (props: Props) => {
  const image =
    props.team === "black" ? pieceImports.blackQueen : pieceImports.whiteQueen;

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

export default Queen;
