import styles from "./PlayerCard.module.scss";

interface IProps {
  player: {
    name: string;
    color: string;
  };
  active: boolean;
}

export default function PlayerCard(props: IProps) {
  const { player, active } = props;
  return (
    <div
      className={styles.container}
      style={{ backgroundColor: active ? player.color : "rgba(0,0,0,0.1)" }}
    >
      <h2>{player.name}</h2>
    </div>
  );
}
