import { useState } from "react";
import styles from "./Board.module.scss";

interface IProps {
  playerOneColor: string;
  playerTwoColor: string;
  playerTurn: number;
  changeTurns: () => void;
  playerWins: (player: number) => void;
}

export default function Board(props: IProps) {
  const {
    playerOneColor,
    playerTwoColor,
    playerTurn,
    changeTurns,
    playerWins,
  } = props;
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
  const [gameEnded, setGameEnded] = useState(false);

  const getColor = (colIndex: number, value: number, slotIndex: number) => {
    if (slotIndex == slots[colIndex].lastIndexOf(0)) {
      return playerTurn == 1 ? playerOneColor : playerTwoColor;
    } else if (value == 0) {
      return "#888888";
    } else if (value == 1) {
      return playerOneColor;
    } else if (value == 2) {
      return playerTwoColor;
    }
  };

  const handleClick = (colIndex: number) => {
    const slotIndex = slots[colIndex].lastIndexOf(0);
    playerTurn == 1
      ? (slots[colIndex][slotIndex] = 1)
      : (slots[colIndex][slotIndex] = 2);
    checkWin(colIndex, slotIndex);
    changeTurns();
    setHighlighted(-1);
  };

  const checkWin = (colIndex: number, slotIndex: number) => {
    checkVertical(colIndex, slotIndex);
    checkHorizontal(colIndex, slotIndex);
    checkDiagonal(colIndex, slotIndex);
  };

  const checkVertical = (colIndex: number, slotIndex: number) => {
    if (slotIndex <= 2) {
      if (
        slots[colIndex][slotIndex + 1] == playerTurn &&
        slots[colIndex][slotIndex + 2] == playerTurn &&
        slots[colIndex][slotIndex + 3] == playerTurn
      ) {
        playerWins(playerTurn);
        setGameEnded(true);
      }
    }
  };
  const checkHorizontal = (colIndex: number, slotIndex: number) => {
    var count = 0;
    colIndex = 0;
    while (colIndex < slots.length) {
      if (slots[colIndex][slotIndex] == playerTurn) {
        count++;
      } else {
        count = 0;
      }
      if (count == 4) {
        playerWins(playerTurn);
        setGameEnded(true);
      }
      colIndex++;
    }
  };
  const checkDiagonal = (colIndex: number, slotIndex: number) => {
    if (colIndex <= 3) {
      if (
        (slotIndex >= 3 &&
          slots[colIndex + 1][slotIndex - 1] == playerTurn &&
          slots[colIndex + 2][slotIndex - 2] == playerTurn &&
          slots[colIndex + 3][slotIndex - 3] == playerTurn) ||
        (slotIndex <= 3 &&
          slots[colIndex + 1][slotIndex + 1] == playerTurn &&
          slots[colIndex + 2][slotIndex + 2] == playerTurn &&
          slots[colIndex + 3][slotIndex + 3] == playerTurn)
      ) {
        playerWins(playerTurn);
        setGameEnded(true);
      }
    }
    if (colIndex >= 3) {
      if (
        (slotIndex >= 3 &&
          slots[colIndex - 1][slotIndex - 1] == playerTurn &&
          slots[colIndex - 2][slotIndex - 2] == playerTurn &&
          slots[colIndex - 3][slotIndex - 3] == playerTurn) ||
        (slotIndex <= 3 &&
          slots[colIndex - 1][slotIndex + 1] == playerTurn &&
          slots[colIndex - 2][slotIndex + 2] == playerTurn &&
          slots[colIndex - 3][slotIndex + 3] == playerTurn)
      ) {
        playerWins(playerTurn);
        setGameEnded(true);
      }
    }
  };

  return (
    <div className={gameEnded ? styles.containerEnd : styles.container}>
      {slots.map((col, colIndex) => (
        <div
          key={colIndex}
          className={styles.column}
          onMouseOver={() => setHighlighted(colIndex)}
          onClick={() => handleClick(colIndex)}
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
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}
