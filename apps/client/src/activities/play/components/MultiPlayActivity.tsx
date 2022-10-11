import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { actions } from "../features/play";
import useBoard from "../hooks/useGame";
import { parseBoard } from "../models/parseBoard";
import Play from "./Play";

/*
Responsible for loading initial data and setting up the involved components for
activity to perform it's responsibilities
*/

function MultiPlayActivity() {
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

export default MultiPlayActivity;
