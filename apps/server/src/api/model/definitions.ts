export interface Board {
  boardId: number;
  puzzle: string;
  solution: string;
}

export interface PlayerProgress {
  solved: number;
  mistakes: number;
}

