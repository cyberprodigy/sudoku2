import { gsap } from "gsap";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import StandartButton from "../../../components/StandartButton";
import { AppState } from "../../../models/Nouns";
import { palette } from "../../../theme/Theme";
import { getPercentComplete } from "../../../utils/getPercentComplete";
import netSocket from "../../../utils/NetworkSocket";
import { startConfetti, stopConfetti } from "../effects/confetti";
import { actions } from "../features/play";

const BackAbsolute = styled.div`
  display: none;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  backdrop-filter: blur(2px);
`;

const BackRelative = styled.div`
  position: relative;
  flex: 0 0 100%;
`;
const Container = styled.div`
  position: absolute;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  width: 100%;
`;

const MyWrapper = styled.div`
  display: flex;
  height: 150px;
  background-color: ${palette.primary.main};
  position: relative;
`;

const MedalWrapper = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  position: relative;
  justify-content: center;
`;

const MyMedal = styled.img`
  position: absolute;
  top: -10px;
  height: 180px;
  z-index: 1;
  transform-origin: top center;
  drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.4))
`;

const MyTextContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const MyName = styled.div`
  color: white;
  font-weight: bold;
  font-size: 19px;
`;

const MyTime = styled.div`
  color: white;
  font-weight: bold;
  font-size: 50px;
`;

const OpponentWrapper = styled.div`
  display: flex;
  height: 80px;
  justify-content: center;
  background-color: ${palette.primary.dark};
`;

const OpponentName = styled.div`
  color: white;
  font-weight: bold;
  font-size: 15px;
  margin-bottom: 2px;
`;

const OpponentTime = styled.div`
  color: white;
  font-weight: bold;
  font-size: 19px;
`;

const OpponentMedal = styled.img`
  position: absolute;
  top: -5px;
  height: 95px;
  z-index: 0;
  transform-origin: top center;
  drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.4))
`;

const OpponentTextContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

function pad0(number: number) {
  if (number === 0) {
    return "00";
  } else if (number < 10) {
    return `0${number}`;
  } else {
    return `${number}`;
  }
}

const GOLD_URL = "./images/medal-gold.svg";
const SILVER_URL = "./images/medal-silver.svg";
const LOST_URL = "./images/medal-lost.svg";

function formatTime(ms: number | undefined) {
  if (ms === undefined) {
    return undefined;
  }
  const seconds = Math.floor(ms / 1000);
  return `${pad0(Math.round(seconds / 60))}:${pad0(seconds % 60)}`;
}
export function FinishScreenMulti() {
  const history = useHistory();
  const playState = useSelector((state: AppState) => state.play);
  const user = useSelector((state: AppState) => state.login.user);
  const opponent = useSelector((state: AppState) => state.play.opponent);
  const dispatch = useDispatch();

  useEffect(() => {
    if (playState.gameLifeCycle === "completed") {
      const iWon =
        getPercentComplete(
          playState.board.cellsGiven,
          playState.myProgress.solved
        ) === 100;

      var tl = gsap.timeline();
      if (iWon) {
        tl.add(startConfetti);
      } else {
        tl.to(".cell", {
          stagger: 0.01,
          ease: "sine.in(1)",
          duration: 0.5,
          reversed: true,
          scale: 0,
        });
        tl.to(".cell", {
          stagger: 0.01,
          ease: "sine.out(1)",
          duration: 0.5,
          scale: 1,
          delay: 0.1,
        });
      }

      tl.to("#back-absolute", { opacity: 1, display: "flex", duration: 0.5 });
      tl.from("#container", {
        scaleX: 0,
        scaleY: 0,
        duration: 1,
        ease: "elastic",
      });
      tl.from(".medal", {
        rotateZ: 80,
        duration: 2.5,
        ease: "elastic",
        stagger: 0.15,
        opacity: 0,
      });
      tl.from("#finish-button", { opacity: 0, duration: 0.5, ease: "expo" });
      tl.from("#close-finish-screen-button", {
        opacity: 0,
        duration: 0.5,
        ease: "expo",
      });
      if (iWon) {
        tl.add(stopConfetti);
      }
    } else {
      gsap.to("#back-absolute", { opacity: 0, display: "none", duration: 0 });
    }
  }, [
    playState.board.cellsGiven,
    playState.gameLifeCycle,
    playState.myProgress.solved,
  ]);

  if (playState.gameLifeCycle !== "completed") {
    return null;
  }

  const { myFinalTime, opponentFinalTime } = playState;

  const iFailed = playState.myProgress.mistakes >= 3;
  const opponentFailed = playState.opponentProgress.mistakes >= 3;

  let myMedalUrl: string | null;

  if (iFailed) {
    myMedalUrl = LOST_URL;
  } else if (opponentFailed) {
    myMedalUrl = GOLD_URL;
  } else {
    if (opponentFinalTime && myFinalTime) {
      myMedalUrl = myFinalTime < opponentFinalTime ? GOLD_URL : SILVER_URL;
    } else if (myFinalTime && !opponentFinalTime) {
      myMedalUrl = GOLD_URL;
    } else {
      myMedalUrl = LOST_URL;
    }
  }

  let opponentMedalUrl: string | null;
  if (opponentFailed) {
    opponentMedalUrl = LOST_URL;
  } else if (iFailed) {
    opponentMedalUrl = GOLD_URL;
  } else {
    if (opponentFinalTime && myFinalTime) {
      opponentMedalUrl =
        myFinalTime < opponentFinalTime ? SILVER_URL : GOLD_URL;
    } else if (opponentFinalTime && !myFinalTime) {
      opponentMedalUrl = GOLD_URL;
    } else {
      opponentMedalUrl = LOST_URL;
    }
  }

  return (
    <BackAbsolute id="back-absolute">
      <BackRelative>
        <Container id="container">
          <MyWrapper>
            <MedalWrapper>
              {myMedalUrl && <MyMedal src={myMedalUrl} className="medal" />}
            </MedalWrapper>
            <MyTextContainer>
              <MyName>{user.nickname}</MyName>
              <MyTime>{formatTime(playState.myFinalTime)}</MyTime>
            </MyTextContainer>
          </MyWrapper>

          <OpponentWrapper>
            <MedalWrapper>
              {opponentMedalUrl && (
                <OpponentMedal src={opponentMedalUrl} className="medal" />
              )}
            </MedalWrapper>
            <OpponentTextContainer>
              <OpponentName>{opponent?.nickname || ""}</OpponentName>
              <OpponentTime>
                {formatTime(playState.opponentFinalTime) ??
                  `still playing... ${getPercentComplete(
                    playState.board.cellsGiven,
                    playState.opponentProgress.solved
                  )}% (${playState.opponentProgress.mistakes}/3)`}
              </OpponentTime>
            </OpponentTextContainer>
          </OpponentWrapper>

          <StandartButton
            style={{ marginTop: "20px" }}
            id="finish-button"
            onClick={() => {
              if (playState.room) {
                netSocket.emit("leaveRoom", { roomId: playState.room.id });
              }
              history.push("/list-rooms");
            }}
          >
            End game
          </StandartButton>
          <StandartButton
            style={{ marginTop: "20px" }}
            id="close-finish-screen-button"
            onClick={() => dispatch(actions.continueGame())}
            disabled={
              playState.myProgress.mistakes >= 3 ||
              playState.myProgress.solved >= 81
            }
          >
            Continue
          </StandartButton>
          {console.log(playState.myProgress)}
        </Container>
      </BackRelative>
    </BackAbsolute>
  );
}

export function FinishScreenSingle() {
  const history = useHistory();
  const playState = useSelector((state: AppState) => state.play);
  const user = useSelector((state: AppState) => state.login.user);

  useEffect(() => {
    if (playState.gameLifeCycle === "completed") {
      const iWon =
        getPercentComplete(
          playState.board.cellsGiven,
          playState.myProgress.solved
        ) === 100;
      var tl = gsap.timeline();
      if (iWon) {
        tl.add(startConfetti);
      } else {
        tl.to(".cell", {
          stagger: 0.01,
          ease: "sine.in(1)",
          duration: 0.5,
          reversed: true,
          scale: 0,
        });
        tl.to(".cell", {
          stagger: 0.01,
          ease: "sine.out(1)",
          duration: 0.5,
          scale: 1,
          delay: 0.1,
        });
      }
      tl.to("#back-absolute", { opacity: 1, display: "flex", duration: 0.5 });
      tl.from("#container", {
        scaleX: 0,
        scaleY: 0,
        duration: 1,
        ease: "elastic",
      });
      tl.from(".medal", {
        rotateZ: 80,
        duration: 2.5,
        ease: "elastic",
        stagger: 0.15,
        opacity: 0,
      });
      tl.from("#finish-button", { opacity: 0, duration: 0.5, ease: "expo" });
      if (iWon) {
        tl.add(stopConfetti);
      }
    } else {
      gsap.to("#back-absolute", { opacity: 0, display: "none", duration: 0 });
    }
  }, [
    playState.board.cellsGiven,
    playState.gameLifeCycle,
    playState.myProgress.solved,
  ]);

  if (playState.gameLifeCycle !== "completed") {
    return null;
  }

  const iFailed = playState.myProgress.mistakes >= 3;

  let myMedalUrl: string | null;

  if (iFailed) {
    myMedalUrl = LOST_URL;
  } else {
    myMedalUrl = GOLD_URL;
  }

  return (
    <BackAbsolute id="back-absolute">
      <BackRelative>
        <Container id="container">
          <MyWrapper>
            <MedalWrapper>
              {myMedalUrl && <MyMedal src={myMedalUrl} className="medal" />}
            </MedalWrapper>
            <MyTextContainer>
              <MyName>{user.nickname}</MyName>
              <MyTime>{formatTime(playState.myFinalTime)}</MyTime>
            </MyTextContainer>
          </MyWrapper>

          <StandartButton
            style={{ marginTop: "20px" }}
            id="finish-button"
            onClick={() => {
              if (playState.room) {
                netSocket.emit("leaveRoom", { roomId: playState.room.id });
              }
              history.push("/create-single-rooms");
            }}
          >
            End game
          </StandartButton>
        </Container>
      </BackRelative>
    </BackAbsolute>
  );
}
