import { useState } from "react";
import PlayerForm from "../PlayerForm";
import styles from "./GameInitializer.module.scss";

interface Player {
  name: string;
  color: string;
}

interface IProps {
  isReady: () => void;
  setPlayerOne: (player: Player) => void;
  setPlayerTwo: (player: Player) => void;
}

export default function GameInitializer(props: IProps) {
  const { setPlayerOne, setPlayerTwo, isReady } = props;
  const [selectedColor, setSelectedColor] = useState("");
  const [playerNumber, setPlayerNumber] = useState(1);

  const handlePlayer = (number: number, info: Player) => {
    number === 1 ? setPlayerOne(info) : setPlayerTwo(info);
    number === 2 && isReady();
    setPlayerNumber(playerNumber + 1);
  };

  return (
    <div className={styles.container}>
      {playerNumber === 1 ? (
        <PlayerForm
          number={1}
          setPlayer={(info) => handlePlayer(1, info)}
          disabledColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
      ) : (
        <PlayerForm
          number={2}
          setPlayer={(info) => handlePlayer(2, info)}
          setSelectedColor={setSelectedColor}
          disabledColor={selectedColor}
        />
      )}
    </div>
  );
}
