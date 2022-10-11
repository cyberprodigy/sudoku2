import DIFFICULTIES from '../datasource/DIFFICULTIES';
import "dotenv/config"; // Adding environmental variables. NB: keep this import first
import { Express } from "express";
import { Server } from "http";
import RoomDataSource from "../datasource/RoomDataSource";
import BoardDataSource from "../datasource/BoardDataSource";

export function apiServer(app: Express, server: Server) {
  const API_PORT = process.env.PORT || 4000;

  app.get("/random-board/:difficulty", async (req, res) => {
    const dataSource = new BoardDataSource();
    const board = await dataSource.getRandomBoard(req.params.difficulty as DIFFICULTIES);
    res.send(board);
  });

  app.get("/board/:boardId", async (req, res) => {
    const dataSource = new BoardDataSource();
    if (req.params.boardId) {
      const board = await dataSource.getBoard(parseInt(req.params.boardId, 10));
      res.send(board);
    }
    else {
      res.status(404)
    }
  });

  app.post("/create-room", async (req, res) => {
    console.log("create-room");
    const dataSource = new RoomDataSource();
    console.log(req.body);
    const board = await dataSource.createRoom("noooo", req.body.difficulty);
    res.send(board);
  });

  app.listen(API_PORT, () => {
    console.info(`API running on localhost:${API_PORT}`);
  });
}
