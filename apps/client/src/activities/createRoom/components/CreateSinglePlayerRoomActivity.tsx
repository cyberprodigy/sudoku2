import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import ChooseDifficulty from "../../../components/ChooseDifficulty";
import StandartContainer from "../../../components/StandartContainer";
import TopBar from "../../../components/TopBar";
import { AppState } from "../../../models/Nouns";
import netSocket from "../../../utils/NetworkSocket";
import CreateSingleRoomStreamHandler from "../net/CreateSingleRoomStreamHandler";

interface CreateSinglePlayerRoomActivityProps extends RouteComponentProps {}

function CreateSinglePlayerRoomActivity({
  history,
}: CreateSinglePlayerRoomActivityProps) {
  const { user } = useSelector((state: AppState) => state.login);
  const dispatch = useDispatch();
  const incomeStreamHandler = useRef<CreateSingleRoomStreamHandler | null>(
    null
  );

  useEffect(() => {
    incomeStreamHandler.current = new CreateSingleRoomStreamHandler({
      dispatch,
      history,
    });
    return () => {
      incomeStreamHandler.current?.dispose();
    };
  }, [dispatch, history]);

  return (
    <StandartContainer>
      <TopBar title="Create game" subtitle="Create game" />
      <ChooseDifficulty
        onDifficultySelect={(difficulty) => {
          netSocket.emit("createRoom", {
            title: user?.nickname ?? "Unknown",
            difficulty,
            playerCount: 1,
          });
        }}
      />
    </StandartContainer>
  );
}

export default withRouter(CreateSinglePlayerRoomActivity);
