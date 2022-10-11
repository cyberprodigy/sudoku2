import { BoardDto, BoardObjectDto } from "../../../models/Nouns";
import { getSolved } from "../../../utils/getSolved";
import { CellDto } from "./CellDto";

export function parseBoard(boardData: BoardObjectDto): BoardDto {
  const { puzzle, solution } = boardData;

  const cells: CellDto[][] = [];
  for (var x: number = 0; x < 9; x++) {
    cells[x] = [];
    for (var y: number = 0; y < 9; y++) {
      const id = x * 9 + y;
      cells[x][y] = {
        id: `cell-${id}`,
        cellX: x,
        cellY: y,
        value: parseInt(puzzle[id]),
        correctValue: parseInt(solution[id]),
        helperInputs: [],
      };
    }
  }
  return { cellsGiven: getSolved(cells), cells };
}
