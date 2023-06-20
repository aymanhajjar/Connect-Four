import { useEffect, useState } from "react";
import styles from "./Board.module.scss";
import Slot from "../Slot";

interface IProps {
  playerOneColor: string;
  playerTwoColor: string;
  playerTurn: number;
  changeTurns: () => void;
  playerWins: (player: number) => void;
  setBoardFull: () => void;
  currentGameIndex: number;
  setCurrentIndex: (index: number) => void;
}

interface gameState {
  slots: Array<Array<number>>;
  playerTurn: number;
}

export default function Board(props: IProps) {
  const {
    playerOneColor,
    playerTwoColor,
    playerTurn,
    changeTurns,
    playerWins,
    setBoardFull,
    currentGameIndex,
    setCurrentIndex,
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
  const [gameStates, setGameStates] = useState<Array<gameState>>([
    { slots: slots, playerTurn: playerTurn },
  ]);
  const [highlighted, setHighlighted] = useState<number>(-1);
  const [gameEnded, setGameEnded] = useState<boolean>(false);
  const [winningSlots, setWinningSlots] = useState<string[]>([]);

  useEffect(() => {
    console.log(currentGameIndex, gameStates);
    if (currentGameIndex < gameStates.length - 1) {
      setSlots(gameStates[currentGameIndex].slots);
      changeTurns();
    }
  }, [currentGameIndex]);

  useEffect(() => {
    var full = true;
    if (!gameEnded && full) {
      for (let i = 0; i < slots.length; i++) {
        if (slots[i].lastIndexOf(0) > -1) {
          full = false;
        }
      }
      if (full === true) {
        setBoardFull();
      }
    }
  }, [playerTurn]);

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
      const currentGameState = {
        slots: slots,
        playerTurn: playerTurn,
      };
      setGameStates([...gameStates, currentGameState]);
      setCurrentIndex(currentGameIndex + 1);
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
    var count = 1;
    var winningArray = [`${colIndex}, ${slotIndex}`];
    var currentSlot = slotIndex;
    for (let i = colIndex + 1; i < slots.length; i++) {
      if (slots[i][currentSlot + 1] === playerTurn && count < 4) {
        count++;
        winningArray.push(`${i}, ${currentSlot + 1}`);
      } else {
        break;
      }
      currentSlot++;
    }
    currentSlot = slotIndex;
    for (let i = colIndex - 1; i >= 0; i--) {
      if (slots[i][currentSlot - 1] === playerTurn && count < 4) {
        count++;
        winningArray.push(`${i}, ${currentSlot - 1}`);
      } else {
        break;
      }
      currentSlot--;
    }

    if (count >= 4) {
      playerWins(playerTurn);
      setGameEnded(true);
      setWinningSlots(winningArray);
    } else {
      var count = 1;
      winningArray = [`${colIndex}, ${slotIndex}`];
      currentSlot = slotIndex;
      for (let i = colIndex + 1; i < slots.length; i++) {
        if (slots[i][currentSlot - 1] === playerTurn && count < 4) {
          count++;
          winningArray.push(`${i}, ${currentSlot - 1}`);
        } else {
          break;
        }
        currentSlot--;
      }
      currentSlot = slotIndex;
      for (let i = colIndex - 1; i >= 0; i--) {
        if (slots[i][currentSlot + 1] === playerTurn && count < 4) {
          count++;
          winningArray.push(`${i}, ${currentSlot + 1}`);
        } else {
          break;
        }
        currentSlot++;
      }
    }
    if (count >= 4) {
      playerWins(playerTurn);
      setGameEnded(true);
      setWinningSlots(winningArray);
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
