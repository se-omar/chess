import {
  ChangeEvent,
  useRef,
  useState,
  type DragEventHandler,
  type MouseEventHandler,
} from "react";

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
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const dragStart: any = (e: any, position: number) => {
    dragPiece.current = position;
    console.log(e.target);
  };

  const dragEnd: any = (e: DragEvent) => {
    setWidth(e.clientX - 50);
    setHeight(e.clientY - 50);
    console.log("drag end");
    console.log("client x: ", e.clientX);
    console.log("client y: ", e.clientY);
  };

  // const dragEnter: any = (e: any) => {
  //   // dragOverItem.current = position;
  //   console.log("drag enter");
  // };

  return (
    <img
      style={{
        position: "absolute",
        left: width,
        top: height,
      }}
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
