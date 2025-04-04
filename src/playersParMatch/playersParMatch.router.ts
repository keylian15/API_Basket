import { Router } from "express";
import {
  getPlayersParMatch,
  getPlayerParMatch,
  createPlayerParMatch,
  updatePlayerParMatch,
  deletePlayerParMatch,
} from "./playersParMatch.controller";
import { verifyAdmin, verifyJWT } from "../commun/commun.middleware ";

export const playerParMatchRouter = Router();

playerParMatchRouter.get("/playersParMatch", verifyJWT, getPlayersParMatch);
playerParMatchRouter.get(
  "/playerParMatch/:id_joueur/:saison/:abr",
  verifyJWT,
  getPlayerParMatch
);
playerParMatchRouter.post(
  "/playerParMatch",
  verifyJWT,
  verifyAdmin,
  createPlayerParMatch
);
playerParMatchRouter.patch(
  "/playerParMatch/:id_joueur_param/:saison_param/:abr",
  verifyJWT,
  verifyAdmin,
  updatePlayerParMatch
);
playerParMatchRouter.delete(
  "/playerParMatch/:id_joueur_param/:saison_param/:abr",
  verifyJWT,
  verifyAdmin,
  deletePlayerParMatch
);
