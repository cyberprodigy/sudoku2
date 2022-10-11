import { Score } from './../../api/model/Score';
import { Socket } from "socket.io";
import { PlayerProgress } from "../../api/model/definitions";

import { rooms } from "../dependencyContainer";
import { findRoomFromSocket } from "../utils/findRoomFromSocket";
import { mapToArray } from "../utils/mapToArray";

export function handleInformProgress(socket: Socket, data: PlayerProgress) {
  console.log("my socket id", socket.id);
  const room = findRoomFromSocket(rooms, socket);
  if (room) {
    const senderSocket = socket;
    const receiverSocket = room.players.find(curSocket => senderSocket !== curSocket);

    receiverSocket?.emit("opponentProgress", data)

    if (data.solved >= 81 || data.mistakes >= 3) {
      const timeSpent = Date.now() - room.startTime;
      const score: Score = { ...data, timeSpent }
      senderSocket.emit("youFinish", score)
      receiverSocket?.emit("opponentFinish", score)
    }
  }
  else {
    console.log("Room not found")
  }
}