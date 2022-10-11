import { Board } from "../api/model/definitions";
import db, { DatabaseRecord } from "./database";
import DIFFICULTIES from "./DIFFICULTIES";

const difficulties = [DIFFICULTIES.Simple, DIFFICULTIES.Easy, DIFFICULTIES.Intermediate, DIFFICULTIES.Expert]
class BoardDataSource {

  getRandomBoard(difficulty: DIFFICULTIES): Promise<Board> {
    if (!difficulties.includes(difficulty)) {
      throw new Error('Unknown difficulty')
    }
    return db
      .raw(
        `SELECT *
        FROM boards
        WHERE difficulty='${difficulty}'
        ORDER BY RANDOM()
        LIMIT 1`
      )
      .then(({ rows }: DatabaseRecord<Board>) => {
        if (rows.length < 1) {
          throw new Error(`No boards with difficulty ${difficulty} found`)
        }

        return rows[0];
      })
      .catch(e => {
        console.log(e); throw e
      });
  }

  getBoard(boardId: number): Promise<Board> {
    return db("boards")
      .select("*")
      .where({ boardId })
      .first()
      .then((result: Board) => result);
  }
}

export default BoardDataSource;
