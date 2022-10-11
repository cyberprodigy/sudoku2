import faker from "faker";
import { Socket } from "socket.io";
import BoardDataSource from "../../datasource/BoardDataSource";
import { v4 as uuidv4 } from "uuid";
import { rooms } from "../dependencyContainer";
import { broadcastRoomChange } from "../utils/broadcastRoomChange";
import { deleteMyOldRoom } from "../utils/deleteMyOldRoom";
import DIFFICULTIES from "../../datasource/DIFFICULTIES";
import { Room } from "../model/Room";
import { serializeRoom } from "../utils/serializeRooms";



export async function handleCreateRoom(socket: Socket, data: { title: string, difficulty: DIFFICULTIES, playerCount: number }) {
  deleteMyOldRoom(socket);

  console.log("Create room handler ", data, `socket ip ${socket.handshake.address}`)

  const roomId = uuidv4();
  const dataSource = new BoardDataSource();
  const randomBoard = await dataSource.getRandomBoard(data.difficulty);

  const newRoom: Room = {
    id: roomId,
    isOpen: data.playerCount === 1 ? false : true,
    boardId: randomBoard.boardId, // TODO fix case sensitivity of postgres
    difficulty: data.difficulty,
    playerCount: data.playerCount,
    players: [socket],
    title: data.title,
    startTime: data.playerCount === 1 ? Date.now() : null
  };
  rooms.set(roomId, newRoom);
  socket.emit("roomCreated", serializeRoom(newRoom));

  if (data.playerCount === 1) {
    socket.emit("start", serializeRoom(newRoom))
  }
  else {
    broadcastRoomChange(socket);
  }

}


