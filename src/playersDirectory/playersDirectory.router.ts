import { Router } from "express";
import {
  createPlayerDirectory,
  deletePlayerDirectory,
  getPlayerDirectory,
  getPlayersDirectory,
  updatePlayerDirectory,
} from "./playersDirectory.controller";
import { verifyJWT } from "../commun/commun.middleware ";

export const playerDirectory = Router();

playerDirectory.get("/playersDirectory", getPlayersDirectory);
playerDirectory.get(
  "/playerDirectory/:nom_joueur/:date_naissance",
  getPlayerDirectory
);
playerDirectory.post("/playerDirectory", verifyJWT, createPlayerDirectory);
playerDirectory.patch(
  "/playerDirectory/:nom_joueur_param/:date_naissance_param",
  verifyJWT,
  updatePlayerDirectory
);
playerDirectory.delete(
  "/playerDirectory/:nom_joueur_param/:date_naissance_param",
  verifyJWT,
  deletePlayerDirectory
);
