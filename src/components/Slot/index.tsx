import styles from "./Slot.module.scss";
import check from "../../assets/check.png";

interface IProps {
  color: string;
  winning: boolean;
}

export default function Slot(props: IProps) {
  const { color, winning } = props;
  return (
    <div
      className={styles.slot}
      style={{
        backgroundColor: color,
      }}
    >
      {winning && <img src={check} className={styles.check} />}
    </div>
  );
}
