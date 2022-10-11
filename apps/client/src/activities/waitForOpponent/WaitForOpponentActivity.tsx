import React from "react";
import StandartContainer from "../../components/StandartContainer";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

interface WaitForOpponentActivityProps {}
function WaitForOpponentActivity(props: WaitForOpponentActivityProps) {
  return (
    <StandartContainer>
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    </StandartContainer>
  );
}

export default WaitForOpponentActivity;
