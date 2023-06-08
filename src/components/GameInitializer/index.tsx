import styles from "./GameInitializer.module.scss";

interface Player {
  name: string;
  color: string;
}

interface IProps {
  isReady: () => void;
  playerOne: (player: Player) => void;
  playerTwo: (player: Player) => void;
}

export default function GameInitializer(props: IProps) {
  return <div className={styles.container}></div>;
}
