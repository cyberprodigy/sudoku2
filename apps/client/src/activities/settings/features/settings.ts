import { createSlice } from "@reduxjs/toolkit";
import { getSetting, Keys } from '../../../utils/LocalStore';
import { InputMethod } from '../model/InputMethod';
import { SettingsState } from '../model/SettingsState';

const initialState: SettingsState = {
    inputMethod: getSetting(Keys.InputMethod) as InputMethod ?? InputMethod.ICON_POST_NUMBER
}

const settingsSlice = createSlice({
    name: "settings",
    initialState: initialState,
    reducers: {
        setInputMethod: (state, { payload }: { payload: { inputMethod: InputMethod } }) => {
            return { ...state, inputMethod: payload.inputMethod };
        },
    }
})

export default settingsSlice.reducer;
export const actions = settingsSlice.actions;
