import { Router } from "express";
import {
  getTeamStatParMatch,
  getTeamsStatParMatch,
} from "./teamsStatParMatch.controller";

export const teamStatParMatch = Router();

teamStatParMatch.get("/teamsStatParMatch", getTeamsStatParMatch);
teamStatParMatch.get(
  "/teamStatParMatch/:saison/:abr/:qualif",
  getTeamStatParMatch
);
