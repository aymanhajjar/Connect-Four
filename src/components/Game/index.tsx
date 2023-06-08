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

  return (
    <div className={styles.container}>
      <h1>CONNECT FOUR</h1>
      <Board />
      <div className={styles.players}>
        <PlayerCard player={playerOne} />
        <PlayerCard player={playerTwo} />
      </div>
    </div>
  );
}
