import { InputType } from '../components/NumberPicker';
import { BoardDto, PlayerProgressDto, RoomDto } from './../../../models/Nouns';
import { UserDto } from './../../login/model/User';

export interface PlayState {
    selectedCellId: string | undefined;
    selectedInput: number | undefined;
    board: BoardDto;
    secondsLapsed: number;
    myFinalTime: number | undefined;
    opponentFinalTime: number | undefined;
    gameLifeCycle: "started" | "completed" | "initializing";
    opponentProgress: PlayerProgressDto;
    myProgress: PlayerProgressDto;
    opponent?: UserDto;
    isOpponentLeft: boolean;
    room: RoomDto | null
    inputType: InputType;
    digitsGuessed: number[]
}
