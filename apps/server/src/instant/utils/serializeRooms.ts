import { Room } from '../model/Room';

export function serializeRoom(
  room: Room
): Pick<Room, "id" | "isOpen" | "title" | "boardId" | "startTime" | 'playerCount' | 'difficulty'> {
  return {
    id: room.id,
    title: room.title,
    isOpen: room.isOpen,
    boardId: room.boardId,
    startTime: room.startTime,
    playerCount: room.playerCount,
    difficulty: room.difficulty
  };
}

export function serializeRooms(
  rooms: Room[]): Pick<Room, "id" | "isOpen" | "title" | "boardId" | "startTime" | 'playerCount' | 'difficulty'>[] {
  return rooms.map((room) => serializeRoom(room));
}
