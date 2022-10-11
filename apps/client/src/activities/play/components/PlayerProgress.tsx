import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { AppState, PlayerProgressDto } from "../../../models/Nouns";
import { palette } from "../../../theme/Theme";
import { getPercentComplete } from "../../../utils/getPercentComplete";
import { UserDto } from "../../login/model/User";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { gsap } from "gsap";
import Mistakes from "./Mistakes";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px;
  position: relative;
`;

export interface PlayerProgressProps {
  id: string;
  user: UserDto;
  progress: PlayerProgressDto;
  isFlip: boolean;
  showCrown: boolean;
  hasLeft: boolean;
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  border: `9px solid #b0adcc`,
  borderRadius: 9,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: palette.primary.dark,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#fff",
  },
}));

const Crown = styled.img`
  height: 20px;
  margin: 5px 10px;
  opacity: 0;
`;

const Hand = styled.img`
  position: absolute;
  height: 50px;
  left: 50%;
  top: -70%;
  transform: rotateZ(350deg) translate(-50%, 0) scale(0.4);
  transform-origin: 50% 70%;
  opacity: 0;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Name = styled.div``;

export function PlayerProgress({
  id,
  user,
  progress,
  isFlip,
  showCrown,
  hasLeft,
}: PlayerProgressProps) {
  useEffect(() => {
    if (showCrown) {
      gsap.to(`#${id} [data-element-id=crown]`, {
        alpha: 1,
      });
    } else {
      gsap.to(`#${id} [data-element-id=crown]`, {
        alpha: 0,
      });
    }
  }, [id, showCrown]);

  useEffect(() => {
    if (hasLeft) {
      var tl = gsap.timeline();
      tl.to(`#${id} [data-element-id=hand]`, {
        duration: 1,
        scale: 1,
        opacity: 1,
        ease: "back.inOut(5)",
      });
      tl.to(`#${id} [data-element-id=hand]`, {
        rotateZ: 10,
        duration: 0.3,
        ease: "sine.inOut(1)",
        yoyoEase: "sine.inOut(1)",
        stagger: 0.15,
        repeat: 3,
        yoyo: true,
      });
      tl.to(`#${id} [data-element-id=hand]`, {
        duration: 1,
        scale: 0.4,
        opacity: 0,
        ease: "back.inOut(5)",
      });
      tl.to(`#${id} [data-element-id=name]`, {
        duration: 0.5,
        opacity: 0.4,
      });
      tl.to(`#${id} [data-element-id=progress]`, {
        duration: 1,
        opacity: 0.4,
      });
    }
  }, [id, hasLeft]);

  const playState = useSelector((state: AppState) => state.play);
  return (
    <Container id={id}>
      <Hand src="./images/palm.svg" data-element-id="hand" />
      <TopContainer>
        <Crown
          data-element-id="crown"
          src="./images/crown.svg"
          style={{ alignSelf: isFlip ? "flex-end" : "flex-start" }}
        />
        <Mistakes
          style={{ alignSelf: isFlip ? "flex-start" : "flex-end" }}
          mistakes={progress.mistakes}
        />
      </TopContainer>
      <BorderLinearProgress
        variant="determinate"
        value={getPercentComplete(playState.board.cellsGiven, progress.solved)}
        data-element-id="progress"
      />
      <Name
        style={{ textAlign: isFlip ? "right" : "left" }}
        data-element-id="name"
      >
        {user.nickname} ({user.country}) {hasLeft && "(left)"}
      </Name>
    </Container>
  );
}
