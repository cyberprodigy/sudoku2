import "dotenv/config"; // Adding environmental variables. NB: keep this import first
import express from "express";
import { createServer } from "http";
import { apiServer } from "./api/server";
import { instantServer } from "./instant/server";
import { disableCors } from "./middleware/disableCors";

const app = express();
app.use(disableCors);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const server = createServer(app);

instantServer(app, server);
apiServer(app, server);
