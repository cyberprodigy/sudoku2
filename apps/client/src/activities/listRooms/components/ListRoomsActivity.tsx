import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import StandartContainer from "../../../components/StandartContainer";
import TopBar from "../../../components/TopBar";
import { AppState } from "../../../models/Nouns";
import netSocket from "../../../utils/NetworkSocket";
import { actions } from "../features/listRooms";
import ListRooms from "./ListRooms";

interface ListRoomsActivityProps extends RouteComponentProps {}

/*
Responsible for loading initial data and setting up the involved components for
activity to perform it's responsibilities
*/

function ListRoomsActivity({ history }: ListRoomsActivityProps) {
  const dispatch = useDispatch();
  const { currentRoom } = useSelector((state: AppState) => state.listRooms);

  return (
    <>
      <StandartContainer>
        <TopBar
          title="Multiplayer games"
          subtitle="Select from available games or create a new one"
          onBack={() => {
            if (currentRoom) {
              netSocket.emit("leaveRoom", { roomId: currentRoom.id });
              dispatch(actions.setSelectedRoom({ room: null }));
            }
            history.push("/menu");
          }}
        />
        <ListRooms />
      </StandartContainer>
    </>
  );
}

export default withRouter(ListRoomsActivity);
