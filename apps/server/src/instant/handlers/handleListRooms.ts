import { mapToArray } from './../utils/mapToArray';
import { Socket } from "socket.io";
import { rooms } from "../dependencyContainer";
import { serializeRooms } from "../utils/serializeRooms";

export function handleListRooms(socket: Socket) {
  console.log("list room");

  const availableRoomIds = serializeRooms(
    mapToArray(rooms).filter((room) => room.isOpen)
  );
  socket.emit("roomListUpdate", availableRoomIds);
}