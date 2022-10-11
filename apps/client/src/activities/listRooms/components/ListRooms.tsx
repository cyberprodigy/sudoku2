import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LinearProgress from "@mui/material/LinearProgress";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import styled from "styled-components";
import ChooseDifficulty from "../../../components/ChooseDifficulty";
import Loader from "../../../components/Loader";
import StandartButton from "../../../components/StandartButton";
import { AppState, DIFFICULTIES } from "../../../models/Nouns";
import netSocket from "../../../utils/NetworkSocket";
import ListRoomsIncomeStreamHandler from "../net/ListRoomsIncomeStreamHandler";
import RoomList from "./RoomList";

interface ListRoomsProps extends RouteComponentProps {}

const FlexContainer = styled.div`
  display: flex;
  padding: 21px 0;
`;
const LoaderAnim = styled.div`
  flex: 1;
`;
const WaitMessage = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

function ListRooms({ history }: ListRoomsProps) {
  const [showWaitingForOpponent, setShowWaitingForOpponent] = useState(false);
  const [showCreateRoomSelector, setShowCreateRoomSelector] = useState(false);
  const listRoomsHandler = useRef<ListRoomsIncomeStreamHandler | null>(null);
  const { currentRoom } = useSelector((state: AppState) => state.listRooms);
  const { user } = useSelector((state: AppState) => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
    netSocket.emit("listRooms");
  }, []);

  useEffect(() => {
    listRoomsHandler.current = new ListRoomsIncomeStreamHandler({
      dispatch,
      history,
    });
    return () => {
      listRoomsHandler.current?.dispose();
    };
  }, [dispatch, history]);

  if (showWaitingForOpponent) {
    if (!currentRoom?.id) {
      return (
        <span>An error occurred while creating game {currentRoom?.id}</span>
      );
    }
    return (
      <div>
        <LinearProgress />
        <FlexContainer>
          <LoaderAnim>
            <Loader
              style={{
                width: "40px",
                height: "40px",
                margin: "0 auto",
              }}
            />
          </LoaderAnim>

          <WaitMessage>Waiting for opponent to join the game</WaitMessage>
        </FlexContainer>
        <StandartButton
          onClick={() => {
            netSocket.emit("leaveRoom", { roomId: currentRoom!.id });

            setShowWaitingForOpponent(false);
            setShowCreateRoomSelector(true);
          }}
        >
          Cancel
        </StandartButton>
      </div>
    );
  }

  const handleCreateRoomClick = (difficulty: DIFFICULTIES) => {
    netSocket.emit("createRoom", {
      title: user?.nickname ?? "Unknown",
      difficulty,
      playerCount: 2,
    });
    setShowWaitingForOpponent(true);
    setShowCreateRoomSelector(false);
  };

  if (showCreateRoomSelector) {
    return <ChooseDifficulty onDifficultySelect={handleCreateRoomClick} />;
  }

  return (
    <>
      <RoomList />
      <StandartButton
        onClick={() => setShowCreateRoomSelector(true)}
        startIcon={<AppRegistrationIcon />}
      >
        Create game
      </StandartButton>
    </>
  );
}

export default withRouter(ListRooms);
