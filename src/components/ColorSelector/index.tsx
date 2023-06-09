import styles from "./ColorSelector.module.scss";
import check from "../../assets/check.png";

interface IProps {
  color: string;
  setColor: () => void;
  selected: string;
  disabled: boolean;
}

export default function ColorSelector(props: IProps) {
  const { color, setColor, selected, disabled } = props;

  return (
    <>
      <div
        className={styles.container}
        style={{ backgroundColor: color, opacity: disabled ? 0.1 : 1 }}
        onClick={disabled ? () => {} : setColor}
      >
        {selected === color && (
          <img src={check} className={styles.checkMark}></img>
        )}
      </div>
    </>
  );
}
