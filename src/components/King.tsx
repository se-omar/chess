import pieceImports from "../imports/piece-imports";

interface Props {
  team: string;
}

const King: React.FC<Props> = (props: Props) => {
  const image =
    props.team === "black" ? pieceImports.blackKing : pieceImports.whiteKing;

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

export default King;
