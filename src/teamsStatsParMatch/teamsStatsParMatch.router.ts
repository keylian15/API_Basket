import { Router } from "express";
import {
  createTeamStatsParMatch,
  deleteTeamStatsParMatch,
  getTeamStatsParMatch,
  getTeamsStatsParMatch,
  updateTeamStatsParMatch,
} from "./teamsStatsParMatch.controller";
import { verifyJWT } from "../commun/commun.middleware ";

export const teamStatsParMatch = Router();

teamStatsParMatch.get("/teamsStatsParMatch", getTeamsStatsParMatch);
teamStatsParMatch.get(
  "/teamStatsParMatch/:saison/:abr/:qualif",
  getTeamStatsParMatch
);
teamStatsParMatch.post(
  "/teamStatsParMatch",
  verifyJWT,
  createTeamStatsParMatch
);
teamStatsParMatch.patch(
  "/teamStatsParMatch/:saison_param/:abr_equipe_param/:qualif_param",
  verifyJWT,
  updateTeamStatsParMatch
);
teamStatsParMatch.delete(
  "/teamStatsParMatch/:saison_param/:abr_equipe_param/:qualif_param",
  verifyJWT,
  deleteTeamStatsParMatch
);
