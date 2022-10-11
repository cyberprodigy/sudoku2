import { RoomDto } from "./../../../models/Nouns";


export interface ListRoomsState {
    rooms: RoomDto[];
    currentRoom: RoomDto | null;
}
