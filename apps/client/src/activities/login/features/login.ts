import { createSlice } from "@reduxjs/toolkit";
import { getUserData } from "../../../utils/LocalStore";
import { LoginState } from "../model/LoginState";
import { UserDto } from './../model/User';

const storedUser = getUserData()
const initialState: LoginState = {
  user: {
    nickname: storedUser?.nickname ?? '',
    country: storedUser?.country ?? ''
  }
}

const loginSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    setUserData: (state, { payload }: { payload: { user: UserDto } }) => {
      return {
        ...state,
        user: payload.user
      }
    },

  }
})

export default loginSlice.reducer;
export const actions = loginSlice.actions;
