import { useState } from "react";
import styles from "./Landing.module.scss";
import GameInitializer from "../GameInitializer";
import Game from "../Game";

interface Player {
  name: string;
  color: string;
}

export default function Landing() {
  const [ready, setReady] = useState(false);
  const [playerOne, setPlayerOne] = useState<Player>({ name: "", color: "" });
  const [playerTwo, setPlayerTwo] = useState<Player>({ name: "", color: "" });

  return (
    <div className={styles.mainContainer}>
      <Game
        restart={() => setReady(false)}
        playerOne={playerOne}
        playerTwo={playerTwo}
      />
      {!ready && (
        <GameInitializer
          isReady={() => setReady(true)}
          setPlayerOne={setPlayerOne}
          setPlayerTwo={setPlayerTwo}
        />
      )}
    </div>
  );
}
