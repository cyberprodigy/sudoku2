import { Socket } from "socket.io";
import { rooms } from "../dependencyContainer";
import { broadcastRoomChange } from "../utils/broadcastRoomChange";
import { findRoomFromSocket } from "../utils/findRoomFromSocket";
import { serializeRoom } from "../utils/serializeRooms";


export async function handleLeaveRoom(socket: Socket, data: { roomId: string }) {
  const roomToLeave = findRoomFromSocket(rooms, socket)
  if (roomToLeave === undefined) {
    console.log("Could not leave room that does not exist", data);
    return;
  }

  const senderSocket = socket;

  roomToLeave.players = roomToLeave.players.filter(
    (player) => player.id !== socket.id
  );

  for await (const player of roomToLeave.players) {
    if (player.id !== senderSocket.id) {
      player.emit("opponentLeave", serializeRoom(roomToLeave));
    }
  }
  if (roomToLeave.players.length === 0) {
    rooms.delete(roomToLeave.id);
  }

  broadcastRoomChange(socket);
}