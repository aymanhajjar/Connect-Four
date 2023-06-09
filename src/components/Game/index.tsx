import { useState } from "react";
import Board from "../Board";
import PlayerCard from "../PlayerCard";
import styles from "./Game.module.scss";

interface Player {
  name: string;
  color: string;
}

interface IProps {
  restart: () => void;
  playerOne: Player;
  playerTwo: Player;
}

export default function Game(props: IProps) {
  const { playerOne, playerTwo } = props;
  const [player, setPlayer] = useState(1);

  return (
    <div className={styles.container}>
      <h1>CONNECT FOUR</h1>
      <div className={styles.content}>
        <Board
          playerOneColor={playerOne.color}
          playerTwoColor={playerTwo.color}
        />
        <div className={styles.players}>
          <PlayerCard player={playerOne} active={player == 1} />
          <PlayerCard player={playerTwo} active={player == 2} />
        </div>
      </div>
    </div>
  );
}
