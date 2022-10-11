import { Socket } from "socket.io";
import { rooms } from "../dependencyContainer";
import { findRoomFromSocket } from "./findRoomFromSocket";

export function deleteMyOldRoom(socket: Socket) {
    const oldRoom = findRoomFromSocket(rooms, socket);
    if (oldRoom) {
        rooms.delete(oldRoom.id)
    }
}