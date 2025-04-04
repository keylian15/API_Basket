import { Router } from "express";
import {
  createOpponentStatsParMatch,
  deleteOpponentStatsParMatch,
  getOpponentsStatsParMatch,
  getOpponentStatsParMatch,
  updateOpponentStatsParMatch,
} from "./opponentStatsParMatch.controller";
import { verifyAdmin, verifyJWT } from "../commun/commun.middleware ";

export const opponentStatsParMatch = Router();

opponentStatsParMatch.get(
  "/opponentsStatsParMatch",
  verifyJWT,
  getOpponentsStatsParMatch
);
opponentStatsParMatch.get(
  "/opponentStatsParMatch/:saison/:abr",
  verifyJWT,
  getOpponentStatsParMatch
);
opponentStatsParMatch.post(
  "/opponentStatsParMatch",
  verifyJWT,
  verifyAdmin,
  createOpponentStatsParMatch
);
opponentStatsParMatch.patch(
  "/opponentStatsParMatch/:saison_param/:abr_equipe_param",
  verifyJWT,
  verifyAdmin,
  updateOpponentStatsParMatch
);
opponentStatsParMatch.delete(
  "/opponentStatsParMatch/:saison_param/:abr_equipe_param",
  verifyJWT,
  verifyAdmin,
  deleteOpponentStatsParMatch
);
