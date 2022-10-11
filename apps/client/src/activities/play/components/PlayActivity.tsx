import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { actions } from "../features/play";
import useBoard from "../hooks/useGame";
import { parseBoard } from "../models/parseBoard";
import Play from "./Play";

function PlayActivity() {
  const { boardId } = useParams<{ boardId: string }>();
  const { board } = useBoard(parseInt(boardId));
  const dispatch = useDispatch();

  useEffect(() => {
    if (board) {
      dispatch(actions.startGame({ board: parseBoard(board) }));
    }
  }, [board, dispatch]);

  if (!board) {
    return <span>loading...</span>;
  }
  return <Play />;
}

export default PlayActivity;
