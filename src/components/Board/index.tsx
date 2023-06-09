import { useState } from "react";
import styles from "./Board.module.scss";

interface IProps {
  playerOneColor: string;
  playerTwoColor: string;
  playerTurn: number;
  changeTurns: () => void;
}

export default function Board(props: IProps) {
  const { playerOneColor, playerTwoColor, playerTurn, changeTurns } = props;
  const [slots, setSlots] = useState([
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
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
  };

  const handleClick = (colIndex: number) => {
    const index = slots[colIndex].lastIndexOf(0);
    playerTurn == 1
      ? (slots[colIndex][index] = 1)
      : (slots[colIndex][index] = 2);
    checkWin();
    changeTurns();
    setHighlighted(-1);
  };

  const checkWin = () => {};

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
              }}
              onClick={() => handleClick(colIndex)}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}
