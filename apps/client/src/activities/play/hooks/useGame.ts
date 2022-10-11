import { useEffect, useState } from "react";
import { BoardObjectDto } from "../../../models/Nouns";
import axios from "axios";

const useBoard = (boardId: number) => {
  const [board, setBoard] = useState<BoardObjectDto | undefined>();
  useEffect(() => {
    axios.get<BoardObjectDto>(`${process.env.REACT_APP_API_SERVER}/board/${boardId}`).then((response) => {
      setBoard(response.data);
    });
  }, [boardId]);
  return { board };
};

export default useBoard;
