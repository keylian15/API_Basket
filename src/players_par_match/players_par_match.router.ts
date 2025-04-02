import { Router } from "express";
import {
  getPlayersParMatch,
  getPlayerParMatch,
} from "./players_par_match.controller";

export const playerParMatchRouter = Router();

playerParMatchRouter.get("/playersParMatch", getPlayersParMatch);
playerParMatchRouter.get(
  "/playerParMatch/:id_joueur/:saison/:abr",
  getPlayerParMatch
);
