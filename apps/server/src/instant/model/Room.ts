import DIFFICULTIES from '../../datasource/DIFFICULTIES';
import { Socket } from "socket.io";

export interface Room {
  id: string;
  title: string;
  isOpen: boolean;
  boardId: number;
  difficulty: DIFFICULTIES;
  playerCount: number;
  players: Socket[];
  startTime: number | null;
}
