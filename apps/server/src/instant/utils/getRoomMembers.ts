import { Socket } from "socket.io";
import { rooms } from "../dependencyContainer";
import { findRoomFromSocket } from "./findRoomFromSocket";

export function getRoomMembers(socket: Socket): { senderSocket: Socket, receiverSocket: Socket } | undefined {
    const room = findRoomFromSocket(rooms, socket);
    if (room) {
        const senderSocket = socket;
        const receiverSocket = room.players.find(curSocket => senderSocket !== curSocket);
        if (receiverSocket) {
            return { senderSocket, receiverSocket }
        }
    }
}