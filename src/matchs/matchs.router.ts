import { Router } from "express";
import { getMatchs, getMatch } from "./matchs.controller";

export const matchRouter = Router();

matchRouter.get("/matchs", getMatchs);
matchRouter.get("/match/:gameId", getMatch);
