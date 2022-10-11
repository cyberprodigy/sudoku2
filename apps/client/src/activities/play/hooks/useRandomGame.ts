import { DIFFICULTIES } from './../../../models/Nouns';
import { useEffect, useState } from "react";
import { BoardObjectDto } from "../../../models/Nouns";
import axios from "axios";

const useRandomGame = (difficulty: DIFFICULTIES) => {
  const [game, setGame] = useState<BoardObjectDto | undefined>();
  const [error, setError] = useState<string | undefined>();
  useEffect(() => {
    axios.get<BoardObjectDto>(`${process.env.REACT_APP_API_SERVER}/random-board/${difficulty}`).then((response) => {
      setGame(response.data);
    }).catch(e => setError(JSON.stringify(e)));
  }, []);
  return { game, error };
};

export default useRandomGame;
