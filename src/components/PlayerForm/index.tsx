import { useEffect, useState } from "react";
import styles from "./PlayerForm.module.scss";
import ColorSelector from "../ColorSelector";

interface Player {
  name: string;
  color: string;
}

interface IProps {
  number: number;
  setPlayer: (info: Player) => void;
  disabledColor: string;
  setSelectedColor: (val: string) => void;
}

export default function PlayerForm(props: IProps) {
  const { number, setPlayer, disabledColor, setSelectedColor } = props;
  const [playerName, setPlayerName] = useState("");
  const [playerColor, setPlayerColor] = useState("");
  const colors = ["#BCBD8B", "#C1666B", "#1789FC", "#ECCBD9"];

  useEffect(() => {
    const new_colors = colors.filter((color) => color !== disabledColor);
    setPlayerColor(new_colors[0]);
  }, [disabledColor]);

  useEffect(() => {
    setPlayerName("");
  }, [number]);

  const handleSubmit = () => {
    setPlayer({
      name: playerName
        ? playerName
        : number === 1
        ? "Player One"
        : "Player Two",
      color: playerColor,
    });
    setSelectedColor(playerColor);
  };

  const checkSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className={styles.container}>
      {number === 1 ? <h2>Player One</h2> : <h2>Player Two</h2>}
      <div className={styles.formGroup}>
        <label>Name:</label>
        <input
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          onKeyDown={checkSubmit}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Color:</label>
        <div className={styles.colorSelector}>
          {colors.map((color) => (
            <ColorSelector
              key={color}
              color={color}
              selected={playerColor}
              disabled={color == disabledColor}
              setColor={() => setPlayerColor(color)}
            />
          ))}
        </div>
      </div>
      <button className={styles.submitBtn} type="button" onClick={handleSubmit}>
        SUBMIT
      </button>
    </div>
  );
}
