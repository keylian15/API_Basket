import { Router } from "express";
import {
  createTeamStatsParMatch,
  deleteTeamStatsParMatch,
  getTeamStatsParMatch,
  getTeamsStatsParMatch,
  updateTeamStatsParMatch,
} from "./teamsStatsParMatch.controller";
import { verifyAdmin, verifyJWT } from "../commun/commun.middleware ";

export const teamStatsParMatch = Router();

teamStatsParMatch.get("/teamsStatsParMatch", verifyJWT, getTeamsStatsParMatch);
teamStatsParMatch.get(
  "/teamStatsParMatch/:saison/:abr",
  verifyJWT,
  getTeamStatsParMatch
);
teamStatsParMatch.post(
  "/teamStatsParMatch",
  verifyJWT,
  verifyAdmin,
  createTeamStatsParMatch
);
teamStatsParMatch.patch(
  "/teamStatsParMatch/:saison_param/:abr_equipe_param",
  verifyJWT,
  verifyAdmin,
  updateTeamStatsParMatch
);
teamStatsParMatch.delete(
  "/teamStatsParMatch/:saison_param/:abr_equipe_param",
  verifyJWT,
  verifyAdmin,
  deleteTeamStatsParMatch
);
