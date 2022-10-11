import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../models/Nouns";
import { InputMethod } from "../../settings/model/InputMethod";
import { actions } from "../features/play";
import { useInputMethod } from "../hooks/useInputMethod";

export enum InputType {
  PENCIL = "pencil",
  PEN = "pen",
}
interface NumberPickerProps {}

export function NumberPicker(props: NumberPickerProps) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const dispatch = useDispatch();
  const inputMethod = useSelector(
    (state: AppState) => state.settings.inputMethod
  );
  const { digitsGuessed, inputType, selectedInput } = useSelector(
    (state: AppState) => state.play
  );

  const { handleNumberClick } = useInputMethod();

  const inputControls =
    inputMethod === InputMethod.DOUBLE ? null : (
      <ToggleButtonGroup value={inputType}>
        <ToggleButton
          value="pencil"
          onClick={() =>
            dispatch(actions.setInputType({ inputType: InputType.PENCIL }))
          }
        >
          <CreateOutlinedIcon style={{ color: "#AAA" }} />
        </ToggleButton>
        <ToggleButton
          value="pen"
          onClick={() =>
            dispatch(actions.setInputType({ inputType: InputType.PEN }))
          }
        >
          <EditIcon style={{ color: "blue" }} />
        </ToggleButton>
      </ToggleButtonGroup>
    );

  return (
    <div className="number-picker">
      {numbers.map((num) => {
        const isSelected = selectedInput === num;
        const isAllGuessed = digitsGuessed.includes(num);
        return (
          <div
            key={num}
            className={`number ${isSelected ? "selected" : ""} ${
              isAllGuessed ? "hidden" : ""
            }`}
            onClick={() => handleNumberClick(num)}
          >
            <div>{num}</div>
          </div>
        );
      })}
      {inputControls}
    </div>
  );
}

export default NumberPicker;
