import { Router } from "express";
import {
  getOpponentsStatsParMatch,
  getOpponentStatsParMatch,
} from "./opponentStatsParMatch.controller";

export const opponentStatsParMatch = Router();

opponentStatsParMatch.get("/opponentsStatsParMatch", getOpponentsStatsParMatch);
opponentStatsParMatch.get(
  "/opponentStatsParMatch/:saison/:abr",
  getOpponentStatsParMatch
);
