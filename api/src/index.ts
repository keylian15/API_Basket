import express from "express";
import { teamsRouter } from "./teams/teams.router";

export const app = express();
const port = 3000;

app.use(express.json());

app.use(teamsRouter);

export const server = app.listen(port);

export function stopServer() {
  server.close();
}
