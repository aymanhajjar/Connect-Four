import { useState } from "react";
import styles from "./Board.module.scss";

interface IProps {
  playerOneColor: string;
  playerTwoColor: string;
}

export default function Board(props: IProps) {
  const { playerOneColor, playerTwoColor } = props;
  const [slots, setSlots] = useState([
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 1],
    [0, 0, 0, 1, 2, 2],
    [0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0],
  ]);
  const [highlighted, setHighlighted] = useState(-1);

  const getColor = (colIndex: number, value: number, slotIndex: number) => {
    if (slotIndex == slots[colIndex].lastIndexOf(0)) {
      return "white";
    } else if (value == 0) {
      return "#888888";
    } else if (value == 1) {
      return playerOneColor;
    } else if (value == 2) {
      return playerTwoColor;
    }
    // colIndex == highlighted && value == 0 ? "white" : "";
    // return "white";
  };

  return (
    <div className={styles.container}>
      {slots.map((col, colIndex) => (
        <div
          key={colIndex}
          className={styles.column}
          onMouseOver={() => setHighlighted(colIndex)}
        >
          {col.map((value, slotIndex) => (
            <div
              key={slotIndex}
              className={styles.slot}
              style={{
                backgroundColor:
                  highlighted == colIndex
                    ? getColor(colIndex, value, slotIndex)
                    : value == 1
                    ? playerOneColor
                    : value == 2
                    ? playerTwoColor
                    : "#36454f",
                boxShadow:
                  highlighted == colIndex && slotIndex == col.lastIndexOf(0)
                    ? "0px 0px 10px gray"
                    : "none",
              }}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}
