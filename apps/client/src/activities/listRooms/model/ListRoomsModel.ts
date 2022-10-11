import { PlayerProgressDto, RoomDto } from "./../../../models/Nouns";
export type Action =
  | { type: "updateRooms"; rooms: RoomDto[] }
  | { type: "setSelectedRoom"; room: RoomDto }
  | { type: "start"; room: RoomDto }
  | { type: "roomSelected"; room: RoomDto }
  | { type: "opponentProgress"; progress: PlayerProgressDto };


