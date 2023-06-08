import { useState } from "react";
import styles from "./Landing.module.scss";
import GameInitializer from "../GameInitializer";
import Game from "../Game";

export default function Landing() {
  const [ready, setReady] = useState(false);
  const [playerOne, setPlayerOne] = useState({ name: "", color: "" });
  const [playerTwo, setPlayerTwo] = useState({ name: "", color: "" });

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
          playerOne={setPlayerOne}
          playerTwo={setPlayerTwo}
        />
      )}
    </div>
  );
}
