import { useRef, type DragEventHandler, type MouseEventHandler } from "react";

interface Props {
  image: string;
  team: string;
  position: Position;
}

interface Position {
  x: number;
  y: number;
}

const Piece: React.FC<Props> = (props: Props) => {
  const dragPiece = useRef<number>(0);

  const dragStart: any = (e: any, position: number) => {
    dragPiece.current = position;
    console.log(e.target);
  };

  const dragEnd: any = (e: any) => {
    console.log("drag end");
  };

  // const dragEnter: any = (e: any) => {
  //   // dragOverItem.current = position;
  //   console.log("drag enter");
  // };

  return (
    <img
      onDragStart={(e) => dragStart(e)}
      onDragEnd={(e) => dragEnd(e)}
      draggable
      src={props.image}
    />
  );
};

// const onMouseDown: MouseEventHandler<HTMLDivElement> = () => {
//   console.log("asdf");
// };

export default Piece;
