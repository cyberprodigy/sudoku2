import { Room } from "../api/model/Room";
import { Board } from "../api/model/definitions";
import db, { DatabaseRecord } from "./database";

class RoomDataSource {
  createRoom(title: string, difficulty: string): Promise<Room> {
    return db("rooms")
      .insert({
        title,
        difficulty,
      })
      .returning("*")
      .then((result: any[]) => {
        return result[0];
      });
  }
}

export default RoomDataSource;
