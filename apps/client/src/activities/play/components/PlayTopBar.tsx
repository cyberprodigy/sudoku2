import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import TopBar from "../../../components/TopBar";
import { AppState } from "../../../models/Nouns";
import netSocket from "../../../utils/NetworkSocket";
import withConfirm, { WithConfirmProps } from "../../../utils/withConfirm";
import GameClock from "./GameClock";
import ProgressesBar from "./ProgressesBar";

const Middle = styled.div`
  padding: 0 0 10px;
  flex: 1;
  margin: 0 auto;
`;

interface PlayTopBarProps extends WithConfirmProps {}
function PlayTopBar({ confirm }: PlayTopBarProps) {
  const history = useHistory();
  const playState = useSelector((state: AppState) => state.play);
  return (
    <TopBar
      onBack={() => {
        confirm(
          () => {
            console.log(playState.room);
            if (playState.room) {
              netSocket.emit("leaveRoom", { roomId: playState.room.id });
              history.push("/menu");
            }
          },
          {
            title: "Leaving?",
            description: "Are you sure",
            confirmationText: "Yes",
            cancellationText: "No",
          }
        )();
      }}
    >
      <Middle>
        <GameClock />
        {playState.room?.difficulty}
      </Middle>
      <ProgressesBar />
    </TopBar>
  );
}

export default withConfirm(PlayTopBar);
