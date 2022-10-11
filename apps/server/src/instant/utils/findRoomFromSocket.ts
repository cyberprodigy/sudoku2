import { Socket } from "socket.io";
import { Room } from "../model/Room";
import { mapToArray } from "./mapToArray";

export function findRoomFromSocket(rooms: Map<string, Room>, socket: Socket) {
    return mapToArray(rooms).find((r) => r.players.some(player => player.id === socket.id))
}