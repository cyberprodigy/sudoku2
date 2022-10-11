import { createSlice } from "@reduxjs/toolkit";
import { RoomDto } from './../../../models/Nouns';
import { ListRoomsState } from './../model/ListRoomsState';

const initialState: ListRoomsState = {
    rooms: [],
    currentRoom: null
}


const listRoomsSlice = createSlice({
    name: "listRooms",
    initialState: initialState,
    reducers: {
        updateRooms: (state, { payload }: { payload: { rooms: RoomDto[] } }) => {
            state.rooms = payload.rooms;
        },
        setSelectedRoom: (state, { payload }: { payload: { room: RoomDto | null } }) => {
            state.currentRoom = payload.room;
        },
    }
})

export default listRoomsSlice.reducer;
export const actions = listRoomsSlice.actions;
