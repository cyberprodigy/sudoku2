import { Socket } from "socket.io";
import { Room } from "./model/Room";

export const  rooms = new Map<string, Room>()
export const  sockets =new Map<string, Socket>()
