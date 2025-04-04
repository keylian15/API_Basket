import { Router } from "express";
import {
  getMatchs,
  getMatch,
  updateMatch,
  createMatch,
  deleteMatch,
} from "./matchs.controller";
import { verifyAdmin, verifyJWT } from "../commun/commun.middleware ";

export const matchRouter = Router();

matchRouter.get("/matchs", verifyJWT, getMatchs);
matchRouter.get("/match/:gameId", verifyJWT, getMatch);
matchRouter.post("/match", verifyJWT, verifyAdmin, createMatch);
matchRouter.patch("/match/:gameId", verifyJWT, verifyAdmin, updateMatch);
matchRouter.delete("/match/:gameId", verifyJWT, verifyAdmin, deleteMatch);
