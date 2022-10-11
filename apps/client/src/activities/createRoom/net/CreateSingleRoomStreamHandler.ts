import * as H from 'history';
import { Dispatch } from 'redux';
import { RoomDto } from "../../../models/Nouns";
import netSocket from "../../../utils/NetworkSocket";
import { actions } from '../features/createSingleRoom';
import { actions as playActions } from './../../play/features/play';

interface ConstructorArgs {
  dispatch: Dispatch<any>;
  history: H.History<any>;
}
class CreateSingleRoomStreamHandler {
  constructor({ dispatch, history }: ConstructorArgs) {
    netSocket.on("roomCreated", (data: RoomDto) => {
      dispatch(actions.setSelectedRoom({ room: data }));
    });
    netSocket.on("start", (data: RoomDto) => {
      dispatch(playActions.setRoom({ room: data }));
      history.push(`play/${data.boardId}/${data.id}`);
    });
    netSocket.io.on("reconnect", () => {
      console.log("reconnect")
    });
    netSocket.on("connect_error", (err) => {
      console.error(JSON.stringify(err))
    })
  }

  dispose() {
    netSocket.off("roomCreated");
    netSocket.off("start");
    netSocket.off("reconnect");
    netSocket.off("connect_error");
  }
}

export default CreateSingleRoomStreamHandler;
