import { Socket } from "socket.io";
import User from "../../api/model/User";
import { getRoomMembers } from '../utils/getRoomMembers';

export function handlePlayerInfo(socket: Socket, user: User) {

  const roomMembers = getRoomMembers(socket)
  if (roomMembers?.receiverSocket) {
    roomMembers.receiverSocket.emit("opponentPlayerInfo", user);
  }
}