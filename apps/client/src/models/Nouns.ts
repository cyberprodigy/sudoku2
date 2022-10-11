import { ListRoomsState } from '../activities/listRooms/model/ListRoomsState';
import { LoginState } from './../activities/login/model/LoginState';
import { CellDto } from "./../activities/play/models/CellDto";
import { PlayState } from "./../activities/play/models/PlayState";
import { SettingsState } from "./../activities/settings/model/SettingsState";

export interface BoardObjectDto {
  boardId: number;
  puzzle: string;
  solution: string;
}

export type BoardDto = {
  cellsGiven: number;
  cells: CellDto[][]
}

export interface RoomDto {
  id: string;
  createdAt: number;
  isOpen: boolean;
  difficulty: DIFFICULTIES;
  title: string;
  boardId: number;
  playerCount: number;
}

export interface PlayerProgressDto {
  solved: number;
  mistakes: number;
}

export interface AppState {
  play: PlayState,
  login: LoginState,
  listRooms: ListRoomsState,
  settings: SettingsState,

}

export interface ScoreDto {
  solved: number;
  mistakes: number;
  timeSpent: number;
}

export enum DIFFICULTIES {
  Simple = "Simple",
  Easy = "Easy",
  Intermediate = "Intermediate",
  Expert = "Expert"
}