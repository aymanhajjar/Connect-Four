import styles from "./PlayerCard.module.scss";

interface IProps {
  player: {
    name: string;
    color: string;
  };
}

export default function PlayerCard(props: IProps) {
  return <div className={styles.container}>Player</div>;
}
