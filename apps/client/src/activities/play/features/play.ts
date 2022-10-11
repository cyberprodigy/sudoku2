import { InputType } from './../components/NumberPicker';
import { RoomDto } from './../../../models/Nouns';
import { UserDto } from './../../login/model/User';
import { createSlice } from "@reduxjs/toolkit";
import { PlayState } from "../models/PlayState";
import { PlayerProgressDto, BoardDto, ScoreDto } from '../../../models/Nouns';
import { CellDto } from "../models/CellDto";
import { getSolved } from "../../../utils/getSolved";
import { getDigitsSolved } from '../../../utils/getDigitsSolved';

const initialState: PlayState = {
  board: {
    cellsGiven: 0,
    cells: []
  },
  gameLifeCycle: 'initializing',
  myProgress: { mistakes: 0, solved: 0 },
  opponentProgress: { mistakes: 0, solved: 0 },
  secondsLapsed: 0,
  selectedCellId: undefined,
  selectedInput: undefined,
  myFinalTime: undefined,
  opponentFinalTime: undefined,
  opponent: undefined,
  room: null,
  inputType: InputType.PEN,
  isOpponentLeft: false,
  digitsGuessed: []
}


const gameSlice = createSlice({
  name: "game",
  initialState: initialState,
  reducers: {
    startGame: (state, { payload }: { payload: { board: BoardDto } }) => {
      const initialCellsSolved = getSolved(payload.board.cells);

      for (let digit = 1; digit <= 9; digit++) {
        if (getDigitsSolved(payload.board.cells, digit) === 9) {
          state.digitsGuessed.push(digit)
        }
      }

      state.board = payload.board;
      state.gameLifeCycle = "started";
      state.opponentProgress = { mistakes: 0, solved: initialCellsSolved };
      state.myProgress = { mistakes: 0, solved: initialCellsSolved };
      state.secondsLapsed = 0;
      state.selectedCellId = undefined;
      state.selectedInput = undefined;
    },
    setSelectedCell: (state, { payload }: { payload: { cellId: string } }) => {
      return { ...state, selectedCellId: payload.cellId };
    },
    setRoom: (state, { payload }: { payload: { room: RoomDto } }) => {
      return { ...state, room: payload.room };
    },
    setSelectedInputValue: (state, { payload }: { payload: { value: number | undefined } }) => {
      if (state.selectedInput === payload.value) {
        state.selectedInput = undefined;
      } else {
        state.selectedInput = payload.value;
      }
    },
    inputCellValue: (state, { payload }: { payload: { cell: CellDto; value: number | undefined } }) => {
      state.board.cells[payload.cell.cellX][payload.cell.cellY].value = payload.value;
      state.board.cells[payload.cell.cellX][payload.cell.cellY].helperInputs = [];


      state.myProgress.solved = getSolved(state.board.cells);
      if (payload.value && getDigitsSolved(state.board.cells, payload.value) === 9) {
        state.board.cells.flat().forEach(value => value.helperInputs = value.helperInputs.filter(helperInput => helperInput !== payload.value))

        state.digitsGuessed.push(payload.value)
      }

      if (payload.value !== undefined && payload.value !== payload.cell.correctValue) {
        state.myProgress.mistakes = state.myProgress.mistakes + 1;
      }
    },
    setOpponent: (state, { payload }: { payload: { user: UserDto } }) => {
      return { ...state, opponent: payload.user };
    },
    opponentProgress: (state, { payload }: { payload: { opponentProgress: PlayerProgressDto } }) => {
      state.opponentProgress = payload.opponentProgress;
    },
    meFinish: (state, { payload }: { payload: { score: ScoreDto } }) => {
      state.myFinalTime = payload.score.timeSpent;
      state.gameLifeCycle = "completed";
    },
    opponentFinish: (state, { payload }: { payload: { score: ScoreDto } }) => {
      state.opponentFinalTime = payload.score.timeSpent;
      state.gameLifeCycle = "completed";
    },
    inputCellHelper: (state, { payload }: { payload: { cell: CellDto; value: number | undefined } }) => {
      if (!payload.value) {
        state.board.cells[payload.cell.cellX][payload.cell.cellY].helperInputs = [];
      } else {
        const helperInputs =
          state.board.cells[payload.cell.cellX][payload.cell.cellY].helperInputs;
        if (helperInputs.includes(payload.value)) {
          helperInputs.splice(helperInputs.indexOf(payload.value), 1);
          return;
        } else {
          helperInputs.push(payload.value);
        }
      }
    },
    updateSecondsLapsed: (state, { payload }: { payload: { secondsLapsed: number } }) => {
      return { ...state, secondsLapsed: payload.secondsLapsed }
    },
    setInputType: (state, { payload }: { payload: { inputType: InputType } }) => {
      return { ...state, inputType: payload.inputType };
    },
    reset: (state) => {
      return initialState;
    },
    continueGame: (state) => {
      state.gameLifeCycle = "started";
    },
    setOpponentLeave: (state, { payload }: { payload: boolean }) => {
      state.isOpponentLeft = payload;
    },
  }
})

export default gameSlice.reducer;
export const actions = gameSlice.actions;
