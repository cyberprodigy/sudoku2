import React from "react";

import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

import { Typography } from "@mui/material";
import StandartButton from "../components/StandartButton";
import { DIFFICULTIES } from "../models/Nouns";

interface ChooseDifficultyProps {
  onDifficultySelect?: (difficulty: DIFFICULTIES) => void;
}
function ChooseDifficulty({ onDifficultySelect }: ChooseDifficultyProps) {
  return (
    <div>
      <Typography variant="h4" style={{ padding: "20px" }}>
        <AppRegistrationIcon /> Create game
      </Typography>
      <StandartButton onClick={() => onDifficultySelect?.(DIFFICULTIES.Simple)}>
        Simple
      </StandartButton>

      <StandartButton onClick={() => onDifficultySelect?.(DIFFICULTIES.Easy)}>
        Easy
      </StandartButton>

      <StandartButton
        onClick={() => onDifficultySelect?.(DIFFICULTIES.Intermediate)}
      >
        Intermediate
      </StandartButton>

      <StandartButton onClick={() => onDifficultySelect?.(DIFFICULTIES.Expert)}>
        Expert
      </StandartButton>
    </div>
  );
}

export default ChooseDifficulty;
