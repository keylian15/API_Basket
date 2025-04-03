import { Router } from "express";
import {
  getMatchs,
  getMatch,
  updateMatch,
  createMatch,
  deleteMatch,
} from "./matchs.controller";
import { verifyJWT } from "../commun/commun.middleware ";

export const matchRouter = Router();

matchRouter.get("/matchs", getMatchs);
matchRouter.get("/match/:gameId", getMatch);
matchRouter.post("/match", verifyJWT, createMatch);
matchRouter.patch("/match/:gameId", verifyJWT, updateMatch);
matchRouter.delete("/match/:gameId", verifyJWT, deleteMatch);
