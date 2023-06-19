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
  const [playerTurn, setPlayerTurn] = useState<number>(1);
  const [playerWon, setPlayerWon] = useState<number>(0);

  return (
    <div className={styles.container}>
      <h1>CONNECT FOUR</h1>
      <div className={styles.content}>
        <Board
          playerOneColor={playerOne.color}
          playerTwoColor={playerTwo.color}
          playerTurn={playerTurn}
          changeTurns={() => setPlayerTurn(playerTurn == 1 ? 2 : 1)}
          playerWins={(player) => setPlayerWon(player)}
        />
        <div className={styles.players}>
          <PlayerCard player={playerOne} active={playerTurn == 1} />
          <PlayerCard player={playerTwo} active={playerTurn == 2} />
          {playerWon > 0 && (
            <span
              className={styles.playerWon}
              style={{
                color: playerWon == 1 ? playerOne.color : playerTwo.color,
              }}
            >
              {playerWon == 1 ? playerOne.name : playerTwo.name} Wins!!
            </span>
          )}
          <span
            className={styles.restartBtn}
            onClick={() => window.location.reload()}
          >
            Restart
          </span>
        </div>
      </div>
    </div>
  );
}
