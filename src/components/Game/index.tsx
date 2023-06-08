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
  return (
    <div className={styles.container}>
      <h1>Connect Four</h1>
    </div>
  );
}
