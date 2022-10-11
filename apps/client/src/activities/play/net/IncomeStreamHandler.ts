import { UserDto } from './../../login/model/User';
import { Dispatch } from "react";
import netSocket from "../../../utils/NetworkSocket";
import { actions as roomActions } from "../../listRooms/features/listRooms";
import { actions } from "../features/play";

interface ConstructorArgs {
  dispatch: Dispatch<any>;
  user: UserDto
}
export default class IncomeStreamHandler {

  constructor({ dispatch, user: myUser }: ConstructorArgs) {
    netSocket.on("opponentProgress", (data) => {
      dispatch(
        actions.opponentProgress({
          opponentProgress: data
        })
      );
    });
    netSocket.on("youFinish", (score) => {
      dispatch(
        actions.meFinish({
          score
        })
      );
    });
    netSocket.on("opponentFinish", (score) => {
      dispatch(
        actions.opponentFinish({
          score
        })
      );
    });
    netSocket.on("opponentPlayerInfo", (user) => {
      dispatch(
        actions.setOpponent({
          user
        })
      );
    });
    netSocket.on("opponentLeave", (room) => {
      dispatch(
        roomActions.setSelectedRoom({ room })
      );
      dispatch(
        actions.setOpponentLeave(true)
      );
    });
    netSocket.on("playerInfoRequest", (user) => {
      dispatch(
        actions.setOpponent({
          user
        })
      );

      netSocket.emit("broadcastPlayerInfo", myUser)
    });

  }

  dispose() {
    netSocket.off("opponentProgress")
    netSocket.off("youFinish")
    netSocket.off("opponentFinish")
    netSocket.off("opponentPlayerInfo")
    netSocket.off("opponentLeave")
    netSocket.off("playerInfoRequest")
  }
}
