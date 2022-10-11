import * as H from 'history';
import { Dispatch } from 'redux';
import { PlayerProgressDto, RoomDto } from "../../../models/Nouns";
import netSocket from "../../../utils/NetworkSocket";
import { actions } from './../features/listRooms';
import { actions as playActions } from './../../play/features/play';

interface ConstructorArgs {
  dispatch: Dispatch<any>;
  history: H.History<any>;
}
class ListRoomsIncomeStreamHandler {
  constructor({ dispatch, history }: ConstructorArgs) {
    netSocket.on("roomListUpdate", (data: RoomDto[]) => {
      dispatch(actions.updateRooms({ rooms: data }));
    });
    netSocket.on("roomCreated", (data: RoomDto) => {
      dispatch(actions.setSelectedRoom({ room: data }));
    });
    netSocket.on("start", (data: RoomDto) => {
      dispatch(playActions.setRoom({ room: data }));
      history.push(`/multi-play/${data.boardId}/${data.id}`);
    });
    netSocket.on("opponentProgress", (data: PlayerProgressDto) => {
      dispatch({ type: "opponentProgress", progress: data });
    });
    netSocket.io.on("reconnect", () => {
      console.log("reconnect")
    });
    netSocket.on("connect_error", (err) => {
      console.error(JSON.stringify(err))
    })
  }

  dispose() {
    netSocket.off("roomListUpdate");
    netSocket.off("roomCreated");
    netSocket.off("start");
    netSocket.off("opponentProgress");
    netSocket.off("reconnect");
    netSocket.off("connect_error");
  }
}

export default ListRoomsIncomeStreamHandler;
