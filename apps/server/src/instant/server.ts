import "dotenv/config"; // Adding environmental variables. NB: keep this import first
import { Express } from "express";
import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { sockets } from './dependencyContainer';
import { handleCreateRoom } from "./handlers/handleCreateRoom";
import { handleInformProgress } from "./handlers/handleInformProgress";
import { handleJoinRoom } from './handlers/handleJoinRoom';
import { handleLeaveRoom } from "./handlers/handleLeaveRoom";
import { handleListRooms } from "./handlers/handleListRooms";
import { handlePlayerInfo } from "./handlers/handlePlayerInfo";
import { handlePlayerInfoRequest } from "./handlers/handlePlayerInfoRequest";


export function instantServer(app: Express, server: HttpServer) {
  const SOCKET_PORT = process.env.SOCKET_PORT || 5000;

  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    sockets.set(socket.id, socket);

    socket.on("createRoom", (data) => handleCreateRoom(socket, data));
    socket.on("joinRoom", (data) => handleJoinRoom(socket, data));
    socket.on("listRooms", () => handleListRooms(socket));
    socket.on("informProgress", (data) => handleInformProgress(socket, data));
    socket.on("leaveRoom", (data) => handleLeaveRoom(socket, data));
    socket.on("broadcastPlayerInfo", (data) => handlePlayerInfo(socket, data));
    socket.on("broadcastPlayerInfoRequest", (data) => handlePlayerInfoRequest(socket, data));
  });

  server.listen(SOCKET_PORT, () => {
    console.info(`Socket running at localhost:${SOCKET_PORT}`);
  });
}
