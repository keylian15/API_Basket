import { Router } from "express";
import {
  createPlayerDirectory,
  deletePlayerDirectory,
  getPlayerDirectory,
  getPlayersDirectory,
  updatePlayerDirectory,
} from "./playersDirectory.controller";
import { verifyAdmin, verifyJWT } from "../commun/commun.middleware ";

export const playerDirectory = Router();

playerDirectory.get("/playersDirectory", verifyJWT, getPlayersDirectory);
playerDirectory.get(
  "/playerDirectory/:nom_joueur/:date_naissance",
  verifyJWT,
  getPlayerDirectory
);
playerDirectory.post(
  "/playerDirectory",
  verifyJWT,
  verifyAdmin,
  createPlayerDirectory
);
playerDirectory.patch(
  "/playerDirectory/:nom_joueur_param/:date_naissance_param",
  verifyJWT,
  verifyAdmin,
  updatePlayerDirectory
);
playerDirectory.delete(
  "/playerDirectory/:nom_joueur_param/:date_naissance_param",
  verifyJWT,
  verifyAdmin,
  deletePlayerDirectory
);
