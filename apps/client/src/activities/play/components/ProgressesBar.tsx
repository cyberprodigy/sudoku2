import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { AppState } from "../../../models/Nouns";
import { PlayerProgress } from "./PlayerProgress";

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;
const ProgressContainer = styled.div`
  flex: 1;
`;

const Trophy = styled.img`
  height: 40px;
  margin: 5px 10px;
`;
function ProgressesBar() {
  const playState = useSelector((state: AppState) => state.play);
  const { user } = useSelector((state: AppState) => state.login);
  const amILeading =
    playState.myProgress.solved > playState.opponentProgress.solved;
  const isOpponentLeading =
    playState.opponentProgress.solved > playState.myProgress.solved;
  const haveILost = playState.myProgress.mistakes >= 3;
  const hasOpponentLost = playState.opponentProgress.mistakes >= 3;

  const getProgressBar = () => {
    if (
      !playState.opponent ||
      (playState.room && playState.room.playerCount === 1)
    ) {
      return (
        <ProgressContainer>
          <PlayerProgress
            id="my-progress"
            user={user}
            progress={playState.myProgress}
            hasLeft={false}
            isFlip={false}
            showCrown={false}
          />
        </ProgressContainer>
      );
    } else {
      return (
        <>
          <ProgressContainer>
            <PlayerProgress
              id="my-progress"
              user={user}
              progress={playState.myProgress}
              hasLeft={false}
              isFlip={false}
              showCrown={amILeading && !haveILost}
            />
          </ProgressContainer>
          <Trophy src="./images/trophy.svg" />
          <ProgressContainer>
            <PlayerProgress
              id="opponent-progress"
              user={playState.opponent}
              progress={playState.opponentProgress}
              hasLeft={playState.isOpponentLeft}
              isFlip={true}
              showCrown={isOpponentLeading && !hasOpponentLost}
            />
          </ProgressContainer>
        </>
      );
    }
  };
  return <Container>{getProgressBar()}</Container>;
}

export default ProgressesBar;
