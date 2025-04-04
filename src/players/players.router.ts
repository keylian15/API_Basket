import { Router } from "express";
import {
  getPlayers,
  getPlayer,
  createPlayer,
  updatePlayer,
  deletePlayer,
} from "./players.controller";
import { verifyAdmin, verifyJWT } from "../commun/commun.middleware ";

export const playerRouter = Router();

playerRouter.get("/players", verifyJWT, getPlayers);
playerRouter.get("/player/:id", verifyJWT, getPlayer);
playerRouter.post("/player", verifyJWT, verifyAdmin, createPlayer);
playerRouter.patch("/player/:id", verifyJWT, verifyAdmin, updatePlayer);
playerRouter.delete("/player/:id", verifyJWT, verifyAdmin, deletePlayer);
