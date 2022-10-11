import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../models/Nouns";
import { CellDto } from "../models/CellDto";
import Cell from "./Cell";

interface BoardProps {}

const createCell = (cell: CellDto): React.ReactNode => {
  return <Cell data={cell} key={cell.id} />;
};

const createRow = (id: number, row: CellDto[]) => {
  return <tr key={id}>{row.map((cell) => createCell(cell))}</tr>;
};
function Board(props: BoardProps) {
  const board = useSelector((state: AppState) => state.play.board);
  return (
    <table className="Board">
      <tbody>
        {board.cells.map((row: CellDto[], index: number) =>
          createRow(index, row)
        )}
      </tbody>
    </table>
  );
}

export default Board;
