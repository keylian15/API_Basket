import { Router } from "express";
import {
  getTeamStatsParMatch,
  getTeamsStatsParMatch,
} from "./teamsStatsParMatch.controller";

export const teamStatsParMatch = Router();

teamStatsParMatch.get("/teamsStatsParMatch", getTeamsStatsParMatch);
teamStatsParMatch.get(
  "/teamStatsParMatch/:saison/:abr/:qualif",
  getTeamStatsParMatch
);
