import React from "react";
import { RouterProps, withRouter } from "react-router-dom";
import StandartButton from "../../components/StandartButton";
import StandartContainer from "../../components/StandartContainer";
import TopBar from "../../components/TopBar";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import SharpenerIcon from "../../components/SharpenerIcon";

interface MenuActivityProps extends RouterProps {}

function MenuActivity({ history }: MenuActivityProps) {
  return (
    <StandartContainer>
      <TopBar
        title="Main menu"
        disableBack={true}
        subtitle="Sudoku with multiplayer"
      />
      <StandartButton
        onClick={() => {
          history.push("/create-single-room");
        }}
        startIcon={<PersonIcon />}
      >
        Single Player
      </StandartButton>

      <StandartButton
        onClick={() => {
          history.push("/list-rooms");
        }}
        startIcon={<GroupIcon />}
      >
        Multiplayer
      </StandartButton>

      <StandartButton
        style={{ marginTop: "30px" }}
        onClick={() => {
          history.push("/settings");
        }}
        startIcon={<SharpenerIcon />}
      >
        Settings
      </StandartButton>
    </StandartContainer>
  );
}

export default withRouter(MenuActivity);
