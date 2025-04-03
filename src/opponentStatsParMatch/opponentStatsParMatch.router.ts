import { Router } from "express";
import {
  createOpponentStatsParMatch,
  deleteOpponentStatsParMatch,
  getOpponentsStatsParMatch,
  getOpponentStatsParMatch,
  updateOpponentStatsParMatch,
} from "./opponentStatsParMatch.controller";
import { verifyJWT } from "../commun/commun.middleware ";

export const opponentStatsParMatch = Router();

opponentStatsParMatch.get("/opponentsStatsParMatch", getOpponentsStatsParMatch);
opponentStatsParMatch.get(
  "/opponentStatsParMatch/:saison/:abr/:qualif",
  getOpponentStatsParMatch
);
opponentStatsParMatch.post(
  "/opponentStatsParMatch",
  verifyJWT,
  createOpponentStatsParMatch
);
opponentStatsParMatch.patch(
  "/opponentStatsParMatch/:saison_param/:abr_equipe_param/:qualif_param",
  verifyJWT,
  updateOpponentStatsParMatch
);
opponentStatsParMatch.delete(
  "/opponentStatsParMatch/:saison_param/:abr_equipe_param/:qualif_param",
  verifyJWT,
  deleteOpponentStatsParMatch
);
