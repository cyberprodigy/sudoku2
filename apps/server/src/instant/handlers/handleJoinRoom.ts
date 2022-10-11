import { Socket } from "socket.io";
import User from "../../api/model/User";
import { rooms } from "../dependencyContainer";
import { deleteMyOldRoom } from "../utils/deleteMyOldRoom";
import { serializeRoom } from "../utils/serializeRooms";

export function handleJoinRoom(socket: Socket, data: { roomId: string }): void {
  deleteMyOldRoom(socket);
  const room = rooms.get(data.roomId);
  if (room) {
    room.players.push(socket);
    room.isOpen = false;
    room.startTime = Date.now();
    rooms.set(room.id, room);
    room.players.forEach((player) =>
      player.emit("start", serializeRoom(room))
    );
  }

}