import { useEffect } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import StandartContainer from "../../../components/StandartContainer";
import { AppState } from "../../../models/Nouns";
import netSocket from "../../../utils/NetworkSocket";
import { actions } from "../features/play";
import IncomeStreamHandler from "../net/IncomeStreamHandler";
import { OutputStreamEmitter } from "../net/OutputStreamEmitter";
import Board from "./Board";
import { FinishScreenMulti, FinishScreenSingle } from "./FinishScreen";
import NumberPicker from "./NumberPicker";
import PlayTopBar from "./PlayTopBar";

function Play() {
  const dispatch = useDispatch();
  const store = useStore<AppState>();
  const playState = useSelector((state: AppState) => state.play);
  const user = useSelector((state: AppState) => state.login.user);

  useEffect(() => {
    const inputStreamHandler = new IncomeStreamHandler({ dispatch, user });
    return () => inputStreamHandler.dispose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    const outputStreamEmitter = new OutputStreamEmitter(store);
    netSocket.emit("broadcastPlayerInfo", store.getState().login.user);
    netSocket.emit("broadcastPlayerInfoRequest", store.getState().login.user);

    return () => {
      outputStreamEmitter.dispose();
      store.dispatch(actions.reset());
    };
  }, [store]);

  return (
    <StandartContainer>
      <PlayTopBar />
      <Board />
      <NumberPicker />
      {playState.opponent ? <FinishScreenMulti /> : <FinishScreenSingle />}
    </StandartContainer>
  );
}

export default Play;
