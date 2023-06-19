import { useState } from "react";
import styles from "./Board.module.scss";
import Slot from "../Slot";

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
  const [highlighted, setHighlighted] = useState<number>(-1);
  const [gameEnded, setGameEnded] = useState<boolean>(false);
  const [winningSlots, setWinningSlots] = useState<string[]>([]);

  const getColor = (colIndex: number, value: number, slotIndex: number) => {
    if (highlighted === colIndex) {
      if (slotIndex === slots[colIndex].lastIndexOf(0)) {
        return playerTurn === 1 ? playerOneColor : playerTwoColor;
      } else if (value === 0) {
        return "#888888";
      } else if (value === 1) {
        return playerOneColor;
      } else if (value === 2) {
        return playerTwoColor;
      }
    } else if (value === 1) {
      return playerOneColor;
    } else if (value === 2) {
      return playerTwoColor;
    }
    return "#36454f";
  };

  const handleClick = (colIndex: number) => {
    const slotIndex = slots[colIndex].lastIndexOf(0);
    if (slotIndex !== -1) {
      playerTurn === 1
        ? (slots[colIndex][slotIndex] = 1)
        : (slots[colIndex][slotIndex] = 2);
      checkWin(colIndex, slotIndex);
      changeTurns();
      setHighlighted(-1);
    }
  };

  const checkWin = (colIndex: number, slotIndex: number) => {
    checkVertical(colIndex, slotIndex);
    checkHorizontal(colIndex, slotIndex);
    checkDiagonal(colIndex, slotIndex);
  };

  const checkVertical = (colIndex: number, slotIndex: number) => {
    if (slotIndex <= 2) {
      if (
        slots[colIndex][slotIndex + 1] === playerTurn &&
        slots[colIndex][slotIndex + 2] === playerTurn &&
        slots[colIndex][slotIndex + 3] === playerTurn
      ) {
        playerWins(playerTurn);
        setGameEnded(true);
        setWinningSlots([
          `${colIndex}, ${slotIndex}`,
          `${colIndex}, ${slotIndex + 1}`,
          `${colIndex}, ${slotIndex + 2}`,
          `${colIndex}, ${slotIndex + 3}`,
        ]);
      }
    }
  };
  const checkHorizontal = (colIndex: number, slotIndex: number) => {
    var count = 0;
    var winningArray = [];
    for (let i = colIndex + 1; i < slots.length; i++) {
      if (slots[i][slotIndex] === playerTurn && count < 4) {
        count++;
        winningArray.push(`${i}, ${slotIndex}`);
      } else {
        break;
      }
    }
    for (let i = colIndex; i >= 0; i--) {
      if (slots[i][slotIndex] === playerTurn && count < 4) {
        count++;
        winningArray.push(`${i}, ${slotIndex}`);
      } else {
        break;
      }
    }
    if (count >= 4) {
      playerWins(playerTurn);
      setGameEnded(true);
      setWinningSlots(winningArray);
    }
  };

  const checkDiagonal = (colIndex: number, slotIndex: number) => {
    if (colIndex <= 3) {
      if (
        (slotIndex >= 3 &&
          slots[colIndex + 1][slotIndex - 1] === playerTurn &&
          slots[colIndex + 2][slotIndex - 2] === playerTurn &&
          slots[colIndex + 3][slotIndex - 3] === playerTurn) ||
        (slotIndex <= 3 &&
          slots[colIndex + 1][slotIndex + 1] === playerTurn &&
          slots[colIndex + 2][slotIndex + 2] === playerTurn &&
          slots[colIndex + 3][slotIndex + 3] === playerTurn)
      ) {
        playerWins(playerTurn);
        setGameEnded(true);
        if (slotIndex <= 3) {
          setWinningSlots([
            `${colIndex}, ${slotIndex}`,
            `${colIndex + 1}, ${slotIndex + 1}`,
            `${colIndex + 2}, ${slotIndex + 2}`,
            `${colIndex + 3}, ${slotIndex + 3}`,
          ]);
        } else {
          setWinningSlots([
            `${colIndex}, ${slotIndex}`,
            `${colIndex + 1}, ${slotIndex - 1}`,
            `${colIndex + 2}, ${slotIndex - 2}`,
            `${colIndex + 3}, ${slotIndex - 3}`,
          ]);
        }
      }
    }
    if (colIndex >= 3) {
      if (
        (slotIndex >= 3 &&
          slots[colIndex - 1][slotIndex - 1] === playerTurn &&
          slots[colIndex - 2][slotIndex - 2] === playerTurn &&
          slots[colIndex - 3][slotIndex - 3] === playerTurn) ||
        (slotIndex <= 3 &&
          slots[colIndex - 1][slotIndex + 1] === playerTurn &&
          slots[colIndex - 2][slotIndex + 2] === playerTurn &&
          slots[colIndex - 3][slotIndex + 3] === playerTurn)
      ) {
        playerWins(playerTurn);
        setGameEnded(true);
        if (slotIndex <= 3) {
          setWinningSlots([
            `${colIndex}, ${slotIndex}`,
            `${colIndex - 1}, ${slotIndex + 1}`,
            `${colIndex - 2}, ${slotIndex + 2}`,
            `${colIndex - 3}, ${slotIndex + 3}`,
          ]);
        } else {
          setWinningSlots([
            `${colIndex}, ${slotIndex}`,
            `${colIndex - 1}, ${slotIndex - 1}`,
            `${colIndex - 2}, ${slotIndex - 2}`,
            `${colIndex - 3}, ${slotIndex - 3}`,
          ]);
        }
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
            <Slot
              winning={winningSlots.includes(`${colIndex}, ${slotIndex}`)}
              color={getColor(colIndex, value, slotIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
