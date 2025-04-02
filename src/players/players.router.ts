import { Router } from "express";
import {
  getPlayers,
  getPlayer,
  createPlayer,
  updatePlayer,
  deletePlayer,
} from "./players.controller";
import { verifyJWT } from "../commun/commun.midleware";

export const playerRouter = Router();

playerRouter.get("/players", getPlayers);
playerRouter.get("/player/:id", getPlayer);
playerRouter.post("/player", verifyJWT, createPlayer);
playerRouter.patch("/player/:id", verifyJWT, updatePlayer);
playerRouter.delete("/player/:id", verifyJWT, deletePlayer);
