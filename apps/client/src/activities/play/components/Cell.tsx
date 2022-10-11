import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../models/Nouns";
import { useInputMethod } from "../hooks/useInputMethod";
import { CellDto } from "../models/CellDto";
import { HelperInputs } from "./HelperInputs";

interface CellProps {
  data: CellDto;
}
function Cell({ data }: CellProps) {
  const { handleCellClick } = useInputMethod();

  const selectedCellId = useSelector(
    (state: AppState) => state.play.selectedCellId
  );

  const isSelected = selectedCellId === data.id;
  const isCorrect = data.value === data.correctValue;

  return (
    <td
      className={[
        "cell",
        isSelected ? "selectedCell" : "",
        isCorrect ? "" : "incorrect",
      ].join(" ")}
      onClick={(e) => {
        handleCellClick(data, e);
      }}
      id={data.id}
    >
      <div>
        <HelperInputs values={data.helperInputs} />
        <span className="value">{data.value || ""}</span>
      </div>
      <div className="effect"></div>
    </td>
  );
}

export default Cell;
