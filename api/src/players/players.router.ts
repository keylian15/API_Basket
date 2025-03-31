import { Router } from "express";
import { getPlayers, getPlayer } from "./players.controller";

export const playerRouter = Router();

playerRouter.get("/players", getPlayers);
playerRouter.get("/player/:id", getPlayer);
