import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  CardContent,
  Card,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import StandartButton from "../../../components/StandartButton";
import StandartContainer from "../../../components/StandartContainer";
import TopBar from "../../../components/TopBar";
import { getSetting, Keys, setSetting } from "../../../utils/LocalStore";
import { actions } from "../../../activities/settings/features/settings";
import { InputMethod } from "../../settings/model/InputMethod";

interface SettingsActivityProps {}
function SettingsActivity(props: SettingsActivityProps) {
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <StandartContainer>
      <TopBar title="Settings" subtitle="Settings for the game" />
      <Card style={{ textAlign: "left" }}>
        <CardContent>
          <FormControl>
            <FormLabel>Input type</FormLabel>
            <RadioGroup
              defaultValue={
                getSetting(Keys.InputMethod) ?? InputMethod.ICON_POST_NUMBER
              }
              onChange={(evt) => {
                setSetting(Keys.InputMethod, evt.target.value);
                dispatch(
                  actions.setInputMethod({
                    inputMethod: evt.target.value as InputMethod,
                  })
                );
              }}
            >
              <FormControlLabel
                value={InputMethod.ICON_PRE_NUMBER}
                control={<Radio />}
                label="Select number, select field"
              />
              <FormControlLabel
                value={InputMethod.ICON_POST_NUMBER}
                control={<Radio />}
                label="Select field, select number"
              />
              <FormControlLabel
                value={InputMethod.DOUBLE}
                control={<Radio />}
                label="Single tap = Pencil / Double tap = Pen"
              />
            </RadioGroup>
          </FormControl>
        </CardContent>
      </Card>
      <StandartButton
        onClick={() => {
          history.push("/");
        }}
      >
        Logout
      </StandartButton>
    </StandartContainer>
  );
}

export default SettingsActivity;
