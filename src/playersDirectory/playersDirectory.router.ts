import { Router } from "express";
import {
  getPlayerDirectory,
  getPlayersDirectory,
} from "./playersDirectory.controller";

export const playerDirectory = Router();

playerDirectory.get("/playersDirectory", getPlayersDirectory);
playerDirectory.get(
  "/playerDirectory/:nom_joueur/:dateNaissance",
  getPlayerDirectory
);
