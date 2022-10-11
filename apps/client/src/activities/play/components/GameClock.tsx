import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AppState } from "../../../models/Nouns";

const CenteredDiv = styled.div`
  font-family: "Ubuntu Mono", monospace;
  font-size: 48px;
  position: relative;
`;
const StopWatch = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(-120%);
  width: 25px;
  opacity: 0.7;
`;

const paddNumber = (num: number) => {
  return num.toString().padStart(2, "0");
};
const formatTime = (lapsedSeconds: number) => {
  const seconds = lapsedSeconds % 60;
  const minutes = Math.floor(lapsedSeconds / 60);
  return `${paddNumber(minutes)}:${paddNumber(seconds)}`;
};

interface GameClockProps {}
function GameClock(props: GameClockProps) {
  const [secondsLapsed, setSecondsLapsed] = useState(0);
  const gameLifeCycle = useSelector<AppState>((state) => {
    return state.play.gameLifeCycle;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (gameLifeCycle === "started") {
      const interval = setInterval(() => {
        setSecondsLapsed(secondsLapsed + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [setSecondsLapsed, secondsLapsed, dispatch, gameLifeCycle]);

  return (
    <CenteredDiv>
      <StopWatch src="./images/stop-watch.svg" color="#fff" />
      {formatTime(secondsLapsed)}
    </CenteredDiv>
  );
}

export default GameClock;
