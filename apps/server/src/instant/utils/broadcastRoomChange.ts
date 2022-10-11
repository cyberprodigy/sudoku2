import { serializeRooms } from "./serializeRooms";
import { rooms } from "../dependencyContainer";
import { Socket } from "socket.io";
import { mapToArray } from "./mapToArray";

export function broadcastRoomChange(socket: Socket) {
  const availableRoomIds = serializeRooms(
    mapToArray(rooms).filter((room) => room.isOpen)
  );
  socket.broadcast.emit("roomListUpdate", availableRoomIds);
  socket.emit("roomListUpdate", availableRoomIds);
}