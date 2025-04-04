import { Router } from "express";
import {
  getPlayersParMatch,
  getPlayerParMatch,
  createPlayerParMatch,
  updatePlayerParMatch,
  deletePlayerParMatch,
} from "./playersParMatch.controller";

export const playerParMatchRouter = Router();

playerParMatchRouter.get("/playersParMatch", getPlayersParMatch);
playerParMatchRouter.get(
  "/playerParMatch/:id_joueur/:saison/:abr",
  getPlayerParMatch
);
playerParMatchRouter.post("/playerParMatch", createPlayerParMatch);
playerParMatchRouter.patch(
  "/playerParMatch/:id_joueur_param/:saison_param/:abr",
  updatePlayerParMatch
);
playerParMatchRouter.delete(
  "/playerParMatch/:id_joueur_param/:saison_param/:abr",
  deletePlayerParMatch
);
