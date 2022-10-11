import { createSlice } from "@reduxjs/toolkit";
import { RoomDto } from '../../../models/Nouns';
import { CreateSingleRoomState } from '../model/CreateSingleRoomState';

const initialState: CreateSingleRoomState = {
    currentRoom: null
}


const createSingleRoomSlice = createSlice({
    name: "createSingleRoom",
    initialState: initialState,
    reducers: {
        setSelectedRoom: (state, { payload }: { payload: { room: RoomDto | null } }) => {
            state.currentRoom = payload.room;
        },
    }
})

export default createSingleRoomSlice.reducer;
export const actions = createSingleRoomSlice.actions;
